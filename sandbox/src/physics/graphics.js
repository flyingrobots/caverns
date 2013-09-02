//-----------------------------------------------------------------------------
var createBoxSprite = function(width, height, color) {
  var sprite = new PIXI.Graphics();
  var hw = width/2;
  var hh = height/2;
  
  //sprite.beginFill(color);
  sprite.lineStyle(1, color, 1);
  
  sprite.moveTo(-hw, -hh);
  sprite.lineTo(hw, -hh);
  sprite.lineTo(hw, hh);
  sprite.lineTo(-hw, hh);
  sprite.lineTo(-hw, -hh);

  //sprite.endFill();

  return new Sprite(sprite, width, height, function(x, y) {
    sprite.position.x = x;
    sprite.position.y = y;
  });
}

///////////////////////////////////////////////////////////////////////////////
var Graphics = new Class({
  //---------------------------------------------------------------------------
  initialize: function(game) {
    this.stage = game.stage;
  },
  //---------------------------------------------------------------------------
  addBoxSprite: function(x, y, width, height, color) {
    var box = createBoxSprite(width, height, color);
    box.setPosition(x, y);
    this.stage.addChild(box.sprite);
    return box;
  }
});
