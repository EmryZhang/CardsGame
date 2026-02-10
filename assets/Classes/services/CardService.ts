import { CardModel } from '../models/CardModel';

/**
 * 卡牌服务类
 */
export class CardService {
    // 检查两张牌的点数是否可以连接
    public static canConnectCards(card1: CardModel, card2: CardModel): boolean {
        const face1 = card1.config.CardFace;
        const face2 = card2.config.CardFace;
        const diff = Math.abs(face1 - face2);

        if (diff === 1) return true;
        if ((face1 === 12 && face2 === 0) || (face1 === 0 && face2 === 12)) return true;
        return false;
    }

    // 检查卡牌是否可以移动到目标卡牌
    public static canMoveToCard(card: CardModel, targetCard: CardModel): boolean {
        return this.canConnectCards(card, targetCard);
    }
}
