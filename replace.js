inner = `
 <input type="radio" id="rating10" name="rating" value="10" /><label for="rating10" title="5 stars"></label>
    <input type="radio" id="rating9" name="rating" value="9" /><label class="half" for="rating9" title="4 1/2 stars"></label>
    <input type="radio" id="rating8" name="rating" value="8" /><label for="rating8" title="4 stars"></label>
    <input type="radio" id="rating7" name="rating" value="7" /><label class="half" for="rating7" title="3 1/2 stars"></label>
    <input type="radio" id="rating6" name="rating" value="6" /><label for="rating6" title="3 stars"></label>
    <input type="radio" id="rating5" name="rating" value="5" /><label class="half" for="rating5" title="2 1/2 stars"></label>
    <input type="radio" id="rating4" name="rating" value="4" /><label for="rating4" title="2 stars"></label>
    <input type="radio" id="rating3" name="rating" value="3" /><label class="half" for="rating3" title="1 1/2 stars"></label>
    <input type="radio" id="rating2" name="rating" value="2" /><label for="rating2" title="1 star"></label>
    <input type="radio" id="rating1" name="rating" value="1" /><label class="half" for="rating1" title="1/2 star"></label>
`
//above is the horrendous inner html for the five star scale
function replaceLikes(){
	var elements = document.getElementsByClassName("menu style-scope ytmusic-responsive-list-item-renderer")
	for (var i = elements.length - 1; i >= 0; i--) {
		//First generate the html required
		var newElement = document.createElement('fieldset');
		newElement.classList.add('rate');
		newInner = inner; //Guarantee distinctness
		newInner = newInner.replace(/rating/gi, i.toString()+'rating')
		console.log(newInner)
		newElement.innerHTML = newInner;
		console.log(newElement);
		//Then replace
		var element = elements[i];
		element.replaceWith(newElement);
	}
	console.log(elements);
}

replaceLikes();
