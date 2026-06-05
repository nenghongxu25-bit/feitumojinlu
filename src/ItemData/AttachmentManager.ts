export interface AttachmentStruct {
    id: number;
    name: string;
    itemType: "配件";
    quality: "垃圾" | "普通" | "军规" | "罕见" | "传世";
    price: number;
    slotType: "瞄具" | "枪口" | "弹匣";
    desc: string;
}

export default class AttachmentManager {
    private static list: AttachmentStruct[] = [
        { id: 6601, name: "战术消音器", itemType: "配件", quality: "普通", price: 260, slotType: "枪口", desc: "大幅降低武器开火时引发的噪音。" },
        { id: 6602, name: "4倍全息瞄准镜", itemType: "配件", quality: "军规", price: 500, slotType: "瞄具", desc: "中距离精准锁头神器。" },
        { id: 6603, name: "扩容快速弹匣", itemType: "配件", quality: "普通", price: 180, slotType: "弹匣", desc: "火力续航提升，换弹速度微升。" }
    ];

    public static getList(): AttachmentStruct[] { return this.list; }
}