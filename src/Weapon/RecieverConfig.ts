import { SlotType } from "./SlotTypes";

export interface Receiver {
    id: number;
    name: string;
    baseAttack: number;
    baseStaminaCost: number;
    speedPenalty: number;
    weight: number;
    allowedSlots: SlotType[];
}

export const Receivers: Receiver[] = [
    // --- 长枪：通过更换枪管来改装 ---
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
    },

    // --- 手枪：裸枪本体，不装枪管配件 ---
    { 
        id: 4001, name: "左轮手枪", 
        baseAttack: 70, baseStaminaCost: 6, speedPenalty: 4, weight: 1.0, 
        allowedSlots: [SlotType.MUZZLE, SlotType.OPTIC] 
    },
    { 
        id: 4002, name: "大口径手枪", 
        baseAttack: 110, baseStaminaCost: 9, speedPenalty: 8, weight: 1.4, 
        allowedSlots: [SlotType.MUZZLE, SlotType.GRIP] 
    },
    { 
        id: 4003, name: "便携手枪", 
        baseAttack: 45, baseStaminaCost: 4, speedPenalty: 2, weight: 0.6, 
        allowedSlots: [SlotType.MUZZLE, SlotType.OPTIC, SlotType.GRIP] 
    },
    // --- 突击步枪 ---
    { id: 1001, name: "AK545", baseAttack: 45, baseStaminaCost: 5, speedPenalty: 6, weight: 3.4, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.GRIP] },
    { id: 1002, name: "M556", baseAttack: 42, baseStaminaCost: 4, speedPenalty: 5, weight: 3.2, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK, SlotType.GRIP] },
    { id: 1003, name: "AK762", baseAttack: 55, baseStaminaCost: 7, speedPenalty: 8, weight: 3.8, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.GRIP] },
    
    // --- 战斗步枪 ---
    { id: 2001, name: "M762战斗步枪", baseAttack: 65, baseStaminaCost: 8, speedPenalty: 10, weight: 4.0, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK, SlotType.GRIP] },
    { id: 2002, name: "M68战斗步枪", baseAttack: 62, baseStaminaCost: 8, speedPenalty: 9, weight: 3.9, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK, SlotType.GRIP] },
    
    // --- 射手步枪 ---
    { id: 2101, name: "MK762", baseAttack: 85, baseStaminaCost: 10, speedPenalty: 12, weight: 4.5, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK] },
    { id: 2102, name: "AM545", baseAttack: 75, baseStaminaCost: 8, speedPenalty: 10, weight: 4.1, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK] },
    { id: 2103, name: "AT762", baseAttack: 80, baseStaminaCost: 9, speedPenalty: 11, weight: 4.3, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK] },
    { id: 2104, name: "HK556", baseAttack: 72, baseStaminaCost: 7, speedPenalty: 9, weight: 4.0, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.STOCK] },
    
    // --- 轻机枪 ---
    { id: 3101, name: "MN556", baseAttack: 48, baseStaminaCost: 6, speedPenalty: 14, weight: 6.5, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.GRIP] },
    { id: 3102, name: "RP545", baseAttack: 46, baseStaminaCost: 6, speedPenalty: 14, weight: 6.2, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC, SlotType.GRIP] },
    
    // --- 通用机枪 ---
    { id: 3201, name: "G762", baseAttack: 60, baseStaminaCost: 9, speedPenalty: 18, weight: 8.0, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC] },
    { id: 3202, name: "PK762", baseAttack: 62, baseStaminaCost: 10, speedPenalty: 18, weight: 8.2, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC] },
    { id: 3203, name: "RM762", baseAttack: 58, baseStaminaCost: 9, speedPenalty: 17, weight: 7.8, allowedSlots: [SlotType.BARREL, SlotType.MUZZLE, SlotType.OPTIC] },
    
    // --- 重机枪 ---
    { id: 4101, name: "LGM127", baseAttack: 150, baseStaminaCost: 20, speedPenalty: 30, weight: 15.0, allowedSlots: [SlotType.OPTIC] },
    { id: 4102, name: "DS127", baseAttack: 145, baseStaminaCost: 20, speedPenalty: 30, weight: 15.5, allowedSlots: [SlotType.OPTIC] },
    // --- 弓弩类：更强调体力消耗与拉力 ---
// 弓通常无法安装枪管（BARREL），但可以安装瞄具和握把
{ id: 6001, name: "猎弓", baseAttack: 60, baseStaminaCost: 5, speedPenalty: 2, weight: 0.8, allowedSlots: [SlotType.OPTIC] },
{ id: 6002, name: "反曲弓", baseAttack: 75, baseStaminaCost: 6, speedPenalty: 2, weight: 1.0, allowedSlots: [SlotType.OPTIC, SlotType.GRIP] },
{ id: 6003, name: "复合弓", baseAttack: 95, baseStaminaCost: 8, speedPenalty: 3, weight: 1.2, allowedSlots: [SlotType.OPTIC, SlotType.GRIP] },

// --- 弩类：高穿透，高启动门槛 ---
{ id: 6101, name: "十字弩", baseAttack: 110, baseStaminaCost: 10, speedPenalty: 6, weight: 2.5, allowedSlots: [SlotType.OPTIC] },
{ id: 6102, name: "袖珍手弩", baseAttack: 40, baseStaminaCost: 3, speedPenalty: 1, weight: 0.5, allowedSlots: [SlotType.OPTIC] },
{ id: 6103, name: "反曲弩", baseAttack: 130, baseStaminaCost: 12, speedPenalty: 7, weight: 2.8, allowedSlots: [SlotType.OPTIC, SlotType.GRIP] },
{ id: 6104, name: "复合弩", baseAttack: 150, baseStaminaCost: 15, speedPenalty: 8, weight: 3.2, allowedSlots: [SlotType.OPTIC, SlotType.GRIP] },
    // 短柄系列
    { id: 7001, name: "木质短柄", baseAttack: 8, baseStaminaCost: 2, speedPenalty: -1, weight: 0.4, allowedSlots: [SlotType.HEAD] },
    { id: 7002, name: "复合短柄", baseAttack: 10, baseStaminaCost: 2, speedPenalty: -2, weight: 0.3, allowedSlots: [SlotType.HEAD] },
    { id: 7003, name: "碳素短柄", baseAttack: 12, baseStaminaCost: 2, speedPenalty: -3, weight: 0.2, allowedSlots: [SlotType.HEAD] },

    // 中柄系列
    { id: 7004, name: "木质中柄", baseAttack: 12, baseStaminaCost: 3, speedPenalty: 1, weight: 0.7, allowedSlots: [SlotType.HEAD] },
    { id: 7005, name: "复合中柄", baseAttack: 15, baseStaminaCost: 3, speedPenalty: 0, weight: 0.6, allowedSlots: [SlotType.HEAD] },
    { id: 7006, name: "碳素中柄", baseAttack: 18, baseStaminaCost: 3, speedPenalty: -1, weight: 0.5, allowedSlots: [SlotType.HEAD] },

    // 长柄系列
    { id: 7007, name: "木质长柄", baseAttack: 16, baseStaminaCost: 5, speedPenalty: 3, weight: 1.2, allowedSlots: [SlotType.HEAD] },
    { id: 7008, name: "复合长柄", baseAttack: 20, baseStaminaCost: 5, speedPenalty: 2, weight: 1.0, allowedSlots: [SlotType.HEAD] },
    { id: 7009, name: "碳素长柄", baseAttack: 24, baseStaminaCost: 5, speedPenalty: 1, weight: 0.8, allowedSlots: [SlotType.HEAD] }
    
];