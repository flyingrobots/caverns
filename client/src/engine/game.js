var game = (function()
{
  var _systems = {}
  
  var _systemsThatDoPreupdate = []
  var _systemsThatDoUpdate = []
  var _systemsThatDoPostUpdate = []

  var _isPaused = false;

  var api = {}

  api.systems = _systems;
  api.timeScale = 1.0;
  
  api.initialize = function(options) {
    js.defaults(options, {
      graphics: {}
    });

    Graphics.initialize(options.graphics);
  }

  api.addSystem = function(system, options) {
    js.defaults(options, {
      unpauseable: false
    });

    if (_systems[name]) {
      throw "Existing system with name " + name;
    }

    _systems.name = system;
    system.setup(this);

    if (js.isFunction(system.preUpdate)) {
      _systemsThatDoPreupdate.push(system);
    }

    if (js.isFunction(system.update)) {
      _systemsThatDoUpdate.push(system);
    }

    if (js.isFunction(system.postUpdate)) {
      _systemsThatDoPostUpdate.push(system);
    }
  }

  api.removeSystem = function(name) {
    if (!_systems[name]) {
      throw "Cannot find system with name " + name;
    }

    _systems[name].destroy();
    delete _systems[name];
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

  var _doPreUpdate = function(systems, dt) {
    systems.forEach(function(system) {
      system.preUpdate(dt);
    });
  }

  var _doUpdate = function(systems, dt) {
    systems.forEach(function(system) {
      system.update(dt);
    });
  }

  var _doPostUpdate = function(systems, dt) {
    systems.forEach(function(system) {
      system.postUpdate(dt);
    });
  }

  var _tickUnpauseableSystems = function(dt) {
    var unpauseableSystems = function(system) {
      return system.unpauseable;
    }
    _doPreUpdate(js.select(_systemsThatDoPreupdate, unpauseableSystems), dt);
    _doUpdate(js.select(_systemsThatDoUpdate, unpauseableSystems), dt);
    _doPostUpdate(js.select(_systemsThatDoPostUpdate, unpauseableSystems), dt);
  }

  var _tickAllSystems = function(dt) {
    _doPreUpdate(_systemsThatDoUpdate, dt);
    _doUpdate(_systemsThatDoUpdate, dt);
    _doPostUpdate(_systemsThatDoPostUpdate, dt);
  }

  api.tick = function(dt) {
    var timeStep = dt * this.timeScale;
    
    if (_isPaused) {
      _tickUnpauseableSystems(timeStep);
    } else {
      _tickAllSystems(timeStep);
    }

    Graphics.draw();
  }

  var _ticker = null;

  api.start = function() {
    var frequency = 1000.0 / 30.0;
    var gameLoop = function() {
      api.tick(frequency);
    }
    _ticker = window.setInterval(gameLoop, frequency);
  }

  api.stop = function() {
    window.clearInterval(_ticker);
  }

return api;
}).call();
