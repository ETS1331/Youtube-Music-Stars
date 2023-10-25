//This is the "replace stars" code
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

