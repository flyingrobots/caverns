var System = new Class({
  game:null,
  
  initialize: function()
  {
    
  },

  onAdded: function(game)
  {
    this.game = game;
    this.setup();
  },

  setup:function()
  {

  },

  preUpdate:function(dT)
  {

  },

  update:function(dT)
  {

  },

  postUpdate:function(dT)
  {

  },

  destroy:function()
  {

  },

  onRemoved: function()
  {
    this.destroy();
    this.game = null;
  }
});