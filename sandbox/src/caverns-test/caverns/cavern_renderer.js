var CavernRenderer = new Class({
  initialize:function(cavernDef)
  {
    var cavernGfx = this.generateCavernSprite(cavernDef);
    var cavernTex = new PIXI.RenderTexture(cavernGfx.width, cavernGfx.height);
    cavernTex.render(cavernGfx);
    this.sprite = new PIXI.Sprite(cavernTex);
  },

  generateCavernSprite: function(cavernDef)
    {
      const cellWidth = 4;
      const cellHeight = 4;

      var graphics = new PIXI.Graphics();
      graphics.width = cavernDef.width*cellWidth;
      graphics.height = cavernDef.height*cellHeight;

      for (var y = 0; y < cavernDef.height; ++y)
      {
        for (var x = 0; x < cavernDef.width; ++x)
        {
          var tile = cavernDef.tiles[x][y];
          var color = 0xffffff;
          switch (tile)
          {
            case TILE_TYPE_FILLED:
              color = Math.random() > 0.5 ? 0x333333 : 0x303030;
              break;
            case TILE_TYPE_CLEAR:
              color = 0x715F78;
              break;
            case TILE_TYPE_LAVA:
              color = y%3 != x%3 ? 0xD1262E : 0xC71C24;
              break;
            case TILE_TYPE_WATER:
              color = y%2==0 ? 0x787FDE : 0x7C84EB;
              break;
            case TILE_TYPE_GRASS:
              color = 0x3AC73C;
              break;
          }
          graphics.beginFill(color);
          graphics.drawRect(x*cellWidth,y*cellHeight,cellWidth,cellHeight);
        }
      }

      return graphics;
    },

  getSprite:function()
  {
    return this.sprite;
  }
});