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
    options = js.defaults(options, {
      bgColor: 0x66ff99,
      useCanvas: false,
      width: 640,
      height: 480
    });

    this.createStage(options.bgColor);
    this.createRenderer(options.width, options.height, options.useCanvas);
  }

  _pixi.createBoxSprite = function(options) {
    options = js.defaults(options, {
      wireframe: false,
      color: 0xff0000,
      width: 25,
      height: 25
    });

    var context = new PIXI.Graphics();
    
    if (!options.wireframe) {
      context.beginFill(options.color);
    }

    context.lineStyle(1, options.color, 1);
    var w = options.width;
    var h = options.height;
    context.moveTo(-w, h);
    context.lineTo(w, h);
    context.lineTo(w, -h);
    context.lineTo(-w, -h);
    context.lineTo(-w, h);

    if (!options.wireframe) {
      context.endFill();
    }

    return context;
  }

  var api = {}

  var _drawDebugSprites = false;
  var _debugSprites = [];

  api.initialize = function(options) {
    _pixi.initialize(options);
  }

  api.draw = function(dt) {
    _pixi.draw();
  }

  api.enableDebugSprites = function() {
    if (!_drawDebugSprites) {
      _debugSprites.forEach(function(sprite) {
        _pixi.stage.addChild(sprite);
      });
    }
    _drawDebugSprites = true;
  }

  api.disableDebugSprites = function() {
    if (_drawDebugSprites) {
      _debugSprites.forEach(function(sprite) {
        _pixi.stage.removeChild(sprite);
      });
    }
    _drawDebugSprites = false;
  }

  api.addDebugBox = function(options) {
    var sprite = _pixi.createBoxSprite(options);
    _debugSprites.push(sprite);
    return sprite;
  }

return api; }).call();
