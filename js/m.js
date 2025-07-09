addLayer("m", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `m`, // 这是节点上显示的字母
    position: 2, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum(1e20)},
    color: "#31aeb0",
    resource: "元性质", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
        if(hasMilestone("esc",8) ||hasUpgrade("cq",55))return 10
        return 0
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
    layerShown(){return hasMilestone("esc",7)||hasMilestone("cq",1)},
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    
    effectDescription(){return `51.这是怨怨树吗？基于点数,使重置点获取x${format(this.effect())}.56.滥用双指数软上限.`},
    effect(){let eff= player.points.add(1).pow(buyableEffect('m',11)).log(10).sub(20).max(1)
        if(hasAchievement("rw",14)) eff = eff.pow(1.025)
                 eff=expPow(eff,buyableEffect('m',23))
                
                 if (eff.gte("1e10000"))eff=expPow(expPow(eff,0.5),0.5).mul("1e10000")
                 if (eff.gte("1e15000"))eff=expPow(expPow(eff,0.5),0.5).mul("1e15000")
                 if (eff.gte("1e250000"))eff=expPow(expPow(eff,0.5),0.5).mul("1e250000")
               
        return eff


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
    getResetGain(){
        var gain = player.points.div(1e20).pow(0.5)
       gain=gain.mul(buyableEffect('m',13))
       if(hasMilestone("l",13)) gain = gain.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))
        if(hasMilestone("l",39)) gain = gain.pow(n(hasMilestone("l",40)?1.1:1.06).pow(player.l.challenges[11]))
       if(hasMilestone("l",11))  gain=gain.pow(1.05)
       if(hasMilestone("l",21))  gain=gain.pow(1.05)
       gain=gain.pow(buyableEffect('m',14))
       if(hasChallenge("p",23)) gain = gain.pow(challengeEffect("p",23)) 
       gain = gain.pow((hasMilestone("cq",20)?1:challengeEffect("m",11)+1)**0.01) 
