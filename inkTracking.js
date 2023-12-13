import { data } from "./utils"


//local dic
let localSCC = {
    squidAmount: 0,
    inkAmount: 0,
    nightSquidCaught: 0,
    timeElap: 0,
    inkPerHour: 0
};

var display = new Display();
display.setBackground("none");
display.setRenderLoc(data.INK.x, data.INK.y);

var value = -1;
var dh = -1;
var timeTF = -1;


//========START AND STOP INK TRACKING========
//
//
//

register("command", startTracking).setName("inkGo");
register("command", stopTracking).setName("inkStop");

function startTracking() {
    ChatLib.chat("Now Tracking Squids and Ink!!");
    value = 0;
    display.show();
}

function stopTracking() {
    ChatLib.chat("Squid and Ink Tracking Stopped.");
    display.hide();
    value = -1;
}


//========SET LOOTING========
//
//
//

register("command", (x) => {

    x = parseInt(x);

    if(x==4){
        data.INK.looting = 4;
        data.INK.squidInkNum = 8;
        data.INK.nightSquidInkNum = 36.8;
        data.save();
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else if(x == 5) {
        data.INK.looting = 5;
        data.INK.squidInkNum =8.75;
        data.INK.nightSquidInkNum = 40;
        data.save();
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else {
        ChatLib.chat("&bInvalid looting value of " + x + " entered. Please enter either looting 4 or 5.");
    }
}).setName("looting");



//========SESSION TIMER========
//
//
//

register("command", (message) =>{

    if(message.toLowerCase() == "start") {
        ChatLib.chat("&bTimer and ink per hour calculations started!");
        timeTF = 0;
    } else if(message.toLowerCase() == "stop") {
        ChatLib.chat("&bTimer and ink per hour calculations stopped!");
        timeTF = -1;
    } else {
        ChatLib.chat("&bInvalid condition of " + message + " entered. Please enter either start or stop.");
    }

}).setName("inkTimer");





//========MOVE DISPLAY========
//
//
//

register("command", (x,y) => {
    x = parseInt(x);
    y = parseInt(y);

    updateDisplay(x, y);
    ChatLib.chat("&aDisplay moved to: " + x + ", " + y);

}).setName("moveDisplayINK");


function updateDisplay(x, y) {
    data.INK.x = x;
    data.INK.y = y;
    data.save();
    display.setRenderLoc(x, y);
}






//========DOUBLE HOOK========
//
//
//

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook!");

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook! Woot woot!");





//========TRACK SQUIDS AND NIGHT SQUIDS========
//
//
//

register("chat", () => {
    if(!value==0) return;

    if(dh ==0) {
        localSCC.squidAmount += 2;
        localSCC.inkAmount += ((data.INK.squidInkNum)*2);
        data.INK.squidAmount += 2;
        data.INK.inkAmount += ((data.INK.squidInkNum)*2);
        data.save();
        dh = -1
    } else {
        localSCC.squidAmount += 1;
        localSCC.inkAmount += ((data.INK.squidInkNum));
        data.INK.squidAmount += 1;
        data.INK.inkAmount += ((data.INK.squidInkNum));
        data.save();
        dh = -1

    }

}).setCriteria("A Squid appeared.");

register("chat", () => {
    if(!value==0)return;

    if(dh==0) {
        localSCC.nightSquidCaught += 2;
        localSCC.inkAmount += ((data.INK.nightSquidInkNum)*2);
        data.INK.nightSquidCaught += 2;
        data.INK.inkAmount += ((data.INK.nightSquidInkNum)*2);
        data.save();
        dh = -1
    } else {
        localSCC.nightSquidCaught += 1;
        localSCC.inkAmount += ((data.INK.nightSquidInkNum));
        data.INK.nightSquidCaught += 1;
        data.INK.inkAmount += ((data.INK.nightSquidInkNum));
        data.save();
        dh = -1
    }


}).setCriteria("Pitch darkness reveals a Night Squid.")





//========CALC INK PER HOUR========
//
//
//

register("step", () => {
    if(!timeTF==0) return;
    localSCC.timeElap += 1

    var tempInk = (localSCC.inkAmount) / (localSCC.timeElap);
    tempInk = Math.round((tempInk *3600), 0);
    localSCC.inkPerHour = tempInk;

}).setFps(1);



//========RENDER DISPLAY========
//
//
//

register ("tick", () => {
    if(!value==0) return;

    var inkValue = localSCC.inkAmount;
    inkValue = Math.round(inkValue, 0);

    var squidAmount = localSCC.squidAmount;
    var nightSquid = localSCC.nightSquidCaught;
    var perHour = localSCC.inkPerHour;

    var minutes = (localSCC.timeElap) / 60;
    minutes = Math.round(minutes, 1);

    var inkRound = Math.round(data.INK.inkAmount, 0);
    inkRound = inkRound.toLocaleString();

    var newDisplayLine = new DisplayLine("&b&l==Ink Info Display!==");
    newDisplayLine.setShadow(true);

    display.setLine(0, newDisplayLine);
    display.setLine(1, "&6" + "Ink Gained: " + inkValue);
    display.setLine(2, "&b" + "Squids Caught: " + squidAmount);
    display.setLine(3, "&d" + "Night Squids Caught: " + nightSquid);
    display.setLine(4, "&4" + "Ink Per Hour: " + perHour);
    if(minutes <=1) {
        display.setLine(5, "&2" + "Time Elapsed: " + minutes + " minute");
    } else {
        display.setLine(5, "&2" + "Time Elapsed: " + minutes + " minutes")
    }
    display.setLine(6, "&6" + "Total Ink Gained: " + inkRound);
    display.setLine(7, "&b" + "Total Squids Caught: " + data.INK.squidAmount);
    display.setLine(8, "&d" + "Total Night Squids Caught: " + data.INK.nightSquidCaught);
})
