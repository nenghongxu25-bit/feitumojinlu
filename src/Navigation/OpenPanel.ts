// OpenPanel.ts - 弹出预制体弹窗
const { regClass, property } = Laya;

@regClass()
export class OpenPanel extends Laya.Script {

    @property({ type: String })
    public targetPrefab: string = "";

    onEnable(): void {
        console.log("[OpenPanel] 挂载完成, target=" + this.targetPrefab);
        this.owner.on(Laya.Event.CLICK, this, this.onClick);
    }

    onDisable(): void {
        this.owner.off(Laya.Event.CLICK, this, this.onClick);
    }

    private onClick(): void {
        console.log("[OpenPanel] 按钮被点击, targetPrefab=" + this.targetPrefab);
        if (!this.targetPrefab) {
            console.warn("[OpenPanel] targetPrefab 为空");
            return;
        }

        // 删掉之前弹窗
        this.clearOld();

        Laya.loader.load(this.targetPrefab, Laya.Handler.create(this, (res: any) => {
            console.log("[OpenPanel] 加载完成, res=", res ? "有资源" : "null");
            if (!res) return;
            const node = res.create ? res.create() : null;
            console.log("[OpenPanel] create结果:", node ? "成功" : "失败");
            if (!node) return;
            (node as any)._isPanel = true;
            Laya.stage.addChild(node);
            console.log("[OpenPanel] 已添加到stage, 当前stage子节点数:", Laya.stage.numChildren);
        }));
    }

    private clearOld(): void {
        const kids: Laya.Node[] = [];
        for (let i = 0; i < Laya.stage.numChildren; i++) {
            const c = Laya.stage.getChildAt(i);
            if ((c as any)._isPanel) kids.push(c);
        }
        for (const k of kids) { k.removeSelf(); k.destroy(); }
        if (kids.length > 0) console.log("[OpenPanel] 清理了" + kids.length + "个旧弹窗");
    }
}
