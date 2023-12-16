import { data } from "./utils"
import settings from "./settings"


//========SET INITIAL VALUES========
//
//
//

//session stats
let localINK = {
    squidAmount: 0,
    inkAmount: 0,
    nightSquidCaught: 0,
    timeElap: 0,
    inkPerHour: 0
};

var movecounter = new Gui();
var gui = new Gui();
const inkShadow = data.CONFIG.inkShadow;
var dh = -1;


//initial rounding
var inkValue = localINK.inkAmount;
inkValue = Math.round(inkValue, 0);
var squidAmount = localINK.squidAmount;
var nightAmount = localINK.nightSquidCaught;
var hourInk = localINK.inkPerHour;
var minutes = (localINK.timeElap) / 60;
minutes = Math.round(minutes, 1);
var inkRound = Math.round(data.INK.inkAmount, 0);


//global strings
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

//========MOVE MAIN DISPLAY========
//
//
//

register("dragged", (dx, dy, x, y) => {
    if (!movecounter.isOpen()) return
    data.INK.x = x
    data.INK.y = y
    data.save()
});

register("command", () => {
    movecounter.open()
}).setName("moveinkdisplay");



//========MOVE GUI========
//
//
//
register("dragged", (dx, dy, x, y) => {
    if (!gui.isOpen()) return
    data.INK.xgui = x
    data.INK.ygui = y
    data.save()
});

register("command", () => {
    gui.open()
}).setName("inkGui");




//========DOUBLE HOOK CON========
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
    if(!settings.inkTimer) return;
    localINK.timeElap += 1

    tempInk = (localINK.inkAmount) / (localINK.timeElap);
    tempInk = Math.round((tempInk *3600), 0);
    localINK.inkPerHour = tempInk;
    data.INK.inkPerHour = tempInk;

}).setFps(1);






//========RENDER ALL DISPLAYS========
//
//
//

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

});


register ("renderOverlay", () => {
    if(settings.inkDisplay) {
    const color = settings.inkColor;
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());

    Renderer.drawString(inkTitle2, data.INK.x, data.INK.y, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(inkGained, data.INK.x, data.INK.y+10, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(squidTitle, data.INK.x, data.INK.y+20, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(nightTitle, data.INK.x, data.INK.y+30, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(perHourTitle, data.INK.x, data.INK.y+40, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());

    if(minutes <=1) {
        Renderer.drawString(minuteTitle, data.INK.x, data.INK.y+50, true);
    } else {
        Renderer.drawString(minutesTitle, data.INK.x, data.INK.y+50, true);
    }
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(totalInkTitle, data.INK.x, data.INK.y+60, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(totalSquidsTitle, data.INK.x, data.INK.y+70, true);
    Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    Renderer.drawString(totalNightSquidsTitle, data.INK.x, data.INK.y+80, true);

    }

    if (movecounter.isOpen() && settings.inkDisplay) {
        const color = settings.inkColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.INK.x)}, y: ${Math.round(data.INK.y)}`, parseInt(data.INK.x) - 65, parseInt(data.INK.y) - 12)
       
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkTitle2, data.INK.x, data.INK.y, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkGained, data.INK.x, data.INK.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(squidTitle, data.INK.x, data.INK.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.INK.x, data.INK.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(perHourTitle, data.INK.x, data.INK.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    
        if(minutes <=1) {
            Renderer.drawString(minuteTitle, data.INK.x, data.INK.y+50, true);
        } else {
            Renderer.drawString(minutesTitle, data.INK.x, data.INK.y+50, true);
        }
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalInkTitle, data.INK.x, data.INK.y+60, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalSquidsTitle, data.INK.x, data.INK.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalNightSquidsTitle, data.INK.x, data.INK.y+80, true);
    }



    if (gui.isOpen()) {
        const color = settings.inkColor
       
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkTitle2, data.INK.xgui, data.INK.ygui, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkGained, data.INK.xgui, data.INK.ygui+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(squidTitle, data.INK.xgui, data.INK.ygui+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.INK.xgui, data.INK.ygui+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(perHourTitle, data.INK.xgui, data.INK.ygui+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
    
        if(minutes <=1) {
            Renderer.drawString(minuteTitle, data.INK.xgui, data.INK.ygui+50, true);
        } else {
            Renderer.drawString(minutesTitle, data.INK.xgui, data.INK.ygui+50, true);
        }
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalInkTitle, data.INK.xgui, data.INK.ygui+60, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalSquidsTitle, data.INK.xgui, data.INK.ygui+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalNightSquidsTitle, data.INK.xgui, data.INK.ygui+80, true);
    }
});
