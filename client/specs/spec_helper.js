(function(){

  function SpecHelper() {

  }

  SpecHelper.prototype.expectSystemAPI = function(obj) {
    expect(_.isFunction(obj.onAdded)).toBe(true);
    expect(_.isFunction(obj.onRemoved)).toBe(true);
    expect(_.isFunction(obj.createNodeList)).toBe(true);
    expect(_.isFunction(obj.destroyNodeList)).toBe(true);
    expect(_.isFunction(obj.updateEntityMembership)).toBe(true);
  }

  SpecHelper.prototype.expectComponentAPI = function(obj) {
   expect(_.isNumber(obj.componentId)).toBe(true); 
  }

  SpecHelper.prototype.createPhysicsWorldSpy = function() {
    var world = {
      initialize: function(opts) {},
      addBody: function(x, y, opts, shapeFunc) {},
      tick: function(dt) {}
    };

    spyOn(world, 'initialize');
    spyOn(world, 'addBody');
    spyOn(world, 'tick');

    return world;
  }

  this.SpecHelper = SpecHelper;

})();

