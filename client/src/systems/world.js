var World = new Class({ Extends:System,

  entities:[],
  game:null,

  initialize:function()
  {
    this.super();
  },

  setup:function(game)
  {
    this.parent(game);
  },

  addEntity:function(entity)
  {
    this.entities.push(entity);
    entity.setup(this.game);
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
    this.parent();
  }
});