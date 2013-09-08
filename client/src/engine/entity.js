var Entity = Class({ 

  game:null,
  components:{},
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
    component.onAdded();
    this.componentAdded.dispatch(this, component);
  },

  removeComponent:function(componentName)
  {
    if (!this.components[componentName])
    {
      throw "Cannot find component with name "+componentName;
    }
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