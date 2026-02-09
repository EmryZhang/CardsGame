import { _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { GameConfig } from '../configs/GameConfig';
import { DataManager } from '../managers/DataManager';
import { CardModel } from '../models/CardModel';
import { CardUtils } from '../utils/CardUtils';
import CardView from '../views/CardView';

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

    async onLoad() {
        // 1. 初始化配置
        await this.initializeConfig();
        // 2. 加载关卡
        await this.loadLevel();
        // 3. 创建卡牌视图
        this.createCardsFromData();
    }

    private async initializeConfig(): Promise<void> {
        await GameConfig.instance.initialize();
    }

    private async loadLevel(): Promise<void> {
        const success = await DataManager.instance.loadLevel(1);
        if (!success) {
            console.error('加载关卡失败');
        }
    }

    private createCardsFromData(): void {
        if (!this.cardPrefab) return;

        this.tableArea.removeAllChildren();
        this.handArea.removeAllChildren();

        const layoutConfig = GameConfig.instance.layoutConfig;

        // 1. 创建桌面牌
        DataManager.instance.gameModel.tableCards.forEach((cardData) => {
            this.createTableCard(cardData, layoutConfig);
        });

        // 2. 创建手牌
        const totalHandCards = DataManager.instance.gameModel.handCards.size;
        DataManager.instance.gameModel.handCards.forEach((cardData) => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
        });
    }

    // --- 创建桌面牌 ---
    private createTableCard(cardData: CardModel, layoutConfig: any): void {
        console.log('创建桌面牌:', cardData);
        const cardNode = instantiate(this.cardPrefab);
        this.tableArea.addChild(cardNode);

        // 将cardId存储到节点属性上
        (cardNode as any).cardId = cardData.id;
        console.log('已将cardId存储到节点属性:', cardData.id);

        this.setupCardDisplay(cardNode, cardData);

        // 设置点击回调
        const cardView = cardNode.getComponent(CardView);
        if (cardView) {
            cardView.setClickCallback((view: CardView) => {
                console.log('点击了桌面卡牌:', view.getCardData());
                this.onTableCardClick(cardNode);
            });
            console.log('桌面卡牌点击回调已设置');
        } else {
            console.error('未找到CardView组件！');
        }

        // 使用CardModel中的位置
        let posX = cardData.position.x;
        let posY = cardData.position.y;

        // 简单的向下微调，防止卡牌超出屏幕上边缘
        posX = posX - 540;
        posY = posY - 960 + 300;

        cardNode.setPosition(posX, posY, 0);
        cardNode.setSiblingIndex(cardData.zIndex); // 确保渲染顺序
    }

    // --- 创建手牌 ---
    private createHandCard(cardData: CardModel, layoutConfig: any, totalCards: number): void {
        console.log('创建手牌:', cardData);
        const cardNode = instantiate(this.cardPrefab);
        this.handArea.addChild(cardNode);

        // 将cardId存储到节点属性上
        (cardNode as any).cardId = cardData.id;
        console.log('已将cardId存储到节点属性:', cardData.id);

        this.setupCardDisplay(cardNode, cardData);
        this.setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards);

        // 设置点击回调
        const cardView = cardNode.getComponent(CardView);
        if (cardView) {
            cardView.setClickCallback((view: CardView) => {
                console.log('点击了手牌:', view.getCardData());
                this.onHandCardClick(cardNode);
            });
            console.log('手牌点击回调已设置');
        } else {
            console.error('未找到CardView组件！');
        }
    }

    // --- 设置手牌位置 ---
    private setupHandCardPosition(
        cardNode: Node,
        cardData: CardModel,
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

        // 获取当前卡牌的索引
        const index = Array.from(DataManager.instance.gameModel.handCards.values()).indexOf(cardData);

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
    private setupCardDisplay(cardNode: Node, cardData: CardModel): void {
        const config = cardData.config;
        const isRed = CardUtils.isRedSuit(config.CardSuit);

        // 初始化CardView
        const cardView = cardNode.getComponent(CardView);
        if (cardView) {
            const index = Array.from(
                cardData.currentArea === 'table' 
                    ? DataManager.instance.gameModel.tableCards.values()
                    : DataManager.instance.gameModel.handCards.values()
            ).indexOf(cardData);
            cardView.init(cardData, index, cardData.currentArea);
            console.log('CardView初始化完成:', cardData);
        }

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

        cardNode.name = `${cardData.currentArea}_${CardUtils.getCardName(config.CardSuit, config.CardFace)}`;
    }

    private getNumberSprite(face: number, isBig: boolean, isRed: boolean): SpriteFrame | null {
        if (face < 0 || face > 12) return null;
        const arr = isBig
            ? (isRed ? this.bigRedNumbers : this.bigBlackNumbers)
            : (isRed ? this.smallRedNumbers : this.smallBlackNumbers);
        return arr[face] || null;
    }

    // --- 游戏操作 ---

    /**
     * 处理桌面卡牌点击事件
     * @param cardNode 卡牌节点
     */
    public onTableCardClick(cardNode: Node): void {
        const cardData = this.getCardDataFromNode(cardNode);
        if (!cardData || cardData.currentArea !== 'table') return;

        // 将桌面牌从tableArea移动到handArea
        cardNode.setParent(this.handArea);

        // 更新卡牌数据
        cardData.updateArea('hand');

        // 将桌面牌移动到手牌最后一张的位置
        this.moveCardToLastHandPosition(cardNode, cardData);
    }

    /**
     * 处理手牌点击事件
     * @param cardNode 卡牌节点
     */
    public onHandCardClick(cardNode: Node): void {
        const cardData = this.getCardDataFromNode(cardNode);
        if (!cardData || cardData.currentArea !== 'hand') return;

        // 检查是否是最后一张
        const handCards = Array.from(DataManager.instance.gameModel.handCards.values());
        const isLastCard = handCards[handCards.length - 1]?.id === cardData.id;

        // 如果不是最后一张，移动到最后一张的位置
        if (!isLastCard) {
            this.moveCardToLastHandPosition(cardNode, cardData);
        }
    }

    /**
     * 将卡牌移动到手牌最后一张的位置
     * @param cardNode 卡牌节点
     * @param cardData 卡牌数据
     */
    private moveCardToLastHandPosition(cardNode: Node, cardData: CardModel): void {
        const layoutConfig = GameConfig.instance.layoutConfig;
        const handConf = layoutConfig?.handLayout;

        // 获取最后一张牌的位置配置（与setupHandCardPosition保持一致）
        const targetX = handConf?.separateCardX ?? 200;
        const targetY = handConf?.separateCardY ?? 0;

        // 打印卡牌信息和目标位置
        const suitName = this.getSuitName(cardData.config.CardSuit);
        const faceName = this.getFaceName(cardData.config.CardFace);
        console.log(`点击卡牌: ${suitName}${faceName}`);
        console.log(`移动目标位置: (${targetX}, ${targetY})`);

        // 使用tween动画移动卡牌（直接使用配置值，不进行额外调整）
        tween(cardNode)
            .to(0.3, { position: new Vec3(targetX, targetY, 0) })
            .start();

        // 更新卡牌数据的位置
        cardData.updatePosition(targetX, targetY);

        // 更新层级到最上层
        cardNode.setSiblingIndex(100);
        cardData.zIndex = 100;
    }

    /**
     * 获取花色名称
     */
    private getSuitName(suit: number): string {
        const suits = ['♠', '♥', '♣', '♦'];
        return suits[suit] || '?';
    }

    /**
     * 获取牌面名称
     */
    private getFaceName(face: number): string {
        const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return faces[face] || '?';
    }

    /**
     * 撤销上一步操作
     */
    public onUndoClick(): void {
        const success = DataManager.instance.undo();
        if (success) {
            console.log('撤销成功！');
            // 刷新所有卡牌显示
            this.refreshAllCardsDisplay();
        } else {
            console.log('无法撤销');
        }
    }

    /**
     * 从节点获取卡牌数据
     */
    private getCardDataFromNode(cardNode: Node): CardModel | undefined {
        // 通过节点属性获取卡牌ID
        console.log('=== getCardDataFromNode 开始 ===');
        console.log('节点名称:', cardNode.name);
        console.log('节点完整信息:', cardNode);

        // 尝试从节点属性中获取cardId
        const cardId = (cardNode as any).cardId;
        console.log('从节点属性提取的cardId:', cardId);

        if (!cardId) {
            console.log('节点上没有cardId属性');
            return undefined;
        }

        const cardData = DataManager.instance.gameModel.getCardById(cardId);
        console.log('获取到的cardData:', cardData);

        return cardData;
    }

    /**
     * 刷新卡牌显示
     */
    private refreshCardDisplay(cardNode: Node, cardData: CardModel): void {
        this.setupCardDisplay(cardNode, cardData);
    }

    /**
     * 移除手牌最后一张的视图
     */
    private removeLastHandCardView(): void {
        const lastCard = DataManager.instance.gameModel.getLastHandCard();
        if (lastCard) {
            const lastCardNode = this.handArea.getChildByPath(lastCard.id);
            if (lastCardNode) {
                lastCardNode.removeFromParent();
            }
        }
    }

    /**
     * 刷新手牌显示
     */
    private refreshHandCardsDisplay(): void {
        this.handArea.removeAllChildren();
        const totalHandCards = DataManager.instance.gameModel.handCards.size;
        const layoutConfig = GameConfig.instance.layoutConfig;

        DataManager.instance.gameModel.handCards.forEach((cardData) => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
        });
    }

    /**
     * 刷新所有卡牌显示
     */
    private refreshAllCardsDisplay(): void {
        this.createCardsFromData();
    }
}
