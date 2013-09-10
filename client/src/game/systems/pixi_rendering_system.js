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
      displayObj.position.x = xform.x;
      displayObj.position.y = xform.y;
      displayObj.scale.x = xform.scaleX;
      displayObj.scale.y = xform.scaleY;
      displayObj.rotation = xform.rotation;
    });
  }
});