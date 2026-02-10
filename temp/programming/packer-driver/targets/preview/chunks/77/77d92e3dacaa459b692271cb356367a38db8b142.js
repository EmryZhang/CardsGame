System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardService, _crd;

  function _reportPossibleCrUseOfCardModel(extras) {
    _reporterNs.report("CardModel", "../models/CardModel", _context.meta, extras);
  }

  _export("CardService", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7cfecmos7REub9XQBpP+f1G", "CardService", undefined);

      /**
       * 卡牌服务类
       */
      _export("CardService", CardService = class CardService {
        // 检查两张牌的点数是否可以连接
        static canConnectCards(card1, card2) {
          var face1 = card1.config.CardFace;
          var face2 = card2.config.CardFace;
          var diff = Math.abs(face1 - face2);
          if (diff === 1) return true;
          if (face1 === 12 && face2 === 0 || face1 === 0 && face2 === 12) return true;
          return false;
        } // 检查卡牌是否可以移动到目标卡牌


        static canMoveToCard(card, targetCard) {
          return this.canConnectCards(card, targetCard);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=77d92e3dacaa459b692271cb356367a38db8b142.js.map