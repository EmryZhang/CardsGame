System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, JsonAsset, resources, GameConfig, _crd, DEFAULT_LAYOUT_CONFIG;

  _export("GameConfig", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      JsonAsset = _cc.JsonAsset;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "45a9aovB39BWYH7A2Wx9mIH", "GameConfig", undefined);

      __checkObsolete__(['JsonAsset', 'resources']);

      _export("DEFAULT_LAYOUT_CONFIG", DEFAULT_LAYOUT_CONFIG = {
        designWidth: 1080,
        designHeight: 2080,
        cardWidth: 300,
        cardHeight: 180,
        tableLayout: {
          centerX: 0,
          centerY: 300,
          scale: 1.0
        },
        handLayout: {
          mode: "stack_last_separate",
          stackStartX: -200,
          stackStartY: 750,
          stackSpacingX: 100,
          separateCardX: 350,
          separateCardY: 750
        }
      });

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

        async initialize() {
          if (this._layoutConfig) return true;
          console.log('⚙️ 初始化游戏配置...');
          const success = await this.loadLayoutConfig();
          return success;
        }

        async loadLayoutConfig() {
          return new Promise(resolve => {
            resources.load('configs/LayoutConfig', JsonAsset, (err, asset) => {
              if (err) {
                console.warn('⚠️ 加载JSON失败，使用默认配置:', err); // 加载失败时，赋值默认配置

                this._layoutConfig = DEFAULT_LAYOUT_CONFIG;
                resolve(false);
              } else {
                console.log('✅ 布局配置加载成功');
                this._layoutConfig = asset.json;
                resolve(true);
              }
            });
          });
        }

        get layoutConfig() {
          return this._layoutConfig || DEFAULT_LAYOUT_CONFIG;
        }

      });

      GameConfig._instance = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=082064af05bc2e41f38e6d3acdafe4611973e08a.js.map