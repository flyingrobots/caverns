var CavernGenerator = new Class({
	
	initialize:function(width, height)
	{
		this.width = width || 100;
		this.height = height || 100;
    this.tiles = [];
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
				row.push(1);
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
        miner.x += Math.floor(Math.random()*3)-1;
        miner.y += Math.floor(Math.random()*3)-1;

        // Keep miner in bounds
        miner.x = Math.max(0, Math.min(miner.x, this.width-1));
        miner.y = Math.max(0, Math.min(miner.y, this.height-1));

        // Clear the current tile
        this.tiles[miner.x][miner.y] = 0;
      }
    }

    // Build definition
    var cavernDef = {
      width:this.width,
      height:this.height,
      tiles:this.tiles
    };
		return cavernDef;
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

  isTileFilled:function(x,y)
  {
    return x >= 0 && x < this.width && y >= 0 && y < this.height && this.tiles[x][y] == 1;
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