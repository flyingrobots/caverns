(function(){

  this.MovementSystem = function()
  {
    this.initialize();
  };

  MovementSystem.prototype = {

    initialize:function()
    {

    },

    setup:function()
    {
      this.moverNodes = this.createNodeList({
        kinetics:KineticsComponent,
        xform:TransformComponent
      });
    },

    update:function(dt)
    {
      this.moverNodes.forEachNode(function(node) {
        var kinetics = node.kinetics;
        var xform = node.xform;

        xform.position.x += kinetics.speed.x*dt;
        xform.position.y += kinetics.speed.y*dt;
      });
    }

  };

  System.register(MovementSystem);
})();