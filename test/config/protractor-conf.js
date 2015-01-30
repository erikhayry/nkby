exports.config = {
  // ---- 1. To start a standalone Selenium Server locally ---------------------
  // The location of the standalone Selenium Server jar file, relative
  // to the location of this config. If no other method of starting Selenium
  // Server is found, this will default to
  // node_modules/protractor/selenium/selenium-server...
  seleniumServerJar: './../../node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',

  // ChromeDriver location is used to help find the chromedriver binary.
  // This will be passed to the Selenium jar as the system property
  // webdriver.chrome.driver. If null, Selenium will
  // attempt to find ChromeDriver using PATH.
  chromeDriver: './../../node_modules/protractor/selenium/chromedriver',

  // Spec patterns are relative to the location of this config.
  specs: [
    '../e2e/**/*.e2e.js',
  ],

  // For a list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  //
  // In addition, you may specify count, shardTestFiles, and maxInstances.
  capabilities: {
    browserName: 'chrome'
  },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9001',

  // The timeout in milliseconds for each script run on the browser. This should
  // be longer than the maximum time your application needs to stabilize between
  // tasks.
  allScriptsTimeout: 11000,

  // How long to wait for a page to load.
  getPageTimeout: 10000,

  // If set, protractor will save the test output in json format at this path.
  // The path is relative to the location of this config.
  resultJsonOutputFile: '.e2e-output.json',

  // Options to be passed to Jasmine-node.
  onPrepare: function() {      
    require('jasmine-reporters');
    jasmine.getEnv().addReporter(
      new jasmine.JUnitXmlReporter(null, true, true, '.e2e-out/')
    );
  },

  afterLaunch: function() {
    var fs = require('fs'),
        log = fs.readFileSync('.e2e-output.json', 'utf8'),
        pfr = require('protractor-result-json-output-file-reader');

    pfr.printFromJson(JSON.parse(log));
  },


  // Test framework to use. This may be jasmine, jasmine2, cucumber, or mocha.
  //
  // Jasmine is fully supported as a test and assertion framework.
  // Mocha and Cucumber have limited beta support. You will need to include your
  // own assertion framework (such as Chai) if working with Mocha.
  framework: 'jasmine',

  // Options to be passed to jasmine2.
  //
  // See the full list at https://github.com/jasmine/jasmine-npm
  jasmineNodeOpts: {
    // If true, print colors to the terminal.
    showColors: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000,
    // Function called to print jasmine results.
    print: function(text) {
      console.log(text)
    },
    // If set, only execute specs whose names match the pattern, which is
    // internally compiled to a RegExp.
    grep: 'pattern',
    // Inverts 'grep' matches
    invertGrep: false
  }
};