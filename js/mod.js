let modInfo = {
	name: "劝退树ng+",
	id: "Such_A_Stupid_Game",
	author: "QwQe308和22222",
	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "",
}

let changelog = `<h1>更新记录:</h1><br>
 <h3>v0.3</h3><br>
		- 添加第四劝退点的内容.<br><br>
    <h3>v0.2</h3><br>
		- 添加第三劝退点的内容.<br><br>
	<h3>v0.1</h3><br>
		- 添加0~2劝退点的内容.`

let winText = `您通关了!在qq里催更!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = new ExpantaNum(1)
	var upgID = [11,12,13]
	for(i in upgID){
		i = upgID[i]
		if(hasUpgrade("p",i)) gain = gain.mul(upgradeEffect("p",i))
	}
	if(inChallenge("p",11) || inChallenge("p",12) || inChallenge("p",13)){
		if(hasUpgrade("p",12)) gain = gain.div(upgradeEffect("p",12).pow(2))
		else gain = gain.div(upgradeEffect("p",12))
	}
	gain = gain.mul(layers.esc.effect())
	if(hasUpgrade("esc",11)) gain = gain.pow(1.01)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return `所有在本游戏中显示的劝退方法都不是很强,以保证这玩意能玩,但不要以为这些坑不怎么劝退.残局:5劝退点`},
]

// Determines when the game "ends"
function isEndgame() {
	return isUnl(5)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}