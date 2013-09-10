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

  var _commonSpriteDefaults = function(options) {
    return js.defaults(options, {
      wireframe: false,
      color: 0xff0000
    });
  }

  var _createDebugSprite = function(options, drawCallback) {
    options = js.defaults(_commonSpriteDefaults(options));

    var context = new PIXI.Graphics();
    
    var fillAlpha = 1.0;
    

    if (options.wireframe) {
      fillAlpha = 0.3;
    }

    context.beginFill(options.color, fillAlpha);

    var outlineWeight = 1.0;
    var outlineAlpha = 1.0;
    context.lineStyle(outlineWeight, options.color, outlineAlpha);

    drawCallback(context);
    
    context.endFill();

    return context;
  }

  _pixi.createBoxSprite = function(options) {
    return _createDebugSprite(
      js.defaults(options, {
        width: 25,
        height: 25
      }),
      function(context) {
        var halfWidth = options.width / 2.0;
        var halfHeight = options.height / 2.0;
        context.drawRect(-halfWidth, -halfHeight, options.width, options.height);
        context.moveTo(0, 0);
        context.lineTo(halfWidth, 0);
      }
    );
  }

  _pixi.createCircleSprite = function(options) {
    return _createDebugSprite(
      js.defaults(options, {
        radius: 3.14
      }),
      function(context) {
        context.drawCircle(0, 0, options.radius);
        context.moveTo(0,0);
        context.lineTo(0, options.radius);
      }
    );
  }

  var api = {}

  var _drawDebugSprites = false;
  var _debugSprites = [];

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
    _debugSprites.push(_pixi.createBoxSprite(options));
    return js.last(_debugSprites);
  }

  api.addDebugCircle = function(options) {
    _debugSprites.push(_pixi.createCircleSprite(options));
    return js.last(_debugSprites);
  }

return api; }).call();
