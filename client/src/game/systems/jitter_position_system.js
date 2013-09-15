(function(){

  this.JitterPositionSystem = function()
  {
    this.initialize();
  };

  JitterPositionSystem.prototype = {

    initialize:function()
    {
      this.nodeList = this.createNodeList({
        transform:TransformComponent
      });
    },

    update:function(dT)
    {
      this.nodeList.forEachNode(function(node) {
        node.transform.position.x += Math.random()*2-1;
        node.transform.position.y += Math.random()*2-1;
      });
    }
  };  

  System.register(JitterPositionSystem);
})();