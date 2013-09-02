//---------------------------------------------------------------------------
var start = function(game, width, height) {
  // physics
  game.physics = new Physics();
  game.physics.resetWorld(width, height);
  // game object pool
  game.objectPool = new GameObjectPool(game);
  // graphics
  game.graphics = new Graphics(game);
}

//---------------------------------------------------------------------------
var colors = {
  "gray": 0x2d2d2d,
  "orange": 0xf99157,
  "blood": 0xc96161,
  "blue": 0x6199cc,
  "green": 0x72B897,
  "yellow": 0xEEFF66,
  "purple": 0xCC99C2
};

//---------------------------------------------------------------------------
var randomInRange = function(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

//---------------------------------------------------------------------------
var randomColor = function() {
  var colorsArray = [
    colors.blood,
    colors.blue,
    colors.green,
    colors.yellow,
    colors.purple
  ];
  return colorsArray[randomInRange(0, colorsArray.length - 1)];
}

///////////////////////////////////////////////////////////////////////////////
var PhysicsDemo = new Class({ Extends: Game,
  //---------------------------------------------------------------------------
  initialize: function(width, height, bgColor) {
    this.parent(width, height, colors.gray);
    this.started = false;
    start(this, width/2, height/2);
  },
  //---------------------------------------------------------------------------
  setup: function() {
    // some static dudes
    this.objectPool.addBoxObject(200, 250, 200, 5, colors.orange, true);
    var staticCount = randomInRange(1, 5);
    while (staticCount-- > 0) {
      var staticBox = this.objectPool.addBoxObject(
        randomInRange(0, 400), 
        randomInRange(100, 180),
        randomInRange(3, 40),
        randomInRange(3, 5),
        colors.orange, 
        true
      );
    }
    // some dynamic dudes
    var boxCount = randomInRange(3, 8);
    while (boxCount-- > 0) {
      this.objectPool.addBoxObject(
        randomInRange(0, 300), 
        randomInRange(0, 40), 
        randomInRange(5, 30), 
        randomInRange(5, 30),
        randomColor(), 
        false
      );
    }
  },
  //---------------------------------------------------------------------------
  render: function() {
    // step physics
    this.physics.step();
    // update each sprite's position to reflect its physical location
    this.objectPool.forEach(function(elem, index) {
      var physPos = elem.physics.GetCenterPosition();
      elem.sprite.setPosition(physPos.x, physPos.y);
      elem.sprite.sprite.rotation = elem.physics.GetRotation();
    });
    // draw
    this.parent();
  }
});
