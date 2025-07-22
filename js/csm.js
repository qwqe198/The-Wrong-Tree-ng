addLayer("csm", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
        symbol: "<img src='portal.png' style='width:calc(60%);height:calc(60%);margin:20%'></img>", // 这是节点上显示的字母
        position: 2, // 节点顺序
        startData() {
                return {
                        unlocked: true, //是否开始就解锁
                        points: new ExpantaNum(0),
                        ati: new ExpantaNum(0),
                }
        },
        color: "#ffffffff",
        resource: "传送门", // 重置获得的资源名称
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        requires() {
                new ExpantaNum("1e700")
        },

        baseAmount() { return player.i.points },//基础资源数量
        baseResource: "增量",//基础资源名称
        gainMult() { // 资源获取数量倍率
                mult = new ExpantaNum(1)
                return mult
        },
        gainExp() { // 资源获取指数加成(与exponent相乘)
                var exp = new ExpantaNum(1)
                return exp
        },
        row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
        layerShown() { return inChallenge("t", 11) && hasMilestone("esc", 13) },
        getNextAt() {
                let gain = n("1e700").mul(n("1e300").pow(player.csm.points))

                return gain
        },
        effectDescription() {
                return `

                ${`<br><br>转生增量:${format(player.csm.ati)}(${format(this.atigain())}/s),使得增量获取*${format(this.effect())}`}
    
        `},
 buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e9").mul(n(5).pow(x)).mul(n(1.025).pow(x.pow(2)))

                return c
            },
            display() { return `I层级升级11效果<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}点数<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "点数灌注"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.add(1)

                return eff
            },
            unlocked() { return player.csm.points.gte(1)},
        },
     12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e55").mul(n(100000).pow(x)).mul(n(2).pow(x.pow(2)))

                return c
            },
            display() { return `转生增量效果<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}增量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.i.points.gte(this.cost()) },
            buy() {
                player.i.points = player.i.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "增量灌注"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.add(1)

                return eff
            },
            unlocked() { return hasAchievement("rw", 72)&&player.csm.points.gte(1)},
        },
        13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e11").mul(n(10).pow(x)).mul(n(1.03).pow(x.pow(2)))

                return c
            },
            display() { return `基础变形虫获取<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}变形虫<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a1.points.gte(this.cost()) },
            buy() {
                player.a1.points = player.a1.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "变形虫灌注"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.pow(0.5).add(1)

                return eff
            },
            unlocked() { return hasAchievement("rw", 73)&&player.csm.points.gte(1)},
        },
    },
        effect() {
                var eff = player.csm.ati.add(1)
eff=eff.pow(buyableEffect('csm', 12))
 if (eff.gte(1e100)) eff = expPow(eff.mul(10), 0.5).mul("1e90")
                return eff
        },
        atigain() {
                var eff = player.csm.points

                return eff
        },
        tabFormat: {
                "灌注": {
                        content: ["main-display",

                                "prestige-button",

                                "blank",
                                "buyables",
                                "blank",
                                "upgrades"],
                        unlocked() {
                                return true
                        },
                },
                "效果": {
                        content: [
                                "main-display",
                                ["display-text", function () {
                                        return "-无瑕点数获取/1e4，增量获取指数^0.9"

                                }],
                                ["display-text", function () {
                                        return "+解锁转生增量,点数灌注"

                                }],

                        ],
                        unlocked() {
                                return player.csm.points.gte(1)
                        },
                },
        },
        update(diff) {
                player.csm.ati = player.csm.ati.add(this.atigain().mul(diff))

        },

})