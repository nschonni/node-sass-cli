var assert = require('assert')
  , fs = require('fs')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , spawn = require('child_process').spawn
  , rimraf = require('rimraf');

// Notes:
//  - The libsass inserts an extra line after the sourceMappingURL line
//  - There is an order difference for the souremap
//  - The expected files and maps were generated using Ruby Sass 3.4.22
describe.only('sourcemap', function() {
  var cli = path.join(__dirname, '..', 'index.js')
    , tmp = path.join(__dirname, 'sourcemap', 'tmp')
    , outputPath = path.join(tmp, 'expected.css');

  before(function(done) {
    mkdirp(tmp, done);
  });
  
  after(function(done) {
    rimraf(tmp, done);
  });

  beforeEach(function(done) {
    rimraf(tmp + '/*', done);
  });

  afterEach(function(done) {
    rimraf(tmp + '/*', done);
  });

  describe('auto', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'auto', 'expected.css')
      , expectedMapPath = path.join(__dirname, 'sourcemap', 'auto', 'expected.css.map')
      , inputPath = path.join(__dirname, 'sourcemap', 'tmp', 'input.scss')
      , originalPath = path.join(__dirname, 'sourcemap', 'auto', 'input.scss')
      , expectedCSS, expectedMapJSON;

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
          expectedMapJSON = JSON.parse(data);
          fs.readFile(originalPath, 'utf8', function(err, data) {
            if (err) {
              throw err;
            }
            fs.writeFile(inputPath, data, 'utf8', done);
          });
        });
      });
    });

    it('(--sourcemap auto) compiles', function(done) {
      var result = spawn('node', [cli, '--sourcemap=auto', inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          // assert.equal(err, false, 'The CSS file should exist');
          assert.equal(data, expectedCSS.trim());
          fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
            var actualMapJSON = JSON.parse(data);
            assert.equal(actualMapJSON.version, expectedMapJSON.version);
            // assert.equal(actualMapJSON.mappings, expectedMapJSON.mappings);
            assert.deepEqual(actualMapJSON.sources, expectedMapJSON.sources);
            assert.deepEqual(actualMapJSON.names, expectedMapJSON.names);
            assert.equal(actualMapJSON.file, expectedMapJSON.file);
            done();
          });
        });
      });
    });

    it('is used when no sourcemap parameter provided', function(done) {
      var result = spawn('node', [cli, inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(data, expectedCSS.trim());
          fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
            var actualMapJSON = JSON.parse(data);
            assert.equal(actualMapJSON.version, expectedMapJSON.version);
            // assert.equal(actualMapJSON.mappings, expectedMapJSON.mappings);
            assert.deepEqual(actualMapJSON.sources, expectedMapJSON.sources);
            assert.deepEqual(actualMapJSON.names, expectedMapJSON.names);
            assert.equal(actualMapJSON.file, expectedMapJSON.file);
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
      , inputPath = path.join(__dirname, 'sourcemap', 'tmp', 'input.scss')
      , originalPath = path.join(__dirname, 'sourcemap', 'file', 'input.scss')
      , expectedCSS, expectedMapJSON;

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
          expectedMapJSON = JSON.parse(data);
          fs.readFile(originalPath, 'utf8', function(err, data) {
            if (err) {
              throw err;
            }
            fs.writeFile(inputPath, data, 'utf8', done);
          });
        });
      });
    });

    it('(--sourcemap file) compiles', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'file', inputPath, outputPath]);
      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(data, expectedCSS.trim());
          fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
            var actualMapJSON = JSON.parse(data);
            assert.equal(actualMapJSON.version, expectedMapJSON.version);
            // assert.equal(actualMapJSON.mappings, expectedMapJSON.mappings);
            assert.deepEqual(actualMapJSON.sources, expectedMapJSON.sources);
            assert.deepEqual(actualMapJSON.names, expectedMapJSON.names);
            assert.equal(actualMapJSON.file, expectedMapJSON.file);
            done();
          });
        });
      });
    });

    it('(--sourcemap file) has a sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'file', inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.notEqual(data.indexOf('/*# sourceMappingURL='), -1);
          done();
        });
      });
    });
  });

  describe('inline', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'inline', 'expected.css')
      , expectedMapPath = path.join(__dirname, 'sourcemap', 'inline', 'expected.css.map')
      , inputPath = path.join(__dirname, 'sourcemap', 'tmp', 'input.scss')
      , originalPath = path.join(__dirname, 'sourcemap', 'inline', 'input.scss')
      , expectedCSS, expectedMapJSON;

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
          expectedMapJSON = JSON.parse(data);
          fs.readFile(originalPath, 'utf8', function(err, data) {
            if (err) {
              throw err;
            }
            fs.writeFile(inputPath, data, 'utf8', done);
          });
        });
      });
    });

    it('(--sourcemap inline) compiles', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'inline', inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(data, expectedCSS.trim());
          fs.readFile(outputPath + '.map', 'utf8', function(err, data) {
            var actualMapJSON = JSON.parse(data);
            assert.equal(actualMapJSON.version, expectedMapJSON.version);
            // assert.equal(actualMapJSON.mappings, expectedMapJSON.mappings);
            assert.deepEqual(actualMapJSON.sources, expectedMapJSON.sources);
            assert.deepEqual(actualMapJSON.names, expectedMapJSON.names);
            assert.equal(actualMapJSON.file, expectedMapJSON.file);
            done();
          });
        });
      });
    });

    it('(--sourcemap inline) has a sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'inline', inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.notEqual(data.indexOf('/*# sourceMappingURL='), -1);
          done();
        });
      });
    });
  });

  describe('none', function() {
    var expectedCSSPath = path.join(__dirname, 'sourcemap', 'none', 'expected.css')
      , inputPath = path.join(__dirname, 'sourcemap', 'tmp', 'input.scss')
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

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(data, expectedCSS);
          done();
        });
      });
    });

    it('(--sourcemap none) has no sourceMappingURL in the CSS', function(done) {
      var result = spawn('node', [cli, '--sourcemap', 'none', inputPath, outputPath]);

      result.once('close', function() {
        fs.readFile(outputPath, 'utf8', function(err, data) {
          assert.equal(data.indexOf('/*# sourceMappingURL='), -1);
          done();
        });
      });
    });
  });
});
