'use strict'
angular.module('ngScaffoldApp').directive 'map', ($log, $q, $timeout, uiGmapGoogleMapApi, mapSettings) ->
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/modules/map/map-tmplt.html'
        link: (scope, element, attrs) -> 
            scope.googleMap = {}       

            scope.markers = [
                {
                    id: 1
                    name: 'name 1'
                    latitude: 63.522180 
                    longitude: 22.530485
                    items : [
                        '12'
                        '23'
                        '34'
                        '45'
                        '56'
                        '67'
                        '78'
                    ]                    
                }
                {
                    id: 2
                    name: 'name 3'
                    latitude: 63.536353499630507713
                    longitude: 22.537164688110351562
                    items : [
                        '1'
                        '2'
                        '3'
                        '4'
                        '5'
                        '6'
                        '7'
                    ]
                }                
            ]


            _setMapPosition = () ->
                _htmlEl = document.documentElement
                _mapEl = document.getElementsByClassName 'angular-google-map-container'
                _mapEl[0].style.height = _htmlEl.clientHeight+'px'     


            # setup for map
            scope.marker =
                events: 
                    click: (currentMarker) ->
                        model = currentMarker.model
                        
                        if not scope.currentMarker
                            scope.currentMarker = currentMarker
                            $timeout () ->
                                scope.googleMap.getGMap().setCenter({lat: model.latitude, lng: model.longitude})
                            , 600
                        
                        else
                            _items = currentMarker.model.items
                            currentMarker.model.items = []
                            scope.currentMarker = currentMarker
                            scope.googleMap.getGMap().panTo({lat: model.latitude, lng: model.longitude})
                            $timeout () ->
                                scope.currentMarker.model.items = _items
                                items = []
                            , 1000                           
                        
            _mapSettings = mapSettings
            _mapSettings.events = 
                'click': -> 
                    console.log 'resize'

            scope.map = _mapSettings
            
            #events
            uiGmapGoogleMapApi.then (map) ->         
                _setMapPosition()

            window.onresize = _setMapPosition