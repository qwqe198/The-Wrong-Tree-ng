// Set your version in num and name
var VERSION = {
	num: ".052.7",
	name: /*"Advil's Auspicious Acension"*/ "",
}

var forceEndgame = false
function isEndgame() {
	if (forceEndgame) return true
	return isEndgameRaw()
}

function isEndgameRaw(){
	return player.G.points.gte(70)
}

var CHANELOG_VERSION = "v0.052"


var CHANGELOGS = [
	`<br><h3 style='color: #CC0000'>v0.052.3</h3><br>
		- Added 16 rows of achievements.<br>`,
	`<br><h3 style='color: #CC0000'>v0.052.1</h3><br>
		- Balanced until Grade 100.<br>
		- Small bugfix with each Grades.<br>`,
	`<br><h3 style='color: #CC0000'>v0.052</h3><br>
		- Balanced until Grade 70.<br>
		- Various changes and additions, unenumerated.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.051</h3><br>
		- Balanced until 3728 Tiers.<br>
		- Various changes and additions, unenumerated.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.050.1</h3><br>
		- Balanced until 3048 Tiers.<br>
		- Bugfix with Grades boosting point gain.<br>`,
	`<br><h3 style='color: #CC0000'>v0.050</h3><br>
		- Balanced until 2848 Tiers.<br>
		- Various changes and additions, unenumerated.<br>
		- A new prestige layer!<br>`,
	`<br><h3 style='color: #CC0000'>v0.049</h3><br>
		- Balanced until 2187 Tiers.<br>
		- Various changes and additions, unenumerated.<br>
		- Next patch will contain a prestige layer!<br>`,
	`<br><h3 style='color: #CC0000'>v0.048</h3><br>
		- Balanced until 1e91313 雀es.<br>
		- Various changes and additions, unenumerated.<br>
		- Serious rebalancing of late 雀es.<br>
		- Various softlocks were fixed.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.047</h3><br>
		- Balanced until 1e50862 雀es.<br>
		- Added four 雀 upgrades.<br>
		- Added a 雀 challenge.<br>
		- Added three 雀 milestones.<br>
		- Added a Tier milestone.<br>
		- Added six Tier buyables.<br>
		- Added two Tier upgrades.<br>
		- Added two Duck upgrades.<br>
		- Added two Eagle upgrades.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.046</h3><br>
		- Balanced until 1e3441 雀es.<br>
		- Added a new layer, 雀es!<br>
		- Added three 雀 buyables.<br>
		- Added three 雀 challenges.<br>
		- Added eleven 雀 milestones.<br>
		- Added two Tier milestones.<br>
		- Added three 雀 upgrades.<br>
		- Added five Eagle upgrades.<br>
		- Added two Eagle milestones.<br>
		- Added two Emerald milestones.<br>
		- Added three Duck upgrades.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.045</h3><br>
		- Balanced until 145 Tiers.<br>
		- Added thirteen Eagle milestones.<br>
		- Added six Tier upgrades.<br>
		- Added seven Tier milestones.<br>
		- Added four Emerald milestones.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.044</h3><br>
		- Balanced until 16 Tiers.<br>
		- Added two new layers (Emerald + Tiers).<br>
		- Added five Tier milestones.<br>
		- Added two Emerald milestones.<br>
		- Added three Emerald buyables.<br>
		- Added three Emerald upgrades.<br>
		- Added seventeen Eagle milestones.<br>
		- Added an Eagle buyable.<br>
		- Added two custom saves.<br>`,
	`<br><h3 style='color: #CC0000'>v0.043</h3><br>
		- Balanced until 1e5403 Eagles.<br>
		- Added nine Eagle milestones.<br>`,
	`<br><h3 style='color: #CC0000'>v0.042</h3><br>
		- Balanced until 1e2258 Eagles.<br>
		- Added twenty Eagle milestones.<br>
		- Added two custom saves.<br>`,
	`<br><h3 style='color: #CC0000'>v0.041</h3><br>
		- Balanced until 1e428 Eagles.<br>
		- Added two Duck buyables.<br>
		- Added a Eagle milestone.<br>`,
	`<br><h3 style='color: #CC0000'>v0.040</h3><br>
		- Balanced until 1e283 Eagles.<br>
		- Added four Duck upgrades.<br>
		- Added a Duck milestone.<br>
		- Added a Duck buyable.<br>
		- Added two Eagle buyables.<br>
		- Added twenty Eagle milestones.<br>
		- Added three Eagle upgrades.<br>
		- Added two custom saves.<br>`,
	`<br><h3 style='color: #CC0000'>v0.039</h3><br>
		- Balanced until 8e30 Eagles.<br>
		- Added three Capybara upgrades.<br>
		- Added five Duck upgrades.<br>
		- Added three Duck milestones.<br>
		- Added a Duck buyable.<br>
		- Added three Eagle milestones.<br>
		- Added two Eagle upgrades.<br>`,
	`<br><h3 style='color: #CC0000'>v0.038</h3><br>
		- Balanced until 1e11 Eagles.<br>
		- Added two Duck milestones.<br>
		- Added a Duck upgrade.<br>
		- Added seven Eagle milestones.<br>
		- Added four Eagle upgrades.<br>`,
	`<br><h3 style='color: #CC0000'>v0.037</h3><br>
		- Balanced until 2 Eagles.<br>
		- Added five Duck milestones.<br>
		- Added four Capybara upgrades.<br>
		- Added a Eagle milestone.
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.036</h3><br>
		- Balanced until 1e15000 Ducks.<br>
		- Added five Duck milestones.<br>
		- Added four Capybara upgrades.<br>
		- Added two custom saves.<br>`,
	`<br><h3 style='color: #CC0000'>v0.035</h3><br>
		- Balanced until 1e12552 Ducks.<br>
		- Added two Duck milestone and buyables.<br>
		- Added a Capybara upgrade.<br>`,
	`<br><h3 style='color: #CC0000'>v0.034</h3><br>
		- Balanced until 1e831 Ducks.<br>
		- Added a Duck milestone and buyable.<br>`,
	`<br><h3 style='color: #CC0000'>v0.033.2</h3><br>
		- Implemented the changelog display feature from Tree of Life.<br>`,
	`<br><h3 style='color: #CC0000'>v0.033.1</h3><br>
		- Implemented the save bank display feature from Tree of Life.<br>`,
	`<br><h3 style='color: #CC0000'>v0.033</h3><br>
		- Balanced until 1e712 Ducks.<br>
		- Added a Duck upgrade.<br>`,
	`<br><h3 style='color: #CC0000'>v0.032</h3><br>
		- Added a Capybara upgrade.<br>
		- Added a Duck milestone.<br>`,
	`<br><h3 style='color: #CC0000'>v0.031</h3><br>
		- Balanced until 1e192 Ducks.<br>
		- Added three Beaver upgrades and a Capybara upgrade.<br>
		- Added two Duck upgrades and three Duck milestones.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.030</h3><br>
		- Added a Beaver upgrade and a Capybara upgrade.<br>`,
	`<br><h3 style='color: #CC0000'>v0.029</h3><br>
		- Balanced until 3e24 Ducks.<br>
		- Added a Beaver upgrade, two Capybara upgrades, and four Duck upgrades.<br>`,
	`<br><h3 style='color: #CC0000'>v0.028</h3><br>
		- Balanced until 3000 Ducks.<br>
		- Added a new layer, Ducks!<br>
		- Added seven Duck milestones.<br>`,
	`<br><h3 style='color: #CC0000'>v0.027</h3><br>
		- Balanced until 1e15,020 Capybaras.<br>
		- Added four Capybara milestones.<br>`,
	`<br><h3 style='color: #CC0000'>v0.026</h3><br>
		- Balanced until 1e11,116 Capybaras.<br>
		- Added two Beaver upgrades.<br>
		- Added ten Capybara milestones.<br>
		- Added two Capybara challenges.<br>`,
	`<br><h3 style='color: #CC0000'>v0.025</h3><br>
		- Balanced until 1e6067 Capybaras.<br>
		- Added a Alligator and three Beaver upgrades.<br>
		- Added two Capybara upgrades and four milestones.<br>`,
	`<br><h3 style='color: #CC0000'>v0.024</h3><br>
	 	- Added four Alligator and Beaver upgrades.<br>
		- Added a Capybara upgrade and five milestones.<br>`,
	`<br><h3 style='color: #CC0000'>v0.023</h3><br>
		- Balanced until 1e1102 Capybaras.<br>
		- Added a Beaver and Capybara upgrade.<br>
		- Added a Capybara milestone.<br>`,
	`<br><h3 style='color: #CC0000'>v0.022</h3><br>
		- Balanced until 1e38 Capybaras.<br>
		- Added three Capybara milestones.<br>
		- Added five Capybara upgrades.<br>
		- Addded two Capybara buyables.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.021</h3><br>
		- Balanced until 3e5 Capybaras.<br>
		- Added a new layer, Capybaras!<br>
		- Added four Capybara milestones.<br>
		- Added a Capybara upgrade.<br>`,
	`<br><h3 style='color: #CC0000'>v0.020</h3><br>
		- Balanced until 1e1971 Beavers.<br>
		- Added a Beaver milestone and a Beaver buyable.<br>
		- Added two rows of achievements.<br>`,
	`<br><h3 style='color: #CC0000'>v0.019</h3><br>
		- Balanced until 1e1371 Beavers.<br>
		- Added two Beaver milestones and a Beaver buyable.<br>`,
	`<br><h3 style='color: #CC0000'>v0.018</h3><br>
		- Balanced until 1e1107 Beavers.<br>
		- Added two Alligator upgrades.<br>`,
	`<br><h3 style='color: #CC0000'>v0.017</h3><br>
		- Balanced until 1e629 Beavers.<br>
		- Added two Alligator upgrades and a Beaver buyable.<br>
		- Various bugfixes.<br>`,
	`<br><h3 style='color: #CC0000'>v0.016</h3><br>
		- Balanced until 1e256 Beavers.<br>
		- Added a Beaver milestone and buyable.<br>`,
	`<br><h3 style='color: #CC0000'>v0.015</h3><br>
		- Balanced until 1e174 Beavers.<br>
		- Added a Beaver upgrade, milestone, and buyable.<br>`,
	`<br><h3 style='color: #CC0000'>v0.014</h3><br>
		- Balanced until 1e83 Beavers.<br>
		- Added a Beaver upgrade and two Beaver miletones.<br>`,
	`<br><h3 style='color: #CC0000'>v0.013</h3><br>
		- Balanced until 1e50 Beavers.<br>
		- Added two Beaver upgrades.<br>`,
	`<br><h3 style='color: #CC0000'>v0.012</h3><br>
		- Balanced until 1e24 Beavers.<br>
		- Added a Alligator upgrade and two Beaver upgrades.<br>
		- Added a Beaver buyable and milestone.<br>`,
	`<br><h3 style='color: #CC0000'>v0.011</h3><br>
		- Balanced until 1e13 Beavers.<br>
		- Added two Beaver buyables and a Alligator upgrade.<br>
		- Added a Beaver milestone.<br>`,
	`<br><h3 style='color: #CC0000'>v0.010</h3><br>
		- Balanced until 2e8 Beavers.<br>
		- Added an Alligator and a Beaver upgrade.<br>`,
	`<br><h3 style='color: #CC0000'>v0.009</h3><br>
		- Balanced until 1e941 Alligators.<br>
		- Added an Alligator and a Beaver upgrade.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.008</h3><br>
		- Balanced until 1e819 Alligators.<br>
		- Added a Alligator and a Beaver upgrade.<br>
		- Various code clean up, particularly around generalized buyables.<br>`,
	`<br><h3 style='color: #CC0000'>v0.007.1</h3><br>
		- Added five rows of achievements.<br>
		- Made early Alligator upgrades unlock with the previous.<br>`,
	`<br><h3 style='color: #CC0000'>v0.007</h3><br>
		- Added two Beaver milestones.<br>
		- Added two Beaver upgrades.<br>
		- Balanced until 20 Beaver resets.<br>`,
	`<br><h3 style='color: #CC0000'>v0.006</h3><br>
		- Added an Alligator buyable.<br>
		- Added an Alligator upgrade.<br>
		- Added Beaver, a new layer!<br>
		- Added two Beaver milestones.<br>
		- Added hotkeys for moving to and resetting A/B.<br>
		- Added a custom save.<br>
		- Various code cleanup and bugfixes.<br>
		- Added an Infobox to Alligator upgrades, <i>read it</i>.<br>
		- Balanced until 3 Beaver resets.<br>`,
	`<br><h3 style='color: #CC0000'>v0.005</h3><br>
		- Added an Alligator milestone and buyable.<br>
		- Balanced until 1e1850 Points.<br>`,
	`<br><h3 style='color: #CC0000'>v0.004</h3><br>
		- Added an Alligator upgrade, milestone, and buyable.<br>
		- Balanced until 1e1160 Points (squared!).<br>
		- Made new achievement rows work properly.<br>
		- Added a custom save.<br>`,
	`<br><h3 style='color: #CC0000'>v0.003</h3><br>
		- Balanced until 1e580 Points.<br>
		- Added three Alligator upgrades, two Alligator milestones, and three Alligator buyables.<br>`,
	`<br><h3 style='color: #CC0000'>v0.002</h3><br>
		- Balanced until 2e16 Alligators.<br>
		- Added two Alligator upgrades and an Alligator buyable.<br>
		- Various code improvements.<br>`,
	`<br><h3 style='color: #CC0000'>v0.001.8</h3><br>
		- Balanced until 200 Alligators.<br>
		- Added two Alligator upgrades and two Alligator buyables.<br>
		- Various code changes.<br>`,
	`<br><h3 style='color: #CC0000'>v0.001.5</h3><br>
		- Various changes to make the game "playable".<br>
	`,
]

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

