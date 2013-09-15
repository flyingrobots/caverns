(function(){

  this.KineticsComponent = function(options)
  {
    this.initialize(options);
  }

  KineticsComponent.prototype = {

    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        speed:{x:0,y:0},
        maxSpeed:{x:0,y:0},
        acceleration:{x:0,y:0}
      });

      this.speed = {x:this.options.speed.x, y:this.options.speed.y};
      this.maxSpeed = {x:this.options.maxSpeed.x, y:this.options.maxSpeed.y};
      this.acceleration = {x:this.options.acceleration.x, y:this.options.acceleration.y};
    },

    setSpeed:function(x,y)
    {
      this.speed.x = Math.max(-this.maxSpeed.x,Math.min(this.maxSpeed.x, x));
      this.speed.y = Math.max(-this.maxSpeed.y,Math.min(this.maxSpeed.y, y));
    }
  };

  Component.register(KineticsComponent);
})();