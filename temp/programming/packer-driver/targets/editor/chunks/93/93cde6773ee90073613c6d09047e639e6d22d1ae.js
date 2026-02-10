System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, RuntimeCardData, _crd;

  function _reportPossibleCrUseOfCardConfig(extras) {
    _reporterNs.report("CardConfig", "./CardData", _context.meta, extras);
  }

  _export("RuntimeCardData", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "77cc3UkZpRIIq2f042AP9+g", "RuntimeCardData", undefined);

      /**
       * 运行时卡牌数据模型
       */
      _export("RuntimeCardData", RuntimeCardData = class RuntimeCardData {
        constructor(config, id) {
          this.id = void 0;
          this.config = void 0;
          this.isFaceUp = false;
          this.isLocked = false;
          this.currentArea = '';
          this.position = {
            x: 0,
            y: 0
          };
          this.zIndex = 0;
          this.stateHistory = [];
          this.config = config;
          this.id = id || this.generateId();
          this.position = { ...config.Position
          };
        }

        generateId() {
          return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        } // 保存当前状态


        saveState() {
          this.stateHistory.push({
            isFaceUp: this.isFaceUp,
            isLocked: this.isLocked,
            currentArea: this.currentArea,
            position: { ...this.position
            },
            zIndex: this.zIndex
          });
        } // 恢复到上一个状态


        restoreState() {
          if (this.stateHistory.length === 0) return false;
          const lastState = this.stateHistory.pop();
          if (!lastState) return false;
          this.isFaceUp = lastState.isFaceUp;
          this.isLocked = lastState.isLocked;
          this.currentArea = lastState.currentArea;
          this.position = { ...lastState.position
          };
          this.zIndex = lastState.zIndex;
          return true;
        } // 清空历史记录


        clearHistory() {
          this.stateHistory = [];
        } // 获取历史记录数量


        getHistoryCount() {
          return this.stateHistory.length;
        }

      });
      /**
       * 卡牌状态接口
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=93cde6773ee90073613c6d09047e639e6d22d1ae.js.map