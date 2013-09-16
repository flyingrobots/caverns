(function(){
  
  this.MutateTilemapCollisionToTileStep = function(options)
  {
    this.initialize(options);
  };

  _.extend(MutateTilemapCollisionToTileStep.prototype, new MutateTilemapStep(), {

    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        tileId:"tile_rock"
      });
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
})();