var ArrayUtils = 
{
  createArray2D:function(width, height, value)
  {
    var array = [];

    // Fill initial tiles
    for (var x = 0; x < width; ++x)
    {
      var col = [];
      for (var y = 0; y < height; ++y)
      {
        col.push(value);
      }
      array.push(col);
    }

    return array;
  },

  fillRect:function(array, x, y, width, height, value)
  {
    var arrayWidth = array.length;
    var arrayHeight = array[0].length;
    for (var i = 0; i < width; ++i)
    {
      if (x+i >= arrayWidth) continue;
      for (var j = 0; j < height; ++j)
      {
        if (y+j >= arrayHeight) continue;
        array[x+i][y+j] = value;
      }
    }
  },

  isInBounds2D:function(array,x,y)
  {
    return x >= 0 && y >= 0 && x < array.length && y <= array[0].length;
  },

  getNumAdjacent2D:function(array,x,y,cellSize,value,includeDiagonals)
  {
    value = value || 1
    includeDiagonals = includeDiagonals || true

    var width = array.length;
    var height = array[0].length;

    var leftOutOfBounds  = x-cellSize < 0;
    var rightOutOfBounds = x+cellSize >= width;
    var topOutOfBounds  = y-cellSize < 0;
    var bottomOutOfBounds = y+cellSize >= height;

    var count = 0;
    count += includeDiagonals && (leftOutOfBounds   || topOutOfBounds || array[x-cellSize][y-cellSize] == value);
    count += leftOutOfBounds   || array[x-cellSize][y] == value;
    count += includeDiagonals && (leftOutOfBounds   || bottomOutOfBounds ||  array[x-cellSize][y+cellSize] == value);
    count += topOutOfBounds    || array[x][y-cellSize] == value;
    count += bottomOutOfBounds || array[x][y+cellSize] == value;
    count += includeDiagonals && (rightOutOfBounds  || topOutOfBounds || array[x+cellSize][y-cellSize] == value);
    count += rightOutOfBounds  || array[x+cellSize][y] == value;
    count += includeDiagonals && (rightOutOfBounds  || bottomOutOfBounds || array[x+cellSize][y+cellSize] == value);
    return count;
  }
};