(function(){
  this.PixiDisplayComponent = function(displayObject)
  {
    this.initialize(displayObject);
  };

  PixiDisplayComponent.prototype = {

    initialize:function(displayObject)
    {
      this.displayObject = displayObject;
    }
  };
  
  Component.register(PixiDisplayComponent);
})();