var GenerateLevelState = new Class({ Extends:State,

    initialize:function(stage)
    {
      this.parent();
      this.stage = stage;
    },

    enter:function()
    {
      this.parent();

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

      this.levelLayer = new PIXI.DisplayObjectContainer();
      this.stage.addChild(this.levelLayer);

      this.actorLayer = new PIXI.DisplayObjectContainer();
      this.stage.addChild(this.actorLayer);

      this.generateAndRender();

      Input.registerKeyDownCallback(this, this.handleKeyDown);
    },

    handleKeyDown:function(data)
    {
      if (data.keyCode == 13 || data.keyCode == 32)
      {
        this.refresh();
      }
    },

    generateAndRender:function()
    {
      if (this.selector)
      {
        this.selector.sprite.parent.removeChild(this.selector.sprite);
        this.selector.destroy();
      }
      if (this.cavernRenderer)
      {
        this.cavernRenderer.sprite.parent.removeChild(this.cavernRenderer.sprite);
      }

      var cavernDef = this.generator.generate();
      
      this.cavernRenderer = new CavernRenderer(cavernDef);
      this.levelLayer.addChild(this.cavernRenderer.sprite);

      this.selector = new Selector(cavernDef);
      this.actorLayer.addChild(this.selector.sprite);
    },

    refresh:function()
    {
        this.currentGeneratorIndex = (this.currentGeneratorIndex + 1) % this.generators.length;
        this.generator = this.generators[this.currentGeneratorIndex];
        this.generateAndRender();
    }
});