import {data} from "../data/utils.js"
import settings from "../data/settings"
import * as functions from "../utils/functions.js"


let localSpooky = {
    grim: 0,
    phantom: 0,
    werewolf: 0,
    nightmare: 0,
    scarecrow: 0
}

var movecounter = new Gui();

var scareTitles = "Scarecrows  ";
var nightTitles = "Nightmares:  ";
var wereTitles = "Werewolfs:  ";
var phantomTitles = "Phantoms:  ";
var grimTitles = "Grim Reapers:  ";
var scGrim = "SC Since Grim:  ";
var scareTitlesT = "Scarecrows (Total)  ";
var nightTitlesT = "Nightmares (Total):  ";
var wereTitlesT = "Werewolfs (Total):  ";
var phantomTitlesT = "Phantoms (Total):  ";
var grimTitlesT = "Grim Reapers (Total):  ";

var scareTitle = 0;
var nightTitle = 0;
var wereTitle = 0;
var phantomTitle = 0;
var grimTitle = 0;
var scGrimTitle = 0;
var scareTitleT = 0;
var nightTitleT = 0;
var wereTitleT = 0;
var phantomTitleT = 0;
var grimTitleT = 0;

//rounding and formatting
var scareVal = 0;
var nightVal = 0;
var wereVal = 0;
var phantomVal = 0;
var grimVal = 0;
var scGrimVal = 0;
var scareValT = 0;
var nightValT = 0;
var wereValT = 0;
var phantomValT = 0;
var grimValT = 0;


//========MOVE MAIN DISPLAY========
//
//
//

register("dragged", (dx, dy, x, y) => {
    if (!movecounter.isOpen()) return
    data.SPOOKY.x = x
    data.SPOOKY.y = y
    data.save()
});

register("command", () => {
    movecounter.open()
}).setName("movespookydisplay");


register("chat", () => {

    if(!settings.spookyToggle) return;

    var x = Player.getX();
    var y = Player.getY();
    var z = Player.getZ();
    x = Math.round(x, 0);
    y = Math.round(y, 0);
    z = Math.round(z, 0);


    if(data.SPOOKY.dh == 0) {

        if(settings.spookyRares) {
            ChatLib.say(`/pc >>Death Himself! DOUBLE HOOK (${data.SPOOKY.sccGrim})<< at x: ${x}, y: ${y}, z: ${z}`);
        }


        localSpooky.grim += 2;
        data.SPOOKY.grim += 2;
        data.SPOOKY.sccGrim = 0;
        data.SPOOKY.dh = -1;
        data.save();
        
    } else {

        if(settings.spookyRares) {
            ChatLib.say(`/pc >>Death Himself! (${data.SPOOKY.sccGrim})<< at x: ${x}, y: ${y}, z: ${z}`);
        }

        localSpooky.grim += 1;
        data.SPOOKY.grim += 1;
        data.SPOOKY.sccGrim = 0;
        data.SPOOKY.dh = -1;
        data.save();
        
    }



}).setCriteria("This can't be! The manifestation of death himself!");


register("chat", () => {

    if(!settings.spookyToggle) return;

    var x = Player.getX();
    var y = Player.getY();
    var z = Player.getZ();
    x = Math.round(x, 0);
    y = Math.round(y, 0);
    z = Math.round(z, 0);


    if(data.SPOOKY.dh == 0) {
        localSpooky.phantom += 2;
        data.SPOOKY.phantom += 2;
        data.SPOOKY.dh = -1;
        data.save();

        if(!settings.spookyRares) return;
        ChatLib.say(`/pc >>Phantom Fisher! DOUBLE HOOK<< at x: ${x}, y: ${y}, z: ${z}`);
        
    } else {
        localSpooky.phantom += 1;
        data.SPOOKY.phantom += 1;
        data.SPOOKY.dh = -1;
        data.save();
        
        if(!settings.spookyRares) return;
        ChatLib.say(`/pc >>Phantom Fisher!<< at x: ${x}, y: ${y}, z: ${z}`);
    }



}).setCriteria("The spirit of a long lost Phantom Fisher has come to haunt you.");


register("chat", () => {

    if(!settings.spookyToggle) return;


    if(data.SPOOKY.dh == 0) {
        localSpooky.werewolf += 2;
        data.SPOOKY.werewolf += 2;
        data.SPOOKY.dh = -1;
        data.save();
        
    } else {
        localSpooky.werewolf += 1;
        data.SPOOKY.werewolf += 1;
        data.SPOOKY.dh = -1;
        data.save();
        
    }



}).setCriteria("It must be a full moon, a Werewolf appears.");

register("chat", () => {

    if(!settings.spookyToggle) return;


    if(data.SPOOKY.dh == 0) {
        localSpooky.nightmare += 2;
        data.SPOOKY.nightmare += 2;
        data.SPOOKY.dh = -1;
        data.save();
        
    } else {
        localSpooky.nightmare += 1;
        data.SPOOKY.nightmare += 1;
        data.SPOOKY.dh = -1;
        data.save();
        
    }



}).setCriteria("You hear trotting from beneath the waves, you caught a Nightmare.");

