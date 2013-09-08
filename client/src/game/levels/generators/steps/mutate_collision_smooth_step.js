var MutateCollisionSmoothStep = new Class({ Extends:MutateCollisionStep,
  options:
  {
    cellSize:1,
    numIterations:2,
    bornList:[5,6,7,8],
    surviveList:[5,6,7,8]
  },

  initialize:function(options)
  {
    this.parent(options);
  },

  runInternal:function(data)
  {
    // Run generation automata
    CellularAutomata.applyAutomaton(this.collisionMap, this.options.bornList, this.options.surviveList, this.options.cellSize, this.options.numIterations);
  },
});
