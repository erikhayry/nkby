'use strict'

###*
@ngdoc overview
@name ngScaffoldApp
@description
# ngScaffoldApp

Main module of the application.
###
angular.module('ngScaffoldApp', [
  'ngAnimate'
  'ngAria'
  'ngCookies'
  'ngMessages'
  'ngResource'
  'ngRoute'
  'ngSanitize'
  'ngTouch'
  'ui.router'
  'uiGmapgoogle-maps'
])
.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise '/'
  
  # States
  $stateProvider.state 'map',
    url: '/'
    controller: 'MapCtrl'
    templateUrl: 'views/map/map-view.html'

  return

.config (uiGmapGoogleMapApiProvider) ->
    uiGmapGoogleMapApiProvider.configure        
        key: 'AIzaSyB1t3KIHZN93NqVZjvLaXW3X8buZuuxCbc'
        v: "3.17"
        libraries: "weather,geometry,visualization"

    return
# filters
.filter "reverse", ->
  (items) ->
    items.slice().reverse()
