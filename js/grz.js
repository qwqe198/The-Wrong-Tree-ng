addLayer("grz", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `IN`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
ll: new ExpantaNum(0),
crgr: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum(500) },
    color: "green",
    resource: "感染者", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
  milestones: {
        1: {
            requirementDescription: "6感染者",

            done() { return player.grz.points.gte(6) },

            effectDescription() {


                return "解锁购买项" 
            },
        },
   2: {
            requirementDescription: "13感染者",

            done() { return player.grz.points.gte(13) },

            effectDescription() {


                return "解锁传染感染" 
            },
        },
    },
onPrestige(resettingLayer) {
        player.a1.points = n(0)
player.a1.upgrades = []
player.a1.buyables[11] = zero
player.a1.buyables[12] = zero
player.a1.buyables[13] = zero


    },
    effectDescription() { return `副本2. 你有${format(player.grz.ll)}感染力量(+${format(layers.grz.llgain())}/s),点数上限^${n(this.lleff().mul(10000).floor().div(10000))}.` },
    lleff() {
        let eff = player.grz.ll.add(1).log10().mul(0.001).add(1)
eff=eff.pow(buyableEffect("grz", 13))
        if(eff.gte(1.01))eff=eff.mul(0.1).add(n(1.01).mul(0.9))
        if(eff.gte(1.035))eff=eff.mul(0.01).add(n(1.035).mul(0.99))
        return eff
    },
llgain() {
let pow =n(2)
if (hasUpgrade("grz", 22))pow=pow.mul(upgradeEffect("grz", 22))
if (hasUpgrade("grz", 25))pow=pow.mul(upgradeEffect("grz", 25))
pow=pow.mul(buyableEffect("grz", 12))
        let gain = player.grz.points.pow(pow)
      if (hasUpgrade("grz", 14))gain=gain.mul(player.points.add(1e10).log10().log10())  
if (hasUpgrade("grz", 21))gain=gain.mul(upgradeEffect("grz", 21))
if (hasUpgrade("grz", 23))gain=gain.mul(upgradeEffect("grz", 23))
if (hasUpgrade("grz", 34))gain=gain.mul(upgradeEffect("grz", 34))
	if (hasAchievement("rw", 86)) gain = gain.mul(10)
gain = gain.mul(buyableEffect("grz", 11))
                if (hasMilestone("t", 15)) gain = gain.mul(n(1.1).pow(buyableEffect("t", 11)))
     if (hasMilestone("lcb", 6)) gain = gain.mul(n(1.1).pow(player.grz.ll.add(10).log(10).floor().min(100)))
if (hasUpgrade("grz", 15)&&hasAchievement("rw", 84))gain=gain.mul(upgradeEffect("grz", 15))
if(gain.gte(1e308))gain=gain.log10().add(692).pow(308/3)
        return gain
    },
pthc() {
        let gain =n("1e50000") 
        gain=gain.pow(this.lleff())
if (hasUpgrade("grz", 13))gain=gain.mul(upgradeEffect("grz", 13))
if (hasUpgrade("grz", 14))gain=gain.mul(player.points.add(10).log(10).pow(7))
if(hasAchievement("rw",93))gain=gain.mul(1e50)
        return gain
    },
