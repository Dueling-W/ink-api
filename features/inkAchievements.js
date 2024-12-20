import {data} from "../data/utils.js"
import settings from "../data/settings"
import * as fs from "../utils/functions.js"
import {mentNames, mentDes, mentGoals, RainSound } from "../data/constants.js"



let totalAchievements = Object.keys(data.MENTS).length;
let completedAchievements = 0;

var mentCurrent = new Array(totalAchievements);

register("step", () => {

    var inkValue = data.INK.inkAmount



    if(inkValue >=  10000 && inkValue < 100000 && data.MENTS.col_10k == false) {
      
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Fledgling Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        
        data.MENTS.col_10k = true;
        data.save();

    } else if(inkValue >= 100000 && inkValue < 250000 && data.MENTS.col_100k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: New Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        data.MENTS.col_10k = true;
        data.MENTS.col_100k = true;
        data.save();

    } else if(inkValue >= 250000 && inkValue < 500000 && data.MENTS.col_250k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Starting Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.col_10K = true;
        data.MENTS.col_100k = true;
        data.MENTS.col_250k = true;
        data.save();

    } else if(inkValue >= 500000 && inkValue < 1000000 && data.MENTS.col_500k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Intermediate Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.col_10k = true;
        data.MENTS.col_100k = true;
        data.MENTS.col_250k = true;
        data.MENTS.col_500k = true;
        data.save();

    } else if(inkValue >= 1000000 && inkValue < 2500000 && data.MENTS.col_1m == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Advanced Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.col_10k = true;
        data.MENTS.col_100k = true;
        data.MENTS.col_250k = true;
        data.MENTS.col_500k = true;
        data.MENTS.col_1m = true;
        data.save();

    } else if(inkValue >= 2500000 && inkValue < 5000000 && data.MENTS.col_25m == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Proficient Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.col_10k = true;
        data.MENTS.col_100k = true;
        data.MENTS.col_250k = true;
        data.MENTS.col_500k = true;
        data.MENTS.col_1m = true;
        data.MENTS.col_25m = true;
        data.save();

    } else if(inkValue >= 5000000 &&  data.MENTS.col_5m == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Pro Squisher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.col_10k = true;
        data.MENTS.col_100k = true;
        data.MENTS.col_250k = true;
        data.MENTS.col_500k = true;
        data.MENTS.col_1m = true;
        data.MENTS.col_25m = true;
        data.MENTS.col_5m = true;
        data.save();
    } 

    var cores = data.SCC.cores;
    if(cores == 1 && data.MENTS.core_1==false) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: First Taste of Luck <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.core_1 = true;
        data.save();

    } else if(cores == 10 && data.MENTS.core_10==false) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Lucky Person <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.core_10 = true;
        data.save();
    } else if(cores==100 && data.MENTS.core_100==false) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Buy a Lottery Ticket <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.core_100 = true;
        data.save();
    }


    if(data.MENTS.b2b_clover) {

        
        if(data.SCC.print) {
            
            ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Very Lucky Clover <<§a§r`)
            RainSound.setVolume(settings.rainSound).play();


            data.SCC.print = false;
            data.save();
        }

    }

    if(data.MENTS.night_5) {

        if(data.SCC.nightPrint) {
            ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Pitch Black <<§a§r`)
            RainSound.setVolume(settings.rainSound).play();

            data.SCC.nightPrint = false;
            data.save();
        }

    }

    if(data.MENTS.squid_10) {

        if(data.SCC.squidPrint) {
            ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Only Squids <<§a§r`)
            RainSound.setVolume(settings.rainSound).play();

            data.SCC.squidPrint = false;
            data.save();
        }

    }


    if(data.MENTS.b2b2b_king) {

        if(data.SCC.carrotPrint) {
            ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Is It Easter? <<§a§r`)
            RainSound.setVolume(settings.rainSound).play();

            data.SCC.carrotPrint = false;
            data.save();
        }

    }


    var rain = data.INK.rainBought;

    if(rain >= 300 && rain < 1500 && data.MENTS.rain_5 == false) {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Makin' it Rain <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.rain_5 = true;
        data.save();

    } else if (rain >= 1500 && rain < 3000 && data.MENTS.rain_25 == false)  {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Forecast: Only Rain <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();
        data.MENTS.rain_25 = true;
        data.save();
    } else if (rain >= 3000 && rain < 4500 && data.MENTS.rain_50 == false)  {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Rain Fanatic <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.rain_50 = true;
        data.save();
    } else if (rain >= 4500 && data.MENTS.rain_75 == false)  {
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: #1 Vanessa Fan <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.rain_75 = true;
        data.save();
    }



    if(data.MENTS.aqua) {

        if(data.INK.aquaPrint) {

            ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Deep Sea Miracle <<§a§r`)
            RainSound.setVolume(settings.rainSound).play();

            data.INK.aquaPrint = false;
            data.save();

        }        

    }

    var squids = data.INK.squidAmount

    if(squids >=  1000 && squids < 5000 && data.MENTS.squid_1k == false) {
      
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Squid Slayer <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.save();

    } else if(squids >= 5000 && squids < 10000 && data.MENTS.squid_5k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Squid Conqueror <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.MENTS.squid_5k = true;
        data.save();

    } else if(squids >= 10000 && squids < 50000 && data.MENTS.squid_10k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Tentacle Terrifier <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.MENTS.squid_5k = true;
        data.MENTS.squid_10k = true;
        data.save();

    } else if(squids >= 50000 && squids < 100000 && data.MENTS.squid_50k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Depths Dominator <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.MENTS.squid_5k = true;
        data.MENTS.squid_10k = true;
        data.MENTS.squid_50k = true;
        data.save();

    } else if(squids >= 100000 && squids < 150000 && data.MENTS.squid_100k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Kraken Crusher <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.MENTS.squid_5k = true;
        data.MENTS.squid_10k = true;
        data.MENTS.squid_50k = true;
        data.MENTS.squid_100k = true;
        data.save();

    } else if(squids >= 150000 && squids < 200000 && data.MENTS.squid_150k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Squidnes Khan <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.MENTS.squid_5k = true;
        data.MENTS.squid_10k = true;
        data.MENTS.squid_50k = true;
        data.MENTS.squid_100k = true;
        data.MENTS.squid_150k = true;
        data.save();

    } else if(squids >= 200000 && data.MENTS.squid_200k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Lord of the Deep <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.squid_1k = true;
        data.MENTS.squid_5k = true;
        data.MENTS.squid_10k = true;
        data.MENTS.squid_50k = true;
        data.MENTS.squid_100k = true;
        data.MENTS.squid_150k = true;
        data.MENTS.squid_200k = true;
        data.save();

    }




    var nsquids = data.INK.nightSquidCaught

    if(nsquids >=  500 && nsquids < 1000 && data.MENTS.night_500 == false) {
      
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Getting Dark.. <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.save();

    } else if(nsquids >= 1000 && nsquids < 5000 && data.MENTS.night_1k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Where's the Sun? <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.MENTS.night_1k = true;
        data.save();

    } else if(nsquids >= 5000 && nsquids < 10000 && data.MENTS.night_5k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Night Fan <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.MENTS.night_1k = true;
        data.MENTS.night_5k = true;
        data.save();

    } else if(nsquids >= 10000 && nsquids < 25000 && data.MENTS.night_10k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Night Owl <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.MENTS.night_1k = true;
        data.MENTS.night_5k = true;
        data.MENTS.night_10k = true;
        data.save();

    } else if(nsquids >= 25000 && nsquids < 50000 && data.MENTS.night_25k == false ) {
    
        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Night Vision <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.MENTS.night_1k = true;
        data.MENTS.night_5k = true;
        data.MENTS.night_10k = true;
        data.MENTS.night_25k = true;
        data.save();

    } else if(nsquids >= 50000 && nsquids < 75000 && data.MENTS.night_50k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Night Whisperer <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.MENTS.night_1k = true;
        data.MENTS.night_5k = true;
        data.MENTS.night_10k = true;
        data.MENTS.night_25k = true;
        data.MENTS.night_50k = true;
        data.save();

    } else if(nsquids >= 75000 && data.MENTS.night_75k == false ) {

        ChatLib.chat(`[InkUtilities] §a§n>> Achievement Unlocked: Night Conquerer <<§a§r`)
        RainSound.setVolume(settings.rainSound).play();

        data.MENTS.night_500 = true;
        data.MENTS.night_1k = true;
        data.MENTS.night_5k = true;
        data.MENTS.night_10k = true;
        data.MENTS.night_25k = true;
        data.MENTS.night_50k = true;
        data.MENTS.night_75k = true;
        data.save();

    }



    completedAchievements = Object.values(data.MENTS).filter(value => value === true).length;


    for(let j = 0; j < totalAchievements; j++) {

        if(j <= 6) {
            mentCurrent[j] = Math.round(data.INK.inkAmount);
        } else if(j == 7) {

            if(data.MENTS.b2b_clover) {
                mentCurrent[j] = 1;
            } else {
                mentCurrent[j] = 0;
            }

        } else if(j==8) {
            mentCurrent[j] = data.INK.nightRecord;
        } else if(j==9) {
            mentCurrent[j] = data.INK.squidRecord;
        } else if(j==10) {
            mentCurrent[j] = data.SCC.carrotRecord;
        } else if(j > 10 && j <= 13) {
            mentCurrent[j] = data.SCC.cores;
        } else if(j > 13 && j <= 17) {
            mentCurrent[j] = Math.floor(data.INK.rainBought/60);
        } else if(j==18) {
            if(data.MENTS.aqua) {
                mentCurrent[j] = 1;
            } else {
                mentCurrent[j] = 0;
            }

        } else if(j >= 19 && j <= 22) {
            mentCurrent[j] = data.INK.sessionRecord;
        } else if(j >= 23 && j <= 29) {
            mentCurrent[j] = data.INK.squidAmount;
        } else if(j >=30 && j<=36) {
            mentCurrent[j] = data.INK.nightSquidCaught;
        }


    }







}).setDelay(2)




var moveOverlay = new Gui();

register("command", () => {
    moveOverlay.open()
}).setName("movetest");


let scrollOffset = 0; // Tracks the vertical scroll position
const itemHeight = 50; // Height of each rectangle (in pixels)
const visibleItems = 6; // Number of rectangles visible at a time
const totalItems = totalAchievements;

const nameArray = Object.values(mentNames);
const desArray = Object.values(mentDes);
const goalArray = Object.values(mentGoals);




register("scrolled", (x, y, direction) => {
    if (!moveOverlay.isOpen()) return;
    // Adjust the scroll offset based on scroll direction
    if (direction === 1) {
        scrollOffset = Math.max(scrollOffset - itemHeight, 0); // Scroll 
    } else if (direction === -1) {
        scrollOffset = Math.min(scrollOffset + itemHeight, (totalItems - visibleItems) * itemHeight); // Scroll down
    }
});



const title = "InkUtilities Achievement Tracker";


register ("renderOverlay", () => {
    if(moveOverlay.isOpen()) {
        const color = settings.inkColor;
        var cmentArray = Object.values(data.MENTS);

        const rectWidth = 300; // Width of each rectangle
        const rectHeight = itemHeight - 2; // Slightly smaller for spacing

        // Calculate which items to render based on scrollOffset
        const startIndex = Math.floor(scrollOffset / itemHeight);
        const endIndex = Math.min(startIndex + visibleItems, totalItems);

        var screenWidth = Renderer.screen.getWidth() /2;
        var screenHeight = Renderer.screen.getHeight() /2;

        var rectX = screenWidth - (rectWidth/2);
        var rectY = screenHeight - ((visibleItems * itemHeight) / 2)

        var compared = `Completed ${completedAchievements} out of ${totalAchievements}`;
        var comparedX = (screenWidth) - (Renderer.getStringWidth(compared)/ 2);


        var titleX = (screenWidth) - (Renderer.getStringWidth(title) / 2)
        Renderer.drawString(`§l§b${title}§r`, titleX, rectY-20, true);
        Renderer.drawString(`§a${compared}`, comparedX, rectY-10, true);


        var padding = 2;
        var barWidth = rectWidth - (2 * padding);
        var barHeight = 6;



        for (let i = startIndex; i < endIndex; i++) {
            var y = rectY + (i - startIndex) * itemHeight - (scrollOffset % itemHeight);

            // Draw arectangle for each item
            Renderer.drawRect(Renderer.color(0, 0, 0, 150), rectX, y, rectWidth, rectHeight);

            var fillWidth = (mentCurrent[i] / goalArray[i]) * barWidth

            if(fillWidth > barWidth) {
                fillWidth = barWidth;
            }

            var barColor = (mentCurrent[i] >= goalArray[i]) ? "green" : "yellow";

            var progress = `${mentCurrent[i]}/${goalArray[i]}`
            var progressWidth = Renderer.getStringWidth(progress)


            if(cmentArray[i]) {
                Renderer.drawString(`§a${nameArray[i]}`, rectX+2, y+3, true);
                Renderer.drawString(`§a${progress}`, (rectX+298) - progressWidth, y+3, true)
            } else {
                Renderer.drawString(`§f${nameArray[i]}`, rectX+2, y+3, true);
                Renderer.drawString(`§f${progress}`, (rectX+298) - progressWidth, y+3, true)
            }

            Renderer.drawString(`§6${desArray[i]}`, rectX+2, y+rectHeight-20, true)


            Renderer.drawRect(Renderer.color(78, 78, 62, 180), rectX + padding, y+ rectHeight-10, barWidth, barHeight)
            
            if(barColor=="green") {
                Renderer.drawRect(Renderer.color(85, 255, 85, 255), rectX + padding, y+ rectHeight-10, fillWidth, barHeight)

            } else {
                Renderer.drawRect(Renderer.color(243, 231, 0, 255), rectX + padding, y+ rectHeight-10, fillWidth, barHeight)

            }
            

        }
    }

});