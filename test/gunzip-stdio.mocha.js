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

function execWithInput(args, input, cb) {
  var child = execGzip(args, {});
  var output;

  child.on('close', function (code) {
    expect(code).toBe(0);
    expect(output).toEqual(input);
    cb();
  });

  child.stderr.on('data', function (data) {
    console.error('stderr: ' + data);
  });

  if (typeof input === 'string') {
    child.stdout.pipe(accum.string({ encoding: 'utf8' }, function (str) {
      output = str;
    }));
  } else { // binary
    child.stdout.pipe(accum.buffer(function (buffer) {
      output = buffer;
    }));
  }

  var gzip = zlib.createGzip();
  var pass = new PassThroughStream();
  pass
    .pipe(gzip)
    .pipe(child.stdin);
  pass.end(input);
}

describe('ngzip decompression using stdio', function () {
  it('should decompress text stdin to stdout with -d', function (done) {
    var input = "Hello my world. The quick brown fox jumped";
    execWithInput(['-d'], input, done);
  });

  it('should decompress binary stdin to stdout with -d', function (done) {
    var input  = crypto.randomBytes(2048);
    execWithInput(['-d'], input, done);
  });

  it('should decompress text stdin to stdout with --decompress', function (done) {
    var input = "Hello my world. The quick brown fox jumped";
    execWithInput(['--decompress'], input, done);
  });

  it('should decompress binary stdin to stdout with --decompress', function (done) {
    var input  = crypto.randomBytes(2048);
    execWithInput(['--decompress'], input, done);
  });

  it('should decompress text stdin to stdout with --uncompress', function (done) {
    var input = "Hello my world. The quick brown fox jumped";
    execWithInput(['--uncompress'], input, done);
  });

  it('should decompress binary stdin to stdout with --uncompress', function (done) {
    var input  = crypto.randomBytes(2048);
    execWithInput(['--uncompress'], input, done);
  });

});
