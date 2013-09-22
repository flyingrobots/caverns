describe("Box2d Physics System", function() {

  describe("A new Box2dPhysicsSystem instance", function() {

    var physics = null;

    beforeEach(function() {
      physics = new Box2dPhysicsSystem();
    });

    afterEach(function() {
      physics = null;
    });

    it("should not be null", function() {
      expect(physics).not.toBe(null);
    });

    it("should support the System API", function() {
      SpecHelper.supportsSystemAPI(physics);
    });

  });

});

