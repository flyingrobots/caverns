var Game = new Class({

    initialize: function()
    {
        // create an new instance of a pixi stage
		this.stage = new PIXI.Stage(0x66FF99);
		
		// create a renderer instance
		this.renderer = new PIXI.CanvasRenderer(400, 300);
		
		// add the renderer view element to the DOM
		document.body.appendChild(this.renderer.view);
		
		requestAnimFrame( animate );
		
		// create a texture from an image path
		var texture = PIXI.Texture.fromImage("content/bunny.png");

		// create a new Sprite using the texture
		this.bunny = new PIXI.Sprite(texture);
		
		// center the sprites anchor point
		this.bunny.anchor.x = 0.5;
		this.bunny.anchor.y = 0.5;
		
		// move the sprite t the center of the screen
		this.bunny.position.x = 200;
		this.bunny.position.y = 150;
		
		this.stage.addChild(this.bunny);

		var self = this
		function animate()
		{
			self.render(animate)
		}
    },

    render: function(animate)
    {
    	requestAnimFrame( animate );
		
	    // just for fun, lets rotate mr rabbit a little
	    this.bunny.rotation += 0.1;
		
	    // render the stage   
	    this.renderer.render(this.stage);
    }
});