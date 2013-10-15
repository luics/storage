/**
 *
 * @author: 橘子<daxingplay@gmail.com>
 * @time: 13-3-12 11:41
 * @description:
 */

var fs = require('fs'),
    path = require('path'),
    colors = require('colors'),
    _ = require('lodash'),
    iconv = require('iconv-lite'),
    Compiler = require('./lib/compiler'),
    utils = require('./lib/utils'),
    parseConfig = require('./lib/parse-config');

function getModulePath(moduleName, config){
    for(var i = 0; i < config.packages.length; i++){
        var pkg = config.packages[i],
            mod = moduleName.match(new RegExp(pkg.name + '\/(.*)'));
        if(mod && mod[1]){
            var modulePath = path.resolve(pkg.path, pkg.name, mod[1].replace(/\.js/, '') + '.js');
            if(fs.existsSync(modulePath)){
                return modulePath;
            }
        }
    }
    return false;
}

module.exports = {
    _config: {},
    config: function(cfg){
        var self = this;
        if(cfg){
            self._config = parseConfig.parse(cfg, self._config);
        }
        self._config.packages = [];
        for(var pkg in self._config.pkgs){
            self._config.packages.push(self._config.pkgs[pkg]);
        }
        return this._config;
    },
    analyze: function(inputFile){
        var self = this;
        // to make sure there is at least one package in config.
        self._config = parseConfig.check(self._config, inputFile);
        // start to analyze.
        var c = new Compiler(self._config);
        console.log(c.modules);
        return c.analyze(inputFile);
    },
    build: function(inputFilePath, outputFilePath, outputCharset, depFile, traverse){
        var self = this,
            targets = [],
            result = {
                'success': true,
                'files': []
            },
            combo = [];
        if(_.isString(inputFilePath)){
            var target = path.resolve(inputFilePath);
            if(fs.existsSync(target)){
                if(fs.statSync(target).isDirectory()){
//                    var files = fs.readdirSync(target);
                    _.forEach(utils.traverseDirSync(target, traverse), function(file){
                        var inputFile = path.resolve(target, file),
                            outputFile = path.resolve(outputFilePath, path.relative(target, file));
                        if(path.extname(inputFile) === '.js'){
                            targets.push({
                                src: inputFile,
                                dest: outputFile
                            });
                        }
                    });
                }else{
                    targets.push({
                        src: target,
                        dest: outputFilePath
                    });
                }
            }else{
                // MC.build('pkgName/abc');
                // in this case, package must be configured.
                var modulePath = getModulePath(inputFilePath, self._config);
                if(modulePath){
                    targets.push({
                        src: modulePath,
                        dest: outputFilePath
                    });
                }
            }
        }else if(_.isPlainObject(inputFilePath)){
            _.forEach(inputFilePath, function(file){
                if(fs.src){
                    targets.push({
                        src: file.src,
                        dest: file.dest ? file.dest : path.dirname(file.src)
                    });
                }
            });
        }else if(_.isArray(inputFilePath)){
            var destIsArray = _.isArray(outputFilePath) ? outputFilePath : false;
            _.forEach(inputFilePath, function(file, index){
                targets.push({
                    src: file,
                    dest: destIsArray && outputFilePath[index] ? outputFilePath[index] : outputFilePath
                });
            });
        }

        _.forEach(targets, function(file, index){
            self._config = parseConfig.check(self._config, file.src);
            var config = _.cloneDeep(self._config);
            var kmc = new Compiler(config);
            var re = kmc.build(file.src, file.dest, outputCharset);
            re.modules = kmc.modules;
            depFile && combo.push(re.autoCombo);
            result.files.push(re);
        });
        result.success = result.files.length !== 0;

        if(depFile){
            utils.writeFileSync(path.resolve(path.dirname(outputFilePath), depFile), utils.joinCombo(combo), outputCharset);
        }

        return result;
    },
    combo: function(inputFile, depFileName, depFileCharset){
        var self = this,
            content,
            config;
        self._config = parseConfig.check(self._config, inputFile);
        config = _.cloneDeep(self._config);
        var c = new Compiler(config);
        c.analyze(inputFile);
        content = c.combo();
        if(content && depFileName){
            utils.writeFileSync(depFileName, content, depFileCharset);
        }
        return content;
    },
    clean: function(){
        this._config = {
            packages: [],
            exclude: [],
            charset: '',
            silent: false
        };
        return true;
    }
};