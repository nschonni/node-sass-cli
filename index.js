#!/usr/bin/env node

var nopt = require('nopt')
  , sass = require('node-sass')
  , path = require('path')
  , knownOpts = {
    'load-path': [Array, path]
    , 'require': [Array, path]
    , 'compass': Boolean
    , 'style': [ 'nested', 'compressed', 'expanded' ]
    , 'help': Boolean
    , 'version': Boolean
    , 'watch': String
    , 'poll': Boolean
    , 'update': Boolean
    , 'force': Boolean
    , 'stop-on-error': Boolean
    , 'scss': Boolean
    , 'syntax': ['scss', 'sass']
    , 'sourcemap': ['auto', 'file', 'inline', 'none']
    , 'stdin': Boolean
    , 'default-encoding': String
    , 'unix-newlines': Boolean
    , 'debug-info': Boolean
    , 'line-numbers': Boolean
    , 'line-comments': Boolean
    , 'interactive': Boolean
    , 'check': Boolean
    , 'precision': Number
    , 'cache-location': path
    , 'no-cache': Boolean
    , 'trace': Boolean
    , 'quiet': Boolean
  }
  , shortHands = {
    I: 'load-path'
    , r: 'require'
    , t: 'style'
    , '?': 'help'
    , h: 'help'
    , f: 'force'
    , s: 'stdin'
    , E: 'default-encoding'
    , g: 'debug-info'
    , l: 'line-numbers'
    , i: 'interactive'
    , c: 'check'
    , C: 'no-cache'
    , q: 'quiet'
  }
  , parsed = nopt(knownOpts, shortHands, process.argv, 2);

if (parsed.help) {
  console.log(['Usage: sass [options] [INPUT] [OUTPUT]',
      '\n',
      'Description:',
      '  Converts SCSS or Sass files to CSS.',
      '\n',
      'Common Options:',
      '    -I, --load-path PATH             Specify a Sass import path.',
      '    -r, --require LIB                Require a library before running Sass.',
      '        --compass                    Make Compass imports available and load project configuration.',
      '    -t, --style NAME                 Output style. Can be nested (default), compact, compressed, or expanded.',
      '    -?, -h, --help                   Show this help message.',
      '    -v, --version                    Print the Sass version.',
      '\n',
      'Watching and Updating:',
      '        --watch                      Watch files or directories for changes.',
      '                                     The location of the generated CSS can be set using a colon:',
      '                                       sass --watch input.sass:output.css',
      '                                       sass --watch input-dir:output-dir',
      '        --poll                       Check for file changes manually, rather than relying on the OS.',
      '                                     Only meaningful for --watch.',
      '        --update                     Compile files or directories to CSS.',
      '                                     Locations are set like --watch.',
      '    -f, --force                      Recompile every Sass file, even if the CSS file is newer.',
      '                                     Only meaningful for --update.',
      '        --stop-on-error              If a file fails to compile, exit immediately.',
      '                                     Only meaningful for --watch and --update.',
      '\n',
      'Input and Output:',
      '        --scss                       Use the CSS-superset SCSS syntax.',
      '        --sourcemap=TYPE             How to link generated output to the source files.',
      '                                       auto (default): relative paths where possible, file URIs elsewhere',
      '                                       file: always absolute file URIs',
      '                                       inline: include the source text in the sourcemap',
      '                                       none: no sourcemaps',
      '    -s, --stdin                      Read input from standard input instead of an input file.',
      '                                     This is the default if no input file is specified.',
      '    -E, --default-encoding ENCODING  Specify the default encoding for input files.',
      '        --unix-newlines              Use Unix-style newlines in written files.',
      '                                     Always true on Unix.',
      '    -g, --debug-info                 Emit output that can be used by the FireSass Firebug plugin.',
      '    -l, --line-numbers               Emit comments in the generated CSS indicating the corresponding source line.',
      '        --line-comments',
      '\n',
      'Miscellaneous:',
      '    -i, --interactive                Run an interactive SassScript shell.',
      '    -c, --check                      Just check syntax, don\'t evaluate.',
      '        --precision NUMBER_OF_DIGITS How many digits of precision to use when outputting decimal numbers.',
      '                                     Defaults to 5.',
      '        --cache-location PATH        The path to save parsed Sass files. Defaults to .sass-cache.',
      '    -C, --no-cache                   Don\'t cache parsed Sass files.',
      '        --trace                      Show a full Ruby stack trace on error.',
      '    -q, --quiet                      Silence warnings and status messages during compilation.'
    ].join('\n')
  );
  process.exit(0);
}

if (parsed.version) {
  console.log(sass.info);
  process.exit(0);
}
