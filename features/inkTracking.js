import {data} from "../data/utils.js"
import settings from "../data/settings"
import * as fs from "../utils/functions.js"
import {RainSound, inkStrings} from "../data/constants"


//========SET INITIAL VALUES AND STRINGS========
//
//
//
let localINK = {
    squidAmount: 0,
    inkAmount: 0,
    nightSquidCaught: 0,
    timeElap: 0,
    inkPerHour: 0,
    sackMsg: false
};

let roundedInk = {

    inkValue: '0',
    squidAmount: '0',
    nightAmount: '0',
    hourInk: '0',
    minutes: '0',
    inkRound: '0',
    squids: '0',
    night: '0',
    stringGoal: '0',
    percent: '0',
    formattedTime: '0'

};

let finalInkStrings = {

    inkGained: inkStrings.inkGaineds + roundedInk.inkValue,
    squidTitle: inkStrings.squidTitles + roundedInk.squidAmount,
    nightTitle: inkStrings.nightTitles + roundedInk.nightAmount,
    perHourTitle: inkStrings.perHourTitles + roundedInk.hourInk,
    minuteTitle: inkStrings.minuteTitles + roundedInk.minutes,
    totalInkTitle : inkStrings.totalInkTitles + roundedInk.inkRound,
    totalSquidsTitle : inkStrings.totalSquidsTitles + roundedInk.squids,
    totalNightSquidsTitle : inkStrings.totalNightSquidsTitles + roundedInk.night,
    currentInkTitle : inkStrings.currentInkTitles + roundedInk.inkRound,
    inkGoalTitle : inkStrings.inkGoalTitles + roundedInk.stringGoal,
    percentTitle : roundedInk.percent + inkStrings.percentTitles,
    etaTitle : inkStrings.etaTitles + roundedInk.formattedTime
    
}

//global guis
var movecounter = new Gui();
var movetracking = new Gui();
var gui = new Gui();


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





register("chat", (message, event) => {

    var check = true;
    //get array of text componenets from event
    const message = EventLib.getMessage(event);
    let targetItem = "Ink Sac";

    message.forEach((component) => {

        const ctComp = new TextComponent(component);

        if(ctComp.getHoverValue()) {

            const hoverText = ctComp.getHoverValue();
            const cleanText = hoverText.replace(/§./g, "");

            const lines = cleanText.split("\n");
            lines.forEach((line) => {
                if (line.includes(targetItem)) {
                    // Extract the numeric value using regex
                    const match = line.match(/^\s*\+(\d+)\sInk Sac/);
                    if (match) {
                        if(check) {
                            const quantity = parseInt(match[1]); // Extracted value as a number
                            localINK.inkAmount += quantity;

                            if(data.INK.firstInk) {
                                data.INK.inkAmount = parseInt(settings.inkStart) + quantity;
                                data.INK.firstInk = false;
                            } else {
                                data.INK.inkAmount += quantity;
                            }

                            if(localINK.inkAmount > data.INK.sessionRecord) {
                                data.INK.sessionRecord = localINK.inkAmount;
                            }


                            localINK.sackMsg = true;
                            data.save();
                            check = false;
                            cancel(event);
                        }
                    }
                }
            });

        }   
        
    });
}).setCriteria("[Sacks] ${message}");







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
        
        if(data.INK.firstSquid) {
            data.INK.squidAmount = parseInt(settings.squidStart) + 2;
            data.INK.firstSquid = false;
        } else {
            data.INK.squidAmount += 2;
        }

        data.INK.dh = -1;
        data.save();
    } else {
        localINK.squidAmount += 1;

        if(data.INK.firstSquid) {
            data.INK.squidAmount = parseInt(settings.squidStart) + 1;
            data.INK.firstSquid = false;
        } else {
            data.INK.squidAmount += 1;
        }

        data.INK.dh = -1;
        data.save();

    }

}).setCriteria("A Squid appeared.");

register("chat", () => {

    if(!settings.trackInk) return;

    if(data.INK.dh==0) {
        localINK.nightSquidCaught += 2;

        if(data.INK.firstNightSquid) {
            data.INK.nightSquidCaught = parseInt(settings.nightSquidStart) + 2;
            data.INK.firstNightSquid = false;
        } else {
            data.INK.nightSquidCaught += 2;
        }

        data.INK.dh = -1;
        data.save();
    } else {
        localINK.nightSquidCaught += 1;
        if(data.INK.firstNightSquid) {
            data.INK.nightSquidCaught = parseInt(settings.nightSquidStart) + 1;
            data.INK.firstNightSquid = false;
        } else {
            data.INK.nightSquidCaught += 1;
        }

        data.INK.dh = -1;
        data.save();
    }


}).setCriteria("Pitch darkness reveals a Night Squid.")


