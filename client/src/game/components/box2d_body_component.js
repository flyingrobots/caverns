(function(){

  function Box2dBodyComponent() {
    this.fixed = false;
    this.restitution = 0.6;
    this.friction = 0.3;
    this.rotation = 0;
    Component.registerInstance(this);
  }

  this.Box2dBodyComponent = Box2dBodyComponent;

})();
