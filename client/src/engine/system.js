var System = new Class({ Implements:Options,

  options:
  {
    priority:0,
  },

  _priority:0, 
  nodeLists:[],
  game:null,

  get priority() { return this._priority; },
  set priority(value) 
  { 
    if (this._priority == value)
    {
      return;
    }
    this._priority = value; 
    this.priorityChanged.dispatch();
  },

  // Signal fired when a system's priority changes : ()
  priorityChanged:new signals.Signal(),

  // Signal fired when a system adds a node list : (nodeList)
  nodeListAdded:new signals.Signal(),
  
  initialize: function(options)
  {
    this.setOptions(options);
    this.priority = priority;
  },

  /*
      Call to create a new node list.
      Fires the node list added signal to do an initial fill of the list.
  */
  createNodeList:function(contract)
  {
    var nodeList = new SystemNodeList(contract);
    this.nodeLists.push(nodeList);
    nodeList.nodeAdded.add(this.nodeAdded.bind(this));
    nodeList.nodeRemoved.add(this.nodeRemoved.bind(this));

    this.nodeListAdded.dispatch(nodeList);
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
  nodeAdded:function(node)
  {

  },

  /*
      Called once a frame when the game updates.
  */
  update:function(dT)
  {

  },

  /*
      Called when a node is removed from any node list which the system manages.
  */
  nodeRemoved:function(node)
  {

  },

  /*  
      Called when the system is removed from the game.
  */
  destroy:function()
  {

  },

  /*  
      Called by the game when the system is removed.
      Do not override!
  */
  onRemoved: function()
  {
    this.destroy();
    this.game = null;
  }
});