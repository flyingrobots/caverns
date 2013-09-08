var PixiRenderer = new Class({Extends:Component,

  sprite:null,

  initialize:function()
  {
    this.parent();
  }

  setPosition:function(x,y)
  {
    this.sprite.x = x;
    this.sprite.y = y;
  }
});