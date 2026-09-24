import { ForestDecorationShader } from "./ForestDecorationShader";
const { regClass } = Laya;

/** Shared-material snow flecks for the currently visible forest decoration Sprites. */
@regClass("67f718d4-781b-4a6e-b6c0-06a7afc9b971")
export class ForestDecorationSnow extends Laya.Script {
    private static registered = false;
    private static sharedMaterial: Laya.Material | null = null;
    private static snowTexture: Laya.Texture | null = null;
    private static amount = 0;
    private originalMaterial: Laya.Material | null = null;
    private usesSharedMaterial = false;

    static setSnow(texture: Laya.Texture | null, amount: number): void {
        this.snowTexture = texture;
        this.amount = Math.max(0, Math.min(1, amount));
        const material = this.sharedMaterial;
        if (material) {
            const data = material.shaderData, id = Laya.Shader3D.propertyNameToID;
            data.setTexture(id("u_decorationSnowTexture"), texture?.bitmap || Laya.Texture2D.whiteTexture);
            data.setNumber(id("u_decorationSnowAmount"), this.amount);
        }
        ForestDecorationShader.setSnow(texture, this.amount);
    }

    onStart(): void {
        const node = this.owner as Laya.Sprite;
        this.originalMaterial = node.material;
        // The wind shader already includes the same snow pass on its own material.
        if (node.getComponent(ForestDecorationShader)) return;
        node.material = ForestDecorationSnow.getMaterial();
        this.usesSharedMaterial = true;
    }

    onDestroy(): void {
        const node = this.owner as Laya.Sprite;
        if (this.usesSharedMaterial && node && !node.destroyed &&
            node.material === ForestDecorationSnow.sharedMaterial) node.material = this.originalMaterial;
    }

    private static getMaterial(): Laya.Material {
        if (!this.sharedMaterial) {
            if (!this.registered) this.registerShader();
            const material = this.sharedMaterial = new Laya.Material();
            material.setShaderName("ForestDecorationSnow");
            material.cull = Laya.RenderState.CULL_NONE;
            const id = Laya.Shader3D.propertyNameToID;
            material.shaderData.setTexture(id("u_decorationSnowTexture"),
                this.snowTexture?.bitmap || Laya.Texture2D.whiteTexture);
            material.shaderData.setNumber(id("u_decorationSnowAmount"), this.amount);
        }
        return this.sharedMaterial;
    }

    private static registerShader(): void {
        if (this.registered) return;
        const shader = Laya.Shader3D.add("ForestDecorationSnow");
        shader.shaderType = Laya.ShaderFeatureType.D2_TextureSV;
        const sub = new Laya.SubShader({
            a_posuv: [0, Laya.ShaderDataType.Vector4],
            a_attribColor: [1, Laya.ShaderDataType.Vector4],
            a_attribFlags: [2, Laya.ShaderDataType.Vector4],
            a_customs: [3, Laya.ShaderDataType.Vector4]
        }, {
            u_decorationSnowTexture: Laya.ShaderDataType.Texture2D,
            u_decorationSnowAmount: Laya.ShaderDataType.Float
        });
        shader.addSubShader(sub);
        sub.addShaderPass(`
            #include "Sprite2DVertex.glsl";
            varying vec2 v_snowLocal;
            void main() {
                vertexInfo info; getVertexInfo(info);
                v_texcoordAlpha=info.texcoordAlpha; v_color=info.color;
                v_useTex=info.useTex; v_useClip=info.useClip; v_customs=info.customs;
                #ifdef USE_TEX_ARRAY
                v_texLayer=a_attribFlags.w;
                #endif
                v_snowLocal=info.pos.xy;
                gl_Position=getPosition(info.pos);
            }`, `
            #if defined(GL_FRAGMENT_PRECISION_HIGH)
            precision highp float;
            #else
            precision mediump float;
            #endif
            #include "Sprite2DFrag.glsl";
            varying vec2 v_snowLocal;
            float snowHash(vec2 p) {
                p=fract(p*vec2(0.1031,0.11369));
                p+=dot(p,p.yx+19.19);
                return fract((p.x+p.y)*p.x);
            }
            float snowPatchNoise(vec2 p) {
                vec2 cell=floor(p), f=fract(p);
                f=f*f*(3.0-2.0*f);
                float a=snowHash(cell);
                float b=snowHash(cell+vec2(1.0,0.0));
                float c=snowHash(cell+vec2(0.0,1.0));
                float d=snowHash(cell+vec2(1.0,1.0));
                return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
            }
            float snowBlob(vec2 local, vec2 cell, vec2 center, float salt, float radius) {
                vec2 centerLocal=center*50.0;
                float edgeNoise=snowPatchNoise((local-centerLocal)/8.0+cell+vec2(salt, salt*1.73));
                float variedRadius=radius+(edgeNoise-0.5)*1.2;
                float distance=length(local-centerLocal);
                return 1.0-smoothstep(variedRadius-1.0,variedRadius+1.0,distance);
            }
            float snowPatchMask(vec2 local, float amount) {
                if (amount>0.98) return 1.0;
                vec2 cell=floor(local/50.0);
                float radius=7.25*sqrt(amount/0.2);
                vec2 j0=vec2(snowHash(cell+vec2(1.3,4.1)),snowHash(cell+vec2(8.7,2.6)))-0.5;
                vec2 j1=vec2(snowHash(cell+vec2(3.2,9.4)),snowHash(cell+vec2(7.1,5.8)))-0.5;
                vec2 j2=vec2(snowHash(cell+vec2(6.5,1.7)),snowHash(cell+vec2(2.4,8.3)))-0.5;
                float mask=snowBlob(local,cell,vec2(0.25,0.27)+j0*0.08,1.7,radius);
                mask=max(mask,snowBlob(local,cell,vec2(0.72,0.31)+j1*0.08,5.3,radius));
                mask=max(mask,snowBlob(local,cell,vec2(0.47,0.74)+j2*0.08,8.9,radius));
                return mask;
            }
            void main() {
                clip();
                vec4 color=getSpriteTextureColor();
                float amount=clamp(u_decorationSnowAmount,0.0,1.0);
                if (amount>0.0 && color.a>0.001) {
                    float mask=snowPatchMask(v_snowLocal,amount);
                    vec2 tile=1.0-abs(mod(v_snowLocal/64.0,2.0)-1.0);
                    vec4 snow=transspaceColor(texture2D(u_decorationSnowTexture,tile));
                    color.rgb=mix(color.rgb,snow.rgb*color.a,mask);
                }
                setglColor(color);
            }`);
        this.registered = true;
    }
}
