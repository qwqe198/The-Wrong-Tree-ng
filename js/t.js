addLayer("t", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `塔`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
  
    layerShown(){return true},
    color: "yellow",
    resource: "层", // 重置获得的资源名称
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
      
        return 0
    },
   
  
       buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("1000").mul(n(3).pow(x)).mul(n(1.1).pow(x.pow(2)))
                        c=c.div(player.cq.atk)
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
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = x
                  
                    return eff
                },
                unlocked(){return true},
            },
        },
    exponent:1,
    baseAmount(){return player.cq.hp},//基础资源数量
    baseResource:"血量",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
      
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
       
        return exp
    },
    layerShown(){return hasMilestone("cq",4)},
    row: 100, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

    milestones:{

      
        1:{
            requirementDescription: "1层",
            effectDescription: "点数获取乘(x+1)",
            done() { return buyableEffect("t",11).gte(1) }
        },
        2:{
            requirementDescription: "2层",
            effectDescription: "重置点获取乘(x+1)",
            done() { return buyableEffect("t",11).gte(2) }
        },
        3:{
            requirementDescription: "3层",
            effectDescription: "p层级升级11效果乘(x+1)",
            done() { return buyableEffect("t",11).gte(3) }
        },
        4:{
            requirementDescription: "4层",
            effectDescription: "p层级升级12效果乘(x+1)",
            done() { return buyableEffect("t",11).gte(4) }
        },
        5:{
            requirementDescription: "5层",
            effectDescription: "血量获取乘(x+1)",
            done() { return buyableEffect("t",11).gte(5) }
        },
        6:{
            requirementDescription: "6层",
            effectDescription: "p层级升级13效果乘(x+1)",
            done() { return buyableEffect("t",11).gte(6) }
        },
        7:{
            requirementDescription: "7层",
            effectDescription: "p层级升级14效果乘(x+1)，解锁一个新的试炼",
            done() { return buyableEffect("t",11).gte(7) }
        },
       
    },
   tabFormat: {
        主要: {
            buttonStyle() {return  {'color': 'lightblue'}},
            content:
                ["main-display",
              
                "prestige-button", "resource-display",
                 "buyables",
                "milestones",

                ],},
     
   
   
    },
   
resetsNothing: true,
update(diff){


  
     




},
})