var log = pwf(console.Console.prototype.log, '\033[34m');
var warn = pwf(console.Console.prototype.warn, '\x1b[7;93m');
var error = pwf(console.Console.prototype.error, '\x1b[93;41m');

console.Console.prototype.log = log;
console.Console.prototype.warn = warn;
console.Console.prototype.error = error;

console.log = log;
console.warn = warn;
console.error = error;

function pwf(log, ansiColor) {
  return function() {
    var prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = prepareStackTrace;
  
    var args = Array.prototype.slice.call(arguments);
    var pwfLine = stack[0].getFileName() + ':' + stack[0].getLineNumber();
    if (this._stdout === process.stdout) {
      pwfLine = ansiColor + pwfLine + '\033[0m';
    }
    args.unshift(pwfLine);
    return log.apply(this,args);
  }
}

module.exports = console;