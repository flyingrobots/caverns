var CavernsTestGame = new Class({
	Extends:Game,

    initialize: function(width, height, bgColor)
    {
    	this.parent(width, height, bgColor);

    	this.cavernWidth = 200;
    	this.cavernHeight = 200;

      // Generate cavern data
    	var generator = new CavernGenerator({
          width:this.cavernWidth, 
          height:this.cavernHeight,
          numSegments:5,
          minersStartInSegmentCenters:false,
          numWaterfalls:6,
          minerSpawnPercent:8,
          numIterations:500,
          minIslandSize:6
      });
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
          var color = 0xffffff;
          switch (tile)
          {
            case TILE_TYPE_FILLED:
              color = 0x333333;
              break;
            case TILE_TYPE_CLEAR:
              color = 0xffffff;
              break;
            case TILE_TYPE_LAVA:
              color = 0xD1262E;
              break;
            case TILE_TYPE_WATER:
              color = 0x787FDE;
              break;
            case TILE_TYPE_GRASS:
              color = 0x3AC73C;
              break;
          }
  				graphics.beginFill(color);
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