'use strict';
angular.module('ngScaffoldApp').directive('map', function($log, $q, uiGmapGoogleMapApi, mapSettings) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: '/modules/map/map-tmplt.html',
    link: function(scope, element, attrs) {
      var _mapSettings, _setMapHeight;
      _setMapHeight = function() {
        var _htmlEl, _mapEl;
        _htmlEl = document.documentElement;
        _mapEl = document.getElementsByClassName('angular-google-map-container');
        return _mapEl[0].style.height = _htmlEl.clientHeight + 'px';
      };
      scope.marker = {
        events: {
          click: function() {}
        }
      };
      _mapSettings = mapSettings;
      _mapSettings.events = {
        click: function() {}
      };
      console.log(_mapSettings);
      scope.map = _mapSettings;
      _setMapHeight();
      uiGmapGoogleMapApi.then(function(maps) {
        return console.log(maps);
      });
      return window.onresize = _setMapHeight;
    }
  };
});

//# sourceMappingURL=map-directive.js.map
