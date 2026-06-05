// ClosePanel.ts - 关闭预制体弹窗
const { regClass, property } = Laya;

@regClass()
export class ClosePanel extends Laya.Script {

    onEnable(): void {
        console.log("[ClosePanel] 挂载完成");
        this.owner.on(Laya.Event.CLICK, this, this.onClick);
    }

    onDisable(): void {
        this.owner.off(Laya.Event.CLICK, this, this.onClick);
    }

    private onClick(): void {
        console.log("[ClosePanel] 按钮被点击");

        let root = this.owner;
        while (root.parent && root.parent !== Laya.stage) {
            root = root.parent;
        }
        console.log("[ClosePanel] 找到根节点:", root.name, "构造器名:", root.constructor.name);

        root.removeSelf();
        root.destroy();
        console.log("[ClosePanel] 已删除, stage剩余子节点:", Laya.stage.numChildren);
    }
}
