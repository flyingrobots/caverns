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

  setup:function(game)
  {
    this.game = game;
    components.forEach(function(component){
      component.setup(game);
    });
  },

  addComponent:function(componentName, component)
  {
    if (this.components[componentName])
    {
      throw "Existing component with name "+componentName;
    }
    this.components[componentName] = component;
    if (this.game != null)
    {
      component.setup(this.game);
    }
  },

  removeComponent:function(componentName)
  {
    if (!this.components[componentName])
    {
      throw "Cannot find component with name "+componentName;
    }
    component.destroy();
    delete this.components[componentName];
  },

  destroy:function()
  {
    for (componentName in components)
    {
      removeComponent(componentName);
    }
    this.game = null;
  }
});

Entity.idCounter = 0;