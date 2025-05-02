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
        if(hasUpgrade("cq",14)) mult = mult.mul(upgradeEffect("cq",14))
        if(hasUpgrade("cq",23)) mult = mult.mul(upgradeEffect("cq",23))
        if(hasUpgrade("p",51)) mult = mult.mul(upgradeEffect("p",51))
        if(hasUpgrade("p",32)) mult = mult.mul(layers.p.effect())
        if(hasUpgrade("esc",12)||inChallenge("cq",11)) mult = mult.mul(layers.esc.effect())
        if(hasMilestone("esc",7))  mult = mult.mul(layers.m.effect())
        if(hasMilestone("l",13)) mult= mult.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))
            if(hasUpgrade("cq",25)) mult = mult.pow(1.01)
        if(player.q.points.gte(1)&&hasMilestone("l",22)&&inChallenge("l",11)) mult = mult.pow(layers.q.effect())        
        if(inChallenge("l",11)) mult = expPow(mult.mul(10),tmp.l.challenges[11].challengeEffect).div(10)	
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
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow))
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
                eff = eff.mul(buyableEffect("p",12)).mul(layers.p.condenseEffect(player.p.e1))
                if(hasUpgrade('p',34)) eff = eff.mul(upgradeEffect('p',34))
                if(hasMilestone("l",41)) eff= eff.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))       
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
            description: "生命获取x10",
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
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:1e10).mul(n(hasUpgrade("a",41)?1:1e2).pow(getBuyableAmount("p",11))).mul(n(2).pow(getBuyableAmount("p",11).pow(2)).pow(getBuyableAmount("p",11).gte(130)?getBuyableAmount("p",11).sub(30).mul(0.01):1))))setBuyableAmount('p',11,getBuyableAmount('p',11).add(hasMilestone("l",38)?5:1))
        if(hasMilestone("esc",7)&&player.p.e0.sub(1).gte(three.pow(getBuyableAmount("p",12)).mul(10).pow(getBuyableAmount("p",12).gte(450)?getBuyableAmount("p",12).sub(350).mul(0.01):1).pow(hasMilestone("l",12)?10:1)))setBuyableAmount('p',12,getBuyableAmount('p',12).add(hasMilestone("esc",9)?10:1))
        if(hasMilestone("esc",7)&&(player.p[`e${buyableEffect('p',13).toNumber()}`].sub(1)).gte(1e9))setBuyableAmount('p',13,getBuyableAmount('p',13).add(1))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:1e308).mul(n(hasUpgrade("a",41)?1:1e49).pow(getBuyableAmount("p",14))).mul(n(1e4).pow(getBuyableAmount("p",14).pow(2)))))setBuyableAmount('p',14,getBuyableAmount('p',14).add(1))
        if(hasMilestone("esc",7)&&player.p.e0.sub(1).gte(n(hasUpgrade("a",33)?1:1e100).mul(n(hasUpgrade("a",41)?1:1e8).pow(getBuyableAmount("p",21))).mul(n(100).pow(getBuyableAmount("p",21).pow(2)))))setBuyableAmount('p',21,getBuyableAmount('p',21).add(1))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:"1e1800").mul(n(hasUpgrade("a",41)?1:1e25).pow(getBuyableAmount("p",22))).mul(n(10000).pow(getBuyableAmount("p",22).pow(2)))))setBuyableAmount('p',22,getBuyableAmount('p',22).add(1))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:"1e5000").mul(n(hasUpgrade("a",41)?1:1e100).pow(getBuyableAmount("p",23))).mul(n(1e10).pow(getBuyableAmount("p",23).pow(2)))))setBuyableAmount('p',23,getBuyableAmount('p',23).add(1)) 
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n("1e10000").mul(n(1e200).pow(getBuyableAmount("p",24))).mul(n(1e20).pow(getBuyableAmount("p",24).pow(2)))))setBuyableAmount('p',24,getBuyableAmount('p',24).add(1))  
        if(hasMilestone("esc",9)&&player.points.gte("1e5"))player.p.challenges[11]++
        if(hasMilestone("esc",9)&&player.points.gte("1e60"))player.p.challenges[12]++
        if(hasMilestone("esc",9)&&player.points.gte("1e200"))player.p.challenges[13]++
        if(hasMilestone("esc",9)&&player.points.gte("1e580"))player.p.challenges[14]++
        if(hasMilestone("esc",9)&&player.points.gte("1e175"))player.p.challenges[21]++
        if(hasMilestone("esc",9)&&player.points.gte("1e1335"))player.p.challenges[22]++
        if(hasMilestone("esc",9)&&player.points.gte("1e10000"))player.p.challenges[23]++
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
            challengeDescription: "18.这次会重置更~~~~~多~~~~~东西,并且只能购买10个升级.(超出则无法完成挑战)19.什么阴间挑战(?)",
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
                if(hasUpgrade("esc",13)) eff = eff.mul(upgradeEffect("esc",13))
                if(hasUpgrade("cq",22)) eff = eff.mul(1.01)      
                if(eff.gte(7.8)&&!hasMilestone("l",26))eff=eff.mul(0.5).add(3.9)
                if(eff.gte(7.9))eff=eff.mul(0.1).add(7.11)     
                return eff
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
        if(hasChallenge("p",11)) return inChallenge("p",22)?1e-5:hasMilestone("esc",4)?'1':'0.125'
        return 0
    },
   
    getResetGain(){
        var gain = layers[this.layer].baseAmount().div(layers[this.layer].requires()).pow(layers[this.layer].exponent).pow(layers[this.layer].gainExp()).mul(layers[this.layer].gainMult())
        //gain = gain.min(1.79e308)
        return gain.floor()
    },
})

var escReq = [1e6,1e18,1e200,'e1000','e2750','e6000','e4350','e7625','e19590','e47137','e999999']
function isUnl(escPointsRequired){
    return player.esc.points.gte(escPointsRequired)
}


