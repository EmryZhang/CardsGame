import { CardConfig } from './CardData';

/**
 * 运行时卡牌数据模型
 */
export class RuntimeCardData {
    public readonly id: string;
    public readonly config: CardConfig;
    
    public isFaceUp: boolean = false;
    public isLocked: boolean = false;
    public currentArea: string = '';
    public position: { x: number; y: number } = { x: 0, y: 0 };
    public zIndex: number = 0;
    
    private stateHistory: CardState[] = [];

    constructor(config: CardConfig, id?: string) {
        this.config = config;
        this.id = id || this.generateId();
        this.position = { ...config.Position };
    }

    private generateId(): string {
        return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 保存当前状态
    public saveState(): void {
        this.stateHistory.push({
            isFaceUp: this.isFaceUp,
            isLocked: this.isLocked,
            currentArea: this.currentArea,
            position: { ...this.position },
            zIndex: this.zIndex
        });
    }

    // 恢复到上一个状态
    public restoreState(): boolean {
        if (this.stateHistory.length === 0) return false;
        const lastState = this.stateHistory.pop();
        if (!lastState) return false;
        
        this.isFaceUp = lastState.isFaceUp;
        this.isLocked = lastState.isLocked;
        this.currentArea = lastState.currentArea;
        this.position = { ...lastState.position };
        this.zIndex = lastState.zIndex;
        return true;
    }

    // 清空历史记录
    public clearHistory(): void {
        this.stateHistory = [];
    }

    // 获取历史记录数量
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
