//Requirement : spin < https://github.com/fgnass/spin.js > 
//Requirement : bootstrap-notify < https://github.com/mouse0270/bootstrap-growl > 
//Author : Taehwa KIM

var AjaxCall = {
	/* Properties
	========================================================================== */
	wrapper : $(".wrapper"),
	spinOpt : {
		  lines: 17 // The number of lines to draw
		, length: 0 // The length of each line
		, width: 10 // The line thickness
		, radius: 42 // The radius of the inner circle
		, scale: 0.6 // Scales overall size of the spinner
		, corners: 1 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0.2 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 1.2 // Rounds per second
		, trail: 75 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '50%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: false // Whether to render a shadow
		, hwaccel: false // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
		, color: '#195E86'
	},



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
		if(typeof Spinner == "undefined"){console.log('no spin plugin'); return;} 	//No spin

		var self = this;
		var wrapper = self.wrapper;
		var opts = self.spinOpt;
		var spinner = new Spinner(opts).spin();
		
		$(document).on({
			ajaxStart: function(){
				wrapper.append(spinner.el);
			},
			ajaxStop: function(){
				spinner.stop();
				spinner = new Spinner(opts).spin();	//For next loading
			}    
		});
	},	//End ajaxLoading


	ajaxFailAction : function(res, url){
		console.log('err : ' + res.msg + ', url : ' + url);
		
		if(typeof Alert == "undefined"){console.log('no $.notify'); return;} 	//No spin
		
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