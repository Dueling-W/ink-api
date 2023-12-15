import "./inkTracking.js"
import "./sccTracker.js"
import "./apiCalls.js"
import {data} from "./utils.js"


//========STARTING AND MISC. COMMANDS========

//Ink Utilities help starting command
register("command", () => {
    ChatLib.chat("&f&l----------Ink Utilities----------&r");
    ChatLib.chat("&6Thank you for Downloading &r&f&nInkUtils&r&6!&r");
    ChatLib.chat("&6You can open view all ink and general purpose commands by using /inkCommands | /inkHelp&r");
    ChatLib.chat("&6You can open view all sea creature related commands by using /scCommands | /scHelp&r");
    ChatLib.chat("&6Please use a level 100 epic or legendary squid pet for accurate rates!");
    ChatLib.chat("&6Put any questions on the GitHub or message at #lowbudget on discord!");
    ChatLib.chat("&6That's all, happy inking!");

}).setName("inkUtils").setAliases("ink");


//All registered commands
register("command", () => {
    ChatLib.chat("&1&l------Ink Utils Command List------");
    ChatLib.chat("&b--Use /screenXY to get the dimensions of your screen (helpful for /moveDisplay)!--");
    ChatLib.chat("&b--Use /looting (4 or 5) to set your looting enchant!--");
    ChatLib.chat("&b--Use /inkGo to begin tracking squid, night squids, and ink gain (shows display)!--");
    ChatLib.chat("&b--Use /inkStop to stop tracking squids, night squids, and ink gain (hides display)!--");
    ChatLib.chat("&b--Use /moneyGo to begin tracking money per hour (shows display)!--");
    ChatLib.chat("&b--Use /moneyStop to stop tracking money per hour (hipes display)!--");
    ChatLib.chat("&b--Use /moveDisplayINK (x) (y) to move the ink stats display!--");
    ChatLib.chat("&b--Use /moveDisplayMoney (x) (y) to move the money per hour display!--");
    ChatLib.chat("&b--Use /inkTimer (stop or start) to stop or start ink timer, will also pause ink/hr calculations!--")
    ChatLib.chat("&b--Use /empTimer (stop or start) to stop or start emp timer!--")
    ChatLib.chat("&b--Use /colorInk (color) to set a color for the ink fishing display!--");
    ChatLib.chat("&b--Use /colorMoney (color) to set a color for the ink fishing display!--");

}).setName("inkCommands").setAliases("inkHelp");


//All registered commands
register("command", () => {
    ChatLib.chat("&1&l------Ink Utils Command List------");
    ChatLib.chat("&b--Use /sccGo to begin tracking sea creatures (shows display)!--");
    ChatLib.chat("&b--Use /sccStop to stop tracking sea creatures (hipes display)!--");
    ChatLib.chat("&b--Use /moveDisplaySCC (x) (y) to move the sea creature display!--");
    ChatLib.chat("&b--Use /empTimer (stop or start) to stop or start emp timer!--")
    ChatLib.chat("&b--Use /colorSCC (color) to set a color for the fishing display!--");
}).setName("scCommands").setAliases("scHelp");





//Register command to get width and height of screen
register("command", () => {
    var width = Renderer.screen.getWidth();
    var height = Renderer.screen.getHeight();

    ChatLib.chat("&bThe width of your screen is " + width + ", the height of your screen is " + height);

}).setName("screenXY");





//STUFF FOR RENDERING DISPLAY COLORS

let colorDict = {
    'dark_red': "&4",
    'red': "&c",
    'gold': "&6",
    'yellow': "&e",
    'dark_green': "&2",
    'green': "&a",
    'aqua': "&b",
    'dark_aqua': "&3",
    'dark_blue': "&1",
    'blue': "&1",
    'light_purple': "&d",
    'dark_purple': "&5",
    'white': "&f",
    'gray': "&7",
    'dark gray': "&8",
    'black': "&0"
};


//Register command to set color for ink
register("command", (color) => {

    color = color.toLowerCase();

    if(color in colorDict) {
        let color_code = colorDict[color];
        data.CONFIG.inkColor = color_code;
        data.save();
        ChatLib.chat("The color for the ink display has been set to: " + color);
    } else {
        ChatLib.chat("Invalid color entered in of: " + color + ", enter in one of the following colors:");
        let keysArray = Object.keys(colorDict);

        keysArray.forEach(key => {
            ChatLib.chat(key);
        });
    }

    
}).setName("colorInk");


//Register command to set color for ink
register("command", (color) => {

    color = color.toLowerCase();

    if(color in colorDict) {
        let color_code = colorDict[color];
        data.CONFIG.sccColor = color_code;
        data.save();
        ChatLib.chat("The color for the ink display has been set to: " + color);
    } else {
        ChatLib.chat("Invalid color entered in of: " + color + ", enter in one of the following colors:");
        let keysArray = Object.keys(colorDict);

        keysArray.forEach(key => {
            ChatLib.chat(key);
        });
    }

    
}).setName("colorSCC");



//Register command to set color for ink
register("command", (color) => {

    color = color.toLowerCase();

    if(color in colorDict) {
        let color_code = colorDict[color];
        data.CONFIG.moneyColor = color_code;
        data.save();
        ChatLib.chat("The color for the ink display has been set to: " + color);
    } else {
        ChatLib.chat("Invalid color entered in of: " + color + ", enter in one of the following colors:");
        let keysArray = Object.keys(colorDict);

        keysArray.forEach(key => {
            ChatLib.chat(key);
        });
    }

    
}).setName("colorMoney");
