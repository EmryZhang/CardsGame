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

      // 扑克牌花色
      _export("CardSuit", CardSuit = /*#__PURE__*/function (CardSuit) {
        CardSuit[CardSuit["HEART"] = 0] = "HEART";
        CardSuit[CardSuit["DIAMOND"] = 1] = "DIAMOND";
        CardSuit[CardSuit["CLUB"] = 2] = "CLUB";
        CardSuit[CardSuit["SPADE"] = 3] = "SPADE";
        return CardSuit;
      }({})); // 扑克牌点数（从1开始，对应A-K）


      _export("CardFace", CardFace = /*#__PURE__*/function (CardFace) {
        CardFace[CardFace["ACE"] = 1] = "ACE";
        CardFace[CardFace["TWO"] = 2] = "TWO";
        CardFace[CardFace["THREE"] = 3] = "THREE";
        CardFace[CardFace["FOUR"] = 4] = "FOUR";
        CardFace[CardFace["FIVE"] = 5] = "FIVE";
        CardFace[CardFace["SIX"] = 6] = "SIX";
        CardFace[CardFace["SEVEN"] = 7] = "SEVEN";
        CardFace[CardFace["EIGHT"] = 8] = "EIGHT";
        CardFace[CardFace["NINE"] = 9] = "NINE";
        CardFace[CardFace["TEN"] = 10] = "TEN";
        CardFace[CardFace["JACK"] = 11] = "JACK";
        CardFace[CardFace["QUEEN"] = 12] = "QUEEN";
        CardFace[CardFace["KING"] = 13] = "KING";
        return CardFace;
      }({})); // 卡牌配置接口
      // 关卡配置接口


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=01d5ed5bb8863d0a2da4c5f597f49f4d62ff05f8.js.map