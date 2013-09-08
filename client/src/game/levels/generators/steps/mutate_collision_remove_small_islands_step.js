var MutateCollisionRemoveSmallIslandsStep = new Class({ Extends:MutateCollisionStep,
  options:
  {
    minIslandSize:5
  },

  islands:null,
  islandIds:null,

  initialize:function(options)
  {
    this.parent(options);
  },

  runInternal:function(data)
  {
    //TODO This step could be optimized!
    while(this.cleanLonelyTiles());
    this.cleanSmallIslands();
  },

  cleanLonelyTiles:function()
  {
    var numCleared = 0;

    //Find and destroy all tiles with less than 3 adjacencies
    for (var x = 0; x < this.numTilesX; ++x)
    {
      for (var y = 0; y < this.numTilesY; ++y)
      {
        if (!this.isTileFilled(x,y))
        {
          continue;
        }
        if (ArrayUtils.getNumAdjacent2D(this.collisionMap,x,y,1,1,true) < 3 || ArrayUtils.getNumAdjacent2D(this.collisionMap,x,y,1,1,false) < 2)
        {
          this.collisionMap[x][y] = 0;
          numCleared++;
        }
      }
    }
    return numCleared;
  },

  cleanSmallIslands:function()
  {
    // Build island map
    this.islands = [];
    this.islandIds = ArrayUtils.createArray2D(this.numTilesX, this.numTilesY, undefined);
    this.buildIslandMap();

    //Destroy islands that are too small
    for (var i = 0; i < this.islands.length; ++i)
    {
      var island = this.islands[i];
      if (island.length < this.options.minIslandSize)
      {
        this.destroyIsland(island);
      }
    }
  },

  buildIslandMap:function()
  {
    for (var x = 0; x < this.numTilesX; ++x)
    {
      for (var y = 0; y < this.numTilesY; ++y)
      {
        if (this.collisionMap[x][y] == 0 || this.islandIds[x][y] != undefined)
        {
          continue;
        }
        var island = [];
        this.addToIsland(x, y, this.islands.length, island);
        this.islands.push(island);
      }
    }
  },

  addToIsland:function(x,y,islandId,island)
  {
    var firstTile = {x:x,y:y};
    var tilesToConsider = [firstTile];

    while (tilesToConsider.length > 0)
    {
      var tile = tilesToConsider.splice(0,1)[0];
      var y = tile.y;
      var left = tile.x;
      var right = tile.x;
      while (this.isViableIslandLocation(left,y)) { left-=1; }
      while (this.isViableIslandLocation(right,y)) { right+=1; }
      for (var i=left+1; i < right; ++i)
      {
        this.islandIds[i][y] = islandId;
        island.push({x:i,y:y});
        if (this.isViableIslandLocation(i,y-1)) { tilesToConsider.push({x:i,y:y-1}); }
        if (this.isViableIslandLocation(i,y+1)) { tilesToConsider.push({x:i,y:y+1}); }
      }
    }
  },

  isViableIslandLocation:function(x,y)
  {
    return this.isTileFilled(x,y) && this.islandIds[x][y] == undefined;
  },

  destroyIsland:function(island)
  {
    for (var i = 0; i < island.length; ++i)
    {
      var tile = island[i];
      this.collisionMap[tile.x][tile.y] = 0;
    }
  }
});