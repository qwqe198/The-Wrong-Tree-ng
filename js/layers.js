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
        if(hasUpgrade("p",51)) mult = mult.mul(upgradeEffect("p",51))
        if(hasUpgrade("p",32)) mult = mult.mul(layers.p.effect())
        if(hasUpgrade("esc",12)) mult = mult.mul(layers.esc.effect())
        if(hasMilestone("esc",7))  mult = mult.mul(layers.m.effect())
            if(hasMilestone("l",13)) mult= mult.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))
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
                eff = eff.mul(buyableEffect("p",11).pow(buyablePow))
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
                    if(hasUpgrade("p",55))eff=eff.mul(0.06).add(0.75)           
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
                eff = eff.mul(buyableEffect("p",12)).mul(layers.p.condenseEffect(player.p.e1))
                if(hasUpgrade('p',34)) eff = eff.mul(upgradeEffect('p',34))
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
            cost:n('1e1550'),
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
            cost:n('1e1600'),
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
            cost:n('1e1650'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        44:{
            description:`28.元元套娃(?)第六个购买项加成重置能量效果`,
            effect(){
                var eff = buyableEffect('p',22)
 
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            cost:n('1e2630'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        45:{
            description:`29.元元元套娃(?)第六个购买项加成第五个购买项效果`,
            effect(){
                var eff = buyableEffect('p',22)
 
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e3150'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(5)||inChallenge('p',14)},
        },
        51:{
            description:`32.抄袭数学树的偷懒描述.二重压缩能量并不总是做无用功,二重压缩能量加成重置点获取`,
            effect(){
                var eff = player.p.e2.add(1)
                if(hasUpgrade('a',32)) eff = eff.pow(layers.a.effect())        
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e3700'),
            unlocked(){return hasUpgrade(this.layer,45)&&isUnl(5)||isUnl(6)},
        },
        52:{
            description:`33.写当前阶段完全没用的东西.三重压缩能量加成重置点获取`,
            effect(){
                var eff = player.p.e3.add(1)
                    
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e3900'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        53:{
            description:`34.没有新意的套娃.第六个购买项指数加成第二个购买项效果`,
            effect(){
                var eff = buyableEffect('p',22)
 
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            cost:n('1e4000'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        54:{
            description:`38.废话描述.第七个购买项的效果以乘数形式的算术平方根加成在第一个购买项的效果为6到7之间且包括6不包括7时的最后一个购买项的效果`,
            effect(){
                var eff = buyableEffect('p',23).pow(0.5)
 
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n('1e6300'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
        55:{
            description:`39.只改效果不改描述.升级22的硬上限变成软上限.`,

            cost:n('1e6666'),
            unlocked(){return hasUpgrade(this.layer,this.id-1)||isUnl(6)||inChallenge('p',14)},
        },
    },
    update(diff){
        if(hasUpgrade("p",32)) player.p.e0 = player.p.e0.add(upgradeEffect("p",32).mul(diff))
        for(i=1;i<=buyableEffect('p',13).toNumber();i++) player.p[`e${i}`] = player.p[`e${i}`].add(player.p[`e${i-1}`].pow(1/9).div(100).mul(this.condenseEffect(player.p[`e${i+1}`])).mul(diff))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:1e10).mul(n(hasUpgrade("a",41)?1:1e2).pow(getBuyableAmount("p",11))).mul(n(2).pow(getBuyableAmount("p",11).pow(2)).pow(getBuyableAmount("p",11).gte(130)?getBuyableAmount("p",11).sub(30).mul(0.01):1))))setBuyableAmount('p',11,getBuyableAmount('p',11).add(1))
        if(hasMilestone("esc",7)&&player.p.e0.sub(1).gte(three.pow(getBuyableAmount("p",12)).mul(10).pow(getBuyableAmount("p",12).gte(450)?getBuyableAmount("p",12).sub(350).mul(0.01):1).pow(hasMilestone("l",12)?10:1)))setBuyableAmount('p',12,getBuyableAmount('p',12).add(hasMilestone("esc",9)?10:1))
        if(hasMilestone("esc",7)&&(player.p[`e${buyableEffect('p',13).toNumber()}`].sub(1)).gte(1e9))setBuyableAmount('p',13,getBuyableAmount('p',13).add(1))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:1e308).mul(n(hasUpgrade("a",41)?1:1e49).pow(getBuyableAmount("p",14))).mul(n(1e4).pow(getBuyableAmount("p",14).pow(2)))))setBuyableAmount('p',14,getBuyableAmount('p',14).add(1))
        if(hasMilestone("esc",7)&&player.p.e0.sub(1).gte(n(hasUpgrade("a",33)?1:1e100).mul(n(hasUpgrade("a",41)?1:1e8).pow(getBuyableAmount("p",21))).mul(n(100).pow(getBuyableAmount("p",21).pow(2)))))setBuyableAmount('p',21,getBuyableAmount('p',21).add(1))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:"1e1800").mul(n(hasUpgrade("a",41)?1:1e25).pow(getBuyableAmount("p",22))).mul(n(10000).pow(getBuyableAmount("p",22).pow(2)))))setBuyableAmount('p',22,getBuyableAmount('p',22).add(1))
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n(hasUpgrade("a",33)?1:"1e5000").mul(n(hasUpgrade("a",41)?1:1e100).pow(getBuyableAmount("p",23))).mul(n(1e10).pow(getBuyableAmount("p",23).pow(2)))))setBuyableAmount('p',23,getBuyableAmount('p',23).add(1)) 
        if(hasMilestone("esc",7)&&player.p.points.sub(1).gte(n("1e10000").mul(n(1e200).pow(getBuyableAmount("p",24))).mul(n(1e20).pow(getBuyableAmount("p",24).pow(2)))))setBuyableAmount('p',24,getBuyableAmount('p',24).add(1))    
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
            display() { return `11.在没有第11升级时倍增第11升级效果.倍增前11个升级效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.mul(1.6).add(1).root(3.6)
                eff = eff.mul(buyableEffect('p',14))
                if(hasUpgrade("esc",13)) eff = eff.mul(upgradeEffect("esc",13))
                if(eff.gte(7.8))eff=eff.mul(0.5).add(3.9)
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
                var eff = x.add(1).root(7).pow(hasUpgrade("a",55)?2:1).pow(hasUpgrade("a",61)?1.5:1)
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

var escReq = [1e6,1e18,1e200,'e1000','e2750','e6000','e4350','e7625','e19590','e999999']
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
    layerShown(){return hasMilestone("esc",6)},
    effect(){
        var eff = player.a.points.add(1).root(20)
        if(eff.gte(2)) eff = eff.sqrt().mul(1.41)
        if(eff.gte(4)) eff = eff.sqrt().sqrt().sqrt().mul(3.364)  
        if(eff.gte(6)) eff = eff.sqrt().sqrt().sqrt().sqrt().sqrt().mul(5.6732)   
        if(eff.gte(10)) eff = eff.div(2).add(5)           
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
                    if(hasMilestone("a",14)) sc-=2
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
             
             
                baseEff = logsoftcap(baseEff,"ee8",0.5)
                baseEff = logsoftcap(baseEff,"ee9",0.5)
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
           
                baseEff = logsoftcap(baseEff,"e1e7",0.25)
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect("a",14),1)}`}
        },
        15: {
            description: "前边所有升级的效果+^0.2.所有.最先计算.",
            cost(){return new OmegaNum(5e11)},
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
            cost(){return new OmegaNum(2e12)},
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
        },
     
      
            
        
     
            
        

   

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
        if(hasMilestone("l",13)) gain = gain.mul(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1))
        gain = gain.pow(buyableEffect("p",23))
        if(player.q.points.gte(1)) gain = gain.pow(layers.q.effect())
        if(hasMilestone("l",17)) gain = gain.pow(n(1.05).pow(player.l.challenges[11]))
       if(gain.gte(1e10)) gain=expPow(gain.mul(10),0.8).add(9.99e9)	
       if(gain.gte("1e1000")) gain=expPow(gain.mul(10),0.75).mul("1e900")	
        if(inChallenge("l",11)) gain = expPow(gain.mul(10),tmp.l.challenges[11].challengeEffect).div(10)	
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
    row: 9, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
    effectDescription(){return `点数获取*${format(this.effect())}.`},
    effect(){return n(1.5).pow(player.esc.points.pow(2))},
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
            effectDescription: "自动购买p层级购买项11,m层级购买项11.12的效果变得更好.生命获取x2.",
            done() { return isUnl(9) }
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
            cost:n(3),
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
    layerShown(){return hasMilestone("esc",7)},
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    
    effectDescription(){return `51.这是怨怨树吗？基于点数,使重置点获取x${format(this.effect())}.56.滥用双指数软上限.`},
    effect(){let eff= player.points.add(1).pow(buyableEffect('m',11)).log(10).sub(20).max(1)
                 eff=expPow(eff,buyableEffect('m',23))
                 if (eff.gte("1e10000"))eff=expPow(expPow(eff,0.5),0.5).mul("1e10000")
                 if (eff.gte("1e15000"))eff=expPow(expPow(eff,0.5),0.5).mul("1e15000")


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
       if(hasMilestone("l",11))  gain=gain.pow(1.05)
       gain=gain.pow(buyableEffect('m',14))
       if(hasChallenge("p",23)) gain = gain.pow(challengeEffect("p",23)) 
       if(gain.gte(1e10)) gain=expPow(gain.mul(10),0.8).add(9.99e9)	
     
       if(inChallenge("l",11)) gain = expPow(gain.mul(10),tmp.l.challenges[11].challengeEffect).div(10)
       return gain.floor()
    },
    update(diff){
      
        if(hasMilestone("l",2)&&player.m.points.sub(1).gte(n("1").mul(n(2).pow(getBuyableAmount("m",11))).mul(n(1.01).pow(getBuyableAmount("m",11).pow(2))).pow(hasMilestone("l",14)?25:1)))setBuyableAmount('m',11,getBuyableAmount('m',11).add(hasMilestone("esc",9)?10:1))    
        if(hasMilestone("l",3)&&player.m.points.sub(1).gte(n("20").mul(n(3).pow(getBuyableAmount("m",12))).mul(n(1.02).pow(getBuyableAmount("m",12).pow(2)))))setBuyableAmount('m',12,getBuyableAmount('m',12).add(hasMilestone("esc",9)?10:1))    
        if(hasMilestone("l",4)&&player.m.points.sub(1).gte(n("1e200").mul(n(10).pow(getBuyableAmount("m",13))).mul(n(1.1).pow(getBuyableAmount("m",13).pow(2)))))setBuyableAmount('m',13,getBuyableAmount('m',13).add(1))  
        if(hasMilestone("l",5)&&player.m.points.sub(1).gte(n("1e230").mul(n(1e10).pow(getBuyableAmount("m",14))).mul(n(10).pow(getBuyableAmount("m",14).pow(2)))))setBuyableAmount('m',14,getBuyableAmount('m',14).add(1))       
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
                var c = n(1e200).mul(n(10).pow(x)).mul(n(1.1).pow(x.pow(2)))
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
           
                return eff
            },
            unlocked(){return true},
        },     
        14: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(1e230).mul(n(1e10).pow(x)).mul(n(10).pow(x.pow(2)))
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
    layerShown(){return hasMilestone("esc",7)},
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
    },
    challenges: {
        11: {
                name: "扩张",
                challengeDescription(){


                        let a = "所有先前的资源指数都被<br>^" 
                        let e = tmp.l.challenges[11].challengeEffect
                        let f = "<br>完成次数增加生命获取" 
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
        
              
            return  "前50个生命每个使点数^1.01,当前:^" + format(n(1.01).pow(player.l.points.min(50)))
        },
        },
        2:{
            requirementDescription: "2生命",
         
            done() { return player.l.points.gte(2) },
            effectDescription(){
        
              
                return  "自动购买第一个m层级可购买" 
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
        
              
                return  "解锁挑战" 
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
        
              
                return  "p层级第二个购买项价格变成原来的10次方,效果变成原来的5次方(不影响初始价格)." 
            },
        },
        13:{
            requirementDescription: "150生命",
         
            done() { return player.l.points.gte(150) },
            effectDescription(){
        
              
                return  "生命加成所有先前的资源获取,当前:x" + format(player.l.points.add(1).pow(5).pow(hasMilestone("l", 18)?layers.a.effect():1 ))
            },
        },
        14:{
            requirementDescription: "200生命",
         
            done() { return player.l.points.gte(200) },
            effectDescription(){
        
              
                return  "m层级第一个购买项价格变成原来的25次方,效果变成原来的100次方(不影响初始价格)." 
            },
        },
        15:{
            requirementDescription: "250生命",
         
            done() { return player.l.points.gte(250) },
            effectDescription(){
        
              
                return  "m层级第二个购买项效果变成原来的1.5次方." 
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
        
              
                return  "每次扩张使声望点^1.05,当前:^" + format(n(1.05).pow(player.l.challenges[11]))
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
        
              
                return  "挑战C-2不再增强升级效果." 
            },
        },     
        20:{
            requirementDescription: "3000000生命",
         
            done() { return player.l.points.gte(3000000) },
            effectDescription(){
        
              
                return  "解锁新层级." 
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
        var gain = player.p.points.add(10).log10().div(7950).pow(2)
        if(hasMilestone("l", 10)) gain=gain.mul(tmp.l.challenges[11].rewardEffect)
        if(hasMilestone("esc",9))gain=gain.mul(2)      
        
        return gain.floor()
    },
    getNextAt(){
        let gain = tmp.l.getResetGain.plus(1)
        if( hasMilestone("l", 10) ) gain=gain.div(tmp.l.challenges[11].rewardEffect)
        if(hasMilestone("esc",9))gain=gain.div(2)
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
    effect(){let eff= player.q.points.mul(0.05).add(1)
               
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
        return exp
    },
    layerShown(){return hasMilestone("l",20)},
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   
  
   
    

    
   
})
