var TilemapCollisionSystem = new Class({Extends:System,

  initialize:function()
  {
    this.parent();
    this.colliderNodes = this.createNodeList({
      xform:TransformComponent,
      aabb:BoundingBoxComponent,
      collider:TilemapCollisionComponent
    });
    this.levelNodes = this.createNodeList({
      data:LevelDataComponent
    });
  },

  update:function(dT)
  {
    if (!this.levelNodes.length || !this.colliderNodes.length)
    {
      return;
    }
    assert(this.levelNodes.length == 1);
    var levelData = this.levelNodes[0].data;
    this.colliderNodes.forEachNode(function(node)
    {
      this.collide(node.xform, node.aabb, levelData);
    });
  },

  collide:function(xform, aabb, levelData)
  {
    
  }
});