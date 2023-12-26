import { data } from "./utils"
import settings from "./settings"


var movecounter = new Gui();

//oasis
var oasisString = "==Oasis Display!==";
var rabbitString = "Oasis Rabbits Caught: " + data.BEST.rabbit + "/300";
var sheepString = "Oasis Sheep Caught: " + data.BEST.sheep + "/300";


var crystalString = "==Crystal Hollows Display!==";
var wormString = "Water Worms Caught: " + data.BEST.worm + "/1000";
var poisonString = "Poisoned Water Worms Caught: " + data.BEST.poisonWorm + "/1000";
var sesZombie = "Zombie Miners Caught: " + data.BEST.zombie + "/250";


var dh = -1;


//========MOVE DISPLAY========
//
//
//

register("dragged", (dx, dy, x, y) => {
    if (!movecounter.isOpen()) return;
    
    data.BEST.x = x
    data.BEST.y = y
    data.save()
});

register("command", () => {
    movecounter.open()
}).setName("movebestdisplay");



//========DH CONDITIONS========
//
//
//

register("chat", () => {
    data.SCC.dh = 0;

}).setCriteria("It's a Double Hook!");

register("chat", () => {
    data.SCC.dh = 0;

}).setCriteria("It's a Double Hook! Woot woot!");


register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.BEST.rabbit = 0;
    data.BEST.rabbit += x;
    data.save();
    
}).setName("setRabbit");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.BEST.sheep = 0;
    data.BEST.sheep += x;
    data.save();
    
}).setName("setSheep");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.BEST.worm = x;
    data.save();
    
}).setName("setWorm");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.BEST.poisonWorm = x;
    data.save();
    
}).setName("setPoisonWorm");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.BEST.zombie = x;
    data.save();
    
}).setName("setZombie");






//rabbit
register("chat", () => {

    if(!settings.bestTrack) return;

    if(data.SCC.dh == 0) {
        data.BEST.rabbit += 2;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 2;
        data.save();
    } else {
        data.BEST.rabbit += 1;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 1;
        data.save();
    }

}).setCriteria("An Oasis Rabbit appears from the water.");


//sheep
register("chat", () => {
    if(!settings.bestTrack) return;


    if(data.SCC.dh == 0) {
        data.BEST.sheep += 2;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 2;
        data.save();
    } else {
        data.BEST.sheep += 1;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 1;
        data.save();
    }

}).setCriteria("An Oasis Sheep appears from the water.");


//rabbit
register("chat", () => {

    if(!settings.bestTrack) return;


    if(data.SCC.dh == 0) {
        data.BEST.worm += 2;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 2;
        data.save();
    } else {
        data.BEST.worm += 1;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 1;
        data.save();
    }

}).setCriteria("A Water Worm surfaces!");


//rabbit
register("chat", () => {

    if(!settings.bestTrack) return;


    if(data.SCC.dh == 0) {
        data.BEST.poisonWorm += 2;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 2;
        data.save();
    } else {
        data.BEST.poisonWorm += 1;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 1;
        data.save();
    }

}).setCriteria("A Poisoned Water Worm surfaces!");

//rabbit
register("chat", () => {

    if(!settings.bestTrack) return;


    if(data.SCC.dh == 0) {
        data.BEST.zombie += 2;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 2;
        data.save();
    } else {
        data.BEST.zombie += 1;
        data.SCC.dh = -1;
        data.SCC.ttlSCC += 1;
        data.save();
    }

}).setCriteria("An Abyssal Miner breaks out of the water!");


register("step", () => {

    oasisString = "==Oasis Display!==";
    rabbitString = "Oasis Rabbits Caught: " + data.BEST.rabbit + "/300";
    sheepString = "Oasis Sheep Caught: " + data.BEST.sheep + "/300";


    crystalString = "==Crystal Hollows Display!==";
    wormString = "Water Worms Caught: " + data.BEST.worm + "/1000";
    poisonString = "Poisoned Water Worms Caught: " + data.BEST.poisonWorm + "/1000";
    sesZombie = "Zombie Miners Caught: " + data.BEST.zombie + "/250";
    


});



register ("renderOverlay", () => {


    if(settings.oasisDisplay) {

        const color = settings.oasisColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(oasisString, data.BEST.x, data.BEST.y, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(rabbitString, data.BEST.x, data.BEST.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sheepString, data.BEST.x, data.BEST.y+20, true);

    }

    if(settings.hollowsDisplay) {

        const color = settings.hollowsColor;

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(crystalString, data.BEST.x, data.BEST.y, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(wormString, data.BEST.x, data.BEST.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(poisonString, data.BEST.x, data.BEST.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sesZombie, data.BEST.x, data.BEST.y+30, true);
    }


    if (movecounter.isOpen() && settings.oasisDisplay) {
        const color = settings.oasisColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.BEST.x)}, y: ${Math.round(data.BEST.y)}`, parseInt(data.BEST.x) - 65, parseInt(data.BEST.y) - 12)

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(oasisString, data.BEST.x, data.BEST.y, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(rabbitString, data.BEST.x, data.BEST.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sheepString, data.BEST.x, data.BEST.y+20, true);
    }

    if (movecounter.isOpen() && settings.hollowsDisplay) {
        const color = settings.hollowsColor

        Renderer.drawStringWithShadow(`x: ${Math.round(data.BEST.x)}, y: ${Math.round(data.BEST.y)}`, parseInt(data.BEST.x) - 65, parseInt(data.BEST.y) - 12)

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(crystalString, data.BEST.x, data.BEST.y, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(wormString, data.BEST.x, data.BEST.y+10, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(poisonString, data.BEST.x, data.BEST.y+20, true);
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        Renderer.drawString(sesZombie, data.BEST.x, data.BEST.y+30, true);
    }


});
