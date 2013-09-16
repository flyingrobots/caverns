(function(){
  
  this.MutateCollisionSmoothStep = function(options)
  {
    this.initialize(options);
  };

  _.extend(MutateCollisionSmoothStep.prototype, new MutateCollisionStep, {
    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        cellSize:1,
        numIterations:2,
        bornList:[5,6,7,8],
        surviveList:[5,6,7,8]
      });
    },

    runInternal:function(data)
    {
      // Run generation automata
      CellularAutomata.applyAutomaton(this.collisionMap, this.options.bornList, this.options.surviveList, this.options.cellSize, this.options.numIterations);
    }
  });
})();