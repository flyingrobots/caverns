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

var colors = {
  "gray": 0x2d2d2d,
  "orange": 0xf99157,
  "blood": 0xc96161,
  "blue": 0x6199cc
};

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
    this.objectPool.addBoxObject(100, 250, 100, 5, colors.orange, true);
    this.objectPool.addBoxObject(100, 0, 10, 10, colors.blue, false);
    this.objectPool.addBoxObject(100, 20, 10, 10, colors.blood, false);
    this.objectPool.addBoxObject(100, 40, 10, 10, colors.orange, false);
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
