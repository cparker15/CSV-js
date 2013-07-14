test('parse without header', function () {
    expect(1);

    var input = 'asdf';

    throws(
        function () {
            CSV.parse(input);
        },
        /missing header/,
        'raised error message contains "missing header"'
    );
});

test('parse empty', function () {
    expect(1);

    var input = '';

    throws(
        function () {
            CSV.parse(input);
        },
        /empty input/,
        'raised error message contains "empty input"'
    );
});

test('parse', function () {
    expect(8);

    var input = 'foo,bar\na,b',
        result = CSV.parse(input);

    ok(Array.isArray(result), 'result is an array');
    equal(result.length, 1, 'array contains one element');
    ok(result instanceof Object, 'element is an object');
    equal(Object.keys(result[0]).length, 2, 'object has two properties');
    ok(result[0].hasOwnProperty('foo'), 'object has property foo');
    equal(result[0].foo, 'a', 'value of foo is "a"');
    ok(result[0].hasOwnProperty('bar'), 'object has property bar');
    equal(result[0].bar, 'b', 'value of bar is "b"');
});
