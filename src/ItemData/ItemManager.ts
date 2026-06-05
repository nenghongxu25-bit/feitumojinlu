const { regClass } = Laya;

// 🔴 全量引入 7 大分布式子账本
import FoodManager, { FoodStruct } from "./FoodManager";
import WeaponManager, { WeaponStruct } from "./WeaponManager";
import MedicineManager, { MedicineStruct } from "./MedicineManager";
import ArmorManager, { ArmorStruct } from "./ArmorManager";
import BagManager, { BagStruct } from "./BagManager";
import GadgetManager, { GadgetStruct } from "./GadgetManager";
import AttachmentManager, { AttachmentStruct } from "./AttachmentManager";

// 🌟 核心修正：将 & 全部改为 | (联合类型)，允许 itemType 互斥存在，彻底解除 never 封印！
export type ItemAnyStruct = FoodStruct | WeaponStruct | MedicineStruct | ArmorStruct | BagStruct | GadgetStruct | AttachmentStruct;

@regClass()
export default class ItemManager extends Laya.Script {
    
    // 📦 超级大仓库：用全局唯一的物资 ID 作为 Key，强行锁死物资数据指针
    private static totalDb: Map<number, ItemAnyStruct> = new Map();

    /**
     * 🔴 总装中心核心初始化：游戏一开始调用一次，全量物资自动归位！
     */
    public static init(): void {
        // 清空老账本，防止重复盘点
        this.totalDb.clear();

        // 🧼 顺藤摸瓜：将各大分表的数据一条条抽干，塞进超级大仓库
        if (typeof FoodManager !== "undefined" && FoodManager.getList) {
            FoodManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }
        if (typeof WeaponManager !== "undefined" && WeaponManager.getList) {
            WeaponManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }
        if (typeof MedicineManager !== "undefined" && MedicineManager.getList) {
            MedicineManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }
        if (typeof ArmorManager !== "undefined" && ArmorManager.getList) {
            ArmorManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }
        if (typeof BagManager !== "undefined" && BagManager.getList) {
            BagManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }
        if (typeof GadgetManager !== "undefined" && GadgetManager.getList) {
            GadgetManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }
        if (typeof AttachmentManager !== "undefined" && AttachmentManager.getList) {
            AttachmentManager.getList().forEach(item => this.totalDb.set(item.id, item as any));
        }

        console.log(`[数据中心] ⚡ 经历了闪退危机，废土分布式总账本已重新合盘总装完毕！当前全量货源总数: ${this.totalDb.size} 种。`);
    }

    /**
     * 🟢 万能指针访问接口：ItemManager.get(ID)
     * 作用：传入任意一个物资ID，瞬间调出它压箱底的全部属性
     */
    public static get(id: number): ItemAnyStruct | undefined {
        if (this.totalDb.size === 0) {
            this.init(); // 自动保底触发盘点
        }
        return this.totalDb.get(id);
    }

    /**
     * 🌟 货架开放解耦接口：ItemManager.getAllItems()
     * 作用：把 Map 瞬间拍平，供市场或背包系统过滤切标签
     */
    public static getAllItems(): ItemAnyStruct[] {
        if (this.totalDb.size === 0) {
            this.init(); // 自动保底触发盘点
        }
        return Array.from(this.totalDb.values());
    }
}