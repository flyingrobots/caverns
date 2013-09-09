var SystemRegistry = (function()
{
  var _systems = [];
  
  var _systemsThatDoPreupdate = [];
  var _systemsThatDoUpdate = [];
  var _systemsThatDoPostUpdate = [];

  var api = {}

  api.systems = _systems;

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
  
  api.initialize = function(world) {
    world.entityAdded.add(_onEntityAdded);
    world.entityRemoved.add(_onEntityRemoved)
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

  api.tick = function(dt, isPaused) {
    if (isPaused) {
      _tickUnpauseableSystems(dt);
    } else {
      _tickAllSystems(dt);
    }
  }

return api;}).call();
