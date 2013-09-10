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

  api.start = function() {
    var frequency = 30.0/1000.0;
    var gameLoop = function() {
      api.tick(frequency);
    }
    _ticker = window.setInterval(gameLoop, frequency);
  }

  api.stop = function() {
    window.clearInterval(_ticker);
  }

return api;}).call();
