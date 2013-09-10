var BoundingBoxComponent = new Class({ Extends:Component, Implements:Options,

  options:
  {
    x:0,
    y:0,
    width:0,
    height:0
  },

  x:0,
  y:0,
  width:0,
  height:0,

  initialize:function(options)
  {
    this.setOptions(options);

    this.x = this.options.x;
    this.y = this.options.y;
    this.width = this.options.width;
    this.height = this.options.height;
  }
});