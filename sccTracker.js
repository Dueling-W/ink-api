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

const sccShadow = data.CONFIG.sccShadow;


var dh = -1;

//All chats for water sea creatures
const waterCreatures = /^(A Squid appeared\.|You caught a Sea Walker\.|Pitch darkness reveals a Night Squid\.|You stumbled upon a Sea Guardian\.|It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious\!|You reeled in a Sea Archer\.|The Rider of the Deep has emerged\.|Huh\? A Catfish\!|Is this even a fish\? It's the Carrot King\!|Gross! A Sea Leech\!|You've discovered a Guardian Defender of the sea\.|You have awoken the Deep Sea Protector, prepare for a battle\!|The Water Hydra has come to test your strength\.|Sea Emperor arises from the depths\.|Your Chumcap Bucket trembles, it's an Agarimoo\.)$/;



//calc minutes
var minutes = (data.SCC.empTime) / 60;
minutes = Math.round(minutes, 1);

//strings
var titleString = "==Sea Creatures Display!==";
var sccString = "Sea Creatures Caught: " + localSCC.sesSCC;
var hydraString = "Hydras Caught: " + localSCC.sesHydra;
var empsString = "Emps Caught: " + localSCC.sesEmp;
var mooString = "Agarimoo Caught: " + localSCC.sesMoo;
var carrotString = "Carrot Kings Caught: "+ localSCC.sesCarrot;
var minuteString = "Time Since Emp: " + minutes + " minute";
var minutesString = "Time Since Emp: " + minutes + " minutes";
var sccString2 = "Total Sea Creatures Caught: " + data.SCC.ttlSCC;
var hydraString2 = "Total Hydras Caught: " + data.SCC.hydra;
var empString2 = "Total Emps Caught: " + data.SCC.emp;
var mooString2 = "Total Agarimoos Caught: " + data.SCC.moo;
var carrotString2 = "Total Carrot Kings Caught: " + data.SCC.carrot;

//========MOVE DISPLAY========
//
//
//

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




//========DH CONDITIONS========
//
//
//

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook!");

register("chat", () => {
    dh = 0;

}).setCriteria("It's a Double Hook! Woot woot!");





//========ALL TRACKERS========
//
//
//

//emp
register("chat", () => {

    if(dh == 0) {
        localSCC.sesEmp += 2;
        data.SCC.emp += 2;
        data.SCC.empTime = 0;
        dh = -1;
        data.save();
    } else {
        localSCC.sesEmp += 1;
        data.SCC.emp += 1;
        data.SCC.empTime = 0;
        dh = -1;
        data.save();
    }

}).setCriteria("The Sea Emperor arises from the depths.");


//hydra
register("chat", () => {

    if(dh == 0) {
        localSCC.sesHydra += 2;
        data.SCC.hydra += 2;
        dh = -1;
        data.save();
    } else {
        localSCC.sesHydra += 1;
        data.SCC.hydra += 1;
        dh = -1;
        data.save();
    }

}).setCriteria("The Water Hydra has come to test your strength.");

//moo
register("chat", () => {

    if(dh == 0) {
        localSCC.sesMoo += 2;
        data.SCC.moo += 2;
        dh = -1;
        data.save();
        data.SCC.tongue += ((data.SCC.mooDrop) *2);
    } else {
        localSCC.sesMoo += 1;
        data.SCC.moo += 1;
        dh = -1;
        data.save();
        data.SCC.tongue += (data.SCC.mooDrop);
    }

}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");


//carrot
register("chat", () => {

    if(dh == 0) {
        localSCC.sesCarrot += 2;
        data.SCC.carrot += 2;
        dh = -1;
        data.save();
    } else {
        localSCC.sesCarrot += 1;
        data.SCC.carrot += 1;
        dh = -1;
        data.save();
    }

}).setCriteria("Is this even a fish? It's the Carrot King!");


//all
register("chat", () => {

    if(dh == 0) {
        localSCC.sesSCC += 2;
        data.SCC.ttlSCC += 2;
        dh = -1;
        data.save();
    } else {
        localSCC.sesSCC += 1;
        data.SCC.ttlSCC += 1;
        dh = -1;
        data.save();
    }

}).setCriteria(waterCreatures)


//Time since emp tracker
register("step", () => {
    if(!settings.empTimer) return;

    data.SCC.empTime += 1;
    data.save();

}).setFps(1);


//========RENDER DISPLAY========
//
//
//


register("step", () => {

    //calc minutes
    var minutes = (data.SCC.empTime) / 60;
    minutes = Math.round(minutes, 1);

    //strings
    titleString = "==Sea Creatures Display!==";
    sccString = "Sea Creatures Caught: " + localSCC.sesSCC;
    hydraString = "Hydras Caught: " + localSCC.sesHydra;
    empsString = "Emps Caught: " + localSCC.sesEmp;
    mooString = "Agarimoo Caught: " + localSCC.sesMoo;
    carrotString = "Carrot Kings Caught: "+ localSCC.sesCarrot;
    minuteString = "Time Since Emp: " + minutes + " minute";
    minutesString = "Time Since Emp: " + minutes + " minutes";
    sccString2 = "Total Sea Creatures Caught: " + data.SCC.ttlSCC;
    hydraString2 = "Total Hydras Caught: " + data.SCC.hydra;
    empString2 = "Total Emps Caught: " + data.SCC.emp;
    mooString2 = "Total Agarimoos Caught: " + data.SCC.moo;
    carrotString2 = "Total Carrot Kings Caught: " + data.SCC.carrot;



});


register ("renderOverlay", () => {


    if(settings.creatureDisplay) {

        const color = settings.scColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(titleString, data.SCC.x, data.SCC.y, true);
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

        if(minutes <=1) {
            Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
            Renderer.drawString(minuteString, data.SCC.x, data.SCC.y+60, true);     
        } else {
            Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
            Renderer.drawString(minutesString, data.SCC.x, data.SCC.y+60, true);
        }

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
        Renderer.drawString(titleString, data.SCC.x, data.SCC.y, true);
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

        if(minutes <=1) {
            Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
            Renderer.drawString(minuteString, data.SCC.x, data.SCC.y+60, true);     
        } else {
            Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
            Renderer.drawString(minutesString, data.SCC.x, data.SCC.y+60, true);
        }

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
        Renderer.drawString(titleString, data.SCC.xgui, data.SCC.ygui, true);
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

        if(minutes <=1) {
            Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
            Renderer.drawString(minuteString, data.SCC.xgui, data.SCC.ygui+60, true);     
        } else {
            Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
            Renderer.drawString(minutesString, data.SCC.xgui, data.SCC.ygui+60, true);
        }

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
