System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CardModel, _crd;

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

      // 扑克牌数据模型
      _export("CardModel", CardModel = class CardModel {
        // 层级深度
        constructor(config, id) {
          this.id = void 0;
          // 唯一标识符
          this.config = void 0;
          // 基础配置
          this.isFaceUp = false;
          // 是否正面朝上
          this.isLocked = false;
          // 是否锁定
          this.currentArea = '';
          // 当前所在区域
          this.position = {
            x: 0,
            y: 0
          };
          // 当前位置
          this.zIndex = 0;
          this.config = config;
          this.id = id || this.generateId();
          this.position = { ...config.Position
          };
        } // 生成唯一ID


        generateId() {
          return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        } // 更新位置


        updatePosition(x, y) {
          this.position = {
            x,
            y
          };
        } // 更新区域


        updateArea(area) {
          this.currentArea = area;
        } // 设置锁定状态


        setLocked(locked) {
          this.isLocked = locked;
        } // 克隆当前卡片


        clone() {
          const cloned = new CardModel(this.config, this.id);
          cloned.isFaceUp = this.isFaceUp;
          cloned.isLocked = this.isLocked;
          cloned.currentArea = this.currentArea;
          cloned.position = { ...this.position
          };
          cloned.zIndex = this.zIndex;
          return cloned;
        }

      });
      /**
       * 卡牌状态快照
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fedac90c974e6948900a90aacb5c70c174bc597f.js.map