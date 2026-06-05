// Loot.ts - 资源点 + 搜索系统
import { TILE, isWalkable, COLS, ROWS } from "./MapData";

export interface LootPoint {
    sprite: Laya.Sprite; col: number; row: number; looted: boolean;
}

export function createLootPoints(mapLayer: Laya.Sprite): LootPoint[] {
    const list: LootPoint[] = [];
    const pos = [[7,7],[13,5],[18,12],[25,8],[10,20],[22,18],[6,14],[28,10],[15,22],[4,25]];
    for (const [c, r] of pos) {
        if (!isWalkable(c, r)) continue;
        const sp = new Laya.Sprite();
        sp.graphics.drawRect(-15, -15, 30, 30, "#ffcc00");
        sp.graphics.drawRect(-15, -15, 30, 30, null, "#fff", 2);
        sp.graphics.drawLine(0, -10, 0, 10, "#fff", 2);
        sp.graphics.drawLine(-10, 0, 10, 0, "#fff", 2);
        sp.x = c * TILE + TILE / 2; sp.y = r * TILE + TILE / 2; sp.zOrder = 8;
        mapLayer.addChild(sp);
        list.push({ sprite: sp, col: c, row: r, looted: false });
    }
    return list;
}

export function getNearbyLoot(pc: number, pr: number, points: LootPoint[]): LootPoint | null {
    for (const lp of points) {
        if (lp.looted) { console.log(`[搜索] 跳过已搜索: (${lp.col},${lp.row})`); continue; }
        const dist = Math.abs(lp.col - pc) + Math.abs(lp.row - pr);
        console.log(`[搜索] 检测资源点 (${lp.col},${lp.row}) 距离玩家: ${dist}`);
        if (dist <= 1) return lp;
    }
    return null;
}

export function generateLoot(): string[] {
    const pool = ["矿泉水","压缩饼干","绷带","子弹","电池","罐头","止痛药","废铁","布料","火药"];
    const count = 2 + Math.floor(Math.random() * 4);
    const items: string[] = [];
    for (let i = 0; i < count; i++) items.push(pool[Math.floor(Math.random() * pool.length)]);
    return items;
}
