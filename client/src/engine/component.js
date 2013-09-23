(function(){

  this.Component = {

    IdCounter:0,

    register:function(componentType)
    {
      // FIXME: this does not appear to work??
      componentType.prototype.componentId = Component.IdCounter++;
    },

    registerInstance: function(component) {
      var prototype = Object.getPrototypeOf(component);
      prototype.componentId = Component.IdCounter++;
    }

  };

})();
