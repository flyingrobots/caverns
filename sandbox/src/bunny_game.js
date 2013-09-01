var BunnyGame = new Class({
	Extends:Game,

    initialize: function(width, height, bgColor)
    {
    	this.parent(width, height, bgColor)

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
    },

    render: function()
    {	
	    // just for fun, lets rotate mr rabbit a little
	    this.bunny.rotation += 0.1;
		
	    // render the stage   
	    this.parent()
    }
});