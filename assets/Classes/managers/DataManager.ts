import { JsonAsset, resources } from 'cc';
import { LevelConfig } from '../models/CardData';
import { GameModel } from '../models/GameModel';
import { ActionType, GameAction, UndoModel } from '../models/UndoModel';

/**
 * 游戏数据管理器
 */
export class DataManager {
    private static _instance: DataManager = null;
    
    private _currentLevelConfig: LevelConfig = null;
    private _currentLevelId: number = 1;
    private _gameModel: GameModel = new GameModel();
    private _undoModel: UndoModel = new UndoModel();

    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }

    // 加载关卡配置
    public async loadLevel(levelId: number): Promise<boolean> {
        return new Promise((resolve) => {
            const levelPath = `levels/level_${levelId}`;
            resources.load(levelPath, JsonAsset, (err, asset) => {
                if (err) {
                    console.error(`加载关卡 ${levelId} 失败:`, err);
                    resolve(false);
                    return;
                }

                this._currentLevelConfig = asset.json as LevelConfig;
                this._currentLevelId = levelId;
                this._gameModel.initialize(this._currentLevelConfig);
                resolve(true);
            });
        });
    }

    // 清空所有数据
    public clearAllData(): void {
        this._gameModel.clearAll();
        this._undoModel.clearHistory();
    }

    public get currentLevelConfig(): LevelConfig {
        return this._currentLevelConfig;
    }

    public get currentLevelId(): number {
        return this._currentLevelId;
    }

    public get gameModel(): GameModel {
        return this._gameModel;
    }

    public get undoModel(): UndoModel {
        return this._undoModel;
    }

    // 执行匹配操作
    public executeMatch(tableCardId: string): boolean {
        this.saveStateBeforeAction({
            type: ActionType.MATCH,
            tableCardId: tableCardId
        });
        return this._gameModel.executeMatch(tableCardId);
    }

    // 替换手牌最后一张
    public replaceLastHandCard(cardId: string): boolean {
        this.saveStateBeforeAction({
            type: ActionType.REPLACE,
            cardId: cardId
        });
        return this._gameModel.replaceLastHandCard(cardId);
    }

    // 保存操作前的状态
    private saveStateBeforeAction(action: GameAction): void {
        const cardsState = this._gameModel.getAllCardsState();
        this._undoModel.saveAction(action, cardsState);
    }

    // 撤销上一步操作
    public undo(): boolean {
        const record = this._undoModel.undo();
        if (!record) return false;
        this._gameModel.restoreAllCardsState(record.cardsState);
        return true;
    }

    // 清空历史记录
    public clearHistory(): void {
        this._undoModel.clearHistory();
    }

    // 获取历史记录数量
    public getHistoryCount(): number {
        return this._undoModel.getHistoryCount();
    }

    // 检查是否可以撤销
    public canUndo(): boolean {
        return this._undoModel.canUndo();
    }
}
