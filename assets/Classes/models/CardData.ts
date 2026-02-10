// 扑克牌花色枚举
export enum CardSuit {
  CLUB = 0,    // 梅花
  DIAMOND = 1, // 方块
  HEART = 2,   // 红桃
  SPADE = 3    // 黑桃
}

// 扑克牌点数枚举
export enum CardFace {
  ACE = 0,    // A
  TWO = 1,    // 2
  THREE = 2,  // 3
  FOUR = 3,   // 4
  FIVE = 4,   // 5
  SIX = 5,    // 6
  SEVEN = 6,  // 7
  EIGHT = 7,  // 8
  NINE = 8,   // 9
  TEN = 9,    // 10
  JACK = 10,  // J
  QUEEN = 11, // Q
  KING = 12   // K
}

// 单张卡牌配置
export interface CardConfig {
  CardFace: number;  // 点数
  CardSuit: number;  // 花色
  Position: {
    x: number;       // X坐标
    y: number;       // Y坐标
  };
}

// 关卡配置
export interface LevelConfig {
  Playfield: CardConfig[];  // 桌面牌区
  Stack: CardConfig[];      // 手牌区
}
