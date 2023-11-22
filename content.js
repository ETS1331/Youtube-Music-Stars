//Inject stardatabase code
var s = document.createElement('script');
s.src = chrome.runtime.getURL('stardatabase.js');
//s.onload = function() {this.remove(); };
(document.head || document.documentElement).appendChild(s);
//



//Run the "replace stars" code on startup
var url = location.href;
var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
var domain = matches && matches[1];
//given domain name execute the wanted script
if(domain == 'music.youtube.com'){
	//Send message to background to replace stars
	chrome.runtime.sendMessage({text: "replaceStars"});
	//Mutation Observer on when the song name changes
	var parentTarget = document.getElementsByClassName('middle-controls style-scope ytmusic-player-bar')[0];
	var target = parentTarget.getElementsByClassName('title style-scope ytmusic-player-bar')[0];
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {  
		mutations.forEach(function(mutation) {
			if (mutation.addedNodes.length !== 0){
				console.log('mutation observed successfully');
				//chrome.runtime.sendMessage({text: "replaceStars"});
			}
		});    
	});

	console.log(observer);

	// configuration of the observer:
	var config = {childList: true, subtree: true};

	// pass in the target node, as well as the observer options
	observer.observe(target, config);
}

