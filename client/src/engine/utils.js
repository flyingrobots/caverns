
var assert = function(assertion, failureMessage) {
  failureMessage = failureMessage || "Assertion failed";
  if (!assertion)
  {
    throw failureMessage;
  }
};

var js = (function() 
{
  var api = {}
  
  api.defaults = function(object, defaults) {
    // you and your dirty mootools :-)
    return object == null ? defaults : Object.append(defaults, object);
  };
  
  api.isFunction = function(object) {
    return typeof object === 'function';
  };

  api.select = function(array, iterator) {
    result = []
    array.forEach(function(object) {
      if (iterator(object)) {
        result.push(object);
      }
    });
    return result;
  };

  api.isString = function(object) {
    return typeof object === 'string';
  };

  api.isObject = function(object) {
    return typeof object === 'object';
  };

  return api;
}).call();

Array.insertWhen = function(array, item, predicate)
{
  // Inserts an item into the array when the predicate returns true.
  // If the predicate never returns true, inserts at the end of the array.
  // The predicate should have the form : pred(itemToInsert, itemToCompare, index)
  // Returns the inserted element

  assert(predicate);

  var i = 0;
  for (i; i < array.length; ++i)
  {
    if (predicate(item, array[i], i))
    {
      array.splice(i,0,item);
      return item;
    }
  }
  array.push(item);
  return item;
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
