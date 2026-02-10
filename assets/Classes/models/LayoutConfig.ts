// models/LayoutConfig.ts

export interface ILayoutConfig {
    designWidth: number;
    designHeight: number;
    cardWidth: number;
    cardHeight: number;
    
    // 对应 JSON 中的 tableLayout: { "centerX": 0, "centerY": 300, "scale": 1.0 }
    tableLayout: {
        centerX: number;
        centerY: number;
        scale: number;
    };
    
    // 对应 JSON 中的 handLayout
    handLayout: {
        mode?: string;         // "stack_last_separate"
        
        // 左侧堆叠组配置
        stackStartX: number;   // JSON: "stackStartX"
        stackStartY: number;   // JSON: "stackStartY"
        stackSpacingX: number; // JSON: "stackSpacingX"
        
        // 右侧单独卡牌配置
        separateCardX: number; // JSON: "separateCardX"
        separateCardY: number; // JSON: "separateCardY"
    };
}

// 默认配置也要改成一样的字段名
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
