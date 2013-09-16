(function(){
  
  this.MutateTilemapStep = function()
  {
    this.initialize();
  };

  MutateTilemapStep.prototype = {
    initialize:function()
    {
      
    },

    run:function(data)
    {
      assert(data.tilemapDefinition != null, "Must have tilemap definition!");

      this.tilemap = data.tilemapDefinition;
      this.numTilesX = this.tilemap.numTilesX;
      this.numTilesY = this.tilemap.numTilesY;

      this.runInternal(data);
    },

    runInternal:function(data)
    {
      throw "Must override in concrete class!";
    }
  };
})();