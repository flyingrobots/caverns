(function(){

  this.TilemapGenerator = function(options)
  {
    this.initialize(options);
  };

  TilemapGenerator.prototype = {
    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        seed:null,
        numTilesX:0,
        numTilesY:0,
        tileWidth:0,
        tileHeight:0,
        steps:[]
      });

      this.numTilesX = this.options.numTilesX;
      this.numTilesY = this.options.numTilesY;
      this.steps = this.options.steps;
      this.tilemapDefinition = new TilemapDefinition({
        numTilesX:this.numTilesX,
        numTilesY:this.numTilesY,
        tileWidth:this.options.tileWidth,
        tileHeight:this.options.tileHeight
      });
    },

    addStep:function(step)
    {
      this.steps.push(step);
    },

    generate:function()
    {
      // Save old random seed
      var oldRandom = Math.random;
      if (this.options.seed != undefined)
      {
        Math.seedrandom(this.options.seed);
      }

      //Run each generation step
      var data = {tilemapDefinition:this.tilemapDefinition};
      for (var i = 0; i < this.steps.length; ++i)
      {
        this.steps[i].run(data);
      }
      this.tilemapDefinition = data.tilemapDefinition;

      // Reset random seed
      Math.random = oldRandom;

      return this.tilemapDefinition;
    },

    generateInternal:function()
    {
      throw "Must override in concrete class"
    }
  };

})();