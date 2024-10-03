
let bPasswordVisible = false;
let arrPasswordInputs = [];
let btnEye;

Init();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received in content script:', request["message"]);
    if (request["message"]) 
    {
        const message = request["message"];

        if(message["type"] === "getVisibilityState")
        {
            SendMessagetoPopup({"type": "currentVisibiltyState", "uState" : bPasswordVisible});
            return;
        }
        
        if(message["type"] === "togglePassword")
        {
            SendMessagetoPopup({"type": "currentVisibiltyState", "uState" : !bPasswordVisible}, OnShowHidePasswordClicked);
            return;
        }
    }
});

/**
 * @param {boolean} bPasswordVisible 
 */
function ShowHidePassword(bShow)
{
    if(bShow)
    {
        arrPasswordInputs = document.querySelectorAll('input[type="password"]');        
    }

    arrPasswordInputs.forEach(input => {
        input.type = bShow ? "text" : "password";
    });

    UpdatePasswordIcon(bShow);
}

/**
 * @param {boolean} bVisible 
 */
function UpdatePasswordIcon(bVisible)
{
    let strIcon = bVisible ? chrome.runtime.getURL("./icons/eye-slash.png") : chrome.runtime.getURL("./icons/eye.png");
    btnEye.title = bVisible ? "Hide password" : "Show password";

    let eyeIcon = btnEye.children[0];
    eyeIcon.src = strIcon;
}


function SendMessagetoPopup(message, cb)
{
    if(!cb)
        cb = (res) => {};

    chrome.runtime.sendMessage({message}, cb);
}

function Init()
{
    CreateEyeBtn();
}

function CreateEyeBtn()
{
    // <button title="Show/Hide Password" id="snap-btn-show-hide-password" class="snap-btn"><i class="fas fa-eye"></i></button>
    
    btnEye = document.createElement("button");
    btnEye.id = "snap-btn-show-hide-password";
    btnEye.className = "snap-btn"; 
    btnEye.title = "Show Password";

    let eyeIcon = document.createElement("img");
    eyeIcon.src = chrome.runtime.getURL("./icons/eye.png");
    btnEye.appendChild(eyeIcon);

    document.body.appendChild(btnEye);

    btnEye.addEventListener("click", OnShowHidePasswordClicked);
}

function OnShowHidePasswordClicked()
{
    bPasswordVisible = !bPasswordVisible;
    ShowHidePassword(bPasswordVisible);
}


function DisposeAll()
{
    const arrCls = ["snap-btn-show-hide-password"];

    for(let cls of arrCls)
    {
        const arrEle = document.getElementsByClassName(cls);
        for(let ele of arrEle)
        {
            ele.remove();
        }
    }
}

