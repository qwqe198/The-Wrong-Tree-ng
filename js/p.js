addLayer("p", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "P", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
        e0:n(0),
        e1:n(0),
        e2:n(0),
        e3:n(0),
        e4:n(0),
        e5:n(0),
        e6:n(0),
        e7:n(0),
        e8:n(0),
        e9:n(0),
    }},
    autoUpgrade(){return hasMilestone("esc",6)},
    autoChallenge(){return hasMilestone("esc",9)},
    color: "lime",
    resource: "重置点", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires(){return new ExpantaNum(1)},
    exponent:0.25,
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        var upgID = [14,15]
	    for(i in upgID){
		    i = upgID[i]
		    if(hasUpgrade("p",i)) mult = mult.mul(upgradeEffect("p",i))
	    }
        if(hasUpgrade("cq",12)) mult = mult.mul(5)
        if(hasMilestone("t",2)) mult = mult.mul(buyableEffect("t",11).add(1))     
        if(hasUpgrade("cq",14)) mult = mult.mul(upgradeEffect("cq",14))
        if(hasUpgrade("cq",23)) mult = mult.mul(upgradeEffect("cq",23))
        if(hasUpgrade("p",51)) mult = mult.mul(upgradeEffect("p",51))
        if(hasUpgrade("p",32)) mult = mult.mul(layers.p.effect())
        if(hasUpgrade("esc",12)||inChallenge("cq",11)) mult = mult.mul(layers.esc.effect())
        if(hasMilestone("esc",7))  mult = mult.mul(layers.m.effect())
        if(hasMilestone("l",13)) mult= mult.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))
            if(hasUpgrade("cq",25)) mult = mult.pow(1.01)
 if(inChallenge("cq",21)) mult = mult.pow((2**(player.cq.challenges[21]+1))  ) 
        if(player.q.points.gte(1)&&hasMilestone("l",22)&&inChallenge("l",11)) mult = mult.pow(layers.q.effect())        
        if(inChallenge("l",11)) mult = expPow(mult.mul(10),tmp.l.challenges[11].challengeEffect).div(10)
	if(inChallenge("cq",13)) mult = expPow(mult.mul(10),n(0.99).pow((player.cq.challenges[13]+1)*3).mul(10000).floor().div(10000) ).div(10)	
        if(hasMilestone("esc",7)) mult = expPow(mult.mul(10),0.8).div(10)	
        if(mult.gte("1e13000")) mult=expPow(mult.mul(10),0.8).mul("1e11045")	
        if(mult.gte("1e25000")) mult=expPow(mult.mul(10),0.8).mul("1e21700")	         
        if(inChallenge("p",21)) mult = mult.div(player.p.points.mul(player.points.pow(0.1).add(1)).add(1)) 
        if(inChallenge("p",21)) mult = mult.root(player.p.upgrades.length^0.2) 
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        if(hasUpgrade("p",22)) exp = exp.mul(upgradeEffect("p",22).add(1))
            if(hasUpgrade("esc",11)) exp = exp.mul(1.01)   
            if(inChallenge("p",22)) exp = exp.mul(0.66)      
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
    effectDescription(){return `
        这是一个集合了很多劝退方法的树.如果你玩不下去,那简直太正常了.这个树的主要目的是为了防止群友作者继续踩坑.(不是<br>
        每一个劝退方法持续到有文字说明其结束.<br>
        0.不合理的平衡使玩家游玩体验跌宕起伏
        1.开局资源获取指数太低,导致挂机收益极低. 3.在此基础上没有快捷键和手机qol.
        ${hasUpgrade("p",32)?`<br><br>重置能量:${format(player.p.e0)}(${format(upgradeEffect('p',32))}/s),使得重置点获取*${format(this.effect())}`:``}
        ${buyableEffect('p',13).gte(1)?`<br><br>一重压缩能量:${format(player.p.e1)}(${format(player.p.e0.pow(1/9).div(100).mul(this.condenseEffect(player.p.e2)))}/s),使得重置能量获取*${format(this.condenseEffect(player.p.e1))}`:``}
        ${buyableEffect('p',13).gte(2)?`<br><br>二重压缩能量:${format(player.p.e2)}(${format(player.p.e1.pow(1/9).div(100).mul(this.condenseEffect(player.p.e3)))}/s),使得一重压缩能量获取*${format(this.condenseEffect(player.p.e2))}`:``}
        ${buyableEffect('p',13).gte(3)?`<br><br>三重压缩能量:${format(player.p.e3)}(${format(player.p.e2.pow(1/9).div(100).mul(this.condenseEffect(player.p.e4)))}/s),使得二重压缩能量获取*${format(this.condenseEffect(player.p.e3))}`:``}
        ${buyableEffect('p',13).gte(4)?`<br><br>四重压缩能量:${format(player.p.e4)}(${format(player.p.e3.pow(1/9).div(100).mul(this.condenseEffect(player.p.e5)))}/s),使得三重压缩能量获取*${format(this.condenseEffect(player.p.e4))}`:``}
        ${buyableEffect('p',13).gte(5)?`<br><br>五重压缩能量:${format(player.p.e5)}(${format(player.p.e4.pow(1/9).div(100).mul(this.condenseEffect(player.p.e6)))}/s),使得四重压缩能量获取*${format(this.condenseEffect(player.p.e5))}`:``}
        ${buyableEffect('p',13).gte(6)?`<br><br>六重压缩能量:${format(player.p.e6)}(${format(player.p.e5.pow(1/9).div(100).mul(this.condenseEffect(player.p.e7)))}/s),使得五重压缩能量获取*${format(this.condenseEffect(player.p.e6))}`:``}
        ${buyableEffect('p',13).gte(7)?`<br><br>七重压缩能量:${format(player.p.e7)}(${format(player.p.e6.pow(1/9).div(100).mul(this.condenseEffect(player.p.e8)))}/s),使得六重压缩能量获取*${format(this.condenseEffect(player.p.e7))}`:``}
        `},
    effect(){
        var eff = player.p.e0.div(10).add(1).pow(2).pow(hasUpgrade("p",44)?buyableEffect("p",22):1)
        if(hasMilestone("esc",5)) eff = eff.mul(layers.esc.effect())
        
        if(hasUpgrade("a",35)) eff = eff.pow(1.025) 

        if(eff.gte("1e250000"))eff =expPow(eff.mul(10),0.75).div(10).mul("1e240000")        
        return eff
    },
    condenseEffect(x){
        if(!x) return one
        var eff = x.div(10).add(1).pow(2)
        return eff
    },
    upgrades:{
        11:{
            description:`2.已经出现过无数遍的平淡开局.重置点加成点数.`,
            effect(){
                var eff = player.p.points.add(1).pow(0.66)
                if(hasUpgrade("p",21)) eff = eff.mul(upgradeEffect("p",21).add(1))
                    if(hasMilestone("t",3))  eff = eff.mul(buyableEffect("t",11).add(1))   
                var buyablePow = n(1)
                buyablePow = hasUpgThenAdd(buyablePow,this.layer,31)
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow))
                if(inChallenge("p",22)) eff = eff.pow(0.5)   
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(1),
        },
        12:{
            description:`点数加成自身.`,
            effect(){
                var eff = player.points.add(1).log10().add(1)
                if((hasUpgrade("p",25) && !inChallenge("p",11)) || inChallenge("p",12)) eff = expPow(eff.mul(10),2).div(10)
                if(hasChallenge("p",12)) eff = eff.pow(challengeEffect("p",12))
                    if(hasMilestone("t",4))  eff = eff.mul(buyableEffect("t",11).add(1)) 
                var buyablePow = n(1)
                buyablePow = hasUpgThenAdd(buyablePow,this.layer,31)
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow))
                if(hasUpgrade("a",34)) eff =eff.pow(buyableEffect("p",23))
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(4),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(1)},
        },
        13:{
            description:`每个升级使点数*1.75.`,
            effect(){
                var base = n(1.75)
                base = hasUpgThenMul(base,"p",24)
                var eff = base.pow(player.p.upgrades.length)
                var buyablePow = n(1)
                buyablePow = hasUpgThenAdd(buyablePow,this.layer,31)
                if(hasMilestone("t",6))  eff = eff.mul(buyableEffect("t",11).add(1)) 
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow)).pow(hasMilestone("l", 31)?layers.a.effect():1 )
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(16),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(1)},
        },
        14:{
            description:`重置点加成重置点.`,
            effect(){
                var eff = player.p.points.div(16).add(1).cbrt()
                var buyablePow = n(1)
                buyablePow = hasUpgThenAdd(buyablePow,this.layer,31)
                if(hasMilestone("t",7))  eff = eff.mul(buyableEffect("t",11).add(1)) 
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow))
if(inChallenge("cq",21))   eff = n(1)
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(64),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(1)},
        },
        15:{
            description:`点数加成重置点.4.瞬间重置效益远不如等待一小会,并且重置量大.`,
            effect(){
                var eff = player.points.add(10).log10()
                if(hasUpgrade("p",31)) eff = expPow(eff.mul(10),2).div(10)
                var buyablePow = n(1)
                buyablePow = hasUpgThenAdd(buyablePow,this.layer,31)
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow)).pow(buyableEffect("p",23))
                if(inChallenge("p",22)) eff = eff.pow(0.5)   
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(256),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(1)},
        },
        21:{
            description:`6.过多/过强的升级成为仅有的增长方式,且游戏内容变化小时会造成很明显的时间墙.升级11效果+^0.25.`,
            effect(){
                var eff = n(0.25)
                eff = eff.mul(buyableEffect("p",11))
                if(inChallenge("p",22)) eff = eff.mul(0.5)   
                
                return eff.min(0.75)
            },
            effectDisplay(){return `+^ ${format(this.effect())}(硬上限:+^0.75)`},
            cost:n(10086),
            unlocked(){return hasUpgrade(this.layer,15)&&isUnl(1)||isUnl(2)},
        },
        22:{
            description:`劝退1结束.p重置点获取指数+*0.25.`,
            effect(){
                var eff = n(0.25)
                eff = eff.mul(buyableEffect("p",11))
                if(!hasUpgrade("p",55))eff=eff.min(0.75)
                if(hasUpgrade("p",55))eff=eff.mul(hasMilestone("l",34)?0.1:0.06).add(0.75)      
                   
                return eff
            },
            effectDisplay(){return `+* ${format(this.effect())}(硬上限:+*0.75)`},
            cost:n(23333),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(2)},
        },
        23:{
            description:`7.在操作量小时,挑战会完全变成时间墙.解锁一个挑战.`,
            effect(){
                if(!hasUpgrade(this.layer,this.id)) return n(0)
                var eff = n(1)
                eff = eff.mul(buyableEffect("p",11))
                return eff
            },
            effectDisplay(){return `解锁 ${format(this.effect())} 个挑战`},
            cost:n(666666),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(2)},
        },
        24:{
            description:`升级13的底数基于重置点被倍增.`,
            effect(){
                var eff = player.p.points.add(1).log10().div(10).add(1)
                eff = eff.mul(buyableEffect("p",11))  
                if(hasChallenge("p",21)) eff = eff.pow(challengeEffect("p",21))  
                if(hasMilestone("l",42)) eff = eff.mul(buyableEffect("l",11))      
                return eff
            },

            effectDisplay(){return `x${format(this.effect())}`},
            cost:n(1e6),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(2)},
        },
        25:{
            description:`解锁一个可重复购买项.升级12被大幅加成(指数^2,c1挑战内不触发该加强).`,
            effect(){
                if(!hasUpgrade(this.layer,this.id)) return n(0)
                var eff = n(1)
                eff = eff.mul(buyableEffect("p",11))
                return eff
            },
            effectDisplay(){return `解锁 ${format(this.effect())} 个购买项`},
            cost:n(1e8),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(2)},
        },
        31:{
            description:`加强升级15.前五个升级被购买项加成时,效果+^1.5`,
            effect(){
                var eff = n(1.5)
                eff = eff.mul(buyableEffect("p",11))
                eff = eff.mul(buyableEffect("p",21))
                if(hasChallenge('p',13)) eff = eff.mul(challengeEffect('p',13))
                return eff
            },
            effectDisplay(){return `+^ ${format(this.effect())}`},
            cost:n(1e16),
            unlocked(){return hasUpgrade(this.layer,25)&&isUnl(2)||isUnl(3)},
        },
        32:{
            description:`解锁重置能量.重置能量每秒获取量为:重置点^(1/18)/500`,
            effect(){
                var eff = player.points.pow(1/18).div(500)
                if(inChallenge("cq",11)) mult = mult.mul(layers.esc.effect())
                if(hasUpgrade("cq",21)) eff = eff.mul(20)
  if(hasUpgrade("cq",43)) eff = eff.mul(upgradeEffect('cq',43))
  if(hasUpgrade("cq",44)) eff = eff.mul(upgradeEffect('cq',44))
 if(hasUpgrade("cq",45)) eff = eff.mul(upgradeEffect('cq',45))
                eff = eff.mul(buyableEffect("p",12)).mul(layers.p.condenseEffect(player.p.e1))
                if(hasUpgrade('p',34)) eff = eff.mul(upgradeEffect('p',34))
                if(hasMilestone("l",41)) eff= eff.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1)) 
      if(hasAchievement("rw",25)) eff = eff.pow(1.025).mul(1e10)
                return eff
            },
            effectDisplay(){return `+ ${format(this.effect())}/s`},
            cost:n(1e50),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(3)},
        },
        33:{
            description:`15.照抄反物质维度但是不会抄.解锁一个有关压缩能量的购买项,压缩能量公式为x^(1/9)/100,但基于上一级能量.`,
            effect(){
                var eff = one
                return eff
            },
            effectDisplay(){return `+ ${format(this.effect())}`},
            cost:n(1e200),
            unlocked(){return hasUpgrade(this.layer,this.id-1)&&isUnl(3)||isUnl(4)||inChallenge('p',14)},
        },
        34:{
            description:`劝退点小幅度加成重置能量.`,
            effect(){
                var eff = n(1.8).pow(player.esc.points)
                if(hasUpgrade('p',35)) eff = eff.pow(upgradeEffect('p',35).add(1))
                return eff
            },
            effectDisplay(){return `* ${format(this.effect())}`},
            cost:n(1e308),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(4)||inChallenge('p',14)},
        },
        35:{
            description:`第一个购买项加成上一个升级.`,
            effect(){
                var eff = buyableEffect('p',11).sub(1)
                if(hasChallenge('p',14)) eff = eff.mul(challengeEffect('p',14))
                if(hasUpgrade('p',41)) eff = eff.mul(upgradeEffect('p',41))  
                    eff = eff.mul(buyableEffect("p",22))    
                return eff
            },
            effectDisplay(){return `+^ ${format(this.effect())}`},
            cost:n('1e450'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(4)||inChallenge('p',14)},
        },
        41:{
            description:`23.需要玩家硬等的缓慢膨胀.第五个购买项加成上一个升级.`,
            effect(){
                var eff = buyableEffect('p',21)
                if(hasUpgrade('p',42)) eff = eff.mul(upgradeEffect('p',42))  
                    eff = eff.mul(buyableEffect("p",22))           
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e1540'),
            unlocked(){return hasUpgrade(this.layer,35)&&isUnl(4)||isUnl(5)},
        },
        42:{
            description:`24.无聊的套娃.第四个购买项加成上一个升级.`,
            effect(){
                var eff = buyableEffect('p',14)
                if(hasUpgrade('p',43)) eff = eff.mul(upgradeEffect('p',43))   
                    eff = eff.mul(buyableEffect("p",22))          
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e1590'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        43:{
            description:`25.更无聊的套娃.第三个购买项加成上一个升级.`,
            effect(){
                var eff = buyableEffect('p',13)
                eff = eff.mul(buyableEffect("p",22))   
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e1640'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        44:{
            description:`28.元元套娃(?)第六个购买项加成重置能量效果`,
            effect(){
                var eff = buyableEffect('p',22)
 
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            cost:n('1e2620'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        45:{
            description:`29.元元元套娃(?)第六个购买项加成第五个购买项效果`,
            effect(){
                var eff = buyableEffect('p',22)
 
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e3140'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        51:{
            description:`32.抄袭数学树的偷懒描述.二重压缩能量并不总是做无用功,二重压缩能量加成重置点获取`,
            effect(){
                var eff = player.p.e2.add(1)
                if(hasUpgrade('a',32)) eff = eff.pow(layers.a.effect())  
                if(eff.gte("1e50000"))  eff =expPow(eff.mul(10),0.8).div(10).mul("1e44250")    
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e3690'),
            unlocked(){return hasUpgrade(this.layer,45)&&isUnl(5)||isUnl(6)},
        },
        52:{
            description:`33.写当前阶段完全没用的东西.三重压缩能量加成重置点获取`,
            effect(){
                var eff = player.p.e3.add(1)
                    
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e3880'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        53:{
            description:`34.没有新意的套娃.第六个购买项指数加成第二个购买项效果`,
            effect(){
                var eff = buyableEffect('p',22)
 
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            cost:n('1e3980'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        54:{
            description:`38.废话描述.第七个购买项的效果以乘数形式的算术平方根加成在第一个购买项的效果为6到7之间且包括6不包括7时的最后一个购买项的效果`,
            effect(){
                var eff = buyableEffect('p',23).pow(0.5)
 
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e6280'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        55:{
            description:`39.只改效果不改描述.升级22的硬上限变成软上限.`,

            cost:n('1e6666'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        61: {
            description: "多好的升级啊 生命获取x10",
            cost(){return new OmegaNum("1e34265")},
            unlocked(){return hasUpgrade("p",55)&&hasMilestone("esc",9)},
            },    
        62: {
            description: "生命获取x50",
            cost(){return new OmegaNum("1e35430")},
            unlocked(){return hasUpgrade("p",61)&&hasMilestone("esc",9)},
            },        
        63: {
            description: "生命获取x250",
            cost(){return new OmegaNum("1e36185")},
            unlocked(){return hasUpgrade("p",62)&&hasMilestone("esc",9)},
            },           
        64: {
            description: "生命获取x1250",
            cost(){return new OmegaNum("1e37500")},
            unlocked(){return hasUpgrade("p",63)&&hasMilestone("esc",9)},
            },     
        65: {
            description: "生命获取x6250",
            cost(){return new OmegaNum("1e38565")},
            unlocked(){return hasUpgrade("p",64)&&hasMilestone("esc",9)},
            },                                                           
    },
    update(diff){
        if(hasUpgrade("p",32)) player.p.e0 = player.p.e0.add(upgradeEffect("p",32).mul(diff))
        for(i=1;i<=buyableEffect('p',13).toNumber();i++) player.p[`e${i}`] = player.p[`e${i}`].add(player.p[`e${i-1}`].pow(1/9).div(100).mul(this.condenseEffect(player.p[`e${i+1}`])).mul(diff))
        if((hasMilestone("esc",7)||hasMilestone("cq",5))&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:1e10).mul(n(hasUpgrade("a",41)?1:1e2).pow(getBuyableAmount("p",11))).mul(n(2).pow(getBuyableAmount("p",11).pow(2)).pow(getBuyableAmount("p",11).gte(130)?getBuyableAmount("p",11).sub(30).mul(0.01):1))))setBuyableAmount('p',11,getBuyableAmount('p',11).add(hasMilestone("l",38)?5:1))
        if((hasMilestone("esc",7)||hasMilestone("cq",6))&&player.p.e0.sub(1).gte(three.pow(getBuyableAmount("p",12)).mul(10).pow(getBuyableAmount("p",12).gte(450)?getBuyableAmount("p",12).sub(350).mul(0.01):1).pow(hasMilestone("l",12)?10:1)))setBuyableAmount('p',12,getBuyableAmount('p',12).add(hasMilestone("esc",9)?10:1))
        if((hasMilestone("esc",7)||hasMilestone("cq",7))&&(player.p[`e${buyableEffect('p',13).toNumber()}`].sub(1)).gte(1e9))setBuyableAmount('p',13,getBuyableAmount('p',13).add(1))
        if((hasMilestone("esc",7)||hasMilestone("cq",8))&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:1e308).mul(n(hasUpgrade("a",41)?1:1e49).pow(getBuyableAmount("p",14))).mul(n(1e4).pow(getBuyableAmount("p",14).pow(2)))))setBuyableAmount('p',14,getBuyableAmount('p',14).add(1))
if((hasMilestone("esc",7)||hasMilestone("cq",9))&&player.p.e0.sub(1).gte(n(hasUpgrade("a",33)?1:1e100).mul(n(hasUpgrade("a",41)?1:1e8).pow(getBuyableAmount("p",21))).mul(n(100).pow(getBuyableAmount("p",21).pow(2)))))setBuyableAmount('p',21,getBuyableAmount('p',21).add(1))
       if((hasMilestone("esc",7)||hasMilestone("cq",10))&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:"1e1800").mul(n(hasUpgrade("a",41)?1:1e25).pow(getBuyableAmount("p",22))).mul(n(10000).pow(getBuyableAmount("p",22).pow(2)))))setBuyableAmount('p',22,getBuyableAmount('p',22).add(1))
if((hasMilestone("esc",7)||hasMilestone("cq",11))&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:"1e5000").mul(n(hasUpgrade("a",41)?1:1e100).pow(getBuyableAmount("p",23))).mul(n(1e10).pow(getBuyableAmount("p",23).pow(2)))))setBuyableAmount('p',23,getBuyableAmount('p',23).add(1)) 
if((hasMilestone("esc",7)||hasMilestone("cq",12))&&player.p.points.sub(1).gte(n("1e10000").mul(n(1e200).pow(getBuyableAmount("p",24))).mul(n(1e20).pow(getBuyableAmount("p",24).pow(2)))))setBuyableAmount('p',24,getBuyableAmount('p',24).add(1))  
      if((hasMilestone("esc",7)||hasMilestone("cq",13))&&player.points.gte("1e5"))player.p.challenges[11]++
if((hasMilestone("esc",7)||hasMilestone("cq",14))&&player.points.gte("1e60"))player.p.challenges[12]++
        if((hasMilestone("esc",7)||hasMilestone("cq",15))&&player.points.gte("1e200"))player.p.challenges[13]++
      if((hasMilestone("esc",7)||hasMilestone("cq",16))&&player.points.gte("1e580"))player.p.challenges[14]++
if((hasMilestone("esc",7)||hasMilestone("cq",17))&&player.points.gte("1e175"))player.p.challenges[21]++
       if((hasMilestone("esc",7)||hasMilestone("cq",18))&&player.points.gte("1e1335"))player.p.challenges[22]++
if((hasMilestone("esc",7)||hasMilestone("cq",19))&&player.points.gte("1e10000"))player.p.challenges[23]++
      
    },
    doReset(l){
        if(layers[l].row<=this.row) return
        layerDataReset(this.layer)
    },

    challenges:{
        11:{
            name: "C-1",
            challengeDescription: "8.点升级是负面效果会使玩家不满.升级12效果反转.(无论是否有升级12)",
            rewardDescription:"9.不上不下的自动化效果使玩家犹豫不得.每秒自动获取12.5%的重置点.10.在内容不多且操作量本身就小时,给予过多的qol和自动化.劝退4结束.",
            goalDescription:"获得1e6点数(在4劝退点后为1e5)",
            canComplete(){return player.points.gte(player.esc.points.gte(4)?1e5:1e6)},
            unlocked(){return hasUpgrade("p",23)},
        },
        12:{
            name: "C-2",
            challengeDescription: "12.过多，过复杂的文字描述会让玩家看不下去.加强后的升级12效果反转.(无论是否有升级12,加强后),13.不告诉玩家进入会重置重置点，造成信息不对等.",
            rewardDescription:"升级12效果再次基于点数被加成.",
            rewardEffect(){
                var eff = player.points.add(1).log10().add(1).log10().add(1).pow(1.125)
                if(hasChallenge("p",22)) eff = eff.pow(challengeEffect("p",22))
                return eff
            },
            rewardDisplay(){return `^${format(this.rewardEffect())}`},
            goalDescription:"获得1e66点数(在4劝退点后为1e60)",
            canComplete(){return player.points.gte(player.esc.points.gte(4)?1e60:1e66)},
            unlocked(){return upgradeEffect('p',23).gte(2)},
            onEnter(){player.p.points = n(0)},
        },
        13:{
            name: "C-3",
            challengeDescription: "16.无聊的挑战.再次加强后的升级12效果反转.(无论是否有升级12,加强后),17.这次会重置更~~~多~~~东西.",
            rewardDescription:"升级31效果基于重置点被加成.",
            rewardEffect(){
                var eff = player.p.points.add(1).log10().add(1).log10().div(10).add(1).pow(3)
                if(hasChallenge("p",22)) eff = eff.pow(challengeEffect("p",22))
                return eff
            },
            rewardDisplay(){return `*${format(this.rewardEffect())}`},
            goalDescription:"获得1e216点数(在4劝退点后为1e200)",
            canComplete(){return player.points.gte(player.esc.points.gte(4)?1e200:1e216)},
            unlocked(){return upgradeEffect('p',23).gte(3)||inChallenge('p',13)},
            onEnter(){
                player.p.points = n(0)
                player.p.e0 = n(0)
                player.p.buyables[11] = zero
            },
        },
        14:{
            name: "C-4",
            challengeDescription: "18.萌新噩梦 这次会重置更~~~~~多~~~~~东西,并且只能购买10个升级.(超出则无法完成挑战)19.什么阴间挑战(?)",
            rewardDescription:"升级35效果基于重置点被加成.",
            rewardEffect(){
                var eff = player.p.points.add(1).log10().add(1).log10().div(16).add(1).pow(3)
                if(hasChallenge("p",22)) eff = eff.pow(challengeEffect("p",22))
                return eff
            },
            rewardDisplay(){return `*${format(this.rewardEffect())}`},
            goalDescription:"获得1e616点数(在4劝退点后为1e580)",
            canComplete(){return player.points.gte(player.esc.points.gte(4)?'1e580':'1e616')&&player.p.upgrades.length <= (hasUpgrade("a",22)?999999:10)},
            unlocked(){return upgradeEffect('p',23).gte(4)||inChallenge('p',14)},
            onEnter(){
                player.p.points = n(0)
                player.p.e0 = n(0)
                player.p.buyables[11] = zero
                player.p.upgrades = []
            },
        },
        21:{
            name: "C-5",
            challengeDescription: "重置点和点数和购买升级数量降低重置点获取.27.这又什么阴间挑战(???)",
            rewardDescription:"升级24效果基于重置点被加成.",
            goalDescription:"获得1e175点数",
            rewardEffect(){
                var eff = player.p.points.add(1).log10().add(1).log10().add(1)
                if(hasChallenge("p",22)) eff = eff.pow(challengeEffect("p",22))
                return eff
            },
            rewardDisplay(){return `^${format(this.rewardEffect())}`},
            canComplete(){return player.points.gte(1e175)},
            unlocked(){return upgradeEffect('p',23).gte(5)},
            onEnter(){
                player.p.points = n(0)
                player.p.e0 = n(0)
                
                player.p.upgrades = [23]
            },
        },
        22:{
            name: "C-6",
            challengeDescription: "35.元劝退.劝退1重新出现且效果增强,劝退2,4,6所对应的升级效果减半,劝退9改为1e-5,劝退26取倒数",
            rewardDescription:"37.这么喜欢元吗?挑战C-2,C-3,C-4,C-5效果基于重置点被加成.",
            goalDescription:"36.不变的目标令人乏味.获得1e1335点数",
            rewardEffect(){
                var eff = player.p.points.add(1).log10().add(1).log10().add(1).pow(0.05).pow(hasUpgrade("a",42)?2:1).pow(hasUpgrade("a",43)?1.5:1).pow(hasUpgrade("a",44)?1.2:1).pow(hasUpgrade("a",45)?1.1:1)

                return eff
            },
            rewardDisplay(){return `*${format(this.rewardEffect())}`},
            canComplete(){return player.points.gte("1e1335")},
            unlocked(){return upgradeEffect('p',23).gte(6)},
            onEnter(){
                player.p.points = n(0)


                player.p.upgrades = [23]
            },
        },
        23:{
            name: "C-7",
            challengeDescription: "61.为什么不设置一个升级呢?这里没有挑战",
            rewardDescription:"元性质获取基于劝退点增加",
            goalDescription:"获得1e10000点数",
            rewardEffect(){
                var eff = player.esc.points.add(1).log10().add(1).pow(0.25)

                return eff
            },
            rewardDisplay(){return `^${format(this.rewardEffect())}`},
            canComplete(){return player.points.gte("1e10000")},
            unlocked(){return upgradeEffect('p',23).gte(7)},
            onEnter(){

            },
        },
    
    },

    buyables:{
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:1e10).mul(n(hasUpgrade("a",41)?1:1e2).pow(x)).mul(n(2).pow(x.pow(2)).pow(getBuyableAmount(this.layer, this.id).gte(130)?getBuyableAmount(this.layer, this.id).sub(30).mul(0.01):1))
                return c
            },
            display() { return `11.在没有第31升级时倍增第31升级效果.倍增前11个升级效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.mul(1.6).add(1).root(hasMilestone("l",33)?3:3.6)
                eff = eff.mul(buyableEffect('p',14))
 if(hasAchievement("rw",24))   eff = eff.mul(1.01)
                if(hasUpgrade("esc",13)) eff = eff.mul(upgradeEffect("esc",13))
                if(hasUpgrade("cq",22)) eff = eff.mul(1.01)      
                if(inChallenge("cq",12)) eff = eff.div(player.cq.challenges[12]*0.2+1.2 )       
                if(eff.gte(7.8)&&!hasMilestone("l",26))eff=eff.mul(0.5).add(3.9)
                if(eff.gte(7.9))eff=eff.mul(0.1).add(7.11)     
                return eff.max(1)
            },
            unlocked(){return upgradeEffect("p",25).gte(1)},
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = three.pow(x).mul(10).pow(getBuyableAmount(this.layer, this.id).gte(450)?getBuyableAmount(this.layer, this.id).sub(350).mul(0.01):1)
                if(hasMilestone("l",12)) c = c.pow(10)
                return c
            },
            display() { return `倍增重置能量.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置能量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.e0.gte(this.cost()) },
            buy() {
                player.p.e0 = player.p.e0.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = n(1.6).pow(x).pow( hasUpgrade(this.layer,53)?buyableEffect('p',22):1)
 if(hasAchievement("rw",24))   eff = eff.pow(1.1)
                if(hasUpgrade("a",25)) eff = eff.pow(upgradeEffect("a",15))
                if(hasMilestone("l",12)) eff = eff.pow(5)
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(2)},
        },
        13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(1e9)
                return c
            },
            display() { return `解锁下一重压缩能量.<br />当前重数:${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}当前最高重压缩能量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}/8` },
            canAfford() {
                return player.p[`e${buyableEffect('p',13).toNumber()}`].gte(this.cost())
            },
            buy() {
                player.p[`e${buyableEffect('p',13).toNumber()}`] = player.p[`e${buyableEffect('p',13).toNumber()}`].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x
                return eff
            },
            purchaseLimit:9,
            unlocked(){return hasUpgrade('p',33)},
        },
        14: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:1e308).mul(n(hasUpgrade("a",41)?1:1e49).pow(x)).mul(n(1e4).pow(x.pow(2)))
                return c
            },
            display() { return `倍增第一个购买项效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(9.6)
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(3)},
        },
        21: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:1e100).mul(n(hasUpgrade("a",41)?1:1e8).pow(x)).mul(n(100).pow(x.pow(2)))
                return c
            },
            display() { return `倍增升级31效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置能量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.e0.gte(this.cost()) },
            buy() {
                player.p.e0 = player.p.e0.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(9.6)
            if(hasUpgrade('p',45)) eff = eff.mul(buyableEffect('p',22))   
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(4)},
        },
        22: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:"1e1800").mul(n(hasUpgrade("a",41)?1:1e25).pow(x)).mul(n(10000).pow(x.pow(2)))
                return c
            },
            display() { return `26.元套娃.倍增升级35到43效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return  player.p.points.gte(this.cost()) },
            buy() {
                player.p.points =  player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(25).pow(hasUpgrade("a",51)?2:1).pow(hasUpgrade("a",52)?1.5:1).pow(hasUpgrade("a",53)?1.2:1).pow(hasUpgrade("a",54)?1.1:1)
                if(hasUpgrade("esc",14)) eff = eff.mul(upgradeEffect("esc",14))
                if(inChallenge("p",22))eff=eff.max(1).min(1).div(x.add(1).root(25))
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(5)},
        },
        23: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:"1e5000").mul(n(hasUpgrade("a",41)?1:1e100).pow(x)).mul(n(1e10).pow(x.pow(2)))
                return c
            },
            display() { return `倍增升级15效果.<br />^${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return  player.p.points.gte(this.cost()) },
            buy() {
                player.p.points =  player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(7).pow(hasUpgrade("a",55)?2:1).pow(hasUpgrade("a",61)?1.5:1).pow(hasUpgrade("a",62)?1.2:1).pow(hasUpgrade("a",63)?1.1:1)
                if(hasUpgrade('p',54)) eff = eff.mul(buyableEffect('p',23).pow(0.5))   
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(6)},
        },
        24: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e10000").mul(n(1e200).pow(x)).mul(n(1e20).pow(x.pow(2)))
                return c
            },
            display() { return `62.这个要8劝退点却提前出现.声望点获取.<br />^${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return  player.p.points.gte(this.cost()) },
            buy() {
                player.p.points =  player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(16.66)
               
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(7)},
        },
    },
    passiveGeneration(){
        if(hasChallenge("p",11)||hasUpgrade("cq",35)) return inChallenge("p",22)?1e-5:hasMilestone("esc",4)?'1':'0.125'
        return 0
    },
   
    getResetGain(){
        var gain = layers[this.layer].baseAmount().div(layers[this.layer].requires()).pow(layers[this.layer].exponent).pow(layers[this.layer].gainExp()).mul(layers[this.layer].gainMult())
        //gain = gain.min(1.79e308)
        return gain.floor()
    },
})
