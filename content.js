//Inject stardatabase code
var s = document.createElement('script');
s.src = chrome.runtime.getURL('stardatabase.js');
//s.onload = function() {this.remove(); };
(document.head || document.documentElement).appendChild(s);
//



//Run the "replace stars" code on startup
var url = location.href;
console.log(url);
var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
var domain = matches && matches[1];
console.log(domain);
//given domain name execute the wanted script
if(domain == 'music.youtube.com'){
	//Send message to background to replace stars
	chrome.runtime.sendMessage({text: "replaceStars"});
}
