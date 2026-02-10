import { _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { GameConfig } from '../../resources/configs/GameConfig';
import { DataManager } from '../managers/DataManager';
import { CardModel } from '../models/CardModel';
import { CardService } from '../services/CardService';
import { CardUtils } from '../utils/CardUtils';
import CardView from '../views/CardView';

const { ccclass, property } = _decorator;

// 卡牌移动记录接口
interface CardMoveRecord {
    cardId: string;
    fromPosition: { x: number, y: number };
    toPosition: { x: number, y: number };
    fromArea: string;
    toArea: string;
    zIndex: number;
    // 记录移动前的顶牌ID
    previousTopCardId: string | null;
    // 记录移动前的备用牌ID列表
    previousReserveCardIds: string[];
}

@ccclass('LevelController')
export default class LevelController extends Component {
    // --- 属性定义 ---
    @property(Prefab) cardPrefab: Prefab = null;
    @property(Node) tableArea: Node = null;
    @property(Node) undoButton: Node = null;

    // --- 资源引用 ---
    @property([SpriteFrame]) bigRedNumbers: SpriteFrame[] = [];

    // --- 游戏状态 ---
    @property([SpriteFrame]) bigBlackNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) smallRedNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) smallBlackNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) suitSprites: SpriteFrame[] = [];

    // --- 历史记录 ---
    private historyStack: CardMoveRecord[] = [];

    async onLoad() {
        // 1. 初始化配置
        await this.initializeConfig();
        // 2. 加载关卡
        await this.loadLevel();
        // 3. 创建卡牌视图
        this.createCardsFromData();
        // 4. 设置回退按钮
        this.setupUndoButton();
    }

    private async initializeConfig(): Promise<void> {
        await GameConfig.instance.initialize();
    }

    private async loadLevel(): Promise<void> {
        const success = await DataManager.instance.loadLevel(1);
        if (!success) {
            console.error('加载关卡失败');
        } else {
            // 加载关卡成功后，更新顶牌和备用牌
            DataManager.instance.gameModel.updateTopAndReserveCards();
        }
    }

    /**
     * 设置回退按钮
     */
    private setupUndoButton(): void {
        if (!this.undoButton) {
            console.warn('回退按钮未设置');
            return;
        }

        this.undoButton.on(Node.EventType.TOUCH_END, () => {
            this.undoLastMove();
        }, this);
    }

    /**
     * 保存卡牌移动记录
     * @param cardData 卡牌数据
     * @param targetPosition 目标位置
     */
    private saveCardMoveRecord(cardData: CardModel, targetPosition: { x: number, y: number }): void {
        // 找到对应的卡牌节点
        const children = this.tableArea.children;
        let cardNode: Node | null = null;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cardId = (child as any).cardId;
            if (cardId === cardData.id) {
                cardNode = child;
                break;
            }
        }

        if (!cardNode) {
            console.error(`未找到卡牌节点: ${cardData.id}`);
            return;
        }

        // 获取卡牌节点的当前位置
        const currentPosition = cardNode.getPosition();

        // 获取当前顶牌
        const currentTopCard = DataManager.instance.gameModel.topCard;
        const reserveCards = DataManager.instance.gameModel.reserveCards;
        
        // 记录备用牌的ID列表
        const previousReserveCardIds = reserveCards.map(card => card.id);

        const record: CardMoveRecord = {
            cardId: cardData.id,
            fromPosition: { x: currentPosition.x, y: currentPosition.y },
            toPosition: { x: targetPosition.x, y: targetPosition.y },
            fromArea: cardData.currentArea,
            toArea: cardData.currentArea, // 暂时保持不变，因为现在所有卡牌都在tableArea中
            zIndex: cardData.zIndex,
            previousTopCardId: currentTopCard ? currentTopCard.id : null,
            previousReserveCardIds: previousReserveCardIds
        };

        this.historyStack.push(record);
    }

    /**
     * 回退最后一次移动
     */
    private undoLastMove(): void {
        if (this.historyStack.length === 0) {
            console.log('没有可回退的移动');
            return;
        }

        const lastRecord = this.historyStack.pop();
        if (!lastRecord) return;

        console.log('回退卡牌移动:', lastRecord);

        // 找到对应的卡牌节点
        const children = this.tableArea.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cardId = (child as any).cardId;

            if (cardId === lastRecord.cardId) {
                // fromPosition已经是卡牌节点的当前位置（相对坐标）
                // 不需要再做任何转换，直接使用即可
                const targetX = lastRecord.fromPosition.x;
                const targetY = lastRecord.fromPosition.y;

                // 使用tween动画移动卡牌回退
                tween(child)
                    .to(0.3, { position: new Vec3(targetX, targetY, 0) })
                    .call(() => {
                        // 动画完成后恢复顶牌
                        if (lastRecord.previousTopCardId) {
                            const previousTopCard = DataManager.instance.gameModel.getCardById(lastRecord.previousTopCardId);
                            if (previousTopCard) {
                                DataManager.instance.gameModel.topCard = previousTopCard;
                                const suitName = this.getSuitName(previousTopCard.config.CardSuit);
                                const faceName = this.getFaceName(previousTopCard.config.CardFace);
                                console.log(`恢复顶牌: ${suitName}${faceName}`);
                            }
                        } else {
                            // 如果没有之前的顶牌，设置为null
                            DataManager.instance.gameModel.topCard = null;
                            console.log('恢复顶牌: 无');
                        }
                        
                        // 恢复备用牌数组
                        if (lastRecord.previousReserveCardIds && lastRecord.previousReserveCardIds.length > 0) {
                            const restoredReserveCards: CardModel[] = [];
                            lastRecord.previousReserveCardIds.forEach(cardId => {
                                const card = DataManager.instance.gameModel.getCardById(cardId);
                                if (card) {
                                    restoredReserveCards.push(card);
                                }
                            });
                            DataManager.instance.gameModel.reserveCards = restoredReserveCards;
                            console.log(`恢复备用牌数量: ${restoredReserveCards.length}`);
                        } else {
                            DataManager.instance.gameModel.reserveCards = [];
                            console.log('恢复备用牌数量: 0');
                        }
                    })
                    .start();

                // 更新卡牌数据的位置
                const cardData = this.getCardDataFromNode(child);
                if (cardData) {
                    cardData.updatePosition(targetX, targetY);
                    cardData.zIndex = lastRecord.zIndex;
                }

                // 更新层级
                child.setSiblingIndex(lastRecord.zIndex);

                break;
            }
        }
    }

    private createCardsFromData(): void {
        if (!this.cardPrefab) return;

        this.tableArea.removeAllChildren();

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

        // 3. 设置初始顶牌（手牌区最右边的一张）
        const handCards = Array.from(DataManager.instance.gameModel.handCards.values());
        if (handCards.length > 0) {
            DataManager.instance.gameModel.topCard = handCards[handCards.length - 1];
            console.log(`初始顶牌: ${this.getSuitName(DataManager.instance.gameModel.topCard.config.CardSuit)}${this.getFaceName(DataManager.instance.gameModel.topCard.config.CardFace)}`);
        }
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
        this.setupTableCardPosition(cardNode, cardData, layoutConfig);

        // 设置点击回调
        const cardView = cardNode.getComponent(CardView);
        if (cardView) {
            cardView.setClickCallback((view: CardView) => {
                this.onTableCardClick(cardNode);
            });
            console.log('桌面卡牌点击回调已设置');
        } else {
            console.error('未找到CardView组件！');
        }
    }

    // --- 设置桌面牌位置 ---
    private setupTableCardPosition(
        cardNode: Node,
        cardData: CardModel,
        layoutConfig: any
    ): void {
        // 使用CardUtils.convertAbsoluteToRelativeForTable来转换坐标（往上偏移300像素）
        const relativePos = CardUtils.convertAbsoluteToRelativeForTable(
            cardData.position.x,
            cardData.position.y
        );

        const posX = relativePos.x;
        const posY = relativePos.y;
        const zIndex = cardData.zIndex;

        cardNode.setPosition(posX, posY, 0);
        cardNode.setSiblingIndex(zIndex);

        console.log(`桌面牌位置: (${posX}, ${posY})`);
    }

    // --- 创建手牌 ---
    private createHandCard(cardData: CardModel, layoutConfig: any, totalCards: number): void {
        console.log('创建手牌:', cardData);
        const cardNode = instantiate(this.cardPrefab);
        this.tableArea.addChild(cardNode);

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
        const handConf = layoutConfig?.handLayout || {};

        // 读取配置参数 (带有默认值，保证绝对能显示出来)
        const stackX = handConf.stackStartX ?? -350;
        const startY = handConf.stackStartY ?? 0;
        const spacingX = handConf.stackSpacingX ?? 100;

        // 右侧单张的位置
        const separateX = handConf.separateCardX ?? 200;
        const separateY = handConf.separateCardY ?? startY;

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

        // 更新卡牌数据的位置
        cardData.updatePosition(posX, posY);
        cardData.zIndex = zIndex;

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

        // 统一处理卡牌点击
        this.handleCardClick(cardNode, cardData);
    }

    /**
     * 处理手牌点击事件
     * @param cardNode 卡牌节点
     */
    public onHandCardClick(cardNode: Node): void {
        const cardData = this.getCardDataFromNode(cardNode);
        if (!cardData || cardData.currentArea !== 'hand') return;

        // 统一处理卡牌点击
        this.handleCardClick(cardNode, cardData);
    }

    /**
     * 统一处理卡牌点击事件
     * @param cardNode 卡牌节点
     * @param cardData 卡牌数据
     */
    private handleCardClick(cardNode: Node, cardData: CardModel): void {
        // 获取当前顶牌
        const currentTopCard = DataManager.instance.gameModel.topCard;
        const reserveCards = DataManager.instance.gameModel.reserveCards;

        // 打印当前顶牌信息
        if (currentTopCard) {
            const topSuitName = this.getSuitName(currentTopCard.config.CardSuit);
            const topFaceName = this.getFaceName(currentTopCard.config.CardFace);
            console.log(`当前顶牌: ${topSuitName}${topFaceName}`);
        } else {
            console.log(`当前顶牌: 无`);
        }

        // 打印备用牌信息
        console.log(`备用牌数量: ${reserveCards.length}`);
        reserveCards.forEach((card, index) => {
            const suitName = this.getSuitName(card.config.CardSuit);
            const faceName = this.getFaceName(card.config.CardFace);
            console.log(`备用牌[${index}]: ${suitName}${faceName}`);
        });

        // 如果是手牌区的牌，检查是否是最右边的一张备用牌
        if (cardData.currentArea === 'hand') {
            // 检查点击的牌是否是最右边的一张备用牌（不是顶牌）
            if (cardData !== currentTopCard) {
                // 检查是否是备用牌中最右边的一张
                const cardIndex = reserveCards.indexOf(cardData);
                console.log(`点击的备用牌索引: ${cardIndex}, 备用牌数量: ${reserveCards.length}`);
                if (cardIndex !== reserveCards.length - 1) {
                    console.log(`只能点击备用牌中最右边的一张`);
                    return;
                }

                // 点击的是备用牌，更新顶牌为这张备用牌
                console.log(`使用备用牌: ${this.getSuitName(cardData.config.CardSuit)}${this.getFaceName(cardData.config.CardFace)}`);
                DataManager.instance.gameModel.topCard = cardData;
                const suitName = this.getSuitName(cardData.config.CardSuit);
                const faceName = this.getFaceName(cardData.config.CardFace);
                console.log(`更新顶牌: ${suitName}${faceName}`);
                
                // 从备用牌数组中移除被使用的备用牌
                const currentReserveCards = DataManager.instance.gameModel.reserveCards;
                const cardIndex2 = currentReserveCards.indexOf(cardData);
                if (cardIndex2 !== -1) {
                    currentReserveCards.splice(cardIndex2, 1);
                    console.log(`备用牌数量从${cardIndex2 + 1}减少到${currentReserveCards.length}`);
                }
            }
        }

        // 如果不是手牌区的牌，检查点数是否可以连接
        if (cardData.currentArea !== 'hand' && currentTopCard) {
            const canMove = CardService.canMoveToCard(cardData, currentTopCard);
            if (!canMove) {
                console.log(`卡牌点数不匹配，无法移动`);
                return;
            }
        }

        // 计算目标位置
        const targetPosition = this.calculateTargetPosition(cardData);

        // 打印卡牌信息和目标位置
        const suitName = this.getSuitName(cardData.config.CardSuit);
        const faceName = this.getFaceName(cardData.config.CardFace);
        const areaName = cardData.currentArea === 'table' ? '桌面' : '手牌';
        console.log(`点击${areaName}卡牌: ${suitName}${faceName}`);

        // 保存当前状态到历史记录
        this.saveCardMoveRecord(cardData, targetPosition);

        // 如果是桌牌，立即更新顶牌
        if (cardData.currentArea === 'table') {
            DataManager.instance.gameModel.topCard = cardData;
            const suitName = this.getSuitName(cardData.config.CardSuit);
            const faceName = this.getFaceName(cardData.config.CardFace);
            console.log(`立即更新顶牌: ${suitName}${faceName}`);
        }

        // 更新卡牌数据的位置
        cardData.updatePosition(targetPosition.x, targetPosition.y);

        // 更新层级到最上层
        cardNode.setSiblingIndex(100);
        cardData.zIndex = 100;

        // 使用tween动画移动卡牌
        tween(cardNode)
            .to(0.3, { position: new Vec3(targetPosition.x, targetPosition.y, 0) })
            .call(() => {
                // 动画完成后打印更新后的顶牌信息
                const newTopCard = DataManager.instance.gameModel.topCard;
                if (newTopCard) {
                    console.log(`更新顶牌: ${this.getSuitName(newTopCard.config.CardSuit)}${this.getFaceName(newTopCard.config.CardFace)}`);
                } else {
                    console.log(`更新顶牌: 无`);
                }
            })
            .start();
    }

    /**
     * 更新顶牌信息
     */
    private updateTopCard(): void {
        const currentTopCard = DataManager.instance.gameModel.topCard;
        if (currentTopCard) {
            console.log(`更新顶牌: ${this.getSuitName(currentTopCard.config.CardSuit)}${this.getFaceName(currentTopCard.config.CardFace)}`);
        } else {
            console.log(`更新顶牌: 无`);
        }
    }

    /**
     * 计算卡牌的目标位置
     * @param cardData 卡牌数据
     * @returns 目标位置 {x, y}
     */
    private calculateTargetPosition(cardData: CardModel): { x: number, y: number } {
        const layoutConfig = GameConfig.instance.layoutConfig;
        const handConf = layoutConfig?.handLayout;

        // 获取手牌最后一张卡牌节点
        const handCards = Array.from(DataManager.instance.gameModel.handCards.values());
        const lastHandCard = handCards[handCards.length - 1];

        if (lastHandCard) {
            // 遍历tableArea的所有子节点，找到对应的卡牌节点
            const children = this.tableArea.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const cardId = (child as any).cardId;

                if (cardId === lastHandCard.id) {
                    // 找到手牌最后一张的节点
                    // 获取手牌最后一张的位置（相对于tableArea）
                    const position = child.getPosition();

                    console.log(`手牌最后一张位置: (${position.x}, ${position.y})`);

                    return { x: position.x, y: position.y };
                }
            }

            console.log('未找到手牌最后一张的节点');
        }

        // 如果找不到手牌最后一张，返回配置中的默认位置
        return {
            x: handConf?.separateCardX ?? 200,
            y: handConf?.separateCardY ?? 0
        };
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
            // 更新顶牌信息
            this.updateTopCard();
        } else {
            console.log('无法撤销');
        }
    }

    /**
     * 从节点获取卡牌数据
     */
    private getCardDataFromNode(cardNode: Node): CardModel | undefined {
        const cardId = (cardNode as any).cardId;

        if (!cardId) {
            console.log('节点上没有cardId属性');
            return undefined;
        }

        const cardData = DataManager.instance.gameModel.getCardById(cardId);

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
            // 遍历tableArea的所有子节点，找到对应的卡牌节点
            const children = this.tableArea.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const cardId = (child as any).cardId;

                if (cardId === lastCard.id) {
                    child.removeFromParent();
                    break;
                }
            }
        }
    }

    /**
     * 刷新手牌显示
     */
    private refreshHandCardsDisplay(): void {
        // 移除所有手牌节点
        const children = this.tableArea.children;
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            const cardId = (child as any).cardId;
            const cardData = DataManager.instance.gameModel.handCards.get(cardId);

            // 如果是手牌，则移除
            if (cardData) {
                child.removeFromParent();
            }
        }

        // 重新创建手牌
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
