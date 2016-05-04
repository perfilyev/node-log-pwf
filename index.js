var log = console.Console.prototype.log;

var pwf = function() {
  var prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack){ return stack; };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = prepareStackTrace;
  
  var args = Array.prototype.slice.call(arguments);
  var pwfLine = stack[0].getFileName() + ':' + stack[0].getLineNumber();
  if (this._stdout === process.stdout) {
    pwfLine = '\033[91m' + pwfLine + '\033[0m';
  }
  args.unshift(pwfLine);
  return log.apply(this,args);
};

console.Console.prototype.log = pwf;

console.log = pwf;

module.exports = console;