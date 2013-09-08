var MutateTilemapStep = new Class({ Implements:Options,

  tilemap:null,

  initialize:function(options)
  {
    this.setOptions(options);
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
});