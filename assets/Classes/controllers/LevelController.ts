import { _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { GameConfig } from '../../resources/configs/GameConfig';
import { DataManager } from '../managers/DataManager';
import { CardModel } from '../models/CardModel';
import { CardService } from '../services/CardService';
import { CardUtils } from '../utils/CardUtils';
import CardView from '../views/CardView';

const { ccclass, property } = _decorator;

// 卡牌移动记录
interface CardMoveRecord {
    cardId: string;
    fromPosition: { x: number, y: number };
    toPosition: { x: number, y: number };
    fromArea: string;
    toArea: string;
    zIndex: number;
    previousTopCardId: string | null;
    previousReserveCardIds: string[];
}

@ccclass('LevelController')
export default class LevelController extends Component {
    @property(Prefab) cardPrefab: Prefab = null;
    @property(Node) tableArea: Node = null;
    @property(Node) undoButton: Node = null;

    // 资源引用
    @property([SpriteFrame]) bigRedNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) bigBlackNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) smallRedNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) smallBlackNumbers: SpriteFrame[] = [];
    @property([SpriteFrame]) suitSprites: SpriteFrame[] = [];

    private historyStack: CardMoveRecord[] = [];

    async onLoad() {
        await this.initializeConfig();
        await this.loadLevel();
        this.createCardsFromData();
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
            DataManager.instance.gameModel.updateTopAndReserveCards();
        }
    }

    // 设置回退按钮
    private setupUndoButton(): void {
        if (!this.undoButton) {
            console.warn('回退按钮未设置');
            return;
        }
        this.undoButton.on(Node.EventType.TOUCH_END, () => {
            this.undoLastMove();
        }, this);
    }

    // 创建所有卡牌视图
    private createCardsFromData(): void {
        if (!this.cardPrefab) return;
        this.tableArea.removeAllChildren();
        const layoutConfig = GameConfig.instance.layoutConfig;

        DataManager.instance.gameModel.tableCards.forEach((cardData) => {
            this.createTableCard(cardData, layoutConfig);
        });

        const totalHandCards = DataManager.instance.gameModel.handCards.size;
        DataManager.instance.gameModel.handCards.forEach((cardData) => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
        });

        const handCards = Array.from(DataManager.instance.gameModel.handCards.values());
        if (handCards.length > 0) {
            DataManager.instance.gameModel.topCard = handCards[handCards.length - 1];
        }
    }

    // 创建桌面牌
    private createTableCard(cardData: CardModel, layoutConfig: any): void {
        const cardNode = instantiate(this.cardPrefab);
        this.tableArea.addChild(cardNode);
        (cardNode as any).cardId = cardData.id;

        this.setupCardDisplay(cardNode, cardData);
        this.setupTableCardPosition(cardNode, cardData, layoutConfig);

        const cardView = cardNode.getComponent(CardView);
        if (cardView) {
            cardView.setClickCallback((view: CardView) => {
                this.onTableCardClick(cardNode);
            });
        }
    }

    // 设置桌面牌位置
    private setupTableCardPosition(cardNode: Node, cardData: CardModel, layoutConfig: any): void {
        const relativePos = CardUtils.convertAbsoluteToRelativeForTable(
            cardData.position.x,
            cardData.position.y
        );
        cardNode.setPosition(relativePos.x, relativePos.y, 0);
        cardNode.setSiblingIndex(cardData.zIndex);
    }

    // 创建手牌
    private createHandCard(cardData: CardModel, layoutConfig: any, totalCards: number): void {
        const cardNode = instantiate(this.cardPrefab);
        this.tableArea.addChild(cardNode);
        (cardNode as any).cardId = cardData.id;

        this.setupCardDisplay(cardNode, cardData);
        this.setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards);

        const cardView = cardNode.getComponent(CardView);
        if (cardView) {
            cardView.setClickCallback((view: CardView) => {
                this.onHandCardClick(cardNode);
            });
        }
    }

    // 设置手牌位置
    private setupHandCardPosition(cardNode: Node, cardData: CardModel, layoutConfig: any, totalCards: number): void {
        const handConf = layoutConfig?.handLayout || {};
        const stackX = handConf.stackStartX ?? -350;
        const startY = handConf.stackStartY ?? 0;
        const spacingX = handConf.stackSpacingX ?? 100;
        const separateX = handConf.separateCardX ?? 200;
        const separateY = handConf.separateCardY ?? startY;

        const index = Array.from(DataManager.instance.gameModel.handCards.values()).indexOf(cardData);
        let posX = 0, posY = startY, zIndex = index;

        if (index === totalCards - 1) {
            posX = separateX;
            posY = separateY;
            zIndex = 100;
        } else {
            posX = stackX + (index * spacingX);
            posY = startY;
            zIndex = index;
        }

        cardNode.setPosition(posX, posY, 0);
        cardNode.setSiblingIndex(zIndex);
        cardData.updatePosition(posX, posY);
        cardData.zIndex = zIndex;
    }

    // 设置卡牌显示
    private setupCardDisplay(cardNode: Node, cardData: CardModel): void {
        const config = cardData.config;
        const isRed = CardUtils.isRedSuit(config.CardSuit);
        const cardView = cardNode.getComponent(CardView);

        if (cardView) {
            const index = Array.from(
                cardData.currentArea === 'table' 
                    ? DataManager.instance.gameModel.tableCards.values()
                    : DataManager.instance.gameModel.handCards.values()
            ).indexOf(cardData);
            cardView.init(cardData, index, cardData.currentArea);
        }

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

    // 点击事件处理
    public onTableCardClick(cardNode: Node): void {
        const cardData = this.getCardDataFromNode(cardNode);
        if (!cardData || cardData.currentArea !== 'table') return;
        this.handleCardClick(cardNode, cardData);
    }

    public onHandCardClick(cardNode: Node): void {
        const cardData = this.getCardDataFromNode(cardNode);
        if (!cardData || cardData.currentArea !== 'hand') return;
        this.handleCardClick(cardNode, cardData);
    }

    private handleCardClick(cardNode: Node, cardData: CardModel): void {
        const currentTopCard = DataManager.instance.gameModel.topCard;
        const reserveCards = DataManager.instance.gameModel.reserveCards;

        if (cardData.currentArea === 'hand' && cardData !== currentTopCard) {
            const cardIndex = reserveCards.indexOf(cardData);
            if (cardIndex !== reserveCards.length - 1) return;
            
            DataManager.instance.gameModel.topCard = cardData;
            const currentReserveCards = DataManager.instance.gameModel.reserveCards;
            const cardIndex2 = currentReserveCards.indexOf(cardData);
            if (cardIndex2 !== -1) {
                currentReserveCards.splice(cardIndex2, 1);
            }
        }

        if (cardData.currentArea !== 'hand' && currentTopCard) {
            if (!CardService.canMoveToCard(cardData, currentTopCard)) return;
        }

        const targetPosition = this.calculateTargetPosition(cardData);
        this.saveCardMoveRecord(cardData, targetPosition);

        if (cardData.currentArea === 'table') {
            DataManager.instance.gameModel.topCard = cardData;
        }

        cardData.updatePosition(targetPosition.x, targetPosition.y);
        cardNode.setSiblingIndex(100);
        cardData.zIndex = 100;

        tween(cardNode)
            .to(0.3, { position: new Vec3(targetPosition.x, targetPosition.y, 0) })
            .start();
    }

    // 计算目标位置
    private calculateTargetPosition(cardData: CardModel): { x: number, y: number } {
        const layoutConfig = GameConfig.instance.layoutConfig;
        const handConf = layoutConfig?.handLayout;
        const handCards = Array.from(DataManager.instance.gameModel.handCards.values());
        const lastHandCard = handCards[handCards.length - 1];

        if (lastHandCard) {
            const children = this.tableArea.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const cardId = (child as any).cardId;
                if (cardId === lastHandCard.id) {
                    const position = child.getPosition();
                    return { x: position.x, y: position.y };
                }
            }
        }

        return {
            x: handConf?.separateCardX ?? 200,
            y: handConf?.separateCardY ?? 0
        };
    }

    // 保存卡牌移动记录
    private saveCardMoveRecord(cardData: CardModel, targetPosition: { x: number, y: number }): void {
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

        if (!cardNode) return;

        const currentPosition = cardNode.getPosition();
        const currentTopCard = DataManager.instance.gameModel.topCard;
        const reserveCards = DataManager.instance.gameModel.reserveCards;
        const previousReserveCardIds = reserveCards.map(card => card.id);

        this.historyStack.push({
            cardId: cardData.id,
            fromPosition: { x: currentPosition.x, y: currentPosition.y },
            toPosition: { x: targetPosition.x, y: targetPosition.y },
            fromArea: cardData.currentArea,
            toArea: cardData.currentArea,
            zIndex: cardData.zIndex,
            previousTopCardId: currentTopCard ? currentTopCard.id : null,
            previousReserveCardIds: previousReserveCardIds
        });
    }

    // 回退最后一次移动
    private undoLastMove(): void {
        if (this.historyStack.length === 0) return;
        const lastRecord = this.historyStack.pop();
        if (!lastRecord) return;

        const children = this.tableArea.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cardId = (child as any).cardId;
            if (cardId === lastRecord.cardId) {
                tween(child)
                    .to(0.3, { position: new Vec3(lastRecord.fromPosition.x, lastRecord.fromPosition.y, 0) })
                    .call(() => {
                        if (lastRecord.previousTopCardId) {
                            const previousTopCard = DataManager.instance.gameModel.getCardById(lastRecord.previousTopCardId);
                            if (previousTopCard) {
                                DataManager.instance.gameModel.topCard = previousTopCard;
                            }
                        } else {
                            DataManager.instance.gameModel.topCard = null;
                        }
                        
                        if (lastRecord.previousReserveCardIds && lastRecord.previousReserveCardIds.length > 0) {
                            const restoredReserveCards: CardModel[] = [];
                            lastRecord.previousReserveCardIds.forEach(cardId => {
                                const card = DataManager.instance.gameModel.getCardById(cardId);
                                if (card) {
                                    restoredReserveCards.push(card);
                                }
                            });
                            DataManager.instance.gameModel.reserveCards = restoredReserveCards;
                        } else {
                            DataManager.instance.gameModel.reserveCards = [];
                        }
                    })
                    .start();

                const cardData = this.getCardDataFromNode(child);
                if (cardData) {
                    cardData.updatePosition(lastRecord.fromPosition.x, lastRecord.fromPosition.y);
                    cardData.zIndex = lastRecord.zIndex;
                }
                child.setSiblingIndex(lastRecord.zIndex);
                break;
            }
        }
    }

    // 撤销操作
    public onUndoClick(): void {
        const success = DataManager.instance.undo();
        if (success) {
            this.refreshAllCardsDisplay();
        }
    }

    // 刷新所有卡牌显示
    private refreshAllCardsDisplay(): void {
        this.createCardsFromData();
    }

    // 从节点获取卡牌数据
    private getCardDataFromNode(cardNode: Node): CardModel | undefined {
        const cardId = (cardNode as any).cardId;
        if (!cardId) return undefined;
        return DataManager.instance.gameModel.getCardById(cardId);
    }
}
