/*
    A system node list is a list of node objects, each containing a list of components that a system is interested in.
    The game will monitor the adding and removal of new entities and components on those entities and automatically add
    and remove nodes from registered lists. By managing node lists, systems will have prebuilt lists of component bundles to loop
    through at update time instead of having to build them anew with each update loop.

    The user passes in a contract on initialization which has the structure:
      [{Name:ComponentType},...]

    The Name key will be the key of the component in the resulting node.
    The ComponentType value of each entry should specify the class name of the component which is being added.
    
    Example:
      If the specified contract is : { position:PositionComponent, renderable:RenderableComponent }
      the resulting nodes will look like : { position:PositionComponentInstance, renderable:RenderableComponentInstance }
*/
var SystemNodeList = new Class({

  contract:null,
  nodes:[],
  entities:{},

  // Signal fired when a node is added : (nodelist, node)
  nodeAdded:null,

  // Signal fired when a node is removed : (nodelist, node)
  nodeRemoved:null,

  initialize:function(contract)
  {
    assert(contract && contract instanceof Object, "Must specify contract data object");

    this.nodeAdded = new signals.Signal();
    this.nodeRemoved = new signals.Signal();

    this.contract = [];
    Object.each(contract, function(componentType, propertyName) {
      this.contract.push({componentType:componentType, propertyName:propertyName});
    }.bind(this));
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
      Array.each(this.contract, function(contractData)
      {
        node[contractData.propertyName] = entity.getComponentByType(contractData.componentType);
      });
      this.entities[entity.id] = this.nodes.length;
      this.nodes.push(node);
      this.nodeAdded.dispatch(this, node);
    }
  },

  removeIfNotMatches:function(entity)
  {
    if (!this.matches(entity))
    {
      var idx = this.entities[entity.id];
      delete this.entities[entity.id];
      var node = this.nodes.splice(idx,1)[0];
      this.nodeRemoved.dispatch(this, node);
    }
  },

  matches:function(entity)
  {
    return Array.every(this.contract, function(contractData)
    {
      return entity.hasComponentOfType(contractData.componentType);
    });
  },

  destroy:function()
  {
    for (var node in nodes)
    {
      this.nodeRemoved.dispatch(this, node);
    }
  }
});