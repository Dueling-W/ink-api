/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import "./inkTracking.js"
import "./sccTracker.js"
import "./apiCalls.js"
import "./bestiary.js"
import "./spookyTracking.js"
import {data} from "./utils.js"
import settings from "./settings"



//========FIRST START MESSAGES========

register("command", () => settings.openGUI()).setName("inkUtils").setAliases("Ink");

if (settings.firstRun) {
    settings.firstRun = false;
    ChatLib.chat("&b&l----------InkUtilities----------")
    ChatLib.chat("&aThank you for Downloading &f&nInkUtilities!");
    ChatLib.chat("&aYou can open the settings using /ink | /inkUtils");
    ChatLib.chat("&aView all commands with /inkCommands | /inkHelp");
    ChatLib.chat("&aPlease use a level 100 epic or legendary squid for accurate rates!");
    ChatLib.chat("&aSet your looting enchant using /looting (4) or (5)!");
}


//========REGISTERED COMMAND LIST========

register("command", () => {
    ChatLib.chat("&b&l----------InkUtilities Commands----------");
    ChatLib.chat("&aUse /moveinkdisplay to move the ink display (display needs to be open)");
    ChatLib.chat("&aUse /movescdisplay to move the sea creature display");
    ChatLib.chat("&aUse /movemoneydisplay to move the money display");
    ChatLib.chat("&aUse /movebestdisplay to move the bestiary display");
    ChatLib.chat("&aUse /movespookydisplay to move the spooky display");
    ChatLib.chat("&aUse /movegoaldisplay to move the ink goal display");
    ChatLib.chat("&aUse /inkGui to open a temporary GUI of ink related stats");
    ChatLib.chat("&aUse /scGui to open a temporary GUI of sea creature related stats");
    ChatLib.chat("&aUse /resetTimer to reset session timer");
    ChatLib.chat("&aUse /set(condition) (value) to set your lifestime fishing stats");
    ChatLib.chat("&aValid conditions are: sc, emp, hydra, moo, carrot, ink, squid, nightSquid, rabbit, sheep, worm, poisonWorm, miner, scare, nightmare, werewolf, phantom, grim");

}).setName("inkCommands").setAliases("inkHelp");










//========AUTO-PARTY FEATURE========
register("chat", (msg) => {

    if(!settings.autoParty) return;

    msg = msg.toLowerCase();
    pwrd = settings.partyMessage;

    const regex = /\] ([^:]+):/;
    const match = msg.match(regex);

    if(msg.includes(pwrd)) {
        const ign = match[1].trim();
        ChatLib.say(`/party ${ign}`)
    }



}).setCriteria("From ${message}");




//========SET LOOTING========
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
        data.INK.nightSquidInkNum = 40.0572;
        data.SCC.mooDrop = 5.25;
        data.save();
        ChatLib.chat("&bYour looting enchant has been set to " + x + "!");
    } else {
        ChatLib.chat("&bInvalid looting value of " + x + " entered. Please enter either looting 4 or 5.");
    }
}).setName("looting");
















































