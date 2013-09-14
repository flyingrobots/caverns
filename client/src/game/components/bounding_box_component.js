(function(){

  this.BoundingBoxComponent = function(options)
  {
    this.initialize(options);
  }; 

  BoundingBoxComponent.prototype = {

    initialize:function(options)
    {
      this.options = _.defaults(options || {}, {
        x:0,
        y:0,
        width:0,
        height:0
      });

      this.x = this.options.x;
      this.y = this.options.y;
      this.width = this.options.width;
      this.height = this.options.height;
    }

  };
  
  Component.register(BoundingBoxComponent);
})();