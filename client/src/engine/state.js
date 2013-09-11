(function() {

  this.State = function()
  {
    this.initialize();
  };

  State.prototype.game = null;

  State.prototype.initialize = function(options)
  {

  };

  State.prototype.onAdded = function(game)
  {
    this.game = game;
    this.setup();
  };

  State.prototype.setup = function()
  {

  };

  State.prototype.enter = function()
  {

  };

  State.prototype.update = function(dT)
  {

  };

  State.prototype.exit = function()
  {

  };

  State.prototype.destroy = function()
  {

  };

  State.prototype.onRemoved = function()
  {
    this.destroy();
    this.game = null;
  };
})();