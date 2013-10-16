module.exports = function(grunt) {
    grunt.initConfig({
        // 配置文件，参考package.json配置方式，必须设置项是
        // name, version, author
        // name作为gallery发布后的模块名
        // version是版本，也是发布目录
        // author必须是{name: "xxx", email: "xxx"}格式
        pkg: grunt.file.readJSON('abc.json'),
        banner: '/*!build time : <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>*/\n',

        // kmc打包任务，默认情况，入口文件是index.js，可以自行添加入口文件，在files下面
        // 添加
        kmc: {
            options: {
                packages: [
                    {
                        name: '<%= pkg.name %>',
                        path: '../'
                    }
                ],
                map: [
                    ["<%= pkg.name %>/", "gallery/<%= pkg.name %>/"]
                ]
            },
            main: {
                files: [
                    {
                        src: "<%= pkg.version %>/index.js",
                        dest: "<%= pkg.version %>/build/index.js"
                    },
                    {
                        src: "<%= pkg.version %>/basic.js",
                        dest: "<%= pkg.version %>/build/basic.js"
                    },
                    {
                        src: "<%= pkg.version %>/conf.js",
                        dest: "<%= pkg.version %>/build/conf.js"
                    },
                    {
                        src: "<%= pkg.version %>/proxy.js",
                        dest: "<%= pkg.version %>/build/proxy.js"
                    },
                    {
                        src: "<%= pkg.version %>/util.js",
                        dest: "<%= pkg.version %>/build/util.js"
                    },
                    {
                        src: "<%= pkg.version %>/xd.js",
                        dest: "<%= pkg.version %>/build/xd.js"
                    }
                ]
            }
        },
        /**
         * 对JS文件进行压缩
         * @link https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                banner: '<%= banner %>',
                beautify: {
                    ascii_only: true
                }
            },
            page: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.version %>/build',
                        src: ['**/*.js', '!**/*-min.js'],
                        dest: '<%= pkg.version %>/build',
                        ext: '-min.js'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.version %>',
                        src: ['*.html'], // , '!build/', '!demo'
                        dest: '<%= pkg.version %>/build'
                    }
                ]
            }
        },
        cssmin: {
            main: {
                files: [
//                    {
//                        expand: true,
//                        cwd: '<%= pkg.version %>/build',
//                        src: ['**/*.css', '!**/*-min.css'],
//                        dest: '<%= pkg.version %>/build',
//                        ext: '-min.css'
//                    }
                ]
            }
        }
    });

    // 使用到的任务，可以增加其他任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    return grunt.registerTask('default', ['kmc', 'uglify', 'copy', 'cssmin']);
};