var log = console.log;

console.log = function() {
  var prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack){ return stack; };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = prepareStackTrace;
  
  var args = Array.prototype.slice.call(arguments);
  args.unshift('\033[91m' + stack[0].getFileName() + ':' + stack[0].getLineNumber() + '\033[0m');
  return log.apply(this,args);
};

module.exports = console;