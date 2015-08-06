# ngzip - portable streaming stdio gzip command line utility

ngzip is a portable streaming stdio gzip command line utility that uses Node.js zlib. It should run anywhere Node.js runs including windows, *nix, mac

[![Build Status](https://secure.travis-ci.org/jeffbski/ngzip.png?branch=master)](http://travis-ci.org/jeffbski/ngzip)

## Installation

Requires node.js/iojs >= 0.10

```bash
npm install ngzip # local version
OR
npm install -g ngzip # global version
```

## Usage

Options are similar to bash command gzip. If using local version ensure that you either use node_modules/.bin/ngzip or add to your path.

```bash
ngzip foo > foo.gz # compress foo to foo.gz
ngzip -d foo.gz > foo # decompress foo.gz to foo
catw foo | ngzip > foo.gz # compress stdin to stdout
catw foo.gz | ngzip -d > foo # decompress stdin to stdout
```

Any program which sends data to stdout can be used for input to ngzip. On Windows you can use `type` instead of `cat`. You can also use the [catw](https://github.com/substack/catw) as a portable option of `cat`.

Unlike bash's gzip, ngzip was written for simplicity. gzip supports a wide variety of options including reading/writing to files, removing old files, varying compression factors.

ngzip implements just a few use cases:

 - read from stdin and write to stdout
 - read from file and write to stdout


```
Usage: ngzip {OPTIONS} [file] > target.gz

Description:

     The ngzip program compresses and decompresses a file using Lempel-Ziv
     coding (LZ77). ngzip will compress or decompress from standard input
     to standard output. If a file parameter is provided ngzip will read
     from the file and write to stdout. The default compression level is
     slightly biased toward higher compression at expense of speed.

Standard Options:

 -d, --decompress, --uncompress

  This option selects decompression rather than compression.

 -1, --fast

  Use the fastest compression method (less compression). Only relevant when in compression mode.

 -9, --best

  Use the maximum compression method at the expense of speed. Only relevant when in compression mode.

 -h, --help

  Show this message
```


## Goals

 - gzip-like command line utility that runs everywhere Node.js runs including Windows
 - streaming
 - stdin/stdout
 - file read for portability (avoids use of cat/type)
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
