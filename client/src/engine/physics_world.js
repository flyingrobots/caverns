// physicsWorld.js
// Created by flyingrobots
(function() {

this.PhysicsWorld = function() {
  this.world = null;
}

PhysicsWorld.prototype.initialize = function(options) {
  options = js.defaults(options, {
    enableSleepingBodies: true,
    gravity: new b2Vec2(0, 250),
    minVertex: new b2Vec2(0, 0),
    maxVertex: new b2Vec2(document.width, document.height),
  });

  var worldAABB = new b2AABB();
  worldAABB.minVertex.Set(options.minVertex.x, options.minVertex.y);
  worldAABB.maxVertex.Set(options.maxVertex.x, options.maxVertex.y);
  
  this.world = new b2World(worldAABB, options.gravity, options.enableSleepingBodies);
}

var _commonBodyDefaults = function(options) {
  return js.defaults(options, {
    fixed: false,
    restitution: 0.6,
    friction: 0.3, 
    rotation: 0
  });
}

PhysicsWorld.prototype.addBody = function(x, y, options, shapeCallback) {
  options = _commonBodyDefaults(options);
  var shape = shapeCallback();
  shape.restitution = options.restitution;
  shape.friction = options.friction;
  var body = new b2BodyDef();
  body.AddShape(shape);
  body.position.Set(x, y);
  if (!options.fixed) {
      shape.density = 1.0;
  }
  body.rotation = options.rotation;
  return this.world.CreateBody(body);
}

PhysicsWorld.prototype.createBoxBody = function(x, y, width, height, options) {
  return this.addBody(x, y, options, function() {
    var def = new b2BoxDef();
    def.extents.Set(width/2, height/2);
    return def;
  });
}

PhysicsWorld.prototype.createCircleBody = function(x, y, radius, options) {
  return this.addBody(x, y, options, function() {
    var def = new b2CircleDef();
    def.radius = radius;
    return def;
  })
}

PhysicsWorld.prototype.tick = function(dt) {
  this.world.Step(dt, 1);
}

})();
