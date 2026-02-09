System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, CardSuit, CardFace, CardColor;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "14156XfV/lN56ifOLc9xRz4", "CardConfig", undefined);

      // assets/models/CardConfig.ts
      // 扑克牌花色
      _export("CardSuit", CardSuit = /*#__PURE__*/function (CardSuit) {
        CardSuit[CardSuit["Heart"] = 0] = "Heart";
        CardSuit[CardSuit["Diamond"] = 1] = "Diamond";
        CardSuit[CardSuit["Club"] = 2] = "Club";
        CardSuit[CardSuit["Spade"] = 3] = "Spade";
        return CardSuit;
      }({})); // 扑克牌点数


      _export("CardFace", CardFace = /*#__PURE__*/function (CardFace) {
        CardFace[CardFace["Ace"] = 0] = "Ace";
        CardFace[CardFace["Two"] = 1] = "Two";
        CardFace[CardFace["Three"] = 2] = "Three";
        CardFace[CardFace["Four"] = 3] = "Four";
        CardFace[CardFace["Five"] = 4] = "Five";
        CardFace[CardFace["Six"] = 5] = "Six";
        CardFace[CardFace["Seven"] = 6] = "Seven";
        CardFace[CardFace["Eight"] = 7] = "Eight";
        CardFace[CardFace["Nine"] = 8] = "Nine";
        CardFace[CardFace["Ten"] = 9] = "Ten";
        CardFace[CardFace["Jack"] = 10] = "Jack";
        CardFace[CardFace["Queen"] = 11] = "Queen";
        CardFace[CardFace["King"] = 12] = "King";
        return CardFace;
      }({})); // 扑克牌颜色


      _export("CardColor", CardColor = /*#__PURE__*/function (CardColor) {
        CardColor[CardColor["Red"] = 0] = "Red";
        CardColor[CardColor["Black"] = 1] = "Black";
        return CardColor;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9ce17ca01bf905bed1d337e07da9eea23f997516.js.map