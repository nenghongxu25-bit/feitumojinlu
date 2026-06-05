export interface BagStruct {
    id: number;
    name: string;
    itemType: "背包";
    quality: "垃圾" | "普通" | "军规" | "罕见" | "传世";
    price: number;
    slotsBonus: number;   // 增加的背包格子空间
    desc: string;
}

export default class BagManager {
    private static list: BagStruct[] = [
        { id: 5501, name: "破旧麻袋", itemType: "背包", quality: "垃圾", price: 30, slotsBonus: 6, desc: "用麻绳勉强挂在肩上的袋子。" },
        { id: 5502, name: "战术轻量背包", itemType: "背包", quality: "普通", price: 300, slotsBonus: 15, desc: "标准军旅背包，扩容效果极佳。" },
        { id: 5503, name: "外骨骼携行具", itemType: "背包", quality: "传世", price: 1800, slotsBonus: 30, desc: "带机械助力的极硬核背负系统，容量拉满。" }
    ];

    public static getList(): BagStruct[] { return this.list; }
}