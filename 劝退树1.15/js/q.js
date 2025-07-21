addLayer("q", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `q`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("1e2714") },
    color: "blue",
    resource: "声望加成", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
    effectDescription() { return `声望点获取^${format(this.effect())}.` },
    effect() {
        let eff = player.q.points.mul(hasUpgrade("q", 12) ? 0.075 : hasUpgrade("q", 11) ? 0.06 : 0.05).add(1)
        if (hasMilestone("t", 9)) eff = eff.pow(1.025)
        return eff
    },
    exponent: 5,
    baseAmount() { return player.a.points },//基础资源数量
    baseResource: "声望点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)
        if (hasMilestone("l", 30)) exp = new ExpantaNum(0.7915)
        return exp
    },
    layerShown() { return hasMilestone("l", 20) || hasMilestone("cq", 1) },
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    upgrades: {
        11: {
            description: "声望加成的效果变得更好.",
            cost() { return new OmegaNum(6) },
            unlocked() { return true },

        },
        12: {
            description: "声望加成的效果变得更好.",
            cost() { return new OmegaNum(9) },
            unlocked() { return true },

        },

    },
    resetsNothing() { return hasUpgrade("cq", 33) },
    autoUpgrade() { return hasUpgrade("cq", 53) },

    autoPrestige() { return hasAchievement("rw", 22) },


})