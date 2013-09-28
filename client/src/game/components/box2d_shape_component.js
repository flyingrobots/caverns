(function(){

  var boxShapeFactory = function(width, height) {
    var def = new b2BoxDef();
    def.extents.Set(width/2, height/2);
    return def;
  }

  var circleShapeFactory = function(radius) {
    var def = new b2CircleDef();
    def.radius = radius;
    return def;
  }

  function Box2dShapeComponent(shapeFunc) {
    this.shapeFunc = shapeFunc;
    Component.registerInstance(this);
  }
  
  this.Box2dShapeComponent = Box2dShapeComponent;

  this.createBox2dBoxShapeComponent = function(width, height) {
    return new Box2dShapeComponent(boxShapeFactory);
  }

  this.createBox2dCircleShapeComponent = function(radius) {
    return new Box2dShapeComponent(circleShapeFactory);
  }

})();
