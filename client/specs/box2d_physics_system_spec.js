describe("Box2d Physics System", function() {

  var world = null;
  var physics = null;
  var helper = new SpecHelper();

  beforeEach(function() {
    world = helper.createBox2dPhysicsWorldSpy();
    physics = new Box2dPhysicsSystem(world);
  });

  afterEach(function() {
    physics = null;
    world = null;
  });

  describe("A new Box2dPhysicsSystem instance", function() {

    it("should not be null", function() {
      expect(physics).not.toBe(null);
    });

    it("should support the System API", function() {
      helper.expectSystemAPI(physics);
    });

    it("should have a physics world instance", function() {
      expect(physics.world).not.toBe(null);
    });

  });

  describe("Initializing a Box2dPhysicsSystem instance", function() {

    beforeEach(function() {
      physics.initialize();
    });

    it("should initialize its physics world instance", function() {
      expect(world.initialize).toHaveBeenCalled();
    });
    
  });

  describe("Updating the Box2dPhysicsSystem", function() {

    beforeEach(function() {
      physics.initialize();
      physics.update(1.0 / 30.0);
    });

    it("should tick its physics world instance", function() {
      expect(world.tick).toHaveBeenCalled();
    });

  });

});

