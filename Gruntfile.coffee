# Generated on 2015-01-12 using generator-angular 0.10.0
"use strict"

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
  
  # Load grunt tasks automatically
  require("load-grunt-tasks") grunt
  
  # Time how long tasks take. Can help when optimizing build times
  require("time-grunt") grunt
  
  # Configurable paths for the application
  appConfig =
    app: require("./bower.json").appPath or "app"
    dist: "dist"

  
  # Define the configuration for all the tasks
  grunt.initConfig
    
    # Project settings
    yeoman: appConfig
    
    # Watches files for changes and runs tasks based on the changed files
    watch:
      bower:
        files: ["bower.json"]
        tasks: ["wiredep"]

      js:
        files: [
          "!**/*.spec.js"
          "<%= yeoman.app %>/scripts/{,*/}*.js"
          "<%= yeoman.app %>/modules/{,*/}*.js"
        ]
        tasks: ["newer:jshint:all"]
        options:
          livereload: "<%= connect.options.livereload %>"

      coffee:
        files: [
          "**/*.coffee"
          "!bower_components/**/*.coffee"
        ]
        tasks: ["scripts"]

      jsTest:
        files: ["test/spec/{,*/}*.js"]
        tasks: [
          "newer:jshint:test"
          "karma"
        ]

      styles:
        files: [
          "<%= yeoman.app %>/styles/{,*/}*.less"
          "<%= yeoman.app %>/modules/{,*/}*.less"
          "<%= yeoman.app %>/views/{,*/}*.less"
        ]
        tasks: [
          "style"
          "newer:copy:styles"
        ]

      gruntfile:
        files: ["Gruntfile.js"]

      livereload:
        options:
          livereload: "<%= connect.options.livereload %>"

        files: [
          "<%= yeoman.app %>/{,*/}*.html"
          "<%= yeoman.app %>/modules/{,*/}*.html"
          "<%= yeoman.app %>/styles/{,*/}*.css"
          "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]

    
    # The actual grunt server settings
    connect:
      options:
        port: 9000
        
        # Change this to '0.0.0.0' to access the server from outside.
        hostname: "localhost"
        livereload: 35729

      livereload:
        options:
          open: true
          middleware: (connect) ->
            [
              connect.static(".tmp")
              connect().use("/bower_components", connect.static("./bower_components"))
              connect.static(appConfig.app)
            ]

      test:
        options:
          port: 9001
          middleware: (connect) ->
            [
              connect.static(".tmp")
              connect.static("test")
              connect().use("/bower_components", connect.static("./bower_components"))
              connect.static(appConfig.app)
            ]

      dist:
        options:
          open: true
          base: "<%= yeoman.dist %>"

    
    # Make sure code styles are up to par and there are no obvious mistakes
    jshint:
      options:
        jshintrc: ".jshintrc"
        reporter: require("jshint-stylish")

      all:
        src: [
          "Gruntfile.js"
          "<%= yeoman.app %>/scripts/{,*/}*.js"
        ]

      test:
        options:
          jshintrc: "test/config/.jshintrc"

        src: ["test/spec/{,*/}*.js"]

    
    # Empties folders to start fresh
    clean:
      dist:
        files: [
          dot: true
          src: [
            ".tmp"
            "<%= yeoman.dist %>/{,*/}*"
            "!<%= yeoman.dist %>/.git{,*/}*"
          ]
        ]

      server: ".tmp"

    mkdir:
      e2e:
        options:
          mode: "0700"
          create: [".e2e-out"]

    
    # Automatically inject Bower components into the app
    wiredep:
      app:
        src: ["<%= yeoman.app %>/index.html"]
        ignorePath: /\.\.\//

    
    # Renames files for browser caching purposes
    filerev:
      dist:
        src: [
          "<%= yeoman.dist %>/scripts/{,*/}*.js"
          "<%= yeoman.dist %>/styles/{,*/}*.css"
          "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
          "<%= yeoman.dist %>/styles/fonts/*"
        ]

    
    # Reads HTML for usemin blocks to enable smart builds that automatically
    # concat, minify and revision files. Creates configurations in memory so
    # additional tasks can operate on them
    useminPrepare:
      html: "<%= yeoman.app %>/index.html"
      options:
        dest: "<%= yeoman.dist %>"
        flow:
          html:
            steps:
              js: [
                "concat"
                "uglifyjs"
              ]
              css: ["cssmin"]

            post: {}

    
    # Performs rewrites based on filerev and the useminPrepare configuration
    usemin:
      html: ["<%= yeoman.dist %>/{,*/}*.html"]
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]
      options:
        assetsDirs: [
          "<%= yeoman.dist %>"
          "<%= yeoman.dist %>/images"
        ]

    imagemin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/images"
          src: "{,*/}*.{png,jpg,jpeg,gif}"
          dest: "<%= yeoman.dist %>/images"
        ]

    svgmin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/images"
          src: "{,*/}*.svg"
          dest: "<%= yeoman.dist %>/images"
        ]

    htmlmin:
      dist:
        options:
          collapseWhitespace: true
          conservativeCollapse: true
          collapseBooleanAttributes: true
          removeCommentsFromCDATA: true
          removeOptionalTags: true

        files: [
          expand: true
          cwd: "<%= yeoman.dist %>"
          src: [
            "*.html"
            "views/{,*/}*.html"
            "modules/{,*/}*.html"
          ]
          dest: "<%= yeoman.dist %>"
        ]

    
    # ng-annotate tries to make the code safe for minification automatically
    # by using the Angular long form for dependency injection.
    ngAnnotate:
      dist:
        files: [
          expand: true
          cwd: ".tmp/concat/scripts"
          src: [
            "*.js"
            "!oldieshim.js"
          ]
          dest: ".tmp/concat/scripts"
        ]

    
    # Replace Google CDN references
    cdnify:
      dist:
        html: ["<%= yeoman.dist %>/*.html"]

    
    # Copies remaining files to places other tasks can use
    copy:
      dist:
        files: [
          {
            expand: true
            dot: true
            cwd: "<%= yeoman.app %>"
            dest: "<%= yeoman.dist %>"
            src: [
              "*.{ico,png,txt}"
              ".htaccess"
              "*.html"
              "views/{,*/}*.html"
              "images/{,*/}*.{webp}"
              "fonts/{,*/}*.*"
              "modules/{,*/}*.html"
            ]
          }
          {
            expand: true
            cwd: ".tmp/images"
            dest: "<%= yeoman.dist %>/images"
            src: ["generated/*"]
          }
          {
            expand: true
            cwd: "bower_components/bootstrap/dist"
            src: "fonts/*"
            dest: "<%= yeoman.dist %>"
          }
        ]

      styles:
        expand: true
        cwd: "<%= yeoman.app %>/styles"
        dest: "<%= yeoman.app %>/styles"
        src: "{,*/}*.css"

    
    # Run some tasks in parallel to speed up the build process
    concurrent:
      server: ["copy:styles"]
      test: ["copy:styles"]
      dist: [
        "copy:styles"
        "imagemin"
        "svgmin"
      ]

    coffee:
      options:
        bare: true
        sourceMap: true

      compile:
        expand: true
        flatten: false
        cwd: ""
        src: [
          "**/*.coffee"
          "!node_modules/**/*.coffee"
          "!bower_components/**/*.coffee"
          "!app/bower_components/**/*.coffee"
        ]
        dest: ""
        ext: ".js"

    
    # Test settings
    karma:
      unit:
        configFile: "test/config/karma.conf.js"
        singleRun: true

    
    # End-to-End test with Protractor
    protractor:
      options:
        configFile: "test/config/protractor-conf.js"
        keepAlive: false # If false, the grunt process stops when the test fails.
        noColor: false # If true, protractor will not use colors in its output.
        args: {}

      e2e:
        options:
          args: {}

    
    # Style tasks
    less:
      options:
        compress: true
        yuicompress: true
        optimization: 2
        sourceMap: true

      development:
        files:
          "<%= yeoman.app %>/styles/app.css": ["<%= yeoman.app %>/styles/less/main.less"]

    
    # Add vendor prefixed styles
    autoprefixer:
      options:
        browsers: [
          "last 2 versions"
          "ie 8"
          "ie 9"
        ]
        map:
          prev: true

      development:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/styles/"
          src: "{,*/}*.css"
          dest: "<%= yeoman.app %>/styles/"
        ]

    
    # Sort CSS properties in specific order.
    csscomb:
      options:
        config: ".csscomb.json"

      style:
        expand: true
        cwd: "<%= yeoman.app %>/"
        src: [
          "**/*.less"
          "!*.min.css"
          "!bower_components/**/*.less"
        ]
        dest: "<%= yeoman.app %>/"

  
  # utils
  grunt.loadNpmTasks "grunt-mkdir"
  
  # style
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-csscomb"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  
  #test
  grunt.loadNpmTasks "grunt-protractor-runner"
  grunt.registerTask "serve", "Compile then start a connect web server", (target) ->
    if target is "dist"
      return grunt.task.run([
        "build"
        "connect:dist:keepalive"
      ])
    grunt.task.run [
      "clean:server"
      "wiredep"
      "concurrent:server"
      "style"
      "scripts"
      "connect:livereload"
      "watch"
    ]
    return

  grunt.registerTask "server", "DEPRECATED TASK. Use the \"serve\" task instead", (target) ->
    grunt.log.warn "The `server` task has been deprecated. Use `grunt serve` to start a server."
    grunt.task.run ["serve:" + target]
    return

  grunt.registerTask "test", [
    "clean:server"
    "style"
    "scripts"
    "concurrent:test"
    "connect:test"
    "karma"
  ]
  
  grunt.registerTask "test-e2e", [
    "clean:server"
    "style"
    "scripts"
    "concurrent:test"
    "connect:test"
    "mkdir:e2e"
    "protractor"
  ]
  
  grunt.registerTask "style", [
    "csscomb"
    "less"
    #'autoprefixer'
  ]

  grunt.registerTask "scripts", [
    "coffee"
  ]  
  
  
  grunt.registerTask "build", [
    "clean:dist"
    "wiredep"
    "useminPrepare"
    "concurrent:dist"
    "scripts"
    "style"
    "concat"
    "ngAnnotate"
    "copy:dist"
    "cdnify"
    "cssmin"
    "uglify"
    "filerev"
    "usemin"
    "htmlmin"
  ]
  grunt.registerTask "default", [
    "newer:jshint"
    "test"
    "build"
  ]
  return