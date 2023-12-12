import "./inkTracking.js"


//========STARTING AND MISC. COMMANDS========

//Ink Utilities help starting command
register("command", () => {
    ChatLib.chat("&f&l----------Ink Utilities----------&r");
    ChatLib.chat("&6Thank you for Downloading &r&f&nInkUtils&r&6!&r");
    ChatLib.chat("&6You can open view all commands by using /inkCommands | /inkHelp&r");
    ChatLib.chat("&6Please use a level 100 epic or legendary squid pet for accurate rates!");
    ChatLib.chat("&6Put any questions on the GitHub or message at #lowbudget on discord!");
    ChatLib.chat("&6That's all, happy inking!");

}).setName("inkUtils").setAliases("ink");


//All registered commands
register("command", () => {
    ChatLib.chat("&1&l------Ink Utils Command List------");
    ChatLib.chat("&b--Use /inkGo to begin tracking squid, night squids, and ink gain (shows display)!--");
    ChatLib.chat("&b--Use /inkStop to stop tracking squids, night squids, and ink gain (hides display)!--");
    ChatLib.chat("&b--Use /moveDisplay (x) (y) to move the display!--");
    ChatLib.chat("&b--Use /screenXY to get the dimensions of your screen (helpful for /moveDisplay)!--");
    ChatLib.chat("&b--Use /looting (4 or 5) to set your looting enchant!--");
    ChatLib.chat("&b--Use /track (stop or start) to stop or start timer, will also pause ink/hr calculations!--")

}).setName("inkCommands").setAliases("inkHelp");



//Register command to get width and height of screen
register("command", () => {
    var width = Renderer.screen.getWidth();
    var height = Renderer.screen.getHeight();

    ChatLib.chat("&bThe width of your screen is " + width + ", the height of your screen is " + height);

}).setName("screenXY");




































