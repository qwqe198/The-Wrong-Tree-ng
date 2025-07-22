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
onPrestige(resettingLayer) {
        player.a1.points = n(0)
player.a1.upgrades = []
player.a1.buyables[11] = zero
player.a1.buyables[12] = zero
player.a1.buyables[13] = zero
    },
    effectDescription() { return `副本2. 你有${format(player.grz.ll)}感染力量,点数上限^${n(this.lleff().mul(10000).floor().div(10000))}.` },
    lleff() {
        let eff = player.grz.ll.add(1).log10().mul(0.005).add(1)
        if(eff.gte(1.03))eff=eff.mul(0.3).add(n(1.03).mul(0.7))
        return eff
    },
llgain() {
let pow =n(2)
if (hasUpgrade("grz", 22))pow=pow.mul(upgradeEffect("grz", 22))
        let gain = player.grz.points.pow(pow)
      if (hasUpgrade("grz", 14))gain=gain.mul(player.points.add(1e10).log10().log10())  
if (hasUpgrade("grz", 21))gain=gain.mul(upgradeEffect("grz", 21))
if (hasUpgrade("grz", 23))gain=gain.mul(upgradeEffect("grz", 23))
        return gain
    },
pthc() {
        let gain =n("1e50000") 
        gain=gain.pow(this.lleff())
if (hasUpgrade("grz", 13))gain=gain.mul(upgradeEffect("grz", 13))
if (hasUpgrade("grz", 14))gain=gain.mul(player.points.add(10).log(10).pow(22))
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
                var eff = player.grz.ll.add(1).pow(33)
                
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
                var eff = player.points.add(10).log10().pow(22)
                
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

                return gain
        },
    layerShown() { return hasMilestone("cq", 23)||player.grz.points.gte(1) },
    row: 101, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

  update(diff) {
                player.grz.ll = player.grz.ll.add(this.llgain().mul(diff))

        },


})