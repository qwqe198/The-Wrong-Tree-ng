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
        if(hasMilestone("esc",7)) mult = expPow(mult.mul(10),0.8).div(10)	
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
        ${buyableEffect('p',13).gte(5)?`<br><br>五重压缩能量:${format(player.p.e5)}(${format(player.p.e4.pow(1/9).div(100).mul(this.condenseEffect(player.p.e6)))}/s),使得三重压缩能量获取*${format(this.condenseEffect(player.p.e5))}`:``}
        `},
    effect(){
        var eff = player.p.e0.div(10).add(1).pow(2).pow(hasUpgrade("p",44)?buyableEffect("p",22):1)
        if(hasMilestone("esc",5)) eff = eff.mul(layers.esc.effect())
        if(hasUpgrade("a",35)) eff = eff.pow(1.025)          
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
    },
    doReset(l){
        if(layers[l].row<=this.row) return
        layerDataReset(this.layer)
    },

    challenges:{
        11:{
            name: "C-1",
            challengeDescription: "8.点升级是负面效果会使玩家不满.升级12效果反转.(无论是否有升级12)",
            rewardDescription:"9.不上不下的自动化效果使玩家犹豫不得.每秒自动获取10%的重置点.10.在内容不多且操作量本身就小时,给予过多的qol和自动化.劝退4结束.",
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
            canComplete(){return player.points.gte(player.esc.points.gte(4)?'1e580':'1e616')&&player.p.upgrades.length <= hasUpgrade("a",22)?1e308:10},
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
                var eff = player.p.points.add(1).log10().add(1).log10().add(1).pow(0.05)

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
    },

    buyables:{
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:1e10).mul(n(1e2).pow(x)).mul(n(2).pow(x.pow(2)).pow(getBuyableAmount(this.layer, this.id).gte(130)?getBuyableAmount(this.layer, this.id).sub(30).mul(0.01):1))
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
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(1)},
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = three.pow(x).mul(10).pow(getBuyableAmount(this.layer, this.id).gte(450)?getBuyableAmount(this.layer, this.id).sub(350).mul(0.01):1)
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
                var c = n(hasUpgrade("a",33)?1:1e308).mul(n(1e49).pow(x)).mul(n(1e4).pow(x.pow(2)))
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
                var c = n(hasUpgrade("a",33)?1:1e100).mul(n(1e8).pow(x)).mul(n(100).pow(x.pow(2)))
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
                var c = n(hasUpgrade("a",33)?1:"1e1800").mul(n(1e25).pow(x)).mul(n(10000).pow(x.pow(2)))
                return c
            },
            display() { return `26.元套娃.倍增升级35到43效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return  player.p.points.gte(this.cost()) },
            buy() {
                player.p.points =  player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(25)
                if(inChallenge("p",22))eff=eff.max(1).min(1).div(x.add(1).root(25))
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(5)},
        },
        23: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasUpgrade("a",33)?1:"1e5000").mul(n(1e100).pow(x)).mul(n(1e10).pow(x.pow(2)))
                return c
            },
            display() { return `倍增升级15效果.<br />^${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}重置点<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return  player.p.points.gte(this.cost()) },
            buy() {
                player.p.points =  player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)){
                var eff = x.add(1).root(7)
                if(hasUpgrade('p',54)) eff = eff.mul(buyableEffect('p',23).pow(0.5))   
                return eff
            },
            unlocked(){return upgradeEffect("p",25).gte(6)},
        },
    },
    passiveGeneration(){
        if(hasChallenge("p",11)) return inChallenge("p",22)?1e-5:hasMilestone("esc",4)?'1':'0.1'
        return 0
    },
   
    getResetGain(){
        var gain = layers[this.layer].baseAmount().div(layers[this.layer].requires()).pow(layers[this.layer].exponent).pow(layers[this.layer].gainExp()).mul(layers[this.layer].gainMult())
        //gain = gain.min(1.79e308)
        return gain.floor()
    },
})

var escReq = [1e6,1e18,1e200,'e1000','e2750','e6000','e4350','e999999']
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
            description: "49.学一下增量宇宙树.移除p层级所有购买项的常数项价格",
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
       if(gain.gte(1e10)) gain=expPow(gain.mul(10),0.8).add(9.99e9)	
        return gain.floor()
    },
    prestigeButtonText(){
        return "+ "+formatWhole(layers.a.getResetGain())+" 重置点(pp)"
    },
   
    passiveGeneration(){
     
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
            effectDescription: "解锁更~~~~~~~多~~~~~~~的升级.(?)20.表意不明的描述使玩家抓耳挠腮.削弱劝退7,挑战c-1的效果增强10倍,劝退9结束",
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
            effectDescription: "当前残局.重置点获取指数^0.8(下次更新给自动购买p层级可购买)",
            done() { return isUnl(7) }
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
            cost:n(4),
        },
        12:{
            description:`22.无提示解锁升级.劝退点效果对重置点生效`,

            unlocked(){return hasUpgrade("esc",11)},
            cost:n(0),
        },
    
    },

})

