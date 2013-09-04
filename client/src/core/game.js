var Game = new Class({

    paused:false,
    timeScale:1.0,
    systems:{},
    lastTime:0,
    elapsedTime:0,
    world:null,
    stage:null,

    initialize: function(width, height, bgColor, useCanvas)
    {
      bgColor = bgColor || 0x66FF99;
      useCanvas = useCanvas || false;

      Input.initialize();

      // create an new instance of a pixi stage
      this.stage = new PIXI.Stage(bgColor);
    
      // create a renderer instance
      if (useCanvas) {
        this.renderer = new PIXI.CanvasRenderer(width, height);
      } else {
        this.renderer = new PIXI.autoDetectRenderer(width, height, null, false, false);
      }
    
      // add the renderer view element to the DOM
      document.body.appendChild(this.renderer.view);

      this.lastTime = new Date();

      requestAnimFrame(animate);

      function animate()
      {
        requestAnimFrame(animate);

        // Find elapsed game time
        var curTime = new Date().getTime();
        this.elapsedTime = (curTime - this.lastTime)/1000.0;
        this.elapsedTime *= this.timeScale;
        this.lastTime = curTime;

        game.update(this.elapsedTime);
        game.render(this.elapsedTime);
      }
    },

    addSystem:function(systemName, system)
    {
      if (this.systems[systemName])
      {
        throw "Existing system with name "+systemName;
      }
      this.systems[systemName] = system;
      system.setup(game);
    },

    removeSystem:function(systemName)
    {
      if (!this.systems[systemName])
      {
        throw "Cannot find system with name "+systemName;
      }
      system.destroy();
      delete this.systems[systemName];
    },

    update: function(dT)
    {
      for (var systemName in this.systems)
      {
        var system = this.systems[systemName];
        system.preUpdate(dT);
        system.update(dT);
        system.postUpdate(dT);
      }
    },

    render: function(dT)
    { 
      // render the stage   
      this.renderer.render(this.stage);
    },

    destroy:function()
    {
      for (var systemName in this.systems)
      {
        removeSystem(systemName);
      }
      this.systems = null;
    }
});
