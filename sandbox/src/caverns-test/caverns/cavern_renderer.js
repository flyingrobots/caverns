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

      for (var y = 0; y <= cavernDef.height; ++y)
      {
        for (var x = 0; x <= cavernDef.width; ++x)
        {
          var tile = cavernDef.tiles[x][y];
          var color = 0xffffff;
          switch (tile)
          {
            case TILE_TYPE_FILLED:
              color = 0x333333;
              break;
            case TILE_TYPE_CLEAR:
              color = 0x715F78;
              break;
            case TILE_TYPE_LAVA:
              color = 0xD1262E;
              break;
            case TILE_TYPE_WATER:
              color = 0x787FDE;
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