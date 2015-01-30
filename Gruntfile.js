"use strict";
module.exports = function(grunt) {
  var appConfig;
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  appConfig = {
    app: require("./bower.json").appPath || "app",
    dist: "dist"
  };
  grunt.initConfig({
    yeoman: appConfig,
    watch: {
      bower: {
        files: ["bower.json"],
        tasks: ["wiredep"]
      },
      js: {
        files: ["!**/*.spec.js", "<%= yeoman.app %>/scripts/{,*/}*.js", "<%= yeoman.app %>/modules/{,*/}*.js"],
        tasks: ["newer:jshint:all"],
        options: {
          livereload: "<%= connect.options.livereload %>"
        }
      },
      coffee: {
        files: ["**/*.coffee", "!bower_components/**/*.coffee"],
        tasks: ["scripts"]
      },
      jsTest: {
        files: ["test/spec/{,*/}*.js"],
        tasks: ["newer:jshint:test", "karma"]
      },
      styles: {
        files: ["<%= yeoman.app %>/styles/{,*/}*.less", "<%= yeoman.app %>/modules/{,*/}*.less", "<%= yeoman.app %>/views/{,*/}*.less"],
        tasks: ["style", "newer:copy:styles"]
      },
      gruntfile: {
        files: ["Gruntfile.js"]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: ["<%= yeoman.app %>/{,*/}*.html", "<%= yeoman.app %>/modules/{,*/}*.html", "<%= yeoman.app %>/styles/{,*/}*.css", "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: "localhost",
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [connect["static"](".tmp"), connect().use("/bower_components", connect["static"]("./bower_components")), connect["static"](appConfig.app)];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [connect["static"](".tmp"), connect["static"]("test"), connect().use("/bower_components", connect["static"]("./bower_components")), connect["static"](appConfig.app)];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: "<%= yeoman.dist %>"
        }
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      },
      all: {
        src: ["Gruntfile.js", "<%= yeoman.app %>/scripts/{,*/}*.js"]
      },
      test: {
        options: {
          jshintrc: "test/config/.jshintrc"
        },
        src: ["test/spec/{,*/}*.js"]
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [".tmp", "<%= yeoman.dist %>/{,*/}*", "!<%= yeoman.dist %>/.git{,*/}*"]
          }
        ]
      },
      server: ".tmp"
    },
    mkdir: {
      e2e: {
        options: {
          mode: "0700",
          create: [".e2e-out"]
        }
      }
    },
    wiredep: {
      app: {
        src: ["<%= yeoman.app %>/index.html"],
        ignorePath: /\.\.\//
      }
    },
    filerev: {
      dist: {
        src: ["<%= yeoman.dist %>/scripts/{,*/}*.js", "<%= yeoman.dist %>/styles/{,*/}*.css", "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}", "<%= yeoman.dist %>/styles/fonts/*"]
      }
    },
    useminPrepare: {
      html: "<%= yeoman.app %>/index.html",
      options: {
        dest: "<%= yeoman.dist %>",
        flow: {
          html: {
            steps: {
              js: ["concat", "uglifyjs"],
              css: ["cssmin"]
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ["<%= yeoman.dist %>/{,*/}*.html"],
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"],
      options: {
        assetsDirs: ["<%= yeoman.dist %>", "<%= yeoman.dist %>/images"]
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/images",
            src: "{,*/}*.{png,jpg,jpeg,gif}",
            dest: "<%= yeoman.dist %>/images"
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/images",
            src: "{,*/}*.svg",
            dest: "<%= yeoman.dist %>/images"
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.dist %>",
            src: ["*.html", "views/{,*/}*.html", "modules/{,*/}*.html"],
            dest: "<%= yeoman.dist %>"
          }
        ]
      }
    },
    ngAnnotate: {
      dist: {
        files: [
          {
            expand: true,
            cwd: ".tmp/concat/scripts",
            src: ["*.js", "!oldieshim.js"],
            dest: ".tmp/concat/scripts"
          }
        ]
      }
    },
    cdnify: {
      dist: {
        html: ["<%= yeoman.dist %>/*.html"]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "<%= yeoman.app %>",
            dest: "<%= yeoman.dist %>",
            src: ["*.{ico,png,txt}", ".htaccess", "*.html", "views/{,*/}*.html", "images/{,*/}*.{webp}", "fonts/{,*/}*.*", "modules/{,*/}*.html"]
          }, {
            expand: true,
            cwd: ".tmp/images",
            dest: "<%= yeoman.dist %>/images",
            src: ["generated/*"]
          }, {
            expand: true,
            cwd: "bower_components/bootstrap/dist",
            src: "fonts/*",
            dest: "<%= yeoman.dist %>"
          }
        ]
      },
      styles: {
        expand: true,
        cwd: "<%= yeoman.app %>/styles",
        dest: "<%= yeoman.app %>/styles",
        src: "{,*/}*.css"
      }
    },
    concurrent: {
      server: ["copy:styles"],
      test: ["copy:styles"],
      dist: ["copy:styles", "imagemin", "svgmin"]
    },
    coffee: {
      options: {
        bare: true,
        sourceMap: true
      },
      compile: {
        expand: true,
        flatten: false,
        cwd: "",
        src: ["**/*.coffee", "!node_modules/**/*.coffee", "!bower_components/**/*.coffee", "!app/bower_components/**/*.coffee"],
        dest: "",
        ext: ".js"
      }
    },
    karma: {
      unit: {
        configFile: "test/config/karma.conf.js",
        singleRun: true
      }
    },
    protractor: {
      options: {
        configFile: "test/config/protractor-conf.js",
        keepAlive: false,
        noColor: false,
        args: {}
      },
      e2e: {
        options: {
          args: {}
        }
      }
    },
    less: {
      options: {
        compress: true,
        yuicompress: true,
        optimization: 2,
        sourceMap: true
      },
      development: {
        files: {
          "<%= yeoman.app %>/styles/app.css": ["<%= yeoman.app %>/styles/less/main.less"]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ["last 2 versions", "ie 8", "ie 9"],
        map: {
          prev: true
        }
      },
      development: {
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/styles/",
            src: "{,*/}*.css",
            dest: "<%= yeoman.app %>/styles/"
          }
        ]
      }
    },
    csscomb: {
      options: {
        config: ".csscomb.json"
      },
      style: {
        expand: true,
        cwd: "<%= yeoman.app %>/",
        src: ["**/*.less", "!*.min.css", "!bower_components/**/*.less"],
        dest: "<%= yeoman.app %>/"
      }
    }
  });
  grunt.loadNpmTasks("grunt-mkdir");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-csscomb");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-protractor-runner");
  grunt.registerTask("serve", "Compile then start a connect web server", function(target) {
    if (target === "dist") {
      return grunt.task.run(["build", "connect:dist:keepalive"]);
    }
    grunt.task.run(["clean:server", "wiredep", "concurrent:server", "style", "scripts", "connect:livereload", "watch"]);
  });
  grunt.registerTask("server", "DEPRECATED TASK. Use the \"serve\" task instead", function(target) {
    grunt.log.warn("The `server` task has been deprecated. Use `grunt serve` to start a server.");
    grunt.task.run(["serve:" + target]);
  });
  grunt.registerTask("test", ["clean:server", "style", "scripts", "concurrent:test", "connect:test", "karma"]);
  grunt.registerTask("test-e2e", ["clean:server", "style", "scripts", "concurrent:test", "connect:test", "mkdir:e2e", "protractor"]);
  grunt.registerTask("style", ["csscomb", "less"]);
  grunt.registerTask("scripts", ["coffee"]);
  grunt.registerTask("build", ["clean:dist", "wiredep", "useminPrepare", "concurrent:dist", "scripts", "style", "concat", "ngAnnotate", "copy:dist", "cdnify", "cssmin", "uglify", "filerev", "usemin", "htmlmin"]);
  grunt.registerTask("default", ["newer:jshint", "test", "build"]);
};

//# sourceMappingURL=Gruntfile.js.map
