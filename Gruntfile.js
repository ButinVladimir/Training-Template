const HTML_PATH = __dirname + "/src/html/";
const CSS_PATH = __dirname + "/src/css/";
const SPRITES_PATH = __dirname + "/src/sprites/";
const IMAGES_PATH = __dirname + "/src/images/";

const OUTPUT_PATH = __dirname + "/build";
const TEMP_PATH = __dirname + "/tmp/";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sprite: {
          all: {
            src: SPRITES_PATH + '*.png',
            dest: OUTPUT_PATH + '/sprites.png',
            destCss: TEMP_PATH + 'sprites.css',
            imgPath: 'sprites.png',
          }
        },
        
        clean: {
            sprites: [TEMP_PATH + '/**/*.*']
        },
        
        copy: {
            all: {
                files: [{
                    expand: true,
                    cwd: IMAGES_PATH,
                    src: "**",
                    dest: OUTPUT_PATH + "/images"
                }]
            }
        },

        concat: {
            options: {
                separator: "\n",
            },

            html: {
                files: [
                    {
                        dest: OUTPUT_PATH + "/index.html",
                        src: [
                            HTML_PATH + "page_start.html",
                            HTML_PATH + "header.html",
                            HTML_PATH + "navigation.html",
                            HTML_PATH + "slider.html",
                            HTML_PATH + "new_products.html",
                            HTML_PATH + "featured_products.html",
                            HTML_PATH + "who.html",
                            HTML_PATH + "footer.html",
                            HTML_PATH + "page_end.html",
                        ],
                        nonull: true
                    }
                ]
            },
            
            css: {
                files: [
                    {
                        dest: OUTPUT_PATH + "/style.css",
                        src: [
                            TEMP_PATH + "sprites.css",
                            CSS_PATH + "main.css",
                            CSS_PATH + "header.css",
                            CSS_PATH + "slider.css",
                            CSS_PATH + "navigation.css",
                            CSS_PATH + "products.css",
                            CSS_PATH + "who.css",
                            CSS_PATH + "footer.css",
                        ],
                        nonull: true
                    }
                ]
            }
        },

        watch: {
            options: {
                interrupt: true,
                debounceDelay: 1000,
                interval: 200,
                livereload: true,
            },
            sprites: {
                files: [SPRITES_PATH + "*.*"],
                tasks: ['sprite', 'concat:css'],
            },
            html: {
                files: [HTML_PATH + "*.html"],
                tasks: ['concat:html'],
            },
            css: {
                files: [CSS_PATH + "*.css"],
                tasks: ['concat:css'],
            }
        },
        
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: OUTPUT_PATH,
                    keepalive: true,
                    livereload: true,
                    hostname: 'localhost'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.registerTask('build', ['sprite', 'concat', 'copy']);
    grunt.registerTask('work', ['watch']);
    grunt.registerTask('server', ['connect']);
}