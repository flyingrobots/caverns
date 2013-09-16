(function(){
  
  this.MutateTilemapAddTileFluidStreamsStep = function(options)
  {
    this.initialize(options);
  };

  _.extend(MutateTilemapAddTileFluidStreamsStep.prototype, new MutateTilemapStep(), {
    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        numStreams:4,
        tileId:null
      });
    },

    runInternal:function(data)
    {
      assert(data.tilemapDefinition.collisionMap != null, "Must have collision map");

      this.collisionMap = data.tilemapDefinition.collisionMap;

      // Add streams
      for (var i = 0; i < this.options.numStreams; ++i)
      {
        this.addRandomStream();
      }
    },

    addRandomStream:function()
    {
      // Get a random tile
      var tile = {x:0,y:0};
      var attempts = 0;
      const maxAttempts = 1000;
      do
      {
        tile.x = Math.floor(Math.random()*this.numTilesX);
        tile.y = Math.floor(Math.random()*this.numTilesY);
      } while(this.collisionMap[tile.x][tile.y] == 1 && attempts++ < maxAttempts);
      if (attempts >= maxAttempts)
      {
        return;
      }

      // Move up until we find the ceiling
      while (tile.y-1 >= 0 && this.collisionMap[tile.x][tile.y-1] == 0) { tile.y -= 1; }

      // Start the stream flow
      var streamCreators = [tile];
      while (streamCreators.length > 0)
      {
        var tile = streamCreators.splice(0,1)[0];
        this.tilemap.setTile(tile.x, tile.y, this.options.tileId);

        // Can the flow move down?
        if (this.isViableWaterLocation(tile.x,tile.y+1))
        {
          streamCreators.push({x:tile.x,y:tile.y+1});
          continue;
        }

        // If the thing below us is filled, move left and right
        if (this.isTileFilled(tile.x, tile.y+1))
        {
          if (this.isViableWaterLocation(tile.x-1,tile.y))
          {
            streamCreators.push({x:tile.x-1,y:tile.y});
          }
          if (this.isViableWaterLocation(tile.x+1,tile.y))
          {
            streamCreators.push({x:tile.x+1,y:tile.y});
          }
        }
      }
    },

    isViableWaterLocation:function(x,y)
    {
      return ArrayUtils.isInBounds2D(this.collisionMap, x, y) && this.tilemap.tiles[x][y] == null;
    },

    isTileFilled:function(x,y)
    {
      return ArrayUtils.isInBounds2D(this.collisionMap,x,y) && this.collisionMap[x][y] == 1;
    }
  });
})();