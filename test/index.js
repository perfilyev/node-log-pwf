require("../index")
var myConsole = new console.Console(process.stdout, process.stderrs);
var test = require('ava').test;

test('log', function(t) {
    console.log("test");
    myConsole.log("test");
});

test('warn', function(t) {
    console.warn("warn");
    myConsole.warn("warn");
});

test('error', function(t) {
    console.error("error");
    myConsole.error("error");
});