if(hasMilestone("cq",20))gain=gain.pow(1.15)  
       if(gain.gte(1e10)) gain=expPow(gain.mul(10),0.8).add(9.99e9)	
       if(gain.gte("1e7500")&&!hasMilestone("l",36)) gain=expPow(gain.mul(10),0.8).add("1e7500")
       if(gain.gte("1e7500")&&hasMilestone("l",36)) gain=expPow(gain.mul(10),0.8).mul("1e7500")
       if(inChallenge("l",11)) gain = expPow(gain.mul(10),tmp.l.challenges[11].challengeEffect).div(10)
        if(!hasMilestone("esc",7))gain=gain.min(0)  
       return gain.floor()
    },
    update(diff){
      

        if(hasMilestone("l",2)&&player.m.points.sub(1).gte(n("1").mul(n(2).pow(getBuyableAmount("m",11))).mul(n(1.01).pow(getBuyableAmount("m",11).pow(2))).pow(hasMilestone("l",14)?25:1)))setBuyableAmount('m',11,getBuyableAmount('m',11).add(hasMilestone("esc",9)?10:1))    
        if(hasMilestone("l",3)&&player.m.points.sub(1).gte(n("20").mul(n(3).pow(getBuyableAmount("m",12))).mul(n(1.02).pow(getBuyableAmount("m",12).pow(2)))))setBuyableAmount('m',12,getBuyableAmount('m',12).add(hasMilestone("esc",9)?10:1))    
        if(hasMilestone("l",4)&&player.m.points.sub(1).gte(n(hasMilestone("l",25)?1:1e200).mul(n(10).pow(getBuyableAmount("m",13))).mul(n(1.1).pow(getBuyableAmount("m",13).pow(2))).pow(hasMilestone("l",23)?20:1)))setBuyableAmount('m',13,getBuyableAmount('m',13).add(1))  
        if(hasMilestone("l",5)&&player.m.points.sub(1).gte(n("1e229").mul(n(1e10).pow(getBuyableAmount("m",14))).mul(n(10).pow(getBuyableAmount("m",14).pow(2)))))setBuyableAmount('m',14,getBuyableAmount('m',14).add(1))       
        if(hasMilestone("l",6)&&player.m.points.sub(1).gte(n("1e845").mul(n(1e15).pow(getBuyableAmount("m",21))).mul(n(50).pow(getBuyableAmount("m",21).pow(2)))))setBuyableAmount('m',21,getBuyableAmount('m',21).add(1))         
        if(hasMilestone("l",7)&&player.m.points.sub(1).gte(n("1e925").mul(n(1e20).pow(getBuyableAmount("m",22))).mul(n(100).pow(getBuyableAmount("m",22).pow(2)))))setBuyableAmount('m',22,getBuyableAmount('m',22).add(1))      
        if(hasMilestone("l",8)&&player.m.points.sub(1).gte(n("1e1100").mul(n(10000).pow(getBuyableAmount("m",23))).mul(n(10).pow(getBuyableAmount("m",23).pow(2)))))setBuyableAmount('m',23,getBuyableAmount('m',23).add(1))        
        if(hasMilestone("l",9)&&player.m.points.sub(1).gte(n("1e1130").mul(n(1e7).pow(getBuyableAmount("m",24))).mul(n(100000).pow(getBuyableAmount("m",24).pow(2)))))setBuyableAmount('m',24,getBuyableAmount('m',24).add(1))                                                                                                                                                                                                                                                        
    },
    buyables:{
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(1).mul(n(2).pow(x)).mul(n(1.01).pow(x.pow(2)))
                if(hasMilestone("l",14)) c = c.pow(25)
                return c
            },
            display() { return `52.只有一开始和最后一点点有用.指数增福点数在公式中的效果.<br />^${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "元空间升级"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.mul(1.6).add(1).root(3.6)
                if(hasMilestone("l",14))eff = eff.pow(100)
                return eff
            },
            unlocked(){return true},
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(20).mul(n(3).pow(x)).mul(n(1.02).pow(x.pow(2)))
                return c
            },
            display() { return `点数增福点数.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "点数浓缩"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = player.points.add(10).log10().pow(x.mul(buyableEffect('m',22)).mul(2))
                if(hasMilestone("l",15))eff = eff.pow(1.5)
                return eff
            },
            unlocked(){return true},
        },        
        13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasMilestone("l",25)?1:1e200).mul(n(10).pow(x)).mul(n(1.1).pow(x.pow(2)))
                if(hasMilestone("l",23))c = c.pow(20)
                return c
            },
            display() { return `元性质增福元性质.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "元性质浓缩"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = player.m.points.add(10).log10().pow(x.mul(buyableEffect('m',21)).mul(2))
                if(hasMilestone("l",24))eff = eff.pow(15)
                return eff
            },
            unlocked(){return true},
        },     
        14: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(1e229).mul(n(1e10).pow(x)).mul(n(10).pow(x.pow(2)))
                return c
            },
            display() { return `增福元性质获取.<br />^${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "元性质增幅器"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(4)
              
                return eff
            },
            unlocked(){return true},
        },    
        21: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e845").mul(n(1e15).pow(x)).mul(n(50).pow(x.pow(2)))
                return c
            },
            display() { return `53.字的顺序错了.浓缩元性质增幅浓缩元性质.<br />x${format(buyableEffect(this.layer,this.id),2)}浓缩元性质等级.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "浓缩元性质浓缩"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = getBuyableAmount("m", 12).add(1).log10().mul(0.05).add(1).pow(x.root(6))
           
                return eff
            },
            unlocked(){return true},
        },         
        22: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e925").mul(n(1e20).pow(x)).mul(n(100).pow(x.pow(2)))
                return c
            },
            display() { return `54.没考虑膨胀.基于重置点倍增点数浓缩.<br />x${format(buyableEffect(this.layer,this.id),2)}点数浓缩等级.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "加速子"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff =  player.p.points.add(1).log10().add(1).log10().mul(0.05).add(1).pow(x.root(11))
           
                return eff
            },
            unlocked(){return true},
        },         
        23: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e1100").mul(n(10000).pow(x)).mul(n(10).pow(x.pow(2)))
                return c
            },
            display() { return `55.逆天效果配逆天软上限.元性质效果指数.<br />^${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "元化元"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff =  x.root(2).add(1).mul(buyableEffect('m',24))
           
                return eff
            },
            unlocked(){return true},
        },         
        24: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e1130").mul(n(1e7).pow(x)).mul(n(100000).pow(x.pow(2)))
                return c
            },
            display() { return `基于点数和加速子强度加成元化元.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "57.借鉴不检查名称适配性.点数扭曲"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff =  player.points.add(1).log10().add(1).log10().mul(0.05).mul(buyableEffect('m',22)).add(1).pow(x.root(2))
           
                return eff
            },
            unlocked(){return true},
        },         
    },
    challenges: {
        11: {
            name: '点数奇点',
            challengeDescription: '点数获取指数变为其8次根.你基于挑战中取得的最高点数获得加成.',
            rewardDescription() { return `当前最高${format(this.rewardEffect())},元性质获取^${format((this.rewardEffect()+1)**0.01)}` },
            rewardEffect() {
                var eff =   new OmegaNum (player.m.challenges[11])

                return eff
            },
            goal: 0,
            onExit(){
             player.m.challenges[11]=player.points.max(challengeEffect("m",11)).max(1)
         
             
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.points },
            unlocked() { return   upgradeEffect("p",25).gte(8)&&!hasMilestone("cq",20)},
        },
    },
    doReset(resettingLayer){
        if(layers[resettingLayer].row > layers[this.layer].row){
            let kept = ["unlocked","auto"]
            if(resettingLayer == "l" && hasMilestone("l", 28) ){
                kept.push("challenges")
            }
            layerDataReset(this.layer,kept)
        }
    },
})