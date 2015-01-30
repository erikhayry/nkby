'use strict'
angular.module('ngScaffoldApp').directive 'map', ($log, $q, uiGmapGoogleMapApi, mapSettings) ->
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/modules/map/map-tmplt.html'
        link: (scope, element, attrs) ->

            _setMapHeight = ->
                _htmlEl = document.documentElement
                _mapEl = document.getElementsByClassName 'angular-google-map-container'
                _mapEl[0].style.height = _htmlEl.clientHeight+'px'                

            # setup for map
            scope.marker =
                events: 
                    click: ->

            _mapSettings = mapSettings
            _mapSettings.events = click: ->

            console.log _mapSettings

            scope.map = _mapSettings
            
            #init
            _setMapHeight()


            #events
            uiGmapGoogleMapApi.then (maps) ->
                console.log maps

            window.onresize = _setMapHeight