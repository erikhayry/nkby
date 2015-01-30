angular.module('ngScaffoldApp').factory('UrlFactory', [
  function() {
    var _decode, _encode;
    _encode = function(str) {
      return str.replace(/&046/g, ".").replace(/&047/g, "/");
    };
    _decode = function(str) {
      return str.replace(/\./g, "&046").replace(/\//g, "&047");
    };
    return {
      encode: _encode,
      decode: _decode
    };
  }
]);

//# sourceMappingURL=url-service.js.map
