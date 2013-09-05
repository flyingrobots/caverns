var PixiRenderer = new Class({Extends:Component,

  sprite:null,

  initialize:function(sprite)
  {
    this.parent();
    this.sprite = sprite;
  }

  setPosition:function(x,y)
  {
    this.sprite.x = x;
    this.sprite.y = y;
  }
});