var Graphics = (function() 
{
  var _pixi = {};
  
  _pixi.createStage = function(bgColor) {
    _pixi.stage = new PIXI.Stage(bgColor);
  }

  _pixi.createRenderer = function(width, height, useCanvas) {
    if (useCanvas) {
      _pixi.renderer = new PIXI.CanvasRenderer(width, height);
    } else {
      _pixi.renderer = new PIXI.autoDetectRenderer(width, height, null, false, false);
    }

    document.body.appendChild(_pixi.renderer.view);
  }

  _pixi.draw = function() {
    _pixi.renderer.render(_pixi.stage);
  }

  _pixi.initialize = function(options) {
    options = js.defaults(options, {
      bgColor: 0x66ff99,
      useCanvas: false,
      width: 640,
      height: 480
    });

    _pixi.createStage(options.bgColor);
    _pixi.createRenderer(options.width, options.height, options.useCanvas);
  }

  var api = {};

  api.initialize = function(options) {
    _pixi.initialize(options);
  };

  api.addDisplayObject = function(displayObject)
  {
    _pixi.stage.addChild(displayObject);
  };

  api.draw = function(dt) {
    _pixi.draw();
  };

return api; }).call();
