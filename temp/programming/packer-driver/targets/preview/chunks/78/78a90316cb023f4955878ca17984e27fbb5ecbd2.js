System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, DEFAULT_LAYOUT_CONFIG;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "36d79xhJY9HSb4jgSeSWl2m", "LayoutConfig", undefined); // models/LayoutConfig.ts


      // 默认配置也要改成一样的字段名
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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=78a90316cb023f4955878ca17984e27fbb5ecbd2.js.map