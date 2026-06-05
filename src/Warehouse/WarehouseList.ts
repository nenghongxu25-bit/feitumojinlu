const { regClass } = Laya;
import PlayerDataManager, { ItemSlot } from "../PlayerDataManager";
// 🎯 正确引入你的食物配置大管家，再记错编号我是狗
import FoodManager, { FoodStruct } from "../ItemData/FoodManager"; 

@regClass()
export default class WarehouseList extends Laya.Script {

    // 每一档物资品质对应的颜色（大厂正规军UI标配：白、绿、蓝、紫、橙）
    private _qualityColors: { [key: string]: string } = {
        "垃圾": "#aaaaaa", // 灰色
        "普通": "#ffffff", // 白色
        "军规": "#00ff00", // 绿色
        "罕见": "#00cfff", // 蓝色
        "传世": "#ff9900"  // 橙色
    };

    onAwake(): void {
        Laya.stage.on("REFRESH_STATIC_WAREHOUSE", this, this.refreshStaticUI);
        this.refreshStaticUI();
    }

    public refreshStaticUI(): void {
        console.log("================ 🏦 仓库废土数据精准对齐 ================");

        const listNode = this.owner as Laya.Sprite;
        if (!listNode) return;

        const allBoxes = listNode.children; 
        if (!allBoxes || allBoxes.length === 0) return;

        // 拿到大账本里真实的仓库数据（里面存的是 { itemId: 1001, count: 5 }）
        const realDataList = PlayerDataManager.warehouseList;
        // 拿到全量食物静态配置表
        const foodCfgList = FoodManager.getList();

        for (let i = 0; i < allBoxes.length; i++) {
            const boxNode = allBoxes[i] as Laya.Sprite;
            if (!boxNode) continue;

            const textNode = boxNode.getChildByName("Text") as any;
            boxNode.offAll(Laya.Event.MOUSE_DOWN);

            if (i < realDataList.length) {
                const slot = realDataList[i] as ItemSlot;
                boxNode.visible = true; 

                // 🎯 【核心穿透优化】：拿着账本里的 1001/1002，去配置表里精确定位具体食物
                const foodConfig = foodCfgList.find(f => f.id === slot.itemId);

                if (textNode) {
                    if (foodConfig) {
                        // 1. 成功查表：输入带有废土生存属性的硬核文本
                        let infoStr = `${foodConfig.name}\n数量: ${slot.count}`;
                        
                        // 2. 特效追加：如果能回饱食度或水分，在文本里提示出来
                        if (foodConfig.satietyBonus !== 0) infoStr += `\n饱食:+${foodConfig.satietyBonus}`;
                        if (foodConfig.waterBonus !== 0) {
                            // 水分可能是负的（比如吃饼干口渴）
                            const sign = foodConfig.waterBonus > 0 ? "+" : "";
                            infoStr += `\n水分:${sign}${foodConfig.waterBonus}`;
                        }

                        textNode.text = infoStr;
                        // 3. 🎯 品质颜色对齐：军规直接亮绿色，垃圾直接亮灰色，一目了然！
                        textNode.color = this._qualityColors[foodConfig.quality] || "#ffffff";
                        textNode.fontSize = 18; // 属性多了，字号稍微缩小防止出界
                    } else {
                        // 降级容错：万一配了其他未知ID，至少把编号吐出来
                        textNode.text = `未知物资\nID:${slot.itemId}\n数:${slot.count}`;
                        textNode.color = "#ffffff";
                    }
                    textNode.visible = true;
                }

                // 锁死事件闭包
                boxNode.on(Laya.Event.MOUSE_DOWN, this, this.onCellClick, [i]);
                boxNode.mouseEnabled = true;
            } else {
                // 空格子直接干掉
                boxNode.visible = false; 
                if (textNode) textNode.text = "";
            }
        }
    }

    private onCellClick(index: number, e: Laya.Event): void {
        e.stopPropagation();

        if (PlayerDataManager.backpackList.length >= PlayerDataManager.maxBackpackSlots) {
            console.warn("🎒 背包满了！");
            return;
        }

        // 转账
        const movedItem = PlayerDataManager.warehouseList.splice(index, 1)[0];
        PlayerDataManager.backpackList.push(movedItem);

        this.refreshStaticUI();
        Laya.stage.event("REFRESH_STATIC_BACKPACK");
    }

    onDestroy(): void {
        Laya.stage.off("REFRESH_STATIC_WAREHOUSE", this, this.refreshStaticUI);
    }
}