#!/usr/bin/env node

var fs = require('fs');
var minimist = require('minimist');
var path = require('path');
var zlib = require('zlib');

var minimistOpts = {
  boolean: ['d', 'h'],
  alias: {
    d: ['decompress', 'uncompress'],
    h: 'help'
  }
};

var argv = minimist(process.argv.slice(2), minimistOpts);

var decompress = argv.decompress;
var help = argv.help;

if (help) { // help
  return fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
    .on('close', function () { process.exit(1); });
}

function gzip(inStream, outStream) {
  var gzip = zlib.createGzip();
  inStream
    .on('error', errorExit)
    .pipe(gzip)
    .pipe(outStream);
}

function gunzip(inStream, outStream) {
  var gunzip = zlib.createGunzip();
  inStream
    .on('error', errorExit)
    .pipe(gunzip)
    .pipe(outStream);
}

function errorExit(err) {
    if (err.stack) {
        console.error(err.stack);
    }
    else {
        console.error(String(err));
    }
    process.exit(1);
}

var inStream = process.stdin;
var outStream = process.stdout;

if (decompress) { // decompression
  return gunzip(inStream, outStream);
}

return gzip(inStream, outStream);
