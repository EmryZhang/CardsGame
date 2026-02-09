/**
 * 游戏数据管理器
 * 负责管理游戏流程，数据操作委托给Models层
 */
import { JsonAsset, resources } from 'cc';
import { LevelConfig } from '../models/CardData';
import { GameModel } from '../models/GameModel';
import { UndoModel, ActionType, GameAction } from '../models/UndoModel';

export class DataManager {
    private static _instance: DataManager = null;

    // 静态配置数据
    private _currentLevelConfig: LevelConfig = null;
    private _currentLevelId: number = 1;

    // 数据模型
    private _gameModel: GameModel = new GameModel();
    private _undoModel: UndoModel = new UndoModel();

    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }

    /**
     * 加载关卡配置
     * @param levelId 关卡ID
     */
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

    /**
     * 清空所有数据
     */
    public clearAllData(): void {
        this._gameModel.clearAll();
        this._undoModel.clearHistory();
    }

    /**
     * 获取当前关卡配置
     */
    public get currentLevelConfig(): LevelConfig {
        return this._currentLevelConfig;
    }

    /**
     * 获取当前关卡ID
     */
    public get currentLevelId(): number {
        return this._currentLevelId;
    }

    /**
     * 获取游戏模型
     */
    public get gameModel(): GameModel {
        return this._gameModel;
    }

    /**
     * 获取回退模型
     */
    public get undoModel(): UndoModel {
        return this._undoModel;
    }

    /**
     * 执行匹配操作
     * @param tableCardId 桌面卡牌ID
     * @returns 是否成功匹配
     */
    public executeMatch(tableCardId: string): boolean {
        // 保存操作前的状态
        this.saveStateBeforeAction({
            type: ActionType.MATCH,
            tableCardId: tableCardId
        });

        // 执行匹配
        return this._gameModel.executeMatch(tableCardId);
    }

    /**
     * 替换手牌最后一张
     * @param cardId 要替换的卡牌ID
     * @returns 是否成功替换
     */
    public replaceLastHandCard(cardId: string): boolean {
        // 保存操作前的状态
        this.saveStateBeforeAction({
            type: ActionType.REPLACE,
            cardId: cardId
        });

        // 执行替换
        return this._gameModel.replaceLastHandCard(cardId);
    }

    /**
     * 保存操作前的状态
     */
    private saveStateBeforeAction(action: GameAction): void {
        const cardsState = this._gameModel.getAllCardsState();
        this._undoModel.saveAction(action, cardsState);
    }

    /**
     * 撤销上一步操作
     * @returns 是否成功撤销
     */
    public undo(): boolean {
        const record = this._undoModel.undo();
        if (!record) return false;

        this._gameModel.restoreAllCardsState(record.cardsState);
        return true;
    }

    /**
     * 清空历史记录
     */
    public clearHistory(): void {
        this._undoModel.clearHistory();
    }

    /**
     * 获取历史记录数量
     */
    public getHistoryCount(): number {
        return this._undoModel.getHistoryCount();
    }

    /**
     * 检查是否可以撤销
     */
    public canUndo(): boolean {
        return this._undoModel.canUndo();
    }
}
