/**
 * 运行时卡牌数据模型
 * 用于管理卡牌在游戏过程中的动态状态
 */
import { CardConfig } from './CardData';

export class RuntimeCardData {
    // 卡牌唯一ID
    public readonly id: string;

    // 静态配置数据
    public readonly config: CardConfig;

    // 动态状态数据
    public isFaceUp: boolean = false;        // 是否正面朝上
    public isLocked: boolean = false;        // 是否被锁定（不可移动）
    public currentArea: string = '';         // 当前所在区域（table/hand等）
    public position: { x: number; y: number } = { x: 0, y: 0 };  // 当前位置
    public zIndex: number = 0;               // 层级

    // 历史状态（用于回退）
    private stateHistory: CardState[] = [];

    constructor(config: CardConfig, id?: string) {
        this.config = config;
        this.id = id || this.generateId();
        this.position = { ...config.Position };
    }

    /**
     * 生成唯一ID
     */
    private generateId(): string {
        return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 保存当前状态到历史记录
     */
    public saveState(): void {
        const state: CardState = {
            isFaceUp: this.isFaceUp,
            isLocked: this.isLocked,
            currentArea: this.currentArea,
            position: { ...this.position },
            zIndex: this.zIndex
        };
        this.stateHistory.push(state);
    }

    /**
     * 回退到上一个状态
     * @returns 是否成功回退
     */
    public restoreState(): boolean {
        if (this.stateHistory.length === 0) return false;

        const lastState = this.stateHistory.pop();
        if (lastState) {
            this.isFaceUp = lastState.isFaceUp;
            this.isLocked = lastState.isLocked;
            this.currentArea = lastState.currentArea;
            this.position = { ...lastState.position };
            this.zIndex = lastState.zIndex;
            return true;
        }
        return false;
    }

    /**
     * 清空历史记录
     */
    public clearHistory(): void {
        this.stateHistory = [];
    }

    /**
     * 获取历史记录数量
     */
    public getHistoryCount(): number {
        return this.stateHistory.length;
    }
}

/**
 * 卡牌状态接口
 */
export interface CardState {
    isFaceUp: boolean;
    isLocked: boolean;
    currentArea: string;
    position: { x: number; y: number };
    zIndex: number;
}
