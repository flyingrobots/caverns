(function(){

  /*
      Called by game to update entity membership.
  */
  var updateEntityMembership = function(entity)
  {
    this.nodeLists.forEach(function(nodeList)
    {
      nodeList.updateMembership(entity);
    });
  };

  /*
      Call to create a new node list.
      Fires the node list added signal to do an initial fill of the list.
  */
  var createNodeList = function(contract)
  {
    var nodeList = new SystemNodeList(contract);
    this.nodeLists = this.nodeLists || [];
    this.nodeLists.push(nodeList);
    if (_.isFunction(this.nodeAdded))
    {
      nodeList.nodeAdded.add(this.nodeAdded, this);
    }
    if (_.isFunction(this.nodeRemoved))
    {
      nodeList.nodeRemoved.add(this.nodeRemoved, this);
    }
    if (this.nodeListAdded)
    {
      this.nodeListAdded.dispatch(this, nodeList);
    }
    return nodeList;
  };

  /*
      Internal function for destroying node lists.
  */
  var destroyNodeList = function(nodeList)
  {
    if (_.isFunction(this.nodeAdded))
    {
      nodeList.nodeAdded.remove(this.nodeAdded, this);
    }
    if (_.isFunction(this.nodeRemoved))
    {
      nodeList.nodeRemoved.remove(this.nodeRemoved, this);
    }
    nodeList.destroy();
  };

  var onSystemAdded = function()
  {
    this.id = System.IdCounter++;
    this.nodeListAdded = new signals.Signal();
    js.safeInvoke(this, this.setup);
  };

  var onSystemRemoved = function()
  {
    js.safeInvoke(this, this.destroy);
    for (var nodeList in this.nodeLists)
    {
      this.destroyNodeList(nodeList);
    }
  };

  this.System = 
  {
    // FIXME: how is this used??
    IdCounter:0,

    // FIXME: this does not appear to work...
    register:function(systemType)
    {
      systemType.prototype.onAdded = onSystemAdded;
      systemType.prototype.onRemoved = onSystemRemoved;
      systemType.prototype.createNodeList = createNodeList;
      systemType.prototype.destroyNodeList = destroyNodeList;
      systemType.prototype.updateEntityMembership = updateEntityMembership;
    },

    registerInstance: function(system) {
      var prototype = Object.getPrototypeOf(system);
      prototype.onAdded = onSystemAdded;
      prototype.onRemoved = onSystemRemoved;
      prototype.createNodeList = createNodeList;
      prototype.destroyNodeList = destroyNodeList;
      prototype.updateEntityMembership = updateEntityMembership;
    }
  };

})();
