var js = (function() 
{
  var api = {}
  
  api.defaults = function(object, defaults) {
    return object == null ? defaults : Object.append(defaults, object);
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

  api.isObject = function(object) {
    return typeof object === 'object';
  }

  return api;
}).call();

//-----------------------------------------------------------------------------
var assert = function(assertion, failureMessage) {
  failureMessage = failureMessage || "Assertion failed";
  if (!assertion)
  {
    throw failureMessage;
  }
};

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
