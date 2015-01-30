var MainPage = function() {
    this.title = element(by.binding('title'));
    this.nav = element(by.css('.e2e-nav'));

    this.get = function() {
    	browser.get('http://localhost:9001');
  	};

};

module.exports = new MainPage();