// models/LayoutConfig.ts
/**
 * 布局配置接口
 */
export interface ILayoutConfig {
    designWidth: number;      // 设计宽度
    designHeight: number;     // 设计高度
    cardWidth: number;       // 卡牌宽度
    cardHeight: number;      // 卡牌高度
    
    // 桌面布局
    tableLayout: {
        centerX: number;     // 中心X坐标
        centerY: number;     // 中心Y坐标
        scale: number;       // 缩放比例
    };
    
    // 手牌布局
    handLayout: {
        mode?: string;       // 布局模式
        stackStartX: number; // 堆叠起始X坐标
        stackStartY: number; // 堆叠起始Y坐标
        stackSpacingX: number; // 堆叠间距
        separateCardX: number; // 独立卡牌X坐标
        separateCardY: number; // 独立卡牌Y坐标
    };
}

/**
 * 默认布局配置
 */
export const DEFAULT_LAYOUT_CONFIG: ILayoutConfig = {
    designWidth: 1080,
    designHeight: 2080,
    cardWidth: 300,
    cardHeight: 180,
    tableLayout: {
        centerX: 0,
        centerY: 300,
        scale: 1.0
    },
    handLayout: {
        mode: "stack_last_separate",
        stackStartX: -200,
        stackStartY: 750,
        stackSpacingX: 100,
        separateCardX: 350,
        separateCardY: 750
    }
};
