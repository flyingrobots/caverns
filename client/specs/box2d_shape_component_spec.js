describe("Box2d Shape Component", function() {

  var shape = null;
  var helper = new SpecHelper();

  beforeEach(function() {
    shape = new Box2dShapeComponent(function() {
      return 5; // some BS
    });
  });

  afterEach(function() {
    shape = null;
  });

  describe("A new Box2dShapeComponent instance", function() {
    
    it("should not be null", function() {
      expect(shape).not.toBe(null);
    });

    it("should support the Component API", function() {
      helper.expectComponentAPI(shape);
    });

    describe("its properties", function() {
      it("should have a 'shapeFunc' property", function() {
        expect(_.isFunction(shape.shapeFunc)).toBe(true);
      });
    });

  });

});
