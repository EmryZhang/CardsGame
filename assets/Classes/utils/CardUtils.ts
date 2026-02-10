import { CardFace, CardSuit } from '../models/CardData';

/**
 * 卡牌工具类
 */
export class CardUtils {
    private static readonly TABLE_Y_OFFSET = 350;

    // 判断花色是否为红色
    public static isRedSuit(suit: number): boolean {
        return suit === CardSuit.HEART || suit === CardSuit.DIAMOND;
    }

    // 判断花色是否为黑色
    public static isBlackSuit(suit: number): boolean {
        return suit === CardSuit.CLUB || suit === CardSuit.SPADE;
    }

    // 获取花色符号
    public static getSuitSymbol(suit: number): string {
        const symbols = ['♣', '♦', '♥', '♠'];
        return symbols[suit] || '?';
    }

    // 获取点数文本
    public static getFaceText(face: number): string {
        const faceTexts = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return faceTexts[face] || '?';
    }

    // 获取卡牌完整名称
    public static getCardName(suit: number, face: number): string {
        return `${this.getSuitSymbol(suit)}${this.getFaceText(face)}`;
    }

    // 判断是否为花牌
    public static isFaceCard(face: number): boolean {
        return face >= CardFace.JACK && face <= CardFace.KING;
    }

    // 判断是否为A
    public static isAce(face: number): boolean {
        return face === CardFace.ACE;
    }

    // 比较两张牌的点数大小
    public static compareFace(face1: number, face2: number): number {
        if (face1 > face2) return 1;
        if (face1 < face2) return -1;
        return 0;
    }

    // 转换绝对坐标为相对坐标
    public static convertAbsoluteToRelative(
        x: number,
        y: number
    ): { x: number, y: number } {
        const designWidth = 1080;
        const designHeight = 2080;
        return { x: x - designWidth / 2, y: y - designHeight / 2 };
    }

    // 转换相对坐标为绝对坐标
    public static convertRelativeToAbsolute(
        x: number,
        y: number
    ): { x: number, y: number } {
        const designWidth = 1080;
        const designHeight = 2080;
        return { x: x + designWidth / 2, y: y + designHeight / 2 };
    }

    // 桌面牌坐标转换（包含偏移）
    public static convertAbsoluteToRelativeForTable(
        x: number,
        y: number
    ): { x: number, y: number } {
        const designWidth = 1080;
        const designHeight = 2080;
        return {
            x: x - designWidth / 2,
            y: y - designHeight / 2 + CardUtils.TABLE_Y_OFFSET
        };
    }
}
