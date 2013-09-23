describe("Box2d Body Component", function() {

  var body = null;
  var helper = new SpecHelper();

  beforeEach(function() {
    body = new Box2dBodyComponent();
  });

  afterEach(function() {
    body = null;
  });

  describe("A new Box2dBodyComponent", function() {

   it("should not be null", function() {
     expect(body).not.toBe(null);
   });

   it("should support the Component API", function() {
     helper.expectComponentAPI(body);
   });

   describe("should have a 'fixed' property", function() {

     it("that is defined", function() {
       expect(body.fixed).toBeDefined();
     });

     it("that is a Boolean value", function() {
       expect(body.fixed).toEqual(jasmine.any(Boolean));
     });

   });

   describe("should have a 'restitution' property", function() {

     it("that is defined", function() {
       expect(body.restitution).toBeDefined();
     });

     it("that is a number", function() {
       expect(body.restitution).toEqual(jasmine.any(Number));
     });

   });

   describe("should have a 'friction' property", function() {

     it("that is defined", function() {
       expect(body.friction).toBeDefined();
     });

     it("that is a number", function() {
       expect(body.friction).toEqual(jasmine.any(Number));
     });

   });

   describe("should have a 'rotation' property", function() {

     it("should be defined", function() {
       expect(body.rotation).toBeDefined();
     });

     it("should be a number", function() {
       expect(body.rotation).toEqual(jasmine.any(Number));
     });

   });

 });

});
