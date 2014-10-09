/**/
'use strict()';

var config = {
    port: 3000
};

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            client: require('./bower.json').appPath || 'public',
            dist: 'dist'
        },
        injector: {
            options: {

            },
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/public/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
                            '{.tmp,<%= yeoman.client %>}/assets/**/*.js',
                            '!{.tmp,<%= yeoman.client %>}/app/app.js',
                            '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
                            '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js']
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/public/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        '<%= yeoman.client %>/components/**/*.css',
                        '<%= yeoman.client %>/assets/**/*.css'
                    ]
                }
            }
        },
        wiredep: {
            target: {
                src: '<%= yeoman.client %>/index.html',
                ignorePath: '<%= yeoman.client %>/'
            }
        },
        express: {
            options: {
                port: config.port
            },
            dev: {
                options: {
                    script: 'keystone.js',
                    debug: true
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                force: true
            },
            all: [ 'routes/**/*.js',
                'models/**/*.js'
            ],
            server: [
                './keystone.js'
            ]
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost'
                }
            }
        },

        nodemon: {
            debug: {
                script: 'keystone.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        port: config.port
                    },
                    ignore: ['public/']
                }
            }
        },

        watch: {
            js: {
                files: [
                    'model/**/*.js',
                    'routes/**/*.js'
                ],
                tasks: ['jshint:all']
            },
            express: {
                files: [
                    'keystone.js',
                    'public/js/lib/**/*.{js,json}'
                ],
                tasks: ['jshint:server', 'concurrent:dev']
            },
            livereload: {
                files: ['public/**/**',
                    'public/styles/**/*.css',
                    'public/styles/**/*.less',
                    'templates/**/*.jade',
                    'node_modules/keystone/templates/**/*.jade'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    // load jshint
    grunt.registerTask('lint', function (target) {
        grunt.task.run([
            'jshint'
        ]);
    });

    // default option to connect server
    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'injector',
            'wiredep',
            'jshint',
            'concurrent:dev'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

};
