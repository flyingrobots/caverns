var MutateTilemapCollisionToTileStep = new Class({ Extends:MutateTilemapStep,
  options:{
    tileId:"tile_rock"
  },

  initialize:function(options)
  {
    this.parent(options);
  }, 

  runInternal:function(data)
  {
    var collisionMap = data.tilemapDefinition.collisionMap;

    for (var i = 0; i < this.tilemap.numTilesX; ++i)
    {
      for (var j = 0; j < this.tilemap.numTilesY; ++j)
      {
        if (collisionMap[i][j] == 1)
        {
          this.tilemap.setTile(i,j,this.options.tileId);
        }
      }
    }
  }
});
