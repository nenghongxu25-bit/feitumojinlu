// UI.ts - 底部界面
export interface UIControllers {
    hpBar: Laya.Sprite;
    hpText: Laya.Text;
}

export function buildUI(root: Laya.Sprite, callbacks: {
    onMove: () => void;
    onAttack: () => void;
}): UIControllers {
    const uy = 750;
    const bg = new Laya.Sprite();
    bg.graphics.drawRect(0, uy, 750, 584, "#1a1a2e");
    root.addChild(bg);

    // 血条
    const hpBg = new Laya.Sprite();
    hpBg.graphics.drawRect(20, uy+10, 200, 20, "#333");
    hpBg.graphics.drawRect(20, uy+10, 200, 20, null, "#888", 1);
    root.addChild(hpBg);

    const hpBar = new Laya.Sprite();
    hpBar.graphics.drawRect(0, 0, 200, 20, "#44cc44");
    hpBar.x = 20; hpBar.y = uy+10;
    root.addChild(hpBar);

    const hpText = new Laya.Text();
    hpText.text = `HP 100/100`;
    hpText.fontSize = 16; hpText.color = "#fff";
    hpText.x = 25; hpText.y = uy+11;
    root.addChild(hpText);

    // 行动条
    const actions = ["移动", "攻击", "防御", "道具"];
    for (let i = 0; i < actions.length; i++) {
        const x = 20 + i * 105;
        const ab = new Laya.Sprite();
        ab.graphics.drawRect(0, 0, 95, 36, "#3a3a5a");
        ab.graphics.drawRect(0, 0, 95, 36, null, "#888", 1);
        ab.width = 95; ab.height = 36;
        ab.x = x; ab.y = uy+50;
        root.addChild(ab);

        const at = new Laya.Text();
        at.text = actions[i]; at.fontSize = 18; at.color = "#fff";
        at.x = x+15; at.y = uy+56;
        root.addChild(at);

        if (i === 0) ab.on(Laya.Event.CLICK, ab, callbacks.onMove);
        if (i === 1) ab.on(Laya.Event.CLICK, ab, callbacks.onAttack);
    }

    // 装备栏
    const slots = ["主手", "副手", "头盔", "护甲", "鞋子"];
    for (let i = 0; i < 5; i++) {
        const x = 20 + i * 80;
        const s = new Laya.Sprite();
        s.graphics.drawRect(0, 0, 60, 60, "#2a2a4a");
        s.graphics.drawRect(0, 0, 60, 60, null, "#666", 1);
        s.x = x; s.y = uy+100;
        root.addChild(s);

        const t = new Laya.Text();
        t.text = slots[i]; t.fontSize = 12; t.color = "#888";
        t.x = x+5; t.y = uy+162;
        root.addChild(t);
    }

    return { hpBar, hpText };
}

export function updateHP(ui: UIControllers, hp: number, maxHp: number): void {
    const w = Math.max(0, (hp / maxHp) * 200);
    const c = hp / maxHp > 0.5 ? "#44cc44" : hp / maxHp > 0.25 ? "#cccc44" : "#cc4444";
    ui.hpBar.graphics.clear();
    ui.hpBar.graphics.drawRect(0, 0, w, 20, c);
    ui.hpText.text = `HP ${hp}/${maxHp}`;
}
