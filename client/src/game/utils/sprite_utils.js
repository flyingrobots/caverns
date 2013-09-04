var SpriteUtils = {
  createBox:function(width,height,color,alpha)
  {
    alpha = alpha || 1
    var gfx = new PIXI.Graphics();
    gfx.beginFill(color,alpha);
    gfx.drawRect(0,0,width,height);
    var tex = new PIXI.RenderTexture(width,height);
    tex.render(gfx);
    return new PIXI.Sprite(tex);
  }
};
