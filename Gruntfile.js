module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        nodeunit: {
            all: ['test/**/*.js']
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
            build: ['build', 'bower_components'],
            dist:  ['dist']
        },

        watch: {
            files: ['src/*.js', 'test/*.js'],
            tasks: ['ci']
        }
    });

    // Load Grunt tasks from NPM packages
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('init', ['clean:build', 'clean:dist']);
    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('test', 'nodeunit');
    grunt.registerTask('build', ['copy:build', 'uglify:build']);
    grunt.registerTask('dist', ['copy:dist', 'clean:build']);

    grunt.registerTask('ci', ['lint', 'test']);

    // Default task(s).
    grunt.registerTask('default', ['init', 'lint', 'test', 'build', 'dist']);
};
