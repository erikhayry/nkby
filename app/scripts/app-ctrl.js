'use strict';
angular.module('ngScaffoldApp').controller('AppCtrl', [
  '$scope', '$timeout', function($scope, $timeout) {
    return $scope.$on('alert', function(event, data) {
      var timer;
      $timeout.cancel(timer);
      $scope.alert = data;
      return timer = $timeout((function() {
        $scope.alert = {};
      }), 2000);
    });
  }
]);

//# sourceMappingURL=app-ctrl.js.map
