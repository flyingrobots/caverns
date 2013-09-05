var PixiBoxRenderer = new Class({Extends:PixiRenderer

  initialize:function(data)
  {
    data.width = data.width || 100;
    data.height = data.height || 100;
    data.color = data.color || 0x000000;
    if (typeof data.color === "string")
    {
      data.color = parseInt(data.color, 16);
    }
    data.alpha = data.alpha || 1;
    this.parent(SpriteUtils.createBox(data.width, data.height, data.color, data.alpha));
  }
});