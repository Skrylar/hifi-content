var button = document.getElementById("toggle");
var EVENT_BRIDGE_SETUP_DELAY = 100;

function buttonClicked(){
    EventBridge.emitWebEvent(JSON.stringify({
        type: "TOGGLE_APP"
    }));
}

button.addEventListener("click", buttonClicked);

function onScriptEventReceived(data){
// EventBridge message from HTML script.
    var data = JSON.parse(data);
    switch (data.type) {
        case "buttonStatus":
            if ( data.value ) {
                document.getElementById("toggle").value = "ON";
            } else {
                document.getElementById("toggle").value = "OFF";
            }
            break;
    }
}

function onLoad(){
    setTimeout(() => {
        EventBridge.scriptEventReceived.connect(onScriptEventReceived);    
        EventBridge.emitWebEvent(JSON.stringify({
            type: "EVENT_BRIDGE_OPEN_MESSAGE"
        }));   
    }, EVENT_BRIDGE_SETUP_DELAY);
}
onLoad();