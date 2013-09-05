var Component = new Class({
  game:null,
  owner:null,

  initialize:function()
  {

  },

  onAdded:function(game, owner)
  {
    this.game = game;
    this.owner = owner;
    this.setup();
  },

  setup:function()
  {

  },

  destroy:function()
  {

  },

  onRemoved:function()
  {
    this.destroy();
    this.ownder = null;
    this.game = null;
  }
});