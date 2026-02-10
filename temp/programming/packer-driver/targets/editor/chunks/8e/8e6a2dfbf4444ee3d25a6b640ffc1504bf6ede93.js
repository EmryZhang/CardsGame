System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Vec3, GameConfig, DataManager, CardService, CardUtils, CardView, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, LevelController;

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
      } = _decorator); // 卡牌移动记录接口

      _export("default", LevelController = (_dec = ccclass('LevelController'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([SpriteFrame]), _dec6 = property([SpriteFrame]), _dec7 = property([SpriteFrame]), _dec8 = property([SpriteFrame]), _dec9 = property([SpriteFrame]), _dec(_class = (_class2 = class LevelController extends Component {
        constructor(...args) {
          super(...args);

          // --- 属性定义 ---
          _initializerDefineProperty(this, "cardPrefab", _descriptor, this);

          _initializerDefineProperty(this, "tableArea", _descriptor2, this);

          _initializerDefineProperty(this, "undoButton", _descriptor3, this);

          // --- 资源引用 ---
          _initializerDefineProperty(this, "bigRedNumbers", _descriptor4, this);

          // --- 游戏状态 ---
          _initializerDefineProperty(this, "bigBlackNumbers", _descriptor5, this);

          _initializerDefineProperty(this, "smallRedNumbers", _descriptor6, this);

          _initializerDefineProperty(this, "smallBlackNumbers", _descriptor7, this);

          _initializerDefineProperty(this, "suitSprites", _descriptor8, this);

          // --- 历史记录 ---
          this.historyStack = [];
        }

        async onLoad() {
          // 1. 初始化配置
          await this.initializeConfig(); // 2. 加载关卡

          await this.loadLevel(); // 3. 创建卡牌视图

          this.createCardsFromData(); // 4. 设置回退按钮

          this.setupUndoButton();
        }

        async initializeConfig() {
          await (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.initialize();
        }

        async loadLevel() {
          const success = await (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.loadLevel(1);

          if (!success) {
            console.error('加载关卡失败');
          } else {
            // 加载关卡成功后，更新顶牌和备用牌
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.updateTopAndReserveCards();
          }
        }
        /**
         * 设置回退按钮
         */


        setupUndoButton() {
          if (!this.undoButton) {
            console.warn('回退按钮未设置');
            return;
          }

          this.undoButton.on(Node.EventType.TOUCH_END, () => {
            this.undoLastMove();
          }, this);
        }
        /**
         * 保存卡牌移动记录
         * @param cardData 卡牌数据
         * @param targetPosition 目标位置
         */


        saveCardMoveRecord(cardData, targetPosition) {
          // 找到对应的卡牌节点
          const children = this.tableArea.children;
          let cardNode = null;

          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cardId = child.cardId;

            if (cardId === cardData.id) {
              cardNode = child;
              break;
            }
          }

          if (!cardNode) {
            console.error(`未找到卡牌节点: ${cardData.id}`);
            return;
          } // 获取卡牌节点的当前位置


          const currentPosition = cardNode.getPosition(); // 获取当前顶牌

          const currentTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.topCard;
          const reserveCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.reserveCards; // 记录备用牌的ID列表

          const previousReserveCardIds = reserveCards.map(card => card.id);
          const record = {
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
            // 暂时保持不变，因为现在所有卡牌都在tableArea中
            zIndex: cardData.zIndex,
            previousTopCardId: currentTopCard ? currentTopCard.id : null,
            previousReserveCardIds: previousReserveCardIds
          };
          this.historyStack.push(record);
        }
        /**
         * 回退最后一次移动
         */


        undoLastMove() {
          if (this.historyStack.length === 0) {
            console.log('没有可回退的移动');
            return;
          }

          const lastRecord = this.historyStack.pop();
          if (!lastRecord) return;
          console.log('回退卡牌移动:', lastRecord); // 找到对应的卡牌节点

          const children = this.tableArea.children;

          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cardId = child.cardId;

            if (cardId === lastRecord.cardId) {
              // fromPosition已经是卡牌节点的当前位置（相对坐标）
              // 不需要再做任何转换，直接使用即可
              const targetX = lastRecord.fromPosition.x;
              const targetY = lastRecord.fromPosition.y; // 使用tween动画移动卡牌回退

              tween(child).to(0.3, {
                position: new Vec3(targetX, targetY, 0)
              }).call(() => {
                // 动画完成后恢复顶牌
                if (lastRecord.previousTopCardId) {
                  const previousTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.getCardById(lastRecord.previousTopCardId);

                  if (previousTopCard) {
                    (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                      error: Error()
                    }), DataManager) : DataManager).instance.gameModel.topCard = previousTopCard;
                    const suitName = this.getSuitName(previousTopCard.config.CardSuit);
                    const faceName = this.getFaceName(previousTopCard.config.CardFace);
                    console.log(`恢复顶牌: ${suitName}${faceName}`);
                  }
                } else {
                  // 如果没有之前的顶牌，设置为null
                  (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.topCard = null;
                  console.log('恢复顶牌: 无');
                } // 恢复备用牌数组


                if (lastRecord.previousReserveCardIds && lastRecord.previousReserveCardIds.length > 0) {
                  const restoredReserveCards = [];
                  lastRecord.previousReserveCardIds.forEach(cardId => {
                    const card = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                      error: Error()
                    }), DataManager) : DataManager).instance.gameModel.getCardById(cardId);

                    if (card) {
                      restoredReserveCards.push(card);
                    }
                  });
                  (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.reserveCards = restoredReserveCards;
                  console.log(`恢复备用牌数量: ${restoredReserveCards.length}`);
                } else {
                  (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                    error: Error()
                  }), DataManager) : DataManager).instance.gameModel.reserveCards = [];
                  console.log('恢复备用牌数量: 0');
                }
              }).start(); // 更新卡牌数据的位置

              const cardData = this.getCardDataFromNode(child);

              if (cardData) {
                cardData.updatePosition(targetX, targetY);
                cardData.zIndex = lastRecord.zIndex;
              } // 更新层级


              child.setSiblingIndex(lastRecord.zIndex);
              break;
            }
          }
        }

        createCardsFromData() {
          if (!this.cardPrefab) return;
          this.tableArea.removeAllChildren();
          const layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig; // 1. 创建桌面牌

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.tableCards.forEach(cardData => {
            this.createTableCard(cardData, layoutConfig);
          }); // 2. 创建手牌

          const totalHandCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.size;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.forEach(cardData => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
          }); // 3. 设置初始顶牌（手牌区最右边的一张）

          const handCards = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values());

          if (handCards.length > 0) {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard = handCards[handCards.length - 1];
            console.log(`初始顶牌: ${this.getSuitName((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard.config.CardSuit)}${this.getFaceName((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard.config.CardFace)}`);
          }
        } // --- 创建桌面牌 ---


        createTableCard(cardData, layoutConfig) {
          console.log('创建桌面牌:', cardData);
          const cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode); // 将cardId存储到节点属性上

          cardNode.cardId = cardData.id;
          console.log('已将cardId存储到节点属性:', cardData.id);
          this.setupCardDisplay(cardNode, cardData);
          this.setupTableCardPosition(cardNode, cardData, layoutConfig); // 设置点击回调

          const cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            cardView.setClickCallback(view => {
              this.onTableCardClick(cardNode);
            });
            console.log('桌面卡牌点击回调已设置');
          } else {
            console.error('未找到CardView组件！');
          }
        } // --- 设置桌面牌位置 ---


        setupTableCardPosition(cardNode, cardData, layoutConfig) {
          // 使用CardUtils.convertAbsoluteToRelativeForTable来转换坐标（往上偏移300像素）
          const relativePos = (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).convertAbsoluteToRelativeForTable(cardData.position.x, cardData.position.y);
          const posX = relativePos.x;
          const posY = relativePos.y;
          const zIndex = cardData.zIndex;
          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(zIndex);
          console.log(`桌面牌位置: (${posX}, ${posY})`);
        } // --- 创建手牌 ---


        createHandCard(cardData, layoutConfig, totalCards) {
          console.log('创建手牌:', cardData);
          const cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode); // 将cardId存储到节点属性上

          cardNode.cardId = cardData.id;
          console.log('已将cardId存储到节点属性:', cardData.id);
          this.setupCardDisplay(cardNode, cardData);
          this.setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards); // 设置点击回调

          const cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            cardView.setClickCallback(view => {
              console.log('点击了手牌:', view.getCardData());
              this.onHandCardClick(cardNode);
            });
            console.log('手牌点击回调已设置');
          } else {
            console.error('未找到CardView组件！');
          }
        } // --- 设置手牌位置 ---


        setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards) {
          var _handConf$stackStartX, _handConf$stackStartY, _handConf$stackSpacin, _handConf$separateCar, _handConf$separateCar2;

          const handConf = (layoutConfig == null ? void 0 : layoutConfig.handLayout) || {}; // 读取配置参数 (带有默认值，保证绝对能显示出来)

          const stackX = (_handConf$stackStartX = handConf.stackStartX) != null ? _handConf$stackStartX : -350;
          const startY = (_handConf$stackStartY = handConf.stackStartY) != null ? _handConf$stackStartY : 0;
          const spacingX = (_handConf$stackSpacin = handConf.stackSpacingX) != null ? _handConf$stackSpacin : 100; // 右侧单张的位置

          const separateX = (_handConf$separateCar = handConf.separateCardX) != null ? _handConf$separateCar : 200;
          const separateY = (_handConf$separateCar2 = handConf.separateCardY) != null ? _handConf$separateCar2 : startY; // 获取当前卡牌的索引

          const index = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values()).indexOf(cardData);
          let posX = 0;
          let posY = startY;
          let zIndex = index; // --- 核心逻辑：判断是否是最后一张 ---

          if (index === totalCards - 1) {
            // 是最后一张 -> 放在右边固定位置
            posX = separateX;
            posY = separateY;
            zIndex = 100; // 放在最上层
          } else {
            // 是前面的牌 -> 左边堆叠
            // 公式：起始X + (当前索引 * 间距)
            posX = stackX + index * spacingX;
            posY = startY;
            zIndex = index; // 正常层级
          }

          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(zIndex); // 更新卡牌数据的位置

          cardData.updatePosition(posX, posY);
          cardData.zIndex = zIndex;
          console.log(`手牌 ${index} 位置: (${posX}, ${posY})`);
        } // --- 通用显示设置 ---


        setupCardDisplay(cardNode, cardData) {
          const config = cardData.config;
          const isRed = (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).isRedSuit(config.CardSuit); // 初始化CardView

          const cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            const index = Array.from(cardData.currentArea === 'table' ? (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.tableCards.values() : (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.handCards.values()).indexOf(cardData);
            cardView.init(cardData, index, cardData.currentArea);
            console.log('CardView初始化完成:', cardData);
          } // 辅助函数：安全设置图片


          const setSprite = (name, spriteFrame) => {
            const node = cardNode.getChildByName(name);

            if (node) {
              const sp = node.getComponent(Sprite);

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

          cardNode.name = `${cardData.currentArea}_${(_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).getCardName(config.CardSuit, config.CardFace)}`;
        }

        getNumberSprite(face, isBig, isRed) {
          if (face < 0 || face > 12) return null;
          const arr = isBig ? isRed ? this.bigRedNumbers : this.bigBlackNumbers : isRed ? this.smallRedNumbers : this.smallBlackNumbers;
          return arr[face] || null;
        } // --- 游戏操作 ---

        /**
         * 处理桌面卡牌点击事件
         * @param cardNode 卡牌节点
         */


        onTableCardClick(cardNode) {
          const cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'table') return; // 统一处理卡牌点击

          this.handleCardClick(cardNode, cardData);
        }
        /**
         * 处理手牌点击事件
         * @param cardNode 卡牌节点
         */


        onHandCardClick(cardNode) {
          const cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'hand') return; // 统一处理卡牌点击

          this.handleCardClick(cardNode, cardData);
        }
        /**
         * 统一处理卡牌点击事件
         * @param cardNode 卡牌节点
         * @param cardData 卡牌数据
         */


        handleCardClick(cardNode, cardData) {
          // 获取当前顶牌
          const currentTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.topCard;
          const reserveCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.reserveCards; // 打印当前顶牌信息

          if (currentTopCard) {
            const topSuitName = this.getSuitName(currentTopCard.config.CardSuit);
            const topFaceName = this.getFaceName(currentTopCard.config.CardFace);
            console.log(`当前顶牌: ${topSuitName}${topFaceName}`);
          } else {
            console.log(`当前顶牌: 无`);
          } // 打印备用牌信息


          console.log(`备用牌数量: ${reserveCards.length}`);
          reserveCards.forEach((card, index) => {
            const suitName = this.getSuitName(card.config.CardSuit);
            const faceName = this.getFaceName(card.config.CardFace);
            console.log(`备用牌[${index}]: ${suitName}${faceName}`);
          }); // 如果是手牌区的牌，检查是否是最右边的一张备用牌

          if (cardData.currentArea === 'hand') {
            // 检查点击的牌是否是最右边的一张备用牌（不是顶牌）
            if (cardData !== currentTopCard) {
              // 检查是否是备用牌中最右边的一张
              const cardIndex = reserveCards.indexOf(cardData);
              console.log(`点击的备用牌索引: ${cardIndex}, 备用牌数量: ${reserveCards.length}`);

              if (cardIndex !== reserveCards.length - 1) {
                console.log(`只能点击备用牌中最右边的一张`);
                return;
              } // 点击的是备用牌，更新顶牌为这张备用牌


              console.log(`使用备用牌: ${this.getSuitName(cardData.config.CardSuit)}${this.getFaceName(cardData.config.CardFace)}`);
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).instance.gameModel.topCard = cardData;
              const suitName = this.getSuitName(cardData.config.CardSuit);
              const faceName = this.getFaceName(cardData.config.CardFace);
              console.log(`更新顶牌: ${suitName}${faceName}`); // 从备用牌数组中移除被使用的备用牌

              const currentReserveCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).instance.gameModel.reserveCards;
              const cardIndex2 = currentReserveCards.indexOf(cardData);

              if (cardIndex2 !== -1) {
                currentReserveCards.splice(cardIndex2, 1);
                console.log(`备用牌数量从${cardIndex2 + 1}减少到${currentReserveCards.length}`);
              }
            }
          } // 如果不是手牌区的牌，检查点数是否可以连接


          if (cardData.currentArea !== 'hand' && currentTopCard) {
            const canMove = (_crd && CardService === void 0 ? (_reportPossibleCrUseOfCardService({
              error: Error()
            }), CardService) : CardService).canMoveToCard(cardData, currentTopCard);

            if (!canMove) {
              console.log(`卡牌点数不匹配，无法移动`);
              return;
            }
          } // 计算目标位置


          const targetPosition = this.calculateTargetPosition(cardData); // 打印卡牌信息和目标位置

          const suitName = this.getSuitName(cardData.config.CardSuit);
          const faceName = this.getFaceName(cardData.config.CardFace);
          const areaName = cardData.currentArea === 'table' ? '桌面' : '手牌';
          console.log(`点击${areaName}卡牌: ${suitName}${faceName}`); // 保存当前状态到历史记录

          this.saveCardMoveRecord(cardData, targetPosition); // 如果是桌牌，立即更新顶牌

          if (cardData.currentArea === 'table') {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard = cardData;
            const suitName = this.getSuitName(cardData.config.CardSuit);
            const faceName = this.getFaceName(cardData.config.CardFace);
            console.log(`立即更新顶牌: ${suitName}${faceName}`);
          } // 更新卡牌数据的位置


          cardData.updatePosition(targetPosition.x, targetPosition.y); // 更新层级到最上层

          cardNode.setSiblingIndex(100);
          cardData.zIndex = 100; // 使用tween动画移动卡牌

          tween(cardNode).to(0.3, {
            position: new Vec3(targetPosition.x, targetPosition.y, 0)
          }).call(() => {
            // 动画完成后打印更新后的顶牌信息
            const newTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.topCard;

            if (newTopCard) {
              console.log(`更新顶牌: ${this.getSuitName(newTopCard.config.CardSuit)}${this.getFaceName(newTopCard.config.CardFace)}`);
            } else {
              console.log(`更新顶牌: 无`);
            }
          }).start();
        }
        /**
         * 更新顶牌信息
         */


        updateTopCard() {
          const currentTopCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.topCard;

          if (currentTopCard) {
            console.log(`更新顶牌: ${this.getSuitName(currentTopCard.config.CardSuit)}${this.getFaceName(currentTopCard.config.CardFace)}`);
          } else {
            console.log(`更新顶牌: 无`);
          }
        }
        /**
         * 计算卡牌的目标位置
         * @param cardData 卡牌数据
         * @returns 目标位置 {x, y}
         */


        calculateTargetPosition(cardData) {
          var _handConf$separateCar3, _handConf$separateCar4;

          const layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig;
          const handConf = layoutConfig == null ? void 0 : layoutConfig.handLayout; // 获取手牌最后一张卡牌节点

          const handCards = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values());
          const lastHandCard = handCards[handCards.length - 1];

          if (lastHandCard) {
            // 遍历tableArea的所有子节点，找到对应的卡牌节点
            const children = this.tableArea.children;

            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              const cardId = child.cardId;

              if (cardId === lastHandCard.id) {
                // 找到手牌最后一张的节点
                // 获取手牌最后一张的位置（相对于tableArea）
                const position = child.getPosition();
                console.log(`手牌最后一张位置: (${position.x}, ${position.y})`);
                return {
                  x: position.x,
                  y: position.y
                };
              }
            }

            console.log('未找到手牌最后一张的节点');
          } // 如果找不到手牌最后一张，返回配置中的默认位置


          return {
            x: (_handConf$separateCar3 = handConf == null ? void 0 : handConf.separateCardX) != null ? _handConf$separateCar3 : 200,
            y: (_handConf$separateCar4 = handConf == null ? void 0 : handConf.separateCardY) != null ? _handConf$separateCar4 : 0
          };
        }
        /**
         * 获取花色名称
         */


        getSuitName(suit) {
          const suits = ['♠', '♥', '♣', '♦'];
          return suits[suit] || '?';
        }
        /**
         * 获取牌面名称
         */


        getFaceName(face) {
          const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          return faces[face] || '?';
        }
        /**
         * 撤销上一步操作
         */


        onUndoClick() {
          const success = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.undo();

          if (success) {
            console.log('撤销成功！'); // 刷新所有卡牌显示

            this.refreshAllCardsDisplay(); // 更新顶牌信息

            this.updateTopCard();
          } else {
            console.log('无法撤销');
          }
        }
        /**
         * 从节点获取卡牌数据
         */


        getCardDataFromNode(cardNode) {
          const cardId = cardNode.cardId;

          if (!cardId) {
            console.log('节点上没有cardId属性');
            return undefined;
          }

          const cardData = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.getCardById(cardId);
          return cardData;
        }
        /**
         * 刷新卡牌显示
         */


        refreshCardDisplay(cardNode, cardData) {
          this.setupCardDisplay(cardNode, cardData);
        }
        /**
         * 移除手牌最后一张的视图
         */


        removeLastHandCardView() {
          const lastCard = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.getLastHandCard();

          if (lastCard) {
            // 遍历tableArea的所有子节点，找到对应的卡牌节点
            const children = this.tableArea.children;

            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              const cardId = child.cardId;

              if (cardId === lastCard.id) {
                child.removeFromParent();
                break;
              }
            }
          }
        }
        /**
         * 刷新手牌显示
         */


        refreshHandCardsDisplay() {
          // 移除所有手牌节点
          const children = this.tableArea.children;

          for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            const cardId = child.cardId;
            const cardData = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).instance.gameModel.handCards.get(cardId); // 如果是手牌，则移除

            if (cardData) {
              child.removeFromParent();
            }
          } // 重新创建手牌


          const totalHandCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.size;
          const layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.forEach(cardData => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
          });
        }
        /**
         * 刷新所有卡牌显示
         */


        refreshAllCardsDisplay() {
          this.createCardsFromData();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cardPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tableArea", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "undoButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bigRedNumbers", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bigBlackNumbers", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "smallRedNumbers", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "smallBlackNumbers", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "suitSprites", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8e6a2dfbf4444ee3d25a6b640ffc1504bf6ede93.js.map