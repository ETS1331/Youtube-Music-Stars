//below is the horrendous inner html for the five star scale
//surely someday I'll change it to be more automated surely
inner = `
<input type="radio" onclick = "getStars('UniqueSongID', 10)" id="UniqueSongID10" name="UniqueSongID" value="10" /><label class="songID10"  for="UniqueSongID10" title="5 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 9)" id="UniqueSongID9" name="UniqueSongID" value="9" /><label class="half songID9" for="UniqueSongID9" title="4 1/2 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 8)" id="UniqueSongID8" name="UniqueSongID" value="8" /><label class="songID8" for="UniqueSongID8" title="4 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 7)" id="UniqueSongID7" name="UniqueSongID" value="7" /><label class="half songID7" for="UniqueSongID7" title="3 1/2 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 6)" id="UniqueSongID6" name="UniqueSongID" value="6" /><label class="songID6" for="UniqueSongID6" title="3 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 5)" id="UniqueSongID5" name="UniqueSongID" value="5" /><label class="half songID5" for="UniqueSongID5" title="2 1/2 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 4)" id="UniqueSongID4" name="UniqueSongID" value="4" /><label class="songID4" for="UniqueSongID4" title="2 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 3)" id="UniqueSongID3" name="UniqueSongID" value="3" /><label class="half songID3" for="UniqueSongID3" title="1 1/2 stars"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 2)" id="UniqueSongID2" name="UniqueSongID" value="2" /><label class="songID2" for="UniqueSongID2" title="1 star"></label>
<input type="radio" onclick = "getStars('UniqueSongID', 1)" id="UniqueSongID1" name="UniqueSongID" value="1" /><label class="half songID1" for="UniqueSongID1" title="1/2 star"></label>
`
//given a title and an author (and the corresponding element), replace the unit and add stars to it
function replaceUnit(title, artist, element, idList){
	var newid = title + "&&" + artist;
	//below in case there are single or double quotes
	//These are slightly different versions of quotes that use different unicode and shouldn't mess things up
	newid = newid.replace(/"/g, '\u201D'); 
	newid = newid.replace(/'/g, "\u2019");
	//replace spaces with underscores, in order to prevent class and other html issues
	newid = newid.replace(/ /g, "_"); 
	//check for duplication
	var uniqueid = newid;
	while (idList.includes(uniqueid)) {
		uniqueid += '_+1'; //just to make sure this id isn't actually present in any song
	}
	//replace the element
	newInner = inner; 
	newInner = newInner.replace(/UniqueSongID/gi, uniqueid);
	newInner = newInner.replace(/songID/gi, newid);
	var newElement = document.createElement('fieldset');
	newElement.classList.add('rate');
	newElement.innerHTML = newInner;
	//Then replace
	element.replaceWith(newElement);
	//Return the id that was generated
	return uniqueid;

}
//if we are in a playlist, replace it
function replacePlaylist(idList){
	//check if it is album or different
	var tmp = document.getElementsByClassName("subtitle style-scope ytmusic-detail-header-renderer");
	var playlistType = tmp[0].innerText.split('•')[0];
	playlistType = playlistType.trim(); //May be trailing spaces
	//iirc the types are private, public, radio, mix, album, but I think only album matters
	if (playlistType == 'Album'){
		//Get the author
		tmp = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
		artist = tmp[0].innerText;
	}
	var parentElements = document.querySelectorAll("ytmusic-responsive-list-item-renderer");
	for (var i = parentElements.length - 1; i >= 0; i--) {
		//First generate the html required
		var parentElement = parentElements[i];
		var text = parentElement.querySelectorAll('yt-formatted-string');
		if (playlistType == 'Album'){
			var title = text[1].title;
		}
		else{
			var title = text[0].title;
			var artist = text[1].title;
		}
		//run replace script
		//silly function to prevent bugs that involve having to wait for query selection
		let get = function() {
			return parentElement.querySelector('ytmusic-like-button-renderer'); 
		}
		var element = get();
		if (element == null){
			let get = function() {
				return parentElement.querySelector('fieldset'); 
			}
			element = get();
		}
		newid = replaceUnit(title,artist,element, idList);
		//add id to list
		idList[idList.length] = newid;
	}
	return idList;	

}
//If we are playing something, we should note this down
function replacePlayer(idList){
	tmp = document.getElementsByClassName('middle-controls style-scope ytmusic-player-bar');
	element = tmp[0];
	vals = element.querySelectorAll('yt-formatted-string');
	//silly function to prevent bugs that involve having to wait for query selection
	let get = function() {
		return element.querySelector('ytmusic-like-button-renderer');
	}
	var newElement = get();
	if (newElement == null){
		let get = function() {
			return element.querySelector('fieldset'); 
		}
		newElement = get();
	}
	if (vals.length == 2){
		title = vals[0].innerText.trim();
		artist = vals[1].innerText.split('•')[0].trim();
		id = replaceUnit(title,artist,newElement,idList);
		idList[idList.length] = id;
	}
	return idList;

}
//final function
function replaceLikes(){
	idList = []; //A list of all ids seen, so that they can be replaced
	//Check if there is playlist in the url
	var url = location.href;
	if (url.includes('playlist')){
		idList = replacePlaylist(idList);
	}
	//replace the music player; somehow it always claims to be running but wtv
	idList = replacePlayer(idList);
	//Finally, for every element already seen, check if there was already a star rating, and add it
	chrome.storage.local.get(null, function(items){
		for(var i = 0; i < idList.length; i++) {
			newid = idList[i];
			realid = newid.replaceAll("_+1", ""); 
			if (items[realid] !== undefined) {
				s = newid + items[realid].toString();
				document.getElementById(s).checked = true;
			}

		}
	});

}

replaceLikes();
