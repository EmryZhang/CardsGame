System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, JsonAsset, resources, GameModel, ActionType, UndoModel, DataManager, _crd;

  function _reportPossibleCrUseOfLevelConfig(extras) {
    _reporterNs.report("LevelConfig", "../models/CardData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "../models/GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActionType(extras) {
    _reporterNs.report("ActionType", "../models/UndoModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameAction(extras) {
    _reporterNs.report("GameAction", "../models/UndoModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUndoModel(extras) {
    _reporterNs.report("UndoModel", "../models/UndoModel", _context.meta, extras);
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
      ActionType = _unresolved_3.ActionType;
      UndoModel = _unresolved_3.UndoModel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4c0154STcNL5KfBSE3ho89J", "DataManager", undefined);

      __checkObsolete__(['JsonAsset', 'resources']);

      /**
       * 游戏数据管理器
       */
      _export("DataManager", DataManager = class DataManager {
        constructor() {
          this._currentLevelConfig = null;
          this._currentLevelId = 1;
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
        } // 加载关卡配置


        async loadLevel(levelId) {
          return new Promise(resolve => {
            const levelPath = `levels/level_${levelId}`;
            resources.load(levelPath, JsonAsset, (err, asset) => {
              if (err) {
                console.error(`加载关卡 ${levelId} 失败:`, err);
                resolve(false);
                return;
              }

              this._currentLevelConfig = asset.json;
              this._currentLevelId = levelId;

              this._gameModel.initialize(this._currentLevelConfig);

              resolve(true);
            });
          });
        } // 清空所有数据


        clearAllData() {
          this._gameModel.clearAll();

          this._undoModel.clearHistory();
        }

        get currentLevelConfig() {
          return this._currentLevelConfig;
        }

        get currentLevelId() {
          return this._currentLevelId;
        }

        get gameModel() {
          return this._gameModel;
        }

        get undoModel() {
          return this._undoModel;
        } // 执行匹配操作


        executeMatch(tableCardId) {
          this.saveStateBeforeAction({
            type: (_crd && ActionType === void 0 ? (_reportPossibleCrUseOfActionType({
              error: Error()
            }), ActionType) : ActionType).MATCH,
            tableCardId: tableCardId
          });
          return this._gameModel.executeMatch(tableCardId);
        } // 替换手牌最后一张


        replaceLastHandCard(cardId) {
          this.saveStateBeforeAction({
            type: (_crd && ActionType === void 0 ? (_reportPossibleCrUseOfActionType({
              error: Error()
            }), ActionType) : ActionType).REPLACE,
            cardId: cardId
          });
          return this._gameModel.replaceLastHandCard(cardId);
        } // 保存操作前的状态


        saveStateBeforeAction(action) {
          const cardsState = this._gameModel.getAllCardsState();

          this._undoModel.saveAction(action, cardsState);
        } // 撤销上一步操作


        undo() {
          const record = this._undoModel.undo();

          if (!record) return false;

          this._gameModel.restoreAllCardsState(record.cardsState);

          return true;
        } // 清空历史记录


        clearHistory() {
          this._undoModel.clearHistory();
        } // 获取历史记录数量


        getHistoryCount() {
          return this._undoModel.getHistoryCount();
        } // 检查是否可以撤销


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