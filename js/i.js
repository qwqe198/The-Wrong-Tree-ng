addLayer("i", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
        symbol: `I`, // 这是节点上显示的字母
        position: 3, // 节点顺序
        startData() {
                return {
                        unlocked: true, //是否开始就解锁
                        points: new ExpantaNum(0),
                }
        },
        requires() { return new ExpantaNum(1e5) },
        color: "#4B4C83",
        resource: "增量", // 重置获得的资源名称
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        passiveGeneration() {

                return 1
        },
        exponent: 0.5,
        baseAmount() { return player.points },//基础资源数量
        baseResource: "点数",//基础资源名称
        gainMult() { // 资源获取数量倍率
                mult = new ExpantaNum(1)
                return mult
        },
        gainExp() { // 资源获取指数加成(与exponent相乘)
                var exp = new ExpantaNum(1)
                return exp
        },
        layerShown() { return inChallenge("t", 11) },
        row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
        buyables: {
                11: {
                        cost(x = getBuyableAmount(this.layer, this.id)) {
                                var c = n("10").mul(n(hasUpgrade("i", 22) ? 0.99 : 1.98).pow(x)).mul(n(1.01).pow(x.pow(2)))

                                return c
                        },
                        display() { return `增量获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}增量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                        canAfford() { return player.i.points.gte(this.cost()) },
                        buy() {
                                player.i.points = player.i.points.sub(this.cost())
                                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        },
                        title() {
                                return "增量速度"
                        },
                        effect(x = getBuyableAmount(this.layer, this.id)) {
                                var eff = n(hasUpgrade("i", 34) ? 1.5 + getBuyableAmount("i", 11) * 0.01 : 1.5).pow(x)

                                return eff
                        },
                        unlocked() { return hasUpgrade("i", 12) },
                },
                12: {
                        cost(x = getBuyableAmount(this.layer, this.id)) {
                                var c = n("1e4").mul(n(hasUpgrade("i", 23) ? 1 : 4).pow(x)).mul(n(1.25).pow(x.pow(2)))
                                if (hasUpgrade("a1", 32)) c = c.root(upgradeEffect("a1", 32))
                                return c
                        },
                        display() { return `增量获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}增量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                        canAfford() { return player.i.points.gte(this.cost()) },
                        buy() {
                                player.i.points = player.i.points.sub(this.cost())
                                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        },
                        title() {
                                return "增量强度"
                        },
                        effect(x = getBuyableAmount(this.layer, this.id)) {
                                var eff = n(hasUpgrade("i", 33) ? 2 + getBuyableAmount("i", 12) * 0.02 : 2).pow(x)

                                return eff
                        },
                        unlocked() { return hasUpgrade("i", 13) },
                },
                13: {
                        cost(x = getBuyableAmount(this.layer, this.id)) {
                                var c = n("1e5").mul(n(hasUpgrade("i", 24) ? 1 : 2).pow(x)).mul(n(1.25).pow(x.pow(2))).mul(n(hasUpgrade("i", 31) ? 1 : 1.5).pow(n(1.45).pow(x)))

                                return c
                        },
                        display() { return `增量基础获取<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}增量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                        canAfford() { return player.i.points.gte(this.cost()) },
                        buy() {
                                player.i.points = player.i.points.sub(this.cost())
                                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        },
                        title() {
                                return "增量耐性"
                        },
                        effect(x = getBuyableAmount(this.layer, this.id)) {
                                var eff = n(1.05).pow(x)
                                if (eff.gte(10)) eff = eff.pow(0.5).mul(n(10).root(2))
                                return eff
                        },
                        unlocked() { return hasUpgrade("i", 14) },
                },
        },
        upgrades: {
                11: {

                        description: "点数获得量乘以增量数量",
                        cost: n(2),
                        effect() {
                                let eff = player.i.points.plus(1)
                                if (hasUpgrade("i", 21)) eff = eff.pow(2)
                                if (hasUpgrade("i", 24)) eff = eff.pow(buyableEffect('i', 13))
eff=eff.pow(buyableEffect('csm', 11))
                                return eff
                        },
                        unlocked() {
                                return true
                        },
                        effectDisplay() { return `x ${format(this.effect())}` },

                },
                12: {

                        description: "解锁第一个可重复购买项，每购买一个这一行的升级，增量获得量乘 1.1",
                        cost: n(30),
                        unlocked() {
                                return hasUpgrade("i", 11)
                        },
                },
                13: {

                        description: "解锁第二个可重复购买项",
                        cost: n(10000),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(10)
                        },
                },
                14: {

                        description: "解锁第三个可重复购买项",
                        cost: n(200000),
                        unlocked() {
                                return getBuyableAmount("i", 12).gte(3)
                        },
                },
                21: {

                        description: "第一个升级的效果变成原来的平方",
                        cost: n(200000),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(15)
                        },
                },
                22: {

                        description: "好像到不了原版的下一个升级了,看看任务吧 移除“增量速度”价格的线性增长",
                        cost: n(1.5e8),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(19)
                        },
                },
                23: {

                        description: "移除“增量强度”价格的线性增长",
                        cost: n(1e19),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(65)
                        },
                },
                24: {

                        description: "移除“增量耐性”价格的线性增长,同时,它对I层级升级11生效",
                        cost: n(1e20),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(67)
                        },
                },
                31: {

                        description: "移除“增量耐性”价格的超指数增长",
                        cost: n(1e21),
                        unlocked() {
                                return getBuyableAmount("i", 12).gte(14)
                        },
                },
                32: {

                        description: "任务46奖励在增量耐性之前生效",
                        cost: n(1e24),
                        unlocked() {
                                return getBuyableAmount("i", 12).gte(15)
                        },
                },
                33: {

                        description: "每获得一个“增量强度”， “增量强度”效果的底数加 0.02",
                        cost: n(1e27),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(78)
                        },
                },
                34: {

                        description: "每获得一个“增量速度”， “增量速度”效果的底数加 0.01",
                        cost: n(1e29),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(81)
                        },
                },
                41: {

                        description: "增量数量提升增量获得量",
                        cost: n(1e123),
                        effect() {
                                let exp = 1
                                return player.i.points.plus(10).log10().pow(exp)
                        },
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(169)
                        },
                        effectDisplay() { return `x ${format(this.effect())}` },
                },
                42: {

                        description: "三倍的增量获得量",
                        cost: n(1e130),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(174)
                        },
                },
                43: {

                        description: "解锁新的增量升级",
                        cost: n(1e134),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(177)
                        },
                },
                15: {

                        description: "基础增量获得量乘以“增量强度”的等级",
                        cost: n(1e135),
                        unlocked() {
                                return hasUpgrade("i", 43)
                        },
                },
                25: {

                        description: "基础增量获得量乘以“增量耐性”的等级",
                        cost: n(1e177),
                        unlocked() {
                                return getBuyableAmount("i", 12).gte(43)
                        },
                },
                35: {

                        description: "基础增量获得量乘以“增量速度”的等级",
                        cost: n(1e248),
                        unlocked() {
                                return getBuyableAmount("i", 11).gte(241)
                        },
                },
                44: {

                        description: "I层级升级12对基础增量获得量生效",
                        cost: n("1e355"),
                        unlocked() {
                                return getBuyableAmount("i", 13).gte(61)
                        },
                },
        },
        tabFormat: {
                "主菜单": {
                        content: ["main-display",

                                ["display-text",
                                        function () {

                                                return "你每秒获得 " + format(layers.i.getResetGain()) + " 增量,购买项达到一定等级解锁升级"

                                        },
                                        { "font-size": "20px" }
                                ],

                                "blank",
                                "buyables",
                                "blank",
                                "upgrades"],
                        unlocked() {
                                return true
                        },
                },
                "详情": {
                        content: [
                                "main-display",
                                ["display-text", function () {
                                        return "增量基础获得量的公式是 log10(点数)-3, 低于1e4点数时为零，"
                                }],
                                ["display-text", function () {
                                        return "这一数字受提高增量基础获得量的升级的影响，效果为累乘，"
                                }],
                                ["display-text", function () {
                                        return "然后这一数量变为它的“增量耐性”次方，"
                                }],
                                ["display-text", function () {
                                        return "最后受提高增量获得量的升级的影响，效果为累乘。"
                                }],

                        ],
                        unlocked() {
                                return true
                        },
                },
        },

        getResetGain() {
                var gain = player.points.log10().sub(3)

                //基础
                if (hasAchievement("rw", 46) && hasUpgrade("i", 32)) gain = gain.mul(player.i.points.add(10).log10())
                if (hasUpgrade("i", 15)) gain = gain.mul(getBuyableAmount("i", 12).add(1))
                if (hasUpgrade("i", 25)) gain = gain.mul(getBuyableAmount("i", 13).add(1))
                if (hasUpgrade("i", 35)) gain = gain.mul(getBuyableAmount("i", 11).add(1))
                if (hasUpgrade("i", 12) && hasUpgrade("i", 44)) gain = gain.mul(n(1.1).pow(player.i.upgrades.length))
                gain = gain.pow(buyableEffect('i', 13))
                //乘数
                if (hasUpgrade("i", 12)) gain = gain.mul(n(1.1).pow(player.i.upgrades.length))
                if (hasAchievement("rw", 46) && !hasUpgrade("i", 32)) gain = gain.mul(player.i.points.add(10).log10())
                if (hasAchievement("rw", 53)) gain = gain.mul(buyableEffect('a1', 11))
                gain = gain.mul(buyableEffect('i', 11))
                gain = gain.mul(buyableEffect('i', 12))
                if (hasUpgrade("i", 41)) gain = gain.mul(upgradeEffect("i", 41))

                if (hasUpgrade("i", 42)) gain = gain.mul(3)
                if (hasChallenge("cq", 22)) gain = gain.mul(3 ** player.cq.challenges[22])
                if (hasMilestone("t", 12)) gain = gain.mul(n(1.1).pow(buyableEffect("t", 11)))
                if (hasAchievement("rw", 65)) gain = gain.pow(1.05)
                gain = gain.mul(layers.csm.effect())
                //传送门
                if (player.csm.points.gte(1)) gain = expPow(gain.mul(10), 0.9)
                if (player.points.lt(1e4)||!inChallenge("t", 11)) gain = n(0)
               gain=gain.min(layers.csm.getNextAt())

                return gain.floor()
        },
        update(diff) {
                if (hasUpgrade("cq", 65) && player.i.points.sub(1).gte(n(1e5).mul(n(1.25).pow(getBuyableAmount("i", 13).pow(2))))) setBuyableAmount('i', 13, getBuyableAmount('i', 13).add(1))
                if (hasAchievement("rw", 67) && player.i.points.sub(1).gte(n(1e4).mul(n(1.25).pow(getBuyableAmount("i", 12).pow(2))).root(upgradeEffect("a1", 32)))) setBuyableAmount('i', 12, getBuyableAmount('i', 12).add(1))
                if (hasAchievement("rw", 74) && player.i.points.sub(1).gte(n(10).mul(n(0.99).pow(getBuyableAmount("i", 11))).mul(n(1.01).pow(getBuyableAmount("i", 11).pow(2))))) setBuyableAmount('i', 11, getBuyableAmount('i', 11).add(1))
        },
        autoUpgrade() { return hasAchievement("rw", 62) },
})