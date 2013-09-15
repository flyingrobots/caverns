(function(){
  this.SetPreviousTransformSystem = function()
  {
    this.initialize();
  };

  SetPreviousTransformSystem.prototype = {
    initialize:function()
    {
      
    },

    setup:function()
    {
      this.nodeList = this.createNodeList({
        xform:TransformComponent,
        lastXform:PreviousTransformComponent
      });
    },

    update:function(dt)
    {
      this.nodeList.forEachNode(function(node){
        node.lastXform.setData(node.xform);
      });
    }
  };

  System.register(SetPreviousTransformSystem);
})();