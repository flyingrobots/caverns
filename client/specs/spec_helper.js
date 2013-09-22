(function(){

  this.SpecHelper = {
    supportsSystemAPI: function(system) {
     expect(_.isFunction(system.onAdded)).toBe(true);
     expect(_.isFunction(system.onRemoved)).toBe(true);
     expect(_.isFunction(system.createNodeList)).toBe(true);
     expect(_.isFunction(system.destroyNodeList)).toBe(true);
     expect(_.isFunction(system.updateEntityMembership)).toBe(true);
   }
  }

})();

