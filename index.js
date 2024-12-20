/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import "./features/inkTracking.js"
import "./features/sccTracker.js"
import "./features/apiCalls.js"
import "./features/bestiary.js"
import "./features/spookyTracking.js"
import "./features/inkAchievements.js"
import "./utils/functions.js"
import {data} from "./data/utils.js"
import settings from "./data/settings"
import "./data/constants.js"



//========FIRST START MESSAGES========

register("command", () => settings.openGUI()).setName("inkUtils").setAliases("Ink");

if (settings.firstRun) {
    settings.firstRun = false;
    ChatLib.chat("&b&l----------InkUtilities----------")
    ChatLib.chat("&aThank you for Downloading &f&nInkUtilities!");
    ChatLib.chat("&aYou can open the settings using /ink | /inkUtils");
    ChatLib.chat("&aView all commands with /inkCommands | /inkHelp");
    ChatLib.chat("&aMake sure to have the sacks message turned on!");
    ChatLib.chat("&aView FAQ with /inkFAQ");

}


//========REGISTERED COMMAND LIST========

register("command", () => {
    ChatLib.chat("&b&l----------InkUtilities Commands----------");
    ChatLib.chat("&aUse /movebestdisplay to move the bestiary display");
    ChatLib.chat("&aUse /movespookydisplay to move the spooky display\n");
    ChatLib.chat("&aUse /inkGui to open a temporary GUI of ink related stats");
    ChatLib.chat("&aUse /scGui to open a temporary GUI of sea creature related stats\ns");
    ChatLib.chat("&aUse /resetTimer to reset session timer");
    ChatLib.chat("&aUse /set(condition) (value) to set your lifestime fishing stats");
    ChatLib.chat("&aValid conditions are: sc, emp, hydra, moo, carrot, rabbit, sheep, worm, poisonWorm, miner, scare, nightmare, werewolf, phantom, grim");

}).setName("inkCommands").setAliases("inkHelp");



register("command", () => {

    ChatLib.chat("&b&l----------InkUtilities FAQ----------");
    ChatLib.chat("&aIs the ink tracking accurate? - Yes, it uses the sack message, make sure to have it turned on.\n")
    ChatLib.chat("&aHow to set my historical values? - Set ink-related ones through settings in the Ink section, set others using /setcommand (run /inkHelp for details).\n")
    ChatLib.chat("&aIs Squid and Night Squid Bestiary? - Yes, it estimates your accurate bestiary through LOOT SHARE message, althought it could be slightly off.")
    ChatLib.chat("&aThe rest of the mobs just count your catches, like Emps, Hydras, etc.\n")
    ChatLib.chat("&aIs Squid and Night Squid Bestiary? - Yes, it estimates your accurate bestiary through LOOT SHARE message, althought it could be slightly off.\n")
    ChatLib.chat("&aDo I get achievements when I update my ink, squid, and night squid data? - Yes, but you will only get a chat message for the highest one, although all will display as complete in the GUI.\n")
    ChatLib.chat("&aI set my historical values but didn't get achievements! - This is intended, go fish for a tiny bit so everything updates.")

}).setName("inkFAQ")






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

















































