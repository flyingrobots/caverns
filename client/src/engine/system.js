var System = new Class({ Implements:Options,

  options:
  {
  },

  nodeLists:[],
  game:null,
  id:0,

  // Signal fired when a system adds a node list : (system, nodeList)
  nodeListAdded:null,

  initialize: function(options)
  {
    this.setOptions(options);

    this.id = System.IdCounter++;
    this.nodeListAdded = new signals.Signal();
  },

  /*
      Called by game to update entity membership.
  */
  updateEntityMembership:function(entity)
  {
    this.nodeLists.forEach(function(nodeList)
    {
      nodeList.updateMembership(entity);
    });
  },

  /*
      Call to create a new node list.
      Fires the node list added signal to do an initial fill of the list.
  */
  createNodeList:function(contract)
  {
    var nodeList = new SystemNodeList(contract);
    this.nodeLists.push(nodeList);
    nodeList.nodeAdded.add(this.nodeAdded, this);
    nodeList.nodeRemoved.add(this.nodeRemoved, this);
    this.nodeListAdded.dispatch(this, nodeList);
    return nodeList;
  },

  /*  
      Called by the game when the system is added.
      Do not override!
  */
  onAdded: function(game)
  {
    this.game = game;
    this.setup();
  },

  /*  
      Called when the system is added to the game.
  */
  setup:function()
  {

  },

  /*
      Called when a node is added to any node list which the system manages.
  */
  nodeAdded:function(nodelist, node)
  {

  },

  /*
      Define functions in concrete classes for :
        - preUpdate(dT)
        - update(dT)
        - postUpdate(dT)
  */

  /*
      Called when a node is removed from any node list which the system manages.
  */
  nodeRemoved:function(nodelist, node)
  {

  },

  /*  
      Called when the system is removed from the game.
  */
  destroy:function()
  {
  },

  /*
      Internal function for destroying node lists.
  */
  destroyNodeList:function(nodeList)
  {
    nodeList.nodeAdded.remove(this.nodeAdded, this);
    nodeList.nodeRemoved.remove(this.nodeRemoved, this);
    nodeList.destroy();
  },

  /*  
      Called by the game when the system is removed.
      Do not override!
  */
  onRemoved: function()
  {
    this.destroy();
    for (var nodeList in this.nodeLists)
    {
      this.destroyNodeList(nodeList);
    }
    this.game = null;
  }
});
System.IdCounter = 0;
