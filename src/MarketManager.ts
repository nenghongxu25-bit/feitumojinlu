const { regClass } = Laya;
// 🎯 精准引入你的全量物资总线大账本与万能联合结构体
import ItemManager, { ItemAnyStruct } from "./ItemData/ItemManager"; 

@regClass()
export default class MarketManager extends Laya.Script {

    // 🎨 契合硬核废土黑暗风的品质色卡大字典
    private _qualityColors: { [key: string]: string } = {
        "垃圾": "#aaaaaa", // 灰色
        "普通": "#ffffff", // 白色
        "罕见": "#00cfff", // 蓝色
        "军规": "#00ff00", // 绿色（军规核心）
        "传世": "#ff9900"  // 橙色（极品出金）
    };

    // 📊 品质金字塔权重排序表
    private _qualityWeight: { [key: string]: number } = {
        "垃圾": 1,
        "普通": 2,
        "罕见": 3,
        "军规": 4,
        "传世": 5
    };

    onAwake(): void {
        console.log("================ 🏪 暗区市集公开全货架通电 ================");
        this.renderDeltaMarket();
    }

    /**
     * 📢 核心渲染引擎：遍历全品类、动态剥离特有物理属性、高阶排序并强刷
     */
    public renderDeltaMarket(): void {
        const listNode = this.owner as Laya.Sprite;
        if (!listNode || !listNode.children) {
            console.error("❌ 找不到挂载的宿主节点或没有子节点模板！");
            return;
        }

        const allBoxes = listNode.children; 

        // 🎯 【暗区核心动作一：全量真货源注入】
        // 物理调用你 ItemManager 的平铺接口，把 7 大类别的全部真物资抓出来
        let trueMarketPool: ItemAnyStruct[] = ItemManager.getAllItems();

        console.log(`📊 市集探测：成功抓取到 ${trueMarketPool.length} 种物理级核心物资。`);

        // 🎯 【暗区核心动作二：全物资高优商业排序】
        // 优先按照品质从高到低排（出金排最前），品质相同则按价格从贵到便宜排
        trueMarketPool.sort((itemA, itemB) => {
            const weightA = this._qualityWeight[itemA.quality] || 0;
            const weightB = this._qualityWeight[itemB.quality] || 0;
            
            if (weightB !== weightA) {
                return weightB - weightA; // 品质降序
            }
            return itemB.price - itemA.price; // 价格降序
        });

        // 🎯 【暗区核心动作三：双向物理边界安全拦截】
        const renderCount = Math.min(allBoxes.length, trueMarketPool.length);

        for (let i = 0; i < allBoxes.length; i++) {
            const boxNode = allBoxes[i] as Laya.Sprite;
            if (!boxNode) continue;

            const textNode = boxNode.getChildByName("Text") as any;

            if (i < renderCount) {
                // 格子在物理货架容量内，通电显示
                boxNode.visible = true;
                
                // 🎯 拿到了你对应 Manager 里配死的真结构体指针
                const item: ItemAnyStruct = trueMarketPool[i];

                if (textNode) {
                    // 1. 灌入公共的核心商业属性：名称、大类、以及市集流通价
                    let textContext = `【${item.itemType}】${item.name}\n`;
                    
                    // 2. 🎯 【极其硬核的属性穿透】：根据 itemType 阀门，榨干各大子表独有的作战性能字段
                    switch (item.itemType) {
                        case "武器":
                            // 穿透访问：攻击力、破甲级别、射程
                            textContext += `💥伤:${item.attack} | ⚡破甲:${item.penetration}级\n🎯射程:${item.range}米\n`;
                            break;

                        case "护甲":
                            // 穿透访问：防弹甲级、最大耐久
                            textContext += `🛡️防弹:${item.armorLevel}级 | 🛠️耐久:${item.maxDurability}\n`;
                            break;

                        case "药品":
                            // 穿透访问：回血量、去辐射值
                            textContext += `➕医疗:+${item.healHp}HP | ☢️抗辐:-${item.healRad}\n`;
                            break;

                        case "食物":
                            // 穿透访问：饱食、水分
                            textContext += `🍖饱食:+${item.satietyBonus} | 💧水分:+${item.waterBonus}\n`;
                            break;

                        case "背包":
                            // 穿透访问：扩容量
                            textContext += `🎒局内扩容: +${item.slotsBonus}格\n`;
                            break;

                        case "配件":
                            // 穿透访问：安装部位
                            textContext += `🔧改装部位: 【${item.slotType}】\n`;
                            break;

                        case "杂物":
                            // 基础材料无延伸属性
                            textContext += `📦 [基础废土工业原料]\n`;
                            break;
                    }

                    // 3. 补上最后明晃晃的商人收购价
                    textContext += `🪙 交易价: ${item.price}`;

                    // 4. 暴力上屏渲染
                    textNode.text = textContext;
                    textNode.color = this._qualityColors[item.quality] || "#ffffff";
                    textNode.fontSize = 16; // 暗区多行面板，稍微调小字号确保信息塞满不溢出
                    textNode.leading = 4;   // 调整多行行高，美化字距
                }
            } else {
                // 多余的静态 UI 框子直接物理隐藏，保证排版整洁
                boxNode.visible = false;
            }
        }
        console.log(`================ 🏪 市集上架完毕，成功铺货 ${renderCount} 类真实废土资产 ================`);
    }
}