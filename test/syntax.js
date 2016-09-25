var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn;

describe('syntax', function() {
  var cli = path.join(__dirname, '..', 'index.js')
    , expectedPath = path.join(__dirname, 'syntax', 'expected.css')
    , inputSassPath = path.join(__dirname, 'syntax', 'input.sass')
    , inputSCSSPath = path.join(__dirname, 'syntax', 'input.scss')
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

  it('passing sass with a .sass file compiles', function(done) {
    var result = spawn('node', [cli, inputSassPath]);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert.equal(data, expected);
      done();
    });
  });

  it('passing --scss with a .scss file compiles', function(done) {
    var result = spawn('node', [cli, '--scss', inputSCSSPath]);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert.equal(data, expected);
      done();
    });
  });

  it.skip('passing --scss with a .sass file throws an error', function(done) {
    var result = spawn('node', [cli, '--scss', inputSassPath]);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert.equal(data, expected);
      done();
    });
  });
});
