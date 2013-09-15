(function(){
  this.StateMachine = function()
  {
    this.initialize();
  };

  StateMachine.prototype = 
  {
    initialize:function()
    {
      this.currentState = null;
    },

    changeState:function(state)
    {
      if (this.currentState)
      { 
        js.safeInvoke(this.currentState, this.currentState.exit);
        js.safeInvoke(this.currentState, this.currentState.destroy);
      }
      this.currentState = state;
      if (this.currentState)
      {
        js.safeInvoke(this.currentState, this.currentState.setup, game);
        js.safeInvoke(this.currentState, this.currentState.enter);
      }
    },

    update:function(dt)
    {
      if (!this.currentState)
      {
        return;
      }
      js.safeInvoke(this.currentState, this.currentState.update, dt);
    }
  }
})();