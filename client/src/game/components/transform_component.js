var TransformComponent = new Class({Extends:Component, Implements:Options,

  options:
  {
    x:0,
    y:0,
    scaleX:1,
    scaleY:1,
    rotation:0
  },

  x:0,
  y:0,
  scaleX:1,
  scaleY:1,
  rotation:0,

  initialize:function(options)
  {
    this.setOptions(options);

    this.x = this.options.x;
    this.y = this.options.y;
    this.scaleX = this.options.scaleX;
    this.scaleY = this.options.scaleY;
    this.rotation = this.options.rotation;
  }
});