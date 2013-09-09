var game = (function()
{
  var _systems = [];
  var _world = null;
  
  var _systemsThatDoPreupdate = [];
  var _systemsThatDoUpdate = [];
  var _systemsThatDoPostUpdate = [];

  var _isPaused = false;
  var _ticker = null;

  var api = {}

  api.systems = _systems;
  api.world = null;
  api.timeScale = 1.0;

  var _updateEntitySystemMembership = function(entity)
  {
    _systems.each(function(system)
    {
      system.updateEntityMembership(entity);
    });
  };

  var _onEntityAdded = function(world, entity)
  {
    entity.componentAdded.add(_updateEntitySystemMembership);
    entity.componentRemoved.add(_updateEntitySystemMembership);
    _updateEntitySystemMembership(entity);
  };

  var _onEntityRemoved = function(world, entity)
  {
    console.log("")
    _updateEntitySystemMembership(entity);
    entity.componentAdded.remove(_updateEntitySystemMembership);
    entity.componentRemoved.remove(_updateEntitySystemMembership);
  };
  
  api.initialize = function(options) {
    options = js.defaults(options, {
      graphics: {}
    });

    Graphics.initialize(options.graphics);

    _world = new World(api);
    api.world = _world;
    _world.entityAdded.add(_onEntityAdded);
    _world.entityRemoved.add(_onEntityRemoved)
  }

  api.addSystem = function(system, options) {
    options = js.defaults(options, {
      unpauseable: false
    });

    _systems.push(system);
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

    // Add world entities to system
    _world.entities.each(function(entity)
    {
      system.updateEntityMembership(entity);
    });
  }

  api.removeSystem = function(system) {
    if (_systems.erase(system).length == 0)
    {
      throw "Cannot find system";
    }
    system.destroy();
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
