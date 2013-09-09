var JitterPositionSystem = new Class({Extends:System,

  initialize:function()
  {
    this.parent();
    this.nodeList = this.createNodeList({
      transform:TransformComponent
    });
  },

  update:function(dT)
  {
    this.nodeList.nodes.each(function(node) {
      node.transform.x += Math.random()*2-1;
      node.transform.y += Math.random()*2-1;
    });
  }

});