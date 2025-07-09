addLayer("i", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `I`, // 这是节点上显示的字母
    position: 3, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum(1e5)},
    color: "#4B4C83",
    resource: "增量", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){

        return 1
    },
 exponent:0.5,
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    layerShown(){return true},
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("10").mul(n(1.98).pow(x)).mul(n(1.01).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `增量获取<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}增量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.i.points.gte(this.cost()) },
                buy() {
                    player.i.points = player.i.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                title() {
                    return "增量速度"
                }, 
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = n(1.5).pow(x)
                  
                    return eff
                },
                unlocked(){return hasUpgrade("i",12)},
            },},   
  upgrades: {
        11: {

                        description: "点数获得量乘以增量数量",
                        cost: n(2),
                        effect(){
                                let ret = player.i.points.plus(1)
                            
                                return ret
                        },
                        unlocked(){
                                return true
                        },
  effectDisplay(){return `x ${format(this.effect())}`},
           
        },
         12: {
                  
                        description: "解锁第一个可重复购买项，每购买一个这一行的升级，增量获得量乘 1.1",
                        cost: n(30),
                        unlocked(){
                                return hasUpgrade("i",11)
                        },
                },
      
    },
     tabFormat: {
                "主菜单": {
                        content: ["main-display",
                      
                        ["display-text",
                                function() {
                                      
                                        return "你每秒获得 " + format(layers.i.getResetGain()) + " 增量"
                                },
                                {"font-size": "20px"}
                        ],
                   
                        "blank",
                        "buyables", 
                        "blank", 
                        "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "详情":{
                        content: [
                                "main-display",
                                ["display-text", function(){
                                        return "增量基础获得量的公式是 log10(点数)-4, 低于1e5点数时为零，"
                                }],
                                ["display-text", function(){
                                        return "这一数字受提高增量基础获得量的升级的影响，效果为累乘，"
                                }],
                                ["display-text", function(){
                                        return  "然后这一数量变为它的“增量耐性”次方，" 
                                }],
                                ["display-text", function(){
                                        return "最后受提高增量获得量的升级的影响，效果为累乘。"
                                }],
                             
                        ],
                        unlocked(){
                                return true
                        },
                },
        },

    getResetGain(){
        var gain = player.points.log10().sub(4)
if(player.points.lt(1e5))gain=n(0)
if(hasUpgrade("i",12)) gain = gain.mul(n(1.1).pow(player.i.upgrades.length))
if(hasAchievement("rw",46)) gain = gain.mul(player.i.points.add(10).log10())
  gain = gain.mul(buyableEffect('i',11))
     if(!inChallenge("t",11))gain=n(0)
       return gain.floor()
    },
    update(diff){
      


    },
  
})