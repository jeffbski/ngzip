'use strict';

var accum = require('accum');
var childProcess = require('child_process');
var PassThroughStream = require('stream').PassThrough;
var crypto = require('crypto');
var zlib = require('zlib');

var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var before = mocha.before;
var beforeEach = mocha.beforeEach;
var after = mocha.after;
var afterEach = mocha.afterEach;
var expect = require('expect');

function execGzip(args, options) {
  var fullArgs = ['./bin/cli.js'].concat(args);
  return childProcess.spawn(process.execPath, fullArgs, options);
}

function execWithInput(input, cb) {
    var child = execGzip([], {});
    var output;

    child.on('close', function (code) {
      expect(code).toBe(0);
      var gunzip = zlib.createGunzip();
      var pass = new PassThroughStream();
      var gunzipPipe = pass.pipe(gunzip);
      if (typeof input === 'string') {
        gunzipPipe
          .pipe(accum.string({ encoding: 'utf8' }, function (str) {
            expect(str).toBe(input);
            cb();
          }));
      } else { // binary
        gunzipPipe
          .pipe(accum.buffer(function (buffer) {
            expect(buffer).toEqual(input);
            cb();
          }));
      }
      pass.end(output);
    });

    child.stderr.on('data', function (data) {
      console.error('stderr: ' + data);
    });

    child.stdout.pipe(accum.buffer(function (buffer) {
      output = buffer;
    }));

    child.stdin.end(input);

}

describe('ngzip compression using stdio', function () {
  it('should compress text stdin to stdout', function (done) {
    var input = "Hello my world. The quick brown fox jumped";
    execWithInput(input, done);
  });

  it('should compress binary stdin to stdout', function (done) {
    var input  = crypto.randomBytes(2048);
    execWithInput(input, done);
  });

});
