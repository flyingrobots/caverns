(function(){

  function Box2dShapeComponent(shapeFunc) {
    this.shapeFunc = shapeFunc;
    Component.registerInstance(this);
  }
  
  this.Box2dShapeComponent = Box2dShapeComponent;

})();
