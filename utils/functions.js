import {data} from "../data/utils.js"
import settings from "../data/settings"


export function updateDisplay(x, y, tag) {
    if (!movecounter.isOpen()) return;
    if (!data[tag]) {
        ChatLib.chat(`Tag ${tag} does not exist in data.`);
        return;
    }


    ChatLib.chat('X Value is: ' + x + ' and y value is: ' + y)
    data[tag].moneyX = x
    data[tag].moneyY = y
    data.save()

}




export function formatTimeElapsed(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    if (days > 0) {
      return `${days}d:${hours}h:${minutes}m:${remainingSeconds}s`;
    } else if (hours > 0) {
      return `${hours}h:${minutes}m:${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m:${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
}


export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function removeMinecraftColorCodes(inputString) {
    return inputString.replace(/§[0-9a-fklmnor]/ig, '');
}


export function safeConvertToNumber(str) {
    return Number(str);
}


