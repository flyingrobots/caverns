var TilemapDefinition = new Class({ Implements:Options,

  options:
  {
    numTilesX:0,
    numTilesY:0,
    tileWidth:0,
    tileHeight:0,
    tileDefinitions:null,
    tiles:null,
    collisionMap:null
  },

  tileDefinitions:null,
  tiles:null,
  collisionMap:null,
  numTilesX:0,
  numTilesY:0,
  tileWidth:0,
  tileHeight:0,

  initialize:function(options)
  {
    this.setOptions(options);

    assert(this.options.numTilesX > 0 && this.options.numTilesY > 0, "Must specify non-zero numTilesX and numTilesY");
    assert(this.options.tiles == null || this.options.tiles instanceof Array, "Tiles option must be an array");
    assert(this.options.tiles == null || (this.options.tiles.length == this.options.numTilesX && this.options.tiles[0].length == this.options.numTilesY), "Tile array must be of dimensions [numTilesX,numTilesY]");
    assert(this.options.collisionMap == null || this.options.collisionMap instanceof Array, "Collision Map option must be an array");
    assert(this.options.collisionMap == null || (this.options.collisionMap.length == this.options.numTilesX && this.options.collisionMap[0].length == this.options.numTilesY), "Collision Map array must be of dimensions [numTilesX,numTilesY]");
    assert(this.options.tileDefinitions == null || this.options.tileDefinitions instanceof Object, "Tiles option must be an object");

    //Set initial parameters
    this.numTilesX = this.options.numTilesX;
    this.numTilesY = this.options.numTilesY;
    this.tileWidth = this.options.tileWidth;
    this.tileHeight= this.options.tileHeight;
    this.tiles = this.options.tiles;
    this.tileDefinitions = this.options.tileDefinitions || {};
    this.collisionMap = this.options.collisionMap;

    //Build initial array if not already set
    if (this.tiles == null)
    {
      this.tiles = [];
      for (var i = 0; i < this.numTilesX; ++i)
      {
        this.tiles.push([]);
        for (var j = 0; j < this.numTilesY; ++j)
        {
          this.tiles[i].push(null);
        }
      }
    }
  },

  addTileDefinitions:function(tileDefinitions)
  {
    for (var tileId in tileDefinitions)
    {
      var tileDefinition = tileDefinitions[tileId];
      tileDefinition.id = tileId;
      this.addTileDefinition(tileDefinition);
    }
  },

  addTileDefinition:function(tileDefinition)
  {
    assert(tileDefinition.id != null, "Tile definition id must be specified");

    this.tileDefinitions[tileDefinition.id] = tileDefinition;
  },

  setTile:function(tileX,tileY,tileId)
  {
    assert(this.isTilePositionInBounds(tileX,tileY), "Tile position out of bounds");

    this.tiles[tileX][tileY] = tileId;
  },

  getTile:function(tileX,tileY)
  {
    assert(this.isTilePositionInBounds(tileX,tileY), "Tile position out of bounds");

    var tileType = this.tilemapDefinition.tiles[tileX,tileY];
    if (tileType == null)
    {
      return null;
    }
    return this.tilemapDefinition.tileDefinitions[tileType];
  },

  isTileBlocking:function(tileX,tileY)
  {
    if (this.collisionMap == null)
    {
      return false;
    }
    
    assert(this.isTilePositionInBounds(tileX,tileY),"Tile position out of bounds");

    return this.collisionMap[tileX][tileY] == 1;
  },

  isTilePositionInBounds:function(tileX,tileY)
  {
    return tileX >= 0 && tileY >= 0 && tileX < this.numTilesX && tileY < this.numTilesY;
  }
});