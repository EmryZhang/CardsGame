import { LevelConfig } from './CardData';
import { CardModel, CardState } from './CardModel';

/**
 * 游戏模型，负责管理游戏的核心数据和状态
 */
export class GameModel {
    private _allCards: Map<string, CardModel> = new Map();
    private _tableCards: Map<string, CardModel> = new Map();
    private _handCards: Map<string, CardModel> = new Map();
    private _topCard: CardModel = null;
    private _reserveCards: CardModel[] = [];
    private _initialReserveCards: CardModel[] = [];

    constructor() {}

    public initialize(levelConfig: LevelConfig): void {
        this.clearAll();

        // 初始化桌面牌
        if (levelConfig?.Playfield) {
            levelConfig.Playfield.forEach((config, index) => {
                const card = new CardModel(config, `table_${index}`);
                card.currentArea = 'table';
                card.zIndex = index;
                this._tableCards.set(card.id, card);
                this._allCards.set(card.id, card);
            });
        }

        // 初始化手牌
        if (levelConfig?.Stack) {
            levelConfig.Stack.forEach((config, index) => {
                const card = new CardModel(config, `hand_${index}`);
                card.currentArea = 'hand';
                card.zIndex = index;
                this._handCards.set(card.id, card);
                this._allCards.set(card.id, card);
            });

            // 设置初始顶牌和备用牌
            const handCards = Array.from(this._handCards.values());
            if (handCards.length > 0) {
                this._topCard = handCards[handCards.length - 1];
                this._initialReserveCards = handCards.slice(0, handCards.length - 1);
            }
        }
    }

    public clearAll(): void {
        this._allCards.clear();
        this._tableCards.clear();
        this._handCards.clear();
    }

    public get allCards(): Map<string, CardModel> {
        return this._allCards;
    }

    public get tableCards(): Map<string, CardModel> {
        return this._tableCards;
    }

    public get handCards(): Map<string, CardModel> {
        return this._handCards;
    }

    public getCardById(id: string): CardModel | undefined {
        return this._allCards.get(id);
    }

    public getLastHandCard(): CardModel | undefined {
        const cards = Array.from(this._handCards.values());
        return cards[cards.length - 1];
    }

    public get topCard(): CardModel {
        return this._topCard;
    }

    public set topCard(card: CardModel) {
        this._topCard = card;
    }

    public get reserveCards(): CardModel[] {
        return this._reserveCards;
    }

    public set reserveCards(cards: CardModel[]) {
        this._reserveCards = cards;
    }

    // 更新顶牌和备用牌
    public updateTopAndReserveCards(): void {
        this._reserveCards = [...this._initialReserveCards];
    }

    // 判断两张牌是否可以匹配（点数绝对值差1）
    public canMatch(tableCard: CardModel, handCard: CardModel): boolean {
        return Math.abs(tableCard.config.CardFace - handCard.config.CardFace) === 1;
    }

    // 执行匹配操作
    public executeMatch(tableCardId: string): boolean {
        const tableCard = this._allCards.get(tableCardId);
        const handCard = this.getLastHandCard();

        if (!tableCard || !handCard) return false;
        if (tableCard.currentArea !== 'table') return false;
        if (!this.canMatch(tableCard, handCard)) return false;

        // 更新桌面卡牌
        tableCard.config.CardFace = handCard.config.CardFace;
        tableCard.config.CardSuit = handCard.config.CardSuit;

        // 移除手牌
        this._handCards.delete(handCard.id);
        this._allCards.delete(handCard.id);

        return true;
    }

    // 替换手牌最后一张
    public replaceLastHandCard(cardId: string): boolean {
        const card = this._allCards.get(cardId);
        if (!card || card.currentArea !== 'hand') return false;

        const cards = Array.from(this._handCards.values());
        const lastCard = cards[cards.length - 1];
        if (lastCard.id === cardId) return false;

        // 交换zIndex
        [card.zIndex, lastCard.zIndex] = [lastCard.zIndex, card.zIndex];
        return true;
    }

    // 获取所有卡牌的状态快照
    public getAllCardsState(): Map<string, CardState> {
        const states = new Map<string, CardState>();
        this._allCards.forEach((card, id) => {
            states.set(id, {
                id: card.id,
                face: card.config.CardFace,
                suit: card.config.CardSuit,
                isFaceUp: card.isFaceUp,
                isLocked: card.isLocked,
                area: card.currentArea,
                position: { ...card.position },
                zIndex: card.zIndex
            });
        });
        return states;
    }

    // 恢复所有卡牌状态
    public restoreAllCardsState(states: Map<string, CardState>): void {
        states.forEach((state, id) => {
            const card = this._allCards.get(id);
            if (card) {
                card.config.CardFace = state.face;
                card.config.CardSuit = state.suit;
                card.isFaceUp = state.isFaceUp;
                card.isLocked = state.isLocked;
                card.currentArea = state.area;
                card.position = { ...state.position };
                card.zIndex = state.zIndex;

                // 更新区域映射
                if (state.area === 'table') {
                    this._tableCards.set(id, card);
                    this._handCards.delete(id);
                } else if (state.area === 'hand') {
                    this._handCards.set(id, card);
                    this._tableCards.delete(id);
                }
            }
        });
        
        this.recalculateTopAndReserveCards();
    }
    
    // 重新计算顶牌和备用牌
    private recalculateTopAndReserveCards(): void {
        const handCards = Array.from(this._handCards.values());
        handCards.sort((a, b) => a.zIndex - b.zIndex);
        
        if (handCards.length > 0) {
            this._topCard = handCards[handCards.length - 1];
            this._reserveCards = handCards.slice(0, handCards.length - 1);
        } else {
            this._topCard = null;
            this._reserveCards = [];
        }
    }
}
