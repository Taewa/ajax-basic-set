//Requirement : ajax-factory.js
//This class makes simpler ajax  management
//Author : Taehwa KIM

var PostData = Object.create(AjaxCall);


//Post edit host
PostData.methodName = function(data, callback){
	var self = this;
	var url = "/AJAX/PATH";
	self.postData(url, data, callback);
}


//Usage
// PostData.methodName(data, function(res){
// 	//Callback
// }, optionalParams);
