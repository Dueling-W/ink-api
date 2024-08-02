import { data } from "./utils"
import settings from "./settings"


//========SET INITIAL VALUES AND STRINGS========
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


//global guis
var movecounter = new Gui();
var movetracking = new Gui();
var gui = new Gui();


var inkGaineds = "Ink Gain:  ";
var squidTitles = "Squids:  ";
var nightTitles = "Night Squids:  ";
var perHourTitles = "Ink/Hr:  ";
var minuteTitles = "Time Elapsed:  ";
var totalInkTitles = "Ink Gain (Total):  ";
var totalSquidsTitles = "Squids (Total):  ";
var totalNightSquidsTitles = "Night Squids (Total):  ";

var currentInkTitles = "Current Ink Collection:  ";
var inkGoalTitles = "Current Ink Goal:  "
var percentTitles = "% done!"
var etaTitles = "ETA:  "


var inkGained = 0;
var squidTitle = 0;
var nightTitle = 0;
var perHourTitle = 0;
var minuteTitle = 0;
var totalInkTitle = 0;
var totalSquidsTitle = 0;
var totalNightSquidsTitle = 0;

var currentInkTitle = 0;
var inkGoalTitle = 0;
var percentTitle = 0;
var etaTitle = 0;

//rounding and formatting
var inkValue = localINK.inkAmount;
var squidAmount = localINK.squidAmount;
var nightAmount = localINK.nightSquidCaught;
var hourInk = localINK.inkPerHour;
var minutes = localINK.timeElap;
var inkRound = 0;
var squids = 0;
var night = 0;


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



//========MOVE GOAL DISPLAY========
//
//
//


register("dragged", (dx, dy, x, y) => {
    if (!movetracking.isOpen()) return
    data.INK.xgoal = x
    data.INK.ygoal = y
    data.save()
});

register("command", () => {
    movetracking.open()
}).setName("movegoaldisplay");



//========MOVE TEMP GUI========
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




//========TRACK SQUIDS AND NIGHT SQUIDS========
//
//
//

register("chat", () => {

    if(!settings.trackInk) return;

    if(data.INK.dh ==0) {
        localINK.squidAmount += 2;
        localINK.inkAmount += ((data.INK.squidInkNum)*2);
        data.INK.squidAmount += 2;
        data.INK.inkAmount += ((data.INK.squidInkNum)*2);
        data.INK.dh = -1;
        data.save();
    } else {
        localINK.squidAmount += 1;
        localINK.inkAmount += ((data.INK.squidInkNum));
        data.INK.squidAmount += 1;
        data.INK.inkAmount += ((data.INK.squidInkNum));
        data.INK.dh = -1;
        data.save();

    }

}).setCriteria("A Squid appeared.");

register("chat", () => {

    if(!settings.trackInk) return;

    if(data.INK.dh==0) {
        localINK.nightSquidCaught += 2;
        localINK.inkAmount += ((data.INK.nightSquidInkNum)*2);
        data.INK.nightSquidCaught += 2;
        data.INK.inkAmount += ((data.INK.nightSquidInkNum)*2);
        data.INK.dh = -1;
        data.save();
    } else {
        localINK.nightSquidCaught += 1;
        localINK.inkAmount += ((data.INK.nightSquidInkNum));
        data.INK.nightSquidCaught += 1;
        data.INK.inkAmount += ((data.INK.nightSquidInkNum));
        data.INK.dh = -1;
        data.save();
    }


}).setCriteria("Pitch darkness reveals a Night Squid.")





var prevInk = 0;
var timeStep = 0;
var afk = false;
var rainActual = false;
var rain = 0;
var scoreTitle = 0;
register("step", () => {

    //checks for rain, rainActual prevents spamming
    if(settings.rainCheck) {

        rain = World.getRainingStrength();

        if(rain ==0) {
            if(rainActual) {
                Client.showTitle("&9RAIN EXPIRED!", "",10, 75, 10);
                rainActual=false;
            }
        } else {
            rainActual=true;
        }
    }
    
    if(!settings.trackInk) return;
    if(!settings.inkTimer) return;

    scoreTitle = Scoreboard.getScoreboardTitle();
    scoreTitle = removeMinecraftColorCodes(scoreTitle);

    if(!(scoreTitle.includes('SKYBLOCK'))) return;
    if(localINK.inkAmount==0) return;


    //afk logic
    if(prevInk == localINK.inkAmount ) {
        timeStep += 1

        if(timeStep == (settings.pauseValue * 60) && settings.pauseValue != 0) {
            afk = true;
        }
        
    } else {
        afk = false;
        timeStep = 0;
    }

    if(afk) return;

    localINK.timeElap += 1

    tempInk = (localINK.inkAmount) / (localINK.timeElap);
    tempInk = tempInk*3600;
    localINK.inkPerHour = tempInk;
    data.INK.inkPerHour = tempInk;

    prevInk = localINK.inkAmount;

}).setDelay(1);



//========UPDATE STRINGS========
//
//
//

