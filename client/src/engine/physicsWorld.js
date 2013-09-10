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

PhysicsWorld.prototype.addBody = function(x, y, options, shapeCallback) {
  options = js.defaults(options, {
    rotation: 0
  });
  var body = new b2BodyDef();
  body.AddShape(shapeCallback());
  body.position.Set(x, y);
  body.rotation = options.rotation;
  return this.world.CreateBody(body);
}

PhysicsWorld.prototype.createBoxBody = function(x, y, width, height, options) {
  options = js.defaults(options, {
    fixed: false,
    restitution: 0.6,
    friction: 0.3
  });
  return this.addBody(x, y, options, function() {
    var def = new b2BoxDef();
    def.restitution = options.restitution;
    def.friction = options.friction;
    def.extents.Set(width/2, height/2);
    if (!options.fixed) {
      def.density = 1.0;
    }
    return def;
  });
}

PhysicsWorld.prototype.tick = function(dt) {
  this.world.Step(dt, 1);
}

})();
