describe("The Box2dShapeComponent", function() {
  var helper = new SpecHelper();

  describe("A new Box2dShapeComponent instance", function() {
    var shape = null;

    beforeEach(function() {
      shape = new Box2dShapeComponent(function() {
        return 5; // a totally fake ass shape function (doesn't even make sense)
      });
    });

    afterEach(function() {
      shape = null;
    });

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

  describe("The Box2dCircleShapeComponent factory", function() {
    var circle = null;
    var radius = 3.14;
    var box2dShape = null;
    
    beforeEach(function() {
      circle = new Box2dCircleShapeComponent(radius);
      box2dShape = circle.shapeFunc();
    });

    afterEach(function() {
      circle = null;
      box2dShape = null;
    });

    it("should create a b2CircleDef instance", function() {
      expect(box2dShape).not.toBe(null);
      expect(box2dShape instanceOf b2CircleDef).toBe(true);
    });

    it("should create a circle with the expected radius", function() {
      expect(box2dShape.radius).toEqual(radius);
    });
  });

  describe("The Box2dBoxShapeComponent factory", function() {
    var box2dShape = null;
    var box = null;
    var width = 10;
    var height = 6;

    beforeEach(function() {
      box = new Box2dBoxShapeComponent(width, height);
      box2dShape = circle;
    });

    afterEach(function() {
      box = null;
      box2dShape = null;
    });

    it("should create a b2BoxDef instance", function() {
      expect(box2dShape).not.toBe(null);
    });
    
    it("should create a box with the expected size", function() {
      var size = box2dShape.getExtents();
      // boxes are represented by half spaces in box2d
      expect(size.x).toEqual(width/2);
      expect(size.y).toEqual(height/2);
    });
  });

});