register("step", () => {
    
    var formattedTime = "";

    //rounding and formatting
    inkValue = localINK.inkAmount;
    inkValue = Math.round(inkValue);
    inkValue = numberWithCommas(inkValue);
    squidAmount = localINK.squidAmount;
    squidAmount = numberWithCommas(squidAmount);
    nightAmount = localINK.nightSquidCaught;
    nightAmount = numberWithCommas(nightAmount);
    hourInk = localINK.inkPerHour;
    var hourNum = Math.round(hourInk);
    hourInk = numberWithCommas(hourNum);
    minutes = localINK.timeElap
    minutes = formatTimeElapsed(minutes);
    var inknumber = Math.round(data.INK.inkAmount);
    inkRound = numberWithCommas(inknumber);
    squids = data.INK.squidAmount;
    squids = numberWithCommas(squids);
    night = data.INK.nightSquidCaught;
    night = numberWithCommas(night);

    var inkGoal = safeConvertToNumber(settings.inkGoalNum);
    var percent = inknumber / inkGoal;
    percent = Math.round(percent * 100, 1);


    var stringGoal = settings.inkGoalNum;
    stringGoal = numberWithCommas(stringGoal);


    //calc ETA here, conditons prevent divide by zero/negative ETAs
    if(hourNum > 0 && inkGoal >=inknumber) {
        
        var diff = inkGoal - inknumber;
        var hoursNeeded = diff/hourNum

        var seconds = hoursNeeded * 3600;
        formattedTime = formatTimeElapsed(seconds);

    } else {
        formattedTime = formatTimeElapsed(0);
    }

    //set titles
    inkGained =  inkGaineds + inkValue;
    squidTitle = squidTitles + squidAmount;
    nightTitle = nightTitles + nightAmount;
    perHourTitle = perHourTitles + hourInk;
    minuteTitle = minuteTitles + minutes
    totalInkTitle = totalInkTitles + inkRound;
    totalSquidsTitle = totalSquidsTitles + squids;
    totalNightSquidsTitle = totalNightSquidsTitles + night;


    currentInkTitle = currentInkTitles + inkRound;
    inkGoalTitle = inkGoalTitles + stringGoal;
    percentTitle = percent + percentTitles;
    etaTitle = etaTitles + formattedTime;



}).setDelay(1);






//========RENDER ALL DISPLAYS========
//
//
//

register ("renderOverlay", () => {

    if(settings.inkGoal) {
        const color = settings.inkGoalColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(currentInkTitle, data.INK.xgoal, data.INK.ygoal+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkGoalTitle, data.INK.xgoal, data.INK.ygoal+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(percentTitle, data.INK.xgoal, data.INK.ygoal+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(etaTitle, data.INK.xgoal, data.INK.ygoal+40, true);
        
    }

    if (movetracking.isOpen() && settings.inkGoal) {
        const color = settings.inkGoalColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.INK.xgoal)}, y: ${Math.round(data.INK.ygoal)}`, parseInt(data.INK.xgoal) - 65, parseInt(data.INK.ygoal) - 12)
       
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(currentInkTitle, data.INK.xgoal, data.INK.ygoal+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkGoalTitle, data.INK.xgoal, data.INK.ygoal+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(percentTitle, data.INK.xgoal, data.INK.ygoal+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(etaTitle, data.INK.xgoal, data.INK.ygoal+40, true);
    }

});


register ("renderOverlay", () => {

    if(!settings.trackInk) return;

    if(settings.inkDisplay) {
        const color = settings.inkColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(inkGained, data.INK.x, data.INK.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(squidTitle, data.INK.x, data.INK.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.INK.x, data.INK.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(perHourTitle, data.INK.x, data.INK.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(minuteTitle, data.INK.x, data.INK.y+50, true);
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
        Renderer.drawString(inkGained, data.INK.x, data.INK.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(squidTitle, data.INK.x, data.INK.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.INK.x, data.INK.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(perHourTitle, data.INK.x, data.INK.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(minuteTitle, data.INK.x, data.INK.y+50, true);
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
        Renderer.drawString(inkGained, data.INK.xgui, data.INK.ygui+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(squidTitle, data.INK.xgui, data.INK.ygui+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.INK.xgui, data.INK.ygui+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(perHourTitle, data.INK.xgui, data.INK.ygui+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(minuteTitle, data.INK.xgui, data.INK.ygui+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalInkTitle, data.INK.xgui, data.INK.ygui+60, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalSquidsTitle, data.INK.xgui, data.INK.ygui+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(totalNightSquidsTitle, data.INK.xgui, data.INK.ygui+80, true);
    }
});


function formatTimeElapsed(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    if (days > 0) {
      return `${days}d:${hours}h:${minutes}m:${remainingSeconds}s`;
    } else if (hours > 0) {
      return `${hours}h:${minutes}m:${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m:${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
}


function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function removeMinecraftColorCodes(inputString) {
    return inputString.replace(/§[0-9a-fklmnor]/ig, '');
}


/* function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
} */

function safeConvertToNumber(str) {
    return Number(str);
}


register("command", () => {
    localINK.timeElap = 0;

}).setName("resetTimer");


register("command", (x) => {


    x = parseInt(x);

    ChatLib.chat("Set to " + x);

    data.INK.inkAmount = x;
    data.save();

}).setName("setink");

register("command", (x) => {

    x = parseInt(x);

    ChatLib.chat("Set to " + x);

    data.INK.squidAmount = x;
    data.save();
    
}).setName("setsquid");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);

    data.INK.nightSquidCaught = x;
    data.save();
    
}).setName("setnightSquid");
