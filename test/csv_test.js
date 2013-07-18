'use strict';

var CSV = require('../src/csv');

exports.csv = {
    setUp: function (done) {
        this.fixtures = {
            missingHeader: 'asdf',
            emptyInput: '',
            parse: 'foo,bar\na,b'
        };

        done();
    },

    'parse without header': function (test) {
        test.expect(1);

        var me = this;

        test.throws(
            function () {
                CSV.parse(me.fixtures.missingHeader);
            },
            /missing header/,
            'raised error message contains "missing header"'
        );

        test.done();
    },

    'parse empty': function (test) {
        test.expect(1);

        var me = this;

        test.throws(
            function () {
                CSV.parse(me.fixtures.emptyInput);
            },
            /empty input/,
            'raised error message contains "empty input"'
        );

        test.done();
    },

    'parse': function (test) {
        test.expect(8);

        var result = CSV.parse(this.fixtures.parse);

        test.ok(Array.isArray(result), 'result is an array');
        test.equal(result.length, 1, 'array contains one element');
        test.ok(result instanceof Object, 'element is an object');
        test.equal(Object.keys(result[0]).length, 2, 'object has two properties');
        test.ok(result[0].hasOwnProperty('foo'), 'object has property foo');
        test.equal(result[0].foo, 'a', 'value of foo is "a"');
        test.ok(result[0].hasOwnProperty('bar'), 'object has property bar');
        test.equal(result[0].bar, 'b', 'value of bar is "b"');

        test.done();
    }
};
