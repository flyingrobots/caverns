(function(){
  this.Entity = function(options)
  {
    options = options || {}

    this.id = Entity.IdCounter++;

    this.componentAdded = new signals.Signal();
    this.componentRemoved = new signals.Signal();

    if (options.components)
    {
      assert(_.isArray(options.components), "Components must be an array");

      _.each(options.components, function(component) {
        this.addComponent(component);
      });
    }
  };

  Entity.IdCounter = 0;

  Entity.prototype = {
    game:null,
    components:{},
    id:0,
    name:null,

    // Signal fired when a component is added : (entity, component)
    componentAdded:null,

    // Signal fired when a component is removed : (entity, component)
    componentRemoved:null,

    initialize:function(options)
    {
      
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
        throw "Existing component with id "+componentId;
      }
      this.components[component.componentId] = component;
      js.safeInvoke(component, component.setup);
      this.componentAdded.dispatch(this, component);
    },

    getComponentById:function(id)
    {
      return this.components[id];
    },

    hasComponentOfType:function(id)
    {
      return this.components[id] != null;
    },

    removeComponent:function(component)
    {
      return removeComponentById(component.name);
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