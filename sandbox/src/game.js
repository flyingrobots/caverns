var Game = new Class({

    initialize: function(width, height, bgColor, useCanvas)
    {
  		bgColor = bgColor || 0x66FF99

      // create an new instance of a pixi stage
  		this.stage = new PIXI.Stage(bgColor);
		
  		// create a renderer instance
      if (useCanvas) {
    		this.renderer = new PIXI.CanvasRenderer(width, height);
      } else {
        this.renderer = new PIXI.autoDetectRenderer(width, height, null, false, true);
      }
		
  		// add the renderer view element to the DOM
  		document.body.appendChild(this.renderer.view);
    },

    render: function()
    {	
	    // render the stage   
	    this.renderer.render(this.stage);
    }
});
