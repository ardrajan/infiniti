module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // concat: {
        //     dist: {
        //         src: [
        //             'src/js/**/*.js'
        //         ],
        //         dest: 'public/js/production.js',
        //     }
        // },

        // uglify: {
        //     build: {
        //         src: 'public/js/portfolio/portfolio-main.js',
        //         dest: 'public/js/portfolio/portfolio-main.min.js'
        //     }
        // },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/img'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/theme.css': 'src/scss/theme.scss'
                }
            } 
        },

        jshint: {
            all: ['gruntfile.js', 'public/js/portfolio/*.js']
        },

        scsslint: {
            allFiles: ['src/scss/*.scss', 'src/scss/portfolio/*.scss']
        },

        validation: {
            options: {
            reset: grunt.option('reset') || false,
            stoponerror: false,
            // remotePath: 'http://decodize.com/',
            // remoteFiles: ['html/moving-from-wordpress-to-octopress/',
            //               'css/site-preloading-methods/'], //or
            // remoteFiles: 'validation-files.json', // JSON file contains array of page paths.
            relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'] //ignores these errors
            },
            files: {
                src: ['index.html']
                }
        },

        watch: {
            scripts: {
                files: ['public/js/portfolio/*.js'],
                // tasks: ['jshint', 'concat', 'uglify'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['src/scss/*.scss', 'src/scss/portfolio/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            html:{
                files: ['*.html'],
                tasks: [],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-validation');

    grunt.registerTask('default', ['imagemin', 'watch', 'validation']);
};
