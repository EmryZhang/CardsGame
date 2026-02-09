System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, JsonAsset, resources, GameModel, UndoModel, ActionType, DataManager, _crd;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfLevelConfig(extras) {
    _reporterNs.report("LevelConfig", "../models/CardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "../models/GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUndoModel(extras) {
    _reporterNs.report("UndoModel", "../models/UndoModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActionType(extras) {
    _reporterNs.report("ActionType", "../models/UndoModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameAction(extras) {
    _reporterNs.report("GameAction", "../models/UndoModel", _context.meta, extras);
  }

  _export("DataManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      JsonAsset = _cc.JsonAsset;
      resources = _cc.resources;
    }, function (_unresolved_2) {
      GameModel = _unresolved_2.GameModel;
    }, function (_unresolved_3) {
      UndoModel = _unresolved_3.UndoModel;
      ActionType = _unresolved_3.ActionType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4c0154STcNL5KfBSE3ho89J", "DataManager", undefined);
      /**
       * 游戏数据管理器
       * 负责管理游戏流程，数据操作委托给Models层
       */


      __checkObsolete__(['JsonAsset', 'resources']);

      _export("DataManager", DataManager = class DataManager {
        constructor() {
          // 静态配置数据
          this._currentLevelConfig = null;
          this._currentLevelId = 1;
          // 数据模型
          this._gameModel = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)();
          this._undoModel = new (_crd && UndoModel === void 0 ? (_reportPossibleCrUseOfUndoModel({
            error: Error()
          }), UndoModel) : UndoModel)();
        }

        static get instance() {
          if (!this._instance) {
            this._instance = new DataManager();
          }

          return this._instance;
        }
        /**
         * 加载关卡配置
         * @param levelId 关卡ID
         */


        loadLevel(levelId) {
          var _this = this;

          return _asyncToGenerator(function* () {
            return new Promise(resolve => {
              var levelPath = "levels/level_" + levelId;
              resources.load(levelPath, JsonAsset, (err, asset) => {
                if (err) {
                  console.error("\u52A0\u8F7D\u5173\u5361 " + levelId + " \u5931\u8D25:", err);
                  resolve(false);
                  return;
                }

                _this._currentLevelConfig = asset.json;
                _this._currentLevelId = levelId;

                _this._gameModel.initialize(_this._currentLevelConfig);

                resolve(true);
              });
            });
          })();
        }
        /**
         * 清空所有数据
         */


        clearAllData() {
          this._gameModel.clearAll();

          this._undoModel.clearHistory();
        }
        /**
         * 获取当前关卡配置
         */


        get currentLevelConfig() {
          return this._currentLevelConfig;
        }
        /**
         * 获取当前关卡ID
         */


        get currentLevelId() {
          return this._currentLevelId;
        }
        /**
         * 获取游戏模型
         */


        get gameModel() {
          return this._gameModel;
        }
        /**
         * 获取回退模型
         */


        get undoModel() {
          return this._undoModel;
        }
        /**
         * 执行匹配操作
         * @param tableCardId 桌面卡牌ID
         * @returns 是否成功匹配
         */


        executeMatch(tableCardId) {
          // 保存操作前的状态
          this.saveStateBeforeAction({
            type: (_crd && ActionType === void 0 ? (_reportPossibleCrUseOfActionType({
              error: Error()
            }), ActionType) : ActionType).MATCH,
            tableCardId: tableCardId
          }); // 执行匹配

          return this._gameModel.executeMatch(tableCardId);
        }
        /**
         * 替换手牌最后一张
         * @param cardId 要替换的卡牌ID
         * @returns 是否成功替换
         */


        replaceLastHandCard(cardId) {
          // 保存操作前的状态
          this.saveStateBeforeAction({
            type: (_crd && ActionType === void 0 ? (_reportPossibleCrUseOfActionType({
              error: Error()
            }), ActionType) : ActionType).REPLACE,
            cardId: cardId
          }); // 执行替换

          return this._gameModel.replaceLastHandCard(cardId);
        }
        /**
         * 保存操作前的状态
         */


        saveStateBeforeAction(action) {
          var cardsState = this._gameModel.getAllCardsState();

          this._undoModel.saveAction(action, cardsState);
        }
        /**
         * 撤销上一步操作
         * @returns 是否成功撤销
         */


        undo() {
          var record = this._undoModel.undo();

          if (!record) return false;

          this._gameModel.restoreAllCardsState(record.cardsState);

          return true;
        }
        /**
         * 清空历史记录
         */


        clearHistory() {
          this._undoModel.clearHistory();
        }
        /**
         * 获取历史记录数量
         */


        getHistoryCount() {
          return this._undoModel.getHistoryCount();
        }
        /**
         * 检查是否可以撤销
         */


        canUndo() {
          return this._undoModel.canUndo();
        }

      });

      DataManager._instance = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c7a1fe46c0523cce99d07e11b8a96bd4be9532f7.js.map