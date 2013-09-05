var State = new Class({
  game:null,

  initialize:function(options)
  {

  },

  setup:function(game)
  {
    this.game = game;
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
    this.game = null;
  }
});