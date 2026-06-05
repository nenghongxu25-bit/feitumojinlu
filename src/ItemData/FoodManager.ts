export interface FoodStruct {
    id: number;
    name: string;
    itemType: "食物";
    quality: "垃圾" | "普通" | "军规" | "罕见" | "传世";
    price: number;
    satietyBonus: number; // 恢复饱食
    waterBonus: number;   // 恢复水分
    desc: string;
}

export default class FoodManager {
    private static list: FoodStruct[] = [
        { id: 1001, name: "过期罐头", itemType: "食物", quality: "垃圾", price: 15, satietyBonus: 25, waterBonus: -5, desc: "散发着酸味的肉罐头，勉强能果腹。" },
        { id: 1002, name: "压缩饼干", itemType: "食物", quality: "普通", price: 30, satietyBonus: 50, waterBonus: -15, desc: "极度干燥，吃完会口渴得厉害。" },
        { id: 1003, name: "纯净水", itemType: "食物", quality: "普通", price: 20, satietyBonus: 0, waterBonus: 40, desc: "废土中珍贵的无辐射净水。" },
        { id: 1004, name: "军用口粮", itemType: "食物", quality: "军规", price: 120, satietyBonus: 80, waterBonus: 20, desc: "前文明的高能野战口粮，完美补充机能。" }
    ];

    public static getList(): FoodStruct[] { return this.list; }
}