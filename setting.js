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
    @NumberProperty,
    @Vigilant
} from "Vigilance";

@Vigilant("InkUtilities", "InkUtilities", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Information", "Inking", "Sea Creatures", "Bestiary", "Fishing Events", "Misc"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {


    constructor() {
        this.initialize(this)
        this.setCategoryDescription("Inking", "All inking related features!")
        this.setCategoryDescription("Sea Creatures", "All sea-creature related features!")
        this.setCategoryDescription("Bestiary", "Fishing bestiary features - oasis, etc.!")
        this.setCategoryDescription("Fishing Events", "Fishing event features (only spooky for now)!")
        this.setCategoryDescription("Misc", "Random features!")




        this.addDependency("Ink Display", "Track Ink Stats");
        this.addDependency("Ink Display Color", "Ink Display");
        this.addDependency("AFK Timer", "Ink Timer");
        this.addDependency("Money Display Color", "Track Money Per Hour");
        this.addDependency("Ink Goal Display Color", "Ink Goal Display");
        this.addDependency("Ink Goal Number", "Ink Goal Display");



        this.addDependency("Emp Timer", "Track Sea Creatures");
        this.addDependency("Lucky Clover Alert", "Track Sea Creatures");
        this.addDependency("Party Emperor Message", "Track Sea Creatures");
        this.addDependency("Sea Creature Display", "Track Sea Creatures");
        this.addDependency("Sea Creature Color", "Sea Creature Display");

        this.addDependency("Oasis Display", "General Bestiary Toggle");
        this.addDependency("Oasis Display Color", "Oasis Display");
        this.addDependency("Crystal Hollows Display", "General Bestiary Toggle");
        this.addDependency("Crystal Hollows Display Color", "Crystal Hollows Display");

        this.addDependency("Double Hook Message", "Double Hook Toggle");
        this.addDependency("Auto Party Message", "Auto Party Toggle");

        this.addDependency("Spooky Display", "Spooky Tracking");
        this.addDependency("Spooky Display Color", "Spooky Display");
        this.addDependency("Grim and Phantom Announce", "Spooky Tracking");
        this.addDependency("Deep Sea Orb Alert", "Spooky Tracking");
        this.addDependency("Deep Sea Orb Chat", "Spooky Tracking");

         
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
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/shrimple"));
    }


//========INKING========
//
//
//

    @SwitchProperty({
        name: "Track Ink Stats",
        description: "Start tracking ink stats!",
        category: "Inking",
        subcategory: "General Inking"
    })
    trackInk = false;

    @SwitchProperty({
        name: "Ink Display",
        description: "Ink display manual on/off",
        category: "Inking",
        subcategory: "General Inking"
    })
    inkDisplay = false;

    @ColorProperty({
        name: "Ink Display Color",
        description: "Pick a color for the ink display!",
        category: "Inking",
        subcategory: "General Inking"

    })
    inkColor = Color.BLUE;

    @SwitchProperty({
        name: "Ink Timer",
        description: "Start tracking your ink per hour!",
        category: "Inking",
        subcategory: "Misc. Features"
    })
    inkTimer = false;

    @SliderProperty({
        name: "AFK Timer",
        description: "Time for ink timer to pause (set to zero to never pause)",
        category: "Inking",
        subcategory: "Misc. Features",
        min: 0,
        max: 5,
        increment: 1
    })
    pauseValue = 1;

    @SwitchProperty({
        name: "Rain Alert",
        description: "Sends an on-screen alert when rain is gone",
        category: "Inking",
        subcategory: "Misc. Features"
    })
    rainCheck = false;

    @SwitchProperty({
        name: "Track Money Per Hour",
        description: "Start tracking money per hour (ink only)!",
        category: "Inking",
        subcategory: "Money Tracking"

    })
    moneyDisplay = false;

    @ColorProperty({
        name: "Money Display Color",
        description: "Pick a color for the money display!",
        category: "Inking",
        subcategory: "Money Tracking"

    })
    moneyColor = Color.BLUE;


    @SwitchProperty({
        name: "Ink Goal Display",
        description: "Ink goal display toggle",
        category: "Inking",
        subcategory: "Ink Goal"

    })
    inkGoal = false;

    @ColorProperty({
        name: "Ink Goal Display Color",
        description: "Pick a color for the ink goal display!",
        category: "Inking",
        subcategory: "Ink Goal"

    })
    inkGoalColor = Color.BLUE;

    @TextProperty({
        name: "Ink Goal Number",
        description: "Set a goal collection amount for ink and set your current ink with /setink <collection>",
        category: "Inking",
        subcategory: "Ink Goal"
    })
    inkGoalNum = "0";


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
        name: "Emp Timer",
        description: "Start tracking time since last sea emp!",
        category: "Sea Creatures"
    })
    empTimer = false;

    @SwitchProperty({
        name: "Party Emperor Message",
        description: "Sends an emperor party chat message",
        category: "Sea Creatures"
    })
    empParty = false;


    @SwitchProperty({
        name: "Lucky Clover Alert",
        description: "Pop up alert and party chat alert when dropping a Lucky Clover Core",
        category: "Sea Creatures"
    })
    luckyDrop = false;

    @SwitchProperty({
        name: "Sea Creature Display",
        description: "Turn on the sea creature display!",
        category: "Sea Creatures"
    })
    creatureDisplay = false;

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


//MISC Features
    @SwitchProperty({
        name: "Double Hook Toggle",
        description: "Turn double hook message on/off",
        category: "Misc"
    })
    dhToggle = false;

    @TextProperty({
        name: "Double Hook Message",
        description: "Double Hook party chat message",
        category: "Misc"
    })
    dhMsg = 'DOUBLE HOOK!';

    @SwitchProperty({
        name: "Auto Party Toggle",
        description: "Turn auto party feature on/off",
        category: "Misc"
    })
    autoParty = false;

    @TextProperty({
        name: "Auto Party Message",
        description: "Set a message that automatically parties someone when received",
        category: "Misc"
    })
    partyMessage = 'i love inking!';



//FISHING EVENTS
    @SwitchProperty({
        name: "Spooky Tracking",
        description: "Start tracking spooky mobs",
        category: "Fishing Events",
        subcategory: "Spooky Fishing"
    })
    spookyToggle = false;

    @SwitchProperty({
        name: "Spooky Display",
        description: "Turn on the spooky display",
        category: "Fishing Events",
        subcategory: "Spooky Fishing"
    })
    spookyDisplay = false;

    @ColorProperty({
        name: "Spooky Display Color",
        description: "Change Display Color",
        category: "Fishing Events",
        subcategory: "Spooky Fishing"
    })
    spookyColor = Color.BLUE;

   
    @SwitchProperty({
        name: "Grim and Phantom Announce",
        description: "Announce grims and phantoms in party chat",
        category: "Fishing Events",
        subcategory: "Spooky Fishing"
    })
    spookyRares = false;

    @SwitchProperty({
        name: "Deep Sea Orb Alert",
        description: "On screen deep sea orb alert",
        category: "Fishing Events",
        subcategory: "Spooky Fishing"
    })
    orbAlert = false;

    @SwitchProperty({
        name: "Deep Sea Orb Chat",
        description: "Announce deep sea orbs in party chat",
        category: "Fishing Events",
        subcategory: "Spooky Fishing"
    })
    orbPartyAlert = false;



}
export default new Settings
