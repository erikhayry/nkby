'use strict';
angular.module('ngScaffoldApp').directive('map', function($log, $q, $timeout, uiGmapGoogleMapApi, mapSettings) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: '/modules/map/map-tmplt.html',
    link: function(scope, element, attrs) {
      var _mapSettings, _setMapPosition;
      scope.googleMap = {};
      scope.markers = [
        {
          id: 1,
          name: 'name 1',
          latitude: 63.522180,
          longitude: 22.530485,
          items: ['12', '23', '34', '45', '56', '67', '78']
        }, {
          id: 2,
          name: 'name 3',
          latitude: 63.536353499630507713,
          longitude: 22.537164688110351562,
          items: ['1', '2', '3', '4', '5', '6', '7']
        }
      ];
      _setMapPosition = function() {
        var _htmlEl, _mapEl;
        _htmlEl = document.documentElement;
        _mapEl = document.getElementsByClassName('angular-google-map-container');
        return _mapEl[0].style.height = _htmlEl.clientHeight + 'px';
      };
      scope.marker = {
        events: {
          click: function(currentMarker) {
            var model, _items;
            model = currentMarker.model;
            if (!scope.currentMarker) {
              scope.currentMarker = currentMarker;
              return $timeout(function() {
                return scope.googleMap.getGMap().setCenter({
                  lat: model.latitude,
                  lng: model.longitude
                });
              }, 600);
            } else {
              _items = currentMarker.model.items;
              currentMarker.model.items = [];
              scope.currentMarker = currentMarker;
              scope.googleMap.getGMap().panTo({
                lat: model.latitude,
                lng: model.longitude
              });
              return $timeout(function() {
                var items;
                scope.currentMarker.model.items = _items;
                return items = [];
              }, 1000);
            }
          }
        }
      };
      _mapSettings = mapSettings;
      _mapSettings.events = {
        'click': function() {
          return console.log('resize');
        }
      };
      scope.map = _mapSettings;
      uiGmapGoogleMapApi.then(function(map) {
        return _setMapPosition();
      });
      return window.onresize = _setMapPosition;
    }
  };
});

//# sourceMappingURL=map-directive.js.map
