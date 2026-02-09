System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, UndoModel, _crd, ActionType;

  function _reportPossibleCrUseOfCardState(extras) {
    _reporterNs.report("CardState", "./CardModel", _context.meta, extras);
  }

  _export("UndoModel", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2f683XDZ5lGDZ9x1rbo0Hpe", "UndoModel", undefined);
      /**
       * 回退模型
       * 负责管理操作历史和撤销功能
       */


      /**
       * 游戏操作类型
       */
      _export("ActionType", ActionType = /*#__PURE__*/function (ActionType) {
        ActionType["MATCH"] = "match";
        ActionType["REPLACE"] = "replace";
        return ActionType;
      }({}));
      /**
       * 游戏操作接口
       */

      /**
       * 操作记录接口
       */


      _export("UndoModel", UndoModel = class UndoModel {
        constructor(maxHistorySize) {
          if (maxHistorySize === void 0) {
            maxHistorySize = 50;
          }

          // 操作历史记录
          this._actionHistory = [];
          // 最大历史记录数
          this._maxHistorySize = 50;
          this._maxHistorySize = maxHistorySize;
        }
        /**
         * 保存操作前的状态
         */


        saveAction(action, cardsState) {
          // 保存操作记录
          this._actionHistory.push({
            action: action,
            cardsState: cardsState
          }); // 限制历史记录数量


          if (this._actionHistory.length > this._maxHistorySize) {
            this._actionHistory.shift();
          }
        }
        /**
         * 获取上一步操作
         */


        getLastAction() {
          if (this._actionHistory.length === 0) return undefined;
          return this._actionHistory[this._actionHistory.length - 1];
        }
        /**
         * 撤销上一步操作
         * @returns 操作记录，如果没有可撤销的操作则返回undefined
         */


        undo() {
          if (this._actionHistory.length === 0) return undefined;
          return this._actionHistory.pop();
        }
        /**
         * 清空历史记录
         */


        clearHistory() {
          this._actionHistory = [];
        }
        /**
         * 获取历史记录数量
         */


        getHistoryCount() {
          return this._actionHistory.length;
        }
        /**
         * 检查是否可以撤销
         */


        canUndo() {
          return this._actionHistory.length > 0;
        }
        /**
         * 获取所有历史记录
         */


        getAllHistory() {
          return [...this._actionHistory];
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cde9aade68c0aa9319ecda478cf5af7b2dc3f32b.js.map