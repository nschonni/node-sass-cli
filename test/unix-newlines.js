var assert = require('assert')
  , fs = require('fs')
  , os = require('os')
  , path = require('path')
  , spawn = require('child_process').spawn;

describe('unix-newlines', function() {
  var cli = path.join(__dirname, '..', 'index.js')
    , expectedPath = path.join(__dirname, 'unix-newlines', 'expected.css')
    , inputPath = path.join(__dirname, 'unix-newlines', 'input.scss')
    , expected;

  before(function(done) {
    if (os.EOL === '\r\n') {
      fs.readFile(expectedPath, 'utf8', function(err, data) {
        if (err) {
          throw err;
        }
        expected = data;
        done();
      });
    } else {
      this.skip();
    }
  });

  it('Outputs using "lf" when running on Windows OS', function(done) {
    var result = spawn('node', [cli, '--unix-newlines', inputPath]);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert.equal(data, expected);
      assert.ok(!/\r\n/.test(data));
      done();
    });
  });
});
