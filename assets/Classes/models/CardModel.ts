import { CardConfig } from './CardData';

// 扑克牌数据模型
export class CardModel {
    public readonly id: string;                         // 唯一标识符
    public readonly config: CardConfig;                  // 基础配置
    
    public isFaceUp: boolean = false;                   // 是否正面朝上
    public isLocked: boolean = false;                   // 是否锁定
    public currentArea: string = '';                    // 当前所在区域
    public position: { x: number; y: number } = { x: 0, y: 0 };  // 当前位置
    public zIndex: number = 0;                          // 层级深度

    constructor(config: CardConfig, id?: string) {
        this.config = config;
        this.id = id || this.generateId();
        this.position = { ...config.Position };
    }

    // 生成唯一ID
    private generateId(): string {
        return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 更新位置
    public updatePosition(x: number, y: number): void {
        this.position = { x, y };
    }

    // 更新区域
    public updateArea(area: string): void {
        this.currentArea = area;
    }

    // 设置锁定状态
    public setLocked(locked: boolean): void {
        this.isLocked = locked;
    }

    // 克隆当前卡片
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
 * 卡牌状态快照
 */
export interface CardState {
    id: string;                                          // 唯一标识符
    face: number;                                        // 牌面
    suit: number;                                        // 花色
    isFaceUp: boolean;                                   // 是否正面朝上
    isLocked: boolean;                                   // 是否锁定
    area: string;                                        // 所在区域
    position: { x: number; y: number };                  // 位置
    zIndex: number;                                      // 层级深度
}
