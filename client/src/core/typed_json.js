var TypedJSON = 
{
	reviver:function(key,value)
	{
    if (typeof value === "object" &&
        typeof value._t === "string") 
    {
      var objType = Utils.stringToFunction(value._t);
      if (typeof objType === "function") 
      {
        delete value._t;
        return new objType(value);
      }
    }
    return value;
	},

	parse:function(json)
	{
    return JSON.parse(json, TypedJSON.reviver);
	}
};