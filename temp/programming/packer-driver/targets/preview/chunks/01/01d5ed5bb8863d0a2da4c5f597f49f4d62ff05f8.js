System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, CardSuit, CardFace;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "14156XfV/lN56ifOLc9xRz4", "CardData", undefined);

      // 扑克牌花色枚举
      _export("CardSuit", CardSuit = /*#__PURE__*/function (CardSuit) {
        CardSuit[CardSuit["CLUB"] = 0] = "CLUB";
        CardSuit[CardSuit["DIAMOND"] = 1] = "DIAMOND";
        CardSuit[CardSuit["HEART"] = 2] = "HEART";
        CardSuit[CardSuit["SPADE"] = 3] = "SPADE";
        return CardSuit;
      }({})); // 扑克牌点数枚举


      _export("CardFace", CardFace = /*#__PURE__*/function (CardFace) {
        CardFace[CardFace["ACE"] = 0] = "ACE";
        CardFace[CardFace["TWO"] = 1] = "TWO";
        CardFace[CardFace["THREE"] = 2] = "THREE";
        CardFace[CardFace["FOUR"] = 3] = "FOUR";
        CardFace[CardFace["FIVE"] = 4] = "FIVE";
        CardFace[CardFace["SIX"] = 5] = "SIX";
        CardFace[CardFace["SEVEN"] = 6] = "SEVEN";
        CardFace[CardFace["EIGHT"] = 7] = "EIGHT";
        CardFace[CardFace["NINE"] = 8] = "NINE";
        CardFace[CardFace["TEN"] = 9] = "TEN";
        CardFace[CardFace["JACK"] = 10] = "JACK";
        CardFace[CardFace["QUEEN"] = 11] = "QUEEN";
        CardFace[CardFace["KING"] = 12] = "KING";
        return CardFace;
      }({})); // 单张卡牌配置
      // 关卡配置


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=01d5ed5bb8863d0a2da4c5f597f49f4d62ff05f8.js.map