angular.module('ngScaffoldApp').factory 'UrlFactory', [
	() ->			
		_encode  = (str) ->
		    str.replace(/&046/g, ".").replace(/&047/g, "/")	
		    
		_decode = (str) ->
			str.replace(/\./g, "&046").replace(/\//g, "&047")		    		
		
		encode: _encode
		decode: _decode
]