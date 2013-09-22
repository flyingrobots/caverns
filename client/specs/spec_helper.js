(function(){

this.SpecHelper = {};

this.SpecHelper.supportsSystemAPI = function(system) {
  expect(_.isFunction(system.onAdded)).toBe(true);
  expect(_.isFunction(system.onRemoved)).toBe(true);
  expect(_.isFunction(system.createNodeList)).toBe(true);
  expect(_.isFunction(system.destroyNodeList)).toBe(true);
  expect(_.isFunction(system.updateEntityMembership)).toBe(true);
}

this.SpecHelper.createPhysicsWorldDouble = function() {
  return {
    initialize: function(opts) {},
    addBody: function(x, y, opts, shapeFunc) {}
  };
}

})();

