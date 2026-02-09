System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Vec3, GameConfig, DataManager, CardUtils, CardView, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, LevelController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../configs/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../managers/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardModel(extras) {
    _reporterNs.report("CardModel", "../models/CardModel", _context.meta, extras);
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
      CardUtils = _unresolved_4.CardUtils;
    }, function (_unresolved_5) {
      CardView = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3920e54019JjICAIPmKs/ha", "LevelController", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'instantiate', 'Node', 'Prefab', 'Sprite', 'SpriteFrame', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", LevelController = (_dec = ccclass('LevelController'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([SpriteFrame]), _dec6 = property([SpriteFrame]), _dec7 = property([SpriteFrame]), _dec8 = property([SpriteFrame]), _dec9 = property([SpriteFrame]), _dec(_class = (_class2 = class LevelController extends Component {
        constructor(...args) {
          super(...args);

          // --- 属性定义 ---
          _initializerDefineProperty(this, "cardPrefab", _descriptor, this);

          _initializerDefineProperty(this, "handArea", _descriptor2, this);

          _initializerDefineProperty(this, "tableArea", _descriptor3, this);

          // --- 资源引用 ---
          _initializerDefineProperty(this, "bigRedNumbers", _descriptor4, this);

          _initializerDefineProperty(this, "bigBlackNumbers", _descriptor5, this);

          _initializerDefineProperty(this, "smallRedNumbers", _descriptor6, this);

          _initializerDefineProperty(this, "smallBlackNumbers", _descriptor7, this);

          _initializerDefineProperty(this, "suitSprites", _descriptor8, this);
        }

        async onLoad() {
          // 1. 初始化配置
          await this.initializeConfig(); // 2. 加载关卡

          await this.loadLevel(); // 3. 创建卡牌视图

          this.createCardsFromData();
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
          }
        }

        createCardsFromData() {
          if (!this.cardPrefab) return;
          this.tableArea.removeAllChildren();
          this.handArea.removeAllChildren();
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
          });
        } // --- 创建桌面牌 ---


        createTableCard(cardData, layoutConfig) {
          console.log('创建桌面牌:', cardData);
          const cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode); // 将cardId存储到节点属性上

          cardNode.cardId = cardData.id;
          console.log('已将cardId存储到节点属性:', cardData.id);
          this.setupCardDisplay(cardNode, cardData); // 设置点击回调

          const cardView = cardNode.getComponent(_crd && CardView === void 0 ? (_reportPossibleCrUseOfCardView({
            error: Error()
          }), CardView) : CardView);

          if (cardView) {
            cardView.setClickCallback(view => {
              console.log('点击了桌面卡牌:', view.getCardData());
              this.onTableCardClick(cardNode);
            });
            console.log('桌面卡牌点击回调已设置');
          } else {
            console.error('未找到CardView组件！');
          } // 使用CardModel中的位置


          let posX = cardData.position.x;
          let posY = cardData.position.y; // 简单的向下微调，防止卡牌超出屏幕上边缘

          posX = posX - 540;
          posY = posY - 960 + 300;
          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(cardData.zIndex); // 确保渲染顺序
        } // --- 创建手牌 ---


        createHandCard(cardData, layoutConfig, totalCards) {
          console.log('创建手牌:', cardData);
          const cardNode = instantiate(this.cardPrefab);
          this.handArea.addChild(cardNode); // 将cardId存储到节点属性上

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
          var _ref, _handConf$stackStartX, _handConf$stackStartY, _ref2, _handConf$horizontalS, _ref3, _handConf$separateCar, _ref4, _handConf$separateCar2;

          // 安全获取配置，如果 layoutConfig 为空，使用后面的默认值 (??) 防止不显示
          console.log('布局配置:', layoutConfig); // 这里为了兼容你可能还没改好的 JSON 字段，做了一些兼容处理

          const handConf = (layoutConfig == null ? void 0 : layoutConfig.handLayout) || {}; // 读取配置参数 (带有默认值，保证绝对能显示出来)

          const stackX = (_ref = (_handConf$stackStartX = handConf.stackStartX) != null ? _handConf$stackStartX : handConf.stackStartX) != null ? _ref : -350;
          const startY = (_handConf$stackStartY = handConf.stackStartY) != null ? _handConf$stackStartY : 0;
          const spacingX = (_ref2 = (_handConf$horizontalS = handConf.horizontalSpacing) != null ? _handConf$horizontalS : handConf.stackSpacingX) != null ? _ref2 : 100; // 右侧单张的位置

          const separateX = (_ref3 = (_handConf$separateCar = handConf.separateCardX) != null ? _handConf$separateCar : handConf.separateCardX) != null ? _ref3 : 200;
          const separateY = (_ref4 = (_handConf$separateCar2 = handConf.separateCardY) != null ? _handConf$separateCar2 : handConf.separateCardY) != null ? _ref4 : startY; // 获取当前卡牌的索引

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
          cardNode.setSiblingIndex(zIndex);
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
          if (!cardData || cardData.currentArea !== 'table') return; // 将桌面牌从tableArea移动到handArea

          cardNode.setParent(this.handArea); // 更新卡牌数据

          cardData.updateArea('hand'); // 将桌面牌移动到手牌最后一张的位置

          this.moveCardToLastHandPosition(cardNode, cardData);
        }
        /**
         * 处理手牌点击事件
         * @param cardNode 卡牌节点
         */


        onHandCardClick(cardNode) {
          var _handCards;

          const cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'hand') return; // 检查是否是最后一张

          const handCards = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.handCards.values());
          const isLastCard = ((_handCards = handCards[handCards.length - 1]) == null ? void 0 : _handCards.id) === cardData.id; // 如果不是最后一张，移动到最后一张的位置

          if (!isLastCard) {
            this.moveCardToLastHandPosition(cardNode, cardData);
          }
        }
        /**
         * 将卡牌移动到手牌最后一张的位置
         * @param cardNode 卡牌节点
         * @param cardData 卡牌数据
         */


        moveCardToLastHandPosition(cardNode, cardData) {
          var _handConf$separateCar3, _handConf$separateCar4;

          const layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig;
          const handConf = layoutConfig == null ? void 0 : layoutConfig.handLayout; // 获取最后一张牌的位置配置（与setupHandCardPosition保持一致）

          const targetX = (_handConf$separateCar3 = handConf == null ? void 0 : handConf.separateCardX) != null ? _handConf$separateCar3 : 200;
          const targetY = (_handConf$separateCar4 = handConf == null ? void 0 : handConf.separateCardY) != null ? _handConf$separateCar4 : 0; // 打印卡牌信息和目标位置

          const suitName = this.getSuitName(cardData.config.CardSuit);
          const faceName = this.getFaceName(cardData.config.CardFace);
          console.log(`点击卡牌: ${suitName}${faceName}`);
          console.log(`移动目标位置: (${targetX}, ${targetY})`); // 使用tween动画移动卡牌（直接使用配置值，不进行额外调整）

          tween(cardNode).to(0.3, {
            position: new Vec3(targetX, targetY, 0)
          }).start(); // 更新卡牌数据的位置

          cardData.updatePosition(targetX, targetY); // 更新层级到最上层

          cardNode.setSiblingIndex(100);
          cardData.zIndex = 100;
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

            this.refreshAllCardsDisplay();
          } else {
            console.log('无法撤销');
          }
        }
        /**
         * 从节点获取卡牌数据
         */


        getCardDataFromNode(cardNode) {
          // 通过节点属性获取卡牌ID
          console.log('=== getCardDataFromNode 开始 ===');
          console.log('节点名称:', cardNode.name);
          console.log('节点完整信息:', cardNode); // 尝试从节点属性中获取cardId

          const cardId = cardNode.cardId;
          console.log('从节点属性提取的cardId:', cardId);

          if (!cardId) {
            console.log('节点上没有cardId属性');
            return undefined;
          }

          const cardData = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.gameModel.getCardById(cardId);
          console.log('获取到的cardData:', cardData);
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
            const lastCardNode = this.handArea.getChildByPath(lastCard.id);

            if (lastCardNode) {
              lastCardNode.removeFromParent();
            }
          }
        }
        /**
         * 刷新手牌显示
         */


        refreshHandCardsDisplay() {
          this.handArea.removeAllChildren();
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handArea", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tableArea", [_dec4], {
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