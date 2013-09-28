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

   describe("should have a 'fixed' property", function() {
     it("that is a Boolean", function() {
       helper.expectPropertyOfType(body, 'fixed', Boolean);
     });
   });

   describe("should have a 'restitution' property", function() {
     it("that is a Number", function() {
       helper.expectPropertyOfType(body, 'restitution', Number);
     });
   });

   describe("should have a 'friction' property", function() {
     it("that is a Number", function() {
       helper.expectPropertyOfType(body, 'friction', Number);
     });
   });

   describe("should have a 'rotation' property", function() {
     it("that is a Number", function() {
       helper.expectPropertyOfType(body, 'rotation', Number);
     });
   });

 });

});
