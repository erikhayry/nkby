angular.module('ngScaffoldApp').factory('Utils', [
  function() {
    var _addToArr, _arrHas, _flattenObj, _isFolder, _removeFromArr;
    _isFolder = function(node) {
      return node.base.indexOf('.') < 0;
    };
    _removeFromArr = function(arr, id) {
      return arr.splice(arr.indexOf(id), 1);
    };
    _addToArr = function(arr, id) {
      return arr.push(id);
    };
    _arrHas = function(arr, id) {
      return arr.indexOf(id) > -1;
    };
    _flattenObj = function(obj) {
      var arr, o;
      arr = [];
      for (o in obj) {
        arr.push(obj[o].text);
      }
      return _.uniq(arr);
    };
    return {
      isFolder: _isFolder,
      removeFromArr: _removeFromArr,
      addToArr: _addToArr,
      arrHas: _arrHas,
      flattenObj: _flattenObj
    };
  }
]);

//# sourceMappingURL=utils-service.js.map
