//Requirement : bootstrap-notify < https://github.com/mouse0270/bootstrap-growl > 
//Requirement : loading < https://github.com/Taewa/loading > 
//Author : Taehwa KIM

var AjaxCall = {
	/* Properties
	========================================================================== */
	wrapper : $(".wrapper"),

	/* Init
	========================================================================== */
	init : function(){
		var self = this;

		self.ajaxLoading();
	},




	/* GET
	========================================================================== */
	getData : function(url, callback){
		var self = this;

		$.ajax({
			type: 'GET',
			dataType: "json",
			contentType: "application/json",
			url: url,
			success: function (res) {
				callback(res);
			},
			error: function (res) {
				self.ajaxFailAction(res.responseJSON, url);
			},
		});
	},



	/* POST
	========================================================================== */
	postData : function(url, data, callback){
		var self = this;

		$.ajax({
			type: 'POST',
			data: data,
			url: url,
			success: function (res) {
				callback(res);
			},
			error: function (res) {
				self.ajaxFailAction(res.responseJSON, url);
			}
		});
	},




	/* Ajax loading
	========================================================================== */
	ajaxLoading : function(){
		if(typeof Loading == "undefined"){console.log('no Loading plugin'); return;}

		var self = this;
		var wrapper = self.wrapper;
		
		var loadingObj = Object.create(Loading);
		loadingObj.init(wrapper);
		
		$(document).on({
			ajaxStart: function(){
				loadingObj.show();
			},
			ajaxStop: function(){
				loadingObj.hide();
			}    
		});
	},	//End ajaxLoading


	ajaxFailAction : function(res, url){
		console.log('err : ' + res.msg + ', url : ' + url);
		
		if(typeof Alert == "undefined"){console.log('no $.notify'); return;}
		
		var msg = res.msg? '<span class="msg-error">' + res.msg + '</span>' : 'Error';
		var info = res.info? '<p class="info-error">Raison : ' + res.info + '</p>' : '';

		var alertMsg = msg + info;

		
		Alert.show({
			icon: 'ion-sad-outline',
			"message" : alertMsg
		},{
			type: 'danger',
			delay: 8000,
		});
	}
}	//End AjaxCall


//Init
//var ajaxCall = Object.create(AjaxCall);
AjaxCall.init();	//It does not need instance, just service.