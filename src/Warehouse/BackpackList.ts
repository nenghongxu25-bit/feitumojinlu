const { regClass } = Laya;
import PlayerDataManager, { ItemSlot } from "../PlayerDataManager";

@regClass()
export default class BackpackList extends Laya.Script {
    private _list: Laya.List = null;

    onAwake(): void {
        this._list = this.owner as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onRenderItem, null, false);
        
        // 🎯 监听属于背包的全局信号
        Laya.stage.on("REFRESH_BACKPACK_UI", this, this.refreshUI);
        
        this.refreshUI();
    }

    public refreshUI(): void {
        if (this._list) {
            this._list.array = [];
            this._list.array = PlayerDataManager.backpackList;
            console.log("🎒 [背包组件] 收到全局刷新信号，已成功重绘列表");
        }
    }

    private onRenderItem(cell: Laya.Box, index: number): void {
        const slot = this._list.array[index] as ItemSlot;
        if (!cell || !slot) return;

        const textNode = cell.getChildByName("Text") as any;
        if (textNode) {
            textNode.text = `[包] ID:${slot.itemId}\n数量: ${slot.count}`;
            textNode.color = "#00ff00";
            textNode.visible = true;
        }
    }

    onDestroy(): void {
        Laya.stage.off("REFRESH_BACKPACK_UI", this, this.refreshUI);
    }
}