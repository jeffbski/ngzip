#!/usr/bin/env node

var fs = require('fs');
var minimist = require('minimist');
var path = require('path');
var zlib = require('zlib');

var minimistOpts = {
  boolean: ['c', 'd', 'h'],
  string: ['S'],
  alias: {
    c: ['stdout', 'to-stdout'],
    d: ['decompress', 'uncompress'],
    h: 'help',
    S: 'suffix'
  }
};

var argv = minimist(process.argv.slice(2), minimistOpts);

var decompress = argv.decompress;
var help = argv.help;
var stdout = argv.stdout;
var suffix = argv.suffix || '.gz';

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

function calcOutputFile(inputFile, suffix, decompress) {
  var outFile = (decompress) ?
      path.dirname(inputFile) + '/' + path.basename(inputFile, suffix) :
      inputFile + suffix;
  if (outFile === inputFile) {
    return errorExit(new Error('inputFile matches outputFile'));
  }
  return outFile;
}

var inputFile = (argv._ && argv._.length) ? argv._[0] : null;
var outputFile = (inputFile && !stdout) ?
    calcOutputFile(inputFile, suffix, decompress) :
    null;

var inStream = (inputFile) ?
    fs.createReadStream(inputFile) :
    process.stdin;

var outStream = (outputFile) ?
    fs.createWriteStream(outputFile) :
    process.stdout;


if (decompress) { // decompression
  return gunzip(inStream, outStream);
}

return gzip(inStream, outStream);
