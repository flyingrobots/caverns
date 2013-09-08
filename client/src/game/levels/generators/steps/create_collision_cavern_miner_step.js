var CreateCollisionCavernMinerStep = new Class({ Extends:CreateCollisionStep,

  options:
  {
    numIterations:100,
    minerSpawnPercent:8,
    numSegments:6,
    numStartingMinersPerSegment:1,
    minersStartInSegmentCenters:false,
  },

  validMoves:
  [
    {x:1,y:0},
    {x:-1,y:0},
    {x:0,y:1},
    {x:0,y:-1}
  ],

  initialize:function(options)
  {
    this.parent(options);
  },

  runInternal:function(data)
  {
    // Create initial miners
    var miners = [];

    var cellWidth = this.numTilesX/this.options.numSegments;
    var cellHeight = this.numTilesY/this.options.numSegments;

    for (var i = 0; i < this.options.numSegments; ++i)
    {
      var baseX =  i*cellWidth;
      for (var j = 0; j < this.options.numSegments; ++j)
      {
        var baseY = j*cellHeight;
        for (var k = 0; k < this.options.numStartingMinersPerSegment; ++k)
        {
          var minerX = this.options.minersStartInSegmentCenters ? Math.floor(baseX+cellWidth/2) : Math.floor(Math.random()*cellWidth+baseX);
          var minerY = this.options.minersStartInSegmentCenters ? Math.floor(baseY+cellHeight/2) : Math.floor(Math.random()*cellHeight+baseY);
          var miner = this.createMiner(minerX, minerY);
          miners.push(miner);
        }
      }
    }

    // Run miners
    var curIter = 0;
    while (curIter++ < this.options.numIterations)
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
        if (Math.random()*100 < this.options.minerSpawnPercent)
        {
          var newMiner = this.createMiner(miner.x, miner.y);
          miners.push(newMiner);
        }

        // Move in a random direction
        var move = this.validMoves[Math.floor(Math.random()*this.validMoves.length)];
        miner.x += move.x;
        miner.y += move.y;

        // Keep miner in bounds
        miner.x = Math.max(0, Math.min(miner.x, this.numTilesX-1));
        miner.y = Math.max(0, Math.min(miner.y, this.numTilesY-1));

        // Clear the current tile
        this.collisionMap[miner.x][miner.y] = 0;
      }
    }
  },

  createMinerAtRandomLocation:function()
  {
    return this.createMiner(Math.random()*this.numTilesX, Math.random()*this.numTilesY);
  },

  createMiner:function(x,y)
  {
    return {
      x:Math.floor(x),
      y:Math.floor(y)
    };
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
  }
});