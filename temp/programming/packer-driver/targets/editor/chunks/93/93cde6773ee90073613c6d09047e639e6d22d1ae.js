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
       * 用于管理卡牌在游戏过程中的动态状态
       */


      _export("RuntimeCardData", RuntimeCardData = class RuntimeCardData {
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
          // 层级
          // 历史状态（用于回退）
          this.stateHistory = [];
          this.config = config;
          this.id = id || this.generateId();
          this.position = { ...config.Position
          };
        }
        /**
         * 生成唯一ID
         */


        generateId() {
          return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        /**
         * 保存当前状态到历史记录
         */


        saveState() {
          const state = {
            isFaceUp: this.isFaceUp,
            isLocked: this.isLocked,
            currentArea: this.currentArea,
            position: { ...this.position
            },
            zIndex: this.zIndex
          };
          this.stateHistory.push(state);
        }
        /**
         * 回退到上一个状态
         * @returns 是否成功回退
         */


        restoreState() {
          if (this.stateHistory.length === 0) return false;
          const lastState = this.stateHistory.pop();

          if (lastState) {
            this.isFaceUp = lastState.isFaceUp;
            this.isLocked = lastState.isLocked;
            this.currentArea = lastState.currentArea;
            this.position = { ...lastState.position
            };
            this.zIndex = lastState.zIndex;
            return true;
          }

          return false;
        }
        /**
         * 清空历史记录
         */


        clearHistory() {
          this.stateHistory = [];
        }
        /**
         * 获取历史记录数量
         */


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