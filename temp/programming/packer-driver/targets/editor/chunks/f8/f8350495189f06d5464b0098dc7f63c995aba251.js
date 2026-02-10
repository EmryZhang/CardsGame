System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardFace, CardSuit, CardUtils, _crd;

  function _reportPossibleCrUseOfCardFace(extras) {
    _reporterNs.report("CardFace", "../models/CardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardSuit(extras) {
    _reporterNs.report("CardSuit", "../models/CardData", _context.meta, extras);
  }

  _export("CardUtils", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      CardFace = _unresolved_2.CardFace;
      CardSuit = _unresolved_2.CardSuit;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "59ba7du8I9JCrbe8iphUPbG", "CardUtils", undefined);

      /**
       * 卡牌工具类
       */
      _export("CardUtils", CardUtils = class CardUtils {
        // 判断花色是否为红色
        static isRedSuit(suit) {
          return suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).HEART || suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).DIAMOND;
        } // 判断花色是否为黑色


        static isBlackSuit(suit) {
          return suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).CLUB || suit === (_crd && CardSuit === void 0 ? (_reportPossibleCrUseOfCardSuit({
            error: Error()
          }), CardSuit) : CardSuit).SPADE;
        } // 获取花色符号


        static getSuitSymbol(suit) {
          const symbols = ['♣', '♦', '♥', '♠'];
          return symbols[suit] || '?';
        } // 获取点数文本


        static getFaceText(face) {
          const faceTexts = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          return faceTexts[face] || '?';
        } // 获取卡牌完整名称


        static getCardName(suit, face) {
          return `${this.getSuitSymbol(suit)}${this.getFaceText(face)}`;
        } // 判断是否为花牌


        static isFaceCard(face) {
          return face >= (_crd && CardFace === void 0 ? (_reportPossibleCrUseOfCardFace({
            error: Error()
          }), CardFace) : CardFace).JACK && face <= (_crd && CardFace === void 0 ? (_reportPossibleCrUseOfCardFace({
            error: Error()
          }), CardFace) : CardFace).KING;
        } // 判断是否为A


        static isAce(face) {
          return face === (_crd && CardFace === void 0 ? (_reportPossibleCrUseOfCardFace({
            error: Error()
          }), CardFace) : CardFace).ACE;
        } // 比较两张牌的点数大小


        static compareFace(face1, face2) {
          if (face1 > face2) return 1;
          if (face1 < face2) return -1;
          return 0;
        } // 转换绝对坐标为相对坐标


        static convertAbsoluteToRelative(x, y) {
          const designWidth = 1080;
          const designHeight = 2080;
          return {
            x: x - designWidth / 2,
            y: y - designHeight / 2
          };
        } // 转换相对坐标为绝对坐标


        static convertRelativeToAbsolute(x, y) {
          const designWidth = 1080;
          const designHeight = 2080;
          return {
            x: x + designWidth / 2,
            y: y + designHeight / 2
          };
        } // 桌面牌坐标转换（包含偏移）


        static convertAbsoluteToRelativeForTable(x, y) {
          const designWidth = 1080;
          const designHeight = 2080;
          return {
            x: x - designWidth / 2,
            y: y - designHeight / 2 + CardUtils.TABLE_Y_OFFSET
          };
        }

      });

      CardUtils.TABLE_Y_OFFSET = 350;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f8350495189f06d5464b0098dc7f63c995aba251.js.map