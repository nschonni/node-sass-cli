var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn;

describe('basic', function() {
  var cli = path.join(__dirname, '..', 'index.js')
    , expectedPath = path.join(__dirname, 'basic', 'expected.css')
    , inputPath = path.join(__dirname, 'basic', 'input.scss')
    , expected;

  before(function(done) {
    fs.readFile(expectedPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      expected = data;
      done();
    });
  });

  it('More than 2 parameters after the options shows a warning', function(done) {
    var result = spawn('node', [cli, 'foo', 'bar', 'baz']);

    result.stderr.setEncoding('utf8');
    result.stderr.once('data', function(data) {
      assert(/Only 2 parameters, an \[INPUT\] \[OUTPUT\] are parsed after the \[options\]/.test(data));
      done();
    });
  });

  it('Single input file prints to stdout', function(done) {
    var result = spawn('node', [cli, inputPath]);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert.equal(data, expected);
      done();
    });
  });
});
