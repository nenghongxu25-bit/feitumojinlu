// Enemy.ts - 敌人
import { TILE } from "./MapData";

export interface EnemyState {
    sprite: Laya.Sprite;
    col: number;
    row: number;
    hp: number;
    maxHp: number;
    hpBar: Laya.Sprite;
}

export function createEnemies(mapLayer: Laya.Sprite): EnemyState[] {
    const list: EnemyState[] = [];
    const pos = [[5,5],[10,8],[15,3],[8,12],[20,15],[25,5],[12,20],[3,18],[22,8],[7,15]];
    for (const [ec, er] of pos) {
        const s = new Laya.Sprite();
        s.graphics.drawCircle(0, 0, 35, "#cc6600");
        s.graphics.drawCircle(0, 0, 35, null, "#ffffff", 2);
        s.x = ec * TILE + TILE / 2;
        s.y = er * TILE + TILE / 2;
        s.zOrder = 9;
        mapLayer.addChild(s);
        const bar = new Laya.Sprite();
        bar.graphics.drawRect(-20, -45, 40, 5, "#333");
        bar.graphics.drawRect(-20, -45, 40, 5, null, "#888", 1);
        s.addChild(bar);
        const fill = new Laya.Sprite();
        fill.graphics.drawRect(0, 0, 40, 5, "#44cc44");
        fill.name = "fill"; fill.x = -20; fill.y = -45;
        s.addChild(fill);
        list.push({ sprite: s, col: ec, row: er, hp: 30, maxHp: 30, hpBar: fill });
    }
    return list;
}

export function getEnemyAt(enemies: EnemyState[], c: number, r: number): EnemyState | null {
    return enemies.find(e => e.col === c && e.row === r) || null;
}

export function damageEnemy(e: EnemyState, dmg: number, enemies: EnemyState[]): void {
    e.hp -= dmg;
    // 更新血条
    const r = Math.max(0, e.hp / e.maxHp);
    e.hpBar.graphics.clear();
    e.hpBar.graphics.drawRect(0, 0, 40 * r, 5, r > 0.5 ? "#44cc44" : r > 0.25 ? "#cccc44" : "#cc4444");
    // 受击闪红
    const f2 = new Laya.Sprite();
    f2.graphics.drawCircle(0, 0, 35, "#ff000066");
    f2.zOrder = 25;
    e.sprite.addChild(f2);
    Laya.timer.once(200, null, () => { f2.removeSelf(); f2.destroy(); });
    if (e.hp <= 0) {
        e.sprite.removeSelf();
        e.sprite.destroy();
        const idx = enemies.indexOf(e);
        if (idx >= 0) enemies.splice(idx, 1);
    }
}
