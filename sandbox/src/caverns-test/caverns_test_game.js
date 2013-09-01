var CavernsTestGame = new Class({
	Extends:Game,

    initialize: function(width, height, bgColor)
    {
    	this.parent(width, height, bgColor);

    	this.cavernWidth = 200;
    	this.cavernHeight = 200;

      // Generate cavern data
    	var minerGenerator = new CavernGeneratorMiner({
          width:this.cavernWidth, 
          height:this.cavernHeight,
          numSegments:5,
          numStartingMinersPerSegment:2,
          minersStartInSegmentCenters:true,
          numWaterfalls:6,
          minerSpawnPercent:8,
          numIterations:500,
          minIslandSize:6,
          smoothNumIterations:2,
          smoothBornList:[4,5,6,7,8],
          smoothSurviveList:[4,5,6,7,8]
      });
      var automataGenerator = new CavernGeneratorAutomata({
          width:this.cavernWidth, 
          height:this.cavernHeight,
          generateCellSize:2,
          generateNumIterations:8,
          generateNumSplotches:20,
          generateMinSplotchSizePercent:5,
          generateMaxSplotchSizePercent:15,
          smoothCellSize:1,
          smoothNumIterations:2
      });

      this.generators = [minerGenerator, automataGenerator];
      this.currentGeneratorIndex = 0;
      this.generator = this.generators[this.currentGeneratorIndex];

      this.generateAndRender();
    },

    generateAndRender:function()
    {
      if (this.cavernRenderer != null)
      {
        this.stage.removeChild(this.cavernRenderer.getSprite());
      }
      var cavernDef = this.generator.generate();
      this.cavernRenderer = new CavernRenderer(cavernDef);
      this.stage.addChild(this.cavernRenderer.getSprite());
    },

    onKeyPress:function(keyCode)
    {
      if (keyCode == 13)
      {
        this.currentGeneratorIndex = (this.currentGeneratorIndex + 1) % this.generators.length;
        this.generator = this.generators[this.currentGeneratorIndex];
        this.generateAndRender();
      }
    },

    render: function()
    {	
	    // render the stage   
	    this.parent();
    }
});