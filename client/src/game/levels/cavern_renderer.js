var CavernRenderer = new Class({
  initialize:function(tilemapDefinition)
  {
    var cavernGfx = this.generateCavernSprite(tilemapDefinition);
    var cavernTex = new PIXI.RenderTexture(cavernGfx.width, cavernGfx.height);
    cavernTex.render(cavernGfx);
    this.sprite = new PIXI.Sprite(cavernTex);
  },

  generateCavernSprite: function(cavernDef)
    {
      var graphics = new PIXI.Graphics();
      graphics.width = cavernDef.numTilesX*cavernDef.tileWidth;
      graphics.height = cavernDef.numTilesY*cavernDef.tileHeight;

      for (var y = 0; y < cavernDef.numTilesY; ++y)
      {
        for (var x = 0; x < cavernDef.numTilesX; ++x)
        {
          var tile = cavernDef.tiles[x][y];
          var color = 0xffffff;
          switch (tile)
          {
            case "tile_rock":
              color = Math.random() > 0.5 ? 0x333333 : 0x303030;
              break;
            case null:
              color = 0x715F78;
              break;
            case "tile_lava":
              color = y%3 != x%3 ? 0xD1262E : 0xC71C24;
              break;
            case "tile_water":
              color = y%2==0 ? 0x787FDE : 0x7C84EB;
              break;
            case "tile_grass":
              color = 0x3AC73C;
              break;
          }
          graphics.beginFill(color);
          graphics.drawRect(x*cavernDef.tileWidth,y*cavernDef.tileHeight,cavernDef.tileWidth,cavernDef.tileHeight);
        }
      }

      return graphics;
    },

  getSprite:function()
  {
    return this.sprite;
  }
});