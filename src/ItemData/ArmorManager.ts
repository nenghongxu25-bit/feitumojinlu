export interface ArmorStruct {
    id: number;
    name: string;
    itemType: "护甲";
    quality: "垃圾" | "普通" | "军规" | "罕见" | "传世";
    price: number;
    armorLevel: number;    // 防御阶级 (1~5级甲)
    maxDurability: number; // 护甲耐久度
    desc: string;
}

export default class ArmorManager {
    private static list: ArmorStruct[] = [
        { id: 4401, name: "废土拾荒皮衣", itemType: "护甲", quality: "普通", price: 200, armorLevel: 1, maxDurability: 50, desc: "碎皮拼接的衣物，防刀不防弹。" },
        { id: 4402, name: "前卫队警用防弹衣", itemType: "护甲", quality: "军规", price: 900, armorLevel: 3, maxDurability: 120, desc: "合金插板防弹衣，完美御除手枪弹。" },
        { id: 4403, name: "重型全防护装甲", itemType: "护甲", quality: "传世", price: 5000, armorLevel: 5, maxDurability: 300, desc: "军武重工业结晶，废土行走的坦克。" }
    ];

    public static getList(): ArmorStruct[] { return this.list; }
}