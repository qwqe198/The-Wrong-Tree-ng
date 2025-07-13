let modInfo = {
	name: "劝退树ng+",
	id: "Such_A_Stupid_Game",
	author: "QwQe308和22222",
	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum(0), // Used for hard resets and new players

	offlineLimit: 99999999999,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.41",
	name: "",
}

let changelog = ``

let winText = `您通关了!在qq里催更!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = new ExpantaNum(1)
	var upgID = [11, 12, 13]
	for (i in upgID) {
		i = upgID[i]
		if (hasUpgrade("p", i)) gain = gain.mul(upgradeEffect("p", i))
	}
	if (inChallenge("p", 11) || inChallenge("p", 12) || inChallenge("p", 13)) {
		if (hasUpgrade("p", 12) && !(hasMilestone("l", 19))) gain = gain.div(upgradeEffect("p", 12).pow(2))
		else gain = gain.div(upgradeEffect("p", 12))
	}
	if (hasUpgrade("cq", 11)) gain = gain.mul(3)
	if (hasUpgrade("cq", 42)) gain = gain.mul(upgradeEffect("cq", 42))
	if (hasAchievement("rw", 21)) gain = gain.mul(2)
	if (hasUpgrade("cq", 13)) gain = gain.mul(upgradeEffect("cq", 13))
	if (hasUpgrade("i", 11)) gain = gain.mul(upgradeEffect("i", 11))
	if (hasUpgrade("cq", 14)) gain = gain.mul(upgradeEffect("cq", 14))
	if (hasUpgrade("a1", 11)) gain = gain.mul(upgradeEffect("a1", 11))
	if (hasUpgrade("a1", 12)) gain = gain.pow(upgradeEffect("a1", 12))
	gain = gain.mul(layers.esc.effect())
	gain = gain.mul(buyableEffect('m', 12))
	if (hasAchievement("rw", 56)) gain = gain.mul(1e15)
	if (hasMilestone("t", 1)) gain = gain.mul(buyableEffect("t", 11).add(1))
	if (hasMilestone("t", 10) && inChallenge("cq", 21)) gain = gain.mul(n(10).pow(buyableEffect("t", 11).pow(3.14)))
	if (hasMilestone("l", 13)) gain = gain.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18) ? layers.a.effect() : 1).pow(buyableEffect("a1", 13)))
	if (hasMilestone("lcb", 1)) gain = gain.mul(n(1e10).pow(player.points.add(10).log(10).root(2).floor().min(100)))
	if (hasUpgrade("esc", 11)) gain = gain.pow(1.01)
	if (hasUpgrade("cq", 24)) gain = gain.pow(1.01)
	if (hasAchievement("rw", 56)) gain = gain.pow(1.15)
	if (inChallenge("cq", 21)) gain = gain.root((3 ** (player.cq.challenges[21] + 1)))
	if (hasUpgrade("cq", 51)) gain = gain.pow(upgradeEffect("cq", 51))
	if (hasMilestone("l", 1)) gain = gain.pow(n(1.01).pow(player.l.points.min(50)))
	gain = gain.pow(layers.a.effect())
	if (inChallenge("m", 11)) gain = expPow(gain.mul(10), 0.125).div(10)
	if (inChallenge("l", 11)) gain = expPow(gain.mul(10), tmp.l.challenges[11].challengeEffect).div(10)
	if (inChallenge("cq", 13)) gain = expPow(gain.mul(10), n(0.99).pow((player.cq.challenges[13] + 1) * 3).mul(10000).floor().div(10000)).div(10)
	if (player.esc.points.gte(6)) gain = expPow(gain.mul(10), 0.8).div(10)
	if (gain.gte("1e15000")) gain = expPow(gain.mul(10), 0.8).mul("1e14000")
	//加强疫苗 
	if (inChallenge("t", 11)) gain = gain.add(10).log10().div(9)
	if (hasMilestone("esc", 12) && hasUpgrade("i", 11)) gain = gain.mul(upgradeEffect("i", 11).add(10).log10().pow(1.25))
	if (hasMilestone("t", 11)) gain = gain.mul(n(1.05).pow(buyableEffect("t", 11)))
	if (hasAchievement("rw", 55)) gain = gain.mul(12)
	if (hasChallenge("cq", 22)) gain = gain.mul(3 ** player.cq.challenges[22])
	if (hasUpgrade("cq", 64)) gain = gain.mul(upgradeEffect("cq", 64))
	if (hasAchievement("rw", 66)) gain = gain.mul(player.i.points.add(10).log10())
	if (player.csm.points.gte(1)) gain = gain.div(1e4)
	//上限
	if (gain.gte("1e50000")) gain = gain.min("1e50000")
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
	}
}

// Display extra things at the top of the page
var displayThings = [
	function () { return `残局 完成任务` },
	function () { if (player.esc.points.gte(6) || (hasUpgrade("cq", 61) && inChallenge("cq", 13))) return `42.不知道从哪里找的.点数获取^b ,b=${format(layers.a.effect(), 5)}` }
]


// Determines when the game "ends"
function isEndgame() {
	return isUnl(9999999999999999999999)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {

	return n(hasAchievement("rw", 11) ? 99999999999999 : 3600)

}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}