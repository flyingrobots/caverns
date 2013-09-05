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