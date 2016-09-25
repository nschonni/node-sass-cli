var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn;

describe('style', function() {
  var cli = path.join(__dirname, '..', 'index.js');

  describe('nested', function() {
    var expectedPath = path.join(__dirname, 'style', 'nested', 'expected.css')
      , inputPath = path.join(__dirname, 'style', 'nested', 'input.scss')
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

    it('with --style nested compiles', function(done) {
      var result = spawn('node', [cli, '--style', 'nested', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });

    it('with -t nested compiles', function(done) {
      var result = spawn('node', [cli, '-t', 'nested', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });

    it('with no options is uses nested compiles', function(done) {
      var result = spawn('node', [cli, inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });
  });

  describe('compact', function() {
    var expectedPath = path.join(__dirname, 'style', 'compact', 'expected.css')
      , inputPath = path.join(__dirname, 'style', 'compact', 'input.scss')
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

    it('with --style compact compiles', function(done) {
      var result = spawn('node', [cli, '--style', 'compact', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });

    it('with -t compact compiles', function(done) {
      var result = spawn('node', [cli, '-t', 'compact', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });
  });

  describe('compressed', function() {
    var expectedPath = path.join(__dirname, 'style', 'compressed', 'expected.css')
      , inputPath = path.join(__dirname, 'style', 'compressed', 'input.scss')
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

    it('with --style compressed compiles', function(done) {
      var result = spawn('node', [cli, '--style', 'compressed', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });

    it('with -t compressed compiles', function(done) {
      var result = spawn('node', [cli, '-t', 'compressed', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });
  });

  describe('expanded', function() {
    var expectedPath = path.join(__dirname, 'style', 'expanded', 'expected.css')
      , inputPath = path.join(__dirname, 'style', 'expanded', 'input.scss')
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

    it('with --style expanded compiles', function(done) {
      var result = spawn('node', [cli, '--style', 'expanded', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });

    it('with -t expanded compiles', function(done) {
      var result = spawn('node', [cli, '-t', 'expanded', inputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expected);
        done();
      });
    });
  });
});
