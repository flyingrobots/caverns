(function(){
  
this.Box2dPhysicsSystem = function(physicsWorld) {
  this.initialize(physicsWorld);
}

Box2dPhysicsSystem.prototype = {
  initialize: function(physicsWorld) {
    this.world = physicsWorld;
    this.world.initialize({});
  },

  setup: function() {
    this.nodeList = this.createNodeList({
      box2dBody:Box2dBodyComponent,
      box2dShape:Box2dShapeComponent,
      transform:TransformComponent
    });
  },

  nodeAdded: function(nodelist, node) {
    var position = node.transform.position;
    var opts = {
      fixed: box2dBoxy.fixed,
      restitution: box2dBoxy.restitution,
      friction: box2dBoxy.friction,
      rotation: box2dBoxy.rotation
    };
    this.world.addBody(
      position.x, 
      position.y, 
      opts, 
      box2dShape.shapeFunc
    );
  },

  nodeRemoved: function(nodelist, node) {
    // TODO add method to physics world to remove bodies from the world 
  },

  update: function(dt) {
    this.world.tick(dt);
    this.nodeList.forEachNode(function(node) {
      var box2dPosition = node.box2dBody.getPosition();
      var box2dRotation = node.box2dBody.getRotation();
      var xform = node.transform;
      node.xform.position.x = box2dBodyPosition.x;
      node.xform.position.y = box2dBodyPosition.y;
      node.xform.rotation = box2dRotation;
    });
  }
}

System.register(Box2dPhysicsSystem);

})();
