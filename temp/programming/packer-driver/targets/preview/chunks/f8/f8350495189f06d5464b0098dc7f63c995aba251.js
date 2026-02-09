System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardSuit, CardFace, CardUtils, _crd;

  function _reportPossibleCrUseOfCardSuit(extras) {
    _reporterNs.report("CardSuit", "../models/CardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardFace(extras) {
    _reporterNs.report("CardFace", "../models/CardData", _context.meta, extras);
  }

  _export("CardUtils", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      CardSuit = _unresolved_2.CardSuit;
      CardFace = _unresolved_2.CardFace;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "59ba7du8I9JCrbe8iphUPbG", "CardUtils", undefined);
      /**
       * 卡牌工具类
       * 封装卡牌相关的通用工具方法
       */


      _export("CardUtils", CardUtils = class CardUtils {
        /**
         * 判断花色是否为红色（红桃或方块）
         * @param suit 花色枚举值
         * @returns 是否为红色
         */
        static isRedSuit(suit) {
          return suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).HEART || suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).DIAMOND;
        }
        /**
         * 判断花色是否为黑色（梅花或黑桃）
         * @param suit 花色枚举值
         * @returns 是否为黑色
         */


        static isBlackSuit(suit) {
          return suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).CLUB || suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).SPADE;
        }
        /**
         * 获取花色符号
         * @param suit 花色枚举值
         * @returns 花色符号字符串
         */


        static getSuitSymbol(suit) {
          var symbols = ['♣', '♦', '♥', '♠'];
          return symbols[suit] || '?';
        }
        /**
         * 获取点数文本
         * @param face 点数枚举值（0-12，对应A-K）
         * @returns 点数文本字符串
         */


        static getFaceText(face) {
          var faceTexts = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          return faceTexts[face] || '?';
        }
        /**
         * 获取卡牌完整名称
         * @param suit 花色
         * @param face 点数
         * @returns 卡牌名称（如：♣A）
         */


        static getCardName(suit, face) {
          return "" + this.getSuitSymbol(suit) + this.getFaceText(face);
        }
        /**
         * 获取点数对应的数组索引（0-12）
         * @param face 点数枚举值（0-12）
         * @returns 数组索引
         */


        static getFaceIndex(face) {
          return face;
        }
        /**
         * 判断是否为花牌（J、Q、K）
         * @param face 点数
         * @returns 是否为花牌
         */


        static isFaceCard(face) {
          return face >= (_crd && CardFace === void 0 ? (_reportPossibleCrUseOfCardFace({
            error: Error()
          }), CardFace) : CardFace).JACK && face <= (_crd && CardFace === void 0 ? (_reportPossibleCrUseOfCardFace({
            error: Error()
          }), CardFace) : CardFace).KING;
        }
        /**
         * 判断是否为A
         * @param face 点数
         * @returns 是否为A
         */


        static isAce(face) {
          return face === (_crd && CardFace === void 0 ? (_reportPossibleCrUseOfCardFace({
            error: Error()
          }), CardFace) : CardFace).ACE;
        }
        /**
         * 获取点数的数值（用于比较大小）
         * @param face 点数
         * @returns 数值（A=1, 2-10=点数, J=11, Q=12, K=13）
         */


        static getFaceValue(face) {
          return face;
        }
        /**
         * 比较两张牌的点数大小
         * @param face1 第一张牌的点数
         * @param face2 第二张牌的点数
         * @returns 1表示face1大，-1表示face2大，0表示相等
         */


        static compareFace(face1, face2) {
          var value1 = this.getFaceValue(face1);
          var value2 = this.getFaceValue(face2);
          if (value1 > value2) return 1;
          if (value1 < value2) return -1;
          return 0;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f8350495189f06d5464b0098dc7f63c995aba251.js.map