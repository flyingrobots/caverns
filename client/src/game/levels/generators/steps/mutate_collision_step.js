(function(){
  
  this.MutateCollisionStep = function()
  {
    this.initialize();
  };

  MutateCollisionStep.prototype = {
    initialize:function()
    {
      
    },

    run:function(data)
    {
      assert(data.tilemapDefinition.collisionMap != null, "Must have collision map");

      this.numTilesX = data.tilemapDefinition.numTilesX;
      this.numTilesY = data.tilemapDefinition.numTilesY;
      this.collisionMap = data.tilemapDefinition.collisionMap;

      this.runInternal(data);
    },

    runInternal:function(data)
    {
      throw new "Must override in concrete class";
    },

    isTileFilled:function(x,y)
    {
      return ArrayUtils.isInBounds2D(this.collisionMap,x,y) && this.collisionMap[x][y] == 1;
    }
  };
})();