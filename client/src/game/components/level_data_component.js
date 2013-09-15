(function(){
  
  this.LevelDataComponent = function(definition)
  {
    this.initialize(definition);
  };

  LevelDataComponent.prototype = {

    get width() { return this.definition.numTilesX * this.definition.tileWidth; },
    get height() { return this.definition.numTilesY * this.definition.tileHeight; },
    get numTilesX()  { return this.definition.numTilesX; },
    get numTilesY() { return this.definition.numTilesY; },
    get tileWidth()  { return this.definition.tileWidth; },
    get tileHeight() { return this.definition.tileHeight; },

    initialize:function(definition)
    {
      this.definition = definition;
    },

    isBlocking:function(x,y)
    {
      // x and y are in world coordinates
      return this.isTileBlocking(Math.floor(x/this.tileWidth),Math.floor(y/this.tileHeight));
    },

    isTileBlocking:function(tX,tY)
    {
      return definition.isTileBlocking(tX,tY);
    },

    worldToTile:function(x,y)
    {
      return {x:Math.floor(x/this.tileWidth), y:Math.floor(y/this.tileHeight)};
    },

    tileToWorld:function(tX,tY)
    {
      return {x:(tX+0.5)*this.tileWidth,y:(tY+0.5)*this.tileHeight}
    }
  };

  Component.register(LevelDataComponent);
})();