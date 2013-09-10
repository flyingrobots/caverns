var PixiRenderingSystem = new Class({ Extends:System,

  initialize:function()
  {
    this.parent();
    this.nodeList = this.createNodeList({
      display:PixiDisplayComponent,
      transform:TransformComponent
    });
  },

  nodeAdded:function(nodelist, node)
  {
    assert(node.display.displayObject);
    Graphics.addDisplayObject(node.display.displayObject);
  },

  nodeRemoved:function(nodelist, node)
  {
    assert(node.display.displayObject);
    var displayObj = node.display.displayObject;
    displayObj.parent.removeChild(displayObj);
  },

  update:function(dT)
  {
    this.nodeList.forEachNode(function(node){
      var displayObj = node.display.displayObject;
      var xform = node.transform;
      displayObj.position.x = xform.position.x;
      displayObj.position.y = xform.position.y;
      displayObj.scale.x = xform.scale.x;
      displayObj.scale.y = xform.scale.y;
      displayObj.rotation = xform.rotation;
    });
  }
});