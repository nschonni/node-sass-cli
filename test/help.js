var assert = require('assert')
  , path = require('path')
  , spawn = require('child_process').spawn;

describe('help', function() {
  var cli = path.join(__dirname, '..', 'index.js')
    , usage = /Usage: sass \[options\] \[INPUT\] \[OUTPUT\]/;

  it('should return usage with "--help"', function(done) {
    var result = spawn('node', [cli, '--help']);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert(usage.test(data.trim()));
      done();
    });
  });

  it('should return with "-h"', function(done) {
    var result = spawn('node', [cli, '-h']);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert(usage.test(data.trim()));
      done();
    });
  });

  it('should return with "-?"', function(done) {
    var result = spawn('node', [cli, '-?']);

    result.stdout.setEncoding('utf8');
    result.stdout.once('data', function(data) {
      assert(usage.test(data.trim()));
      done();
    });
  });
});
