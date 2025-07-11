//!!谢谢你啊谢谢你啊 输入怪物属性 返回扣除血量
function battle(hp,atk,def){
  let turns = n(hp).div(player.cq.atk.sub(def)).ceil().sub(1).max(0)//!!你减1再floor是啥 剩下1点血不打了？
  let trueDamage = n(atk).sub(player.cq.def).max(0)
  return turns.mul(trueDamage)
}


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
        攻击：${format(player.cq.atk.mul(100).floor().div(100))}<br>
        防御：${format(player.cq.def.mul(100).floor().div(100))}<br>
      
       
        `},
    effect(){let eff= player.cq.points.max(0)
        if(hasAchievement("rw",15)) eff=eff.mul(1.5)  
        eff = eff.mul(buyableEffect("cq",11))
        eff = eff.mul(tmp.cq.challenges[11].rewardEffect)
        if(hasMilestone("t",5))  eff = eff.mul(buyableEffect("t",11).add(1)) 
     if(hasMilestone("cq",21))  eff = eff.mul(player.a1.points.add(10).log10()) 
  eff = eff.mul(layers.a1.effect())
if(hasUpgrade("cq",62)) eff=eff.mul(upgradeEffect("cq",62))
  if(hasAchievement("rw",33)) eff=eff.pow(1.1)  
if(hasAchievement("rw",57)) eff=eff.pow(1.05) 
        return eff         
                },
    exponent:1,
    baseAmount(){return player.esc.points},//基础资源数量
    baseResource:"劝退点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
      if(hasMilestone("lcb",5))mult=mult.mul(n(2).pow(player.lcb.points.sub(4)).min(100).max(0))
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
       
        return exp
    },
    layerShown(){return hasMilestone("esc",10)||hasMilestone("cq",1)},
    row: 100, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   
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
        5:{
            requirementDescription: "6战力",
            effectDescription: "分段自动化2 同样的劝退也可以来两次 保留自动购买p层级购买11",
            done() { return player.cq.points.gte(6) }
        },
 6:{
            requirementDescription: "7战力",
            effectDescription: "这里的 保留自动购买p层级购买12",
            done() { return player.cq.points.gte(7) }
        },
 7:{
            requirementDescription: "8战力",
            effectDescription: "自动购买 保留自动购买p层级购买13",
            done() { return player.cq.points.gte(8) }
        },
 8:{
            requirementDescription: "9战力",
            effectDescription: "可以 保留自动购买p层级购买14",
            done() { return player.cq.points.gte(9) }
        },
 9:{
            requirementDescription: "10战力",
            effectDescription: "无视解锁条件 保留自动购买p层级购买21",
            done() { return player.cq.points.gte(10) }
        },
 10:{
            requirementDescription: "11战力",
            effectDescription: "所以 保留自动购买p层级购买22",
            done() { return player.cq.points.gte(11) }
        },
 11:{
            requirementDescription: "12战力",
            effectDescription: "简单试炼2 保留自动购买p层级购买23",
            done() { return player.cq.points.gte(12) }
        },
 12:{
            requirementDescription: "13战力",
            effectDescription: "容易了很多 保留自动购买p层级购买24",
            done() { return player.cq.points.gte(13) }
        },
 13:{
            requirementDescription: "14战力",
            effectDescription: "当然 保留自动完成p层级挑战11",
            done() { return player.cq.points.gte(14) }
        },
 14:{
            requirementDescription: "15战力",
            effectDescription: "自动挑战 保留自动完成p层级挑战12",
            done() { return player.cq.points.gte(15) }
        },
 15:{
            requirementDescription: "16战力",
            effectDescription: "也是如此 保留自动完成p层级挑战13",
            done() { return player.cq.points.gte(16) }
        },
 16:{
            requirementDescription: "17战力",
            effectDescription: "只不过 保留自动完成p层级挑战14",
            done() { return player.cq.points.gte(17) }
        },
 17:{
            requirementDescription: "18战力",
            effectDescription: "没有一个专门的试炼是与挑战有关 保留自动完成p层级挑战21",
            done() { return player.cq.points.gte(18) }
        },
 18:{
            requirementDescription: "19战力",
            effectDescription: "所以 保留自动完成p层级挑战22",
            done() { return player.cq.points.gte(19) }
        },
 19:{
            requirementDescription: "20战力",
            effectDescription: "这真的只是一个qol 保留自动完成p层级挑战23",
            done() { return player.cq.points.gte(20) }
        },
20:{
            requirementDescription: "25战力",
            effectDescription: "解锁副本，元性质获取^1.15但是移除点数奇点",
            done() { return player.cq.points.gte(25) }
        },
21:{
            requirementDescription: "30战力",
            effectDescription()  { return   "变形虫加成血量获取,当前:x"+ format(player.a1.points.add(10).log10())},
            done() { return player.cq.points.gte(30) }
        },
22:{
            requirementDescription: "50战力",
            effectDescription()  { return   "血量加成变形虫获取,当前:x"+ format(player.cq.hp.pow(0.02))},
            done() { return player.cq.points.gte(50) }
        },
    },
    upgrades: {
      10000:{
            description: "存攻击",
           
            effect(){
                let eff = n(1)
                if(hasAchievement("rw",17))eff=eff.add(1)
                eff=eff.add(buyableEffect("cq",12))
               eff = eff.mul(tmp.cq.challenges[12].rewardEffect)
                return eff
            },
            effectDisplay(){return ` ${format(this.effect())}`},
            cost() { return new OmegaNum ("1eeeeeeeeeeeeeee10") },
         
        },
        10001:{
            description: "存防御",
            effect(){
                let eff = n(0)
             
                eff=eff.add(buyableEffect("cq",13))
               if(hasAchievement("rw",26))eff=eff.mul(1.1)
                return eff
            },
            effectDisplay(){return ` ${format(this.effect())}`},
            unlocked(){return false},
        
            cost() { return new OmegaNum ("1eeeeeeeeeeeeeeee10")},
        },
        11: {
            description: "10/3/0  点数获取x3.",
            cost(){return battle(10,3,0)},
            unlocked(){return true},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        12: {
            description: "15/4/0  重置点获取x5.",
            cost(){return battle(15,4,0)},
            unlocked(){return hasUpgrade("cq",11)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        13: {
            description: "5/15/0  点数获取基于点数增加.",
            cost(){return battle(5,15,0)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",12)},
            effect(){
                var eff = player.points.add(10).log10()
                if(hasUpgrade("cq",34)) eff = eff.pow(player.esc.points.add(1))

                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        }, 
        14: {
            description: "75/2/0  点数获取基于重置点增加.",
            cost(){return battle(75,2,0)},
            unlocked(){return hasUpgrade("cq",13)}, 
            effect(){
                var eff = player.p.points.add(10).log10()
                if(hasUpgrade("cq",34)) eff=eff.pow(player.esc.points.add(1))
                
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        15: {
            description: "25/10/0  重置点获取基于重置点增加.",
            cost(){return battle(25,10,0)},
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
            cost(){return new battle(75,2,0).mul(2)},
            unlocked(){return hasUpgrade("cq",15)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        }, 
        22: {
            description: "30/3x3/0  p层级购买项11效果x1.01.",
            cost(){return battle(75,2,0).mul(3)},
            unlocked(){return hasUpgrade("cq",21)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
        23: {
            description: "50/6/0  重置点获取基于点数增加.",
            cost(){return battle(50,6,0)},
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
            cost(){return battle(50,1.1,0.9)},
            unlocked(){return hasUpgrade("cq",23)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
        25: {
            description: "3/300/0  重置点获取^1.01.",
            cost(){return battle(3,300,0)},
            unlocked(){return hasUpgrade("cq",24)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },      
        31: {
            description: "100/10/1  怪物开始有防御了，在前4行重置保留点数奇点.",
            cost(){return battle(100,10,1)},
            unlocked(){return hasUpgrade("cq",25)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
        32: {
            description: "111/11/1.1  自动购买数字生命.",
            cost(){return battle(111,11,1.1)},
            unlocked(){return hasUpgrade("cq",31)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
        33: {
            description: "50/15/1.5  声望加成不重置任何东西.",
            cost(){return battle(50,15,1.5)},
            unlocked(){return hasUpgrade("cq",32)},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
        34: {
            description: "20/222/1  劝退点加成升级13，14，15，23效果.",
            cost(){return battle(20,222,1)},
            unlocked(){return hasUpgrade("cq",33)},
            effect(){
                var eff = player.esc.points.add(1)
              if(hasUpgrade("cq",41))eff=eff.pow(2)
                return eff
            },
            effectDisplay(){return `^ ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },
        35: {
            description: "1000/5/2  保留每秒自动获得12.5%的重置点.",
            cost(){return battle(1000,5,2)},
            unlocked(){return hasUpgrade("cq",34)},
         
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
          41: {
            description: "666/10/3  可以秒杀简单试炼1了?升级34效果^2.",
            cost(){return battle(666,10,3)},
            unlocked(){return hasUpgrade("cq",35)},
         
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },     
                   42: {
            description: "1111/10/4  战力加成点数获取.",
            cost(){return battle(1111,11,4)},
        
           effect(){
                var eff = player.cq.points.add(1)
          
                return eff
            },
    unlocked(){return hasUpgrade("cq",41)},
  effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"

        },  
          43: {
            description: "1666/11/5  重置能量获取基于点数增加，升级34对该升级生效.",
            cost(){return battle(1666,11,0)}, //!!剩下你看着改
        
            effect(){
                var eff = player.points.add(10).log10()
                if(hasUpgrade("cq",34)) eff = eff.pow(player.esc.points.add(1))

                return eff
            },    unlocked(){return hasUpgrade("cq",42)},
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },     
      44: {
            description: "10000/15/0  重置能量获取基于重置点增加，升级34对该升级生效.",
            cost(){return battle(10000,15,0)}, //!!剩下你看着改

            effect(){
                var eff = player.p.points.add(10).log10()
                if(hasUpgrade("cq",34)) eff = eff.pow(player.esc.points.add(1))

                return eff
            },    unlocked(){return hasUpgrade("cq",43)},
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },     
                  45: {
            description: "222/100/5  重置能量获取基于重置能量增加，升级34对该升级生效.",
            cost(){return battle(222,100,5)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",44)},
            effect(){
                var eff = player.p.e0.add(10).log10()
                if(hasUpgrade("cq",34)) eff = eff.pow(player.esc.points.add(1))

                return eff
            },    unlocked(){return hasUpgrade("cq",44)},
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },       
  51: {
            description: "1000/66/6  点数获取基于战力增加.",
            cost(){return battle(1000,66,6)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",44)},
            effect(){
                var eff =  player.cq.points.add(10).log10().mul(0.01).add(1)

                return eff
            },    unlocked(){return hasUpgrade("cq",45)},
            effectDisplay(){return `^ ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },    
         52: {
            description: "1777/77/7  保留自动购买pp层级升级.",
            cost(){return battle(1777,77,7)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",51)},

            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
         53: {
            description: "2888/88/8  自动购买q层级升级.",
            cost(){return battle(2888,88,8)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",52)},

            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },      
       54: {
            description: "3999/99/9  保留自动获得声望点.",
            cost(){return battle(3999,99,9)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",53)},

            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
     55: {
            description: "5000/100/10  保留自动获得元性质.",
            cost(){return battle(5000,100,10)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",54)},

            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
     61: {
            description: "3e5固伤 在简单试炼3中,解锁声望点，但是声望点和b^0.1  .",
            cost(){return n(3e5)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",55)},

            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },   
        62: {
            description: "7777/111/11  血量基于它本身增加.",
            cost(){return battle(7777,111,11)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",61)},
 effect(){
                var eff =  player.cq.hp.add(10).log10()

                return eff
            },  
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
     63: {
            description: "9999/133/13  生命基于它本身增加.",
            cost(){return battle(9999,133,13)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",62)},
 effect(){
                var eff =  player.l.points.add(10).log10()

                return eff
            },  
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
  64: {
            description: "10000/100/50/3  战力加成无瑕点数.",
            cost(){return battle(10000,100,50).pow(3)}, //!!剩下你看着改
            unlocked(){return hasAchievement("rw",63)},
 effect(){
                var eff =  player.cq.points.add(1)

                return eff
            },  
            effectDisplay(){return `x ${format(this.effect())}`},
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
 65: {
            description: "11111/111/55/3  自动购买增量耐性,效果比手动更好（后面的自动也是）.",
            cost(){return battle(11111,111,55).pow(3)}, //!!剩下你看着改
            unlocked(){return hasUpgrade("cq",64)},
 
            currencyDisplayName: "血量",
            currencyInternalName: "hp",
            currencyLayer: "cq"
        },  
    },
    challenges: {
        11: {
                name: "简单试炼1",
                challengeDescription(){

                    let a ="（首次推荐战力：3）劝退点效果变为原来的" 
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
                canComplete: () => player.esc.points.gte(tmp.cq.challenges[11].goal),
                rewardDescription(){
                       
                       
                        let b = "当前: *" + format(tmp.cq.challenges[11].rewardEffect)
                        let c = "<br>你完成了" 
                        c += formatWhole(player.cq.challenges[11]) + "/5次"
                        return  b  + c
                },
                completionLimit: 5,
                rewardEffect(){let eff=n(2).pow(player.cq.challenges[11])
                
                        
                        return eff
                },
                unlocked(){
                        return hasMilestone("cq", 3) 
                },
               
        },
           12: {
            name: "简单试炼2",
            challengeDescription(){

                let a ="（首次推荐战力：5）p层级购买项11效果/" 
                let e = player.cq.challenges[12]*0.2+1.2      
                let f ="奖励：每次完成使攻击x1.1"   
                    return a+e+f},
            goalDescription(){
                    return "4劝退点"
            },
            challengeEffect(){
                let eff =n(1.2).pow(player.cq.challenges[12]+1)
          

                return eff
        },
            goal: () => "4",
            canComplete: () => player.esc.points.gte(4),
            rewardDescription(){
                   
                   
                    let b = "当前: *" + format(tmp.cq.challenges[12].rewardEffect)
                    let c = "<br>你完成了" 
                    c += formatWhole(player.cq.challenges[12]) + "/5次"
                    return  b+ c
            },
            completionLimit: 5,
            rewardEffect(){let eff=n(1.1).pow(player.cq.challenges[12])
            
                    
                    return eff
            },
            unlocked(){
                    return player.cq.challenges[11]>=1
            },
           
    },// inChallenge("l", 11)
           13: {
            name: "简单试炼3",
            challengeDescription(){

                let a ="（首次推荐战力：10）你被困在" 
                let e = (player.cq.challenges[13]+1)*3    
                let f ="重扩张之中，奖励：每次完成使有效扩张次数-0.2(作用于进入挑战的效果，不是奖励）"   
                    return a+e+f},
            goalDescription(){
                    return "4劝退点"
            },
            challengeEffect(){
                let eff =n(3).mul(player.cq.challenges[13]+1)
          

                return eff
        },
            goal: () => "4",
            canComplete: () => player.esc.points.gte(4),
            rewardDescription(){
                   
                   
                    let b = "当前: -" + format(tmp.cq.challenges[13].rewardEffect)
                    let c = "<br>你完成了" 
                    c += formatWhole(player.cq.challenges[13]) + "/5次"
                    return  b+ c
            },
            completionLimit: 5,
            rewardEffect(){let eff=n(0.2).mul(player.cq.challenges[13])
            
                    
                    return eff
            },
            unlocked(){
                    return buyableEffect("t",11).gte(7)
            },
           
    },// inChallenge("l", 11)
           21: {
            name: "简单试炼4",
            challengeDescription(){

                let a ="（首次推荐战力：20）酒醉般的平衡，点数获取开" 
                let e = (3**(player.cq.challenges[21]+1))   
                let f ="次根，p层级升级14失效,重置点获取^" 
       let g =(2**(player.cq.challenges[21]+1))
    
     let h =" 奖励：每秒自动获取(1e-3*10^x)%生命" 
     
                    return a+e+f+g+h},
            goalDescription(){
                    return "4劝退点"
            },
            challengeEffect(){
                let eff =n(3).pow(player.cq.challenges[21]+1)
          

                return eff
        },
            goal: () => "4",
            canComplete: () => player.esc.points.gte(4),
            rewardDescription(){
                   
                   
                    let b = "当前: " + format(tmp.cq.challenges[21].rewardEffect)+"%"
                    let c = "<br>你完成了" 
                    c += formatWhole(player.cq.challenges[21]) + "/5次"
                    return  b+ c
            },
            completionLimit: 5,
            rewardEffect(){let eff=n(10).pow(player.cq.challenges[21]).div(1000)

                    
                    return eff
            },
            unlocked(){
                    return player.cq.challenges[13]>=1
            },
           
    },// inChallenge("l", 11)
      22: {
            name: "简单试炼5",
            challengeDescription(){

                let a ="（首次推荐战力：50）你的加成太多了,"
     let b = player.cq.challenges[22]>=1?" p层级升级11,12,13失效" :"p层级升级11,12失效" 



    
     let h =" 奖励：每次完成使无瑕点数,变形虫获取x3,增量获取x10" 
     
                    return a+b+h},
            goalDescription(){
                    return "4劝退点"
            },
          
            goal: () => "4",
            canComplete: () => player.esc.points.gte(4),
            rewardDescription(){
                   
                   

                    let c = "<br>你完成了" 
                    c += formatWhole(player.cq.challenges[22]) + "/5次"
                    return   c
            },
            completionLimit: 5,

            unlocked(){
                    return hasAchievement("rw",21)
            },
           
    },// inChallenge("l", 11)
    }, // inChallenge("l", 11)
         
        buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("1e50").mul(n(10000).pow(x)).mul(n(5).pow(x.pow(2)))
                                  if(hasAchievement("rw",36)) c = c.pow(0.9)
                    return c
                },
                display() { return `血量和生命获取<br />x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}生命<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.l.points.gte(this.cost()) },
                buy() {
                    player.l.points = player.l.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                title() {
                    return "提升血量"
                }, 
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = n(1.5).pow(x)
                  
                    return eff
                },
                unlocked(){return hasMilestone("cq", 2) },
            },
            12: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = n("1000").mul(n("2").pow(x))
                  
                    return c
                },
                display() { return `攻击+<br />${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}血量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.cq.hp.gte(this.cost()) },
                buy() {
                    player.cq.hp = player.cq.hp.sub(this.cost())
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
                    var c = n("1000").mul(n("2").pow(x))
                  
                    return c
                },
                display() { return `防御+<br />${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}血量<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.cq.hp.gte(this.cost()) },
                buy() {
                    player.cq.hp = player.cq.hp.sub(this.cost())
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
        doReset(resettingLayer){
            if(layers[resettingLayer].row > layers[this.layer].row){
                let kept = ["unlocked","auto"]
                if(resettingLayer == "cq" && hasUpgrade("cq",31) ){
                    kept.push("challenges")
                }
                layerDataReset(this.layer,kept)
            }
        },
    update(diff){
         player.cq.hp = player.cq.hp.add(layers.cq.effect().mul(diff))
         player.cq.atk = upgradeEffect("cq",10000)
         player.cq.def =upgradeEffect("cq",10001)
if(player.cq.challenges[13]>4)player.cq.challenges[13]=4
if(player.cq.challenges[21]>2)player.cq.challenges[21]=2//下版本删
if(player.cq.challenges[22]>2)player.cq.challenges[22]=2
         if(hasUpgrade("cq",32)&&player.a.points.sub(1).gte(n(hasMilestone("l",32)?"1e10000":"1e14000").mul(n(1e308).pow(getBuyableAmount("a",11))).mul(n(1e10).pow(getBuyableAmount("a",11).pow(2)))))setBuyableAmount("a",11,getBuyableAmount("a",11).add(1))  
          




    },

    
   
})