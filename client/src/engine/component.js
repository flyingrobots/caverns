var Component = new Class({
  initialize:function()
  {

  },

  setup:function(game)
  {
    this.game = game;
  },

  destroy:function()
  {
    this.game = null;
  }
});