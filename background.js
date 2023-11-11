chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	//query for tabid, url
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		id=tabs[0].id;
		url = tabs[0].url;
	});
	//from url get domain name
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	var domain = matches && matches[1];
	console.log(domain);
	//given domain name execute the wanted script
	if(domain == 'music.youtube.com'){
		chrome.scripting.executeScript({
		    target: {tabId: id, allFrames: true},
		    files: ['replace.js'],
		});
	}
});
//handle messages for database updates
chrome.runtime.onMessageExternal.addListener(
function(request, sender, sendResponse){
	
	var id = request.message[0];
	var score = request.message[1];
	chrome.storage.local.set({[id]:score}, function(){
		console.log('done storing!');
	});
	chrome.storage.local.get(id, function(items){
		console.log(id,items[id]);
	});
});
