var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn
  , rimraf = require('rimraf');

describe('sourcemap', function() {
  var cli = path.join(__dirname, '..', 'index.js')
    , tmp = path.join(__dirname, 'sourcemap', 'tmp')
    , outputPath = path.join(tmp, 'expected.css');

  beforeEach(function() {
    rimraf.sync(tmp);
    fs.mkdirSync(tmp);
  });

  afterEach(function() {
    // rimraf.sync(tmp);
  });

  describe('auto', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'auto', 'expected.css')
      , expectedMapPath = path.join(__dirname, 'sourcemap', 'auto', 'expected.css.map')
      , inputPath = path.join(__dirname, 'sourcemap', 'tmp', 'input.scss')
      , originalPath = path.join(__dirname, 'sourcemap', 'auto', 'input.scss')
      , expectedCSS, expectedMap;

    before(function(done) {
      fs.readFile(expectedCSSPath, 'utf8', function(err, data) {
        if (err) {
          throw err;
        }
        expectedCSS = data;
        fs.readFile(expectedMapPath, 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          expectedMap = data;
          fs.writeFile(inputPath, originalPath, function(err) {
            if (err) {
              throw err;
            }
            done();
          });
        });
      });
    });

    it.only('(--sourcemap auto) compiles', function(done) {
      var result = spawn('node', [cli, '--sourcemap=auto', inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          // assert.equal(err, false, 'The CSS file should exist');
          assert.equal(data, expectedCSS);
          fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
            // assert.equal(err, undefined, 'The Map file should exist');
            assert.equal(data, expectedMap);
            done();
          });
        });
      });
    });

    it('is used when no sourcemap parameter provided', function(done) {
      var result = spawn('node', [cli, inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(err, undefined, 'No errors reading CSS file');
          assert.equal(data, expectedCSS);
          fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
            assert.equal(err, undefined, 'No errors reading Map file');
            assert.equal(data, expectedMap);
            done();
          });
        });
      });
    });

    it('(--sourcemap auto) has a sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'auto', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(err, undefined, 'No errors reading CSS file');
          assert.notEqual(data.indexOf('/*# sourceMappingURL='), -1);
          done();
        });
      });
    });
  });

  describe('file', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'file', 'expected.css')
      , expectedMapPath = path.join(__dirname, 'sourcemap', 'file', 'expected.css.map')
      , inputPath = path.join(__dirname, 'sourcemap', 'file', 'input.scss')
      , expectedCSS, expectedMap;

    before(function(done) {
      fs.readFile(expectedCSSPath, 'utf8', function(err, data) {
        if (err) {
          throw err;
        }
        expectedCSS = data;
        fs.readFile(expectedMapPath, 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          expectedMap = data;
          done();
        });
      });
    });

    it('(--sourcemap file) compiles', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'file', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expectedCSS);
        fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          assert.equal(data, expectedMap);
          done();
        });
      });
    });

    it('(--sourcemap file) has a sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'file', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.notEqual(data.indexOf('/*# sourceMappingURL='), -1);
        done();
      });
    });
  });

  describe('inline', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'inline', 'expected.css')
      , expectedMapPath = path.join(__dirname, 'sourcemap', 'inline', 'expected.css.map')
      , inputPath = path.join(__dirname, 'sourcemap', 'inline', 'input.scss')
      , expectedCSS, expectedMap;

    before(function(done) {
      fs.readFile(expectedCSSPath, 'utf8', function(err, data) {
        if (err) {
          throw err;
        }
        expectedCSS = data;
        fs.readFile(expectedMapPath, 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          expectedMap = data;
          done();
        });
      });
    });

    it('(--sourcemap inline) compiles', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'inline', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expectedCSS);
        fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          assert.equal(data, expectedMap);
          done();
        });
      });
    });

    it('(--sourcemap inline) has a sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'inline', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.notEqual(data.indexOf('/*# sourceMappingURL='), -1);
        done();
      });
    });
  });

  describe('none', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'none', 'expected.css')
      , inputPath = path.join(__dirname, 'sourcemap', 'none', 'input.scss')
      , expectedCSS;

    before(function(done) {
      fs.readFile(expectedCSSPath, 'utf8', function(err, data) {
        if (err) {
          throw err;
        }
        expectedCSS = data;
        done();
      });
    });

    it('(--sourcemap none) has no .map', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'none', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data, expectedCSS);
        done();
      });
    });

    it('(--sourcemap none) has no sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'none', inputPath, outputPath]);

      result.stdout.setEncoding('utf8');
      result.stdout.once('data', function(data) {
        assert.equal(data.indexOf('/*# sourceMappingURL='), -1);
        done();
      });
    });
  });
});
