chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received in content script:', request["message"]);
    if (request["message"]) 
    {
        const message = request["message"];
        if(message["type"] === "showPassword") 
        {
            ShowHidePassword(true);
            return;
        }

        if(message["type"] === "hidePassword") 
        {
            ShowHidePassword(false);
            return;
        }
    }
});



