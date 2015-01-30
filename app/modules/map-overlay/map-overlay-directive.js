'use strict';
angular.module('ngScaffoldApp').directive('mapOverlay', function($log, $q, uiGmapGoogleMapApi, mapSettings) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: '/modules/map-overlay/map-overlay-tmplt.html',
    link: function(scope, element, attrs) {
      scope.close = function() {
        return scope.currentMarker = '';
      };
    }
  };
});

//# sourceMappingURL=map-overlay-directive.js.map
