
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "plasmo",
        title: "Simplify your text",
        contexts: ["selection"],
        
       
    })
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
console.log(info)
})