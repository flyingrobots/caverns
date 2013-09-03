var Selector = new Class({
  initialize:function(cavernDef)
  {
    this.cavernDef = cavernDef;
    this.sprite = SpriteUtils.createBox(cavernDef.tileWidth, cavernDef.tileHeight, 0xffffff, 0.9);
    this.tilePosition = {x:0,y:0};

    Input.registerKeyDownCallback(this, this.handleKeyDown);
  },

  getSelectedTile:function()
  {
    return this.cavernDef.tiles[this.tilePosition.x][this.tilePosition.y];
  },

  move:function(dX,dY)
  {
    this.tilePosition.x += dX;
    this.tilePosition.x = Math.max(0,Math.min(this.cavernDef.width-1,this.tilePosition.x));
    this.tilePosition.y += dY;
    this.tilePosition.y = Math.max(0,Math.min(this.cavernDef.height-1,this.tilePosition.y));
    this.sprite.position.x = this.tilePosition.x * this.cavernDef.tileWidth;
    this.sprite.position.y = this.tilePosition.y * this.cavernDef.tileHeight;
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
  }
});