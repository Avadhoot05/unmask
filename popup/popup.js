function SendMessageToActiveTabContent(msg)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message" : msg});
    });
}

function OnMessageRecievedFromContent(request, sender, sendResponse)
{
    console.log('Message received from content script:', request["message"]);
    if (request["message"]) 
    {
        const message = request["message"];
        if(message["type"] === "currentVisibiltyState") 
        {
            const uState = message["uState"];
            UpdatePasswordIcon(uState);
            return;
        }
    }
}

/**
 * @param {boolean} bVisible 
 */
function UpdatePasswordIcon(bVisible)
{
    let strIcon = bVisible ? "fas fa-eye-slash" : "fas fa-eye";
    btnEye.title = bVisible ? "Hide password" : "Show password";

    let eyeIcon = btnEye.children[0];
    eyeIcon.className = strIcon;
}


chrome.runtime.onMessage.addListener(OnMessageRecievedFromContent);

const btnEye = document.getElementById("snap-btn-show-hide-password");
btnEye.addEventListener("click", () => {
    SendMessageToActiveTabContent({"type" : "togglePassword"});
});


SendMessageToActiveTabContent({"type" : "getVisibilityState"});


