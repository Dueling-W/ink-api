import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant
} from "Vigilance";

@Vigilant("InkUtilities", "InkUtilities", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Information", "Inking", "Sea Creatures", "Money Per Hour", "Bestiary"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
    constructor() {
        this.initialize(this)
         
        this.setCategoryDescription("Information", 
            `
            &b&nInkUtilities ${JSON.parse(FileLib.read("InkUtilities", "metadata.json")).version}
            Made By DuelingCharges
            `
        )
    }



//========INFORMATION========
//
//
//
    @SwitchProperty({
        name: "firstRun",
        description: "state of the first run",
        category: "Information",
        hidden: true
    })
    firstRun = true;

    @ButtonProperty({
        name: "Discord",
        description: "Join the Shrimple Discord to meet great fishers, ask questions about the mod, and more!",
        category: "Information",
        placeholder: "Fish :D"
    })
    MyDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/XHfzGBQM"));
    }


//========INKING========
//
//
//

    @SwitchProperty({
        name: "Track Ink Stats",
        description: "Start tracking ink stats!",
        category: "Inking"
    })
    trackInk = false;

    @SwitchProperty({
        name: "Ink Display",
        description: "Turn on the ink display!",
        category: "Inking"
    })
    inkDisplay = false;

    @SwitchProperty({
        name: "Ink Timer",
        description: "Start tracking your ink per hour!",
        category: "Inking"
    })
    inkTimer = false;

    @ColorProperty({
        name: "Ink Display Color",
        description: "Pick a color for the ink display!",
        category: "Inking"
    })
    inkColor = Color.BLUE;


//========SEA CREATURES========
//
//
//

    @SwitchProperty({
        name: "Track Sea Creatures",
        description: "Start tracking sea creatures!",
        category: "Sea Creatures"
    })
    trackSC = false;

    @SwitchProperty({
        name: "Sea Creature Display",
        description: "Turn on the sea creature display!",
        category: "Sea Creatures"
    })
    creatureDisplay = false;

    @SwitchProperty({
        name: "Emp Timer",
        description: "Start tracking time since last sea emp!",
        category: "Sea Creatures"
    })
    empTimer = false;

    @ColorProperty({
        name: "Sea Creature Color",
        description: "Pick a color for the sea creature display!",
        category: "Sea Creatures"
    })
    scColor = Color.BLUE;


//========MONEY========
//
//
//

    @SwitchProperty({
        name: "Track Money Per Hour",
        description: "Start tracking money per hour (ink only)!",
        category: "Money Per Hour"
    })
    moneyDisplay = false;

    @ColorProperty({
        name: "Money Display Color",
        description: "Pick a color for the money display!",
        category: "Money Per Hour"
    })
    moneyColor = Color.BLUE;





//========Bestiary========
//
//
//

    @SwitchProperty({
        name: "General Bestiary Toggle",
        description: "Start tracking all water bestiaries!",
        category: "Bestiary"
    })
    bestTrack = false;

    @SwitchProperty({
        name: "Oasis Display",
        description: "Turn on the oasis fishing display!",
        category: "Bestiary"
    })
    oasisDisplay = false;

    @ColorProperty({
        name: "Oasis Display Color",
        description: "Pick a color for the oasis display!",
        category: "Bestiary"
    })
    oasisColor = Color.BLUE;

    @SwitchProperty({
        name: "Crystal Hollows Display",
        description: "Turn on the crystal hollows display!",
        category: "Bestiary"
    })
    hollowsDisplay = false;

    @ColorProperty({
        name: "Crystal Hollows Display Color",
        description: "Pick a color for the crystal hollows display!",
        category: "Bestiary"
    })
    hollowsColor = Color.BLUE;


}
export default new Settings
