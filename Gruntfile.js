module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        qunit: {
            all: ['test/**/*.html']
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %>: <%= pkg.description %>\n' +
                        ' * Copyright: (c) 2009-2013 <%= pkg.author %>\n' +
                        ' * License: LGPLv3+\n' +
                        ' * Info: <%= pkg.homepage %>\n' +
                        ' */\n'
            },
            build: {
                src: 'build/csv.js',
                dest: 'build/csv.min.js'
            }
        },

        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'src/',   src: ['**'], dest: 'build/'}
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: 'build/', src: ['**'], dest: 'dist/'}
                ]
            }
        },

        clean: {
            build: ['build', 'components'],
            dist:  ['dist']
        }
    });

    // Load Grunt tasks from NPM packages
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:build', // start with a clean slate
        'clean:dist',

        'jshint',     // lint our JS in src/ and test/
        'copy:build', // copy our JS from src/ to build/
        'bower',      // install Bower components to build/lib/
        'qunit',      // perform unit tests (from build/)

        'uglify:build', // minify our JS in build/

        'copy:dist', // copy everything from build/ to dist/

        'clean:build' // cleanup build/
    ]);
};
