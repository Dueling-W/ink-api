import { data } from "./utils"
import settings from "./settings"

//call api
const url = "https://api.hypixel.net/v2/skyblock/bazaar";
const result = FileLib.getUrlContent(url);
const jsonObject = JSON.parse(result);

var totalMoney = 0;
var movecounter = new Gui();
var gui = new Gui();


//========MOVE DISPLAY========
//
//
//

register("dragged", (dx, dy, x, y) => {
    if (!movecounter.isOpen()) return
    data.SCC.moneyX = x
    data.SCC.moneyY = y
    data.save()
});

register("command", () => {
    movecounter.open()
}).setName("movemoneydisplay");


//========RENDER DISPLAY========
//
//
//


register("step", () => {

    if(!settings.moneyDisplay) return;

    const inkPrice = jsonObject.products.INK_SACK.quick_status.buyPrice;
    


    var inkMoney = (inkPrice) * (data.INK.inkPerHour);
    var money = inkMoney

    totalMoney = Math.round(money, 0);

}).setDelay(5);


register("renderOverlay", () => {

    if(settings.moneyDisplay) {

        const color = settings.moneyColor;
        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());

        let moneyStr = numberWithCommas(totalMoney)

        var money = "$" + moneyStr + " Per Hour";


        Renderer.drawString(money, data.SCC.moneyX, data.SCC.moneyY, true);
    }

    if(movecounter.isOpen() && settings.moneyDisplay) {
        const color = settings.moneyColor;

        Renderer.drawStringWithShadow(`x: ${Math.round(data.SCC.moneyX)}, y: ${Math.round(data.SCC.moneyY)}`, parseInt(data.SCC.moneyX) - 65, parseInt(data.SCC.moneyY) - 12)

        Renderer.colorize(color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha());
        var money = "$" + totalMoney + " Per Hour";
        Renderer.drawString(money, data.SCC.moneyX, data.SCC.moneyY, true);
    }

});


function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }































