// GameMain.ts - 战棋 + 搜索资源
const { regClass } = Laya;
import { TILE, COLS, ROWS, VIEW_W, VIEW_H, MAP, isWalkable } from "./MapData";
import { createPlayer, moveTo, calcRange, showHL, clearHL, doAttackAt, PlayerState } from "./Combat";
import { createEnemies, EnemyState, getEnemyAt } from "./Enemy";
import { buildUI, updateHP, UIControllers } from "./UI";
import { createLootPoints, LootPoint, getNearbyLoot, generateLoot } from "./Loot";

@regClass()
export class GameMain extends Laya.Script {
    private _mapLayer!: Laya.Sprite;
    private _player!: PlayerState;
    private _enemies: EnemyState[] = [];
    private _lootPoints: LootPoint[] = [];
    private _ui!: UIControllers;
    private _mode = "";
    private _highlights: Laya.Sprite[] = [];
    private _enemyTurn = false;
    private _searching = false;
    private _searchPanel: Laya.Sprite | null = null;
    private _nearbyLoot: LootPoint | null = null;

    onStart(): void {
        const root = this.owner as Laya.Sprite;
        const vp = new Laya.Sprite();
        vp.graphics.drawRect(0, 0, VIEW_W, VIEW_H, null);
        vp.scrollRect = new Laya.Rectangle(0, 0, VIEW_W, VIEW_H);
        root.addChild(vp);

        this._mapLayer = new Laya.Sprite(); vp.addChild(this._mapLayer);
        const g = this._mapLayer.graphics;
        const clr: Record<number, string> = { 1: "#88cc88", 2: "#8B4513" };
        for (let r = 0; r < ROWS; r++)
            for (let c = 0; c < COLS; c++)
                g.drawRect(c * TILE, r * TILE, TILE, TILE, clr[MAP[r][c]] || "#88cc88");
        for (let r = 0; r <= ROWS; r++) g.drawLine(0, r*TILE, COLS*TILE, r*TILE, "#00000033", 1);
        for (let c = 0; c <= COLS; c++) g.drawLine(c*TILE, 0, c*TILE, ROWS*TILE, "#00000033", 1);

        this._player = createPlayer(this._mapLayer);
        this._enemies = createEnemies(this._mapLayer);
        this._lootPoints = createLootPoints(this._mapLayer);

        Laya.stage.on(Laya.Event.CLICK, this, this.onMapClick);

        this._ui = buildUI(root, {
            onMove: () => this.enterMove(),
            onAttack: () => this.enterAttack(),
        });
    }

    // ====== 搜索按钮 ======
    private updateSearchBtn(): void {
        console.log("[搜索] 检测资源点, 玩家:", this._player.col, this._player.row);
        if (this._searchPanel) return;
        this._nearbyLoot = getNearbyLoot(this._player.col, this._player.row, this._lootPoints);
        console.log("[搜索] 附近资源:", this._nearbyLoot ? `(${this._nearbyLoot.col},${this._nearbyLoot.row})` : "无");
        // 找到已有的搜索按钮或创建
        let btn = (this.owner as Laya.Sprite).getChildByName("searchBtn") as Laya.Sprite;
        if (!this._nearbyLoot) {
            if (btn) { btn.removeSelf(); btn.destroy(); }
            return;
        }
        if (btn) return; // 已存在
        btn = new Laya.Sprite();
        btn.name = "searchBtn";
        btn.graphics.drawRect(0, 0, 120, 40, "#cc8800");
        btn.graphics.drawRect(0, 0, 120, 40, null, "#fff", 2);
        btn.x = VIEW_W / 2 - 60; btn.y = VIEW_H / 2 - 100;
        btn.width = 120; btn.height = 40;
        btn.zOrder = 100;
        (this.owner as Laya.Sprite).addChild(btn);
        const t = new Laya.Text();
        t.text = "🔍 搜索"; t.fontSize = 20; t.color = "#fff";
        t.x = 25; t.y = 8;
        btn.addChild(t);
        btn.on(Laya.Event.CLICK, this, () => { console.log("[搜索] 按钮被点击"); this.openSearchPanel(); });
    }

    // ====== 搜索面板 ======
    private openSearchPanel(): void {
        console.log("[搜索] openSearchPanel 被调用");
        if (this._searchPanel) { console.log("[搜索] 面板已存在，跳过"); return; }
        this._searching = true;
        const root = this.owner as Laya.Sprite;
        const panel = new Laya.Sprite();
        panel.name = "searchPanel";
        panel.graphics.drawRect(0, 0, 700, 550, "#1a1a2e");
        panel.graphics.drawRect(0, 0, 700, 550, null, "#888", 2);
        panel.x = 25; panel.y = 100; panel.zOrder = 200;
        root.addChild(panel);

        // 标题
        const title = new Laya.Text();
        title.text = "搜索中..."; title.fontSize = 24; title.color = "#ffcc00";
        title.x = 250; title.y = 10;
        panel.addChild(title);

        // 转圈动画（简单实现：画旋转线段）
        const spinner = new Laya.Sprite();
        spinner.x = 350; spinner.y = 200;
        panel.addChild(spinner);
        let angle = 0;
        const timer = Laya.timer.loop(50, this, () => {
            spinner.graphics.clear();
            for (let i = 0; i < 8; i++) {
                const a = angle + i * Math.PI / 4;
                const len = 10 + (i % 3) * 8;
                spinner.graphics.drawLine(0, 0, Math.cos(a) * len, Math.sin(a) * len, "#ffcc00", 3);
            }
            angle += 0.3;
        });

        // 2秒后出结果
        Laya.timer.once(2000, this, () => {
            Laya.timer.clear(this, timer);
            spinner.graphics.clear();
            spinner.graphics.drawCircle(0, 0, 30, "#44cc44");
            spinner.graphics.drawCircle(0, 0, 30, null, "#fff", 2);
            const ck = new Laya.Text(); ck.text = "✓"; ck.fontSize = 30; ck.color = "#fff"; ck.x = -12; ck.y = -18; spinner.addChild(ck);

            title.text = "搜索完成";

            const items = generateLoot();
            // 左边：玩家背包
            this.drawBackpack(panel, items);
            // 右边：资源容器
            this.drawLootContainer(panel, items);

            // 关闭按钮
            const closeBtn = new Laya.Sprite();
            closeBtn.graphics.drawRect(0, 0, 80, 30, "#cc4444");
            closeBtn.graphics.drawRect(0, 0, 80, 30, null, "#fff", 1);
            closeBtn.x = 310; closeBtn.y = 500;
            panel.addChild(closeBtn);
            const ct = new Laya.Text();
            ct.text = "关闭"; ct.fontSize = 18; ct.color = "#fff";
            ct.x = 22; ct.y = 5;
            closeBtn.addChild(ct);
            closeBtn.on(Laya.Event.CLICK, this, () => this.closeSearchPanel());
        });
        this._searchPanel = panel;
    }

    private drawBackpack(panel: Laya.Sprite, items: string[]): void {
        const bx = 30, by = 80;
        const bt = new Laya.Text(); bt.text = "背包"; bt.fontSize = 20; bt.color = "#fff"; bt.x = bx; bt.y = by - 30; panel.addChild(bt);
        for (let i = 0; i < 12; i++) {
            const cell = new Laya.Sprite();
            cell.graphics.drawRect(0, 0, 70, 70, "#2a2a4a");
            cell.graphics.drawRect(0, 0, 70, 70, null, "#666", 1);
            cell.x = bx + (i % 4) * 80; cell.y = by + Math.floor(i / 4) * 80;
            panel.addChild(cell);
        }
    }

    private drawLootContainer(panel: Laya.Sprite, items: string[]): void {
        const bx = 370, by = 80;
        const bt = new Laya.Text(); bt.text = "物资"; bt.fontSize = 20; bt.color = "#ffcc00"; bt.x = bx; bt.y = by - 30; panel.addChild(bt);
        for (let i = 0; i < items.length; i++) {
            const cell = new Laya.Sprite();
            cell.graphics.drawRect(0, 0, 70, 70, "#3a3a5a");
            cell.graphics.drawRect(0, 0, 70, 70, null, "#ffcc00", 2);
            cell.x = bx + (i % 4) * 80; cell.y = by + Math.floor(i / 4) * 80;
            panel.addChild(cell);
            const t = new Laya.Text();
            t.text = items[i]; t.fontSize = 14; t.color = "#fff"; t.x = cell.x + 5; t.y = cell.y + 5;
            panel.addChild(t);
            // 点击拾取
            cell.on(Laya.Event.CLICK, this, () => {
                console.log(`[搜索] 拾取: ${items[i]}`);
                cell.removeSelf(); cell.destroy();
                t.removeSelf(); t.destroy();
            });
        }
        // 标记已搜刮
        if (this._nearbyLoot) {
            this._nearbyLoot.looted = true;
            this._nearbyLoot.sprite.alpha = 0.3;
        }
    }

    private closeSearchPanel(): void {
        if (this._searchPanel) {
            this._searchPanel.removeSelf();
            this._searchPanel.destroy();
            this._searchPanel = null;
        }
        this._searching = false;
        this._nearbyLoot = null;
        // 删除搜索按钮
        const btn = (this.owner as Laya.Sprite).getChildByName("searchBtn") as Laya.Sprite;
        if (btn) { btn.removeSelf(); btn.destroy(); }
    }

