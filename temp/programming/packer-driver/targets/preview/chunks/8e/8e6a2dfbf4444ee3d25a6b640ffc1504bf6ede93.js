System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, instantiate, JsonAsset, Node, Prefab, resources, Sprite, SpriteFrame, GameConfig, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, LevelController;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../configs/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardConfig(extras) {
    _reporterNs.report("CardConfig", "../models/CardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelConfig(extras) {
    _reporterNs.report("LevelConfig", "../models/CardData", _context.meta, extras);
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
      JsonAsset = _cc.JsonAsset;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "71948O7xMxBMIbTJ/ZPbG/H", "LevelController", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'instantiate', 'JsonAsset', 'Node', 'Prefab', 'resources', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", LevelController = (_dec = ccclass('LevelController'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([SpriteFrame]), _dec6 = property([SpriteFrame]), _dec7 = property([SpriteFrame]), _dec8 = property([SpriteFrame]), _dec9 = property([SpriteFrame]), _dec(_class = (_class2 = class LevelController extends Component {
        constructor() {
          super(...arguments);

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

          this.suitSymbols = ['♣', '♦', '♥', '♠'];
          this.faceTexts = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          this.levelConfig = null;
        }

        onLoad() {
          var _this = this;

          return _asyncToGenerator(function* () {
            // 1. 初始化配置
            yield _this.initializeConfig(); // 2. 加载关卡

            _this.loadLevelFromFile();
          })();
        }

        initializeConfig() {
          return _asyncToGenerator(function* () {
            yield (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).instance.initialize();
          })();
        }

        loadLevelFromFile() {
          resources.load('levels/level_1', JsonAsset, (err, asset) => {
            if (err) return console.error(err);
            this.levelConfig = asset.json;
            this.createCardsFromConfig();
          });
        }

        createCardsFromConfig() {
          var _this$levelConfig$Pla, _this$levelConfig$Sta, _this$levelConfig$Sta2;

          if (!this.levelConfig || !this.cardPrefab) return;
          this.tableArea.removeAllChildren();
          this.handArea.removeAllChildren();
          var layoutConfig = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).instance.layoutConfig; // 1. 创建桌面牌

          (_this$levelConfig$Pla = this.levelConfig.Playfield) == null || _this$levelConfig$Pla.forEach((cardConfig, index) => {
            this.createTableCard(cardConfig, index, layoutConfig);
          }); // 2. 创建手牌

          var totalHandCards = ((_this$levelConfig$Sta = this.levelConfig.Stack) == null ? void 0 : _this$levelConfig$Sta.length) || 0;
          (_this$levelConfig$Sta2 = this.levelConfig.Stack) == null || _this$levelConfig$Sta2.forEach((cardConfig, index) => {
            this.createHandCard(cardConfig, index, layoutConfig, totalHandCards);
          });
        } // --- 创建桌面牌 ---


        createTableCard(config, index, layoutConfig) {
          var cardNode = instantiate(this.cardPrefab);
          this.tableArea.addChild(cardNode);
          this.setupCardDisplay(cardNode, config, 'table', index); // 读取配置位置
          // 注意：这里保留了简单的坐标转换，如果你的配置已经是Cocos坐标，可以去掉偏移计算

          var posX = config.Position.x;
          var posY = config.Position.y; // 简单的向下微调，防止卡牌超出屏幕上边缘

          posX = posX - 540;
          posY = posY - 960 + 300;
          cardNode.setPosition(posX, posY, 0);
          cardNode.setSiblingIndex(index); // 确保渲染顺序
        } // --- 创建手牌 (核心修改逻辑) ---


        createHandCard(config, index, layoutConfig, totalCards) {
          var cardNode = instantiate(this.cardPrefab);
          this.handArea.addChild(cardNode);
          this.setupCardDisplay(cardNode, config, 'hand', index);
          this.setupHandCardPosition(cardNode, index, layoutConfig, totalCards);
        } // --- 设置手牌位置 (已移除硬编码，改为通用逻辑) ---


        setupHandCardPosition(cardNode, index, layoutConfig, totalCards) {
          var _ref, _handConf$stackStartX, _handConf$stackStartY, _ref2, _handConf$horizontalS, _ref3, _handConf$separateCar, _ref4, _handConf$separateCar2;

          // 安全获取配置，如果 layoutConfig 为空，使用后面的默认值 (??) 防止不显示
          console.log('布局配置:', layoutConfig); // 这里为了兼容你可能还没改好的 JSON 字段，做了一些兼容处理

          var handConf = (layoutConfig == null ? void 0 : layoutConfig.handLayout) || {}; // 读取配置参数 (带有默认值，保证绝对能显示出来)

          var stackX = (_ref = (_handConf$stackStartX = handConf.stackStartX) != null ? _handConf$stackStartX : handConf.stackStartX) != null ? _ref : -350;
          var startY = (_handConf$stackStartY = handConf.stackStartY) != null ? _handConf$stackStartY : 0;
          var spacingX = (_ref2 = (_handConf$horizontalS = handConf.horizontalSpacing) != null ? _handConf$horizontalS : handConf.stackSpacingX) != null ? _ref2 : 100; // 右侧单张的位置

          var separateX = (_ref3 = (_handConf$separateCar = handConf.separateCardX) != null ? _handConf$separateCar : handConf.separateCardX) != null ? _ref3 : 200;
          var separateY = (_ref4 = (_handConf$separateCar2 = handConf.separateCardY) != null ? _handConf$separateCar2 : handConf.separateCardY) != null ? _ref4 : startY;
          var posX = 0;
          var posY = startY;
          var zIndex = index; // --- 核心逻辑：判断是否是最后一张 ---

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
          console.log("\u624B\u724C " + index + " \u4F4D\u7F6E: (" + posX + ", " + posY + ")");
        } // --- 通用显示设置 ---


        setupCardDisplay(cardNode, config, area, index) {
          var isRed = this.isRedSuit(config.CardSuit); // 辅助函数：安全设置图片

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

          cardNode.name = area + "_" + index + "_" + this.getCardName(config);
        }

        isRedSuit(suit) {
          return suit === 1 || suit === 2;
        }

        getNumberSprite(face, isBig, isRed) {
          if (face < 0 || face > 12) return null;
          var arr = isBig ? isRed ? this.bigRedNumbers : this.bigBlackNumbers : isRed ? this.smallRedNumbers : this.smallBlackNumbers;
          return arr[face] || null;
        }

        getCardName(config) {
          return "" + (this.suitSymbols[config.CardSuit] || '?') + (this.faceTexts[config.CardFace] || '?');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cardPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handArea", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tableArea", [_dec4], {
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