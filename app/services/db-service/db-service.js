angular.module('ngScaffoldApp').factory('DB', [
  '$http', function($http) {
    var _delete, _get, _getById, _getPlace, _getTree, _post, _put, _updateNode;
    _updateNode = function(path, val) {
      return $http.put('http://localhost:3000/collections/tree/' + path, val);
    };
    _getPlace = function(latitude, longitude) {
      return $http.get('http://localhost:3000/collections/map/' + latitude + '/' + longitude);
    };
    _get = function(collection) {
      return $http.get('http://localhost:3000/collections/' + collection);
    };
    _getById = function(collection, id) {
      return $http.get('http://localhost:3000/collections/' + collection + '/' + id);
    };
    _post = function(collection, data) {
      return $http.post('http://localhost:3000/collections/' + collection, data);
    };
    _put = function(collection, id, data) {
      return $http.put('http://localhost:3000/collections/' + collection + '/' + id, data);
    };
    _getTree = function(parent) {
      return $http.get('http://localhost:3000/collections/tree/' + parent);
    };
    _delete = function(collection, id) {
      return $http["delete"]('http://localhost:3000/collections/' + collection + '/' + id);
    };
    return {
      updateNode: _updateNode,
      getPlace: _getPlace,
      get: _get,
      getById: _getById,
      post: _post,
      put: _put,
      getTree: _getTree,
      "delete": _delete
    };
  }
]);

//# sourceMappingURL=db-service.js.map
