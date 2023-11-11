//Inject stardatabase code
var s = document.createElement('script');
s.src = chrome.runtime.getURL('stardatabase.js');
//s.onload = function() {this.remove(); };
(document.head || document.documentElement).appendChild(s);
//



//Run the "replace stars" code
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
