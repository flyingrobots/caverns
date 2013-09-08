var Entity = Class({ 

  game:null,
  components:{},
  componentList:[],
  id:0,
  name:null,

  // Signal fired when a component is added : (entity, component)
  componentAdded:new signals.Signal(),

  // Signal fired when a component is removed : (entity, component)
  componentRemoved:new signals.Signal(),

  initialize:function(data)
  {
    this.id = Entity.idCounter++;

    if (data.components)
    {
      assert(js.isObject(data.components), "Components must be an object");
      for (var componentName in data.components)
      {
        this.addComponent(componentName, data.components[componentName]);
      }
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

  addComponent:function(componentName, component)
  {
    if (this.components[componentName])
    {
      throw "Existing component with name "+componentName;
    }
    this.components[componentName] = component;
    this.componentList.push(component);
    component.onAdded();
    this.componentAdded.dispatch(this, component);
  },

  getComponentOfType:function(type)
  {
    return this.componentList.each(function(component){
      if (component instanceof type)
      {
        return component;
      }
    })
  },

  hasComponentOfType:function(type)
  {
    return Array.some(this.components, function(component){ return component instanceof type });
  },

  removeComponent:function(componentName)
  {
    var component = this.components[componentName];
    if (!component)
    {
      throw "Cannot find component with name "+componentName;
    }
    this.componentList.erase(component);
    delete this.components[componentName];
    component.onRemoved();
    this.componentRemoved.dispatch(this, component);
  },

  destroy:function()
  {

  },

  onRemoved:function()
  {
    for (componentName in components)
    {
      removeComponent(componentName);
    }
    this.destroy();
    this.game = null;
  }
});

Entity.idCounter = 0;