addLayer("a", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    autoUpgrade(){return hasMilestone("esc",8)},
    color: "lime",
    resource: "声望点(pp)", // Name of prestige currency
    baseResource: "点数",
    baseAmount() {return player.points},
    requires(){return new ExpantaNum(1e25)},
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        var exp = new ExpantaNum(1)

        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return hasMilestone("esc",6)||hasMilestone("cq",1)},
    effect(){
        var eff = player.a.points.add(1).root(20)
        if(eff.gte(2)) eff = eff.sqrt().mul(1.41)
        if(eff.gte(4)) eff = eff.sqrt().sqrt().sqrt().mul(3.364)  
        if(eff.gte(6)) eff = eff.sqrt().sqrt().sqrt().sqrt().sqrt().mul(5.6732)   
        if(eff.gte(10)) eff = eff.div(2).add(5)       
        if(eff.gte(15)) eff = eff.div(5).add(12)  
        if(eff.gte(25)) eff = eff.div(100).add(24.75)      
        if(hasMilestone("l",29)) eff = eff.mul(n(1.005).pow(player.l.points.add(1).log10().min(50)))
        if(hasAchievement("rw",13)) eff = eff.mul(1.005) 
        return eff
    },
    effectDescription(){return `43.容易混淆的图标.b -> <text style = "color:green">${format(layers.a.effect(),2)}</text>`},
    //clickables: {
        //part1
        //11: {
        //    canClick(){return true},
        //    display() {return `Update the game<br />You've updated ${Utimeformat(player.u.updtime)}.<br /><br />Now you are doing:${updtxt[player.u.doing]}`},
        //    onClick(){player.u.doing = "upd"}
        //},
    //},
    upgrades: {
        11: {
            description: "点数并不是在做无用功.\n点数加成pp获取.",
            cost(){return new OmegaNum(4)},
            unlocked(){return true},
            effect(){
                var baseEff = player.points.div(1e25).pow(0.1)

                if(hasUpgrade("a",15)) baseEff = baseEff.pow(upgradeEffect("a",15))
          
                //sc
                if(baseEff.gt(10)) baseEff = baseEff.log10().pow(1.5).mul(10)
                if(baseEff.gt(100)) baseEff = baseEff.pow(0.5).mul(10)
                if(baseEff.gt(1000)) baseEff = baseEff.pow(0.35).mul(1000**0.65)

                //p22:sin to p11
                if(hasUpgrade("a",12)) baseEff = baseEff.mul(upgradeEffect("a",12))
                if(hasUpgrade("a",14)) baseEff = baseEff.mul(upgradeEffect("a",14))   
                //ac21:/1000
                if(baseEff.gt(10000)) baseEff = baseEff.pow(0.5).mul(100)
                if(baseEff.gt(1e30)) baseEff = baseEff.pow(0.1).mul(1e27)     
                return baseEff.max(1)
            },
            effectDisplay(){return `x${format(upgradeEffect("a",11),1)}`}
        },
      
      
        12: {
            description: "44.用三角函数增加游戏'趣味性'.pp产量<br>x(pp^0.25+1)^<br>(sin(pp^1.5/10)^2).",
            cost(){return new OmegaNum(2048)},
            unlocked(){return hasUpgrade("a",11)},
            effect(){
                var baseEff = player.a.points.pow(0.25).add(1)
             
                if(!hasUpgrade("a",21)) baseEff = baseEff.pow(Math.sin(player.a.points.pow(1.5).div(10).mod(360).toNumber())**2)
                if(hasUpgrade("a",21)) baseEff = baseEff.pow((player.esc.points.pow(1.5).div(10).toNumber())**2)
                if(hasUpgrade("a",15)) baseEff = baseEff.pow(upgradeEffect("a",15))

                if(baseEff.gt(1e100)){
                    var sc = 4
                  
                    baseEff = baseEff.root(sc).mul(1e100**(1-1/sc))
                }
                if(baseEff.gt(1e10000)){
                    var sc = 3
                    baseEff = baseEff.root(sc).mul(1e10000**(1-1/sc))
                }
                if(baseEff.gt(1e50000)) baseEff = baseEff.log10().mul(2).pow(50000)
                return baseEff.max(1)
            },
            effectDisplay(){return `x${format(upgradeEffect("a",12),1)}`}
        },
     
     
        13: {
            description: "来点更有意思的.p12一定程度上加成p11.",
            cost(){return new OmegaNum(10000086)},
            unlocked(){return hasUpgrade("a",12)},
            effect(){
                var baseEff = upgradeEffect("a",12)
                baseEff = baseEff.log10().add(1).pow(2)

                if(hasUpgrade("a",15)) baseEff = baseEff.pow(upgradeEffect("a",15))
             
             
          
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect("a",13),1)}`}
        },
        14: {
            description: "p12,p13加成p11...?",
            cost(){return new OmegaNum(1e11)},
            unlocked(){return hasUpgrade("a",13)},
            effect(){
                var baseEff = upgradeEffect("a",12).mul(upgradeEffect("a",13))
              
                if(hasUpgrade("a",15)) baseEff = baseEff.pow(upgradeEffect("a",15))
           
           
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect("a",14),1)}`}
        },
        15: {
            description: "前边所有升级的效果+^0.2.所有.最先计算.",
            cost(){return new OmegaNum(3e11)},
            unlocked(){return hasUpgrade("a",14)},
            effect(){
                var baseEff = new ExpantaNum(.2)
                if(hasUpgrade("a",23))baseEff = baseEff.mul(buyableEffect("p",21))
                if(hasUpgrade("a",24))baseEff = baseEff.mul(buyableEffect("p",14))
                if(hasUpgrade("a",31))baseEff = baseEff.mul(buyableEffect("p",22))       
                return baseEff.add(1)
            },
            effectDisplay(){return `^${format(upgradeEffect("a",15),2)}`}
        },
        21: {
            description: "45.公式用一下就不用了.修改升级12公式x(pp^0.25+1)^<br>((esc^1.5/10)^2)",
            cost(){return new OmegaNum(1e12)},
            unlocked(){return hasUpgrade("a",15)},
            },
        22: {
            description: "46.一刀切的补救.挑战C-4不再限制升级数量",
            cost(){return new OmegaNum(5e44)},
            unlocked(){return hasUpgrade("a",21)},
            },
        23: {
            description: "p层级第五个购买项加成升级15效果",
            cost(){return new OmegaNum(1e48)},
            unlocked(){return hasUpgrade("a",22)},
            },    
        24: {
            description: "p层级第四个购买项加成升级15效果",
            cost(){return new OmegaNum(1e51)},
            unlocked(){return hasUpgrade("a",23)},
            },
        25: {
            description: "升级15加成p层级第二个购买项效果",
            cost(){return new OmegaNum(1e54)},
            unlocked(){return hasUpgrade("a",24)},
            },   
        31: {
            description: "47.这是套娃树吗?p层级第六个购买项加成升级15效果",
            cost(){return new OmegaNum(1e95)},
            unlocked(){return hasUpgrade("a",25)},
            }, 
        32: {
            description: "48.这什么b升级?b加成p层级升级51效果",
            cost(){return new OmegaNum(1e115)},
            unlocked(){return hasUpgrade("a",31)},
            },      
        33: {
            description: "49.学一下增量宇宙树.移除p层级前7个购买项的常数项价格",
            cost(){return new OmegaNum(1e121)},
            unlocked(){return hasUpgrade("a",32)},
            },      
        34: {
            description: "p层级第七个购买项加成升级12效果",
            cost(){return new OmegaNum(5e125)},
            unlocked(){return hasUpgrade("a",33)},
            },      
        35: {
            description: "50.水了三行升级的作者态度也太不认真了叭(?)重置能量效果^1.025",
            cost(){return new OmegaNum(1e128)},
            unlocked(){return hasUpgrade("a",34)},
            },    
        41: {
            description: "58.仍然没用.移除p层级前7个购买项一次项价格",
            cost(){return new OmegaNum(1e161)},
            unlocked(){return hasUpgrade("a",35)&&hasMilestone("esc",7)},
            },          
        42: {
            description: "59.逐渐递减但不变的加成.挑战C-6的效果^2. 60.有规律的价格.",
            cost(){return new OmegaNum(1e163)},
            unlocked(){return hasUpgrade("a",41)&&hasMilestone("esc",7)},
            },      
        43: {
            description: "挑战C-6的效果^1.5",
            cost(){return new OmegaNum(1e165)},
            unlocked(){return hasUpgrade("a",42)&&hasMilestone("esc",7)},
            },     
        44: {
            description: "挑战C-6的效果^1.2",
            cost(){return new OmegaNum(1e167)},
            unlocked(){return hasUpgrade("a",43)&&hasMilestone("esc",7)},
            },       
        45: {
            description: "挑战C-6的效果^1.1",
            cost(){return new OmegaNum(1e169)},
            unlocked(){return hasUpgrade("a",44)&&hasMilestone("esc",7)},
            },      
        51: {
            description: "p层级第六个购买项效果^2",
            cost(){return new OmegaNum(1e171)},
            unlocked(){return hasUpgrade("a",45)&&hasMilestone("esc",7)},
            },       
        52: {
            description: "p层级第六个购买项效果^1.5",
            cost(){return new OmegaNum(1e178)},
            unlocked(){return hasUpgrade("a",51)&&hasMilestone("esc",7)},
            },   
        53: {
            description: "p层级第六个购买项效果^1.2",
            cost(){return new OmegaNum("1e1123")},
            unlocked(){return hasUpgrade("a",52)&&hasMilestone("esc",8)},
            },     
        54: {
            description: "p层级第六个购买项效果^1.1",
            cost(){return new OmegaNum("1e1156")},
            unlocked(){return hasUpgrade("a",53)&&hasMilestone("esc",8)},
            },      
        55: {
            description: "p层级第七个购买项效果^2",
            cost(){return new OmegaNum("1e1169")},
            unlocked(){return hasUpgrade("a",54)&&hasMilestone("esc",8)},
            },     
        61: {
            description: "p层级第七个购买项效果^1.5",
            cost(){return new OmegaNum("1e1459")},
            unlocked(){return hasUpgrade("a",55)&&hasMilestone("esc",8)},
            },      
        62: {
            description: "p层级第七个购买项效果^1.2",
            cost(){return new OmegaNum("1e3028")},
            unlocked(){return hasUpgrade("a",61)&&hasMilestone("esc",9)},
            },     
        63: {
            description: "p层级第七个购买项效果^1.1",
            cost(){return new OmegaNum("1e7760")},
            unlocked(){return hasUpgrade("a",62)&&hasMilestone("esc",9)},
            },                                                                                                                                                                                                                                                    
        },
        buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n(hasMilestone("l",32)?"1e10000":"1e14000").mul(n(1e308).pow(x)).mul(n(1e10).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `生命获取<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}声望点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.a.points.gte(this.cost()) },
                buy() {
                    player.a.points = player.a.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                title() {
                    return "数字生命"
                }, 
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = n(2).pow(x)
                  
                    return eff
                },
                unlocked(){return upgradeEffect("p",25).gte(8)},
            },},
      
            
        
     
            
        

   

    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(ExpantaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */
  

    //important!!!
   
    getResetGain(){
        var gain = player.points.div(1e25).pow(0.075)
        if(hasUpgrade("a",11)) gain = gain.mul(upgradeEffect("a",11))
        if(hasUpgrade("a",12)) gain = gain.mul(upgradeEffect("a",12))
        if(hasAchievement("rw",16)) mult = mult.mul(1e10)
        if(hasMilestone("l",13)) gain = gain.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))
        gain = gain.pow(buyableEffect("p",23))
        if(player.q.points.gte(1)) gain = gain.pow(layers.q.effect())
        if(hasMilestone("l",17)) gain = gain.pow(n(1.05).pow(player.l.challenges[11]))
        if(hasMilestone("l",27)) gain = gain.pow(n(1.1)) 

       { if(hasMilestone("lcb",4)&&player.a.points.gte("1e20100")) gain = gain.pow(1.01);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20200")) gain = gain.pow(1.02);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20300")) gain = gain.pow(1.03);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20400")) gain = gain.pow(1.04);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20500")) gain = gain.pow(1.05);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20600")) gain = gain.pow(1.06);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20700")) gain = gain.pow(1.07);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20800")) gain = gain.pow(1.08);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e20900")) gain = gain.pow(1.09);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21000")) gain = gain.pow(1.10);  
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21100")) gain = gain.pow(1.11);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21200")) gain = gain.pow(1.12);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21300")) gain = gain.pow(1.13);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21400")) gain = gain.pow(1.14);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21500")) gain = gain.pow(1.15);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21600")) gain = gain.pow(1.16);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21700")) gain = gain.pow(1.17);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21800")) gain = gain.pow(1.18);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e21900")) gain = gain.pow(1.19);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e22000")) gain = gain.pow(1.20);
        if(hasMilestone("lcb",4)&&player.a.points.gte("1e22100")) gain = gain.pow(1.21);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22200")) gain = gain.pow(1.22);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22300")) gain = gain.pow(1.23);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22400")) gain = gain.pow(1.24);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22500")) gain = gain.pow(1.25);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22600")) gain = gain.pow(1.26);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22700")) gain = gain.pow(1.27);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22800")) gain = gain.pow(1.28);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e22900")) gain = gain.pow(1.29);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23000")) gain = gain.pow(1.30);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23100")) gain = gain.pow(1.31);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23200")) gain = gain.pow(1.32);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23300")) gain = gain.pow(1.33);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23400")) gain = gain.pow(1.34);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23500")) gain = gain.pow(1.35);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23600")) gain = gain.pow(1.36);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23700")) gain = gain.pow(1.37);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23800")) gain = gain.pow(1.38);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e23900")) gain = gain.pow(1.39);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24000")) gain = gain.pow(1.40);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24100")) gain = gain.pow(1.41);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24200")) gain = gain.pow(1.42);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24300")) gain = gain.pow(1.43);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24400")) gain = gain.pow(1.44);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24500")) gain = gain.pow(1.45);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24600")) gain = gain.pow(1.46);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24700")) gain = gain.pow(1.47);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24800")) gain = gain.pow(1.48);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e24900")) gain = gain.pow(1.49);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25000")) gain = gain.pow(1.50);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25100")) gain = gain.pow(1.51);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25200")) gain = gain.pow(1.52);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25300")) gain = gain.pow(1.53);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25400")) gain = gain.pow(1.54);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25500")) gain = gain.pow(1.55);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25600")) gain = gain.pow(1.56);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25700")) gain = gain.pow(1.57);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25800")) gain = gain.pow(1.58);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e25900")) gain = gain.pow(1.59);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26000")) gain = gain.pow(1.60);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26100")) gain = gain.pow(1.61);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26200")) gain = gain.pow(1.62);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26300")) gain = gain.pow(1.63);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26400")) gain = gain.pow(1.64);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26500")) gain = gain.pow(1.65);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26600")) gain = gain.pow(1.66);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26700")) gain = gain.pow(1.67);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26800")) gain = gain.pow(1.68);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e26900")) gain = gain.pow(1.69);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27000")) gain = gain.pow(1.70);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27100")) gain = gain.pow(1.71);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27200")) gain = gain.pow(1.72);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27300")) gain = gain.pow(1.73);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27400")) gain = gain.pow(1.74);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27500")) gain = gain.pow(1.75);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27600")) gain = gain.pow(1.76);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27700")) gain = gain.pow(1.77);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27800")) gain = gain.pow(1.78);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e27900")) gain = gain.pow(1.79);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28000")) gain = gain.pow(1.80);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28100")) gain = gain.pow(1.81);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28200")) gain = gain.pow(1.82);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28300")) gain = gain.pow(1.83);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28400")) gain = gain.pow(1.84);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28500")) gain = gain.pow(1.85);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28600")) gain = gain.pow(1.86);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28700")) gain = gain.pow(1.87);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28800")) gain = gain.pow(1.88);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e28900")) gain = gain.pow(1.89);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29000")) gain = gain.pow(1.90);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29100")) gain = gain.pow(1.91);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29200")) gain = gain.pow(1.92);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29300")) gain = gain.pow(1.93);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29400")) gain = gain.pow(1.94);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29500")) gain = gain.pow(1.95);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29600")) gain = gain.pow(1.96);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29700")) gain = gain.pow(1.97);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29800")) gain = gain.pow(1.98);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e29900")) gain = gain.pow(1.99);
if(hasMilestone("lcb",4)&&player.a.points.gte("1e30000")) gain = gain.pow(2);}
        if(hasMilestone("l",37)) gain = gain.pow(layers.a.effect())   
        if(gain.gte(1e10)) gain=expPow(gain.mul(10),0.8).add(9.99e9)	
        if(gain.gte("1e1000")) gain=expPow(gain.mul(10),0.75).mul("1e900")	
        if(gain.gte("1e20000")) gain=gain.pow(0.01).mul("1e19800")	
        if(gain.gte("1e22500")) gain=expPow(expPow(gain,0.75),0.75).mul("1e22500")	    
        if(inChallenge("l",11)) gain = expPow(gain.mul(10),tmp.l.challenges[11].challengeEffect).div(10)
        if(!hasMilestone("esc",6))gain=gain.min(0)    	
        return gain.floor()
    },
    prestigeButtonText(){
        return "+ "+formatWhole(layers.a.getResetGain())+" 重置点(pp)"
    },
   
    passiveGeneration(){
        if(hasMilestone("esc",8))return 10
        return 0
    },

})

addLayer("esc", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `ESC`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    color: "grey",
    resource: "劝退点", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires(){
        if(escReq[player.esc.points.toNumber()]) return n(escReq[player.esc.points.toNumber()])
        return n(Infinity)
    },
    base:1,
    exponent:0,
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
    row: 999, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
    effectDescription(){
        if(inChallenge("cq",11)) return `点数获取/${format(this.effect().pow(-1))}.`
        return `点数获取*${format(this.effect())}.`},
    effect(){return n(1.5).pow(player.esc.points.pow(2)).pow(inChallenge("cq",11)?tmp.cq.challenges[11].challengeEffect:1)},
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
   
    milestones:{
        1:{
            requirementDescription: "1劝退点",
            effectDescription: "5.过多的重复基础内容,又可以叫做大转(指低加成但重置的内容多,又不得不重置).解锁更~多~的升级.(?)",
            done() { return isUnl(1) }
        },
        2:{
            requirementDescription: "2劝退点",
            effectDescription: "解锁更~~~多~~~的升级.(?)劝退11结束",
            done() { return isUnl(2) }
        },
        3:{
            requirementDescription: "3劝退点",
            effectDescription: "解锁更~~~~~多~~~~~的升级.(?)14.重置花费增长过快使玩家无法感受到游戏乐趣",
            done() { return isUnl(3) }
        },
        4:{
            requirementDescription: "4劝退点",
            effectDescription: "解锁更~~~~~~~多~~~~~~~的升级.(?)20.表意不明的描述使玩家抓耳挠腮.削弱劝退7,挑战c-1的效果增强8倍,劝退9结束",
            done() { return isUnl(4) }
        },
        5:{
            requirementDescription: "5劝退点",
            effectDescription: "解锁更~~~~~~~~~多~~~~~~~~~的升级.(?)劝退点效果对重置能量生效30.滥用符号增强情感.31.至今没有自动化",
            done() { return isUnl(5) }
        },
        6:{
            requirementDescription: "6劝退点",
            effectDescription: "40.给削弱以掩饰平衡不好.点数获取指数^0.8.41.没有考虑挑战效果.自动购买p层级升级.解锁新层级",
            done() { return isUnl(6) }
        }, 
        7:{
            requirementDescription: "7劝退点",
            effectDescription: "解锁更~~~~~~~~~~~多~~~~~~~~~~~的升级.(?)重置点获取指数^0.8,解锁新层级.自动购买所有p层级可购买",
            done() { return isUnl(7) }
        }, 
        8:{
            requirementDescription: "8劝退点",
            effectDescription: "自动购买pp层级升级,每秒获得1000%的声望点和元性质,解锁新层级.",
            done() { return isUnl(8) }
        }, 
        9:{
            requirementDescription: "9劝退点",
            effectDescription: "自动购买p层级购买项12,m层级购买项11.12的效果变得更好.自动完成p层级挑战.生命获取x2.",
            done() { return isUnl(9) }
        },     
        10:{
            requirementDescription: "10劝退点",
            effectDescription: "解锁新层级.",
            done() { return isUnl(10) }
        },     
    },
    upgrades:{
        11:{
            description:`21.效果一般借鉴了生命树但不点还不行的升级.点数，重置点获取^1.01`,
            effect(){
                var eff = 1.01
               
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            unlocked(){return hasMilestone("esc",4)},
            cost() {
                if(hasAchievement("rw",12)) return n(0)
                return n(3)
              }
        },
        12:{
            description:`22.无提示解锁升级.劝退点效果对重置点生效`,

            unlocked(){return hasUpgrade("esc",11)},
            cost:n(0),
        },
        13:{
            description:`劝退点加成p层级购买项11`,
            effect(){
                var eff =   player.esc.points.mul(0.01).add(1)
              
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            unlocked(){return  hasMilestone("esc",7)},
            cost:n(0),
        },
        14:{
            description:`劝退点加成p层级购买项22`,
            effect(){
                var eff =   player.esc.points.mul(0.01).add(1)
              
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            unlocked(){return  hasMilestone("esc",9)},
            cost:n(0),
        },
    },

})
addLayer("m", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `m`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum(1e20)},
    color: "#31aeb0",
    resource: "元性质", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
        if(hasMilestone("esc",8))return 10
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
       gain = gain.pow((challengeEffect("m",11)+1)**0.01) 
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
            unlocked() { return   upgradeEffect("p",25).gte(8)},
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
addLayer("l", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `L`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum("1e7950")},
    color: "#BE0E00",
    resource: "生命", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
      
        return 0
    },
    exponent:0.5,
    baseAmount(){return player.p.points},//基础资源数量
    baseResource:"重置点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
      
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    layerShown(){return hasMilestone("esc",8)||hasMilestone("cq",1)},
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    tabFormat: {
        生命里程碑: {
            buttonStyle() {return  {'color': 'lightblue'}},
            content:
                ["main-display",
              
                "prestige-button", "resource-display",
                "milestones",

                ],},
     
   
        生命挑战: {
            buttonStyle() {return  {'color': 'lightblue'}},
            unlocked() {return hasMilestone("l",10)},
            content:
                ["main-display",
              
                "challenges",

                ],},
        生命可购买: {
            buttonStyle() {return  {'color': 'lightblue'}},
            unlocked() {return player.l.challenges[11]>=10},
            content:
                ["main-display",
                  
                "buyables",
    
                ],},
    },
   
    buyables:{
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e20").mul(n(10).pow(x)).mul(n(2).pow(x.pow(2)))
              
                return c
            },
            display() { return `生命获取<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}生命<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.l.points.gte(this.cost()) },
            buy() {
                player.l.points = player.l.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "α → ∂α"
            }, 
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = player.points.add(2).log(2).add(2).log(2).pow(x)
              
                return eff
            },
            unlocked(){return true},
        },},
    challenges: {
        11: {
                name: "65.机器翻译.扩张",
                challengeDescription(){


                        let a = "所有先前的资源指数都被<br>^" 
                        let e = tmp.l.challenges[11].challengeEffect
                        let f = "<br>完成次数增加生命获取,每完成10次解锁一个可购买." 
                        return a + e+ f
                },
                goalDescription(){
                        return "e7950重置点"
                },
                challengeEffect(){
                        let eff =n(0.99).pow(player.l.challenges[11]+1).mul(10000).floor().div(10000) 
                    

                        return eff
                },
                goal: () => "1e7950",
                canComplete: () => player.p.points.gte(tmp.l.challenges[11].goal),
                rewardDescription(){
                       
                       
                        let b = "当前: *" + format(tmp.l.challenges[11].rewardEffect)
                        let c = "<br>你完成了" 
                        c += formatWhole(player.l.challenges[11]) + "/110次"
                        return  b  + c
                },
                completionLimit: 110,
                rewardEffect(){let eff=player.l.challenges[11]+1
                   if(hasMilestone("l",16))  eff=eff**eff
                        
                        return eff
                },
                unlocked(){
                        return hasMilestone("l", 10) 
                },
               
        },}, // inChallenge("l", 11)
   
    milestones:{
        1:{
            requirementDescription: "1生命",
         
            done() { return player.l.points.gte(1) },
           
            effectDescription(){
        
              
            return  "62.怎么会是生命树啊.前50个生命每个使点数^1.01,当前:^" + format(n(1.01).pow(player.l.points.min(50)))
        },
        },
        2:{
            requirementDescription: "2生命",
         
            done() { return player.l.points.gte(2) },
            effectDescription(){
        
              
                return  "63.分批自动化.自动购买第一个m层级可购买" 
            },
        },
        3:{
            requirementDescription: "3生命",
         
            done() { return player.l.points.gte(3) },
            effectDescription(){
        
              
                return  "自动购买第二个m层级可购买" 
            },
        },
        4:{
            requirementDescription: "4生命",
         
            done() { return player.l.points.gte(4) },
            effectDescription(){
        
              
                return  "自动购买第三个m层级可购买" 
            },
        },
        5:{
            requirementDescription: "5生命",
         
            done() { return player.l.points.gte(5) },
            effectDescription(){
        
              
                return  "自动购买第四个m层级可购买" 
            },
        },
        6:{
            requirementDescription: "6生命",
         
            done() { return player.l.points.gte(6) },
            effectDescription(){
        
              
                return  "自动购买第五个m层级可购买" 
            },
        },
        7:{
            requirementDescription: "7生命",
         
            done() { return player.l.points.gte(7) },
            effectDescription(){
        
              
                return  "自动购买第六个m层级可购买" 
            },
        },
        8:{
            requirementDescription: "8生命",
         
            done() { return player.l.points.gte(8) },
            effectDescription(){
        
              
                return  "自动购买第七个m层级可购买" 
            },
        },
        9:{
            requirementDescription: "9生命",
         
            done() { return player.l.points.gte(9) },
            effectDescription(){
        
              
                return  "自动购买第八个m层级可购买" 
            },
        },
        10:{
            requirementDescription: "10生命",
         
            done() { return player.l.points.gte(10) },
            effectDescription(){
        
              
                return  "64.要大量生命重置.解锁挑战" 
            },
        },
        11:{
            requirementDescription: "1扩张完成",
         
            done() { return player.l.challenges[11] >= 1 },
            effectDescription(){
        
              
                return  "元性质获取^1.05" 
            },
        },
        12:{
            requirementDescription: "100生命",
         
            done() { return player.l.points.gte(100) },
            effectDescription(){
        
              
                return  "66.增益还是减益.p层级第二个购买项价格变成原来的10次方,效果变成原来的5次方." 
            },
        },
        13:{
            requirementDescription: "150生命",
         
            done() { return player.l.points.gte(150) },
            effectDescription(){
        
              
                return  "67.有用还是没用.生命加成所有先前的资源获取,当前:x" + format(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1 ))
            },
        },
        14:{
            requirementDescription: "200生命",
         
            done() { return player.l.points.gte(200) },
            effectDescription(){
        
              
                return  "68.没用还是有用.m层级第一个购买项价格变成原来的25次方,效果变成原来的100次方." 
            },
        },
        15:{
            requirementDescription: "250生命",
         
            done() { return player.l.points.gte(250) },
            effectDescription(){
        
              
                return  "69.有用还是有用.m层级第二个购买项效果变成原来的1.5次方." 
            },
        },
        16:{
            requirementDescription: "3扩张完成",
         
            done() { return player.l.challenges[11] >= 3 },
            effectDescription(){
        
              
                return  "扩张效果指数^2" 
            },
        },
        17:{
            requirementDescription: "1000生命",
         
            done() { return player.l.points.gte(1000) },
            effectDescription(){
        
              
                return  "每次扩张使声望点获取^1.05,当前:^" + format(n(1.05).pow(player.l.challenges[11]))
            },
        }, 
        18:{
            requirementDescription: "50000生命",
         
            done() { return player.l.points.gte(50000) },
            effectDescription(){
        
              
                return  "b对150生命里程碑生效." 
            },
        },     
        19:{
            requirementDescription: "2500000生命",
         
            done() { return player.l.points.gte(2500000) },
            effectDescription(){
        
              
                return  "70.必要的妥协.挑战C-2不再增强升级效果." 
            },
        },     
        20:{
            requirementDescription: "3000000生命",
         
            done() { return player.l.points.gte(3000000) },
            effectDescription(){
        
              
                return  "71.真的好熟悉啊.解锁新层级." 
            },
        },     
        21:{
            requirementDescription: "e23872点数",
         
            done() { return player.points.gte("1e23872") },
            effectDescription(){
        
              
                return  "元性质获取^1.05." 
            },
        },   
        22:{
            requirementDescription: "10000000生命",
         
            done() { return player.l.points.gte(10000000) },
            effectDescription(){
        
              
                return  "72.没这个打不过扩张.如果你在扩张里面,使声望加成对重置点生效." 
            },
        }, 
        23:{
            requirementDescription: "200000000生命",
         
            done() { return player.l.points.gte(200000000) },
            effectDescription(){
        
              
                return  "73.负面在前,正面在后.m层级第三个购买项价格变成原来的20次方." 
            },
        },      
        24:{
            requirementDescription: "300000000生命",
         
            done() { return player.l.points.gte(300000000) },
            effectDescription(){
        
              
                return  "m层级第三个购买项效果变成原来的15次方." 
            },
        },     
        25:{
            requirementDescription: "500000000生命",
         
            done() { return player.l.points.gte(500000000) },
            effectDescription(){
        
              
                return  "移除m层级第三个购买项价格常数项." 
            },
        },      
        26:{
            requirementDescription: "3e9生命",
         
            done() { return player.l.points.gte(3e9) },
            effectDescription(){
        
              
                return  "移除p购买项11的第一个软上限." 
            },
        },      
        27:{
            requirementDescription: "5e9生命",
         
            done() { return player.l.points.gte(5e9) },
            effectDescription(){
        
              
                return  "声望点获取^1.1." 
            },
        },   
        28:{
            requirementDescription: "1e10生命",
         
            done() { return player.l.points.gte(1e10) },
            effectDescription(){
        
              
                return  "终于……在生命重置中保留点数奇点." 
            },
        },      
        29:{
            requirementDescription: "5e11生命",
         
            done() { return player.l.points.gte(5e11) },
            effectDescription(){
        
              
                return  "前50个数量级生命每个使b*1.005,当前:x" + format(n(1.005).pow(player.l.points.add(1).log10().min(50)))
            },
        },   
        30:{
            requirementDescription: "1e12生命",
         
            done() { return player.l.points.gte(1e12) },
            effectDescription(){
        
              
                return  "降低声望加成的价格." 
            },
        },    
        31:{
            requirementDescription: "2.5e13生命",
         
            done() { return player.l.points.gte(2.5e13) },
            effectDescription(){
        
              
                return  "b加成p层级升级13." 
            },
        },      
        32:{
            requirementDescription: "1e18生命",
         
            done() { return player.l.points.gte(1e18) },
            effectDescription(){
        
              
                return  "降低p层级购买项11价格." 
            },
        },      
        33:{
            requirementDescription: "1e22生命",
         
            done() { return player.l.points.gte(1e22) },
            effectDescription(){
        
              
                return  "懒得数劝退条目了:这是同一个p吗?增加p层级购买项11效果." 
            },
        },  
        34:{
            requirementDescription: "1e24生命",
         
            done() { return player.l.points.gte(1e24) },
            effectDescription(){
        
              
                return  "削弱p层级升级22效果的软上限." 
            },
        },     
        35:{
            requirementDescription: "1e40000点数",
         
            done() { return player.points.gte("1e40000")  },
            effectDescription(){
        
              
                return  "第一个完全没用，解锁新层级." 
            },
        },    
        36:{
            requirementDescription: "3e29生命",
         
            done() { return player.l.points.gte(3e29) },
            effectDescription(){
        
              
                return  "弱化元性质获取软上限，实际是把公式后+1e7500改成x1e7500." 
            },
        },    
        37:{
            requirementDescription: "1e32生命",
         
            done() { return player.l.points.gte(1e32) },
            effectDescription(){
        
              
                return  "真的不会膨胀吗b对声望点获取生效." 
            },
        },      
        38:{
            requirementDescription: "1e38生命",
         
            done() { return player.l.points.gte(1e38) },
            effectDescription(){
        
              
                return  "快了……自动购买p层级11购买项的数量x5." 
            },
        },  
        39:{
            requirementDescription: "2e38生命",
         
            done() { return player.l.points.gte(2e38) },
            effectDescription(){
        
              
                return  "还是不能过扩张……每次扩张使元性质获取^1.06,当前:^" + format(n(hasMilestone("l",40)?1.1:1.06).pow(player.l.challenges[11]))
            },
        },     
        40:{
            requirementDescription: "3e38生命",
         
            done() { return player.l.points.gte(3e38) },
            effectDescription(){
        
              
                return  "终于能过了！上面的里程碑效果提升至^1.1"
            },
        },     
        41:{
            requirementDescription: "1e50生命",
         
            done() { return player.l.points.gte(1e50) },
            effectDescription(){
        
              
                return  "继续扩张 150生命里程碑对重置能量获取生效"
            },
        },            
        42:{
            requirementDescription: "1e57生命",
         
            done() { return player.l.points.gte(1e57) },
            effectDescription(){
        
              
                return  "我可没说在指数前 α → ∂α生效于p层级升级24"
            },
        },                                                                                  
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
        var gain = player.p.points.add(10).log10().div(7950).pow((hasMilestone("lcb",2)&&player.l.challenges[11] >= 10?player.l.challenges[11]-8:2)+player.cq.challenges[11]*0.5)
        if(hasMilestone("l", 10)) gain=gain.mul(tmp.l.challenges[11].rewardEffect)
        if(hasMilestone("esc",9))gain=gain.mul(2)   
        if(hasMilestone("lcb",3))gain=gain.mul(n(1.1).pow(player.l.points.add(10).log(10).floor().min(100)))   
        if(hasUpgrade("p",61))gain=gain.mul(10)   
        if(hasUpgrade("p",62))gain=gain.mul(50)  
        if(hasUpgrade("p",63))gain=gain.mul(250)    
        if(hasUpgrade("p",64))gain=gain.mul(1250)  
        if(hasUpgrade("p",65))gain=gain.mul(6250) 
        if(hasAchievement("rw",15)) gain=gain.mul(1.5)
        gain=gain.mul(buyableEffect("a",11))    
        gain=gain.mul(buyableEffect("l",11))  
        gain=gain.mul(buyableEffect("cq",11)) 
        if(!hasMilestone("esc",8))gain=gain.min(0)   
        return gain.floor()
    },
    getNextAt(){
        let gain = tmp.l.getResetGain.plus(1)
        if( hasMilestone("l", 10) ) gain=gain.div(tmp.l.challenges[11].rewardEffect)
        if(hasMilestone("esc",9))gain=gain.div(2)
        if(hasUpgrade("p",61))gain=gain.div(10)   
        gain=gain.div(buyableEffect("a",11))   
        gain=gain.div(buyableEffect("l",11)) 
        gain=gain.div(buyableEffect("cq",11)) 
        if(hasAchievement("rw",15)) gain=gain.div(1.5)
        return n(10).pow(gain.root(2).mul(7950)).max("1e7950")
},
  
})
addLayer("q", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `q`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum("1e2714")},
    color: "blue",
    resource: "声望加成", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
      
        return 0
    },
    effectDescription(){return `声望点获取^${format(this.effect())}.`},
    effect(){let eff= player.q.points.mul(hasUpgrade("q",12)?0.075:hasUpgrade("q",11)?0.06:0.05).add(1)
               
        return eff         
                },
    exponent:5,
    baseAmount(){return player.a.points},//基础资源数量
    baseResource:"声望点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
      
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)
        if(hasMilestone("l",30))exp=new ExpantaNum(0.7915)
        return exp
    },
    layerShown(){return hasMilestone("l",20)||hasMilestone("cq",1)},
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    upgrades: {
        11: {
            description: "声望加成的效果变得更好.",
            cost(){return new OmegaNum(6)},
            unlocked(){return true},
           
        },
        12: {
            description: "声望加成的效果变得更好.",
            cost(){return new OmegaNum(9)},
            unlocked(){return true},
           
        },
      
    },
    resetsNothing(){return hasUpgrade("cq",33)},
   
    

    
   
})
addLayer("lcb", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `M`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum("1e40000")},
    color: "#793784",
    resource: "00里程碑", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
      
        return 0
    },
    effectDescription(){return `
        虚晃一枪，这个层级不重置任何东西<br>
        `},
    exponent:1,
    baseAmount(){return player.points},//基础资源数量
    baseResource:"点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
      
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)
       
        return exp
    },
    layerShown(){return hasMilestone("l",35)||hasMilestone("cq",1)},
    row: 999, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    getNextAt(){
        let gain = player.lcb.points
        return n("1e40000").pow(n(1.05).pow(gain))
},
milestones:{
    1:{
        requirementDescription: "第100个里程碑",
        effectDescription: "当点数到e1, e4, e9, e16, e25, e36, e49, e64, e81, e100, e121, e144, e169, e196, e225, e256, e289, e324, e361, e400, e441, e484, e529, e576, e625, e676, e729, e784, e841, e900, e961, e1024, e1089, e1156, e1225, e1296, e1369, e1444, e1521, e1600, e1681, e1764, e1849, e1936, e2025, e2116, e2209, e2304, e2401, e2500, e2601, e2704, e2809, e2916, e3025, e3136, e3249, e3364, e3481, e3600, e3721, e3844, e3969, e4096, e4225, e4356, e4489, e4624, e4761, e4900, e5041, e5184, e5329, e5476, e5625, e5776, e5929, e6084, e6241, e6400, e6561, e6724, e6889, e7056, e7225, e7396, e7569, e7744, e7921, e8100, e8281, e8464, e8649, e8836, e9025, e9216, e9409, e9604, e9801, e10000时,点数获取x1e10",
        done() { return player.lcb.points.gte(1) }
    },
 
    2:{
        requirementDescription: "第200个里程碑",
        effectDescription: "当扩张完成次数到11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110时,基础生命获取指数+1" ,
        done() { return player.lcb.points.gte(2) }
    },
    3:{
        requirementDescription: "第300个里程碑",
        effectDescription: "当生命到e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20, e21, e22, e23, e24, e25, e26, e27, e28, e29, e30, e31, e32, e33, e34, e35, e36, e37, e38, e39, e40, e41, e42, e43, e44, e45, e46, e47, e48, e49, e50, e51, e52, e53, e54, e55, e56, e57, e58, e59, e60, e61, e62, e63, e64, e65, e66, e67, e68, e69, e70, e71, e72, e73, e74, e75, e76, e77, e78, e79, e80, e81, e82, e83, e84, e85, e86, e87, e88, e89, e90, e91, e92, e93, e94, e95, e96, e97, e98, e99, e100时,生命获取x1.1" ,
        done() { return player.lcb.points.gte(3) }
    },
    4:{
        requirementDescription: "第400个里程碑",
        effectDescription: "当声望点到e20100, e20200, e20300, e20400, e20500, e20600, e20700, e20800, e20900, e21000, e21100, e21200, e21300, e21400, e21500, e21600, e21700, e21800, e21900, e22000, e22100, e22200, e22300, e22400, e22500, e22600, e22700, e22800, e22900, e23000, e23100, e23200, e23300, e23400, e23500, e23600, e23700, e23800, e23900, e24000, e24100, e24200, e24300, e24400, e24500, e24600, e24700, e24800, e24900, e25000, e25100, e25200, e25300, e25400, e25500, e25600, e25700, e25800, e25900, e26000, e26100, e26200, e26300, e26400, e26500, e26600, e26700, e26800, e26900, e27000, e27100, e27200, e27300, e27400, e27500, e27600, e27700, e27800, e27900, e28000, e28100, e28200, e28300, e28400, e28500, e28600, e28700, e28800, e28900, e29000, e29100, e29200, e29300, e29400, e29500, e29600, e29700, e29800, e29900, e30000,时,声望点获取^1.01，1.02，1.03，1.04，1.05，1.06，1.07，1.08，1.09，1.10，1.11，1.12，1.13，1.14，1.15，1.16，1.17，1.18，1.19，1.20，1.21，1.22，1.23，1.24，1.25，1.26，1.27，1.28，1.29，1.30，1.31，1.32，1.33，1.34，1.35，1.36，1.37，1.38，1.39，1.40，1.41，1.42，1.43，1.44，1.45，1.46，1.47，1.48，1.49，1.50，1.51，1.52，1.53，1.54，1.55，1.56，1.57，1.58，1.59，1.60，1.61，1.62，1.63，1.64，1.65，1.66，1.67，1.68，1.69，1.70，1.71，1.72，1.73，1.74，1.75，1.76，1.77，1.78，1.79，1.80，1.81，1.82，1.83，1.84，1.85，1.86，1.87，1.88，1.89，1.90，1.91，1.92，1.93，1.94，1.95，1.96，1.97，1.98，1.99，2.00" ,
        done() { return player.lcb.points.gte(4) }
    },
},
resetsNothing: true,
    

    
   
})
addLayer("cq", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `传奇`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(0),
        hp: new ExpantaNum(0),
        atk: new ExpantaNum(1),
        def: new ExpantaNum(0),
    }},
    requires(){return new ExpantaNum("10")},
    color: "yellow",
    resource: "战力", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration(){
      
        return 0
    },
    tabFormat: {
        里程碑: {
            buttonStyle() {return  {'color': 'yellow'}},
            content:
                ["main-display",
              
                "prestige-button", "resource-display",
                "milestones",

                ],},
     
   
        战斗: {
            buttonStyle() {return  {'color': 'yellow'}},
            unlocked() {return hasMilestone("cq",1)},
            content:
                ["main-display",
              
                "upgrades",

                ],},
        提升: {
            buttonStyle() {return  {'color': 'yellow'}},
            unlocked() {return hasMilestone("cq",2)},
            content:
                ["main-display",
                      
                "buyables",
                
                 ],},
        试炼: {
            buttonStyle() {return  {'color': 'yellow'}},
            unlocked() {return hasMilestone("cq",3)},
            content:
                ["main-display",
              
                "challenges",
        
                ],},
    },
    effectDescription(){return `
        <br>
        血量：${format(player.cq.hp)}(+${format(layers.cq.effect())}/s)<br>
        攻击：${format(player.cq.atk)}<br>
        防御：${format(player.cq.def)}<br>
      
       
        `},
    effect(){let eff= player.cq.points.max(0)
        if(hasAchievement("rw",15)) eff=eff.mul(1.5)  
        eff = eff.mul(buyableEffect("cq",11))
        eff = eff.mul(tmp.l.challenges[11].rewardEffect)
        return eff         
                },
    exponent:1,
    baseAmount(){return player.esc.points},//基础资源数量
    baseResource:"劝退点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
      
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
       
        return exp
    },
    layerShown(){return hasMilestone("esc",10)||hasMilestone("cq",1)},
    row: 1000, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   
    milestones:{

      
        1:{
            requirementDescription: "1战力",
            effectDescription: "获得怪物手册（解锁战斗），楼层传送器（保持之前层级解锁，但是获取资源还需达到对应劝退点）,解锁任务",
            done() { return player.cq.points.gte(1) }
        },
        2:{
            requirementDescription: "2战力",
            effectDescription: "解锁一些可以提升属性的东西",
            done() { return player.cq.points.gte(2) }
        },
        3:{
            requirementDescription: "3战力",
            effectDescription: "劝退树是一个具有革命性的创新闲置游戏，解锁试练",
            done() { return player.cq.points.gte(3) }
        },
        4:{
            requirementDescription: "5战力",
            effectDescription: "血量太多怎么办，解锁通天塔",
            done() { return player.cq.points.gte(5) }
        },
    },
    upgrades: {
        atk:{
            requirementDescription: "存攻击",
            effectDescription: "",
            effect(){
                var eff = 1
                if(hasAchievement("rw",17))eff+1
                eff +buyableEffect("cq",12)
                return eff
            },
          
            done() { return player.cq.points.lt(-1) },
            unlocked(){return false},
        },
        def:{
            requirementDescription: "存防御",
            effect(){
                var eff = 0
                eff +buyableEffect("cq",13)
                return eff
            },
            effectDisplay(){return ` ${format(this.effect())}`},
            effectDescription: "",
            unlocked(){return false},
            done() { return player.cq.points.lt(-1) }
        },
        11: {
            description: "10/3/0  点数获取x3.",
            cost(){return new OmegaNum(n(10).div(player.cq.atk).sub(1).floor().mul((n(3).sub(player.cq.def)).max(0)))},
            unlocked(){return true},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        12: {
            description: "15/4/0  重置点获取x5.",
            cost(){return new OmegaNum(n(15).div(player.cq.atk).sub(1).floor().mul((n(4).sub(player.cq.def)).max(0)))},
            unlocked(){return hasUpgrade("cq",11)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        13: {
            description: "5/15/0  点数获取基于点数增加.",
            cost(){return new OmegaNum(n(5).div(player.cq.atk).sub(1).floor().mul((n(15).sub(player.cq.def)).max(0)))},
            unlocked(){return hasUpgrade("cq",12)},
            effect(){
                var eff = player.points.add(10).log10()
              if(hasUpgrade("cq",34))eff=eff.pow(player.esc.points.add(1))

                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        }, 
        14: {
            description: "75/2/0  点数获取基于重置点增加.",
            cost(){return new OmegaNum(n(75).div(player.cq.atk).sub(1).floor().mul((n(2).sub(player.cq.def)).max(0)))},
            unlocked(){return hasUpgrade("cq",13)}, 
            effect(){
                var eff = player.p.points.add(10).log10()
                if(hasUpgrade("cq",34))eff=eff.pow(player.esc.points.add(1))
                
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        15: {
            description: "25/10/0  重置点获取基于重置点增加.",
            cost(){return new OmegaNum(n(25).div(player.cq.atk).sub(1).floor().mul((n(10).sub(player.cq.def)).max(0)))},
            effect(){
                var eff = player.p.points.add(10).log10()  
                if(hasUpgrade("cq",34))eff=eff.pow(player.esc.points.add(1))
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            unlocked(){return hasUpgrade("cq",14)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        21: {
            description: "20/7x2/0  重置能量获取x20.",
            cost(){return new OmegaNum(n(20).div(player.cq.atk).sub(1).floor().mul(((n(7).sub(player.cq.def)).mul(2)).max(0)))},
            unlocked(){return hasUpgrade("cq",15)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        }, 
        22: {
            description: "30/3x3/0  p层级购买项效果x1.01.",
            cost(){return new OmegaNum(n(30).div(player.cq.atk).sub(1).floor().mul(((n(3).sub(player.cq.def)).mul(3)).max(0)))},
            unlocked(){return hasUpgrade("cq",21)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
        23: {
            description: "50/6/0  重置点获取基于点数增加.",
            cost(){return new OmegaNum(n(50).div(player.cq.atk).sub(1).floor().mul(((n(6).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",22)},
              effect(){
                var eff = player.points.add(10).log10()
                if(hasUpgrade("cq",34))eff=eff.pow(player.esc.points.add(1))

                return eff
            },
              effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        }, 
        24: {
            description: "50/1.1/0.9  点数获取^1.01.",
            cost(){return new OmegaNum(n(50).div(player.cq.atk.sub(0.9)).sub(1).floor().mul(((n(1.1).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",23)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
        25: {
            description: "3/300/0  重置点获取^1.01.",
            cost(){return new OmegaNum(n(4).div(player.cq.atk).sub(1).floor().mul(((n(300).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",24)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },      
        31: {
            description: "100/10/1  在点数奇点外自动获得挑战点数.",
            cost(){return new OmegaNum(n(100).div(player.cq.atk.sub(1)).sub(1).floor().mul(((n(10).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",25)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
        32: {
            description: "111/11/1.1  自动购买数字生命.",
            cost(){return new OmegaNum(n(111).div(player.cq.atk.sub(1.1).max(0)).sub(1).floor().mul(((n(11).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",31)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
        33: {
            description: "50/15/1.5  声望加成不重置任何东西.",
            cost(){return new OmegaNum(n(50).div(player.cq.atk.sub(1.5).max(0)).sub(1).floor().mul(((n(15).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",32)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
        34: {
            description: "20/222/1  劝退点加成升级13，14，15，23效果.",
            cost(){return new OmegaNum(n(20).div(player.cq.atk.sub(1).max(0)).sub(1).floor().mul(((n(222).sub(player.cq.def)).mul(1)).max(0)))},
            unlocked(){return hasUpgrade("cq",33)},
            effect(){
                var eff = player.esc.points.add(1)
           
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },                   
    },
    challenges: {
        11: {
                name: "简单试炼1",
                challengeDescription(){

                    let a ="劝退点效果变为原来的" 
                    let e = tmp.cq.challenges[11].challengeEffect      
                    let f ="次方，且对重置点和重置能量生效,奖励：每次完成使血量获取x2，生命基础获取指数+0.5"   
                        return a+e+f},
                goalDescription(){
                        return "4劝退点"
                },
                challengeEffect(){
                        let eff =n(2).pow(player.cq.challenges[11])
                    eff=eff.mul(-1)

                        return eff
                },
                goal: () => "4",
                canComplete: () => player.esc.points.gte(tmp.l.challenges[11].goal),
                rewardDescription(){
                       
                       
                        let b = "当前: *" + format(tmp.l.challenges[11].rewardEffect)
                        let c = "<br>你完成了" 
                        c += formatWhole(player.l.challenges[11]) + "/5次"
                        return  b  + c
                },
                completionLimit: 5,
                rewardEffect(){let eff=n(2).pow(player.cq.challenges[11])
                
                        
                        return eff
                },
                unlocked(){
                        return hasMilestone("cq", 3) 
                },
               
        },}, // inChallenge("l", 11)
        buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("1e50").mul(n(10000).pow(x)).mul(n(5).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `血量和生命获取<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}生命<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.l.points.gte(this.cost()) },
                buy() {
                    player.l.points = player.l.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                title() {
                    return "提升生命"
                }, 
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = n(1.5).pow(x)
                  
                    return eff
                },
                unlocked(){return hasMilestone("cq", 2) },
            },
            12: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("1e40000").mul(n("1e1000").pow(x)).mul(n(1e50).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `攻击+<br />${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}点数<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.points.gte(this.cost()) },
                buy() {
                    player.points = player.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                title() {
                    return "提升攻击"
                }, 
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = x
                  
                    return eff
                },
                unlocked(){return hasMilestone("cq", 2) },
            },
            13: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("1e11111").mul(n("1e300").pow(x)).mul(n(1e20).pow(x.pow(2)))
                  
                    return c
                },
                display() { return `防御+<br />${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元性质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.m.points.gte(this.cost()) },
                buy() {
                    player.m.points = player.m.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                title() {
                    return "提升防御"
                }, 
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = x
                  
                    return eff
                },
                unlocked(){return hasMilestone("cq", 2) },
            },
        },
       
    update(diff){
         player.cq.hp = player.cq.hp.add(layers.cq.effect().mul(diff))
         player.cq.atk =  player.cq.atk.max(upgradeEffect("cq","atk"))
         player.cq.def =  player.cq.def.max(upgradeEffect("cq","def"))
         if(hasUpgrade("cq",31)&&upgradeEffect("p",25).gte(8))player.m.challenges[11]=player.m.challenges[11].add(expPow(player.points.mul(10),0.125))
         if(hasUpgrade("cq",32)&&player.l.points.sub(1).gte(n(hasMilestone("l",32)?"1e10000":"1e14000").mul(n(1e308).pow(getBuyableAmount("a",11))).mul(n(1e10).pow(getBuyableAmount("a",11).pow(2)))))setBuyableAmount("a",11,getBuyableAmount("a",11).add(1))  





    },

    
   
})
addLayer("rw", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return hasMilestone("cq",1)}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("任务")
    },
     symbol: `任务`,
    achievements: {
     
        11: {
            name: "进入新手村",
            done() { return hasMilestone("cq",1) },
            tooltip: "获得1战力。奖励：离线时间不再有上限。",
        },
        12: {
            name: "无需花费",
            done() { return hasMilestone("cq",1)&&hasMilestone("esc",4) },
            tooltip: "获得4劝退点。奖励：esc升级不再花费。",
        },
        13: {
            name: "再次声望",
            done() { return hasMilestone("cq",1)&&player.a.points.gte(1) },
            tooltip: "获得1声望点。奖励：bx1.005。",
        },
        14: {
            name: "元元元",
            done() { return hasMilestone("cq",1)&&player.m.points.gte(1) },
            tooltip: "获得1元性质。奖励：元性质效果^1.025。",
        },
        15: {
            name: "hp还是life",
            done() { return hasMilestone("cq",1)&&player.l.points.gte(1) },
            tooltip: "获得1生命。奖励：生命和血量获取x1.5。",
        },
        16: {
            name: "声望加成",
            done() { return hasMilestone("cq",1)&&player.q.points.gte(1) },
            tooltip: "获得1声望加成。奖励：声望点获取x1e10。",
        },
        17: {
            name: "第二次",
            done() { return player.cq.points.gte(2) },
            tooltip: "获得2战力，奖励：攻击+1。",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "成就: "+player.rw.achievements.length+"/"+(Object.keys(tmp.rw.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],

})