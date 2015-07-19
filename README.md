# gzip-cli - portable streaming gzip command line utility

Implement a portable streaming gzip-like command line utility using Node.js built-in zlib.

Should run anywhere Node.js runs including Windows

## Installation

Requires node.js/iojs >= 0.10

```bash
npm install gzip-cli # local version
OR
npm install -g gzip-cli # global version
```

## Usage

Options are similar to bash command gzip.

```bash
cat foo | gzip-cli > foo.gz # compress stdin to stdout
gzip-cli foo --stdout # compress foo to stdout
gzip-cli foo # compress foo to foo.gz
gzip-cli foo -S .bar # compress foo to foo.bar
cat foo.gz | gzip-cli -d > foo # decompress stdin to stdout
gzip-cli -d foo.gz --stdout # decompress foo.gz to stdout
gzip-cli -d foo.gz # decompress foo.gz to foo
gzip-cli -d foo.bar -S .bar # decompress foo.bar to foo
```

Differences from bash `gzip`:

 - only a few options are implemented from gzip
 - program does not delete original file when compressing or decompressing
 - if destination file exists, file will be overwritten


```
Usage: gzip-cli {OPTIONS} [file]

Description:

     The gzip program compresses and decompresses a file using Lempel-Ziv
     coding (LZ77).  If no file is specified, gzip will compress from
     standard input, or decompress to standard output.  When in
     compression mode, file will be written to another file with
     the suffix, set by the -S suffix option, added, if possible.

     In decompression mode, file will be checked for existence, as
     will the file with the suffix added.  The file argument must contain
     a separate complete archive.

Standard Options:

 -c, --stdout, --to-stdout

  This option specifies that output will go to the standard output stream,
  leaving files intact.

 -d, --decompress, --uncompress

  This option selects decompression rather than compression.

 -S suffix, --suffix suffix

  This option changes the default suffix from .gz to suffix.

 -h, --help

  Show this message
```


## Goals

 - gzip-like command line utility that runs everywhere Node.js runs including Windows
 - streaming

## Why

I need a portable gzip command line utility that I can use from all Node.js environments

## Get involved

If you have input or ideas or would like to get involved, you may:

 - contact me via twitter @jeffbski  - <http://twitter.com/jeffbski>
 - open an issue on github to begin a discussion - <https://github.com/jeffbski/gzip-cli/issues>
 - fork the repo and send a pull request (ideally with tests) - <https://github.com/jeffbski/gzip-cli>

## License

 - [MIT license](http://github.com/jeffbski/gzip-cli/raw/master/LICENSE)
