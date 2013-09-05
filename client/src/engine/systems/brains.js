var Brains = new Class({Extends:System,
  brainList:[],

  addBrain:function(brain)
  {
    this.brainList.push(brain);
  },

  removeBrain:function(brain)
  {
    this.brainList.erase(brain);
  },

  update:function(dT)
  {
    this.brainList.forEach(function(brain){
      brain.update(dT);
    });
  }
});