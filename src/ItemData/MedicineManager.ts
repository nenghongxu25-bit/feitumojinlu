export interface MedicineStruct {
    id: number;
    name: string;
    itemType: "药品";
    quality: "垃圾" | "普通" | "军规" | "罕见" | "传世";
    price: number;
    healHp: number;       // 瞬间回血
    healRad: number;      // 治疗辐射
    desc: string;
}

export default class MedicineManager {
    private static list: MedicineStruct[] = [
        { id: 3301, name: "脏污绷带", itemType: "药品", quality: "垃圾", price: 10, healHp: 15, healRad: 0, desc: "简陋撕扯的布条，勉强止血。" },
        { id: 3302, name: "急救针剂", itemType: "药品", quality: "普通", price: 80, healHp: 50, healRad: 0, desc: "含有肾上腺素的战术医疗针，迅速回血。" },
        { id: 3303, name: "抗辐宁", itemType: "药品", quality: "军规", price: 150, healHp: 5, healRad: 60, desc: "专门清除体内危及生命的核辐射。" }
    ];

    public static getList(): MedicineStruct[] { return this.list; }
}