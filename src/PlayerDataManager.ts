// src/PlayerDataManager.ts
export default class PlayerDataManager {
    private static _instance: PlayerDataManager;
    public static get instance(): PlayerDataManager {
        if (!this._instance) this._instance = new PlayerDataManager();
        return this._instance;
    }
}