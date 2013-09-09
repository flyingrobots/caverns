var Game = (function()
{
  var _isPaused = false;
  var _ticker = null;

  var api = {}

  api.timeScale = 1.0;
  
  api.initialize = function(options) {
    options = js.defaults(options, {
      graphics: {}
    });

    this.world = new World(api);

    Graphics.initialize(options.graphics);
    SystemRegistry.initialize(this.world);

    this.stateMachine = new StateMachine();
  }

  api.pause = function() {
    _isPaused = true;
  }

  api.resume = function() {
    _isPaused = false;
  }

  api.isPaused = function() {
    return _isPaused;
  }

  api.tick = function(dt) {
    var timeStep = dt * this.timeScale;
    SystemRegistry.tick(timeStep);
    Graphics.draw();
  }

  var _startGameLoop = function () {
    var frequency = 1000.0 / 30.0;
    var gameLoop = function() {
      api.tick(frequency);
    }
    _ticker = window.setInterval(gameLoop, frequency);
  }

  api.start = function() {
    _startGameLoop();

    // TODO create a state that does this and use the StateMachine...
    // but for now, I just want to see stuff on the screen...

    var boxOptions = {
      color: js.randomColor(),
      width: js.randomNumber(10, 100),
      height: js.randomNumber(10, 100),
      x: js.randomNumber(0, document.width),
      y: js.randomNumber(0, document.height)
    };

    var box = Graphics.addDebugBox(boxOptions);
    box.position.x = boxOptions.x;
    box.position.y = boxOptions.y;

    Graphics.enableDebugSprites();
  }

  api.stop = function() {
    window.clearInterval(_ticker);
  }

return api;}).call();
