/*global module:false*/
module.exports = function(grunt) {
    var lrPort = 35729;
    var serveStatic = require('serve-static');


    var lrSnippet = require('connect-livereload')({
        port: lrPort
    });

    var lrMiddleware = function(connect, options) {
        return [
            lrSnippet,
            serveStatic(options.base[0])
        ];
    };

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            // gruntfile: {
            //   files: '<%= jshint.gruntfile.src %>',
            //   tasks: ['jshint:gruntfile']
            // },
            // lib_test: {
            //   files: '<%= jshint.lib_test.src %>',
            //   tasks: ['jshint:lib_test', 'qunit']
            // }
            client: {
                files: ['src/biz/**/*', 'src/*.css', 'src/*.js'],
                options: {
                    livereload: lrPort
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './dep/',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        less: {
            files: 'src/static/css/*.less',
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost',
                base: '.'
            },
            livereload: {
                options: {
                    middleware: lrMiddleware
                }
            }
        },
        regarde: {
            livereload: {
                files: ['*.js', '*.css', '*.html'],
                tasks: ['default', 'livereload']
            }
        },
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');

    // Default task.
    // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'bower', 'less']);
    // grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);
    grunt.registerTask('live', ['connect', 'watch']);


};