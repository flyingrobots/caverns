(function(){
  this.PixiDisplayComponent = function(displayObject)
  {
    this.initialize(displayObject);
  };

  PixiDisplayComponent.prototype = {

    displayObject:null,

    initialize:function(displayObject)
    {
      this.displayObject = displayObject;
    }
  };
  
  Component.register(PixiDisplayComponent);
})();