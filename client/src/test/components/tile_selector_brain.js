var TileSelectorBrain = new Class({ Extends:Brain,

  levelDefinition:null,

	setup:function()
  {
    assert(game.states.currentState.definition != null);
    this.levelDefinition = game.states.currentState.definition;

    Input.registerKeyDownCallback(this, this.handleKeyDown);
  },

  getSelectedTile:function()
  {
    return this.levelDefinition.tiles[this.tilePosition.x][this.tilePosition.y];
  },

  move:function(dX,dY)
  {
    var tilePosition = this.owner.components.tilePosition;
    var renderer = this.owner.compoenents.renderer;

    tilePosition.x += dX;
    tilePosition.x = Math.max(0,Math.min(this.levelDefinition.width-1,tilePosition.x));
    tilePosition.y += dY;
    tilePosition.y = Math.max(0,Math.min(this.levelDefinition.height-1,tilePosition.y));
    renderer.setPosition(tilePosition.x * this.levelDefinition.tileWidth, tilePosition.y * this.levelDefinition.tileHeight);
  },

  handleKeyDown:function(data)
  {
    switch (data.keyCode)
    {
      case 87:
        this.move(0,-1);
      break;
      case 65:
        this.move(-1,0);
      break;
      case 83:
        this.move(0,1);
      break;
      case 68:
        this.move(1,0);
      break;
      case 80:
        console.log(this.getSelectedTile());
      break;
    }
  },

  destroy:function()
  {
    Input.unregisterAllCallbacks(this);

    this.parent();
  }
});