    // ====== 玩家回合 ======
    private enterMove(): void {
        if (this._enemyTurn || this._searching) return;
        clearHL(this._highlights);
        this._mode = "move";
        this._highlights = showHL(this._mapLayer, calcRange(this._player.col, this._player.row, 3), "#44ff44");
    }

    private enterAttack(): void {
        if (this._enemyTurn || this._searching) return;
        clearHL(this._highlights);
        this._mode = "attack";
        const dirs = [[1,0],[-1,0],[0,-1],[0,1]];
        const cells: [number, number][] = [];
        for (const [dc, dr] of dirs) {
            const nc = this._player.col + dc, nr = this._player.row + dr;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) cells.push([nc, nr]);
        }
        this._highlights = showHL(this._mapLayer, cells, "#ff0000");
    }

    private onMapClick(): void {
        if (Laya.stage.mouseY > VIEW_H || this._enemyTurn || this._searching) return;
        const gx = Math.floor((Laya.stage.mouseX - this._mapLayer.x) / TILE);
        const gy = Math.floor((Laya.stage.mouseY - this._mapLayer.y) / TILE);
        if (gx < 0 || gx >= COLS || gy < 0 || gy >= ROWS) return;

        if (this._mode === "move") {
            for (const h of this._highlights) {
                if (Math.floor(h.x / TILE) === gx && Math.floor(h.y / TILE) === gy) {
                    console.log(`[玩家] 移动: (${this._player.col},${this._player.row}) → (${gx},${gy})`);
                    moveTo(this._player, this._mapLayer, gx, gy);
                    this.updateSearchBtn();
                    break;
                }
            }
            clearHL(this._highlights); this._mode = "";
            this.enemyTurn();
        } else if (this._mode === "attack") {
            let attacked = false;
            for (const h of this._highlights) {
                if (Math.floor(h.x / TILE) === gx && Math.floor(h.y / TILE) === gy) {
                    const enemy = getEnemyAt(this._enemies, gx, gy);
                    if (enemy) console.log(`[玩家] 攻击敌人: (${gx},${gy}) HP:${enemy.hp}→${enemy.hp-20}`);
                    doAttackAt(this._player, this._enemies, gx, gy);
                    attacked = true;
                    break;
                }
            }
            clearHL(this._highlights); this._mode = "";
            if (attacked) this.enemyTurn();
        }
    }

    // ====== 敌人回合 ======
    private enemyTurn(): void {
        this._enemyTurn = true;
        console.log("[敌人回合] 开始");
        Laya.timer.once(300, this, () => this.doEnemyStep(0));
    }

    private doEnemyStep(idx: number): void {
        if (idx >= this._enemies.length) {
            console.log("[敌人回合] 结束");
            this._enemyTurn = false;
            return;
        }
        const e = this._enemies[idx];
        const dc = this._player.col - e.col, dr = this._player.row - e.row;
        const dist = Math.abs(dc) + Math.abs(dr);
        if (dist <= 1) {
            if (Math.abs(dc) > Math.abs(dr)) e.sprite.rotation = dc > 0 ? 0 : 180;
            else e.sprite.rotation = dr > 0 ? 90 : -90;
            this._player.hp = Math.max(0, this._player.hp - 10);
            updateHP(this._ui, this._player.hp, this._player.maxHp);
            this._player.sprite.alpha = 0.5;
            Laya.timer.once(200, this, () => { this._player.sprite.alpha = 1; });
            console.log(`[敌人回合] 敌人${idx} 攻击玩家, 玩家HP: ${this._player.hp}`);
        } else {
            let cx = e.col, cy = e.row;
            for (let step = 0; step < 2; step++) {
                const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
                let best: [number, number] | null = null, bestD = 999;
                for (const [ddc, ddr] of dirs) {
                    const nc = cx + ddc, nr = cy + ddr;
                    if (!isWalkable(nc, nr)) continue;
                    if (getEnemyAt(this._enemies, nc, nr)) continue;
                    if (nc === this._player.col && nr === this._player.row) continue;
                    const nd = Math.abs(this._player.col - nc) + Math.abs(this._player.row - nr);
                    if (nd < bestD) { bestD = nd; best = [nc, nr]; }
                }
                if (best) { cx = best[0]; cy = best[1]; }
            }
            e.col = cx; e.row = cy;
            e.sprite.x = cx * TILE + TILE / 2; e.sprite.y = cy * TILE + TILE / 2;
        }
        Laya.timer.once(300, this, () => this.doEnemyStep(idx + 1));
    }
}
