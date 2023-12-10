//Sea Creature Dictionary (TEMPORARY VALUES NEED TO MAKE A JSON FILE)
let SCC = {
    squidAmount: 10,
    inkAmount: 0,
    nightSquidCaught: 0,
    ttlWaterCreatures: 0,
    agarimooCaught: 0,
    x: 150,
    y: 150
};

//Create a display, background is set per line, render display at the x and y coordinates
var display = new Display();
display.setBackground("per line");
display.setRenderLoc(SCC.x,SCC.y);

//Trigger var for starting/stopping ink tracking
var value = -1;

//Register commands to start/stop ink tracking
register("command", startTracking).setName("ink_go");
register("command", stopTracking).setName("ink_stop");


register("command", (x,y) => {
    x = parseInt(x);
    y = parseInt(y);

    updateDisplay(x, y);
    ChatLib.chat("&aDisplay moved to: " + x + ", " + y);

}).setName("moveDisplay");


//Accounces ink tracking will start
function startTracking() {
    ChatLib.chat("Now Tracking Squids and Ink!!");
    value = 0;
}

//Accounces ink tracking will stop
function stopTracking() {
    ChatLib.chat("Squid and Ink Tracking Stopped.");
    value = -1;
}

//Increments squid tracker/ink tracker
register("chat", () => {
    if(!value==0) return;

    SCC.squidAmount += 1;
    //Based on Looting 5 + Squid Pet (will be changed to base on sacks soon TM)
    SCC.inkAmount += 8.75;

}).setCriteria("A Squid appeared.");


//Render the display overlay (currently only squid amount and ink amount)
register ("renderoverlay", () => {
    if(!value==0) return;
    var inkValue = SCC.inkAmount;
    inkString = inkValue.toString();

    var squidAmount = SCC.squidAmount;
    squidString = squidAmount.toString();

    display.setLine(0, "&1" + "Ink Info Display!");
    display.setLine(1, "&6" + inkString);
    display.setLine(2, "&b" + squidString);
})


function updateDisplay(x, y) {
    displayX = x;
    displayY = y;
    display.setRenderLoc(displayX, displayY);
}