register("chat", () => {

    data.INK.rainBought += 1
    data.save();


}).setCriteria("You added a minute of rain! ${message}")


register("chat", (msg) => {

    Client.showTitle("&bAQUAMARINE DYE!", "", 15, 25, 15);
    data.MENTS.aqua = true;
    data.save();


}).setCriteria("WOW! ${player} found Aquamarine Dye ${rest}")


register("chat", () => {

    if(!settings.trackInk) return;

    localINK.nightSquidCaught += .22;
    data.INK.nightSquidCaught += .22;

    localINK.squidAmount += .5;
    data.INK.squidAmount += .5;

    data.save();



}).setCriteria("LOOT SHARE You received loot for assisting ${player}")



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
                RainSound.setVolume(settings.rainSound).play();
                rainActual=false;
            }
        } else {
            rainActual=true;
        }
    }

    if(!settings.trackInk) return;
    if(!settings.inkTimer) return;

    scoreTitle = Scoreboard.getScoreboardTitle();
    scoreTitle = fs.removeMinecraftColorCodes(scoreTitle);

    if(!(scoreTitle.includes('SKYBLOCK'))) return;
    if(localINK.squidAmount == 0) return;


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

    localINK.timeElap += 1;


    if(!localINK.sackMsg) return;

    tempInk = (localINK.inkAmount) / (localINK.timeElap);
    tempInk = tempInk*3600;
    localINK.inkPerHour = tempInk;
    prevInk = localINK.inkAmount;

    localINK.sackMsg = false;
    data.INK.inkPerHour = tempInk;
    data.save();


    if(localINK.inkAmount >= 25000 && localINK.inkAmount < 50000 && data.MENTS.session_25k == false) {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Locked In <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        data.MENTS.session_25k = true;
        data.save();

    } else if(localINK.inkAmount >= 50000 && localINK.inkAmount < 100000 && data.MENTS.session_50k == false) {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Need More Ink! <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        data.MENTS.session_50k = true;
        data.save();

    } else if(localINK.inkAmount >= 100000 && localINK.inkAmount < 250000 && data.MENTS.session_100k == false) {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Time for a Break..? <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        data.MENTS.session_100k = true;
        data.save();

    } else if(localINK.inkAmount >= 250000 && data.MENTS.session_250k == false) {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Ink Obsessed <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        data.MENTS.session_250k = true;
        data.save();

    }


}).setDelay(1)


//========UPDATE STRINGS========
//
//
//

register("step", () => {
    

    //rounding and formatting
    inkValue = localINK.inkAmount;
    roundedInk.inkValue = fs.numberWithCommas(Math.round(inkValue));
    
    roundedInk.squidAmount = fs.numberWithCommas(Math.round(localINK.squidAmount));
    roundedInk.nightAmount = fs.numberWithCommas(Math.round(localINK.nightSquidCaught));

    hourInk = localINK.inkPerHour;
    var hourNum = Math.round(hourInk);
    roundedInk.hourInk = fs.numberWithCommas(hourNum);

    roundedInk.minutes = fs.formatTimeElapsed(localINK.timeElap);

    var inknumber = Math.round(data.INK.inkAmount);
    roundedInk.inkRound = fs.numberWithCommas(inknumber);

    roundedInk.squids = fs.numberWithCommas(Math.round(data.INK.squidAmount));
    roundedInk.night = fs.numberWithCommas(Math.round(data.INK.nightSquidCaught));

    var inkGoal = fs.safeConvertToNumber(settings.inkGoalNum);
    var percent = inknumber / inkGoal;
    roundedInk.percent = Math.round(percent * 100, 1);

    roundedInk.stringGoal = fs.numberWithCommas(settings.inkGoalNum);


    //calc ETA here, conditons prevent divide by zero/negative ETAs
    if(hourNum > 0 && inkGoal >=inknumber) {
        
        var diff = inkGoal - inknumber;
        var hoursNeeded = diff/hourNum

        var seconds = hoursNeeded * 3600;
        roundedInk.formattedTime = fs.formatTimeElapsed(seconds);

    } else {
        roundedInk.formattedTime = fs.formatTimeElapsed(0);
    }



    finalInkStrings.inkGained = inkStrings.inkGaineds + roundedInk.inkValue,
    finalInkStrings.squidTitle= inkStrings.squidTitles + roundedInk.squidAmount,
    finalInkStrings.nightTitle= inkStrings.nightTitles + roundedInk.nightAmount,
    finalInkStrings.perHourTitle= inkStrings.perHourTitles + roundedInk.hourInk,
    finalInkStrings.minuteTitle= inkStrings.minuteTitles + roundedInk.minutes,
    finalInkStrings.totalInkTitle = inkStrings.totalInkTitles + roundedInk.inkRound,
    finalInkStrings.totalSquidsTitle = inkStrings.totalSquidsTitles + roundedInk.squids,
    finalInkStrings.totalNightSquidsTitle = inkStrings.totalNightSquidsTitles + roundedInk.night,
    finalInkStrings.currentInkTitle = inkStrings.currentInkTitles + roundedInk.inkRound,
    finalInkStrings.inkGoalTitle = inkStrings.inkGoalTitles + roundedInk.stringGoal,
    finalInkStrings.percentTitle = roundedInk.percent + inkStrings.percentTitles,
    finalInkStrings.etaTitle = inkStrings.etaTitles + roundedInk.formattedTime


}).setDelay(1);






