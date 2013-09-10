var MovementSystem = new Class({Extends:System,

  initialize:function()
  {
    this.parent();
    this.moverNodes = this.createNodeList({
      kinetics:KineticsComponent,
      xform:TransformComponent
    });
  },

  update:function(dT)
  {
    this.moverNodes.forEachNode(function(node) {
      var kinetics = node.kinetics;
      var xform = node.xform;

      xform.position.x += kinetics.speed.x*dT;
      xform.position.y += kinetics.speed.y*dT;
    });
  }

});