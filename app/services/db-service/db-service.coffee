angular.module('ngScaffoldApp').factory 'DB', [
	'$http'
	($http) ->

		_updateNode = (path, val)->
			$http.put 'http://localhost:3000/collections/tree/'+path, val

		_getPlace = (latitude, longitude) ->
			$http.get 'http://localhost:3000/collections/map/'+latitude+'/'+longitude 

		_get = (collection)->
			$http.get 'http://localhost:3000/collections/'+collection		

		_getById = (collection, id)->
			$http.get 'http://localhost:3000/collections/'+collection+'/'+id		

		_post = (collection, data)->
			$http.post 'http://localhost:3000/collections/'+collection, data

		_put = (collection, id, data)->
			$http.put 'http://localhost:3000/collections/'+collection+'/'+id, data

		_getTree = (parent)->
			$http.get 'http://localhost:3000/collections/tree/'+parent		

		_delete = (collection, id)->
			$http.delete 'http://localhost:3000/collections/'+collection+'/'+id					
			 
		updateNode: _updateNode
		getPlace: _getPlace
		get: _get
		getById: _getById
		post: _post
		put: _put
		getTree: _getTree
		delete: _delete
]