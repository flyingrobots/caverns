///////////////////////////////////////////////////////////////////////////////
var Sprite = new Class({
  //---------------------------------------------------------------------------
  initialize: function(sprite, width, height, setPositionCallback) {
    this.width = width;
    this.height = height;
    this.setPositionCallback = setPositionCallback;
    this.sprite = sprite;
  },
  //---------------------------------------------------------------------------
  setPosition: function(x, y) {
    this.setPositionCallback(x, y);
  }
});
