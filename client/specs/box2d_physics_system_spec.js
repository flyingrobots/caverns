describe("Box2d Physics System", function() {

  var world = null;
  var physics = null;

  beforeEach(function() {
    world = SpecHelper.createPhysicsWorldDouble();
    spyOn(world, 'initialize');
    spyOn(world, 'addBody');
    physics = new Box2dPhysicsSystem(world);
    physics.setup();
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
      SpecHelper.supportsSystemAPI(physics);
    });

    it("should have a physics world instance", function() {
      expect(physics.world).not.toBe(null);
    });

    it("should initialize its physics world instance", function() {
      expect(world.initialize).toHaveBeenCalled();
    });

  });

  describe("Updating the Box2dPhysicsSystem", function() {

    beforeEach(function() {
      physics.update(1.0 / 30.0);
    });

    it("should tick its physics world instance", function() {
      expect(world.tick).toHaveBeenCalled();
    });

  });

});

