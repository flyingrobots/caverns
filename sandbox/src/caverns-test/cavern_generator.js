var CavernGenerator = new Class({
	
	initialize:function(width, height)
	{
		this.width = width || 100;
		this.height = height || 100;
    this.tiles = [];
    this.minIslandSize = 5;
    this.validMoves = [
      {x:1,y:0},
      {x:-1,y:0},
      {x:0,y:1},
      {x:0,y:-1}
    ];
    this.islands = [];
    this.lowestPoint = 0;
    this.lavaHeight = 10;
    this.numWaterfalls = 4;
	},

	generate:function(numIterations)
	{
    numIterations = numIterations || 500

    // Create filled tile map
    this.tiles = [];
    this.lowestPoint = 0;
		for (var y = 0; y <= this.height; ++y)
		{
			var row = [];
			for (var x = 0; x <= this.width; ++x)
			{
				row.push({type:TILE_TYPE_FILLED, islandId:undefined});
			}
			this.tiles.push(row);
		}

    // Run miners
    const minerSpawnPercent = 8;

    var firstMiner = this.createMiner(this.width/2, this.height/2);
    var miners = [firstMiner];

    var curIter = 0;
    while (curIter++ < numIterations)
    {
      for (var i = 0; i < miners.length; ++i)
      {
        var miner = miners[i];

        // Kill orphaned miners
        if (miners.length > 1 && this.isMinerOrphaned(miner))
        {
          miners.splice(i--, 1);
          continue;
        }

        // Spawn a new miner?
        if (Math.random()*100 < minerSpawnPercent)
        {
          var newMiner = this.createMiner(miner.x, miner.y);
          miners.push(newMiner);
        }

        // Move in a random direction
        var move = this.validMoves[Math.floor(Math.random()*this.validMoves.length)];
        miner.x += move.x;
        miner.y += move.y;

        // Keep miner in bounds
        miner.x = Math.max(0, Math.min(miner.x, this.width-1));
        miner.y = Math.max(0, Math.min(miner.y, this.height-1));

        // Clear the current tile
        this.digTile(miner.x,miner.y);
      }
    }

    // Clean the tile map
    this.cleanMap();

    // Add lava to the map
    this.addLavaToMap();

    // Add water to the map
    this.addWaterToMap();

    // Build final tile map
    var tileMap = [];
    for (var y = 0; y <= this.height; ++y)
    {
      var row = [];
      for (var x = 0; x <= this.width; ++x)
      {
        row.push(this.tiles[y][x].type);
      }
      tileMap.push(row);
    }

    // Build definition
    var cavernDef = {
      width:this.width,
      height:this.height,
      tiles:tileMap
    };
		return cavernDef;
	},

  digTile:function(x,y)
  {
    this.tiles[x][y].type = TILE_TYPE_CLEAR;
    if (y > this.lowestPoint)
    {
      this.lowestPoint = y;
    }
  },

  addLavaToMap:function()
  {
    // Add basin lava
    for (var y = this.lowestPoint; y >= this.lowestPoint - this.lavaHeight && y >= 0; --y)
    {
      for (var x = 0; x < this.width; ++x)
      {
        var tile = this.tiles[x][y];
        if (tile.type == TILE_TYPE_CLEAR)
        {
          tile.type = TILE_TYPE_LAVA;
        }
      }
    }
  },


  addWaterToMap:function()
  {
    // Add waterfalls
    for (var i = 0; i < this.numWaterfalls; ++i)
    {
      this.addRandomWaterfall();
    }
  },

  addRandomWaterfall:function()
  {
    // Get a random tile
    var tile = {x:0,y:0}
    do
    {
      tile.x = Math.floor(Math.random()*this.width);
      tile.y = Math.floor(Math.random()*this.height);
    } while(this.tiles[tile.x][tile.y].type != TILE_TYPE_CLEAR);

    // Move up until we find the ceiling
    while (tile.y-1 >= 0 && this.tiles[tile.x][tile.y-1].type == TILE_TYPE_CLEAR) { tile.y -= 1; }

    // Start the water flow
    var waterCreators = [tile];
    while (waterCreators.length > 0)
    {
      var tile = waterCreators.splice(0,1)[0];
      this.tiles[tile.x][tile.y].type = TILE_TYPE_WATER;

      // Can the flow move down?
      if (this.isViableWaterLocation(tile.x,tile.y+1))
      {
        waterCreators.push({x:tile.x,y:tile.y+1});
        continue;
      }

      // If the thing below us is filled, move left and right
      if (this.isTileFilled(tile.x, tile.y+1))
      {
        if (this.isViableWaterLocation(tile.x-1,tile.y))
        {
          waterCreators.push({x:tile.x-1,y:tile.y});
        }
        if (this.isViableWaterLocation(tile.x+1,tile.y))
        {
          waterCreators.push({x:tile.x+1,y:tile.y});
        }
      }
    }
  },

  isViableWaterLocation:function(x,y)
  {
    return this.isOnMap(x, y) && this.tiles[x][y].type == TILE_TYPE_CLEAR
  },

  cleanMap:function()
  {
    //TODO This step could be optimized!
    while(this.cleanLonelyTiles());
    this.cleanSmallIslands();
  },

  cleanSmallIslands:function()
  {
    // Build island map
    this.islands = [];
    this.buildIslandMap();

    //Destroy islands that are too small
    for (var i = 0; i < this.islands.length; ++i)
    {
      var island = this.islands[i];
      if (island.length < this.minIslandSize)
      {
        this.destroyIsland(island);
      }
    }
  },

  buildIslandMap:function()
  {
    for (var y = 0; y <= this.height; ++y)
    {
      for (var x = 0; x <= this.width; ++x)
      {
        var tile = this.tiles[x][y];
        if (tile.type != TILE_TYPE_FILLED || tile.islandId != undefined)
        {
          continue;
        }
        var island = [];
        this.addToIsland(x,y,this.islands.length, island);
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
        var islandTile = this.tiles[i][y];
        islandTile.islandId = islandId;
        island.push({x:i,y:y});
        if (this.isViableIslandLocation(i,y-1)) { tilesToConsider.push({x:i,y:y-1}); }
        if (this.isViableIslandLocation(i,y+1)) { tilesToConsider.push({x:i,y:y+1}); }
      }
    }
  },

  isViableIslandLocation:function(x,y)
  {
    return this.isTileFilled(x,y) && this.tiles[x][y].islandId == undefined;
  },

  destroyIsland:function(island)
  {
    for (var i = 0; i < island.length; ++i)
    {
      var tile = island[i];
      this.digTile(tile.x,tile.y);
    }
  },

  cleanLonelyTiles:function()
  {
    var numCleared = 0;

    //Find and destroy all tiles with less than 3 adjacencies
    for (var y = 0; y <= this.height; ++y)
    {
      for (var x = 0; x <= this.width; ++x)
      {
        if (!this.isTileFilled(x,y))
        {
          continue;
        }
        var tile = this.tiles[x][y];
        if (this.getNumAdjacencies(x,y,true) < 3 || this.getNumAdjacencies(x,y,false) < 2)
        {
          this.digTile(x,y);
          numCleared++;
        }
      }
    }
    return numCleared;
  },

  getNumAdjacencies:function(baseX,baseY,allowDiagonals)
  {
    var count = 0;
    for (var x = -1; x <= 1; ++x)
    {
      for (var y = -1; y <= 1; ++y)
      {
        if (x == 0 && y == 0)
        {
          continue;
        }
        if (!allowDiagonals && x != 0 && y != 0)
        {
          continue;
        }
        if (this.isTileFilled(baseX+x, baseY+y))
        {
          count++;
        }
      }
    }
    return count;
  },

  isMinerOrphaned:function(miner)
  {
    for (var x = -1; x <= 1; ++x)
    {
      for (var y = -1; y <= 1; ++y)
      {
        if (x == 0 && y == 0)
        {
          continue;
        }
        if (this.isTileFilled(miner.x+x, miner.y+y))
        {
          return false;
        }
      }
    }
    return true;
  },

  getAdjacentTiles:function(baseX,baseY)
  {
    var adjacents = [];
    for (var x = -1; x <= 1; ++x)
    {
      for (var y = -1; y <= 1; ++y)
      {
        if (x == 0 && y == 0)
        {
          continue;
        }
        if (this.isTileFilled(baseX+x, baseY+y))
        {
          adjacents.push({x:baseX+x,y:baseY+y});
        }
      }
    }
    return adjacents;
  },

  isOnMap:function(x,y)
  {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  },

  isTileFilled:function(x,y)
  {
    return this.isOnMap(x,y) && this.tiles[x][y].type == TILE_TYPE_FILLED;
  },

  createMinerAtRandomLocation:function()
  {
    return this.createMiner(Math.random()*this.width, Math.random()*this.height);
  },

  createMiner:function(x,y)
  {
    return {
      x:Math.floor(x),
      y:Math.floor(y)
    };
  }
});