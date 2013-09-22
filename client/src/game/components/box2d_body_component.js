(function(){

  this.Box2dBodyComponent = function(options) {
    this.initialize(options);
  }
  
  Box2dBodyComponent.prototype = {
    initialize: function(options) {
      this.fixed = false;
      this.restitution = 0.6;
      this.friction = 0.3;
      this.rotation = 0;
    }
  }
  
  Component.register(Box2dBodyComponent);

})();
