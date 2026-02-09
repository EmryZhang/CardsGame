System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardModel, GameModel, _crd;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _reportPossibleCrUseOfLevelConfig(extras) {
    _reporterNs.report("LevelConfig", "./CardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardModel(extras) {
    _reporterNs.report("CardModel", "./CardModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardState(extras) {
    _reporterNs.report("CardState", "./CardModel", _context.meta, extras);
  }

  _export("GameModel", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      CardModel = _unresolved_2.CardModel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "332f9EVY+lLsLJUwUSewqVI", "GameModel", undefined);
      /**
       * 游戏模型
       * 负责管理游戏的核心数据和状态
       */


      _export("GameModel", GameModel = class GameModel {
        constructor() {
          // 所有卡牌
          this._allCards = new Map();
          // 桌面卡牌
          this._tableCards = new Map();
          // 手牌
          this._handCards = new Map();
        }
        /**
         * 初始化游戏数据
         */


        initialize(levelConfig) {
          this.clearAll(); // 初始化桌面牌

          if (levelConfig != null && levelConfig.Playfield) {
            levelConfig.Playfield.forEach((config, index) => {
              var card = new (_crd && CardModel === void 0 ? (_reportPossibleCrUseOfCardModel({
                error: Error()
              }), CardModel) : CardModel)(config, "table_" + index);
              card.currentArea = 'table';
              card.zIndex = index;

              this._tableCards.set(card.id, card);

              this._allCards.set(card.id, card);
            });
          } // 初始化手牌


          if (levelConfig != null && levelConfig.Stack) {
            levelConfig.Stack.forEach((config, index) => {
              var card = new (_crd && CardModel === void 0 ? (_reportPossibleCrUseOfCardModel({
                error: Error()
              }), CardModel) : CardModel)(config, "hand_" + index);
              card.currentArea = 'hand';
              card.zIndex = index;

              this._handCards.set(card.id, card);

              this._allCards.set(card.id, card);
            });
          }
        }
        /**
         * 清空所有数据
         */


        clearAll() {
          this._allCards.clear();

          this._tableCards.clear();

          this._handCards.clear();
        }
        /**
         * 获取所有卡牌
         */


        get allCards() {
          return this._allCards;
        }
        /**
         * 获取桌面卡牌
         */


        get tableCards() {
          return this._tableCards;
        }
        /**
         * 获取手牌
         */


        get handCards() {
          return this._handCards;
        }
        /**
         * 根据ID获取卡牌
         */


        getCardById(id) {
          return this._allCards.get(id);
        }
        /**
         * 获取手牌最后一张
         */


        getLastHandCard() {
          var cards = Array.from(this._handCards.values());
          return cards[cards.length - 1];
        }
        /**
         * 判断两张牌是否可以匹配（点数绝对值差1）
         */


        canMatch(tableCard, handCard) {
          return Math.abs(tableCard.config.CardFace - handCard.config.CardFace) === 1;
        }
        /**
         * 执行匹配操作
         * @param tableCardId 桌面卡牌ID
         * @returns 是否成功匹配
         */


        executeMatch(tableCardId) {
          var tableCard = this._allCards.get(tableCardId);

          var handCard = this.getLastHandCard();
          if (!tableCard || !handCard) return false;
          if (tableCard.currentArea !== 'table') return false;
          if (!this.canMatch(tableCard, handCard)) return false; // 更新桌面卡牌为手牌最后一张

          tableCard.config.CardFace = handCard.config.CardFace;
          tableCard.config.CardSuit = handCard.config.CardSuit; // 移除手牌最后一张

          this._handCards.delete(handCard.id);

          this._allCards.delete(handCard.id);

          return true;
        }
        /**
         * 替换手牌最后一张
         * @param cardId 要替换的卡牌ID
         * @returns 是否成功替换
         */


        replaceLastHandCard(cardId) {
          var card = this._allCards.get(cardId);

          if (!card || card.currentArea !== 'hand') return false;
          var cards = Array.from(this._handCards.values());
          var lastIndex = cards.length - 1;
          var lastCard = cards[lastIndex];
          if (lastCard.id === cardId) return false; // 已经是最后一张
          // 交换位置（通过调整zIndex实现）

          var tempZIndex = card.zIndex;
          card.zIndex = lastCard.zIndex;
          lastCard.zIndex = tempZIndex;
          return true;
        }
        /**
         * 获取所有卡牌的状态
         */


        getAllCardsState() {
          var states = new Map();

          this._allCards.forEach((card, id) => {
            states.set(id, {
              id: card.id,
              face: card.config.CardFace,
              suit: card.config.CardSuit,
              isFaceUp: card.isFaceUp,
              isLocked: card.isLocked,
              area: card.currentArea,
              position: _extends({}, card.position),
              zIndex: card.zIndex
            });
          });

          return states;
        }
        /**
         * 恢复所有卡牌的状态
         */


        restoreAllCardsState(states) {
          states.forEach((state, id) => {
            var card = this._allCards.get(id);

            if (card) {
              card.config.CardFace = state.face;
              card.config.CardSuit = state.suit;
              card.isFaceUp = state.isFaceUp;
              card.isLocked = state.isLocked;
              card.currentArea = state.area;
              card.position = _extends({}, state.position);
              card.zIndex = state.zIndex; // 根据区域更新Map

              if (state.area === 'table') {
                this._tableCards.set(id, card);

                this._handCards.delete(id);
              } else if (state.area === 'hand') {
                this._handCards.set(id, card);

                this._tableCards.delete(id);
              }
            }
          });
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=689dc979695ae446c5be3133d1aee3b7df465181.js.map