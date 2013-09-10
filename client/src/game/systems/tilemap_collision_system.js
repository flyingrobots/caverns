var TilemapCollisionSystem = new Class({Extends:System,

  initialize:function()
  {
    this.parent();
    /*this.colliderNodes = this.createNodeList({
      lastXform:PreviousTransformComponent,
      xform:TransformComponent,
      aabb:BoundingBoxComponent,
      collider:TilemapCollisionComponent
    });
    this.levelNodes = this.createNodeList({
      data:LevelDataComponent
    });*/
  },

  update:function(dT)
  {/*
    if (!this.levelNodes.length || !this.colliderNodes.length)
    {
      return;
    }
    assert(this.levelNodes.length == 1);
    var levelData = this.levelNodes[0].data;
    this.colliderNodes.forEachNode(function(node)
    {
      var dX = node.xform.x - node.previousXform.x;
      var dY = node.xform.y - node.previousXform.y;
      var result = this.collide(node.previousXform, node.aabb, dX, dY, levelData);
      node.xform.x = result.x;
      node.xform.y = result.y;
    });*/
  },
/*
  collide:function(xform, aabb, dX, dY, levelData)
  {
    // Idea -- Break object's AABB into n number of points which will give us the testing fidelity we need
    // For each point, generate a line segment by using the previous transform and applying the movement vector.
    // Use the bresenham line algorithm to step the tilemap and find look for points where the vectors intersect
    // the tile data.
    // Allow the bounding box to move only by the shortest intersected line segment!

    //Returns the new x and y coordinate of entity

    // Doesn't currently support rotation

    var x = xform.x+aabb.x;
    var y = xform.y+aabb.y;
    var w = aabb.width;
    var h = aabb.height;

    var points = [
      {x:x,   y:y},   //Top-Left
      {x:x+w, y:y},   //Top-Right
      {x:x+w, y:y+h}, //Bot-Right
      {x:x,   y:y+h}  //Bot-Left
    ];

    var minStepsX = Number.MAX_VALUE;
    var minStepsY = Number.MAX_VALUE;
    var intersected = false;
    points.forEach(function(p)
    {
      var result = this.lineIntersect(p.x,p.y,Math.floor(p.x+dX),Math.floor(p.y+dY));
      intersected |= result.intersected;
      minStepsX = Math.min(minStepsX, Math.abs(result.x-p.x));
      minStepsY = Math.min(minStepsY, Math.abs(result.y-p.y));
    });

    var result = {x:xform.x+dX,y:xform.y+dY};
    if (intersected)
    {
      result.x = xform.x + minStepsX*levelData.tileWidth;
      result.y = xform.y + minStepsY*levelData.tileHeight;
    }
    return result;
  },

  // ** Bresenham for reals! **
  // Return the last tile that didn't intersect the map
  lineIntersect:function(x0, y0, x1, y1, tilemap) 
  {
    var dx = Math.abs(x1-x0);
    var dy = Math.abs(y1-y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx-dy;

    // Previous x and y coords
    var xP=x0;
    var yP=y0;

    while(true)
    {
      xP = x0;
      yP = y0;

      if ((x0==x1) && (y0==y1)) break;
      var e2 = 2*err;
      if (e2 >-dy){ err -= dy; x0  += sx; }
      if (e2 < dx){ err += dx; y0  += sy; }

      //If colliding, break
      if (x0 < 0 || y0 < 0 || x0 >= tilemap.width || y0 >= tilemap.height || tilemap.isBlocking(x0,y0))
      {
        x0 = xP;
        y0 = yP;
        break;
      }
    }
    return {x:x0, y:y0, intersected:(x0 != x1 || y0 != y1)};
  }*/
});