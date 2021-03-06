(function(){
  
  this.MutateTilemapFillEmptyTilesFromBottomStep = function(options)
  {
    this.initialize(options);
  };

  _.extend(MutateTilemapFillEmptyTilesFromBottomStep.prototype, new MutateTilemapStep(), {
    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        fillHeight:10,
        tileId:null
      });
      this.lowestPoint = 0;
    },
    runInternal:function(data)
    {
      assert(data.tilemapDefinition.collisionMap != null, "Must have collision map");

      this.collisionMap = data.tilemapDefinition.collisionMap;
      
      // Find the lowest point
      this.findLowestPoint();

      // Add lava flows
      for (var y = this.lowestPoint; y >= this.lowestPoint - this.options.fillHeight && y >= 0; --y)
      {
        for (var x = 0; x < this.numTilesY; ++x)
        {
          if (this.collisionMap[x][y] == 0)
          {
            this.tilemap.setTile(x,y,this.options.tileId);
          }
        }
      }

      data.lowestPoint = this.lowestPoint;
    },

    findLowestPoint:function()
    {
      this.lowestPoint = 0;
      for (var y = this.numTilesX-1; y >= 0; --y)
      {
        for (var x = 0; x < this.numTilesY; ++x)
        {
          if (this.collisionMap[x][y] == 0)
          {
            this.lowestPoint = y;
            return;
          }
        }
      }
    } 
  });
})();