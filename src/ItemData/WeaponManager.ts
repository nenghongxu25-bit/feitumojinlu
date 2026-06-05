// 核心枚举
export enum SlotType { 
    BARREL = "枪管", 
    MUZZLE = "枪口", 
    OPTIC = "瞄具", 
    STOCK = "枪托", 
    GRIP = "握把" 
}

// 枪机接口
export interface Receiver {
    id: number;
    name: string;
    baseAttack: number;
    baseStaminaCost: number;
    speedPenalty: number;
    weight: number;
    allowedSlots: SlotType[];
}

// 枪管接口
export interface Barrel {
    id: number;
    name: string;
    weight: number;
    stats: { 
        attack?: number; 
        range?: number; 
        penetration?: number; 
        ergonomics?: number; 
    };
}

// 🆕 WeaponStruct —— 武器物资结构
export interface WeaponStruct {
    id: number;
    name: string;
    itemType: "武器";
    quality: "垃圾" | "普通" | "军规" | "罕见" | "传世";
    price: number;
    receiver: Receiver;
    barrel?: Barrel;
    desc: string;
}

// 武器库数据（必须在 class 前面！class 初始化时引用）
export const Receivers: Receiver[] = [
    { 
        id: 3001, name: "折开式枪机", 
        baseAttack: 120, baseStaminaCost: 12, speedPenalty: 12, weight: 1.2, 
        allowedSlots: [SlotType.BARREL] 
    },
    { 
        id: 3002, name: "泵动式枪机", 
        baseAttack: 80, baseStaminaCost: 10, speedPenalty: 12, weight: 1.9, 
        allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.GRIP] 
    },
    { 
        id: 3003, name: "杠杆式枪机", 
        baseAttack: 90, baseStaminaCost: 8, speedPenalty: 12, weight: 1.5, 
        allowedSlots: [SlotType.BARREL, SlotType.OPTIC, SlotType.STOCK] 
    }
];

export const Barrels: Barrel[] = [
    { 
        id: 5001, name: "霰弹短枪管", weight: 0.9, 
        stats: { range: -5, ergonomics: 15, attack: 5 } 
    },
    { 
        id: 5002, name: "霰弹长枪管", weight: 1.3, 
        stats: { range: 15, penetration: 2, ergonomics: -10 } 
    },
    { 
        id: 5003, name: "截式双管", weight: 1.7, 
        stats: { range: -15, attack: 40, penetration: 0 } 
    }
];

export default class WeaponManager {
    private static list: WeaponStruct[] = [
        { id: 3001, name: "霰弹枪", itemType: "武器", quality: "普通", price: 200, receiver: Receivers[0], desc: "近距离大范围杀伤" },
        { id: 3002, name: "泵动式霰弹枪", itemType: "武器", quality: "军规", price: 500, receiver: Receivers[1], desc: "经典泵动式霰弹枪" },
        { id: 3003, name: "杠杆步枪", itemType: "武器", quality: "罕见", price: 1200, receiver: Receivers[2], desc: "快速连射的杠杆步枪" },
    ];

    public static getList(): WeaponStruct[] { return this.list; }
}
