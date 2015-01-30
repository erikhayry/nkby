angular.module('ngScaffoldApp').factory 'Utils', [
	() ->			
		
		_isFolder = (node) ->
        	node.base.indexOf('.') < 0
		
		_removeFromArr = (arr, id) ->
			arr.splice arr.indexOf(id), 1

		_addToArr = (arr, id) ->
		    arr.push(id) 
	
		_arrHas = (arr, id) ->
			arr.indexOf(id) > -1

		_flattenObj = (obj) ->
            arr = []
            for o of obj
              arr.push obj[o].text              
            _.uniq(arr);	
	    			
		isFolder: _isFolder
		removeFromArr: _removeFromArr
		addToArr: _addToArr
		arrHas: _arrHas,
		flattenObj: _flattenObj
]