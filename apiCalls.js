//import localSCC from "./sccTracker.js"
import { data } from "./utils"

var display = new Display();
display.setBackground("none");
display.setRenderLoc(data.SCC.moneyX, data.SCC.moneyY);


const url = "https://api.hypixel.net/skyblock/bazaar";

const result = FileLib.getUrlContent(url);

const jsonObject = JSON.parse(result);

var totalMoney = 0;

var value = -1;

const moneyColor = data.CONFIG.moneyColor;
const moneyShadow = data.CONFIG.moneyShadow;


//========START AND STOP INK TRACKING========
//
//
//

register("command", startTracking).setName("moneyGo");
register("command", stopTracking).setName("moneyStop");

function startTracking() {
    ChatLib.chat("Tracking Money per Hour!");
    value = 0;
    display.show();
}

function stopTracking() {
    ChatLib.chat("Money per Hour tracking stopped.");
    display.hide();
    value = -1;
}




register("step", () => {

    if(!value==0) return;

    const inkPrice = jsonObject.products.INK_SACK.quick_status.buyPrice;
    const tonguePrice = jsonObject.products.AGARIMOO_TONGUE.quick_status.buyPrice;



    var inkMoney = (inkPrice) * (data.INK.inkPerHour);
    var tongueMoney = (tonguePrice) * (data.SCC.tongue);

    var money = inkMoney + tongueMoney;

    totalMoney = Math.round(money, 0);

}).setFps(1);



register("command", (x,y) => {
    x = parseInt(x);
    y = parseInt(y);

    updateDisplay(x, y);
    ChatLib.chat("&aDisplay moved to: " + x + ", " + y);

}).setName("moveDisplayMoney");

function updateDisplay(x, y) {
    data.SCC.moneyX = x;
    data.SCC.moneyY = y;
    data.save();
    display.setRenderLoc(x, y);
};



register("tick", () => {

    if(!value==0) return;

    var money = new DisplayLine(moneyColor + "$" + totalMoney + " Per Hour");

    money.setShadow(moneyShadow);

    display.setLine(0, money);

});


































