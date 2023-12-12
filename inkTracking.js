//Sea Creature Dictionary (FOR INK ONLY)
let SCC = {
    squidAmount: 0,
    inkAmount: 0,
    nightSquidCaught: 0,
    x: 150,
    y: 150,
    looting: 5,
    squidInkNum: 8.75,
    nightSquidInkNum: 40,
    timeElap: 0,
    inkPerHour: 0
};

//Create a display, background is set per line, render display at the default x and y coordinates
var display = new Display();
display.setBackground("per line");
display.setRenderLoc(SCC.x,SCC.y);


//Trigger var for starting/stopping ink tracking
var value = -1;

//Trigger var for double hook 
var dh = -1;

//Temp var for ink/hr calcs
var tempInk = 0;

//Trigger var for timer starting/stopping
var timeTF = -1;



//Register commands to start/stop ink tracking
register("command", startTracking).setName("inkGo");
register("command", stopTracking).setName("inkStop");


//Register looting command (default looting 5)
register("command", (x) => {

    x = parseInt(x);

    if(x==4){
        SCC.squidInkNum = 8;
        SCC.nightSquidInkNum = 36.8;
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else if(x == 5) {
        SCC.squidInkNum =8.75;
        SCC.nightSquidInkNum = 40;
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else {
        ChatLib.chat("&bInvalid looting value of " + x + " entered. Please enter either looting 4 or 5.");
    }
}).setName("looting");


//Register timer
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

}).setName("track");




//========MOVE SCREEN COMMANDS AND FUNCTION========


//Register command to move the display
register("command", (x,y) => {
    x = parseInt(x);
    y = parseInt(y);

    updateDisplay(x, y);
    ChatLib.chat("&aDisplay moved to: " + x + ", " + y);

}).setName("moveDisplay");

//Update the display with new x and y values
function updateDisplay(x, y) {
    displayX = x;
    displayY = y;
    display.setRenderLoc(displayX, displayY);
}




//========START AND STOP INK TRACKING========


//Accounces ink tracking will start
function startTracking() {
    ChatLib.chat("Now Tracking Squids and Ink!!");
    value = 0;
    display.show();
}

//Accounces ink tracking will stop
function stopTracking() {
    ChatLib.chat("Squid and Ink Tracking Stopped.");
    display.hide();
    value = -1;
}





//========DOUBLE HOOK CHAT CONDITIONS========


register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook!");

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook! Woot woot!");






//========INCREMENT SQUID TRACKER========



//Increments squid tracker/ink tracker
register("chat", () => {
    if(!value==0) return;

    if(dh ==0) {
        SCC.squidAmount += 2;
        SCC.inkAmount += ((SCC.squidInkNum)*2);
        dh = -1
    } else {
        SCC.squidAmount += 1;
        //Based on Looting 5 + Squid Pet (will be changed to base on sacks soon TM)
        SCC.inkAmount += (SCC.squidInkNum);
        dh = -1

    }

}).setCriteria("A Squid appeared.");


//Increments night squid tracker/ink tracker
register("chat", () => {
    if(!value==0)return;

    if(dh==0) {
        SCC.nightSquidCaught += 2;
        SCC.inkAmount += ((SCC.nightSquidInkNum)*2);
        dh = -1
    } else {
        SCC.nightSquidCaught += 1;
        SCC.inkAmount += (SCC.nightSquidInkNum);
        dh = -1
    }


}).setCriteria("Pitch darkness reveals a Night Squid.")




//========CALCULATE INK PER HOUR========
register("step", () => {
    if(!timeTF==0) return;
    SCC.timeElap += 1

    var tempInk = (SCC.inkAmount) / (SCC.timeElap);
    tempInk = Math.round((tempInk *3600), 0);
    SCC.inkPerHour = tempInk;

}).setFps(1);



//========RENDER INK DISPLAY========


//Render the display overlay
register ("tick", () => {
    if(!value==0) return;
    var inkValue = SCC.inkAmount;
    inkString = inkValue.toString();

    var squidAmount = SCC.squidAmount;
    squidString = squidAmount.toString();

    var nightSquid = SCC.nightSquidCaught;
    nightString = nightSquid.toString();

    var perHour = SCC.inkPerHour;
    perHourString = perHour.toString();

    var minutes = (SCC.timeElap) / 60;
    minutes = Math.round(minutes, 1);
    minutes = minutes.toString();

    display.setLine(0, "&1" + "Ink Info Display!");
    display.setLine(1, "&6" + "Ink Gained: " + inkString);
    display.setLine(2, "&b" + "Squids Caught: " + squidString);
    display.setLine(3, "&d" + "Night Squids Caught: " + nightString);
    display.setLine(4, "&4" + "Ink Per Hour: " + perHourString);
    if(minutes <=1) {
        display.setLine(5, "&2" + "Time Elapsed: " + minutes + " minute");
    } else {
        display.setLine(5, "&2" + "Time Elapsed: " + minutes + " minutes")
    }
})
