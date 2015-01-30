'use strict'

angular.module('ngScaffoldApp').controller 'AppCtrl', [
	'$scope'
	'$timeout'
	($scope, $timeout) ->
		$scope.$on 'alert', (event, data) ->
			$timeout.cancel timer
			
			$scope.alert = data

			timer = $timeout (->
			  $scope.alert = {}
			  return
			), 2000
]