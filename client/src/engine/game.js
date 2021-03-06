// game.js
// Created by chippolot and flyingrobots
(function() {

var _isPaused = false;
var _ticker = null;

var _startGameLoop = function (game) {
  var frequency = 1.0 / 30.0;
  var gameLoop = function() {
    game.tick(frequency);
  }
  _ticker = window.setInterval(gameLoop, frequency * 1000.0);
}

var _demoObjects = [];
var _wireframe = true;

this.Game = function(options)
{
  this.initialize(options);
};

Game.prototype = {

  initialize:function(options) {
    this.options = _.defaults(options || {}, {
      graphics:{}
    });

    this.timeScale = 1.0;
    this.stateMachine = new StateMachine();
    this.world = new World(this);
    //this.physicsWorld = new PhysicsWorld(); // TODO move to level

    Graphics.initialize(this.options.graphics);
    SystemRegistry.initialize(this.world);
  },

  pause:function() {
    _isPaused = true;
  },

  resume:function() {
    _isPaused = false;
  },

  isPaused:function() {
    return _isPaused;
  },

  stop:function() {
    window.clearInterval(_ticker);
  },

  tick:function(dT) {
    var timeStep = dT * this.timeScale;

    // FIXME this should perhaps be a System?
    //this.physicsWorld.tick(dT);

    SystemRegistry.tick(timeStep);

    // FIXME move this into a 'physicsTest' game state:
    /*_demoObjects.forEach(function(object) {
      var bodyPos = object.body.GetCenterPosition();
      var bodyRot = object.body.GetRotation();

      if (bodyPos.y > document.height || bodyPos.y < -3 || bodyPos.x < 0 || bodyPos.x > document.width) {
        var p = new b2Vec2();
        p.Set(js.randomInteger(0, document.width), 0.0);
        object.body.SetOriginPosition(p, bodyRot);
        var v = new b2Vec2();
        v.SetZero();
        object.body.SetLinearVelocity(v);
      }

      object.sprite.position.x = bodyPos.x;
      object.sprite.position.y = bodyPos.y;
      object.sprite.rotation = bodyRot;
    });*/

    Graphics.draw();
  },

  start:function() {
    _startGameLoop(this);

    /*
    // FIXME move this into a 'physicsTest' game state:
    var physicsWorld = this.physicsWorld;

    var randomPosition = function() {
      var p = new b2Vec2();
      p.Set(
        js.randomInteger(0, document.width), 
        js.randomInteger(0, document.height)
      );
      return p;
    }

    var createDemoBox = function() {
      var fixed = js.randomInteger(0, 4) == 1;

      var pos = randomPosition();
      
      var size = new b2Vec2();
      size.Set(
        js.randomInteger(30, 50),
        js.randomInteger(30, 50)
      );

      if (fixed) {
        size.x *= 7.0;
        size.h *= 0.5;
      }
      
      var color = (fixed) ? 0x6199cc : 0xc96161;
      
      var physicsOpts = {
        rotation: (fixed) ? js.randomReal(0.0, 6.28) : 0,
        fixed: fixed,
        restitution: (fixed) ? 1.0 : js.randomReal(0.1, 0.6)
      };

      var graphicsOpts = {
        transient: false,
        wireframe: true,
        color: color
      };

      return {
        body: physicsWorld.createBoxBody(pos.x, pos.y, size.x, size.y, physicsOpts),
        sprite: Graphics.addDebugBox(size.x, size.y, graphicsOpts)
      };
    }

    var createDemoCircle = function() {
      var pos = randomPosition();
      var radius = js.randomInteger(15, 45);
      var graphicsOpts = {
        transient: false,
        wireframe: true,
        color: 0x72B897
      };
      return {
        body: physicsWorld.createCircleBody(pos.x, pos.y, radius),
        sprite: Graphics.addDebugCircle(radius, graphicsOpts)
      }
    }

    js.times(Math.round(document.width / 50), function(n) {
      _demoObjects.push(createDemoBox());
    });
    js.times(Math.round(document.height / 50), function(n) {
      _demoObjects.push(createDemoCircle());
    });

    // warm up the physics sim (we created bodies of random size in random
    // positions, so they are likely overlapping. This resolves some of these
    // collisions, making the demo look cooler when it starts drawing).
    js.times(15, function(n) {
      physicsWorld.tick(1/30);
    });
    
    Graphics.enableDebugSprites();*/
  }
};
})();
