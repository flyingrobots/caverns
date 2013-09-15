(function(){
  this.Component = {
    IdCounter:0,

    register:function(componentType)
    {
      componentType.prototype.componentId = Component.IdCounter++;
    }
  };
})();