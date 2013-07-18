# CSV-js [![Build Status](https://secure.travis-ci.org/cparker15/CSV-js.png?branch=master)](http://travis-ci.org/cparker15/CSV-js)

A CSV (comma-separated values) parser written in JavaScript.

Originally part of [Christopher Parker][github-cparker15]'s [CSV to JSON converter][github-csv-to-json]. Because of this, some feature requests, bug reports, etc. may be filed there, instead. Before opening a new issue here, please make sure it doesn't already exist there.

## Building

Prerequisites:

* [Node][nodejs] + [NPM][npmjs]
* [Grunt CLI][gruntjs]

After cloning this repo, here's how to build:

    $ npm install
    $ grunt

This will download all dependencies, lint, test, and minify the library.

The minified library resides at `dist/csv.min.js`.

## Using

Basic example:

```javascript
var CSV = require('csv-js'),
    input = 'foo, bar, baz\n1, 2, 3',
    output;

try {
    output = CSV.parse(input);
    console.dir(output);
} catch (e) {}
```

The output array will be inspected by `console.dir` and the following will be printed to stdout:

```javascript
[
    {
        "foo": "1",
        "bar": "2",
        "baz": "3"
    }
]
```

[github-cparker15]: https://github.com/cparker15
[github-csv-to-json]: https://github.com/cparker15/csv-to-json
[nodejs]: http://nodejs.org/
[npmjs]: http://npmjs.org/
[bower]: http://bower.io/
[gruntjs]: http://gruntjs.com/
