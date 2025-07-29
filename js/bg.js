addLayer("bg", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "BG", // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
gp:new ExpantaNum(0),
        }
    },
        getNextAt() {
                let gain = n("1e9").mul(n("10").pow(player.bg.points.pow(1.5)))

                return gain
        },
    requires() { return new ExpantaNum("1e9") },
    color: "#00FFFF",
    resource: "增幅器和生成器", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
    effectDescription() { return `I层级升级11效果^${format(this.effect())}<br>你有${format(player.bg.gp)}gp,I层级升级11效果^${format(this.gpeff())}.` },
    effect() {
        let eff = n(2).pow(player.bg.points)
if(player.bg.points.lt(2))eff=n(1)
        return eff
    },
gpgain() {
        let eff = player.bg.points.pow(2)

        return eff
    },
gpeff() {
        let eff = player.bg.gp.add(10).log10()
if(player.bg.points.lt(2))eff=n(1)
        return eff
    },
    exponent: 5,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)

        return exp
    },
    layerShown() { return inChallenge("t", 11) &&player.csm.points.gte(2) },
    row: "side", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
clickables: {
    11: {
        display() {return `重置需要${format(n("1e9").mul(n("10").pow(player.bg.points.pow(1.5))))}点数`},
      canClick(){return player.points.gte(n("1e9").mul(n("10").pow(player.bg.points.pow(1.5))))},
onClick(){ 
player.points=n(0)
player.bg.points=player.bg.points.add(1)
},

    }

},
        update(diff) {
                player.bg.gp =  player.bg.gp.add(this.gpgain().mul(diff))

        },
  
})