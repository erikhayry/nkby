'use strict'
angular.module('ngScaffoldApp').directive 'mapOverlay', ($log, $q, uiGmapGoogleMapApi, mapSettings) ->
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/modules/map-overlay/map-overlay-tmplt.html'
        link: (scope, element, attrs) ->           
            scope.close = -> 
                scope.currentMarker = ''

            return