const { regClass, property } = Laya;
import { RangedAimState } from "./RangedAimState";

@regClass()
export class PlayerCamera2D extends Laya.Script {
    @property({ type: Number, caption: "瞄准镜头前移距离" })
    public aimLookAhead = 180;
    @property({ type: Number, caption: "镜头过渡秒数" })
    public aimSmoothSeconds = 0.18;
    private offsetX = 0;
    private offsetY = 0;
    onAwake(): void {
        this.applyCameraState();
    }

    onEnable(): void {
        this.applyCameraState();
    }

    onUpdate(): void {
        this.applyCameraState();
    }

    private applyCameraState(): void {
        const camera = this.owner as Laya.Camera2D;

        if (!(camera instanceof Laya.Camera2D)) {
            return;
        }

        camera.isMain = true;
        camera.ignoreRotation = true;
        camera.positionSmooth = false;
        camera.positionSpeed = 0;
        const distance = RangedAimState.active ? Math.max(0, this.aimLookAhead) * RangedAimState.amount : 0;
        const dt = Math.min(0.1, Math.max(0, Laya.timer.delta || 0) / 1000);
        const blend = this.aimSmoothSeconds <= 0 ? 1 : 1 - Math.exp(-dt / this.aimSmoothSeconds);
        const x = RangedAimState.x * distance, y = RangedAimState.y * distance;
        this.offsetX += (x - this.offsetX) * blend;
        this.offsetY += (y - this.offsetY) * blend;
        if (Math.abs(x - this.offsetX) < 0.01) this.offsetX = x;
        if (Math.abs(y - this.offsetY) < 0.01) this.offsetY = y;
        // The camera is a child of the player; compensate any mirrored parent.
        let sx = 1, sy = 1;
        for (let node: any = camera.parent; node; node = node.parent) {
            sx *= typeof node.scaleX === "number" ? node.scaleX : 1;
            sy *= typeof node.scaleY === "number" ? node.scaleY : 1;
        }
        camera.x = this.offsetX / (sx || 1);
        camera.y = this.offsetY / (sy || 1);
        RangedAimState.cameraOffsetX = this.offsetX;
        RangedAimState.cameraOffsetY = this.offsetY;
    }

    onDisable(): void {
        this.offsetX = this.offsetY = 0;
        (this.owner as Laya.Sprite).pos(0, 0);
        RangedAimState.reset();
        RangedAimState.cameraOffsetX = RangedAimState.cameraOffsetY = 0;
    }
}
