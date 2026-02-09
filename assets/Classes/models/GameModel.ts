/**
 * 游戏模型
 * 负责管理游戏的核心数据和状态
 */
import { CardConfig, LevelConfig } from './CardData';
import { CardModel, CardState } from './CardModel';

export class GameModel {
    // 所有卡牌
    private _allCards: Map<string, CardModel> = new Map();

    // 桌面卡牌
    private _tableCards: Map<string, CardModel> = new Map();

    // 手牌
    private _handCards: Map<string, CardModel> = new Map();

    constructor() {
    }

    /**
     * 初始化游戏数据
     */
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
        }
    }

    /**
     * 清空所有数据
     */
    public clearAll(): void {
        this._allCards.clear();
        this._tableCards.clear();
        this._handCards.clear();
    }

    /**
     * 获取所有卡牌
     */
    public get allCards(): Map<string, CardModel> {
        return this._allCards;
    }

    /**
     * 获取桌面卡牌
     */
    public get tableCards(): Map<string, CardModel> {
        return this._tableCards;
    }

    /**
     * 获取手牌
     */
    public get handCards(): Map<string, CardModel> {
        return this._handCards;
    }

    /**
     * 根据ID获取卡牌
     */
    public getCardById(id: string): CardModel | undefined {
        return this._allCards.get(id);
    }

    /**
     * 获取手牌最后一张
     */
    public getLastHandCard(): CardModel | undefined {
        const cards = Array.from(this._handCards.values());
        return cards[cards.length - 1];
    }

    /**
     * 判断两张牌是否可以匹配（点数绝对值差1）
     */
    public canMatch(tableCard: CardModel, handCard: CardModel): boolean {
        return Math.abs(tableCard.config.CardFace - handCard.config.CardFace) === 1;
    }

    /**
     * 执行匹配操作
     * @param tableCardId 桌面卡牌ID
     * @returns 是否成功匹配
     */
    public executeMatch(tableCardId: string): boolean {
        const tableCard = this._allCards.get(tableCardId);
        const handCard = this.getLastHandCard();

        if (!tableCard || !handCard) return false;
        if (tableCard.currentArea !== 'table') return false;
        if (!this.canMatch(tableCard, handCard)) return false;

        // 更新桌面卡牌为手牌最后一张
        tableCard.config.CardFace = handCard.config.CardFace;
        tableCard.config.CardSuit = handCard.config.CardSuit;

        // 移除手牌最后一张
        this._handCards.delete(handCard.id);
        this._allCards.delete(handCard.id);

        return true;
    }

    /**
     * 替换手牌最后一张
     * @param cardId 要替换的卡牌ID
     * @returns 是否成功替换
     */
    public replaceLastHandCard(cardId: string): boolean {
        const card = this._allCards.get(cardId);
        if (!card || card.currentArea !== 'hand') return false;

        const cards = Array.from(this._handCards.values());
        const lastIndex = cards.length - 1;
        const lastCard = cards[lastIndex];

        if (lastCard.id === cardId) return false; // 已经是最后一张

        // 交换位置（通过调整zIndex实现）
        const tempZIndex = card.zIndex;
        card.zIndex = lastCard.zIndex;
        lastCard.zIndex = tempZIndex;

        return true;
    }

    /**
     * 获取所有卡牌的状态
     */
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

    /**
     * 恢复所有卡牌的状态
     */
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

                // 根据区域更新Map
                if (state.area === 'table') {
                    this._tableCards.set(id, card);
                    this._handCards.delete(id);
                } else if (state.area === 'hand') {
                    this._handCards.set(id, card);
                    this._tableCards.delete(id);
                }
            }
        });
    }
}
