/**
 * 卡牌工具类
 * 封装卡牌相关的通用工具方法
 */
import { CardSuit, CardFace } from '../models/CardData';

export class CardUtils {
    /**
     * 判断花色是否为红色（红桃或方块）
     * @param suit 花色枚举值
     * @returns 是否为红色
     */
    public static isRedSuit(suit: number): boolean {
        return suit === CardSuit.HEART || suit === CardSuit.DIAMOND;
    }

    /**
     * 判断花色是否为黑色（梅花或黑桃）
     * @param suit 花色枚举值
     * @returns 是否为黑色
     */
    public static isBlackSuit(suit: number): boolean {
        return suit === CardSuit.CLUB || suit === CardSuit.SPADE;
    }

    /**
     * 获取花色符号
     * @param suit 花色枚举值
     * @returns 花色符号字符串
     */
    public static getSuitSymbol(suit: number): string {
        const symbols = ['♣', '♦', '♥', '♠'];
        return symbols[suit] || '?';
    }

    /**
     * 获取点数文本
     * @param face 点数枚举值（0-12，对应A-K）
     * @returns 点数文本字符串
     */
    public static getFaceText(face: number): string {
        const faceTexts = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return faceTexts[face] || '?';
    }

    /**
     * 获取卡牌完整名称
     * @param suit 花色
     * @param face 点数
     * @returns 卡牌名称（如：♣A）
     */
    public static getCardName(suit: number, face: number): string {
        return `${this.getSuitSymbol(suit)}${this.getFaceText(face)}`;
    }

    /**
     * 获取点数对应的数组索引（0-12）
     * @param face 点数枚举值（0-12）
     * @returns 数组索引
     */
    public static getFaceIndex(face: number): number {
        return face;
    }

    /**
     * 判断是否为花牌（J、Q、K）
     * @param face 点数
     * @returns 是否为花牌
     */
    public static isFaceCard(face: number): boolean {
        return face >= CardFace.JACK && face <= CardFace.KING;
    }

    /**
     * 判断是否为A
     * @param face 点数
     * @returns 是否为A
     */
    public static isAce(face: number): boolean {
        return face === CardFace.ACE;
    }

    /**
     * 获取点数的数值（用于比较大小）
     * @param face 点数
     * @returns 数值（A=1, 2-10=点数, J=11, Q=12, K=13）
     */
    public static getFaceValue(face: number): number {
        return face;
    }

    /**
     * 比较两张牌的点数大小
     * @param face1 第一张牌的点数
     * @param face2 第二张牌的点数
     * @returns 1表示face1大，-1表示face2大，0表示相等
     */
    public static compareFace(face1: number, face2: number): number {
        const value1 = this.getFaceValue(face1);
        const value2 = this.getFaceValue(face2);
        if (value1 > value2) return 1;
        if (value1 < value2) return -1;
        return 0;
    }
}
