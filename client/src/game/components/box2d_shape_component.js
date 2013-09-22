(function(){

  this.Box2dShapeComponent = function() {
    this.initialize();
  }
  
  Box2dShapeComponent.prototype = {
    initialize:function() {
      this.shapeFunc = function () {
        // TODO
      }
    }
  }
  
  Component.register(Box2dShapeComponent);

})();
