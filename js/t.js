addLayer("t", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `塔`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
            coin: new ExpantaNum(0),
        }
    },

    layerShown() { return true },
    color: "yellow",
    resource: "层", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {

        return 0
    },
    effectDescription() {
        return `
       
      
      
        `},
    requires() { return new ExpantaNum(1) },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1000").mul(n(3).pow(x)).mul(n(1.1).pow(x.pow(2)))
                c = c.div(player.cq.atk)
                if (hasAchievement("rw", 51)) c = c.div(player.cq.def)
                return c
            },
            display() { return `需要:${format(this.cost(getBuyableAmount(this.layer, this.id)))}血量<br>层数:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.cq.hp.gte(this.cost()) },
            buy() {
                player.cq.hp = player.cq.hp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "爬塔"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x

                return eff
            },
            unlocked() { return true },
        },
    },
    exponent: 1,
    baseAmount() { return player.cq.hp },//基础资源数量
    baseResource: "血量",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
    },
    layerShown() { return hasMilestone("cq", 4) },
    row: 100, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    challenges: {
        11: {
            name: "秘境1 加强疫苗",
            challengeDescription() {


                let a = "（推荐战力:30)点数获取log10后/9，进入时进行战力重置,退出时重置增量"

                return a
            },
            goalDescription() {
                return "1F1e308点数"
            },

            goal: () => "eeeeeeeeeeeeeee10",
            canComplete: () => player.points.gte(tmp.t.challenges[11].goal),
            rewardDescription() {



                let c = "<br>你完成了"
                c += formatWhole(player.t.challenges[11]) + "/1次"
                return c
            },
            onEnter() {

                doReset("t")

            },
            onExit() {

                player.i.points = n(0)

            },

            unlocked() {
                return hasAchievement("rw", 45)
            },

        },
    }, // inChallenge("l", 11)
    milestones: {


        1: {
            requirementDescription: "1层",
            effectDescription: "点数获取乘(x+1)",
            done() { return buyableEffect("t", 11).gte(1) }
        },
        2: {
            requirementDescription: "2层",
            effectDescription: "重置点获取乘(x+1)",
            done() { return buyableEffect("t", 11).gte(2) }
        },
        3: {
            requirementDescription: "3层",
            effectDescription: "p层级升级11效果乘(x+1)",
            done() { return buyableEffect("t", 11).gte(3) }
        },
        4: {
            requirementDescription: "4层",
            effectDescription: "p层级升级12效果乘(x+1)",
            done() { return buyableEffect("t", 11).gte(4) }
        },
        5: {
            requirementDescription: "5层",
            effectDescription: "血量获取乘(x+1)",
            done() { return buyableEffect("t", 11).gte(5) }
        },
        6: {
            requirementDescription: "6层",
            effectDescription: "p层级升级13效果乘(x+1)",
            done() { return buyableEffect("t", 11).gte(6) }
        },
        7: {
            requirementDescription: "7层",
            effectDescription: "p层级升级14效果乘(x+1)，解锁一个新的试炼",
            done() { return buyableEffect("t", 11).gte(7) }
        },
        8: {
            requirementDescription: "8层",
            effectDescription: "光速过8劝退 生命获取+1ex",
            done() { return buyableEffect("t", 11).gte(8) }
        },
        9: {
            requirementDescription: "9层",
            effectDescription: "声望加成效果^1.025",
            done() { return buyableEffect("t", 11).gte(9) }
        },
        10: {
            requirementDescription: "10层",
            effectDescription: "强大，无须多言 在简单试炼4内点数获取x1e(x^3.14)",

            done() { return buyableEffect("t", 11).gte(10) }
        },
        11: {
            requirementDescription: "12层",
            effectDescription: "无瑕点数获取x(1.05^x)",

            done() { return buyableEffect("t", 11).gte(12) }
        },
        12: {
            requirementDescription: "14层",
            effectDescription: "增量获取x(1.1^x),重置点获取^(1+0.005x)",

            done() { return buyableEffect("t", 11).gte(14) }
        },
  13: {
            requirementDescription: "16层",
            effectDescription: "生命获取乘(x+1)",

            done() { return buyableEffect("t", 11).gte(16) }
        },
    },
    tabFormat: {
        主要: {
            buttonStyle() { return { 'color': 'lightblue' } },
            content:
                [
                    "main-display",
                    "resource-display",
                    "buyables",
                    "milestones",
                    "challenges",
                ],
        },



    },

    getResetGain() {
        var gain = n(1)

        return gain
    },
    update(diff) {
        player.t.points = buyableEffect("t", 11)







    },
})