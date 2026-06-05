export enum SlotType { 
    BARREL = "枪管", 
    MUZZLE = "枪口", 
    OPTIC = "瞄具", 
    STOCK = "枪托", 
    GRIP = "握把" ,  
    HEAD = "近战头" 
}

export interface Attachment {
    id: number;
    name: string;
    type: SlotType;
    weight: number;
    stats: { 
        attack?: number; 
        range?: number; 
        penetration?: number; 
        ergonomics?: number; 
    };
}