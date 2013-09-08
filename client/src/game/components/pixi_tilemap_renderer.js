var PixiTilemapRenderer = new Class({Extends:Component,
  setup:function()
  {
    var tilemapComponent = this.owner.getComponentByType(TilemapComponent);

    var gfx = this.createTilemapGraphics(tilemapComponent);
    var tex = new PIXI.RenderTexture(tilemapComponent.numTilesX()*tilemapComponent.tileWidth(), tilemapComponent.numTilesY()*tilemapComponent.tileHeight());
    tex.render(gfx);
    this.sprite = new PIXI.Sprite(cavernTex);
  },

  createTilemapGraphics:function(tilemapComponent)
  {
    
  }
});