register("chat", () => {

    if(!settings.spookyToggle) return;


    if(data.SPOOKY.dh == 0) {
        localSpooky.scarecrow += 2;
        data.SPOOKY.scarecrow += 2;
        data.SPOOKY.dh = -1;
        data.save();
        
    } else {
        localSpooky.scarecrow += 1;
        data.SPOOKY.scarecrow += 1;
        data.SPOOKY.dh = -1;
        data.save();
        
    }

}).setCriteria("Phew! It's only a Scarecrow.");


register("chat", (mf) => {

    if(settings.orbAlert) {
        Client.showTitle("&5DEEP SEA ORB", "", 15, 25, 15);
    }

    if(settings.orbPartyAlert) {
        ChatLib.say(`/pc RARE DROP! Deep Sea Orb (${mf}% ✯ Magic Find)`);
    }


}).setCriteria("RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)");


register("step", () => {

    if(!settings.spookyToggle) return;

    scareVal = localSpooky.scarecrow;
    nightVal = localSpooky.nightmare;
    wereVal = localSpooky.werewolf;
    phantomVal = localSpooky.phantom;
    grimVal = localSpooky.grim;
    scGrimVal = data.SPOOKY.sccGrim;
    scGrimVal = numberWithCommas(scGrimVal);
    scareValT = data.SPOOKY.scarecrow;
    scareValT = numberWithCommas(scareValT);
    nightValT = data.SPOOKY.nightmare;
    nightValT = numberWithCommas(nightValT);
    wereValT = data.SPOOKY.werewolf;
    wereValT = numberWithCommas(wereValT);
    phantomValT = data.SPOOKY.phantom;
    phantomValT = numberWithCommas(phantomValT);
    grimValT = data.SPOOKY.grim;
    grimValT = numberWithCommas(grimValT);


    scareTitle = scareTitles + scareVal ;
    nightTitle = nightTitles + nightVal ;
    wereTitle = wereTitles + wereVal ;
    phantomTitle = phantomTitles + phantomVal;
    grimTitle = grimTitles + grimVal;
    scGrimTitle = scGrim + scGrimVal;
    scareTitleT = scareTitlesT + scareValT;
    nightTitleT = nightTitlesT + nightValT;
    wereTitleT = wereTitlesT+wereValT;
    phantomTitleT = phantomTitlesT + phantomValT ;
    grimTitleT = grimTitlesT + grimValT;


}).setFps(1);

register ("renderOverlay", () => {

    if(!settings.spookyToggle) return;

    if(settings.spookyDisplay) {

        const color = settings.spookyColor;


        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(scareTitle, data.SPOOKY.x, data.SPOOKY.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.SPOOKY.x, data.SPOOKY.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(wereTitle, data.SPOOKY.x, data.SPOOKY.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(phantomTitle, data.SPOOKY.x, data.SPOOKY.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(grimTitle, data.SPOOKY.x, data.SPOOKY.y+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(scGrimTitle, data.SPOOKY.x, data.SPOOKY.y+60, true);     
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(scareTitleT, data.SPOOKY.x, data.SPOOKY.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitleT, data.SPOOKY.x, data.SPOOKY.y+80, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(wereTitleT, data.SPOOKY.x, data.SPOOKY.y+90, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(phantomTitleT, data.SPOOKY.x, data.SPOOKY.y+100, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(grimTitleT, data.SPOOKY.x, data.SPOOKY.y+110, true);

    }


    if (movecounter.isOpen() && settings.spookyDisplay) {
        const color = settings.spookyColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.SPOOKY.x)}, y: ${Math.round(data.SPOOKY.y)}`, parseInt(data.SPOOKY.x) - 65, parseInt(data.SPOOKY.y) - 12)


        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(scareTitle, data.SPOOKY.x, data.SPOOKY.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitle, data.SPOOKY.x, data.SPOOKY.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(wereTitle, data.SPOOKY.x, data.SPOOKY.y+30, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(phantomTitle, data.SPOOKY.x, data.SPOOKY.y+40, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(grimTitle, data.SPOOKY.x, data.SPOOKY.y+50, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(scGrimTitle, data.SPOOKY.x, data.SPOOKY.y+60, true);     
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(scareTitleT, data.SPOOKY.x, data.SPOOKY.y+70, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(nightTitleT, data.SPOOKY.x, data.SPOOKY.y+80, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(wereTitleT, data.SPOOKY.x, data.SPOOKY.y+90, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(phantomTitleT, data.SPOOKY.x, data.SPOOKY.y+100, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(grimTitleT, data.SPOOKY.x, data.SPOOKY.y+110, true);

    }

});



function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SPOOKY.scarecrow = x;
    data.save();
    
}).setName("setscare");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SPOOKY.nightmare = x;
    data.save();
    
}).setName("setnightmare");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SPOOKY.werewolf = x;
    data.save();
    
}).setName("setwerewolf");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SPOOKY.phantom = x;
    data.save();
    
}).setName("setphantom");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SPOOKY.grim = x;
    data.save();
    
}).setName("setgrim");