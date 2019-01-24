window.onerror = function(err) {
	console.log('window.onerror: ' + err)
}

function test() {
	console.log('test,,, ' )
	alert("test..");
}

function clearHistory() {
	console.log('clearHistory,,, ' )
	window.WebViewJavascriptBridge.callHandler('clearHistory', {}, function(dataFromNative) {});
}

var JsBridge = null;
function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if (window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
}

setupWebViewJavascriptBridge(function(bridge) {
	JsBridge = bridge;
});

