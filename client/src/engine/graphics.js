var Graphics = (function() 
{
  var _pixi = {}
  
  _pixi.createStage = function(bgColor) {
    this.stage = new PIXI.Stage(bgColor);
  }

  _pixi.createRenderer = function(width, height, useCanvas) {
    if (useCanvas) {
      this.renderer = new PIXI.CanvasRenderer(width, height);
    } else {
      this.renderer = new PIXI.autoDetectRenderer(width, height, null, false, false);
    }

    document.body.appendChild(this.renderer.view);
  }

  _pixi.draw = function() {
    this.renderer.render(this.stage);
  }

  _pixi.initialize = function(options) {
    js.defaults(options, {
      bgColor: 0x66ff99,
      useCanvas: false,
      width: 640,
      height: 480
    });

    this.createStage(options.bgColor);
    this.createRenderer(options.width, options.height, options.useCanvas);
  }

  var api = {}

  api.initialize = function(options) {
    _pixi.initialize(options);
  }

  api.draw = function(dt) {
    _pixi.draw();
  }

return api; }).call();
