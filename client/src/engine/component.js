(function(){
  this.Component = {
    IdCounter:0,

    register:function(component)
    {
      component.prototype.componentId = Component.IdCounter++;
    }
  };
})();