/**
 * 回退模型
 * 负责管理操作历史和撤销功能
 */
import { CardState } from './CardModel';

/**
 * 游戏操作类型
 */
export enum ActionType {
    MATCH = 'match',      // 匹配操作
    REPLACE = 'replace'   // 替换操作
}

/**
 * 游戏操作接口
 */
export interface GameAction {
    type: ActionType;
    [key: string]: any;
}

/**
 * 操作记录接口
 */
export interface ActionRecord {
    action: GameAction;
    cardsState: Map<string, CardState>;
}

export class UndoModel {
    // 操作历史记录
    private _actionHistory: ActionRecord[] = [];

    // 最大历史记录数
    private _maxHistorySize: number = 50;

    constructor(maxHistorySize: number = 50) {
        this._maxHistorySize = maxHistorySize;
    }

    /**
     * 保存操作前的状态
     */
    public saveAction(action: GameAction, cardsState: Map<string, CardState>): void {
        // 保存操作记录
        this._actionHistory.push({
            action: action,
            cardsState: cardsState
        });

        // 限制历史记录数量
        if (this._actionHistory.length > this._maxHistorySize) {
            this._actionHistory.shift();
        }
    }

    /**
     * 获取上一步操作
     */
    public getLastAction(): ActionRecord | undefined {
        if (this._actionHistory.length === 0) return undefined;
        return this._actionHistory[this._actionHistory.length - 1];
    }

    /**
     * 撤销上一步操作
     * @returns 操作记录，如果没有可撤销的操作则返回undefined
     */
    public undo(): ActionRecord | undefined {
        if (this._actionHistory.length === 0) return undefined;
        return this._actionHistory.pop();
    }

    /**
     * 清空历史记录
     */
    public clearHistory(): void {
        this._actionHistory = [];
    }

    /**
     * 获取历史记录数量
     */
    public getHistoryCount(): number {
        return this._actionHistory.length;
    }

    /**
     * 检查是否可以撤销
     */
    public canUndo(): boolean {
        return this._actionHistory.length > 0;
    }

    /**
     * 获取所有历史记录
     */
    public getAllHistory(): ActionRecord[] {
        return [...this._actionHistory];
    }
}
