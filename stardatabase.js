//all code does is send the data from the webpage to the content script, in order to add it to the database locally
function getStars(id, number) {
	var editorExtensionId = 'obphdmdbcmjmpgplgmchaalbjibnehcf';
	chrome.runtime.sendMessage(editorExtensionId, {message: [id, number]});
}
