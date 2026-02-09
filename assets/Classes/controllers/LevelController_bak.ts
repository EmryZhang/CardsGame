import { _decorator, Color, Component, instantiate, JsonAsset, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { GameConfig } from '../configs/GameConfig';
import { CardConfig, LevelConfig } from '../models/CardData';


const { ccclass, property } = _decorator;

@ccclass('LevelController')
export default class LevelController extends Component {
    // --- 属性定义 ---
    @property(Prefab) cardPrefab: Prefab = null;
    @property(Node) handArea: Node = null;
    @property(Node) tableArea: Node = null;
    
    // --- 资源引用 ---
    @property([SpriteFrame]) bigRedNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) bigBlackNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) smallRedNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) smallBlackNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) suitSprites: SpriteFrame[] = [];
    
    private suitSymbols: string[] = ['♣', '♦', '♥', '♠'];
    private faceTexts: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    private levelConfig: LevelConfig = null;
    
    async onLoad() {
        // 1. 初始化配置
        await this.initializeConfig();
        // 2. 加载关卡
        this.loadLevelFromFile();
    }

    private async initializeConfig(): Promise<void> {
        await GameConfig.instance.initialize();
    }
    
    private loadLevelFromFile(): void {
        resources.load('levels/level_1', JsonAsset, (err, asset) => {
            if (err) return console.error(err);
            this.levelConfig = asset.json as LevelConfig;
            this.createCardsFromConfig();
        });
    }
    
    private createCardsFromConfig(): void {
        if (!this.levelConfig || !this.cardPrefab) return;
        
        this.tableArea.removeAllChildren();
        this.handArea.removeAllChildren();
        
        const layoutConfig = GameConfig.instance.layoutConfig;
        
        // 1. 创建桌面牌
        this.levelConfig.Playfield?.forEach((cardConfig, index) => {
            this.createTableCard(cardConfig, index, layoutConfig);
        });
        
        // 2. 创建手牌
        const totalHandCards = this.levelConfig.Stack?.length || 0;
        this.levelConfig.Stack?.forEach((cardConfig, index) => {
            this.createHandCard(cardConfig, index, layoutConfig, totalHandCards);
        });
    }
    
    // --- 创建桌面牌 ---
    private createTableCard(config: CardConfig, index: number, layoutConfig: any): void {
        const cardNode = instantiate(this.cardPrefab);
        this.tableArea.addChild(cardNode);
        
        this.setupCardDisplay(cardNode, config, 'table', index);
        
        // 读取配置位置
        // 注意：这里保留了简单的坐标转换，如果你的配置已经是Cocos坐标，可以去掉偏移计算
        let posX = config.Position.x;
        let posY = config.Position.y;
        
        // 简单的向下微调，防止卡牌超出屏幕上边缘
        posX = posX - 540;  
        posY = posY - 960 + 300; 

        cardNode.setPosition(posX, posY, 0);
        cardNode.setSiblingIndex(index); // 确保渲染顺序
    }
    
    // --- 创建手牌 (核心修改逻辑) ---
    private createHandCard(config: CardConfig, index: number, layoutConfig: any, totalCards: number): void {
        const cardNode = instantiate(this.cardPrefab);
        this.handArea.addChild(cardNode);
        
        this.setupCardDisplay(cardNode, config, 'hand', index);
        this.setupHandCardPosition(cardNode, index, layoutConfig, totalCards);
    }

    // --- 设置手牌位置 (已移除硬编码，改为通用逻辑) ---
    private setupHandCardPosition(
        cardNode: Node, 
        index: number, 
        layoutConfig: any, 
        totalCards: number
    ): void {
        // 安全获取配置，如果 layoutConfig 为空，使用后面的默认值 (??) 防止不显示
        console.log('布局配置:', layoutConfig);
        // 这里为了兼容你可能还没改好的 JSON 字段，做了一些兼容处理
        const handConf = layoutConfig?.handLayout || {};
        
        // 读取配置参数 (带有默认值，保证绝对能显示出来)
        const stackX = handConf.stackStartX ?? handConf.stackStartX ?? -350;
        const startY = handConf.stackStartY ?? 0;
        const spacingX = handConf.horizontalSpacing ?? handConf.stackSpacingX ?? 100;
        
        // 右侧单张的位置
        const separateX = handConf.separateCardX ?? handConf.separateCardX ?? 200; 
        const separateY = handConf.separateCardY ?? handConf.separateCardY ?? startY;

        let posX = 0;
        let posY = startY;
        let zIndex = index;

        // --- 核心逻辑：判断是否是最后一张 ---
        if (index === totalCards - 1) {
            // 是最后一张 -> 放在右边固定位置
            posX = separateX;
            posY = separateY;
            zIndex = 100; // 放在最上层
        } else {
            // 是前面的牌 -> 左边堆叠
            // 公式：起始X + (当前索引 * 间距)
            posX = stackX + (index * spacingX);
            posY = startY;
            zIndex = index; // 正常层级
        }
        
        cardNode.setPosition(posX, posY, 0);
        cardNode.setSiblingIndex(zIndex);
        
        console.log(`手牌 ${index} 位置: (${posX}, ${posY})`);
    }

    // --- 通用显示设置 ---
    private setupCardDisplay(cardNode: Node, config: CardConfig, area: string, index: number): void {
        const isRed = this.isRedSuit(config.CardSuit);
        
        // 辅助函数：安全设置图片
        const setSprite = (name: string, spriteFrame: SpriteFrame) => {
            const node = cardNode.getChildByName(name);
            if (node) {
                const sp = node.getComponent(Sprite);
                if (sp) {
                    sp.spriteFrame = spriteFrame;
                    sp.color = Color.WHITE;
                }
            }
        };

        setSprite('bigNum', this.getNumberSprite(config.CardFace, true, isRed));
        setSprite('smallNum', this.getNumberSprite(config.CardFace, false, isRed));
        
        if (config.CardSuit >= 0 && config.CardSuit < this.suitSprites.length) {
            setSprite('suit', this.suitSprites[config.CardSuit]);
        }

        cardNode.name = `${area}_${index}_${this.getCardName(config)}`;
    }
    
    private isRedSuit(suit: number): boolean {
        return suit === 1 || suit === 2;
    }
    
    private getNumberSprite(face: number, isBig: boolean, isRed: boolean): SpriteFrame | null {
        if (face < 0 || face > 12) return null;
        const arr = isBig 
            ? (isRed ? this.bigRedNumbers : this.bigBlackNumbers)
            : (isRed ? this.smallRedNumbers : this.smallBlackNumbers);
        return arr[face] || null;
    }
    
    private getCardName(config: CardConfig): string {
        return `${this.suitSymbols[config.CardSuit] || '?'}${this.faceTexts[config.CardFace] || '?'}`;
    }
}
