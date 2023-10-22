chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    console.log(tabs[0].id);
    my_tabid=tabs[0].id;
});
chrome.scripting.executeScript({
    target: {tabId: my_tabid, allFrames: true},
    files: ['content.js'],
});
});
