var CavernGeneratorAutomata = new Class({
  Extends:CavernGenerator,

  cavernGeneratorAutomataDefaultOptions:
  {
    generateNumSplotches:20,
    generateMinSplotchSizePercent:5,
    generateMaxSplotchSizePercent:15,
    generateCellSize:2,
    generateNumIterations:6,
    generateBornList:[6,7,8],
    generateSurviveList:[3,4,5,6,7,8],
    smoothCellSize:1,
    smoothNumIterations:2,
    smoothBornList:[5,6,7,8],
    smoothSurviveList:[5,6,7,8]
  },

  initialize:function(options)
  {
    this.parent(options);
    this.setOptions(Object.merge(this.cavernGeneratorAutomataDefaultOptions, options));
  },

  generateInternal:function()
  {
    // Start with a random map
    this.randomizeMap(this.options.generateCellSize);
    
    // Generate map
    this.applyAutomaton(this.tiles,this.options.generateBornList,this.options.generateSurviveList,this.options.generateCellSize,this.options.generateNumIterations);

    // Smooth map
    this.applyAutomaton(this.tiles,this.options.smoothBornList,this.options.smoothSurviveList,this.options.smoothCellSize,this.options.smoothNumIterations);
  },

  randomizeMap:function(cellSize)
  {
    for (var x = 0; x < this.width; x += cellSize)
    {
      for (var y = 0; y < this.height; y += cellSize)
      {
        var filled = Math.random() > 0.5;
        if (x == 0 || x >= this.width-cellSize || y == 0 || y >= this.height-cellSize)
        {
          filled = true;
        }
        this.fillRect(this.tiles,x,y,cellSize,filled ? TILE_TYPE_FILLED : TILE_TYPE_CLEAR);
      }
    }

    for (var i = 0; i < this.options.generateNumSplotches; ++i)
    {
      var splotchSizePercent = Math.random()*(this.options.generateMaxSplotchSizePercent-this.options.generateMinSplotchSizePercent)+this.options.generateMinSplotchSizePercent;
      var splotchSize = Math.floor(splotchSizePercent*0.01*this.width);
      var x = Math.floor(Math.random()*(this.width-splotchSize));
      var y = Math.floor(Math.random()*(this.height-splotchSize));
      this.fillRect(this.tiles,x,y,splotchSize,splotchSize,TILE_TYPE_FILLED);
    }
  }
});