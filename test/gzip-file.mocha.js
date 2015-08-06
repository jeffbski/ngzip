'use strict';

var accum = require('accum');
var childProcess = require('child_process');
var PassThroughStream = require('stream').PassThrough;
var crypto = require('crypto');
var zlib = require('zlib');
var temp = require('temp');

var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var expect = require('expect');

temp.track(); // auto cleanup of temp files and dirs

function execGzip(args, options) {
  var fullArgs = ['./bin/cli.js'].concat(args);
  return childProcess.spawn(process.execPath, fullArgs, options);
}

function execWithInput(args, input, cb) {
  var fileStream = temp.createWriteStream();
  fileStream.end(input, function (err) {
    if (err) { return cb(err); }
    args.push(fileStream.path); // append temp file path to args

    var child = execGzip(args, {});
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
  });
}

describe('ngzip compression using file input', function () {
  it('should compress text stdin to stdout', function (done) {
    var input = "Hello my world. The quick brown fox jumped";
    execWithInput([], input, done);
  });

  it('should compress binary file to stdout', function (done) {
    var input  = crypto.randomBytes(2048);
    execWithInput([], input, done);
  });

  ['-1', '--fast', '-9', '--best'].map(function (x) {
    it('should compress text file to stdout with option: ' + x, function (done) {
      var input = "Hello my world. The quick brown fox jumped";
      execWithInput([x], input, done);
    });

    it('should compress binary file to stdout with option: ' + x, function (done) {
      var input  = crypto.randomBytes(2048);
      execWithInput([x], input, done);
    });
  });


});
