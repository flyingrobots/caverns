var CavernsTestGame = new Class({
	Extends:Game,

    initialize: function(width, height, bgColor)
    {
    	this.parent(width, height, bgColor);

    	this.cavernWidth = 200;
    	this.cavernHeight = 200;

      // Generate cavern data
    	var generator = new CavernGeneratorMiner({
          width:this.cavernWidth, 
          height:this.cavernHeight,
          numSegments:5,
          minersStartInSegmentCenters:false,
          numWaterfalls:6,
          minerSpawnPercent:8,
          numIterations:500,
          minIslandSize:6
      });
      var cavernDef = generator.generate();

      // Render cavern data
  		var cavernRenderer = new CavernRenderer(cavernDef);
  		this.stage.addChild(cavernRenderer.getSprite());
    },

    render: function()
    {	
	    // render the stage   
	    this.parent();
    }
});