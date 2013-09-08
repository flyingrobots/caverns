var Entity = Class({ 
  game:null,
  components:{},
  id:0,
  name:null,

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
  },

  removeComponent:function(componentName)
  {
    if (!this.components[componentName])
    {
      throw "Cannot find component with name "+componentName;
    }
    component.onRemoved();
    delete this.components[componentName];
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