var app = {
    deviceKey: "62DTRFhtBdadgG6ofusVTZ",

    initialize: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        document.getElementById('status').innerHTML = 'Received Event: deviceready';
        
        var args = [];
        args.push(app.deviceKey);
        
        var userAgent = window.navigator.userAgent.toLowerCase(); 
        // if (/iphone|ipad|ipod/.test( userAgent )) {
        //    var appId = "123456789";            // your ios app id in app store
        //    args.push(appId);
        // 
        // }
        
        window.plugins.appsFlyer.initSdk(args);
        
        document.addEventListener('onInstallConversionDataLoaded', app.onInstallConversionDataLoaded);
        document.getElementById('getUserID').onclick = app.getUserId;
        document.getElementById('sendEvent').onclick = app.sendEvent;
        document.addEventListener('purchase', app.logEventData);
        document.getElementById('devID').onclick = app.getAppsFlyerUID;
        app.trackEvent();
    },
    onInstallConversionDataLoaded: function(e){
        console.log(e.detail);
        alert(JSON.stringify(e.detail));
    },
    getUserId: function(e) {
        window.plugins.appsFlyer.getAppsFlyerUID(alert);
        
    },
    
    sendEvent: function(){
        //console.log("purchase");
		window.plugins.appsFlyer.sendTrackingWithEvent("purchase", "0.99");
	},
    trackEvent: function (eventName, eventValue) {    
		eventName = "af_add_to_cart";
		eventValue = { "af_content_id": "id1234", "af_revenue": 2, "af_content_type": "type 1" };
		window.plugins.appsFlyer.trackEvent(eventName, eventValue);
	},
    logEventData: function(e) {
        document.getElementById('check').innerHTML = JSON.stringify(e);
        alert(JSON.stringify(e));
        //console.log(e);
    },
    getAppsFlyerUID: function(){
        var getUserIdCallbackFn = function(id) {
            alert('received id is: ' + id);
        };
    window.plugins.appsFlyer.getAppsFlyerUID(getUserIdCallbackFn);
    }

};

document.addEventListener("DOMContentLoaded", app.initialize);


