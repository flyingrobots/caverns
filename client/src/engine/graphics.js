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
    options = _.defaults(options, {
      bgColor: 0x66ff99,
      useCanvas: false,
      width: 640,
      height: 480
    });

    _pixi.createStage(options.bgColor);
    _pixi.createRenderer(options.width, options.height, options.useCanvas);
  }

  var _commonSpriteDefaults = function(options) {
    return js.defaults(options, {
      wireframe: false,
      color: 0xff0000
    });
  }

  var _createDebugSprite = function(options, drawCallback) {
    options = js.defaults(_commonSpriteDefaults(options));

    var context = new PIXI.Graphics();

    var outlineWeight = 1.0;
    var outlineAlpha = 1.0;
    context.lineStyle(outlineWeight, options.color, outlineAlpha);
    
    var fillAlpha = options.wireframe ? 0.3 : 1.0;
    context.beginFill(options.color, fillAlpha);

    drawCallback(context);
    
    context.endFill();

    return context;
  }

  _pixi.drawBoxSprite = function(width, height, options) {
    return _createDebugSprite(options, function(context) {
      var halfWidth = width / 2.0;
      var halfHeight = height / 2.0;
      context.drawRect(-halfWidth, -halfHeight, width, height);
      context.moveTo(0, 0);
      context.lineTo(halfWidth, 0);
    });
  }

  _pixi.drawCircleSprite = function(radius, options) {
    return _createDebugSprite(options, function(context) {
      context.drawCircle(0, 0, radius);
      context.moveTo(0,0);
      context.lineTo(0, radius);
    });
  }

  _pixi.removeSprite = function(sprite) {
    this.stage.removeChild(sprite);
  }

  var api = {}

  var _drawDebugSprites = false;
  var _debugSprites = [];

  var _transientDebugSprites = [];

  var _destroyAllTransientSprites = function() {
    _transientDebugSprites.forEach(function(sprite) {
      _pixi.removeSprite(sprite);
    });
  }

  api.initialize = function(options) {
    _pixi.initialize(options);
  };

  api.addDisplayObject = function(displayObject)
  {
    _pixi.stage.addChild(displayObject);
  };

  api.draw = function(dt) {
    _pixi.draw();
    _destroyAllTransientSprites();
  };

  api.enableDebugSprites = function() {
    if (!_drawDebugSprites) {
      _debugSprites.forEach(function(sprite) {
        api.addDisplayObject(sprite);
      });
    }
    _drawDebugSprites = true;
  }

  api.disableDebugSprites = function() {
    if (_drawDebugSprites) {
      _debugSprites.forEach(function(sprite) {
        _pixi.removeSprite(sprite);
      });
    }
    _drawDebugSprites = false;
  }

  var _addDebugSprite = function(options, spriteCallback) {
    options = js.defaults(options, {
      transient: true
    });
    var sprite = spriteCallback();
    api.addDisplayObject(sprite);
    if (options.transient) {
      _transientDebugSprites.push(sprite);
    } else {
      _debugSprites.push(sprite);
    }
    return sprite;
  }

  api.addDebugBox = function(width, height, options) {
    return _addDebugSprite(options, function() {
      return _pixi.drawBoxSprite(width, height, options)
    });
  }

  api.addDebugCircle = function(radius, options) {
    return _addDebugSprite(options, function() {
      return _pixi.drawCircleSprite(radius, options)
    });
  }

return api; }).call();
