var Entity = new Class({

  game:null,
  components:{},
  componentList:[],
  id:0,
  name:null,

  // Signal fired when a component is added : (entity, component)
  componentAdded:null,

  // Signal fired when a component is removed : (entity, component)
  componentRemoved:null,

  initialize:function(options)
  {
    options = options || {}

    this.id = Entity.idCounter++;

    this.componentAdded = new signals.Signal();
    this.componentRemoved = new signals.Signal();

    if (options.components)
    {
      assert(js.isObject(options.components), "Components must be an object");
      for (var componentName in options.components)
      {
        this.addComponent(componentName, options.components[componentName]);
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
    component.name = componentName;
    this.components[componentName] = component;
    this.componentList.push(component);
    component.onAdded();
    this.componentAdded.dispatch(this, component);
  },

  getComponentByType:function(type)
  {
    return this.componentList.each(function(component) {
      if (component instanceof type)
      {
        return component;
      }
    })
  },

  hasComponentOfType:function(type)
  {
    return Array.some(this.componentList, function(component) { 
      return component instanceof type;
    });
  },

  removeComponent:function(component)
  {
    var idx = Array.indexOf(this.componentList, component);
    if (idx == -1)
    {
      throw "Cannot find component";
    }
    return removeComponentByName(component.name);
  },

  removeComponentByName:function(componentName)
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