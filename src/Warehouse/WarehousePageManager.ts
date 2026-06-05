const { regClass } = Laya;
import PlayerDataManager from "../PlayerDataManager";

@regClass()
export default class WarehousePageManager extends Laya.Script {

    private _warehouseListUI: Laya.List = null;
    private _backpackListUI: Laya.List = null;

    onAwake(): void {
        // 1. 只抓取原生 List 节点用来监听点击事件
        this._warehouseListUI = this.owner.getChildByName("warehouse_list") as Laya.List;
        this._backpackListUI = this.owner.getChildByName("backpack_list") as Laya.List;

        if (!this._warehouseListUI || !this._backpackListUI) {
            console.error("❌ [总控错误] 父节点下找不到叫 'warehouse_list' 或 'backpack_list' 的 List 节点！");
            return;
        }

        // 2. 绑定原生改变事件
        this._warehouseListUI.selectHandler = Laya.Handler.create(this, this.onWarehouseSelect, null, false);
        this._backpackListUI.selectHandler = Laya.Handler.create(this, this.onBackpackSelect, null, false);
    }

    /** 🏦 点击仓库格子 -> 进背包 */
    private onWarehouseSelect(index: number): void {
        if (index < 0 || index >= PlayerDataManager.warehouseList.length) return;

        if (PlayerDataManager.backpackList.length >= PlayerDataManager.maxBackpackSlots) {
            console.warn("🎒 背包满了！");
            this._warehouseListUI.selectedIndex = -1;
            return;
        }

        // 数据层面做切割搬家
        const item = PlayerDataManager.warehouseList.splice(index, 1)[0];
        PlayerDataManager.backpackList.push(item);

        // 🎯 【核能解耦】：总控只改数据和向全舞台舞台发送无线电信号！
        // 它不需要调用任何具体的类，也不需要写 refresh()，彻底消灭 `not a function` 报错！
        Laya.stage.event("REFRESH_WAREHOUSE_UI");
        Laya.stage.event("REFRESH_BACKPACK_UI");

        this._warehouseListUI.selectedIndex = -1;
    }

    /** 🎒 点击背包格子 -> 回仓库 */
    private onBackpackSelect(index: number): void {
        if (index < 0 || index >= PlayerDataManager.backpackList.length) return;

        const item = PlayerDataManager.backpackList.splice(index, 1)[0];
        PlayerDataManager.warehouseList.push(item);

        // 🎯 广播信号
        Laya.stage.event("REFRESH_WAREHOUSE_UI");
        Laya.stage.event("REFRESH_BACKPACK_UI");

        this._backpackListUI.selectedIndex = -1;
    }
}