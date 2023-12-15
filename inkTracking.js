import { data } from "./utils"


//========SET INITIAL VALUES========
//
//
//

//local dic
let localINK = {
    squidAmount: 0,
    inkAmount: 0,
    nightSquidCaught: 0,
    timeElap: 0,
    inkPerHour: 0
};

var display = new Display();
var gui = new Gui();
display.setBackground("none");
display.setRenderLoc(data.INK.x, data.INK.y);

const inkColor = data.CONFIG.inkColor;
const inkShadow = data.CONFIG.inkShadow;

var value = -1;
var dh = -1;
var timeTF = -1;


//initial rounding
var inkValue = localINK.inkAmount;
inkValue = Math.round(inkValue, 0);
var squidAmount = localINK.squidAmount;
var nightAmount = localINK.nightSquidCaught;
var hourInk = localINK.inkPerHour;
var minutes = (localINK.timeElap) / 60;
minutes = Math.round(minutes, 1);
var inkRound = Math.round(data.INK.inkAmount, 0);


//set titles
var inkTitle2 = "==Ink Info Display!==";
var inkGained = "Ink Gained: " + inkValue;
var squidTitle = "Squids Caught: " + squidAmount;
var nightTitle = "Night Squids Caught: " + nightAmount;
var perHourTitle = "Ink Per Hour: " + hourInk;
var minuteTitle = "Time Elapsed: " + minutes + " minute";
var minutesTitle = "Time Elapsed: " + minutes + " minutes";
var totalInkTitle = "Total Ink Gained: " + inkRound;
var totalSquidsTitle = "Total Squids Caught: " + data.INK.squidAmount;
var totalNightSquidsTitle = "Total Night Squids Caught: " + data.INK.nightSquidCaught;


//set display line objects
var title = setTitle(inkTitle2, inkColor, inkShadow);
var ink = setTitle(inkGained, inkColor, inkShadow);
var squid = setTitle(squidTitle, inkColor, inkShadow);
var nightSquid = setTitle(nightTitle, inkColor, inkShadow);
var perHour = setTitle(perHourTitle, inkColor, inkShadow);
var minute = setTitle(minuteTitle, inkColor, inkShadow);
var minutes2 = setTitle(minutesTitle, inkColor, inkShadow);
var ink2 = setTitle(totalInkTitle, inkColor, inkShadow);
var squid2 = setTitle(totalSquidsTitle, inkColor, inkShadow);
var night2 = setTitle(totalNightSquidsTitle, inkColor, inkShadow);




//========START AND STOP INK TRACKING========
//
//
//

register("command", startTracking).setName("inkGo");
register("command", stopTracking).setName("inkStop");

function startTracking() {
    ChatLib.chat("Now Tracking Squids and Ink!!");
    value = 0;

    //show display
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
        data.SCC.mooDrop = 4.8;
        data.save();
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else if(x == 5) {
        data.INK.looting = 5;
        data.INK.squidInkNum =8.75;
        data.INK.nightSquidInkNum = 40;
        data.SCC.mooDrop = 5.25;
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
        localINK.squidAmount += 2;
        localINK.inkAmount += ((data.INK.squidInkNum)*2);
        data.INK.squidAmount += 2;
        data.INK.inkAmount += ((data.INK.squidInkNum)*2);
        data.save();
        dh = -1
    } else {
        localINK.squidAmount += 1;
        localINK.inkAmount += ((data.INK.squidInkNum));
        data.INK.squidAmount += 1;
        data.INK.inkAmount += ((data.INK.squidInkNum));
        data.save();
        dh = -1

    }

}).setCriteria("A Squid appeared.");

register("chat", () => {
    if(!value==0)return;

    if(dh==0) {
        localINK.nightSquidCaught += 2;
        localINK.inkAmount += ((data.INK.nightSquidInkNum)*2);
        data.INK.nightSquidCaught += 2;
        data.INK.inkAmount += ((data.INK.nightSquidInkNum)*2);
        data.save();
        dh = -1
    } else {
        localINK.nightSquidCaught += 1;
        localINK.inkAmount += ((data.INK.nightSquidInkNum));
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

var tempInk = 0;
register("step", () => {
    if(!timeTF==0) return;
    localINK.timeElap += 1

    tempInk = (localINK.inkAmount) / (localINK.timeElap);
    tempInk = Math.round((tempInk *3600), 0);
    localINK.inkPerHour = tempInk;
    data.INK.inkPerHour = tempInk;

}).setFps(1);



register("step", () => {

    //initial rounding
    var inkValue = localINK.inkAmount;
    inkValue = Math.round(inkValue, 0);
    var squidAmount = localINK.squidAmount;
    var nightAmount = localINK.nightSquidCaught;
    var hourInk = localINK.inkPerHour;
    var minutes = (localINK.timeElap) / 60;
    minutes = Math.round(minutes, 1);
    var inkRound = Math.round(data.INK.inkAmount, 0);


    //set titles
    inkTitle2 = "==Ink Info Display!==";
    inkGained = "Ink Gained: " + inkValue;
    squidTitle = "Squids Caught: " + squidAmount;
    nightTitle = "Night Squids Caught: " + nightAmount;
    perHourTitle = "Ink Per Hour: " + hourInk;
    minuteTitle = "Time Elapsed: " + minutes + " minute";
    minutesTitle = "Time Elapsed: " + minutes + " minutes";
    totalInkTitle = "Total Ink Gained: " + inkRound;
    totalSquidsTitle = "Total Squids Caught: " + data.INK.squidAmount;
    totalNightSquidsTitle = "Total Night Squids Caught: " + data.INK.nightSquidCaught;


    //set display line objects
    title = setTitle(inkTitle2, inkColor, inkShadow);
    ink = setTitle(inkGained, inkColor, inkShadow);
    squid = setTitle(squidTitle, inkColor, inkShadow);
    nightSquid = setTitle(nightTitle, inkColor, inkShadow);
    perHour = setTitle(perHourTitle, inkColor, inkShadow);
    minute = setTitle(minuteTitle, inkColor, inkShadow);
    minutes2 = setTitle(minutesTitle, inkColor, inkShadow);
    ink2 = setTitle(totalInkTitle, inkColor, inkShadow);
    squid2 = setTitle(totalSquidsTitle, inkColor, inkShadow);
    night2 = setTitle(totalNightSquidsTitle, inkColor, inkShadow);



}).setFps(1);




//========RENDER DISPLAY========
//
//
//
register ("tick", () => {
    if(!value==0) return;

    //set color and shadow for all lines
    display.setLine(0, title);
    display.setLine(1, ink);
    display.setLine(2, squid);
    display.setLine(3, nightSquid);
    display.setLine(4, perHour);

    if(minutes <=1) {
        display.setLine(5, minute);
    } else {
        display.setLine(5, minutes2)
    }

    display.setLine(6, ink2);
    display.setLine(7, squid2);
    display.setLine(8, night2);
});


//set shadow, color function
function setTitle(words, color, shadow) {

    const word = new DisplayLine(color + words);
    word.setShadow(shadow);
    return word;
};
