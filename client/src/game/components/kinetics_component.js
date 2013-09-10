var KineticsComponent = new Class({ Extends:Component, Implements:Options,

  options:
  {
    speed:{x:0,y:0},
    maxSpeed:{x:0,y:0},
    acceleration:{x:0,y:0}
  },

    speed:{x:0,y:0},
    maxSpeed:{x:0,y:0},
    acceleration:{x:0,y:0},

  initialize:function(options)
  {
    this.setOptions(options);

    this.speed.x = this.options.speed.x;
    this.speed.y = this.options.speed.y;
    this.maxSpeed.x = this.options.maxSpeed.x;
    this.maxSpeed.y = this.options.maxSpeed.y;
    this.acceleration.x = this.options.acceleration.x;
    this.acceleration.y = this.options.acceleration.y;
  },

  setSpeed:function(x,y)
  {
    this.speed.x = Math.max(-this.maxSpeed.x,Math.min(this.maxSpeed.x, x));
    this.speed.y = Math.max(-this.maxSpeed.y,Math.min(this.maxSpeed.y, y));
  }
});