//========RENDER ALL DISPLAYS========
//
//
//

register ("renderOverlay", () => {



    if(settings.inkGoal) {
        const color = settings.inkGoalColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.currentInkTitle, data.INK.xgoal, data.INK.ygoal+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.inkGoalTitle, data.INK.xgoal, data.INK.ygoal+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.percentTitle, data.INK.xgoal, data.INK.ygoal+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.etaTitle, data.INK.xgoal, data.INK.ygoal+40, true);
        
    }

    if (movetracking.isOpen() && settings.inkGoal) {
        const color = settings.inkGoalColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.INK.xgoal)}, y: ${Math.round(data.INK.ygoal)}`, parseInt(data.INK.xgoal) - 65, parseInt(data.INK.ygoal) - 12)
       
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.currentInkTitle, data.INK.xgoal, data.INK.ygoal+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.inkGoalTitle, data.INK.xgoal, data.INK.ygoal+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.percentTitle, data.INK.xgoal, data.INK.ygoal+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.etaTitle, data.INK.xgoal, data.INK.ygoal+40, true);
    }

});


register ("renderOverlay", () => {

    if(!settings.trackInk) return;

    if(settings.inkDisplay) {
        const color = settings.inkColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.inkGained, data.INK.x, data.INK.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.squidTitle, data.INK.x, data.INK.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.nightTitle, data.INK.x, data.INK.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.perHourTitle, data.INK.x, data.INK.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.minuteTitle, data.INK.x, data.INK.y+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalInkTitle, data.INK.x, data.INK.y+60, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalSquidsTitle, data.INK.x, data.INK.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalNightSquidsTitle, data.INK.x, data.INK.y+80, true);

    }

    if (movecounter.isOpen() && settings.inkDisplay) {
        const color = settings.inkColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.INK.x)}, y: ${Math.round(data.INK.y)}`, parseInt(data.INK.x) - 65, parseInt(data.INK.y) - 12)
       
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.inkGained, data.INK.x, data.INK.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.squidTitle, data.INK.x, data.INK.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.nightTitle, data.INK.x, data.INK.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.perHourTitle, data.INK.x, data.INK.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.minuteTitle, data.INK.x, data.INK.y+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalInkTitle, data.INK.x, data.INK.y+60, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalSquidsTitle, data.INK.x, data.INK.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalNightSquidsTitle, data.INK.x, data.INK.y+80, true);
    }



    if (gui.isOpen()) {
        const color = settings.inkColor
       
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.inkGained, data.INK.xgui, data.INK.ygui+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.squidTitle, data.INK.xgui, data.INK.ygui+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.nightTitle, data.INK.xgui, data.INK.ygui+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.perHourTitle, data.INK.xgui, data.INK.ygui+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.minuteTitle, data.INK.xgui, data.INK.ygui+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalInkTitle, data.INK.xgui, data.INK.ygui+60, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalSquidsTitle, data.INK.xgui, data.INK.ygui+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(finalInkStrings.totalNightSquidsTitle, data.INK.xgui, data.INK.ygui+80, true);
    }
});



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
