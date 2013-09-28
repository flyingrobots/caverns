describe("Box2dPhysicsWorld", function() {

  var physics = null;
  var helper = new SpecHelper();

  var b2Vec2Equality = function(a, b) {
    expect(a.x).toEqual(b.x);
    expect(a.y).toEqual(b.y);
  }

  afterEach(function() {
    physics = null;
  });

  describe("A new Box2dPhysicsWorld instance", function() {

    beforeEach(function() {
      physics = new Box2dPhysicsWorld();
    });

    describe("its properties", function() {
      it("should have a 'world' property", function() {
        expect(physics.world).not.toBe(null);
      });

      it("should have a method called 'addBody'", function() {
        expect(_.isFunction(physics.addBody).toBe(true));
      });

      it("should have a method called 'tick'", function() {
        expect(_.isFunction(physics.tick).toBe(true));
      });
    });

  });

  describe("Created with opts", function() {

    var opts = {
      sleep: false,
      gravity: new b2Vec2(0,5),
      minVertex: new b2Vec2(1,2),
      maxVertex: new b2Vec2(1001, 1002)
    };

    var box2d = null;

    beforeEach(function() {
      physics = new Box2dPhysicsWorld(opts);
      box2d = physics.world;
    });

    it("should apply the specified options", function() {
      expect(b2Vec2Equality(box2d.getGravity(), opts.gravity).toBe(true));

      var aabb = box2d.getAABB();
      expect(b2Vec2Equality(aabb.minVertex, opts.minVertex).toBe(true));
      expect(b2Vec2Equality(aabb.maxVertex, opts.maxVertex).toBe(true));

      // TODO check sleeping bodies
    });

  });

});

