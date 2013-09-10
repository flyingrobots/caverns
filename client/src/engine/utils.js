
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

  api.times = function(n, callback) {
    for (var i = 0; i < n; i++) {
      callback(i);
    }
  }

  // type info
  
  api.isFunction = function(object) {
    return typeof object === 'function';
  };

  api.isString = function(object) {
    return typeof object === 'string';
  };

  api.isObject = function(object) {
    return typeof object === 'object';
  };

  api.isNull = function(object) {
    return object === null;
  }

  api.isUndefined = function(object) {
    return object === void 0;
  }

  api.exists = function(object) {
    return !this.isNull(object) && !this.isUndefined(object);
  }

  // randomness

  api.randomInteger = function(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  api.randomReal = function(min, max) {
    return min + Math.random() * (max - min);
  }

  api.randomColor = function() {
    // stolen from the interwebs... not quite working?
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }
  
  // array

  api.select = function(array, iterator) {
    result = []
    array.forEach(function(object) {
      if (iterator(object)) {
        result.push(object);
      }
    });
    return result;
  };

  api.last = function(array) {
    if (array) {
      return array[array.length - 1];
    }
  }

  api.defaults = function(object, defaults) {
    // allow use case: js.defaults(options) <- ie, no second parameter
    if (!this.exists(defaults)) {
      return object;
    }

    // you and your dirty mootools :-)
    return object == null ? defaults : Object.append(defaults, object);
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
