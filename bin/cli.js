#!/usr/bin/env node

var fs = require('fs');
var minimist = require('minimist');
var zlib = require('zlib');

var minimistOpts = {
  boolean: ['d', 'h', '1', '9',
            'decompress', 'uncompress'], // these should not be needed
    // once https://github.com/substack/minimist/pull/61 is merged
  alias: {
    d: ['decompress', 'uncompress'],
    h: 'help',
    1: 'fast',
    9: 'best'
  }
};

var argv = minimist(process.argv.slice(2), minimistOpts);

var decompress = argv.decompress;
var help = argv.help;
var compressionLevel = (argv.fast) ? zlib.Z_BEST_SPEED :
    (argv.best) ? zlib.Z_BEST_COMPRESSION :
    zlib.Z_DEFAULT_COMPRESSION;
var inputFilename = argv._[0];

if (help) { // help
  return fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
    .on('close', function () { process.exit(1); });
}

function gzip(inStream, outStream) {
  var gzip = zlib.createGzip({ level: compressionLevel });
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

var inStream = inputFilename ? fs.createReadStream(inputFilename) : process.stdin;
var outStream = process.stdout;

if (decompress) { // decompression
  return gunzip(inStream, outStream);
}

return gzip(inStream, outStream);
