/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import "./inkTracking.js"
import "./sccTracker.js"
import "./apiCalls.js"
import {data} from "./utils.js"
import settings from "./settings"



//========STARTING AND MISC. COMMANDS========

register("command", () => settings.openGUI()).setName("inkUtils").setAliases("Ink");

if (settings.firstRun) {
    settings.firstRun = false;
    ChatLib.chat("&b&l----------InkUtilities----------")
    ChatLib.chat("&9Thank you for Downloading &f&nInkUtilities!");
    ChatLib.chat("&9You can open the settings using /ink | /inkUtils");
    ChatLib.chat("&9View all commands with /inkCommands | /inkHelp");
    ChatLib.chat("&9Please use a level 100 epic or legendary squid for accurate rates!");
    ChatLib.chat("&9Set your looting enchant using /looting (4) or (5)!");
}



register("command", () => {
    ChatLib.chat("&b&l----------InkUtilities Commands----------");
    ChatLib.chat("&9Use /moveinkdisplay to move the ink display (display needs to be open)");
    ChatLib.chat("&9Use /movescdisplay to move the sea creature display");
    ChatLib.chat("&9Use /movemoneydisplay to move the money display");
    ChatLib.chat("&9Use /inkGui to open a GUI of ink related stats");
    ChatLib.chat("&9Use /scGui to open a GUI of sea creature related stats");
    ChatLib.chat("&9Use /setInk (value) to set your overall ink collection");
    ChatLib.chat("&9Use /setSquid (value) to set your overall squid kills");
    ChatLib.chat("&9Use /setNightSquid (value) to set your overall night squid kills");
    ChatLib.chat("&9Use /setSC (value) to set your total sea creature kills");
    ChatLib.chat("&9Use /setEmp (value) to set your total sea emperor kills");
    ChatLib.chat("&9Use /setHydra (value) to set your total water hydra kills");
    ChatLib.chat("&9Use /setMoo (value) to set your total agarimoo kills");
    ChatLib.chat("&9Use /setCarrot (value) to set your total carrot king kills");
    ChatLib.chat("&9Note: all /set commands require /ct load to update")

}).setName("inkCommands").setAliases("inkHelp");


//========SET HISTORICAL VALUES========
//
//
//

register("command", (x) => {


    x = parseInt(x);

    ChatLib.chat("Set to " + x);

    data.INK.inkAmount = x;
    data.save();

}).setName("setInk");

register("command", (x) => {

    x = parseInt(x);

    ChatLib.chat("Set to " + x);

    data.INK.squidAmount = x;
    data.save();
    
}).setName("setSquid");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);

    data.INK.nightSquidCaught = x;
    data.save();
    
}).setName("setNightSquid");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.ttlSCC = x;
    data.save();
    
}).setName("setSC");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.emp = x;
    data.save();
    
}).setName("setEmp");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.hydra = x;
    data.save();
    
}).setName("setHydra");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.moo = x;
    data.save();
    
}).setName("setMoo");

register("command", (x) => {
    x = parseInt(x);

    ChatLib.chat("Set to " + x);
    data.SCC.carrot = x;
    data.save();
    
}).setName("setCarrot");


//========SET LOOTING========
//
//
//
register("command", (x) => {

    x = parseInt(x);

    if(x==4){
        data.INK.looting = 4;
        data.INK.squidInkNum = 8;
        data.INK.nightSquidInkNum = 36.8;
        data.SCC.mooDrop = 4.8;
        data.save();
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else if(x == 5) {
        data.INK.looting = 5;
        data.INK.squidInkNum =8.75;
        data.INK.nightSquidInkNum = 40;
        data.SCC.mooDrop = 5.25;
        data.save();
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else {
        ChatLib.chat("&bInvalid looting value of " + x + " entered. Please enter either looting 4 or 5.");
    }
}).setName("looting");
















































