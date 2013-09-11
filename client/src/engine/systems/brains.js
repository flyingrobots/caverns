(function() {

  Brains = function()
  {
  };
  Brains.prototype = new System();

  Brains.prototype.brainList = [];

  Brains.prototype.addBrain = function(brain)
  {
    this.brainList.push(brain);
  };

  Brains.prototype.removeBrain = function(brain)
  {
    this.brainList.erase(brain);
  };

  Brains.prototype.update = function(dT)
  {
    this.brainList.forEach(function(brain){
      brain.update(dT);
    });
  };
})();