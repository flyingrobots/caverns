var Game = new Class({

    initialize: function(width, height, bgColor)
    {
		bgColor = bgColor || 0x66FF99

        // create an new instance of a pixi stage
		this.stage = new PIXI.Stage(bgColor);
		
		// create a renderer instance
		this.renderer = new PIXI.CanvasRenderer(width, height);
		
		// add the renderer view element to the DOM
		document.body.appendChild(this.renderer.view);
    },

    render: function()
    {	
	    // render the stage   
	    this.renderer.render(this.stage);
    }
});