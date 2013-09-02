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
    this.objectPool.addBoxObject(400, 300, 1000, 45, colors.orange, true);
    this.objectPool.addBoxObject(500, 30, 30, 30, colors.blue, false);
  },
  //---------------------------------------------------------------------------
  render: function() {
    // step physics
    this.physics.step();
    // update each sprite's position to reflect its physical location
    this.objectPool.forEach(function(elem, index) {
      var physPos = elem.physics.GetCenterPosition();
      elem.sprite.setPosition(physPos.x, physPos.y);
    });
    // draw
    this.parent();
  }
});
