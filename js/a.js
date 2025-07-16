addLayer("a", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new ExpantaNum(0),
        }
    },
    autoUpgrade() { return hasMilestone("esc", 8) || hasUpgrade("cq", 52) },
    color: "lime",
    resource: "声望点(pp)", // Name of prestige currency
    baseResource: "点数",
    baseAmount() { return player.points },
    requires() { return new ExpantaNum(1e25) },
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        var exp = new ExpantaNum(1)

        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return hasMilestone("esc", 6) || hasMilestone("cq", 1) },
    effect() {
        var eff = player.a.points.add(1).root(20)
        if (eff.gte(2)) eff = eff.sqrt().mul(1.41)
        if (eff.gte(4)) eff = eff.sqrt().sqrt().sqrt().mul(3.364)
        if (eff.gte(6)) eff = eff.sqrt().sqrt().sqrt().sqrt().sqrt().mul(5.6732)
        if (eff.gte(10)) eff = eff.div(2).add(5)
        if (eff.gte(15)) eff = eff.div(5).add(12)
        if (eff.gte(25)) eff = eff.div(100).add(24.75)
        if (hasMilestone("l", 29)) eff = eff.mul(n(1.005).pow(player.l.points.add(1).log10().min(50)))
        if (hasAchievement("rw", 13)) eff = eff.mul(1.005)
        if (hasUpgrade("cq", 61) && inChallenge("cq", 13)) eff = eff.pow(0.1)


        return eff
    },
    effectDescription() { return `43.容易混淆的图标.b -> <text style = "color:green">${format(layers.a.effect(), 2)}</text>` },
    //clickables: {
    //part1
    //11: {
    //    canClick(){return true},
    //    display() {return `Update the game<br />You've updated ${Utimeformat(player.u.updtime)}.<br /><br />Now you are doing:${updtxt[player.u.doing]}`},
    //    onClick(){player.u.doing = "upd"}
    //},
    //},
    upgrades: {
        11: {
            description: "点数并不是在做无用功.\n点数加成pp获取.",
            cost() { return new OmegaNum(4) },
            unlocked() { return true },
            effect() {
                var baseEff = player.points.div(1e25).pow(0.1)

                if (hasUpgrade("a", 15)) baseEff = baseEff.pow(upgradeEffect("a", 15))

                //sc
                if (baseEff.gt(10)) baseEff = baseEff.log10().pow(1.5).mul(10)
                if (baseEff.gt(100)) baseEff = baseEff.pow(0.5).mul(10)
                if (baseEff.gt(1000)) baseEff = baseEff.pow(0.35).mul(1000 ** 0.65)

                //p22:sin to p11
                if (hasUpgrade("a", 12)) baseEff = baseEff.mul(upgradeEffect("a", 12))
                if (hasUpgrade("a", 14)) baseEff = baseEff.mul(upgradeEffect("a", 14))
                //ac21:/1000
                if (baseEff.gt(10000)) baseEff = baseEff.pow(0.5).mul(100)
                if (baseEff.gt(1e30)) baseEff = baseEff.pow(0.1).mul(1e27)
                return baseEff.max(1)
            },
            effectDisplay() { return `x${format(upgradeEffect("a", 11), 1)}` }
        },


        12: {
            description: "44.用三角函数增加游戏'趣味性'.pp产量<br>x(pp^0.25+1)^<br>(sin(pp^1.5/10)^2).",
            cost() { return new OmegaNum(2048) },
            unlocked() { return hasUpgrade("a", 11) },
            effect() {
                var baseEff = player.a.points.pow(0.25).add(1)

                if (!hasUpgrade("a", 21)) baseEff = baseEff.pow(Math.sin(player.a.points.pow(1.5).div(10).mod(360).toNumber()) ** 2)
                if (hasUpgrade("a", 21)) baseEff = baseEff.pow((player.esc.points.pow(1.5).div(10).toNumber()) ** 2)
                if (hasUpgrade("a", 15)) baseEff = baseEff.pow(upgradeEffect("a", 15))

                if (baseEff.gt(1e100)) {
                    var sc = 4

                    baseEff = baseEff.root(sc).mul(1e100 ** (1 - 1 / sc))
                }
                if (baseEff.gt(1e10000)) {
                    var sc = 3
                    baseEff = baseEff.root(sc).mul(1e10000 ** (1 - 1 / sc))
                }
                if (baseEff.gt(1e50000)) baseEff = baseEff.log10().mul(2).pow(50000)
                return baseEff.max(1)
            },
            effectDisplay() { return `x${format(upgradeEffect("a", 12), 1)}` }
        },


        13: {
            description: "来点更有意思的.p12一定程度上加成p11.",
            cost() { return new OmegaNum(10000086) },
            unlocked() { return hasUpgrade("a", 12) },
            effect() {
                var baseEff = upgradeEffect("a", 12)
                baseEff = baseEff.log10().add(1).pow(2)

                if (hasUpgrade("a", 15)) baseEff = baseEff.pow(upgradeEffect("a", 15))



                return baseEff
            },
            effectDisplay() { return `x${format(upgradeEffect("a", 13), 1)}` }
        },
        14: {
            description: "p12,p13加成p11...?",
            cost() { return new OmegaNum(1e11) },
            unlocked() { return hasUpgrade("a", 13) },
            effect() {
                var baseEff = upgradeEffect("a", 12).mul(upgradeEffect("a", 13))

                if (hasUpgrade("a", 15)) baseEff = baseEff.pow(upgradeEffect("a", 15))


                return baseEff
            },
            effectDisplay() { return `x${format(upgradeEffect("a", 14), 1)}` }
        },
        15: {
            description: "前边所有升级的效果+^0.2.所有.最先计算.",
            cost() { return new OmegaNum(3e11) },
            unlocked() { return hasUpgrade("a", 14) },
            effect() {
                var baseEff = new ExpantaNum(.2)
                if (hasUpgrade("a", 23)) baseEff = baseEff.mul(buyableEffect("p", 21))
                if (hasUpgrade("a", 24)) baseEff = baseEff.mul(buyableEffect("p", 14))
                if (hasUpgrade("a", 31)) baseEff = baseEff.mul(buyableEffect("p", 22))
                return baseEff.add(1)
            },
            effectDisplay() { return `^${format(upgradeEffect("a", 15), 2)}` }
        },
        21: {
            description: "45.公式用一下就不用了.修改升级12公式x(pp^0.25+1)^<br>((esc^1.5/10)^2)",
            cost() { return new OmegaNum(1e12) },
            unlocked() { return hasUpgrade("a", 15) },
        },
        22: {
            description: "46.一刀切的补救.挑战C-4不再限制升级数量",
            cost() { return new OmegaNum(5e44) },
            unlocked() { return hasUpgrade("a", 21) },
        },
        23: {
            description: "p层级第五个购买项加成升级15效果",
            cost() { return new OmegaNum(1e48) },
            unlocked() { return hasUpgrade("a", 22) },
        },
        24: {
            description: "p层级第四个购买项加成升级15效果",
            cost() { return new OmegaNum(1e51) },
            unlocked() { return hasUpgrade("a", 23) },
        },
        25: {
            description: "升级15加成p层级第二个购买项效果",
            cost() { return new OmegaNum(1e54) },
            unlocked() { return hasUpgrade("a", 24) },
        },
        31: {
            description: "47.这是套娃树吗?p层级第六个购买项加成升级15效果",
            cost() { return new OmegaNum(1e95) },
            unlocked() { return hasUpgrade("a", 25) },
        },
        32: {
            description: "48.这什么b升级?b加成p层级升级51效果",
            cost() { return new OmegaNum(1e115) },
            unlocked() { return hasUpgrade("a", 31) },
        },
        33: {
            description: "49.学一下增量宇宙树.移除p层级前7个购买项的常数项价格",
            cost() { return new OmegaNum(1e121) },
            unlocked() { return hasUpgrade("a", 32) },
        },
        34: {
            description: "p层级第七个购买项加成升级12效果",
            cost() { return new OmegaNum(5e125) },
            unlocked() { return hasUpgrade("a", 33) },
        },
        35: {
            description: "50.水了三行升级的作者态度也太不认真了叭(?)重置能量效果^1.025",
            cost() { return new OmegaNum(1e128) },
            unlocked() { return hasUpgrade("a", 34) },
        },
        41: {
            description: "58.仍然没用.移除p层级前7个购买项一次项价格",
            cost() { return new OmegaNum(1e161) },
            unlocked() { return hasUpgrade("a", 35) && hasMilestone("esc", 7) },
        },
        42: {
            description: "59.逐渐递减但不变的加成.挑战C-6的效果^2. 60.有规律的价格.",
            cost() { return new OmegaNum(1e163) },
            unlocked() { return hasUpgrade("a", 41) && hasMilestone("esc", 7) },
        },
        43: {
            description: "挑战C-6的效果^1.5",
            cost() { return new OmegaNum(1e165) },
            unlocked() { return hasUpgrade("a", 42) && hasMilestone("esc", 7) },
        },
        44: {
            description: "挑战C-6的效果^1.2",
            cost() { return new OmegaNum(1e167) },
            unlocked() { return hasUpgrade("a", 43) && hasMilestone("esc", 7) },
        },
        45: {
            description: "挑战C-6的效果^1.1",
            cost() { return new OmegaNum(1e169) },
            unlocked() { return hasUpgrade("a", 44) && hasMilestone("esc", 7) },
        },
        51: {
            description: "p层级第六个购买项效果^2",
            cost() { return new OmegaNum(1e171) },
            unlocked() { return hasUpgrade("a", 45) && hasMilestone("esc", 7) },
        },
        52: {
            description: "p层级第六个购买项效果^1.5",
            cost() { return new OmegaNum(1e178) },
            unlocked() { return hasUpgrade("a", 51) && hasMilestone("esc", 7) },
        },
        53: {
            description: "p层级第六个购买项效果^1.2",
            cost() { return new OmegaNum("1e1123") },
            unlocked() { return hasUpgrade("a", 52) && hasMilestone("esc", 8) },
        },
        54: {
            description: "p层级第六个购买项效果^1.1",
            cost() { return new OmegaNum("1e1156") },
            unlocked() { return hasUpgrade("a", 53) && hasMilestone("esc", 8) },
        },
        55: {
            description: "p层级第七个购买项效果^2",
            cost() { return new OmegaNum("1e1169") },
            unlocked() { return hasUpgrade("a", 54) && hasMilestone("esc", 8) },
        },
        61: {
            description: "p层级第七个购买项效果^1.5",
            cost() { return new OmegaNum("1e1459") },
            unlocked() { return hasUpgrade("a", 55) && hasMilestone("esc", 8) },
        },
        62: {
            description: "p层级第七个购买项效果^1.2",
            cost() { return new OmegaNum("1e3028") },
            unlocked() { return hasUpgrade("a", 61) && hasMilestone("esc", 9) },
        },
        63: {
            description: "p层级第七个购买项效果^1.1",
            cost() { return new OmegaNum("1e7760") },
            unlocked() { return hasUpgrade("a", 62) && hasMilestone("esc", 9) },
        },

    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasMilestone("l", 32) ? "1e10000" : "1e14000").mul(n(1e308).pow(x)).mul(n(1e10).pow(x.pow(2)))

                return c
            },
            display() { return `生命获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}声望点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.points.gte(this.cost()) },
            buy() {
                player.a.points = player.a.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "数字生命"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = n(2).pow(x)

                return eff
            },
            unlocked() { return upgradeEffect("p", 25).gte(8) },
        },
    },









    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(ExpantaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */


    //important!!!

    getResetGain() {
        var gain = player.points.div(1e25).pow(0.075)
        if (hasUpgrade("a", 11)) gain = gain.mul(upgradeEffect("a", 11))
        if (hasUpgrade("a", 12)) gain = gain.mul(upgradeEffect("a", 12))
        if (hasAchievement("rw", 16)) mult = mult.mul(1e10)
        if (hasMilestone("l", 13)) gain = gain.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18) ? layers.a.effect() : 1).pow(buyableEffect("a1", 13)))
        gain = gain.pow(buyableEffect("p", 23))
        if (player.q.points.gte(1)) gain = gain.pow(layers.q.effect())
        if (hasMilestone("l", 17)) gain = gain.pow(n(1.05).pow(player.l.challenges[11]))
        if (hasMilestone("l", 27)) gain = gain.pow(n(1.1))

        {
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20100")) gain = gain.pow(1.01);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20200")) gain = gain.pow(1.02);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20300")) gain = gain.pow(1.03);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20400")) gain = gain.pow(1.04);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20500")) gain = gain.pow(1.05);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20600")) gain = gain.pow(1.06);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20700")) gain = gain.pow(1.07);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20800")) gain = gain.pow(1.08);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e20900")) gain = gain.pow(1.09);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21000")) gain = gain.pow(1.10);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21100")) gain = gain.pow(1.11);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21200")) gain = gain.pow(1.12);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21300")) gain = gain.pow(1.13);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21400")) gain = gain.pow(1.14);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21500")) gain = gain.pow(1.15);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21600")) gain = gain.pow(1.16);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21700")) gain = gain.pow(1.17);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21800")) gain = gain.pow(1.18);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e21900")) gain = gain.pow(1.19);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22000")) gain = gain.pow(1.20);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22100")) gain = gain.pow(1.21);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22200")) gain = gain.pow(1.22);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22300")) gain = gain.pow(1.23);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22400")) gain = gain.pow(1.24);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22500")) gain = gain.pow(1.25);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22600")) gain = gain.pow(1.26);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22700")) gain = gain.pow(1.27);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22800")) gain = gain.pow(1.28);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e22900")) gain = gain.pow(1.29);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23000")) gain = gain.pow(1.30);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23100")) gain = gain.pow(1.31);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23200")) gain = gain.pow(1.32);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23300")) gain = gain.pow(1.33);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23400")) gain = gain.pow(1.34);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23500")) gain = gain.pow(1.35);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23600")) gain = gain.pow(1.36);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23700")) gain = gain.pow(1.37);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23800")) gain = gain.pow(1.38);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e23900")) gain = gain.pow(1.39);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24000")) gain = gain.pow(1.40);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24100")) gain = gain.pow(1.41);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24200")) gain = gain.pow(1.42);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24300")) gain = gain.pow(1.43);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24400")) gain = gain.pow(1.44);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24500")) gain = gain.pow(1.45);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24600")) gain = gain.pow(1.46);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24700")) gain = gain.pow(1.47);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24800")) gain = gain.pow(1.48);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e24900")) gain = gain.pow(1.49);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25000")) gain = gain.pow(1.50);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25100")) gain = gain.pow(1.51);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25200")) gain = gain.pow(1.52);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25300")) gain = gain.pow(1.53);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25400")) gain = gain.pow(1.54);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25500")) gain = gain.pow(1.55);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25600")) gain = gain.pow(1.56);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25700")) gain = gain.pow(1.57);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25800")) gain = gain.pow(1.58);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e25900")) gain = gain.pow(1.59);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26000")) gain = gain.pow(1.60);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26100")) gain = gain.pow(1.61);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26200")) gain = gain.pow(1.62);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26300")) gain = gain.pow(1.63);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26400")) gain = gain.pow(1.64);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26500")) gain = gain.pow(1.65);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26600")) gain = gain.pow(1.66);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26700")) gain = gain.pow(1.67);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26800")) gain = gain.pow(1.68);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e26900")) gain = gain.pow(1.69);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27000")) gain = gain.pow(1.70);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27100")) gain = gain.pow(1.71);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27200")) gain = gain.pow(1.72);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27300")) gain = gain.pow(1.73);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27400")) gain = gain.pow(1.74);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27500")) gain = gain.pow(1.75);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27600")) gain = gain.pow(1.76);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27700")) gain = gain.pow(1.77);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27800")) gain = gain.pow(1.78);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e27900")) gain = gain.pow(1.79);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28000")) gain = gain.pow(1.80);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28100")) gain = gain.pow(1.81);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28200")) gain = gain.pow(1.82);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28300")) gain = gain.pow(1.83);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28400")) gain = gain.pow(1.84);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28500")) gain = gain.pow(1.85);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28600")) gain = gain.pow(1.86);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28700")) gain = gain.pow(1.87);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28800")) gain = gain.pow(1.88);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e28900")) gain = gain.pow(1.89);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29000")) gain = gain.pow(1.90);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29100")) gain = gain.pow(1.91);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29200")) gain = gain.pow(1.92);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29300")) gain = gain.pow(1.93);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29400")) gain = gain.pow(1.94);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29500")) gain = gain.pow(1.95);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29600")) gain = gain.pow(1.96);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29700")) gain = gain.pow(1.97);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29800")) gain = gain.pow(1.98);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e29900")) gain = gain.pow(1.99);
            if (hasMilestone("lcb", 4) && player.a.points.gte("1e30000")) gain = gain.pow(2);
        }
        if (hasMilestone("l", 37)) gain = gain.pow(layers.a.effect())
        if (hasUpgrade("cq", 61) && inChallenge("cq", 13)) gain = gain.pow(0.1)
        if (gain.gte(1e10)) gain = expPow(gain.mul(10), 0.8).add(9.99e9)
        if (gain.gte("1e1000")) gain = expPow(gain.mul(10), 0.75).mul("1e900")
        if (gain.gte("1e20000")) gain = gain.pow(0.01).mul("1e19800")
        if (gain.gte("1e22500")) gain = expPow(expPow(gain, 0.75), 0.75).mul("1e22500")
        if (gain.gte("1e25000")) gain = gain.log10().sub(15000).pow(6250)
        if (inChallenge("l", 11)) gain = expPow(gain.mul(10), tmp.l.challenges[11].challengeEffect).div(10)
        if (!(player.esc.points.gte(6) || (hasUpgrade("cq", 61) && inChallenge("cq", 13)))) gain = gain.min(0)
        return gain.floor()
    },
    prestigeButtonText() {
        return "+ " + formatWhole(layers.a.getResetGain()) + " 声望点(pp)"
    },

    passiveGeneration() {
        if (hasMilestone("esc", 8) || hasUpgrade("cq", 54)) return 10
        return 0
    },
     update(diff) {
 if (hasUpgrade("cq", 32) && player.a.points.sub(1).gte(n(hasMilestone("l", 32) ? "1e10000" : "1e14000").mul(n(1e308).pow(getBuyableAmount("a", 11))).mul(n(1e10).pow(getBuyableAmount("a", 11).pow(2))))) setBuyableAmount("a", 11, getBuyableAmount("a", 11).add(1))
}
})