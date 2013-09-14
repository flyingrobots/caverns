(function(){
  this.TransformComponent = function(options)
  {
    this.initialize(options);
  };
  
  TransformComponent.prototype = {

    position:{x:0,y:0},
    scale:{x:1,y:1},
    rotation:0,

    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {  
        position:{x:0,y:0},
        scale:{x:1,y:1},
        rotation:0
      });
      this.setData(this.options);
    },

    setData:function(data)
    {
      this.position = {x:data.position.x, y:data.position.y};
      this.scale    = {x:data.scale.x, y:data.scale.y};
      this.rotation = data.rotation;
    }
  };
  
  Component.register(TransformComponent);
})();