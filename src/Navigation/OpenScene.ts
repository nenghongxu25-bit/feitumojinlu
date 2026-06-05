// OpenScene.ts - 跳转场景
const { regClass, property } = Laya;

@regClass()
export class OpenScene extends Laya.Script {

    @property({ type: String })
    public targetScene: string = "";

    private static clickCount = 0;

    onEnable(): void {
        this.owner.on(Laya.Event.CLICK, this, this.onClick);
    }

    onDisable(): void {
        this.owner.off(Laya.Event.CLICK, this, this.onClick);
    }

    private onClick(): void {
        OpenScene.clickCount++;
        const n = OpenScene.clickCount;
        console.log(`\n[OpenScene] ===== 第${n}次点击 =====`);

        if (!this.targetScene) { console.warn("[OpenScene] targetScene 为空"); return; }

        // 当前按钮信息
        console.log(`[OpenScene] 按钮: ${this.owner?.name}, target: "${this.targetScene}"`);

        // 向上找 Scene
        let cur: Laya.Node = this.owner;
        let foundScene: Laya.Scene | null = null;
        while (cur) {
            if (cur instanceof Laya.Scene) { foundScene = cur; break; }
            cur = cur.parent;
        }
        if (foundScene) {
            console.log(`[OpenScene] 所属场景: ${foundScene.name}, 在舞台上: ${foundScene.parent !== null}, parent=${foundScene.parent?.name}`);
        } else {
            console.log(`[OpenScene] 不在任何 Scene 内（可能是预制体直挂 stage）`);
        }

        // 当前 stage 上有几个 Scene
        let sceneCount = 0;
        for (let i = 0; i < Laya.stage.numChildren; i++) {
            const c = Laya.stage.getChildAt(i);
            if (c instanceof Laya.Scene) {
                sceneCount++;
                console.log(`[OpenScene] stage上的场景[${i}]: ${c.name}, visible=${c.visible}`);
            }
        }
        console.log(`[OpenScene] stage上共有 ${sceneCount} 个场景`);

        // 执行跳转
        console.log(`[OpenScene] 执行 Scene.open("${this.targetScene}", true)`);
        Laya.Scene.open(this.targetScene, true);

        // 执行后检查
        let afterCount = 0;
        for (let i = 0; i < Laya.stage.numChildren; i++) {
            const c = Laya.stage.getChildAt(i);
            if (c instanceof Laya.Scene) {
                afterCount++;
                console.log(`[OpenScene] 跳转后场景[${i}]: ${c.name}, visible=${c.visible}`);
            }
        }
        console.log(`[OpenScene] 跳转后 stage上共有 ${afterCount} 个场景`);
        console.log(`[OpenScene] ===== 第${n}次点击结束 =====\n`);
    }
}