upgrades: {
        11: {
            description: "基于感染力量在一重软上限后加成点数.",
            cost() { return new OmegaNum(200) },
            unlocked() { return true },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz",
effect() {
                var eff = player.grz.ll.add(1).log10().mul(0.004).add(1)
                if (hasUpgrade("grz", 16))eff=eff.pow(upgradeEffect("grz", 16))
if(eff.gte(1.1))eff=eff.pow(0.5).mul(n(1.1).pow(0.5))
if(eff.gte(1.3))eff=eff.pow(0.5).mul(n(1.3).pow(0.5))
if(eff.gte(1.5))eff=eff.pow(0.2).mul(n(1.5).pow(0.8))
                return eff
            },
            effectDisplay() { return `^ ${format(this.effect())}` },
        },
        12: {
            description: "感染力量加成重置点获取且'数字生命'购买量x2.",
            cost() { return new OmegaNum(250) },
            unlocked() { return true },
effect() {
                var eff = player.grz.ll.add(1).pow(10)
                 if (eff.gte("1e1000")) eff = expPow(eff.mul(10), n(1).div(3)).mul("1e990")
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
13: {
            description: "基于感染力量提升点数上限.",
            cost() { return new OmegaNum(2000) },
            unlocked() { return true },
effect() {
                var eff = player.grz.ll.add(1).pow(5)
                 if (eff.gte(1e100)) eff = expPow(eff.mul(10), 0.5).mul("1e90")
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
14: {
            description: "基于点数提升感染力量获取并提升点数上限.",
            cost() { return new OmegaNum(3000) },
            unlocked() { return true },
effect1() {
                var eff = player.points.add(1e10).log10().log10()
                
                return eff
            },
effect2() {
                var eff = player.points.add(10).log10().pow(7)
                
                return eff
            },
 effectDisplay() { return `x${format(this.effect1())} ,x ${format(this.effect2())} ` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
15: {
            description: "基于感染者加成生命，血量，增量，无瑕点数，变形虫，战力获取.",
            cost() { return new OmegaNum(15000) },
            unlocked() { return true },
effect() {
                var eff = player.grz.points
                
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
16: {
            description: "基于b加成升级11效果.",
            cost() { return new OmegaNum(20000) },
            unlocked() { return true },
effect() {
                var eff = layers.a.effect().pow(0.2)
                
                return eff
            },
 effectDisplay() { return `^ ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
21: {
            description: "基于重置点加成感染力量获取.",
            cost() { return new OmegaNum(30000) },
            unlocked() { return true },
effect() {
                var eff = player.a.points.add(1e10).log10().log10()
                if(hasUpgrade("grz",56))eff=eff.pow(upgradeEffect("grz", 55))
 if(hasUpgrade("grz",56))eff=eff.pow(upgradeEffect("grz", 54))
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
22: {
            description: "基于感染力量加成感染者基础.",
            cost() { return new OmegaNum(400000) },
            unlocked() { return true },
effect() {
                var eff = player.grz.ll.add(10).log10().mul(0.015).add(1)
                if(eff.gte(2))eff=eff.pow(0.1).mul(n(2).pow(0.9))
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
23: {
            description: "基于战力加成感染力量获取.",
            cost() { return new OmegaNum(1000000) },
            unlocked() { return true },
effect() {
                var eff = player.cq.points.add(1).pow(0.5)
                if(hasAchievement("rw",95))eff=eff.pow(2)
  if(hasUpgrade("grz",36))eff=eff.pow(upgradeEffect("grz", 55))
 if(hasUpgrade("grz",36))eff=eff.pow(upgradeEffect("grz", 54))
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
24: {
            description: "每个升级使战力获取x1.1.",
            cost() { return new OmegaNum(25000000) },
            unlocked() { return true },
effect() {
                var eff = n(1.1).pow(player.grz.upgrades.length)
                
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
25: {
            description: "战力加成感染者基础.",
            cost() { return new OmegaNum(3e11) },
            unlocked() { return true },
effect() {
                var eff = player.cq.points.add(1).pow(0.025)
                                if(eff.gte(1.5))eff=eff.pow(0.1).mul(n(1.5).pow(0.9))
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
26: {
            description: "基于变形虫加成战力获取.",
            cost() { return new OmegaNum(1.31e13) },
            unlocked() { return true },
effect() {
                var eff = player.a1.points.add(1).pow(0.022)
                
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
31: {
            description: "每秒获得100%的战力,禁用战力重置.",
            cost() { return new OmegaNum(2.52e25) },
            unlocked() { return true },

currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
32: {
            description: "感染者升级15对转生增量生效,自动提升攻防.",
            cost() { return new OmegaNum(2.72e27) },
            unlocked() { return true },

currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
33: {
            description: "感染力量提升增量获取.",
            cost() { return new OmegaNum(2.92e29) },
            unlocked() { return true },
effect() {
                var eff = player.grz.ll.add(1).log10().pow(10)
                
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
34: {
            description: "基于感染力量提升自身获取.",
            cost() { return new OmegaNum(1.939e193) },
            unlocked() { return true },
effect() {
                var eff = player.grz.ll.add(1).log10()
                if(hasUpgrade("grz",54))eff=eff.pow(upgradeEffect("grz", 54))
if(hasUpgrade("grz",55))eff=eff.pow(upgradeEffect("grz", 55))
                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
35: {
            description: "基于感染力量提升战力获取.",
            cost() { return new OmegaNum(2.19e219) },
            unlocked() { return true },
effect() {
                var eff = player.grz.ll.add(1).log10().add(1).log10()

                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
36: {
            description: "传染感染的第3行升级对升级23生效.",
            cost() { return new OmegaNum(2.29e229) },
            unlocked() { return true },

currencyDisplayName: "感染力量",
            currencyInternalName: "ll",
            currencyLayer: "grz"
        },
51: {
            description: "“力量获取”的基础增加1",
            cost() { return new OmegaNum(50) },
            unlocked() { return true },

currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
52: {
            description: "传染感染降低感染者价格（上限500）",
            cost() { return new OmegaNum(140) },
            unlocked() { return true },
effect() {
                var eff = player.grz.crgr.min(500)
                
                return eff
            },
 effectDisplay() { return `/${format(this.effect())}` },
currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
53: {
            description: "“免疫降低”的基础增加0.01",
            cost() { return new OmegaNum(350) },
            unlocked() { return true },

currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
54: {
            description: "基于里程碑提升感染者升级34效果",
            cost() { return new OmegaNum(380) },
            unlocked() { return true },
effect() {
                var eff = player.lcb.points.pow(0.5)
                
                return eff
            },
 effectDisplay() { return `^ ${format(this.effect())}` },
currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
55: {
            description: "基于感染者提升感染者升级34效果",
            cost() { return new OmegaNum(400) },
            unlocked() { return true },
effect() {
                var eff = player.grz.points.pow(0.25)
                
                return eff
            },
 effectDisplay() { return `^ ${format(this.effect())}` },
currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
56: {
            description: "上两个升级对升级21生效",
            cost() { return new OmegaNum(425) },
            unlocked() { return true },

currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
61: {
            description: "战力获取基于战力增加",
            cost() { return new OmegaNum(540) },
            unlocked() { return true },
effect() {
                var eff = player.cq.points.add(1).log10()

                return eff
            },
 effectDisplay() { return `x ${format(this.effect())}` },
currencyDisplayName: "传染感染",
            currencyInternalName: "crgr",
            currencyLayer: "grz"
        },
    },
    exponent: 5,
    baseAmount() { return player.cq.points },//基础资源数量
    baseResource: "战力",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },

    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)
       
        return exp
    },
getNextAt() {
                let gain = n("500").mul(n("2").pow(player.grz.points))
if(player.grz.points.gte(13))gain=n("500").mul(n("3").pow(player.grz.points))
if(hasUpgrade("grz",52))gain=gain.div(upgradeEffect("grz", 52))
                return gain
        },
    layerShown() { return hasMilestone("cq", 23)||player.grz.points.gte(1) },
    row: 101, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

  update(diff) {
                player.grz.ll = player.grz.ll.add(this.llgain().mul(diff))
if(hasMilestone("grz", 2))player.grz.crgr = getBuyableAmount(this.layer, 11).add(getBuyableAmount(this.layer, 12).mul(2)).add(getBuyableAmount(this.layer, 13).mul(3))
        },

buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n( "1e8").mul(n(2).pow(x)).mul(n(1.005).pow(x.pow(2)))

                return c
            },
            display() { return `感染力量获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}感染力量<br>数量:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "力量获取"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
var base = n(2)
if(hasUpgrade("grz",51))base=base.add(1)
x=x.add(getBuyableAmount(this.layer, 12))
x=x.add(getBuyableAmount(this.layer, 13))
                var eff = n(base).pow(x)
if(eff.gte(1e130))eff=eff.root(2).mul(1e65)
                return eff
            },
            unlocked() { return true },
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n( "10").pow(x.pow(1.3).add(66))

                return c
            },
            display() { return `感染者基础<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}感染力量<br>数量:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "感染者基础"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
x=x.add(getBuyableAmount(this.layer, 13))
var base = n(1.03)

                var eff = n(base).pow(x)
if(eff.gte(5))eff=eff.root(2).mul(n(5).root(2))
                return eff
            },
            unlocked() { return true },
        },
13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n( "10").pow(x.pow(1.5).add(108))

                return c
            },
            display() { return `感染者效果<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}感染力量<br>数量:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "免疫降低"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
var base = n(1.04)
if(hasUpgrade("grz",53))base=base.add(0.01)
                var eff = n(base).pow(x)

                return eff
            },
            unlocked() { return true },
        },
    },
 tabFormat: {
        主界面: {
            buttonStyle() { return { 'color': 'green' } },
           
            content:
                ["main-display",

                    "prestige-button", "resource-display",
 

                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15],["upgrade",16]]],
["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25],["upgrade",26]]],  
["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35],["upgrade",36]]],  
["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45],["upgrade",46]]]
                ],
 
        },
        里程碑: {
            buttonStyle() { return { 'color': 'green' } },
            content:
                ["main-display",

                    "prestige-button", "resource-display",
                    "milestones",

                ],
        },



        购买项: {
            buttonStyle() { return { 'color': 'green' } },
            unlocked() { return hasMilestone("grz", 1) },
            content:
                ["main-display",

                    "prestige-button", "resource-display",
["display-text", function () {
 return hasMilestone("grz", 2)?"你有" + format(player.grz.crgr) + "传染感染<br>购买项会给左边的购买项额外等级<br>每个购买项提供1传染感染<br>每个第二排的购买项提供10传染感染":""
                                }],
                    "buyables",


                ],
                
        },
感染: {
            buttonStyle() { return { 'color': 'green' } },
            unlocked() { return hasMilestone("grz", 2) },
            content:
                ["main-display",

                    "prestige-button", "resource-display",
["display-text", function () {
 return hasMilestone("grz", 2)?"你有" + format(player.grz.crgr) + "传染感染<br>购买项会给左边的购买项额外等级<br>每个购买项提供1传染感染<br>每个第二排的购买项提供10传染感染":""
                                }],
 ["upgrade",51],
                ["row",[["upgrade",52],["upgrade",53]]],
                ["row",[["upgrade",54],["upgrade",55]]],
                ["upgrade",56],
                ["upgrade",61],
                ["row",[["upgrade",62],["upgrade",65],["upgrade",72]]],
                ["row",[["upgrade",63],["upgrade",66],["upgrade",73]]],
                ["row",[["upgrade",64],["upgrade",71],["upgrade",74]]],
                ["upgrade",75],
                ["upgrade",76],


                ],
                
        },
    },

})