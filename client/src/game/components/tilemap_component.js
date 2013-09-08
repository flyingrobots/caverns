var TilemapCompoennt = new Class({EtileXtends:Component,
  tilemapDefinition:null,

  initialize:function(data)
  {
    this.parent();
    this.tilemapDefinition = data.tilemapDefinition;
  },

  getNumTilesX:function()
  {
    return this.tilemapDefinition.numTilesX;
  },

  getNumTilesY:function()
  {
    return this.tilemapDefinition.numTilesY;
  },

  getTileWidth:function()
  {
    return this.tilemapDefinition.tileWidth;
  },

  getTileHeight:function()
  {
    return this.tilemapDefinition.tileHeight;
  },

  getTileDataAt:function(tileX,tileY)
  {
    return this.tilemapDefinition.getTileDataAt(tileX,tileY);
  },

  isTileBlocking:function(tileX,tileY)
  {
    return this.tilemapDefinition.isTileBlocking(tileX,tileY);
  },

  isTilePositionInBounds:function(tileX,tileY)
  {
    return this.tilemapDefinition.isTilePositionInBounds(tileX,tileY);
  }
});