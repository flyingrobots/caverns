var BoundingBoxComponent = new Class({ Extends:Component, Implements:Options,

  options:
  {
    width:0,
    height:0
  },

  width:0,
  height:0,

  initialize:function(options)
  {
    this.setOptions(options);
    this.width = this.options.width;
    this.height = this.options.height;
  }

});