var MutateTilemapFillOnPredicateStep = new Class({ Extends:MutateTilemapStep,
  options:
  {
    predicate:null,
    tileId:null
  },

  initialize:function(options)
  {
    this.parent(options);
  },

  runInternal:function(data)
  {
    for (var x = 0; x < this.numTilesX; ++x)
    {
      for (var y = 0; y < this.numTilesY; ++y)
      {
        if (this.options.predicate(this.tilemap, x, y))
        {
          this.tilemap.setTile(x,y,this.options.tileId);
        }
      }
    }
  }
});