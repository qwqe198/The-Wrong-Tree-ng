var escReq = [1e5,1e18,1e200,'e1000','e2750','e6000','e4350','e7625','e19590','e47137','e50000','e999999']
function isUnl(escPointsRequired){
    return player.esc.points.gte(escPointsRequired)
}




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
if(inChallenge("esc",11)) return n(Infinity)
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
    row: 99, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
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
        11:{
            requirementDescription: "11劝退点",
            effectDescription: "在重置中保留劝退里程碑和升级，效果触发改为当前劝退点，解锁秘境（在塔中），A层级升级15效果x2.",
            done() { return isUnl(11) }
        },  
           12:{
            requirementDescription: "在加强疫苗中获得1劝退点",
            effectDescription()  {return "I层级升级11加成无瑕（加强疫苗效果后）点数获取,当前:x"+ format( upgradeEffect("i",11).add(10).log10().pow(1.25))},
            done() { return isUnl(1)&&inChallenge("t",11) },
            unlocked(){return inChallenge("t",11)},
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
  resetsNothing(){return hasAchievement("rw",32)},
  
      autoUpgrade(){return hasAchievement("rw",43)},
autoPrestige(){return hasAchievement("rw",31)},
   doReset(resettingLayer){
        if(layers[resettingLayer].row > layers[this.layer].row){
            let kept = ["unlocked","auto"]
            if( hasAchievement("rw",45) ){
                kept.push("milestones")
                kept.push(" upgrades")
 
            }
            layerDataReset(this.layer,kept)
        }
    },
})