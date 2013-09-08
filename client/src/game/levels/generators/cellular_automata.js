var CellularAutomata = {
  applyAutomaton:function(array, bornList, surviveList, cellSize, iterations)
  {
    var width = array.length;
    var height = array[0].length;

    // Run automata functions on array
    for (var i = 0; i < iterations; ++i)
    {
      var newTiles = ArrayUtils.createArray2D(width, height, 1);

      for (var x = cellSize; x < width-cellSize; x += cellSize)
      {
        for (var y = cellSize; y < height-cellSize; y += cellSize)
        {
          var numAdjacent = ArrayUtils.getNumAdjacent2D(array,x,y,cellSize);
          var tile = array[x][y];

          // Should tile survive?
          var liveCondition = (tile == 1 && surviveList.indexOf(numAdjacent) != -1) ||
                              (tile == 0  && bornList.indexOf(numAdjacent) != -1);
          var type = liveCondition ? 1 : 0;
          ArrayUtils.fillRect(newTiles,x,y,cellSize,cellSize,type);
        }
      }

      // Copy new tile array to old one
      for (var x = 0; x < width; ++x)
      {
        for (var y = 0; y < height; ++y)
        {
          array[x][y] = newTiles[x][y];
        }
      }
    }
  }
};