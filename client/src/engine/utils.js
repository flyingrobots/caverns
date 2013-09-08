var js = (function() 
{
  var api = {}
  
  api.defaults = function(object) {
    Array.prototype.slice.call(arguments).forEach(function(arg) {
      if (arg) {
        for (var property in arg) {
          if (object[property] === void 0) {
            object[property] = arg[property];
          }
        }
      }
    });
    return object;
  }
  
  api.isFunction = function(object) {
    return typeof object === 'function';
  }

  api.select = function(array, iterator) {
    result = []
    array.forEach(function(object) {
      if (iterator(object)) {
        result.push(object);
      }
    });
    return result;
  }

  api.isString = function(object) {
    return typeof object === 'string';
  }

  return api;
}).call();

//-----------------------------------------------------------------------------
var stringToFunction = function(str) {
  var arr = str.split(".");

  var fn = (window || this);
  for (var i = 0, len = arr.length; i < len; i++) 
  {
    fn = fn[arr[i]];
  }

  if (typeof fn !== "function") 
  {
    throw "function not found";
  }

  return  fn;
};
