var CavernsTestGame = new Class({
	Extends:Game,

    initialize: function(width, height, bgColor)
    {
    	this.parent(width, height, bgColor);

    	this.cavernWidth = 200;
    	this.cavernHeight = 200;

      // Generate cavern data
    	var generator = new CavernGenerator(this.cavernWidth, this.cavernHeight);
      var cavernData = generator.generate();

      // Render cavern data
  		var cavernGfx = this.generateCavernSprite(cavernData);
      var cavernTex = new PIXI.RenderTexture(cavernGfx.width, cavernGfx.height);
      cavernTex.render(cavernGfx);
      var cavernSprite = new PIXI.Sprite(cavernTex);
  		this.stage.addChild(cavernSprite);
    },

    generateCavernSprite: function(cavernDef)
    {
    	const cellWidth = 4;
    	const cellHeight = 4;

  		var graphics = new PIXI.Graphics();
      graphics.width = cavernDef.width*cellWidth;
      graphics.height = cavernDef.height*cellHeight;

      	for (var y = 0; y <= cavernDef.height; ++y)
  		{
  			for (var x = 0; x <= cavernDef.width; ++x)
  			{
          var tile = cavernDef.tiles[x][y];
  				graphics.beginFill(tile == 1 ? 0x000000 : 0xffffff);
  				graphics.drawRect(x*cellWidth,y*cellHeight,cellWidth,cellHeight);
  			}
  		}

  		return graphics;
    },

    render: function()
    {	
	    // render the stage   
	    this.parent();
    }
});