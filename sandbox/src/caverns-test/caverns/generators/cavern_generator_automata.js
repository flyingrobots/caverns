var CavernGeneratorAutomata = new Class({
  Extends:CavernGenerator,

  cavernGeneratorAutomataDefaultOptions:
  {
    numIterations:1
  },

  initialize:function(options)
  {
    this.parent(options);
    this.setOptions(Object.merge(this.cavernGeneratorAutomataDefaultOptions, options));
  },

  generateInternal:function()
  {
    // Start with enclosed noise
    for (var x = 0; x < this.width; ++x)
    {
      for (var y = 0; y < this.height; ++y)
      {
        if (x > 0 && x < this.width-1 && y > 0 && y < this.height-1 && Math.random() > 0.5)
        {
          this.digTile(x,y);
        }
      }
    }
    
    // Run automata functions on tiles
    for (var i = 0; i < this.options.numIterations; ++i)
    {
      console.log("running iteration")
      for (var x = 0; x < this.width; ++x)
      {
        for (var y = 0; y < this.height; ++y)
        {
          var numAdjacent = this.getNumAdjacent(x,y);
          var tile = this.tiles[x][y];

          // Should tile survive?
          if (tile.type = TILE_TYPE_FILLED)
          {
            if (numAdjacent < 3 || numAdjacent > 8) tile.type = TILE_TYPE_FILLED;
          }
          // Should tile be born?
          else
          {
            if (numAdjacent >= 6 && numAdjacent <= 8) tile.type = TILE_TYPE_CLEAR;
          }
        }
      }
    }
    console.log("all iterations done")
  },

  getNumAdjacent:function(x,y)
  {
    var count = 0;
    for (var i = -1; i <= 1; ++i)
    {
      for (var j = -1; j <= 1; ++j)
      {
        if (i == 0 && j == 0) continue;
        if (!this.isOnMap(x+i,y+j) || this.tiles[x+i][y+j].type == TILE_TYPE_FILLED)
        {
          count++;
        }
      }
    }
    return count;
  }
});