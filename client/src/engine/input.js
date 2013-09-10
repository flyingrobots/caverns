var runCallbacks=function(callbacks, data)
{
  callbacks.forEach(function(callbackData){
    callbackData.callback.apply(callbackData.target, [data]);
  });
};

var removeCallbacksWithTarget = function(callbacks,target)
{
  return callbacks.filter(function(data){return data.target != target;})
}

var handleKeyDown=function(input, data) 
{
    input.keys[data.keyCode] = true;
    runCallbacks(input.callbacks[input.CALLBACK_KEYDOWN], data);
};

var handleKeyUp=function(input, data)
{
  input.keys[data.keyCode] = false;
  runCallbacks(input.callbacks[input.CALLBACK_KEYUP], data);
};

var Input = {
  CALLBACK_KEYDOWN:"keydown",
  CALLBACK_KEYUP:"keyup",

  keys:{},
  callbacks:{},

  initialize:function()
  {
    Input.callbacks[Input.CALLBACK_KEYDOWN] = [];
    Input.callbacks[Input.CALLBACK_KEYUP] = [];

    document.onkeydown = function(e)
    {
      var keyCode = (window.event) ? e.which : e.keyCode;
      handleKeyDown(Input, {keyCode:keyCode});
    };
    document.onkeyup = function(e)
    {
      var keyCode = (window.event) ? e.which : e.keyCode;
      handleKeyUp(Input, {keyCode:keyCode});
    };
  },

  isKeyDown:function(keyCode)
  {
    return this.keys[keyCode] == true;
  },

  isKeyUp:function(keyCode)
  {
    return this.keys[keyCode] != true;
  },

  registerKeyDownCallback:function(target, callback)
  {
    var callbackData = {target:target, callback:callback};
    Input.callbacks[Input.CALLBACK_KEYDOWN].push(callbackData);
  },
  unregisterKeyDownCallback:function(target, callback)
  {
    var callbacks = Input.callbacks[Input.CALLBACK_KEYDOWN];
    Input.callbacks[Input.CALLBACK_KEYDOWN] = removeCallbacksWithTarget(callbacks,target);
  },

  registerKeyUpCallback:function(target, callback)
  {
    var callbackData = {target:target, callback:callback};
    Input.callbacks[Input.CALLBACK_KEYUP].push(callbackData);
  },
  unregisterKeyUpCallback:function(target, callback)
  {
    var callbacks = Input.callbacks[Input.CALLBACK_KEYUP];
    Input.callbacks[Input.CALLBACK_KEYUP] = removeCallbacksWithTarget(callbacks,target);
  },

  unregisterAllCallbacks:function(target)
  {
    for (var key in Input.callbacks)
    {
      Input.callbacks[key] = removeCallbacksWithTarget(Input.callbacks[key], target);
    }
  }
};
