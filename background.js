function executeScript(id, url, scriptname, scriptparams = null){
	//from url get domain name
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	var domain = matches && matches[1];
	console.log(domain);
	//given domain name execute the wanted script
	if(domain == 'music.youtube.com'){
		if (scriptparams == null) {
			chrome.scripting.executeScript({
				target: {tabId: id, allFrames: true},
				files: [scriptname],
			});
		}
		else {
			//simply store the params in storage beforehand
			chrome.storage.local.set({params: scriptparams}, function(){
				chrome.scripting.executeScript({
					target: {tabId: id, allFrames: true},
					files: [scriptname],
				});
			});
		}
	}	
}

function replaceStars(){
	//query for tabid, url
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		id=tabs[0].id;
		url = tabs[0].url;
		executeScript(id, url, 'replace.js');
	});
}

//handle messages for database updates
chrome.runtime.onMessageExternal.addListener(
function(request, sender, sendResponse){
	if (request.message[0] == 'new_score'){
		//store the new score
		console.log(request,sender,sendResponse);
		var id = request.message[1];
		realid = id.replaceAll("_+1", ""); 
		var score = request.message[2];
		chrome.storage.local.set({[realid]:score}, function(){
		});
		//after storing the new score, make sure that all duplicates reflect this new score 	
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			id=tabs[0].id;
			url = tabs[0].url;
			executeScript(id, url, 'reflect.js', [realid,score]);
		});

	}
});
//Replace stars on new page load
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	replaceStars();
});
//Replace stars when asked to do so
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.text == "replaceStars") {
		replaceStars();
	}
});
