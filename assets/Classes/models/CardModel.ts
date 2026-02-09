/**
 * 卡牌模型
 * 负责管理单张卡牌的数据和状态
 */
import { CardConfig } from './CardData';

export class CardModel {
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
     * 更新卡牌位置
     */
    public updatePosition(x: number, y: number): void {
        this.position = { x, y };
    }

    /**
     * 更新卡牌区域
     */
    public updateArea(area: string): void {
        this.currentArea = area;
    }

    /**
     * 翻转卡牌
     */
    public flip(): void {
        this.isFaceUp = !this.isFaceUp;
    }

    /**
     * 锁定/解锁卡牌
     */
    public setLocked(locked: boolean): void {
        this.isLocked = locked;
    }

    /**
     * 克隆卡牌状态
     */
    public clone(): CardModel {
        const cloned = new CardModel(this.config, this.id);
        cloned.isFaceUp = this.isFaceUp;
        cloned.isLocked = this.isLocked;
        cloned.currentArea = this.currentArea;
        cloned.position = { ...this.position };
        cloned.zIndex = this.zIndex;
        return cloned;
    }
}

/**
 * 卡牌状态接口（用于序列化）
 */
export interface CardState {
    id: string;
    face: number;
    suit: number;
    isFaceUp: boolean;
    isLocked: boolean;
    area: string;
    position: { x: number; y: number };
    zIndex: number;
}
