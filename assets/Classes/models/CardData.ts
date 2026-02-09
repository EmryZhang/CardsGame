// 扑克牌花色
export enum CardSuit {
    CLUB = 0,    // 梅花
    DIAMOND = 1,  // 方块
    HEART = 2,     // 红桃
    SPADE = 3     // 黑桃
}

// 扑克牌点数（从0开始，对应A-K）
export enum CardFace {
    ACE = 0,      // A
    TWO = 1,      // 2
    THREE = 2,    // 3
    FOUR = 3,     // 4
    FIVE = 4,     // 5
    SIX = 5,      // 6
    SEVEN = 6,    // 7
    EIGHT = 7,    // 8
    NINE = 8,     // 9
    TEN = 9,      // 10
    JACK = 10,    // J
    QUEEN = 11,   // Q
    KING = 12     // K
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
