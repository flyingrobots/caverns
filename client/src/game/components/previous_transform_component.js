(function(){
  
  this.PreviousTransformComponent = function(options)
  {
    TransformComponent.prototype.initialize.call(this, options);
  };
  PreviousTransformComponent.prototype = new TransformComponent;

  Component.register(PreviousTransformComponent);
})();