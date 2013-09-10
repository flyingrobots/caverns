var SystemRegistry = (function()
{
  var _systems = [];
  var _systemsToUpdate = [];

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
      unpauseable: false,
      priority:0
    });

    system.unpauseable = options.unpauseable;
    system.priority = options.priority;

    Array.insertWhen(_systems, system, function(item, compare) {
      return item.priority < compare.priority;
    });
    system.setup(Game);

    if (js.isFunction(system.update))
    {
      _systemsToUpdate.push(system);
    }

    // Add world entities to system
    Game.world.entities.each(function(entity)
    {
      system.updateEntityMembership(entity);
    });
  }

  api.removeSystem = function(system) {
    if (_systems.erase(system).length == 0)
    {
      throw "Cannot find system";
    }
    _systemsToUpdate.erase(system);
    system.destroy();
  }

  var _tickUnpauseableSystems = function(dt) {
    Array.each(Array.filter(_systemsToUpdate, function(system){return system.unpauseable}), function(system) {
      system.update(dt);
    });
  }

  var _tickAllSystems = function(dt) {
    Array.each(_systemsToUpdate, function(system) {
      system.update(dt);
    });
  }

  api.tick = function(dt, isPaused) {
    if (isPaused) {
      _tickUnpauseableSystems(dt);
    } else {
      _tickAllSystems(dt);
    }
  }

return api;}).call();
