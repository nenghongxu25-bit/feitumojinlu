export interface GadgetStruct { id: number; name: string; itemType: "杂物"; quality: "垃圾"; price: number; desc: string; }
export default class GadgetManager {
    private static list: GadgetStruct[] = [
        { id: 7701, name: "废钢铁", itemType: "杂物", quality: "垃圾", price: 2, desc: "基础的锻造和升级安全屋材料。" },
        { id: 7702, name: "火药火工品", itemType: "杂物", quality: "垃圾", price: 8, desc: "复配子弹用的易燃易爆物。" }
    ];
    public static getList(): GadgetStruct[] { return this.list; }
}