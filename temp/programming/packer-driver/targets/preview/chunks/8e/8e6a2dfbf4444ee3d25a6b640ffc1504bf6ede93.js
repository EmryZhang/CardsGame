System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Vec3, GameConfig, DataManager, CardService, CardUtils, CardView, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, LevelController;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../../resources/configs/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../managers/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardModel(extras) {
    _reporterNs.report("CardModel", "../models/CardModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardService(extras) {
    _reporterNs.report("CardService", "../services/CardService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardUtils(extras) {
    _reporterNs.report("CardUtils", "../utils/CardUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardView(extras) {
    _reporterNs.report("CardView", "../views/CardView", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      DataManager = _unresolved_3.DataManager;
    }, function (_unresolved_4) {
      CardService = _unresolved_4.CardService;
    }, function (_unresolved_5) {
      CardUtils = _unresolved_5.CardUtils;
    }, function (_unresolved_6) {
      CardView = _unresolved_6.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3920e54019JjICAIPmKs/ha", "LevelController", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'instantiate', 'Node', 'Prefab', 'Sprite', 'SpriteFrame', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator); // 卡牌移动记录

      _export("default", LevelController = (_dec = ccclass('LevelController'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([SpriteFrame]), _dec6 = property([SpriteFrame]), _dec7 = property([SpriteFrame]), _dec8 = property([SpriteFrame]), _dec9 = property([SpriteFrame]), _dec(_class = (_class2 = class LevelController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "cardPrefab", _descriptor, this);

          _initializerDefineProperty(this, "tableArea", _descriptor2, this);

          _initializerDefineProperty(this, "undoButton", _descriptor3, this);

          // 资源引用
          _initializerDefineProperty(this, "bigRedNumbers", _descriptor4, this);

          _initializerDefineProperty(this, "bigBlackNumbers", _descriptor5, this);

          _initializerDefineProperty(this, "smallRedNumbers", _descriptor6, this);

          _initializerDefineProperty(this, "smallBlackNumbers", _descriptor7, this);

          _initializerDefineProperty(this, "suitSprites", _descriptor8, this);

          this.historyStack = [];
        }

        onLoad() {
          var _this = this;

          return _asyncToGenerator(function* () {
            yield _this.initializeConfig();
            yield _this.loadLevel();

            _this.createCardsFromData();

            _this.setupUndoButton();
          })();
        }

        initializeConfig() {
          return _asyncToGenerator(function* () {
            yield (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).instance.initialize();
          })();
        }

        loadLevel() {
          return _asyncToGenerator(function* () {
            var success = yield (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.loadLevel(1);

            if (!success) {
              console.error('加载关卡失败');
            } else {
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).instance.gameModel.updateTopAndReserveCards();
            }
          })();
        } // 设置回退按钮


        setupUndoButton() {
          if (!this.undoButton) {
            console.warn('回退按钮未设置');
            return;
          }

          this.undoButton.on(Node.EventType.TOUCH_END, () => {
            this.undoLastMove();
          }, this);
        } // 创建所有卡牌视图


        createCardsFromData() {
          if (!this.cardPrefab) return;
          this.tableArea.removeAllChildren();
          var layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.tableCards.forEach(cardData => {
            this.createTableCard(cardData, layoutConfig);
          });
          var totalHandCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.size;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.forEach(cardData => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
          });
          var handCards = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values());

          if (handCards.length > 0) {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard = handCards[handCards.length - 1];
          }
        } // 创建桌面牌


        createTableCard(cardData, layoutConfig) {
          var cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode);
          cardNode.cardId = cardData.id;
          this.setupCardDisplay(cardNode, cardData);
          this.setupTableCardPosition(cardNode, cardData, layoutConfig);
          var cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            cardView.setClickCallback(view => {
              this.onTableCardClick(cardNode);
            });
          }
        } // 设置桌面牌位置


        setupTableCardPosition(cardNode, cardData, layoutConfig) {
          var relativePos = (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).convertAbsoluteToRelativeForTable(cardData.position.x, cardData.position.y);
          cardNode.setPosition(relativePos.x, relativePos.y, 0);
          cardNode.setSiblingIndex(cardData.zIndex);
        } // 创建手牌


        createHandCard(cardData, layoutConfig, totalCards) {
          var cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode);
          cardNode.cardId = cardData.id;
          this.setupCardDisplay(cardNode, cardData);
          this.setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards);
          var cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            cardView.setClickCallback(view => {
              this.onHandCardClick(cardNode);
            });
          }
        } // 设置手牌位置


        setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards) {
          var _handConf$stackStartX, _handConf$stackStartY, _handConf$stackSpacin, _handConf$separateCar, _handConf$separateCar2;

          var handConf = (layoutConfig == null ? void 0 : layoutConfig.handLayout) || {};
          var stackX = (_handConf$stackStartX = handConf.stackStartX) != null ? _handConf$stackStartX : -350;
          var startY = (_handConf$stackStartY = handConf.stackStartY) != null ? _handConf$stackStartY : 0;
          var spacingX = (_handConf$stackSpacin = handConf.stackSpacingX) != null ? _handConf$stackSpacin : 100;
          var separateX = (_handConf$separateCar = handConf.separateCardX) != null ? _handConf$separateCar : 200;
          var separateY = (_handConf$separateCar2 = handConf.separateCardY) != null ? _handConf$separateCar2 : startY;
          var index = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values()).indexOf(cardData);
          var posX = 0,
              posY = startY,
              zIndex = index;

          if (index === totalCards - 1) {
            posX = separateX;
            posY = separateY;
            zIndex = 100;
          } else {
            posX = stackX + index * spacingX;
            posY = startY;
            zIndex = index;
          }

          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(zIndex);
          cardData.updatePosition(posX, posY);
          cardData.zIndex = zIndex;
        } // 设置卡牌显示


        setupCardDisplay(cardNode, cardData) {
          var config = cardData.config;
          var isRed = (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).isRedSuit(config.CardSuit);
          var cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            var index = Array.from(cardData.currentArea === 'table' ? (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.tableCards.values() : (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.handCards.values()).indexOf(cardData);
            cardView.init(cardData, index, cardData.currentArea);
          }

          var setSprite = (name, spriteFrame) => {
            var node = cardNode.getChildByName(name);

            if (node) {
              var sp = node.getComponent(Sprite);

              if (sp) {
                sp.spriteFrame = spriteFrame;
                sp.color = Color.WHITE;
              }
            }
          };

          setSprite('bigNum', this.getNumberSprite(config.CardFace, true, isRed));
          setSprite('smallNum', this.getNumberSprite(config.CardFace, false, isRed));

          if (config.CardSuit >= 0 && config.CardSuit < this.suitSprites.length) {
            setSprite('suit', this.suitSprites[config.CardSuit]);
          }

          cardNode.name = cardData.currentArea + "_" + (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).getCardName(config.CardSuit, config.CardFace);
        }

        getNumberSprite(face, isBig, isRed) {
          if (face < 0 || face > 12) return null;
          var arr = isBig ? isRed ? this.bigRedNumbers : this.bigBlackNumbers : isRed ? this.smallRedNumbers : this.smallBlackNumbers;
          return arr[face] || null;
        } // 点击事件处理


        onTableCardClick(cardNode) {
          var cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'table') return;
          this.handleCardClick(cardNode, cardData);
        }

        onHandCardClick(cardNode) {
          var cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'hand') return;
          this.handleCardClick(cardNode, cardData);
        }

        handleCardClick(cardNode, cardData) {
          var currentTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.topCard;
          var reserveCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.reserveCards;

          if (cardData.currentArea === 'hand' && cardData !== currentTopCard) {
            var cardIndex = reserveCards.indexOf(cardData);
            if (cardIndex !== reserveCards.length - 1) return;
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard = cardData;
            var currentReserveCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.reserveCards;
            var cardIndex2 = currentReserveCards.indexOf(cardData);

            if (cardIndex2 !== -1) {
              currentReserveCards.splice(cardIndex2, 1);
            }
          }

          if (cardData.currentArea !== 'hand' && currentTopCard) {
            if (!(_crd && CardService === void 0 ? (_reportPossibleCrUseOfCardService({
              error: Error()
            }), CardService) : CardService).canMoveToCard(cardData, currentTopCard)) return;
          }

          var targetPosition = this.calculateTargetPosition(cardData);
          this.saveCardMoveRecord(cardData, targetPosition);

          if (cardData.currentArea === 'table') {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard = cardData;
          }

          cardData.updatePosition(targetPosition.x, targetPosition.y);
          cardNode.setSiblingIndex(100);
          cardData.zIndex = 100;
          tween(cardNode).to(0.3, {
            position: new Vec3(targetPosition.x, targetPosition.y, 0)
          }).start();
        } // 计算目标位置


        calculateTargetPosition(cardData) {
          var _handConf$separateCar3, _handConf$separateCar4;

          var layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig;
          var handConf = layoutConfig == null ? void 0 : layoutConfig.handLayout;
          var handCards = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values());
          var lastHandCard = handCards[handCards.length - 1];

          if (lastHandCard) {
            var children = this.tableArea.children;

            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              var cardId = child.cardId;

              if (cardId === lastHandCard.id) {
                var position = child.getPosition();
                return {
                  x: position.x,
                  y: position.y
                };
              }
            }
          }

          return {
            x: (_handConf$separateCar3 = handConf == null ? void 0 : handConf.separateCardX) != null ? _handConf$separateCar3 : 200,
            y: (_handConf$separateCar4 = handConf == null ? void 0 : handConf.separateCardY) != null ? _handConf$separateCar4 : 0
          };
        } // 保存卡牌移动记录


        saveCardMoveRecord(cardData, targetPosition) {
          var children = this.tableArea.children;
          var cardNode = null;

          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var cardId = child.cardId;

            if (cardId === cardData.id) {
              cardNode = child;
              break;
            }
          }

          if (!cardNode) return;
          var currentPosition = cardNode.getPosition();
          var currentTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.topCard;
          var reserveCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.reserveCards;
          var previousReserveCardIds = reserveCards.map(card => card.id);
          this.historyStack.push({
            cardId: cardData.id,
            fromPosition: {
              x: currentPosition.x,
              y: currentPosition.y
            },
            toPosition: {
              x: targetPosition.x,
              y: targetPosition.y
            },
            fromArea: cardData.currentArea,
            toArea: cardData.currentArea,
            zIndex: cardData.zIndex,
            previousTopCardId: currentTopCard ? currentTopCard.id : null,
            previousReserveCardIds: previousReserveCardIds
          });
        } // 回退最后一次移动


        undoLastMove() {
          if (this.historyStack.length === 0) return;
          var lastRecord = this.historyStack.pop();
          if (!lastRecord) return;
          var children = this.tableArea.children;

          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var cardId = child.cardId;

            if (cardId === lastRecord.cardId) {
              tween(child).to(0.3, {
                position: new Vec3(lastRecord.fromPosition.x, lastRecord.fromPosition.y, 0)
              }).call(() => {
                if (lastRecord.previousTopCardId) {
                  var previousTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.getCardById(lastRecord.previousTopCardId);

                  if (previousTopCard) {
                    (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                      error: Error()
                    }), DataManager) : DataManager).instance.gameModel.topCard = previousTopCard;
                  }
                } else {
                  (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.topCard = null;
                }

                if (lastRecord.previousReserveCardIds && lastRecord.previousReserveCardIds.length > 0) {
                  var restoredReserveCards = [];
                  lastRecord.previousReserveCardIds.forEach(cardId => {
                    var card = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                      error: Error()
                    }), DataManager) : DataManager).instance.gameModel.getCardById(cardId);

                    if (card) {
                      restoredReserveCards.push(card);
                    }
                  });
                  (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.reserveCards = restoredReserveCards;
                } else {
                  (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.reserveCards = [];
                }
              }).start();
              var cardData = this.getCardDataFromNode(child);

              if (cardData) {
                cardData.updatePosition(lastRecord.fromPosition.x, lastRecord.fromPosition.y);
                cardData.zIndex = lastRecord.zIndex;
              }

              child.setSiblingIndex(lastRecord.zIndex);
              break;
            }
          }
        } // 撤销操作


        onUndoClick() {
          var success = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.undo();

          if (success) {
            this.refreshAllCardsDisplay();
          }
        } // 刷新所有卡牌显示


        refreshAllCardsDisplay() {
          this.createCardsFromData();
        } // 从节点获取卡牌数据


        getCardDataFromNode(cardNode) {
          var cardId = cardNode.cardId;
          if (!cardId) return undefined;
          return (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.getCardById(cardId);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cardPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tableArea", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "undoButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bigRedNumbers", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bigBlackNumbers", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "smallRedNumbers", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "smallBlackNumbers", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "suitSprites", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8e6a2dfbf4444ee3d25a6b640ffc1504bf6ede93.js.map