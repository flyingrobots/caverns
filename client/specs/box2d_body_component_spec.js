describe("Box2d Body Component", function() {

  var body = null;
  var helper = new SpecHelper();

  beforeEach(function() {
    body = new Box2dBodyComponent();
  });

  afterEach(function() {
    body = null;
  });

  describe("A Box2dBodyComponent instance", function() {
   it("should not be null", function() {
     expect(body).not.toBe(null);
   });
   
   it("should be an instance of 'Component'", function() {
     helper.expectComponentAPI(body);
   });

   describe("its properties", function() {
     it("should have a 'fixed' property", function() {
       helper.expectPropertyOfType(body, 'fixed', Boolean);
     });

     it("should have a 'restitution' property", function() {
       helper.expectPropertyOfType(body, 'restitution', Number);
     });

     it("should have a 'friction' property", function() {
       helper.expectPropertyOfType(body, 'friction', Number);
     });

     it("should have a 'rotation' property", function() {
       helper.expectPropertyOfType(body, 'rotation', Number);
     });
   });

 });

});
