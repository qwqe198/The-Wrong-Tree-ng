addLayer("a1", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `A`, // 这是节点上显示的字母
    position: 2, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum("1e8")},
    color: "#BB4C83",
    resource: "变形虫", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
     

    
        return 0
    },

    effectDescription(){return `副本1:变形虫（推荐战力:25）：来自转生链的弱小怪物，但是一群变形虫是很难缠的，击杀它的难度与同时击杀的数量10次方成正比<br>
生命和血量获取x${format(this.effect())}.`},
    effect(){let eff= player.a1.points.add(1).pow(0.5)

        return eff         
                },
    exponent:0.1,
    baseAmount(){return player.cq.hp},//基础资源数量
    baseResource:"血量",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
              if(hasUpgrade("a1",13)) mult = mult.mul(upgradeEffect("a1",13))
              if(hasUpgrade("a1",14)) mult = mult.mul(upgradeEffect("a1",14))
     if(hasAchievement("rw",41)) mult = mult.mul(1.2)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        
        return exp
    },
    layerShown(){return hasMilestone("cq",20)},
    row: 100, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    doReset(resettingLayer){
       player.cq.hp=n(0)
    },
     upgrades: {
        11: {
            description: "变形虫加成点数.",
  effect(){
                var eff = player.a1.points.add(1).pow(2)
               if(hasAchievement("rw",37)) eff = eff.pow(player.a1.upgrades.length)
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(2),
                       unlocked(){return true},
           
        },
        12: {
            description: "每个变形虫升级使点数^1.01.",
 effect(){
                var eff = n(1.01).pow(player.a1.upgrades.length)

                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
             cost:n(15),
            unlocked(){return true},
           
        },
        13: {
            description: "每个变形虫升级使变形虫x1.2.",
 effect(){
                var eff = n(1.2).pow(player.a1.upgrades.length)

                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
             cost:n(100),
            unlocked(){return true},
           
        },
        14: {
            description: "变形虫加成自身.",
 effect(){
                var eff = player.a1.points.add(10).log10()

                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
             cost:n(300),
            unlocked(){return true},
           
        },
 15: {
            description: "解锁0.5个变形虫可购买.",
 
             cost:n(1000),
            unlocked(){return true},
           
        },
   },


  


    },
)