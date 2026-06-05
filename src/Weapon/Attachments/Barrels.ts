import { SlotType, Attachment } from "../SlotTypes";
export const Barrels: Attachment[] = [
    { id: 5001, name: "霰弹短枪管", type: SlotType.BARREL, weight: 0.9, stats: { range: -5, ergonomics: 15, attack: 5 } },
    { id: 5002, name: "霰弹长枪管", type: SlotType.BARREL, weight: 1.3, stats: { range: 15, penetration: 2, ergonomics: -10 } },
    { id: 5003, name: "截式双管", type: SlotType.BARREL, weight: 1.7, stats: { range: -15, attack: 40, penetration: 0 } }
];