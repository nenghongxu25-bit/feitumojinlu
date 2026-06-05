import { SlotType, Attachment } from "../SlotTypes";

export const MeleeHeads: Attachment[] = [
    // 棒头系列
    { id: 9001, name: "生铁棒头", type: SlotType.HEAD, weight: 0.6, stats: { attack: 18 } },
    { id: 9002, name: "钢制棒头", type: SlotType.HEAD, weight: 0.5, stats: { attack: 20 } },
    { id: 9003, name: "合金棒头", type: SlotType.HEAD, weight: 0.4, stats: { attack: 24 } },
    
    // 刀刃系列
    { id: 9004, name: "生铁刀刃", type: SlotType.HEAD, weight: 0.4, stats: { attack: 27 } },
    { id: 9005, name: "钢制刀刃", type: SlotType.HEAD, weight: 0.3, stats: { attack: 30 } },
    { id: 9006, name: "合金刀刃", type: SlotType.HEAD, weight: 0.2, stats: { attack: 36 } },

    // 斧头系列
    { id: 9007, name: "生铁斧头", type: SlotType.HEAD, weight: 0.7, stats: { attack: 36 } },
    { id: 9008, name: "钢制斧头", type: SlotType.HEAD, weight: 0.6, stats: { attack: 40 } },
    { id: 9009, name: "合金斧头", type: SlotType.HEAD, weight: 0.5, stats: { attack: 48 } },

    // 锤头系列
    { id: 9010, name: "生铁锤头", type: SlotType.HEAD, weight: 0.9, stats: { attack: 40 } },
    { id: 9011, name: "钢制锤头", type: SlotType.HEAD, weight: 0.8, stats: { attack: 45 } },
    { id: 9012, name: "合金锤头", type: SlotType.HEAD, weight: 0.7, stats: { attack: 54 } },

    // 枪头系列
    { id: 9013, name: "生铁枪头", type: SlotType.HEAD, weight: 0.5, stats: { attack: 31 } },
    { id: 9014, name: "钢制枪头", type: SlotType.HEAD, weight: 0.4, stats: { attack: 35 } },
    { id: 9015, name: "合金枪头", type: SlotType.HEAD, weight: 0.3, stats: { attack: 42 } }
];