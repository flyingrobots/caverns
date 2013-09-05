var State = new Class({
  game:null,

  initialize:function(options)
  {

  },

  onAdded:function(game)
  {
    this.game = game;
    this.setup();
  },

  setup:function()
  {

  },

  enter:function()
  {

  },

  update:function(dT)
  {

  },

  exit:function()
  {

  },

  destroy:function()
  {

  },

  onRemoved:function()
  {
    this.destroy();
    this.game = null;
  }
});