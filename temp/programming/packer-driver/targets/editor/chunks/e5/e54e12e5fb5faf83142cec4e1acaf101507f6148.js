System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, GameConfig, DataManager, CardUtils, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, LevelController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../configs/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRuntimeCardData(extras) {
    _reporterNs.report("RuntimeCardData", "../models/RuntimeCardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../managers/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardUtils(extras) {
    _reporterNs.report("CardUtils", "../utils/CardUtils", _context.meta, extras);
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
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      DataManager = _unresolved_3.DataManager;
    }, function (_unresolved_4) {
      CardUtils = _unresolved_4.CardUtils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3920e54019JjICAIPmKs/ha", "LevelController_new", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'instantiate', 'Node', 'Prefab', 'Sprite', 'SpriteFrame']);

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
          }), DataManager) : DataManager).instance.tableCards.forEach(cardData => {
            this.createTableCard(cardData, layoutConfig);
          }); // 2. 创建手牌

          const totalHandCards = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.handCards.size;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.handCards.forEach(cardData => {
            this.createHandCard(cardData, layoutConfig, totalHandCards);
          });
        } // --- 创建桌面牌 ---


        createTableCard(cardData, layoutConfig) {
          const cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode);
          this.setupCardDisplay(cardNode, cardData); // 使用RuntimeCardData中的位置

          let posX = cardData.position.x;
          let posY = cardData.position.y; // 简单的向下微调，防止卡牌超出屏幕上边缘

          posX = posX - 540;
          posY = posY - 960 + 300;
          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(cardData.zIndex); // 确保渲染顺序
        } // --- 创建手牌 ---


        createHandCard(cardData, layoutConfig, totalCards) {
          const cardNode = instantiate(this.cardPrefab);
          this.handArea.addChild(cardNode);
          this.setupCardDisplay(cardNode, cardData);
          this.setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards);
        } // --- 设置手牌位置 ---


        setupHandCardPosition(cardNode, cardData, layoutConfig, totalCards) {
          var _handConf$startX, _handConf$startY, _handConf$stackSpacin, _handConf$separateCar, _handConf$separateCar2;

          // 安全获取配置
          console.log('布局配置:', layoutConfig);
          const handConf = (layoutConfig == null ? void 0 : layoutConfig.handLayout) || {}; // 读取配置参数 (带有默认值)

          const stackX = (_handConf$startX = handConf.startX) != null ? _handConf$startX : -200;
          const startY = (_handConf$startY = handConf.startY) != null ? _handConf$startY : -750;
          const spacingX = (_handConf$stackSpacin = handConf.stackSpacingX) != null ? _handConf$stackSpacin : 100; // 右侧单张的位置

          const separateX = (_handConf$separateCar = handConf.separateCardX) != null ? _handConf$separateCar : 350;
          const separateY = (_handConf$separateCar2 = handConf.separateCardY) != null ? _handConf$separateCar2 : startY; // 获取当前卡牌的索引

          const index = Array.from((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.handCards.values()).indexOf(cardData);
          let posX = 0;
          let posY = startY;
          let zIndex = cardData.zIndex; // 判断是否是最后一张

          if (index === totalCards - 1) {
            posX = separateX;
            posY = separateY;
            zIndex = 100;
          } else {
            posX = stackX + index * spacingX;
            posY = startY;
          }

          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(zIndex);
          console.log(`手牌 ${index} 位置: (${posX}, ${posY})`);
        } // --- 通用显示设置 ---


        setupCardDisplay(cardNode, cardData) {
          const config = cardData.config;
          const isRed = (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).isRedSuit(config.CardSuit); // 辅助函数：安全设置图片

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
          const faceIndex = (_crd && CardUtils === void 0 ? (_reportPossibleCrUseOfCardUtils({
            error: Error()
          }), CardUtils) : CardUtils).getFaceIndex(face);
          if (faceIndex < 0 || faceIndex > 12) return null;
          const arr = isBig ? isRed ? this.bigRedNumbers : this.bigBlackNumbers : isRed ? this.smallRedNumbers : this.smallBlackNumbers;
          return arr[faceIndex] || null;
        } // --- 游戏操作 ---

        /**
         * 处理桌面卡牌点击事件
         * @param cardNode 卡牌节点
         */


        onTableCardClick(cardNode) {
          const cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'table') return;
          const success = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.executeMatch(cardData.id);

          if (success) {
            console.log('匹配成功！'); // 刷新显示

            this.refreshCardDisplay(cardNode, cardData); // 移除手牌最后一张的视图

            this.removeLastHandCardView();
          } else {
            console.log('无法匹配');
          }
        }
        /**
         * 处理手牌点击事件
         * @param cardNode 卡牌节点
         */


        onHandCardClick(cardNode) {
          const cardData = this.getCardDataFromNode(cardNode);
          if (!cardData || cardData.currentArea !== 'hand') return;
          const success = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.replaceLastHandCard(cardData.id);

          if (success) {
            console.log('替换成功！'); // 刷新手牌显示

            this.refreshHandCardsDisplay();
          } else {
            console.log('无法替换');
          }
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
          // 通过节点名称或其他方式获取卡牌ID
          // 这里需要根据实际实现调整
          const cardId = cardNode.name.split('_')[1];
          return (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.getCardById(cardId);
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
          }), DataManager) : DataManager).instance.getLastHandCard();

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
          }), DataManager) : DataManager).instance.handCards.size;
          const layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).instance.handCards.forEach(cardData => {
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
//# sourceMappingURL=e54e12e5fb5faf83142cec4e1acaf101507f6148.js.map