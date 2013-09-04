var Brain = new Class({Extends:Component,
	initialize:function()
  {
    this.parent();
  },

  setup:function(game)
  {
    this.parent(game);
    this.game.systems.brains.addBrain(this);
  },

  update:function(dT)
  {

  },

  destroy:function()
  {
    this.game.systems.brains.removeBrain(this);
    this.parent();
  }
});