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
if(eff.gte(100))eff=eff.pow(0.5).mul(10)
        return eff         
                },
    exponent:0.1,
    baseAmount(){return player.cq.hp},//基础资源数量
    baseResource:"血量",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
              if(hasUpgrade("a1",13)) mult = mult.mul(upgradeEffect("a1",13))
              if(hasUpgrade("a1",14)) mult = mult.mul(upgradeEffect("a1",14))
    if(hasMilestone("cq",22)) mult = mult.mul(player.cq.hp.pow(0.02))
     if(hasAchievement("rw",41)) mult = mult.mul(1.2)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        
        return exp
    },
    layerShown(){return hasMilestone("cq",20)},
    row: 100, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   
onPrestige(resettingLayer){       player.cq.hp=n(0)
    },
   buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("500").mul(n(2).pow(x)).mul(n(1.001).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `A层级升级11效果<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}变形虫<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.a1.points.gte(this.cost()) },
                buy() {
                    player.a1.points = player.a1.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = n(1.5).pow(x)
                  
                    return eff
                },
                unlocked(){return hasUpgrade("a1",15)},
            },
                  12: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("10000").mul(n(3).pow(x)).mul(n(1.005).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `变形虫获取<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}变形虫<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.a1.points.gte(this.cost()) },
                buy() {
                    player.a1.points = player.a1.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = n(1.1).pow(x)
                  
                    return eff
                },
                unlocked(){return hasUpgrade("a1",22)},
            },
},   


     upgrades: {
        11: {
            description: "变形虫加成点数.",
  effect(){
                var eff = player.a1.points.add(1).pow(hasUpgrade("a1",21)?n(2).add(player.a1.upgrades.length*0.5):2)
eff=eff.mul(buyableEffect("a1",11))
               if(hasAchievement("rw",37)) eff = eff.pow(player.a1.upgrades.length)
if(eff.gte(1e100))eff=expPow(eff.mul(10),0.5).mul("1e90")
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
21: {
            description: "每个变形虫升级增加0.5到变形虫升级11基础指数.",
 
             cost:n(2500),
            unlocked(){return true},
           
        },
22: {
            description: "解锁第二个变形虫可购买.",
 
             cost:n(10000),
            unlocked(){return true},
           
        },
   },
 tabFormat: {
        升级: {
            buttonStyle() {return  {'color': 'lightblue'}},
            content:
                ["main-display",
              
                "prestige-button", "resource-display",
                "upgrades",

                ],},
     
   

        可购买: {
            buttonStyle() {return  {'color': 'lightblue'}},
            unlocked() {return hasUpgrade("a1",15)&&hasMilestone("esc",11)},
            content:
                ["main-display",
                       "prestige-button", "resource-display",
                "buyables",
    
                ],},
    },
 resetsNothing(){return hasAchievement("rw",42)},
  


    },
)