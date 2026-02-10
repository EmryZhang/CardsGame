/**
 * 卡牌服务类
 * 处理卡牌相关的业务逻辑
 */
import { CardModel } from '../models/CardModel';

export class CardService {
    /**
     * 检查两张牌的点数是否可以连接
     * @param card1 第一张牌
     * @param card2 第二张牌
     * @returns 是否可以连接（点数绝对值差1，不包括相等）
     */
    public static canConnectCards(card1: CardModel, card2: CardModel): boolean {
        const face1 = card1.config.CardFace;
        const face2 = card2.config.CardFace;

        // 计算点数绝对值差
        const diff = Math.abs(face1 - face2);

        // 点数绝对值差1，不包括相等
        if (diff === 1) {
            return true;
        }

        // K（12）和A（0）也算作点数差1
        if ((face1 === 12 && face2 === 0) || (face1 === 0 && face2 === 12)) {
            return true;
        }

        return false;
    }

    /**
     * 检查卡牌是否可以移动到目标卡牌
     * @param card 要移动的卡牌
     * @param targetCard 目标卡牌
     * @returns 是否可以移动
     */
    public static canMoveToCard(card: CardModel, targetCard: CardModel): boolean {
        return this.canConnectCards(card, targetCard);
    }
}
