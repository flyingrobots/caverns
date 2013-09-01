var CavernGenerator = new Class({
	
	initialize:function(width, height)
	{
		this.width = width || 100;
		this.height = height || 100;
    this.tiles = [];
    this.minIslandSize = 3;
    this.validMoves = [
      {x:1,y:0},
      {x:-1,y:0},
      {x:0,y:1},
      {x:0,y:-1}
    ];
    this.islands = [];
	},

	generate:function()
	{
    // Create filled tile map
    this.tiles = [];
		for (var y = 0; y <= this.height; ++y)
		{
			var row = [];
			for (var x = 0; x <= this.width; ++x)
			{
				row.push({filled:true, islandId:undefined});
			}
			this.tiles.push(row);
		}

    // Run miners
    const numIterations = 500;
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
        this.tiles[miner.x][miner.y].filled = false;
      }
    }

    // Clean the tile map
    this.cleanMap();

    // Build final tile map
    var tileMap = [];
    for (var y = 0; y <= this.height; ++y)
    {
      var row = [];
      for (var x = 0; x <= this.width; ++x)
      {
        row.push(this.tiles[x][y].filled ? 1 : 0);
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

  cleanMap:function()
  {
    // Build island map
    this.islands = [];
    this.buildIslandMap();

    console.log("Num islands tagged : ",this.islands.length);

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
    var tiles = this.tiles;
    for (var y = 0; y <= this.height; ++y)
    {
      var row = this.tiles[y];
      for (var x = 0; x <= this.width; ++x)
      {
        var tile = this.tiles[x][y];
        if (!tile.filled || tile.islandId != undefined)
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
      while (this.isOnMap(left,y) && this.tiles[left][y].filled && this.tiles[left][y].islandId == undefined) { left-=1; }
      while (this.isOnMap(right,y) && this.tiles[right][y].filled && this.tiles[right][y].islandId == undefined) { right+=1; }
      for (var i=left+1; i < right; ++i)
      {
        var islandTile = this.tiles[i][y];
        islandTile.islandId = islandId;
        island.push({x:i,y:y});
        if (this.isOnMap(i,y-1) && this.tiles[i][y-1].filled && this.tiles[i][y-1].islandId == undefined) { tilesToConsider.push({x:i,y:y-1}); }
        if (this.isOnMap(i,y+1) && this.tiles[i][y+1].filled && this.tiles[i][y+1].islandId == undefined) { tilesToConsider.push({x:i,y:y+1}); }
      }
    }
  },

  destroyIsland:function(island)
  {
    for (var i = 0; i < island.length; ++i)
    {
      var tile = island[i];
      this.tiles[tile.x][tile.y].filled = false;
    }
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
    return this.isOnMap(x,y) && this.tiles[x][y].filled == true;
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