(function(){
  
  this.World = function(game)
  {
    this.initialize(game);
  };

  World.prototype = {

    initialize:function(game)
    {
      this.game = game;
      this.entities = [];
      this.entityDefs = {};
      this.entityAdded = new signals.Signal();
      this.entityRemoved = new signals.Signal();
    },

    addEntityDefinitions:function(entityDefs)
    {
      this.entityDefs.extend(entityDefs);
    },

    createEntity:function(entityName)
    {
      var entityDefJSON = this.entityDefs[entityName];
      if (!entityDefJSON)
      {
        throw "Cannot find entity def with name: "+entityName;
      }
      return TypedJSON.parse(JSON.encode(entityDefJSON));
    },

    addEntity:function(entity)
    {
      this.entities.push(entity);
      entity.setup(this.game);
      this.entityAdded.dispatch(this, entity);
      return entity;
    },

    findEntityById:function(id)
    {
      return findEntity(function(entity){return entity.id==id});
    },

    findEntityByName:function(name)
    {
      return findEntity(function(entity){return entity.name==name});
    },

    findEntity:function(predicate)
    {
      for (var i = 0; i < this.entities.length; ++i)
      {
        var entity = this.entities[i];
        if (predicate(entity))
        {
          return entity;
        }
      }
    },

    findEntities:function(predicate)
    {
      var results = [];
      for (var i = 0; i < this.entities.length; ++i)
      {
        var entity = this.entities[i];
        if (predicate(entity))
        {
          results.push(entity);
        }
      }
      return results;
    },

    removeEntity:function(entity)
    {
      var idx = this.entities.indexOf(entity);
      if (idx == -1)
      {
        throw "Cannot find entity with id "+entity.id;
      }
      entity.destroy();
      this.entities.splice(idx,1);
      this.entityRemoved.dispatch(this, entity);
      return entity;
    },

    removeAllEntities:function()
    {
      while(this.entities.length)
      {
        removeEntity(this.entities[0]);
      }
    },

    destroy:function()
    {
      this.removeAllEntities();
    }
  };
})();
