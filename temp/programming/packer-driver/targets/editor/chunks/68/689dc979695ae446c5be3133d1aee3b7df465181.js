System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardModel, GameModel, _crd;

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
          // 顶牌（手牌区最右边的一张）
          this._topCard = null;
          // 备用牌（手牌区除了顶牌之外的牌）
          this._reserveCards = [];
          // 初始备用牌（关卡开始时除了顶牌的所有牌，固定不变）
          this._initialReserveCards = [];
        }
        /**
         * 初始化游戏数据
         */


        initialize(levelConfig) {
          this.clearAll(); // 初始化桌面牌

          if (levelConfig != null && levelConfig.Playfield) {
            levelConfig.Playfield.forEach((config, index) => {
              const card = new (_crd && CardModel === void 0 ? (_reportPossibleCrUseOfCardModel({
                error: Error()
              }), CardModel) : CardModel)(config, `table_${index}`);
              card.currentArea = 'table';
              card.zIndex = index;

              this._tableCards.set(card.id, card);

              this._allCards.set(card.id, card);
            });
          } // 初始化手牌


          if (levelConfig != null && levelConfig.Stack) {
            levelConfig.Stack.forEach((config, index) => {
              const card = new (_crd && CardModel === void 0 ? (_reportPossibleCrUseOfCardModel({
                error: Error()
              }), CardModel) : CardModel)(config, `hand_${index}`);
              card.currentArea = 'hand';
              card.zIndex = index;

              this._handCards.set(card.id, card);

              this._allCards.set(card.id, card);
            }); // 设置初始顶牌和初始备用牌

            const handCards = Array.from(this._handCards.values());

            if (handCards.length > 0) {
              this._topCard = handCards[handCards.length - 1];
              this._initialReserveCards = handCards.slice(0, handCards.length - 1);
            }
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
          const cards = Array.from(this._handCards.values());
          return cards[cards.length - 1];
        }
        /**
         * 获取顶牌
         */


        get topCard() {
          return this._topCard;
        }
        /**
         * 设置顶牌
         */


        set topCard(card) {
          this._topCard = card;
        }
        /**
         * 获取备用牌
         */


        get reserveCards() {
          return this._reserveCards;
        }
        /**
         * 设置备用牌
         */


        set reserveCards(cards) {
          this._reserveCards = cards;
        }
        /**
         * 更新顶牌和备用牌
         * 顶牌是最后移动到顶牌位置的卡牌，备用牌是关卡开始时除了顶牌的所有牌
         */


        updateTopAndReserveCards() {
          // 顶牌已经通过setTopCard方法设置，这里不需要重新计算
          // 备用牌是初始备用牌，固定不变
          console.log('updateTopAndReserveCards 被调用');
          console.log(`当前顶牌: ${this._topCard ? this._topCard.config.CardFace : '无'}`);
          console.log(`初始备用牌数量: ${this._initialReserveCards.length}`);

          this._initialReserveCards.forEach((card, index) => {
            console.log(`初始备用牌[${index}]: ${card.config.CardSuit}${card.config.CardFace}`);
          }); // 备用牌是初始备用牌，固定不变


          this._reserveCards = [...this._initialReserveCards];
          console.log(`更新后备用牌数量: ${this._reserveCards.length}`);
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
          const tableCard = this._allCards.get(tableCardId);

          const handCard = this.getLastHandCard();
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
          const card = this._allCards.get(cardId);

          if (!card || card.currentArea !== 'hand') return false;
          const cards = Array.from(this._handCards.values());
          const lastIndex = cards.length - 1;
          const lastCard = cards[lastIndex];
          if (lastCard.id === cardId) return false; // 已经是最后一张
          // 交换位置（通过调整zIndex实现）

          const tempZIndex = card.zIndex;
          card.zIndex = lastCard.zIndex;
          lastCard.zIndex = tempZIndex;
          return true;
        }
        /**
         * 获取所有卡牌的状态
         */


        getAllCardsState() {
          const states = new Map();

          this._allCards.forEach((card, id) => {
            states.set(id, {
              id: card.id,
              face: card.config.CardFace,
              suit: card.config.CardSuit,
              isFaceUp: card.isFaceUp,
              isLocked: card.isLocked,
              area: card.currentArea,
              position: { ...card.position
              },
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
            const card = this._allCards.get(id);

            if (card) {
              card.config.CardFace = state.face;
              card.config.CardSuit = state.suit;
              card.isFaceUp = state.isFaceUp;
              card.isLocked = state.isLocked;
              card.currentArea = state.area;
              card.position = { ...state.position
              };
              card.zIndex = state.zIndex; // 根据区域更新Map

              if (state.area === 'table') {
                this._tableCards.set(id, card);

                this._handCards.delete(id);
              } else if (state.area === 'hand') {
                this._handCards.set(id, card);

                this._tableCards.delete(id);
              }
            }
          }); // 恢复后重新计算顶牌和备用牌

          this.recalculateTopAndReserveCards();
        }
        /**
         * 重新计算顶牌和备用牌
         */


        recalculateTopAndReserveCards() {
          const handCards = Array.from(this._handCards.values()); // 按zIndex排序

          handCards.sort((a, b) => a.zIndex - b.zIndex);

          if (handCards.length > 0) {
            // 最后一张是顶牌
            this._topCard = handCards[handCards.length - 1]; // 其余的是备用牌

            this._reserveCards = handCards.slice(0, handCards.length - 1);
          } else {
            this._topCard = null;
            this._reserveCards = [];
          }

          console.log(`重新计算顶牌和备用牌 - 顶牌: ${this._topCard ? this._topCard.config.CardSuit + this._topCard.config.CardFace : '无'}, 备用牌数量: ${this._reserveCards.length}`);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=689dc979695ae446c5be3133d1aee3b7df465181.js.map