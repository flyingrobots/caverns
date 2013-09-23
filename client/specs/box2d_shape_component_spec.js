describe("Box2d Shape Component", function() {

  var component = null;
  var helper = new SpecHelper();

  beforeEach(function() {
    component = new Box2dShapeComponent(function() {
      return 5; // some BS
    });
  });

  afterEach(function() {
    component = null;
  });

  describe("A new Box2dShapeComponent instance", function() {
    
    it("should not be null", function() {
      expect(component).not.toBe(null);
    });

    it("should support the Component API", function() {
      helper.expectComponentAPI(component);
    });

    describe("should have a 'shapeFunc' property", function() {

      it("should be defined", function() {
        expect(component.shapeFunc).toBeDefined();
      });

      it("should be a function", function() {
        expect(_.isFunction(component.shapeFunc)).toBe(true);
      });

    });

  });

});
