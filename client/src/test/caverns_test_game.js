var CavernsTestGame = new Class({
	Extends:Game,

    initialize: function(width, height, bgColor)
    {
    	this.parent(width, height, bgColor, true);

      this.addSystem("world", new World());
      this.addSystem("brains", new Brains());
      this.addSystem("states", new States());

      this.systems.states.changeState(new GenerateLevelState(this.stage));
    },

    render: function()
    {	
	    // render the stage   
	    this.parent();
    }
});