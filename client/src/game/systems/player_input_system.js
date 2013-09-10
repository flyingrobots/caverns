var PlayerInputSystem = new Class({Extends:System,

  initialize:function(input)
  {
    this.parent();
    this.input = input;

    this.playerNodesList = this.createNodeList({
      player:PlayerComponent,
      kinetics:KineticsComponent
    })
  },

  update:function(dT)
  {
    var pressingLeft  = this.input.isKeyDown(65) || this.input.isKeyDown(37);
    var pressingRight = this.input.isKeyDown(68) || this.input.isKeyDown(39);
    var pressingUp    = this.input.isKeyDown(87) || this.input.isKeyDown(38);
    var pressingDown  = this.input.isKeyDown(83) || this.input.isKeyDown(40);

    this.playerNodesList.forEachNode(function(node){
      var kinetics = node.kinetics;

      var targetSpeed = {
        x:-1*(pressingLeft?1:0) + 1*(pressingRight?1:0),
        y:-1*(pressingUp?1:0) + 1*(pressingDown?1:0),
      };
      targetSpeed.x *= kinetics.maxSpeed.x;
      targetSpeed.y *= kinetics.maxSpeed.y;
      var dX = targetSpeed.x - kinetics.speed.x;
      var dY = targetSpeed.y - kinetics.speed.y;
      var dirX = dX?dX<0?-1:1:0;
      var dirY = dY?dY<0?-1:1:0;
      kinetics.setSpeed(kinetics.speed.x+kinetics.acceleration.x*dirX*dT,
                        kinetics.speed.y+kinetics.acceleration.y*dirY*dT);
    });
  }

});