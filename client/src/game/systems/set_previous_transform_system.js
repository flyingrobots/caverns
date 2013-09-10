var SetPreviousTransformSystem = new Class({Extends:System,

  initialize:function()
  {
    this.parent();
    this.nodeList = this.createNodeList({
      xform:TransformComponent,
      lastXform:PreviousTransformComponent
    });
  },

  update:function(dT)
  {
    this.nodeList.forEachNode(function(node){
      node.lastXform.setData(node.xform);
    });
  }

});