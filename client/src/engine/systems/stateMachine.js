var StateMachine = new Class({ Extends:System,
  currentState:null,

  changeState:function(state)
  {
      if (this.currentState)
      {
          this.currentState.exit();
          this.currentState.destroy();
      }
      this.currentState = state;
      if (this.currentState)
      {
          this.currentState.setup(this.game);
          this.currentState.enter();
      }
  },

  update:function(dT)
  {
      if (!this.currentState)
      {
          return;
      }
      this.currentState.update(dT);
  }
});
