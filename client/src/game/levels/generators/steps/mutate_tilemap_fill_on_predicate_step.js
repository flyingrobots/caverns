(function(){
  
  this.MutateTilemapFillOnPredicateStep = function(options)
  {
    this.initialize(options);
  };

  _.extend(MutateTilemapFillOnPredicateStep.prototype, new MutateTilemapStep(), {
    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        predicate:null,
        tileId:null
      });
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
})();