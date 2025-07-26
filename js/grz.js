addLayer("grz", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `IN`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
ll: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("500") },
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
  
    },
onPrestige(resettingLayer) {
        player.a1.points = n(0)
player.a1.upgrades = []
player.a1.buyables[11] = zero
player.a1.buyables[12] = zero
player.a1.buyables[13] = zero
if(player.grz.points.gte(10))player.cq.points=n(300)

    },
    effectDescription() { return `副本2. 你有${format(player.grz.ll)}感染力量,点数上限^${n(this.lleff().mul(10000).floor().div(10000))}.` },
    lleff() {
        let eff = player.grz.ll.add(1).log10().mul(0.001).add(1)
        if(eff.gte(1.01))eff=eff.mul(0.1).add(n(1.01).mul(0.9))
        return eff
    },
llgain() {
let pow =n(2)
if (hasUpgrade("grz", 22))pow=pow.mul(upgradeEffect("grz", 22))
if (hasUpgrade("grz", 25))pow=pow.mul(upgradeEffect("grz", 25))
        let gain = player.grz.points.pow(pow)
      if (hasUpgrade("grz", 14))gain=gain.mul(player.points.add(1e10).log10().log10())  
if (hasUpgrade("grz", 21))gain=gain.mul(upgradeEffect("grz", 21))
if (hasUpgrade("grz", 23))gain=gain.mul(upgradeEffect("grz", 23))
	if (hasAchievement("rw", 86)) gain = gain.mul(10)
gain = gain.mul(buyableEffect("grz", 11))
if (hasUpgrade("grz", 15)&&hasAchievement("rw", 84))gain=gain.mul(upgradeEffect("grz", 15))
        return gain
    },
pthc() {
        let gain =n("1e50000") 
        gain=gain.pow(this.lleff())
if (hasUpgrade("grz", 13))gain=gain.mul(upgradeEffect("grz", 13))
if (hasUpgrade("grz", 14))gain=gain.mul(player.points.add(10).log(10).pow(7))
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
                return gain
        },
    layerShown() { return hasMilestone("cq", 23)||player.grz.points.gte(1) },
    row: 101, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

  update(diff) {
                player.grz.ll = player.grz.ll.add(this.llgain().mul(diff))

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
                return "力量加成"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
var base = n(2)
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
                    "upgrades",


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
                    "buyables",


                ],
                
        },
    },

})