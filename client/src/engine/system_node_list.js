/*
    A system node list is a list of node objects, each containing a list of components that a system is interested in.
    The game will monitor the adding and removal of new entities and components on those entities and automatically add
    and remove nodes from registered lists. By managing node lists, systems will have prebuilt lists of component bundles to loop
    through at update time instead of having to build them anew with each update loop.

    The user passes in a contract on initialization which has the structure:
      [{ComponentType:Name},...]

    The ComponentType key of each entry should specify the class name of the component which is being added.
    The Name value will be the key of the component in the resulting node.

    Example:
      If the specified contract is : { PositionComponent:position, RenderableComponent:renderable }
      the resulting nodes will look like : { position:PositionComponentInstance, renderable:RenderableComponentInstance }
*/
var SystemNodeList = new Class({

  contract:null,
  nodeList:[],
  entityList:{},

  // Signal fired when a node is added : (nodelist, node)
  nodeAdded:new signals.Signal(),

  // Signal fired when a node is removed : (nodelist, node)
  nodeRemoved:new signals.Signal(),

  initialize:function(contract)
  {
    assert(contract && contract instanceof Object, "Must specify contract data object");

    this.contract = [];
    for (var componentTypeName in contract)
    {
      var componentType = stringToFunction(componentTypeName);
      var propertyName   = contract[componentTypeName];
      this.contract.push({componentType:componentType, propertyName:propertyName});
    }
  },

  updateMembership:function(entity)
  {
    // Add if matches
    if (this.entities[entity.id] == null)
    {
      this.addIfMatches(entity);
    }
    else
    {
      this.removeIfNotMatches(entity);
    }
  },

  addIfMatches:function(entity)
  {
    if (this.matches(entity))
    {
      var node = {};
      for (var contractData in this.contract)
      {
        node[contractData.propertyName] = entity.getComponentByType(contractData.componentType);
      }
      this.entities[entity.id] = this.nodeList.length;
      this.nodeList.push(node);
      this.nodeAdded.dispatch(this, node);
    }
  },

  removeIfNotMatches:function(entity)
  {
    if (!this.matches(entity))
    {
      var idx = this.entities[entity.id];
      delete this.entities[entity.id];
      var node = this.nodeList.splice(idx,1)[0];
      this.nodeRemoved.dispatch(this, node);
    }
  },

  matches:function(entity)
  {
    for (var contractData in this.contract)
    {
      if (!entity.hasComponentOfType(contractData.componentType))
      {
        return false;
      }
    }
    return true;
  },

  destroy:function()
  {
    for (var node in nodeList)
    {
      this.nodeRemoved.dispatch(this, node);
    }
  }
});