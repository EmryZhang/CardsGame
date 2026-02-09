System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, JsonAsset, resources, DEFAULT_LAYOUT_CONFIG, GameConfig, _crd;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfDEFAULT_LAYOUT_CONFIG(extras) {
    _reporterNs.report("DEFAULT_LAYOUT_CONFIG", "../models/LayoutConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfILayoutConfig(extras) {
    _reporterNs.report("ILayoutConfig", "../models/LayoutConfig", _context.meta, extras);
  }

  _export("GameConfig", void 0);

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
      DEFAULT_LAYOUT_CONFIG = _unresolved_2.DEFAULT_LAYOUT_CONFIG;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "042f6mhXcVBRK/tvZcuz1AB", "GameConfig", undefined);

      __checkObsolete__(['JsonAsset', 'resources']);

      _export("GameConfig", GameConfig = class GameConfig {
        constructor() {
          this._layoutConfig = null;
        }

        static get instance() {
          if (!this._instance) {
            this._instance = new GameConfig();
          }

          return this._instance;
        }

        initialize() {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this._layoutConfig) return true; // 避免重复加载

            console.log('⚙️ 初始化游戏配置...');
            var success = yield _this.loadLayoutConfig();
            return success;
          })();
        }

        loadLayoutConfig() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            return new Promise(resolve => {
              resources.load('configs/LayoutConfig', JsonAsset, (err, asset) => {
                if (err) {
                  console.warn('⚠️ 加载JSON失败，使用默认配置:', err); // 关键：加载失败时，赋值默认配置

                  _this2._layoutConfig = _crd && DEFAULT_LAYOUT_CONFIG === void 0 ? (_reportPossibleCrUseOfDEFAULT_LAYOUT_CONFIG({
                    error: Error()
                  }), DEFAULT_LAYOUT_CONFIG) : DEFAULT_LAYOUT_CONFIG;
                  resolve(false);
                } else {
                  console.log('✅ 布局配置加载成功');
                  _this2._layoutConfig = asset.json;
                  resolve(true);
                }
              });
            });
          })();
        }

        get layoutConfig() {
          // 如果还没初始化，直接返回默认值，防止报错
          return this._layoutConfig || (_crd && DEFAULT_LAYOUT_CONFIG === void 0 ? (_reportPossibleCrUseOfDEFAULT_LAYOUT_CONFIG({
            error: Error()
          }), DEFAULT_LAYOUT_CONFIG) : DEFAULT_LAYOUT_CONFIG);
        }

      });

      GameConfig._instance = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=88dc15848558606dd68811c377edb470d0eeca13.js.map