import { data } from "./utils"


//local dic
let localSCC = {
    sesSCC: 0,
    sesEmp: 0,
    sesHydra: 0
};

var display = new Display();
display.setBackground("none");
display.setRenderLoc(data.SCC.x, data.SCC.y);


var value = -1;
var timeTF = -1;
var dh = -1;

//All chats for water sea creatures
const waterCreatures = /^(A Squid appeared\.|You caught a Sea Walker\.|Pitch darkness reveals a Night Squid\.|You stumbled upon a Sea Guardian\.|It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious\!|You reeled in a Sea Archer\.|The Rider of the Deep has emerged\.|Huh\? A Catfish\!|Is this even a fish\? It's the Carrot King\!|Gross! A Sea Leech\!|You've discovered a Guardian Defender of the sea\.|You have awoken the Deep Sea Protector, prepare for a battle\!|The Water Hydra has come to test your strength\.|Sea Emperor arises from the depths\.|Your Chumcap Bucket trembles, it's an Agarimoo\.)$/;


//========START AND STOP SC TRACKING========
//
//
//

register("command", startTracking).setName("sccGo");

register("command", stopTracking).setName("sccStop");

function startTracking() {
    ChatLib.chat("Now Tracking Sea Creatures!!");
    value = 0;
    display.show();
}

//Accounces ink tracking will stop
function stopTracking() {
    ChatLib.chat("Sea Creature Tracking Stopping.");
    display.hide();
    value = -1;
}




//========EMP TIMER========
//
//
//

register("command", (message) => {

    if(message.toLowerCase() == "start") {
        ChatLib.chat("&bSea Emp timer started!");
        timeTF = 0;
    } else if(message.toLowerCase() == "stop") {
        ChatLib.chat("&bSea Emp timer stopped!");
        timeTF = -1;
    } else {
        ChatLib.chat("&bInvalid condition of " + message + " entered. Please enter either start or stop.");
    }

}).setName("empTimer");


//========MOVE DISPLAY========
//
//
//

register("command", (x,y) => {
    x = parseInt(x);
    y = parseInt(y);

    updateDisplay(x, y);
    ChatLib.chat("&aDisplay moved to: " + x + ", " + y);

}).setName("moveDisplaySCC");

function updateDisplay(x, y) {
    data.SCC.x = x;
    data.SCC.y = y;
    data.save();
    display.setRenderLoc(x, y);
}




//========DH CONDITIONS========
//
//
//

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook!");

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook! Woot woot!");





//========ALL TRACKERS========
//
//
//

//emp
register("chat", () => {
    if(!value==0) return;

    if(dh == 0) {
        localSCC.sesEmp += 2;
        data.SCC.emp += 2;
        data.SCC.empTime = 0;
        dh = -1;
        data.save();
    } else {
        localSCC.sesEmp += 1;
        data.SCC.emp += 1;
        data.SCC.empTime = 0;
        dh = -1;
        data.save();
    }

}).setCriteria("Sea Emperor arises from the depths.");


//hydra
register("chat", () => {
    if(!value==0) return;

    if(dh == 0) {
        localSCC.sesHydra += 2;
        data.SCC.hydra += 2;
        dh = -1;
        data.save();
    } else {
        localSCC.sesHydra += 1;
        data.SCC.hydra += 1;
        dh = -1;
        data.save();
    }

}).setCriteria("The Water Hydra has come to test your strength.");


//all
register("chat", () => {
    if(!value==0) return;

    if(dh == 0) {
        localSCC.sesSCC += 2;
        data.SCC.ttlSCC += 2;
        dh = -1;
        data.save();
    } else {
        localSCC.sesSCC += 1;
        data.SCC.ttlSCC += 1;
        dh = -1;
        data.save();
    }

}).setCriteria(waterCreatures)


//Time since emp tracker
register("step", () => {
    if(!timeTF==0) return;

    data.SCC.empTime += 1;
    data.save();

}).setFps(1);


//========RENDER DISPLAY========
//
//
//

register ("tick", () => {
    if(!value==0) return;

    var minutes = (data.SCC.empTime) / 60;
    minutes = Math.round(minutes, 1);


    display.setLine(0, "&b&l" + "==Sea Creatures Display!==");
    display.setLine(1, "&6" + "Sea Creatures Caught: " + localSCC.sesSCC);
    display.setLine(2, "&b" + "Hydras Caught: " + localSCC.sesHydra);
    display.setLine(3, "&d" + "Emps Caught: " + localSCC.sesEmp);
    if(minutes <=1) {
        display.setLine(4, "&4" + "Time Since Emp: " + minutes + " minute");
    } else {
        display.setLine(4, "&4" + "Time Since Emp: " + minutes + " minutes");
    }
    display.setLine(5, "&6" + "Total Sea Creatures Caught: " + data.SCC.ttlSCC);
    display.setLine(6, "&b" + "Total Hydras Caught: " + data.SCC.hydra);
    display.setLine(7, "&d" + "Total Emps Caught: " + data.SCC.emp);
});

