(function(){
  this.Entity = function(options)
  {
    this.initialize(options);
  };

  Entity.IdCounter = 0;

  Entity.prototype = {

    initialize:function(options)
    {
      this.components = {};

      options = options || {}

      this.id = Entity.IdCounter++;

      this.componentAdded = new signals.Signal();
      this.componentRemoved = new signals.Signal();

      if (options.components)
      {
        assert(_.isArray(options.components), "Components must be an array");

        _.each(options.components, function(component) {
          this.addComponent(component);
        }.bind(this));
      }
    },

    onAdded:function(game)
    {
      this.game = game;
      this.setup();
    },

    setup:function()
    {

    },

    addComponent:function(component)
    {
      if (component.componentId == undefined)
      {
        throw "Component not registered";
      }
      if (this.components[component.componentId])
      {
        throw "Existing component with id " + component.componentId;
      }
      this.components[component.componentId] = component;
      js.safeInvoke(component, component.setup);
      this.componentAdded.dispatch(this, component);
    },

    getComponent:function(componentType)
    {
      return this.components[componentType.prototype.componentId];
    },

    hasComponent:function(componentType)
    {
      return this.components[componentType.prototype.componentId] != null;
    },

    removeComponent:function(component)
    {
      return this.removeComponentById(component.componentId);
    },

    removeComponentByType:function(componentType)
    {
      return this.removeComponentById(componentType.prototype.componentId);
    },

    removeComponentById:function(id)
    {
      var component = this.components[id];
      if (!component)
      {
        throw "Cannot find component with id "+id;
      }
      delete this.components[id];
      js.safeInvoke(component, component.destroy);
      this.componentRemoved.dispatch(this, component);
    },

    destroy:function()
    {

    },

    onRemoved:function()
    {
      for (var componentId in components)
      {
        removeComponentById(componentId);
      }
      this.destroy();
      this.game = null;
    }
  };
})();