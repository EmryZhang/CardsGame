System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, tween, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, CardView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCardModel(extras) {
    _reporterNs.report("CardModel", "../models/CardModel", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f5cec/E3U9E1Zm0+5GLyscz", "CardView", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventTouch', 'Node', 'Sprite', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", CardView = (_dec = ccclass('CardView'), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property(Sprite), _dec5 = property(Sprite), _dec(_class = (_class2 = class CardView extends Component {
        constructor() {
          super(...arguments);

          // 引用卡牌的子节点
          _initializerDefineProperty(this, "bgSprite", _descriptor, this);

          _initializerDefineProperty(this, "bigNumSprite", _descriptor2, this);

          _initializerDefineProperty(this, "smallNumSprite", _descriptor3, this);

          _initializerDefineProperty(this, "suitSprite", _descriptor4, this);

          // 卡牌数据
          this._cardData = null;
          this._cardIndex = 0;
          this._area = '';
          // 'table' 或 'hand'
          // 点击回调
          this._onClickCallback = null;
        }

        onLoad() {
          console.log('CardView onLoad, 节点名称:', this.node.name); // 确保节点可以接收触摸事件

          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
          console.log('CardView 触摸事件监听已设置');
        } // 初始化卡牌视图


        init(cardData, index, area) {
          this._cardData = cardData;
          this._cardIndex = index;
          this._area = area;
          console.log('CardView init, area:', area, 'index:', index);
        } // 设置点击回调


        setClickCallback(callback) {
          this._onClickCallback = callback;
        } // 触摸开始（添加点击效果）


        onTouchStart(event) {
          console.log('CardView onTouchStart, 节点:', this.node.name);
          tween(this.node).to(0.1, {
            scale: new Vec3(0.95, 0.95, 1)
          }).start();
        } // 触摸结束（触发点击事件）


        onTouchEnd(event) {
          // 恢复大小
          tween(this.node).to(0.1, {
            scale: new Vec3(1, 1, 1)
          }).start(); // 触发点击回调

          if (this._onClickCallback) {
            this._onClickCallback(this);
          }
        } // 触摸取消（恢复状态）


        onTouchCancel(event) {
          tween(this.node).to(0.1, {
            scale: new Vec3(1, 1, 1)
          }).start();
        } // 获取卡牌数据


        getCardData() {
          return this._cardData;
        } // 获取卡牌索引


        getCardIndex() {
          return this._cardIndex;
        } // 获取卡牌区域


        getCardArea() {
          return this._area;
        }

        onDestroy() {
          // 清理事件监听
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bigNumSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "smallNumSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "suitSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5c469182217f191172dfee608582cadad289fa72.js.map