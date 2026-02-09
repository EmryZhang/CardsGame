// 扑克牌花色
export enum CardSuit {
    HEART = 0,    // 红桃
    DIAMOND = 1,  // 方块
    CLUB = 2,     // 梅花
    SPADE = 3     // 黑桃
}

// 扑克牌点数（从1开始，对应A-K）
export enum CardFace {
    ACE = 1,      // A
    TWO = 2,      // 2
    THREE = 3,    // 3
    FOUR = 4,     // 4
    FIVE = 5,     // 5
    SIX = 6,      // 6
    SEVEN = 7,    // 7
    EIGHT = 8,    // 8
    NINE = 9,     // 9
    TEN = 10,     // 10
    JACK = 11,    // J
    QUEEN = 12,   // Q
    KING = 13     // K
}

// 卡牌配置接口
export interface CardConfig {
    CardFace: number;  // 点数（使用CardFace枚举值）
    CardSuit: number;  // 花色（使用CardSuit枚举值）
    Position: {
        x: number;
        y: number;
    };
}

// 关卡配置接口
export interface LevelConfig {
    Playfield: CardConfig[];  // 桌面牌区
    Stack: CardConfig[];      // 手牌区
}
