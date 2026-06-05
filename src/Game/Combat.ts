// Combat.ts - 玩家控制 + 移动范围 + 攻击
import { TILE, VIEW_W, VIEW_H, COLS, ROWS, isWalkable } from "./MapData";
import { EnemyState, getEnemyAt, damageEnemy } from "./Enemy";

export interface PlayerState {
    sprite: Laya.Sprite; col: number; row: number; facing: number; hp: number; maxHp: number;
}

export function createPlayer(mapLayer: Laya.Sprite): PlayerState {
    const sp = new Laya.Sprite();
    sp.graphics.drawCircle(0, 0, 35, "#ff4444"); sp.graphics.drawCircle(0, 0, 35, null, "#ffffff", 3);
    sp.graphics.drawLine(0, 0, 45, 0, "#ffffff", 3); sp.graphics.drawLine(45, 0, 33, -8, "#ffffff", 2); sp.graphics.drawLine(45, 0, 33, 8, "#ffffff", 2);
    sp.zOrder = 10; mapLayer.addChild(sp);
    const p: PlayerState = { sprite: sp, col: 1, row: 1, facing: 0, hp: 100, maxHp: 100 };
    moveTo(p, mapLayer, 1, 1);
    return p;
}

export function moveTo(p: PlayerState, mapLayer: Laya.Sprite, c: number, r: number): void {
    p.col = c; p.row = r;
    p.sprite.x = c * TILE + TILE / 2; p.sprite.y = r * TILE + TILE / 2;
    mapLayer.x = VIEW_W / 2 - p.sprite.x; mapLayer.y = VIEW_H / 2 - p.sprite.y;
    p.sprite.rotation = [0, 180, -90, 90][p.facing];
}

export function moveStep(p: PlayerState, mapLayer: Laya.Sprite, dc: number, dr: number): void {
    if (dc === 1) p.facing = 0; else if (dc === -1) p.facing = 1;
    else if (dr === -1) p.facing = 2; else if (dr === 1) p.facing = 3;
    const nc = p.col + dc, nr = p.row + dr;
    if (isWalkable(nc, nr)) moveTo(p, mapLayer, nc, nr);
}

// 计算移动范围（BFS）
export function calcRange(sc: number, sr: number, steps: number): [number, number][] {
    const visited = new Set<string>();
    const result: [number, number][] = [];
    const queue: [number, number, number][] = [[sc, sr, 0]];
    visited.add(`${sc},${sr}`);
    while (queue.length > 0) {
        const [c, r, d] = queue.shift()!;
        if (d > 0 && d <= steps) result.push([c, r]);
        if (d >= steps) continue;
        for (const [dc, dr] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nc = c + dc, nr = r + dr, key = `${nc},${nr}`;
            if (!visited.has(key) && isWalkable(nc, nr)) { visited.add(key); queue.push([nc, nr, d + 1]); }
        }
    }
    return result;
}

// 显示高亮格子
export function showHL(mapLayer: Laya.Sprite, cells: [number, number][], color: string): Laya.Sprite[] {
    const list: Laya.Sprite[] = [];
    const cr = parseInt(color.slice(1,3), 16), cg = parseInt(color.slice(3,5), 16), cb = parseInt(color.slice(5,7), 16);
    const fill = `rgba(${cr},${cg},${cb},0.3)`;
    for (const [c, r] of cells) {
        const h = new Laya.Sprite();
        h.graphics.drawRect(0, 0, TILE, TILE, fill);
        h.graphics.drawRect(0, 0, TILE, TILE, null, color, 2);
        h.x = c * TILE; h.y = r * TILE; h.zOrder = 20; mapLayer.addChild(h); list.push(h);
    }
    return list;
}

export function clearHL(list: Laya.Sprite[]): void {
    for (const h of list) { h.removeSelf(); h.destroy(); }
    list.length = 0;
}

// 执行攻击
export function doAttackAt(p: PlayerState, enemies: EnemyState[], tc: number, tr: number): void {
    // 面朝攻击方向
    const dx = tc - p.col, dy = tr - p.row;
    if (dx === 1) p.facing = 0; else if (dx === -1) p.facing = 1;
    else if (dy === -1) p.facing = 2; else if (dy === 1) p.facing = 3;
    doAttack(p, enemies, tc, tr);
}

export function doAttack(p: PlayerState, enemies: EnemyState[], tc?: number, tr?: number): void {
    const ax = tc ?? (p.col + [[1,0],[-1,0],[0,-1],[0,1]][p.facing][0]);
    const ay = tr ?? (p.row + [[1,0],[-1,0],[0,-1],[0,1]][p.facing][1]);
    if (ay < 0 || ay >= ROWS || ax < 0 || ax >= COLS) return;
    p.sprite.rotation = [0, 180, -90, 90][p.facing];
    const flash = new Laya.Sprite(); flash.graphics.drawRect(-50, -20, 100, 40, "#ffffff88"); flash.zOrder = 20;
    p.sprite.addChild(flash);
    Laya.timer.once(200, null, () => { flash.removeSelf(); flash.destroy(); });
    const e = getEnemyAt(enemies, ax, ay);
    if (e) damageEnemy(e, 20, enemies);
}
