# ngzip - portable streaming stdio gzip command line utility

Implement a portable streaming gzip-like command line utility using Node.js built-in zlib which reads from stdin and writes to stdout

Should run anywhere Node.js runs including Windows

[![Build Status](https://secure.travis-ci.org/jeffbski/ngzip.png?branch=master)](http://travis-ci.org/jeffbski/ngzip)

## Installation

Requires node.js/iojs >= 0.10

```bash
npm install ngzip # local version
OR
npm install -g ngzip # global version
```

## Usage

Options are similar to bash command gzip.

```bash
cat foo | ngzip > foo.gz # compress stdin to stdout
cat foo.gz | ngzip -d > foo # decompress stdin to stdout
```

Any program which sends data to stdout can be used for input to ngzip. On Windows you can use `type` instead of `cat`.

Unlike bash's gzip, ngzip was written for simplicity. gzip supports a wide variety of options including reading/writing to files, removing old files, varying compression factors.

ngzip has started with the simplest solution using stdio.


```
Usage: ngzip {OPTIONS} [file]

Description:

     The gzip program compresses and decompresses a file using Lempel-Ziv
     coding (LZ77). gzip will compress or decompress from standard input
     to standard output.

Standard Options:

 -d, --decompress, --uncompress

  This option selects decompression rather than compression.

 -h, --help

  Show this message
```


## Goals

 - gzip-like command line utility that runs everywhere Node.js runs including Windows
 - streaming
 - stdin/stdout
 - simplicity

## Why

I need a portable gzip command line utility that I can use from all Node.js environments for streaming compression and decompression

## Get involved

If you have input or ideas or would like to get involved, you may:

 - contact me via twitter @jeffbski  - <http://twitter.com/jeffbski>
 - open an issue on github to begin a discussion - <https://github.com/jeffbski/ngzip/issues>
 - fork the repo and send a pull request (ideally with tests) - <https://github.com/jeffbski/ngzip>

## License

 - [MIT license](http://github.com/jeffbski/ngzip/raw/master/LICENSE)
