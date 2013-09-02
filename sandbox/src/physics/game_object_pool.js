//-----------------------------------------------------------------------------
var addObjectToPool = function(gameObjectPool, type, object) {
  object.type = type;
  object.id = ++gameObjectPool.lastid;
  gameObjectPool.pool.push(object);
  return object;
}

///////////////////////////////////////////////////////////////////////////////
var GameObjectPool = new Class({
  //---------------------------------------------------------------------------
  initialize: function(game) {
    this.game = game;
    this.pool = [];
    this.lastid = 0;
  },
  //---------------------------------------------------------------------------
  addBoxObject: function(x, y, width, height, color, fixed) {
    return addObjectToPool(this, "box", {
      "physics": this.game.physics.addBox(x, y, width, height, fixed),
      "sprite": this.game.graphics.addBoxSprite(x, y, width, height, color)
    });
  },
  //---------------------------------------------------------------------------
  forEach: function(callback) {
    this.pool.forEach(callback);
  }
});
