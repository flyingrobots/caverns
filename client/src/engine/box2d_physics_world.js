// Box2dPhysicsWorld.js
// Created by flyingrobots
(function() {

  function Box2dPhysicsWorld(opts) {
    opts = _.defaults(opts, {
      enableSleepingBodies: true,
      gravity:   new b2Vec2(0, 250),
      minVertex: new b2Vec2(0, 0),
      maxVertex: new b2Vec2(document.width, document.height),
    });

    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(opts.minVertex.x, opts.minVertex.y);
    worldAABB.maxVertex.Set(opts.maxVertex.x, opts.maxVertex.y);

    this.world = new b2World(worldAABB, opts.gravity, opts.enableSleepingBodies);
  }

  Box2dPhysicsWorld.prototype.addBody = function(x, y, opts, shapeCallback) {
    opts = _commonBodyDefaults(opts);

    var shape = shapeCallback();
    shape.restitution = opts.restitution;
    shape.friction = opts.friction;

    var body = new b2BodyDef();
    body.AddShape(shape);
    body.position.Set(x, y);
    body.rotation = opts.rotation;

    if (!opts.fixed) {
      shape.density = 1.0;
    }

    return this.world.CreateBody(body);
  }

  Box2dPhysicsWorld.prototype.tick = function(dt) {
    this.world.Step(dt, 1);
  }

})();
