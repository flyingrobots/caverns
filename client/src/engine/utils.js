
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

  // general
  api.safeInvoke = function(scope, func, args, defaultReturn)
  {
    if (typeof(func) === "function")
    {
      return func.apply(scope, args);
    }
    return defaultReturn;
  };

  // type info
  api.exists = function(object) {
    return !this.isNull(object) && !this.isUndefined(object);
  };

  // randomness
  api.randomInteger = function(min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  api.randomReal = function(min, max) {
    return min + Math.random() * (max - min);
  };

  api.randomColor = function() {
    // stolen from the interwebs... not quite working?
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  };

  // arrays
  api.insertWhen = function(array, item, predicate)
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

  return api;
}).call();
