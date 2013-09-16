(function(){
  
  this.CreateCollisionStep = function()
  {
    this.initialize();
  };

  CreateCollisionStep.prototype = {
    initialize:function()
    {
      
    },

    run:function(data)
    {
      this.numTilesX = data.tilemapDefinition.numTilesX;
      this.numTilesY = data.tilemapDefinition.numTilesY;

      data.tilemapDefinition.collisionMap = ArrayUtils.createArray2D(this.numTilesX, this.numTilesY, 1);
      this.collisionMap = data.tilemapDefinition.collisionMap;

      this.runInternal();
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