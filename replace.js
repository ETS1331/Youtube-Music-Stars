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
//above is the horrendous inner html for the five star scale
function replaceLikes(){
	var elements = document.getElementsByClassName("menu style-scope ytmusic-responsive-list-item-renderer")
	for (var i = elements.length - 1; i >= 0; i--) {
		//First generate the html required
		var newElement = document.createElement('fieldset');
		newElement.classList.add('rate');
		newInner = inner; //Guarantee distinctness
		//Generate song id, replace with the input
		//Song id is simply {name of song} - {artist}
		//child class value:flex-columns style-scope ytmusic-responsive-list-item-renderera
		//TITLE:
		//title-column style-scope ytmusic-responsive-list-item-renderer
		//yt-formatted string, tag, title = (ex) "Moonlight at midday"
		//ARTIST:
		//secondary-flex-columns style-scope ytmusic-responsive-list-item-renderer
		//yt-formatted string, artist = tag, title "Tsukuyomi"
		var parentElement = elements[i].parentElement;
		var text = parentElement.querySelectorAll('yt-formatted-string');
		var title = text[0].title;
		var author = text[1].title;
		var newid = title + "&&" + author;
		//replace the element
		newInner = newInner.replace(/songID/gi, newid);
		newElement.innerHTML = newInner;
		//Then replace
		var element = elements[i];
		element.replaceWith(newElement);
	}
}

replaceLikes();
