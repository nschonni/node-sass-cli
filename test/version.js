var assert = require('assert')
  , path = require('path')
  , spawn = require('child_process').spawn;

describe('version', function() {
  var version;
  before(function(done) {
    var cli = path.join(__dirname, '..', 'index.js')
      , result = spawn('node', [cli, '--version']);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      version = data.trim();
      done();
    });
  });

  it('should return node-sass info', function(done) {
    assert(/node\-sass\t\d*\.\d*\.\d*\s*\(Wrapper\)\s*\[JavaScript\]/.test(version));
    done();
  });
  it('should return libsass info', function(done) {
    assert(/libsass\s*\d*\.\d*\.\d*\s*\(Sass Compiler\)\s*\[C\/C\+\+\]/.test(version));
    done();
  });
});
