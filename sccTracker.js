import { data } from "./utils"
import settings from "./settings"


//local dic
let localSCC = {
    sesSCC: 0,
    sesEmp: 0,
    sesHydra: 0,
    sesMoo: 0,
    sesCarrot: 0
};

var movecounter = new Gui();

var gui = new Gui();

var scoreTitle = 0;


var dh = -1;

//All chats for water sea creatures
const waterCreatures = /^(You caught a Sea Walker\.|You stumbled upon a Sea Guardian\.|It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious\!|You reeled in a Sea Archer\.|The Rider of the Deep has emerged\.|Huh\? A Catfish\!|Gross! A Sea Leech\!|You've discovered a Guardian Defender of the sea\.|You have awoken the Deep Sea Protector, prepare for a battle\!|A Squid appeared\.|Pitch darkness reveals a Night Squid\.|An Oasis Rabbit appears from the water\.|An Oasis Sheep appears from the water\.|A Water Worm surfaces\!|A Poisoned Water Worm surfaces\!|An Abyssal Miner breaks out of the water\!|Phew! It's only a Scarecrow\.|You hear trotting from beneath the waves, you caught a Nightmare\.|It must be a full moon, a Werewolf appears\.|The spirit of a long lost Phantom Fisherman has come to haunt you\.|This can't be! The manifestation of death himself\!|The Sea Emperor arises from the depths\.|The Water Hydra has come to test your strength\.|Your Chumcap Bucket trembles, it's an Agarimoo\.|Is this even a fish\? It's the Carrot King\!)$/;

//Double hook strings
const doubleHook = /^(It's a Double Hook\!|It's a Double Hook! Woot woot\!|DOUBLE HOOK)$/;


//calc minutes
var minutes = data.SCC.empTime

//strings
var sccString = "Sea Creatures Caught: " + localSCC.sesSCC;
var hydraString = "Hydras Caught: " + localSCC.sesHydra;
var empsString = "Emps Caught: " + localSCC.sesEmp;
var mooString = "Agarimoo Caught: " + localSCC.sesMoo;
var carrotString = "Carrot Kings Caught: "+ localSCC.sesCarrot;
var minuteString = "Time Since Emp: " + minutes
var sccString2 = "Total Sea Creatures Caught: " + data.SCC.ttlSCC;
var hydraString2 = "Total Hydras Caught: " + data.SCC.hydra;
var empString2 = "Total Emps Caught: " + data.SCC.emp;
var mooString2 = "Total Agarimoos Caught: " + data.SCC.moo;
var carrotString2 = "Total Carrot Kings Caught: " + data.SCC.carrot;


//===Move displays===

register("dragged", (dx, dy, x, y) => {
    if (!movecounter.isOpen()) return
    data.SCC.x = x
    data.SCC.y = y
    data.save()
});

register("command", () => {
    movecounter.open()
}).setName("movescdisplay");


register("dragged", (dx, dy, x, y) => {
    if (!gui.isOpen()) return;
    data.SCC.xgui = x
    data.SCC.ygui = y
    data.save()
});

register("command", () => {
    gui.open();
}).setName("scGui");


//===Double Hook condition===

register("chat", doubleFunc).setCriteria(doubleHook);


function doubleFunc() {

    data.SCC.dh = 0;
    data.INK.dh = 0;
    data.BEST.dh = 0;
    data.SPOOKY.dh = 0;

    if(!settings.dhToggle) return;
    ChatLib.say(`/pc ${settings.dhMsg}`);

    setTimeout(() => {
    }, 500);
}


//===Sea creature caught

register("chat", (msg) => {

    if(!settings.trackSC) return;

    if(data.SCC.dh==0) {
        localSCC.sesSCC += 2;
        data.SCC.ttlSCC += 2;

        if(settings.spookyToggle) {
            data.SPOOKY.sccGrim += 2;
        }
        data.save();
    } else {
        localSCC.sesSCC += 1;
        data.SCC.ttlSCC += 1;
        if(settings.spookyToggle) {
            data.SPOOKY.sccGrim += 1;
        }
        data.save();
    }



    if(msg=="The Sea Emperor arises from the depths.") {
        var x = Player.getX();
        var y = Player.getY();
        var z = Player.getZ();
        x = Math.round(x, 0);
        y = Math.round(y, 0);
        z = Math.round(z, 0);

        if(data.SCC.dh == 0) {
            localSCC.sesEmp += 2;
            data.SCC.emp += 2;
            data.SCC.empTime = 0;
            data.SCC.dh = -1;
    
            if(settings.empParty) {
                ChatLib.say(`/pc >>Sea Emperor Arises DOUBLE HOOK<< at x: ${x}, y: ${y}, z: ${z}`);
            }
            data.save();
        } else {
            localSCC.sesEmp += 1;
            data.SCC.emp += 1;
            data.SCC.empTime = 0; 
            data.SCC.dh = -1;   
    
            data.save();
    
            if(settings.empParty) {
                ChatLib.say(`/pc >>Sea Emperor Arises<< at x: ${x}, y: ${y}, z: ${z}`);
            }
        }
    } else if(msg=="The Water Hydra has come to test your strength.") {
        if(data.SCC.dh == 0) {
            localSCC.sesHydra += 2;
            data.SCC.hydra += 2;
            data.SCC.dh = -1;
            data.save();
        } else {
            localSCC.sesHydra += 1;
            data.SCC.hydra += 1;
            data.SCC.dh = -1;
            data.save();
        }
    } else if(msg=="Your Chumcap Bucket trembles, it's an Agarimoo.") {
        if(data.SCC.dh == 0) {
            localSCC.sesMoo += 2;
            data.SCC.moo += 2;
            data.SCC.dh = -1;
            data.save();
        } else {
            localSCC.sesMoo += 1;
            data.SCC.moo += 1;
            data.SCC.dh = -1;
            data.save();
        }
    } else if(msg=="Is this even a fish? It's the Carrot King!") {
        if(data.SCC.dh == 0) {
            localSCC.sesCarrot += 2;
            data.SCC.carrot += 2;
            data.SCC.dh = -1;
            data.save();
        } else {
            localSCC.sesCarrot += 1;
            data.SCC.carrot += 1;
            data.SCC.dh = -1;
            data.save();
        }
    } else {
        data.SCC.dh = -1;
        data.save();
    }

}).setCriteria(waterCreatures);


//Time since emp tracker
register("step", () => {
    if(!settings.trackSC) return;
    if(!settings.empTimer) return;

    if(!(scoreTitle.includes('SKYBLOCK'))) return;

    data.SCC.empTime += 1;
    data.save();

}).setFps(1);

//Clover core alert
register("chat", (mf) => {

    if(!settings.luckyDrop) return;

    ChatLib.say(`/pc RARE DROP! Lucky Clover Core (${mf}% ✯ Magic Find)`);

    Client.showTitle("&aCLOVER CORE!", "", 15, 25, 15);


}).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)");


