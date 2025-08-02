addLayer("l", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `L`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("1e7950") },
    color: "#BE0E00",
    resource: "生命", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {

        return 0
    },
    exponent: 0.5,
    baseAmount() { return player.p.points },//基础资源数量
    baseResource: "重置点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    layerShown() { return hasMilestone("esc", 8) || hasMilestone("cq", 1) },
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    tabFormat: {
        里程碑: {
            buttonStyle() { return { 'color': 'lightblue' } },
            content:
                ["main-display",

                    "prestige-button", "resource-display",
                    "milestones",

                ],
        },


        挑战: {
            buttonStyle() { return { 'color': 'lightblue' } },
            unlocked() { return hasMilestone("l", 10) },
            content:
                ["main-display",

                    "challenges",

                ],
        },
        可购买: {
            buttonStyle() { return { 'color': 'lightblue' } },
            unlocked() { return player.l.challenges[11] >= 10 },
            content:
                ["main-display",

                    "buyables",

                ],
        },
    },

    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e20").mul(n(10).pow(x)).mul(n(2).pow(x.pow(2)))

                return c
            },
            display() { return `生命获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}生命<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.l.points.gte(this.cost()) },
            buy() {
                player.l.points = player.l.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "α → ∂α"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.points.add(2).log(2).add(2).log(2).pow(x)

                return eff
            },
            unlocked() { return true },
        },
   12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e100").mul(n(3).pow(x)).mul(n(1.25).pow(x.pow(2)))

                return c
            },
            display() { return `感染力量获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}生命<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.l.points.gte(this.cost()) },
            buy() {
                player.l.points = player.l.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "α → ∂β"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.grz.ll.add(2).log(2).pow(x)

                return eff
            },
            unlocked() { return true },
        },
    },
    challenges: {
        11: {
            name: "65.机器翻译.扩张",
            challengeDescription() {


                let a = "所有先前的资源指数都被<br>^"
                let e = tmp.l.challenges[11].challengeEffect
                let f = "<br>完成次数增加生命获取,每完成10次解锁一个可购买."
                return a + e + f
            },
            goalDescription() {
                return "e7950重置点"
            },
            challengeEffect() {
                let eff = n(0.99).pow(player.l.challenges[11] + 1 - player.cq.challenges[13] * 0.2).mul(10000).floor().div(10000)


                return eff
            },
            goal: () => "1e7950",
            canComplete: () => player.p.points.gte(tmp.l.challenges[11].goal),
            rewardDescription() {


                let b = "当前: *" + format(tmp.l.challenges[11].rewardEffect)
                let c = "<br>你完成了"
                c += formatWhole(player.l.challenges[11]) + "/110次"
                return b + c
            },
            completionLimit: 110,
            rewardEffect() {
                let eff = player.l.challenges[11] + 1
                if (hasMilestone("l", 16)) eff = eff ** eff
                if (hasAchievement("rw", 27)) eff = eff ** 1.05
                return eff
            },
            unlocked() {
                return hasMilestone("l", 10)
            },

        },
    }, // inChallenge("l", 11)

    milestones: {
        1: {
            requirementDescription: "1生命",

            done() { return player.l.points.gte(1) },

            effectDescription() {


                return "62.怎么会是生命树啊.前50个生命每个使点数^1.01,当前:^" + format(n(1.01).pow(player.l.points.min(50)))
            },
        },
        2: {
            requirementDescription: "2生命",

            done() { return player.l.points.gte(2) },
            effectDescription() {


                return "63.分批自动化.自动购买第一个m层级可购买"
            },
        },
        3: {
            requirementDescription: "3生命",

            done() { return player.l.points.gte(3) },
            effectDescription() {


                return "自动购买第二个m层级可购买"
            },
        },
        4: {
            requirementDescription: "4生命",

            done() { return player.l.points.gte(4) },
            effectDescription() {


                return "自动购买第三个m层级可购买"
            },
        },
        5: {
            requirementDescription: "5生命",

            done() { return player.l.points.gte(5) },
            effectDescription() {


                return "自动购买第四个m层级可购买"
            },
        },
        6: {
            requirementDescription: "6生命",

            done() { return player.l.points.gte(6) },
            effectDescription() {


                return "自动购买第五个m层级可购买"
            },
        },
        7: {
            requirementDescription: "7生命",

            done() { return player.l.points.gte(7) },
            effectDescription() {


                return "自动购买第六个m层级可购买"
            },
        },
        8: {
            requirementDescription: "8生命",

            done() { return player.l.points.gte(8) },
            effectDescription() {


                return "自动购买第七个m层级可购买"
            },
        },
        9: {
            requirementDescription: "9生命",

            done() { return player.l.points.gte(9) },
            effectDescription() {


                return "自动购买第八个m层级可购买"
            },
        },
        10: {
            requirementDescription: "10生命",

            done() { return player.l.points.gte(10) },
            effectDescription() {


                return "64.要大量生命重置.解锁挑战"
            },
        },
        11: {
            requirementDescription: "1扩张完成",

            done() { return player.l.challenges[11] >= 1 },
            effectDescription() {


                return "元性质获取^1.05"
            },
        },
        12: {
            requirementDescription: "100生命",

            done() { return player.l.points.gte(100) },
            effectDescription() {


                return "66.增益还是减益.p层级第二个购买项价格变成原来的10次方,效果变成原来的5次方."
            },
        },
        13: {
            requirementDescription: "150生命",

            done() { return player.l.points.gte(150) },
            effectDescription() {


                return "67.有用还是没用.生命加成所有先前的资源获取,当前:x" + format(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18) ? layers.a.effect() : 1).pow(buyableEffect("a1", 13)))
            },
        },
        14: {
            requirementDescription: "200生命",

            done() { return player.l.points.gte(200) },
            effectDescription() {


                return "68.没用还是有用.m层级第一个购买项价格变成原来的25次方,效果变成原来的100次方."
            },
        },
        15: {
            requirementDescription: "250生命",

            done() { return player.l.points.gte(250) },
            effectDescription() {


                return "69.有用还是有用.m层级第二个购买项效果变成原来的1.5次方."
            },
        },
        16: {
            requirementDescription: "3扩张完成",

            done() { return player.l.challenges[11] >= 3 },
            effectDescription() {


                return "扩张效果指数^2"
            },
        },
        17: {
            requirementDescription: "1000生命",

            done() { return player.l.points.gte(1000) },
            effectDescription() {


                return "每次扩张使声望点获取^1.05,当前:^" + format(n(1.05).pow(player.l.challenges[11]))
            },
        },
        18: {
            requirementDescription: "50000生命",

            done() { return player.l.points.gte(50000) },
            effectDescription() {


                return "b对150生命里程碑生效."
            },
        },
        19: {
            requirementDescription: "2500000生命",

            done() { return player.l.points.gte(2500000) },
            effectDescription() {


                return "70.必要的妥协.挑战C-2不再增强升级效果."
            },
        },
        20: {
            requirementDescription: "3000000生命",

            done() { return player.l.points.gte(3000000) },
            effectDescription() {


                return "71.真的好熟悉啊.解锁新层级."
            },
        },
        21: {
            requirementDescription: "e23872点数",

            done() { return player.points.gte("1e23872") },
            effectDescription() {


                return "元性质获取^1.05."
            },
        },
        22: {
            requirementDescription: "10000000生命",

            done() { return player.l.points.gte(10000000) },
            effectDescription() {


                return "72.没这个打不过扩张.如果你在扩张里面,使声望加成对重置点生效."
            },
        },
        23: {
            requirementDescription: "200000000生命",

            done() { return player.l.points.gte(200000000) },
            effectDescription() {


                return "73.负面在前,正面在后.m层级第三个购买项价格变成原来的20次方."
            },
        },
        24: {
            requirementDescription: "300000000生命",

            done() { return player.l.points.gte(300000000) },
            effectDescription() {


                return "m层级第三个购买项效果变成原来的15次方."
            },
        },
        25: {
            requirementDescription: "500000000生命",

            done() { return player.l.points.gte(500000000) },
            effectDescription() {


                return "移除m层级第三个购买项价格常数项."
            },
        },
        26: {
            requirementDescription: "3e9生命",

            done() { return player.l.points.gte(3e9) },
            effectDescription() {


                return "移除p购买项11的第一个软上限."
            },
        },
        27: {
            requirementDescription: "5e9生命",

            done() { return player.l.points.gte(5e9) },
            effectDescription() {


                return "声望点获取^1.1."
            },
        },
        28: {
            requirementDescription: "1e10生命",

            done() { return player.l.points.gte(1e10) },
            effectDescription() {


                return "终于……在生命重置中保留点数奇点."
            },
        },
        29: {
            requirementDescription: "5e11生命",

            done() { return player.l.points.gte(5e11) },
            effectDescription() {


                return "前50个数量级生命每个使b*1.005,当前:x" + format(n(1.005).pow(player.l.points.add(1).log10().min(50)))
            },
        },
        30: {
            requirementDescription: "1e12生命",

            done() { return player.l.points.gte(1e12) },
            effectDescription() {


                return "降低声望加成的价格."
            },
        },
        31: {
            requirementDescription: "2.5e13生命",

            done() { return player.l.points.gte(2.5e13) },
            effectDescription() {


                return "b加成p层级升级13."
            },
        },
        32: {
            requirementDescription: "1e18生命",

            done() { return player.l.points.gte(1e18) },
            effectDescription() {


                return "降低p层级购买项11价格."
            },
        },
        33: {
            requirementDescription: "1e22生命",

            done() { return player.l.points.gte(1e22) },
            effectDescription() {


                return "懒得数劝退条目了:这是同一个p吗?增加p层级购买项11效果."
            },
        },
        34: {
            requirementDescription: "1e24生命",

            done() { return player.l.points.gte(1e24) },
            effectDescription() {


                return "削弱p层级升级22效果的软上限."
            },
        },
        35: {
            requirementDescription: "1e40000点数",

            done() { return player.points.gte("1e40000") },
            effectDescription() {


                return "第一个完全没用，解锁新层级."
            },
        },
        36: {
            requirementDescription: "3e29生命",

            done() { return player.l.points.gte(3e29) },
            effectDescription() {


                return "弱化元性质获取软上限，实际是把公式后+1e7500改成x1e7500."
            },
        },
        37: {
            requirementDescription: "1e32生命",

            done() { return player.l.points.gte(1e32) },
            effectDescription() {


                return "真的不会膨胀吗b对声望点获取生效."
            },
        },
        38: {
            requirementDescription: "1e38生命",

            done() { return player.l.points.gte(1e38) },
            effectDescription() {


                return "快了……自动购买p层级11购买项的数量x5."
            },
        },
        39: {
            requirementDescription: "2e38生命",

            done() { return player.l.points.gte(2e38) },
            effectDescription() {


                return "还是不能过扩张……每次扩张使元性质获取^1.06,当前:^" + format(n(hasMilestone("l", 40) ? 1.1 : 1.06).pow(player.l.challenges[11]))
            },
        },
        40: {
            requirementDescription: "3e38生命",

            done() { return player.l.points.gte(3e38) },
            effectDescription() {


                return "终于能过了！上面的里程碑效果提升至^1.1"
            },
        },
        41: {
            requirementDescription: "1e50生命",

            done() { return player.l.points.gte(1e50) },
            effectDescription() {


                return "继续扩张 150生命里程碑对重置能量获取生效"
            },
        },
        42: {
            requirementDescription: "1e57生命",

            done() { return player.l.points.gte(1e57) },
            effectDescription() {


                return "我可没说在指数前 α → ∂α生效于p层级升级24"
            },
        },
  43: {
            requirementDescription: "1e100生命",

            done() { return player.l.points.gte(1e100) },
            effectDescription() {


                return "在重置时保留所有生命里程碑"
            },
        },
    },


    update(diff) {

        if (hasAchievement("rw", 45) && player.l.points.sub(1).gte(n(1e20).mul(n(10).pow(getBuyableAmount("l", 11))).mul(n(2).pow(getBuyableAmount("l", 11).pow(2))))) setBuyableAmount('l', 11, getBuyableAmount('l', 11).add(1))
if (hasAchievement("rw", 77)&&player.l.challenges[11]<player.cq.milestones.length-3)player.l.challenges[11] = player.cq.milestones.length-3

    },

    /* upgrades:{
        11:{
            description:`点数加成自身.`,
            effect(){
                var eff = player.points.add(1).log10().add(1)
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(4),
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
        },
    }, */
    getResetGain() {
        var gain = player.p.points.add(10).log10().div(7950).pow((hasMilestone("lcb", 2) && player.l.challenges[11] >= 10 ? player.l.challenges[11] - 8 : 2) + player.cq.challenges[11] * 0.5)
        if (hasMilestone("l", 10)) gain = gain.mul(tmp.l.challenges[11].rewardEffect)
        if (hasMilestone("esc", 9)) gain = gain.mul(2)
if (hasUpgrade("grz", 15))gain=gain.mul(upgradeEffect("grz", 15))
        if (hasMilestone("lcb", 3)) gain = gain.mul(n(1.1).pow(player.l.points.add(10).log(10).floor().min(100)))
        if (hasUpgrade("p", 61)) gain = gain.mul(10)
        if (hasUpgrade("p", 62)) gain = gain.mul(50)
        if (hasUpgrade("p", 63)) gain = gain.mul(250)
        if (hasUpgrade("p", 64)) gain = gain.mul(1250)
        if (hasUpgrade("p", 65)) gain = gain.mul(6250)
        if (hasAchievement("rw", 106)) gain = gain.mul(69)
if (hasMilestone("t", 13)) gain = gain.mul(buyableEffect("t", 11).add(1))
        if (hasUpgrade("cq", 63)) gain = gain.mul(upgradeEffect("cq", 63))
        if (hasAchievement("rw", 15)) gain = gain.mul(1.5)
        gain = gain.mul(buyableEffect("a", 11))
        gain = gain.mul(buyableEffect("l", 11))
        gain = gain.mul(buyableEffect("cq", 11))
        gain = gain.mul(layers.a1.effect())
        if (hasMilestone("t", 8)) gain = gain.add(n(10).pow(buyableEffect("t", 11)))
        if (!hasMilestone("esc", 8)) gain = gain.min(0)
        return gain.floor()
    },
    getNextAt() {
        let gain = tmp.l.getResetGain.plus(1)
        if (hasMilestone("l", 10)) gain = gain.div(tmp.l.challenges[11].rewardEffect)
        if (hasMilestone("esc", 9)) gain = gain.div(2)
        if (hasUpgrade("p", 61)) gain = gain.div(10)
        gain = gain.div(buyableEffect("a", 11))
        gain = gain.div(buyableEffect("l", 11))
        gain = gain.div(buyableEffect("cq", 11))
        if (hasAchievement("rw", 15)) gain = gain.div(1.5)
        return n(10).pow(gain.root(2).mul(7950)).max("1e7950")
    },
    passiveGeneration() {
        if (player.cq.challenges[21] >= 1) return n(10).pow(player.cq.challenges[21]).div(100000)
        return 0
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
            if (hasAchievement("rw", 47)) {
                kept.push("buyables")
            }
             if (hasMilestone("l", 43)) {
                kept.push("milestones")
            }
            layerDataReset(this.layer, kept)
        }
    },
})