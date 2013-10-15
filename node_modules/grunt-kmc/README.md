# grunt-kmc

[![Build Status](https://travis-ci.org/daxingplay/grunt-kmc.png?branch=master)](https://travis-ci.org/daxingplay/grunt-kmc)

[![NPM version](https://badge.fury.io/js/grunt-kmc.png)](http://badge.fury.io/js/grunt-kmc)

> Grunt plugin for KISSY Module Compiler

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kmc --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kmc');
```

## The "kmc" task

### Overview
In your project's Gruntfile, add a section named `kmc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  kmc: {
    options: {
      // Task-specific options go here.
      // for options, please refer to [kmc](https://github.com/daxingplay/ModuleCompiler).
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.packages
Type: `Array`
Default value: `[]`

KISSY package configuration.

#### options.charset
Type: `String`
Default value: `utf-8`

#### options.comboOnly
Type: `Boolean`
Default Value: `false`

#### options.depFilePath
Type: `String`
Default value: ``

dep file output path

#### options.depFileCharset
Type: `String`
Default value: `same as options.charset`

output charset.

#### options.traverse
Type: `Boolean`
Default value: `false`

build all files in src recursively.

#### options.comboMap

Type:`Boolean`
Default value:`false`

generator one map file

### Usage Examples

#### Simple Example

```js
grunt.initConfig({
  kmc: {
    main:
        options: {
            packages: [
                {
                    name: 'test',
                    path: 'assets/src',
                    charset: 'gbk'
                }
            ]
        },
        files: [{
            src: 'assets/src/test/index.js',
            dest: 'assets/dist/test/index.combo.js'
        }]
  }
})
```

For detailed options configuration, please refer [kmc homepage](https://github.com/daxingplay/ModuleCompiler).

#### Another Example

Generator the Module Map File Only

```js
grunt.initConfig({
  kmc: {
    main:
        options: {
            packages: [
                {
                    name: 'test',
                    path: 'assets/src',
                    charset: 'gbk'
                }
            ],
			depFilePath:'build/mods.js',
			comboMap:true
        },
        files: [{
            src: 'assets/src/**/*.js',
            dest: 'assets/dist/'
        }]
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.7 bugfix for comboMap
* 0.1.6 add traverse option.
* 0.1.5 fix charset output bug.
