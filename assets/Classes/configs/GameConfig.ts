import { JsonAsset, resources } from 'cc';
import { DEFAULT_LAYOUT_CONFIG, ILayoutConfig } from '../models/LayoutConfig';

export class GameConfig {
    private static _instance: GameConfig = null;
    private _layoutConfig: ILayoutConfig = null;
    
    public static get instance(): GameConfig {
        if (!this._instance) {
            this._instance = new GameConfig();
        }
        return this._instance;
    }
    
    public async initialize(): Promise<boolean> {
        if (this._layoutConfig) return true; // 避免重复加载
        
        console.log('⚙️ 初始化游戏配置...');
        const success = await this.loadLayoutConfig();
        return success;
    }
    
    private async loadLayoutConfig(): Promise<boolean> {
        return new Promise((resolve) => {
            resources.load('configs/LayoutConfig', JsonAsset, (err, asset) => {
                if (err) {
                    console.warn('⚠️ 加载JSON失败，使用默认配置:', err);
                    // 关键：加载失败时，赋值默认配置
                    this._layoutConfig = DEFAULT_LAYOUT_CONFIG;
                    resolve(false);
                } else {
                    console.log('✅ 布局配置加载成功');
                    this._layoutConfig = asset.json as ILayoutConfig;
                    resolve(true);
                }
            });
        });
    }
    
    public get layoutConfig(): ILayoutConfig {
        // 如果还没初始化，直接返回默认值，防止报错
        return this._layoutConfig || DEFAULT_LAYOUT_CONFIG;
    }
}
