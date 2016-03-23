//Requirement : ajax-factory.js
//This class makes simpler ajax  management
//Author : Taehwa KIM

var GetData = Object.create(AjaxCall);



//Get client data
GetData.methodName = function(callback){
	var self = this;
	var url = "/AJAX/PATH";
	self.getData(url, callback);
}

//Usage
// GetData.methodName(function(res){
// 	//Callback
// });