//---------------------------------------------------------------------------
var spawnPhysicsBody = function(world, x, y, shapeFunc) {
  return world.CreateBody(function(getShape) {
    var body = new b2BodyDef();
    body.AddShape(shapeFunc());
    body.position.Set(x, y);
    return body;
  }(world, x, y, shapeFunc));
}

//---------------------------------------------------------------------------
var spawnPhysicsWorld = function(halfWidth, halfHeight) {
  var gravity = new b2Vec2(0, 50); // wtf units?
  var doSleep = true;
  var worldAABB = new b2AABB();
  worldAABB.minVertex.Set(-halfWidth, -halfHeight);
  worldAABB.maxVertex.Set(halfWidth, halfHeight);
  return new b2World(worldAABB, gravity, doSleep);
}

///////////////////////////////////////////////////////////////////////////////
var Physics = new Class({
  //---------------------------------------------------------------------------
  initialize: function() {
    this.world = null;
    this.bodies = [];
  },
  //---------------------------------------------------------------------------
  resetWorld: function(width, height) {
    this.world = spawnPhysicsWorld(width / 2, height / 2);
  },
  //---------------------------------------------------------------------------
  step: function(dt) {
    if (typeof(dt) == 'undefined') {
      dt = 1.0 / 30.0;
    }
    this.world.Step(dt, 1);
  },
  //---------------------------------------------------------------------------
  addBox: function(x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') {
      fixed = true;
    }
    return spawnPhysicsBody(this.world, x, y, function() {
      var box = new b2BoxDef();
      box.restitution = 0.5;
      box.friction = 0.3;
      box.extents.Set(width, height);
      if (!fixed) {
        box.density = 1.0;
      }
      return box;
    });
  }
});
