function removeLikes(){
var elements = document.getElementsByClassName("menu style-scope ytmusic-responsive-list-item-renderer")
console.log(elements.length);
for (var i = elements.length - 1; i >= 0; i--) {
  var element = elements[i];
	element.remove();
  console.log(elements.length);
}
}

removeLikes();
