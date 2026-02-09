System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardModel, _crd;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _reportPossibleCrUseOfCardConfig(extras) {
    _reporterNs.report("CardConfig", "./CardData", _context.meta, extras);
  }

  _export("CardModel", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e2aa0mGo9lD+osuEl5+wNXs", "CardModel", undefined);
      /**
       * 卡牌模型
       * 负责管理单张卡牌的数据和状态
       */


      _export("CardModel", CardModel = class CardModel {
        // 层级
        constructor(config, id) {
          // 卡牌唯一ID
          this.id = void 0;
          // 静态配置数据
          this.config = void 0;
          // 动态状态数据
          this.isFaceUp = false;
          // 是否正面朝上
          this.isLocked = false;
          // 是否被锁定（不可移动）
          this.currentArea = '';
          // 当前所在区域（table/hand等）
          this.position = {
            x: 0,
            y: 0
          };
          // 当前位置
          this.zIndex = 0;
          this.config = config;
          this.id = id || this.generateId();
          this.position = _extends({}, config.Position);
        }
        /**
         * 生成唯一ID
         */


        generateId() {
          return "card_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        }
        /**
         * 更新卡牌位置
         */


        updatePosition(x, y) {
          this.position = {
            x,
            y
          };
        }
        /**
         * 更新卡牌区域
         */


        updateArea(area) {
          this.currentArea = area;
        }
        /**
         * 翻转卡牌
         */


        flip() {
          this.isFaceUp = !this.isFaceUp;
        }
        /**
         * 锁定/解锁卡牌
         */


        setLocked(locked) {
          this.isLocked = locked;
        }
        /**
         * 克隆卡牌状态
         */


        clone() {
          var cloned = new CardModel(this.config, this.id);
          cloned.isFaceUp = this.isFaceUp;
          cloned.isLocked = this.isLocked;
          cloned.currentArea = this.currentArea;
          cloned.position = _extends({}, this.position);
          cloned.zIndex = this.zIndex;
          return cloned;
        }

      });
      /**
       * 卡牌状态接口（用于序列化）
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fedac90c974e6948900a90aacb5c70c174bc597f.js.map