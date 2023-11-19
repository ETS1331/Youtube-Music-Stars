//below is the horrendous inner html for the five star scale
inner = `
<input type="radio" onclick = "getStars('songID', 10)" id="songID10" name="songID" value="10" /><label for="songID10" title="5 stars"></label>
<input type="radio" onclick = "getStars('songID', 9)" id="songID9" name="songID" value="9" /><label class="half" for="songID9" title="4 1/2 stars"></label>
<input type="radio" onclick = "getStars('songID', 8)" id="songID8" name="songID" value="8" /><label for="songID8" title="4 stars"></label>
<input type="radio" onclick = "getStars('songID', 7)" id="songID7" name="songID" value="7" /><label class="half" for="songID7" title="3 1/2 stars"></label>
<input type="radio" onclick = "getStars('songID', 6)" id="songID6" name="songID" value="6" /><label for="songID6" title="3 stars"></label>
<input type="radio" onclick = "getStars('songID', 5)" id="songID5" name="songID" value="5" /><label class="half" for="songID5" title="2 1/2 stars"></label>
<input type="radio" onclick = "getStars('songID', 4)" id="songID4" name="songID" value="4" /><label for="songID4" title="2 stars"></label>
<input type="radio" onclick = "getStars('songID', 3)" id="songID3" name="songID" value="3" /><label class="half" for="songID3" title="1 1/2 stars"></label>
<input type="radio" onclick = "getStars('songID', 2)" id="songID2" name="songID" value="2" /><label for="songID2" title="1 star"></label>
<input type="radio" onclick = "getStars('songID', 1)" id="songID1" name="songID" value="1" /><label class="half" for="songID1" title="1/2 star"></label>
`
//given a title and an author (and the corresponding element), replace the unit and add stars to it
function replaceUnit(title, artist, element){
	var newid = title + "&&" + artist;
	//below in case there are single or double quotes
	//These are slightly different versions of quotes that use different unicode and shouldn't mess things up
	newid = newid.replace(/"/g, '\u201D'); 
	newid = newid.replace(/'/g, "\u2019");
	//replace the element
	newInner = inner; 
	newInner = newInner.replace(/songID/gi, newid);
	var newElement = document.createElement('fieldset');
	newElement.classList.add('rate');
	newElement.innerHTML = newInner;
	//Then replace
	element.replaceWith(newElement);
	//Return the id that was generated
	return newid;

}
//if we are in a playlist, replace it
function replacePlaylist(){
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
	var elements = document.getElementsByClassName("menu style-scope ytmusic-responsive-list-item-renderer");
	const idList = [];
	for (var i = elements.length - 1; i >= 0; i--) {
		//First generate the html required
		var parentElement = elements[i].parentElement;
		var text = parentElement.querySelectorAll('yt-formatted-string');
		if (playlistType == 'Album'){
			var title = text[1].title;
		}
		else{
			var title = text[0].title;
			var artist = text[1].title;
		}
		//run replace script
		var element = elements[i];
		newid = replaceUnit(title,artist,element);
		//add id to list
		idList[idList.length] = newid;
	}
	return idList;	

}
//If we are playing something, we should note this down
function replacePlayer(){
	idList = []; //has size at most one but wtv
	tmp = document.getElementsByClassName('thumbs style-scope ytmusic-player-bar');
	if (tmp.length > 0) {
		element = tmp[0];
		parentElement = element.parentElement.parentElement;
		vals = parentElement.querySelectorAll('yt-formatted-string');
		if (vals.length == 2){
			title = vals[0].innerText.trim();
			artist = vals[1].innerText.split('•')[0].trim();
			id = replaceUnit(title,artist,element);
			console.log(id);
			idList[idList.length] = id;
		}
	}
	return idList;

}
//final function
function replaceLikes(){
	idList = []; //A list of all ids seen, so that they can be replaced
	//Check if there is playlist in the url
	var url = location.href;
	if (url.includes('playlist')){
		idList = idList.concat(replacePlaylist());
	}
	//replace the music player; somehow it always claims to be running but wtv
	idList = idList.concat(replacePlayer());
	console.log(idList);
	//Finally, for every element already seen, check if there was already a star rating, and add it
	chrome.storage.local.get(null, function(items){
		for(var i = 0; i < idList.length; i++) {
			newid = idList[i];
			if (items[newid] !== undefined) {
				s = newid + items[newid].toString()
				document.getElementById(s).checked = true;
			}

		}
	});

}

replaceLikes();
