import { data } from "./utils"


//local dic
let localSCC = {
    sesSCC: 0,
    sesEmp: 0,
    sesHydra: 0,
    sesMoo: 0,
    sesCarrot: 0
};

var display = new Display();
display.setBackground("none");
display.setRenderLoc(data.SCC.x, data.SCC.y);

const sccColor = data.CONFIG.sccColor;
const sccShadow = data.CONFIG.sccShadow;


var value = -1;
var timeTF = -1;
var dh = -1;

//All chats for water sea creatures
const waterCreatures = /^(A Squid appeared\.|You caught a Sea Walker\.|Pitch darkness reveals a Night Squid\.|You stumbled upon a Sea Guardian\.|It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious\!|You reeled in a Sea Archer\.|The Rider of the Deep has emerged\.|Huh\? A Catfish\!|Is this even a fish\? It's the Carrot King\!|Gross! A Sea Leech\!|You've discovered a Guardian Defender of the sea\.|You have awoken the Deep Sea Protector, prepare for a battle\!|The Water Hydra has come to test your strength\.|Sea Emperor arises from the depths\.|Your Chumcap Bucket trembles, it's an Agarimoo\.)$/;



//calc minutes
var minutes = (data.SCC.empTime) / 60;
minutes = Math.round(minutes, 1);

//strings
var titleString = "==Sea Creatures Display!==";
var sccString = "Sea Creatures Caught: " + localSCC.sesSCC;
var hydraString = "Hydras Caught: " + localSCC.sesHydra;
var empsString = "Emps Caught: " + localSCC.sesEmp;
var mooString = "Agarimoo Caught: " + localSCC.sesMoo;
var carrotString = "Carrot Kings Caught: "+ localSCC.sesCarrot;
var minuteString = "Time Since Emp: " + minutes + " minute";
var minutesString = "Time Since Emp: " + minutes + " minutes";
var sccString2 = "Total Sea Creatures Caught: " + data.SCC.ttlSCC;
var hydraString2 = "Total Hydras Caught: " + data.SCC.hydra;
var empString2 = "Total Emps Caught: " + data.SCC.emp;
var mooString2 = "Total Agarimoos Caught: " + data.SCC.moo;
var carrotString2 = "Total Carrot Kings Caught: " + data.SCC.carrot;

//display line objects
var title = setTitle(titleString, sccColor, sccShadow);
var scc = setTitle(sccString, sccColor, sccShadow);
var hydra = setTitle(hydraString, sccColor, sccShadow);
var emp = setTitle(empsString, sccColor, sccShadow);
var moo = setTitle(mooString, sccColor, sccShadow);
var carrot = setTitle(carrotString, sccColor, sccShadow);
var minute = setTitle(minuteString, sccColor, sccShadow);
var minutes = setTitle(minutesString, sccColor, sccShadow);
var scc2 = setTitle(sccString2, sccColor, sccShadow);
var hydra2 = setTitle(hydraString2, sccColor, sccShadow);
var emp2 = setTitle(empString2, sccColor, sccShadow);
var moo2 = setTitle(mooString2, sccColor, sccShadow);
var carrot2 = setTitle(carrotString2, sccColor, sccShadow);




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

//moo
register("chat", () => {
    if(!value==0) return;

    if(dh == 0) {
        localSCC.sesMoo += 2;
        data.SCC.moo += 2;
        data.SCC.tongue += ((data.SCC.mooDrop) *2);
        dh = -1;
        data.save();
    } else {
        localSCC.sesMoo += 1;
        data.SCC.moo += 1;
        data.SCC.tongue += (data.SCC.mooDrop);
        dh = -1;
        data.save();
    }

}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");


//moo
register("chat", () => {
    if(!value==0) return;

    if(dh == 0) {
        localSCC.sesCarrot += 2;
        data.SCC.carrot += 2;
        dh = -1;
        data.save();
    } else {
        localSCC.sesCarrot += 1;
        data.SCC.carrot += 1;
        dh = -1;
        data.save();
    }

}).setCriteria("Is this even a fish? It's the Carrot King!");


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


register("step", () => {

    //calc minutes
    var minutes = (data.SCC.empTime) / 60;
    minutes = Math.round(minutes, 1);

    //strings
    titleString = "==Sea Creatures Display!==";
    sccString = "Sea Creatures Caught: " + localSCC.sesSCC;
    hydraString = "Hydras Caught: " + localSCC.sesHydra;
    empsString = "Emps Caught: " + localSCC.sesEmp;
    mooString = "Agarimoo Caught: " + localSCC.sesMoo;
    carrotString = "Carrot Kings Caught: "+ localSCC.sesCarrot;
    minuteString = "Time Since Emp: " + minutes + " minute";
    minutesString = "Time Since Emp: " + minutes + " minutes";
    sccString2 = "Total Sea Creatures Caught: " + data.SCC.ttlSCC;
    hydraString2 = "Total Hydras Caught: " + data.SCC.hydra;
    empString2 = "Total Emps Caught: " + data.SCC.emp;
    mooString2 = "Total Agarimoos Caught: " + data.SCC.moo;
    carrotString2 = "Total Carrot Kings Caught: " + data.SCC.carrot;

    //display line objects
    title = setTitle(titleString, sccColor, sccShadow);
    scc = setTitle(sccString, sccColor, sccShadow);
    hydra = setTitle(hydraString, sccColor, sccShadow);
    emp = setTitle(empsString, sccColor, sccShadow);
    moo = setTitle(mooString, sccColor, sccShadow);
    carrot = setTitle(carrotString, sccColor, sccShadow);
    minute = setTitle(minuteString, sccColor, sccShadow);
    minutes = setTitle(minutesString, sccColor, sccShadow);
    scc2 = setTitle(sccString2, sccColor, sccShadow);
    hydra2 = setTitle(hydraString2, sccColor, sccShadow);
    emp2 = setTitle(empString2, sccColor, sccShadow);
    moo2 = setTitle(mooString2, sccColor, sccShadow);
    carrot2 = setTitle(carrotString2, sccColor, sccShadow);



}).setFps(1);


register ("tick", () => {
    if(!value==0) return;

    display.setLine(0, title);
    display.setLine(1, scc);
    display.setLine(2, hydra);
    display.setLine(3, emp);
    display.setLine(4, moo);
    display.setLine(5, carrot);

    if(minutes <=1) {
        display.setLine(6, minute);
    } else {
        display.setLine(6, minutes);
    }

    display.setLine(7, scc2);
    display.setLine(8, hydra2);
    display.setLine(9, emp2);
    display.setLine(10, moo2);
    display.setLine(11, carrot2);

});


//set shadow, color function
function setTitle(words, color, shadow) {

    const word = new DisplayLine(color + words);
    word.setShadow(shadow);
    return word;
};