//========RENDER DISPLAY========
//
//
//

register("step", () => {

    scoreTitle = Scoreboard.getScoreboardTitle();
    scoreTitle = removeMinecraftColorCodes(scoreTitle);

}).setFps(1);

register("step", () => {

    if(!settings.trackSC) return;

    //calc minutes
    var minutes = data.SCC.empTime;
    minutes = formatTimeElapsed(minutes);

    var scc = numberWithCommas(localSCC.sesSCC);
    var scc2 = numberWithCommas(data.SCC.ttlSCC);
    var hydra = numberWithCommas(data.SCC.hydra);
    var emp = numberWithCommas(data.SCC.emp);
    var moo = numberWithCommas(data.SCC.moo);
    var carrot = numberWithCommas(data.SCC.carrot);

    //strings
    sccString = "Creatures Caught:  " + scc;
    hydraString = "Hydras:  " + localSCC.sesHydra;
    empsString = "Emps:  " + localSCC.sesEmp;
    mooString = "Agarimoo:  " + localSCC.sesMoo;
    carrotString = "Carrot Kings:  "+ localSCC.sesCarrot;
    minuteString = "Time Since Emp:  " + minutes 
    sccString2 = "Creatures Caught (Total):  " + scc2;
    hydraString2 = "Hydras (Total):  " + hydra;
    empString2 = "Emps (Total):  " + emp;
    mooString2 = "Agarimoos (Total):  " + moo;
    carrotString2 = "Carrot Kings (Total):  " + carrot;



}).setFps(1);


register ("renderOverlay", () => {

    if(!settings.trackSC) return;

    if(settings.creatureDisplay) {

        const color = settings.scColor;


        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sccString, data.SCC.x, data.SCC.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(hydraString, data.SCC.x, data.SCC.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(empsString, data.SCC.x, data.SCC.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(mooString, data.SCC.x, data.SCC.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(carrotString, data.SCC.x, data.SCC.y+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(minuteString, data.SCC.x, data.SCC.y+60, true);     
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sccString2, data.SCC.x, data.SCC.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(hydraString2, data.SCC.x, data.SCC.y+80, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(empString2, data.SCC.x, data.SCC.y+90, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(mooString2, data.SCC.x, data.SCC.y+100, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(carrotString2, data.SCC.x, data.SCC.y+110, true);

    }


    if (movecounter.isOpen() && settings.creatureDisplay) {
        const color = settings.scColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.SCC.x)}, y: ${Math.round(data.SCC.y)}`, parseInt(data.SCC.x) - 65, parseInt(data.SCC.y) - 12)


        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sccString, data.SCC.x, data.SCC.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(hydraString, data.SCC.x, data.SCC.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(empsString, data.SCC.x, data.SCC.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(mooString, data.SCC.x, data.SCC.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(carrotString, data.SCC.x, data.SCC.y+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(minuteString, data.SCC.x, data.SCC.y+60, true);     
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sccString2, data.SCC.x, data.SCC.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(hydraString2, data.SCC.x, data.SCC.y+80, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(empString2, data.SCC.x, data.SCC.y+90, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(mooString2, data.SCC.x, data.SCC.y+100, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(carrotString2, data.SCC.x, data.SCC.y+110, true);   

    }


    if(gui.isOpen()) {

        const color = settings.scColor;


        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sccString, data.SCC.xgui, data.SCC.ygui+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(hydraString, data.SCC.xgui, data.SCC.ygui+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(empsString, data.SCC.xgui, data.SCC.ygui+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(mooString, data.SCC.xgui, data.SCC.ygui+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(carrotString, data.SCC.xgui, data.SCC.ygui+50, true);   
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(minuteString, data.SCC.xgui, data.SCC.ygui+60, true);     
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sccString2, data.SCC.xgui, data.SCC.ygui+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(hydraString2, data.SCC.xgui, data.SCC.ygui+80, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(empString2, data.SCC.xgui, data.SCC.ygui+90, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(mooString2, data.SCC.xgui, data.SCC.ygui+100, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(carrotString2, data.SCC.xgui, data.SCC.ygui+110, true);

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




register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.ttlSCC = x;
    data.save();
    
}).setName("setsc");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.emp = x;
    data.save();
    
}).setName("setemp");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.hydra = x;
    data.save();
    
}).setName("sethydra");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.moo = x;
    data.save();
    
}).setName("setmoo");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.carrot = x;
    data.save();
    
}).setName("setcarrot");


