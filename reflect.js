//reflect the true score
function reflect(item, score) {
	console.log(item);
	console.log(score);
	var l = document.getElementsByClassName(item + score.toString());
	for (var i = 0; i < l.length; i++) {
		console.log(l[i]);
		var parentVal = l[i].parentElement
		console.log(parentVal);
		var tmp = parentVal.querySelector('input[value = "'+score.toString()+'"]');
		console.log(tmp.id);
		console.log(tmp.id.substring(0, tmp.id.length - 1));
		chrome.storage.local.set({[tmp.id.substring(0, tmp.id.length - 1)]:score}, function(){
		});
		tmp.checked = true;
	}
}
chrome.storage.local.get("params", function (items) {
    reflect(items.params[0], items.params[1]);
    chrome.storage.local.remove('params');
});
