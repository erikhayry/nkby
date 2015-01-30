'use strict';

/**
@ngdoc overview
@name ngScaffoldApp
@description
 * ngScaffoldApp

Main module of the application.
 */
angular.module('ngScaffoldApp', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.router', 'uiGmapgoogle-maps']).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('map', {
    url: '/',
    controller: 'MapCtrl',
    templateUrl: 'views/map/map-view.html'
  });
}).config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB1t3KIHZN93NqVZjvLaXW3X8buZuuxCbc',
    v: "3.17",
    libraries: "weather,geometry,visualization"
  });
}).filter("reverse", function() {
  return function(items) {
    return items.slice().reverse();
  };
});

//# sourceMappingURL=app.js.map
