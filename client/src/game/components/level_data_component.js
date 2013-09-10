var LevelDataComponent = new Class({Extends:Component,

  definition:null,

  get numTilesX()  { return definition.numTilesX; },
  get numTilesY() { return definition.numTilesY; },
  get tileWidth()  { return definition.tileWidth; },
  get tileHeight() { return definition.tileHeight; },

  initialize:function(definition)
  {
    this.definition = definition;
  }
});