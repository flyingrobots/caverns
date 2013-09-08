var CreateCollisionCavernAutomataStep = new Class({ Extends:CreateCollisionStep,

  options:
  {
    numSplotches:20,
    minSplotchSizePercent:5,
    maxSplotchSizePercent:15,
    cellSize:2,
    numIterations:6,
    bornList:[6,7,8],
    surviveList:[3,4,5,6,7,8],
  },

  initialize:function(options)
  {
    this.parent(options);
  },

  runInternal:function(data)
  {
    // Start with a random map
    this.randomizeMap(this.collisionMap, this.options.cellSize);

    // Run generation automata
    CellularAutomata.applyAutomaton(this.collisionMap, this.options.bornList, this.options.surviveList, this.options.cellSize, this.options.numIterations);
  },

  randomizeMap:function(tiles, cellSize)
  {
    for (var x = 0; x < this.numTilesX; x += cellSize)
    {
      for (var y = 0; y < this.numTilesY; y += cellSize)
      {
        var filled = Math.random() > 0.5;
        if (x == 0 || x >= this.numTilesX-cellSize || y == 0 || y >= this.numTilesY-cellSize)
        {
          filled = true;
        }
        ArrayUtils.fillRect(tiles,x,y,cellSize,filled ? 1 : 0);
      }
    }

    for (var i = 0; i < this.options.numSplotches; ++i)
    {
      var splotchSizePercent = Math.random()*(this.options.maxSplotchSizePercent-this.options.minSplotchSizePercent)+this.options.minSplotchSizePercent;
      var splotchSize = Math.floor(splotchSizePercent*0.01*this.numTilesX);
      var x = Math.floor(Math.random()*(this.numTilesX-splotchSize));
      var y = Math.floor(Math.random()*(this.numTilesY-splotchSize));
      ArrayUtils.fillRect(tiles,x,y,splotchSize,splotchSize,1);
    }
  }
});