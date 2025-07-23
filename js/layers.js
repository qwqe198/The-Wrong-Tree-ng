function getPointGen(){
	let ret = getPointConstant()
        ret = ret.times(getPointMultiplier())
        ret = ret.pow(getPointExponentiation())
        ret = dilate(ret, getPointDilationExponent())

	return ret
}

function getPointConstant(){
        let ret = decimalOne

        return ret
}

function getPointMultiplier(){
        let ret = decimalOne

        for (let i = 0; i < LAYERS.length; i++){
                if (layers[LAYERS[i]].row == "side") continue
                if (LAYERS[i] == "G") continue
                                        ret = ret.times(tmp[LAYERS[i]].effect || decimalOne)
        }

        if (hasUpgrade("a", 11))        ret = ret.times(tmp.a.upgrades[11].effect)
                                        ret = ret.times(CURRENT_BUYABLE_EFFECTS["a11"])
        if (hasUpgrade("a", 12))        ret = ret.times(tmp.a.upgrades[12].effect)

        return ret
}

function getPointExponentiation(){
        let ret = decimalOne

        if (hasUpgrade("a", 15))        ret = ret.times(1.01)
        if (hasMilestone("a", 2)) {
                let base = 1.01
                if (player.b.times > 0 || player.c.unlocked) base = 1.03
                                        ret = ret.times(Decimal.pow(base, player.a.milestones.length))
        }
        
        return ret
}

function getPointDilationExponent(){
        let ret = decimalOne
        
        return ret
}

function getDilationExponent(){
        return getPointDilationExponent()
}

function sortStrings(l){
        l.sort(function(a,b){return Number(a)-Number(b)})
}

var br = "<br>"
var br2= br + br

function dilate(x, exponent, base = 10){
        if (x.lt(base)) return x
        return Decimal.pow(base, x.log(base).pow(exponent))
}

/*
All option+character:
¡™£¢∞§¶•ªº–≠
œ∑´®¥¨ˆøπ“‘«
åß∂ƒ©˙∆˚¬…æ
Ω≈ç√∫˜µ≤≥÷

All option+shift+character:
⁄€‹›ﬁﬂ‡°·‚—±
Œ„´‰ˇÁ¨Ø∏”’»
ÍÎÏ˝ÓÔÒÚÆ
¸˛Ç◊ı˜Â¯˘¿

Made 
𝞀
*/

function makeRed(c){
        return "<bdi style='color:#CC0033'>" + c + "</bdi>"
}

function makeBlue(c){
        return "<bdi style='color:#3379E3'>" + c + "</bdi>"
}

function makeGreen(c){
        return "<bdi style='color:#66E000'>" + c + "</bdi>"
}

function makePurple(c){
        return "<bdi style='color:#66297D'>" + c + "</bdi>"
}
                                                                                                                                                                                                                                                                        
function filter(list, keep){
        return list.filter(x => keep.includes(x) || keep.includes(Number(x)))
}

function filterOut(list, out){
        return list.filter(x => !out.includes(x) && !out.includes(Number(x)))
}

addLayer("a", {
        name: "变形虫", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "A", // 显示在层节点上，默认为首字母大写的ID
        position: 1, // 行内水平位置，默认按ID字母排序
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
        }},
        color: "#BB4C83",
        branches: [],
        requires: new Decimal(10), // 可以是考虑需求增长的函数
        resource: "变形虫", // 声望货币名称
        baseResource: "点数", // 声望基础资源名称
        baseAmount() {return player.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        getResetGain() {
                return getGeneralizedPrestigeGain("a").pow(hasMilestone("d", 1) + 1)
        },
        getBaseDiv(){
                return decimalOne
        },
        getGainExp(){
                let ret = new Decimal(2)

                if (hasUpgrade("a", 13)) ret = ret.max(player.a.upgrades.length)
                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["a31"])

                return ret
        },
        getGainMultPre(){
                let ret = decimalOne

                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a32"])
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b31"])

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("a")

                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a12"])
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a33"].pow(player.a.upgrades.length))
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b12"])

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("a")) return decimalOne

                let amt = player.a.points

                let exp = new Decimal(.5)
                exp = exp.plus(CURRENT_BUYABLE_EFFECTS["a23"])

                let ret = amt.plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("a")
        },
        getNextAt(){
                return getGeneralizedNextAt("a")
        },
        update(diff){
                let data = player.a

                if (tmp.a.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("a", diff)
                
                if (hasMilestone("b", 3) || player.c.unlocked) {
                        handleGeneralizedBuyableAutobuy(diff, "a")
                } else {
                        data.abtime = 0
                }
                data.time += diff
        },
        row: 0, // 层在树中的行数（0为第一行）
        layerShown(){return true},
        prestigeButtonText(){
                if (isPassiveGainActive("a")) return ""
                return getGeneralizedPrestigeButtonText("a")
        },
        canReset(){
                return player.a.time >= 2 && !isPassiveGainActive("a") && tmp.a.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                let a = "变形虫使点数获取倍增"
                                if (player.shiftAlias) return "log10(x+10)<sup>3</sup>"
                                return a + br + "当前：" + format(tmp.a.upgrades[11].effect)
                        },
                        cost: new Decimal(2),
                        effect(){
                                let exp = CURRENT_BUYABLE_EFFECTS["a22"].plus(3)
                                return player.a.points.plus(10).log10().pow(exp)
                        },
                        unlocked(){
                                return player.a.best.gt(0) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "前九个升级每个都会解锁一个变形虫可购买项并使点数获取翻倍"
                        },
                        cost: new Decimal(30),
                        effect(){
                                return Decimal.pow(2, player.a.upgrades.length).min(512)
                        },
                        unlocked(){
                                return player.a.best.gt(10) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "变形虫初始获取指数等于变形虫升级数量"
                        },
                        cost: new Decimal(500),
                        unlocked(){
                                return hasUpgrade("a", 12) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "重置时获得100%变形虫且每秒重置一次，但失去声望能力"
                        },
                        cost: new Decimal(3e10),
                        unlocked(){
                                return hasUpgrade("a", 13) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "A 13基础值增加0.005，点数获取^1.01"
                        },
                        cost: new Decimal(1e20),
                        unlocked(){
                                return hasUpgrade("a", 14) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A 1X基础成本"
                        },
                        cost: new Decimal(1e40),
                        unlocked(){
                                return hasUpgrade("a", 15) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A 11成本的线性指数成本"
                        },
                        cost: new Decimal(1e70),
                        unlocked(){
                                return hasUpgrade("a", 21) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A 22的基础成本"
                        },
                        cost: new Decimal(1e119),
                        unlocked(){
                                return hasUpgrade("a", 22) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A 23的基础成本并解锁河狸"
                        },
                        cost: new Decimal(5e192),
                        unlocked(){
                                return hasUpgrade("a", 23) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A 21的基础成本，每个升级为A 13基础值增加0.01"
                        },
                        cost: new Decimal("1e636"),
                        unlocked(){
                                return hasUpgrade("b", 12) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A 21的线性指数成本成本，A 23赠送免费A 22等级"
                        },
                        cost: new Decimal("1e705"),
                        unlocked(){
                                return player.b.best.gte(1e4) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "每秒重置获得100%河狸，其效果指数+1"
                        },
                        cost: new Decimal("1e819"),
                        unlocked(){
                                return hasUpgrade("a", 31) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "<bdi style='font-size: 80%'>每个升级/10会倍增河狸获取，All--ator根据本行升级增加河狸升级</bdi>"
                        },
                        cost: new Decimal("1e942"),
                        unlocked(){
                                return hasUpgrade("a", 32) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "B 12赠送免费A 32等级，河狸获取指数+0.5"
                        },
                        cost: new Decimal("1e2048"),
                        unlocked(){
                                return hasUpgrade("b", 15) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除A可购买项基础成本，每2个河狸升级使河狸获取指数+0.5"
                        },
                        cost: new Decimal("1e5600"),
                        unlocked(){
                                return hasUpgrade("b", 21) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 35)
                41: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除B 11基础成本，A 31赠送免费A 21等级"
                        },
                        cost: new Decimal("1e38200"),
                        unlocked(){
                                return hasUpgrade("b", 25) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 41)
                42: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "本行每个升级使B 31基础值+1，B 22赠送免费B 12等级"
                        },
                        cost: new Decimal("1e270000"),
                        unlocked(){
                                return hasUpgrade("a", 41) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 42)
                43: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "B 23赠送免费B 21等级"
                        },
                        cost: new Decimal("1e305800"),
                        unlocked(){
                                return hasUpgrade("a", 42) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 43)
                44: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "B 31赠送免费B 13等级并倍增A 11基础值"
                        },
                        cost: new Decimal("1e544600"),
                        unlocked(){
                                return hasUpgrade("a", 43) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 44)
                45: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "B 31赠送免费B 21等级并倍增A 13基础值"
                        },
                        cost: new Decimal("1e861300"),
                        unlocked(){
                                return hasUpgrade("a", 44) || player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 45)
                51: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "移除C 13基础成本，本行每个升级使河狸批量获取翻倍"
                        },
                        cost: new Decimal("e6e25"),
                        unlocked(){
                                return hasUpgrade("c", 23) || player.d.unlocked
                        }, 
                }, // hasUpgrade("a", 51)
                52: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "本行升级倍增水豚基础获取"
                        },
                        cost: new Decimal("e2e26"),
                        unlocked(){
                                return hasUpgrade("a", 51) || player.d.unlocked
                        }, 
                }, // hasUpgrade("a", 52)
                53: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "B 22赠送免费B 21等级"
                        },
                        cost: new Decimal("e8.64e26"),
                        unlocked(){
                                return hasUpgrade("a", 52) || player.d.unlocked
                        }, 
                }, // hasUpgrade("a", 53)
                54: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "每个C 23使C 23基础值+1"
                        },
                        cost: new Decimal("e4.68e28"),
                        unlocked(){
                                return hasUpgrade("a", 53) || player.d.unlocked
                        }, 
                }, // hasUpgrade("a", 54)
                55: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>变形虫"
                        },
                        description(){
                                return "每个C 12使C 21线性成本基础值-1"
                        },
                        cost: new Decimal("e1.28e30"),
                        unlocked(){
                                return hasUpgrade("a", 54) || player.d.unlocked
                        }, 
                }, // hasUpgrade("a", 55)
        },
        buyables: getLayerGeneralizedBuyableData("a", [
                        function(){
                                return hasUpgrade("a", 12) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 12) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 13) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 14) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 15) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 21) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 22) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 23) || player.b.unlocked
                        },
                        function(){
                                return hasUpgrade("a", 24) || player.b.unlocked
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return "4个A 22"
                        },
                        done(){
                                return player.a.buyables[22].gte(4)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个里程碑使A 21基础值增加0.001"
                        },
                }, // hasMilestone("a", 1)
                2: {
                        requirementDescription(){
                                return "1e300点数"
                        },
                        done(){
                                return player.points.gte(1e300)
                        },
                        unlocked(){
                                return hasMilestone("a", 1)
                        },
                        effectDescription(){
                                if (player.b.times > 0 || player.c.unlocked) return "奖励：每个里程碑使点数获取^" + makeRed("1.03")
                                return "奖励：每个里程碑使点数获取^1.01"
                        },
                }, // hasMilestone("a", 2)
                3: {
                        requirementDescription(){
                                return "1e650点数"
                        },
                        done(){
                                return player.points.gte("1e650")
                        },
                        unlocked(){
                                return hasMilestone("a", 2)
                        },
                        effectDescription(){
                                return "奖励：移除A 13成本的线性成本"
                        },
                }, // hasMilestone("a", 3)
                4: {
                        requirementDescription(){
                                return "1e1375点数"
                        },
                        done(){
                                return player.points.gte("1e1375")
                        },
                        unlocked(){
                                return hasMilestone("a", 3)
                        },
                        effectDescription(){
                                return "奖励：移除A 22成本的线性成本且A可购买项免费"
                        },
                }, // hasMilestone("a", 4)
        },
        infoboxes: {
                introBox: {
                        title: "介绍",
                        body(){
                                let a = "<h1>" + makeRed("欢迎来到PRESTIGE CHAIN REINCARNATED!") + "</h1>"
                                let b = "您需要了解七条信息："
                                let c = "第一，按住shift（偶尔control）通常可以查看更多信息"
                                let d = "第二，可购买项是主链中每层的核心功能，每层第九个会赠送该层之前所有可购买项的免费等级"
                                let e = "此外，更高层可购买项会赠送低层同位置可购买项的免费等级"
                                let f = "第三，有存档库。在信息标签页点击\"显示内置存档\"并向下滚动查看"
                                let g = "第四，本游戏设计为在Google Chrome电脑端运行。若非此环境可能会遇到错误或其他问题" 
                                let h = "第五，" +  makeRed("红色") + "内容是下一层提供的增益（重置一次后自动获得，此前不可见）"
                                let i = "第六，\"每个升级\"和\"每个里程碑\"指的是该升级/里程碑/可购买项所在层的升级或里程碑数量"
                                let j = "最后，您可以点击拖动批量购买升级！"

                                return a + br2 + b + br2 + c + br2 + d + br + e + br2 + f + br2 + g + br2 + h + br2 + i + br2 + j
                        },
                },
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                ["prestige-button", "", function (){ return isPassiveGainActive("a") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "您的最佳变形虫数量：" + format(player.a.best) : "已完成" + formatWhole(player.a.times) + "次变形虫重置"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("a")) {
                                                        if (player.shiftAlias) return "变形虫获取公式：" + getGeneralizedPrestigeButtonText("a")
                                                        return "每秒获取" + format(tmp.a.getResetGain) + "变形虫"
                                                }
                                                return "声望有2秒冷却时间（剩余" + format(Math.max(0, 2-player.a.time)) + "秒）" 
                                        },
                                ],
                                "blank", 
                                "upgrades",
                                ["infobox", "introBox"],],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("a")) return "每秒获取" + format(tmp.a.getResetGain) + "变形虫"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("a", 12) || player.b.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "已完成" + formatWhole(player.a.times) + "次变形虫重置"
                                        }
                                ],
                                "milestones"],
                        unlocked(){
                                return player.a.buyables[22].gt(0) || player.b.unlocked
                        },
                },
        },
        onPrestige(gain){
                player.a.times += player.b.best.gt(0) ? 3 : 1
        },
        doReset(layer){
                let data = player.a
                if (layer == "a") data.time = 0
                if (!getsReset("a", layer)) return
                
                data.times = 0

                if (!player.e.unlocked) { //升级
                        let keptUpgrades = 0
                        if (hasMilestone("b", 2)) keptUpgrades += player.b.times
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!player.d.unlocked) { //里程碑
                        let keptMilestones = 0
                        if (hasMilestone("b", 2)) keptMilestones += player.b.times
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //资源
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //可购买项
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        player.a.buyables[resetBuyables[j]] = decimalZero
                }
        },
})

addLayer("b", {
        name: "河狸", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "B", // 显示在层节点上，默认为首字母大写的ID
        position: 2, // 行内水平位置，默认按ID字母排序
        row: 1, // 层在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
        }},
        color: "#EC7D20",
        branches: ["a"],
        requires: new Decimal("1e250"), // 可以是考虑需求增长的函数
        resource: "河狸", // 声望货币名称
        baseResource: "变形虫", // 声望基础资源名称
        baseAmount() {return player.a.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        getResetGain() {
                return getGeneralizedPrestigeGain("b").pow(1 + hasMilestone("e", 1))
        },
        getBaseDiv(){
                return hasUpgrade("c", 51) ? decimalOne : new Decimal(1e230)
        },
        getGainExp(){
                let ret = new Decimal(2)

                if (hasUpgrade("a", 34))        ret = ret.plus(.5)
                if (hasUpgrade("a", 35))        ret = ret.plus(.5 * player.b.upgrades.filter(x => x < 30 && x > 20).length)
                                                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["b23"])

                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(.05)

                if (inChallenge("c", 21))       return ret

                if (hasUpgrade("b", 23))        ret = ret.times(20)
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["c22"])

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("b")

                if (hasUpgrade("b", 13))        ret = ret.times(Decimal.pow(2, player.b.upgrades.length))
                if (hasUpgrade("a", 33))        ret = ret.times(Decimal.pow(player.a.upgrades.length/10, player.a.upgrades.length).max(1))
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b11"])
                if (hasMilestone("b", 8))       ret = ret.times(Decimal.pow(player.b.milestones.length/6, player.b.milestones.length).max(1))
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b31"])
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b33"].pow(player.b.upgrades.length))
                if (hasUpgrade("b", 44))        ret = ret.times(CURRENT_BUYABLE_EFFECTS["b12"])

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("b")) return decimalOne

                let amt = player.b.points

                let exp = new Decimal(1)
                if (hasUpgrade("a", 32))        exp = exp.plus(hasUpgrade("a", 33) ? player.a.upgrades.filter(x => x < 40 && x > 30).length : 1)
                                                exp = exp.plus(CURRENT_BUYABLE_EFFECTS["b13"])

                let ret = amt.times(4).plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("b")
        },
        getNextAt(){
                return getGeneralizedNextAt("b")
        },
        update(diff){
                let data = player.b

                if (tmp.b.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("b", diff)
                
                if (hasMilestone("c", 1) || player.d.unlocked) {
                        handleGeneralizedBuyableAutobuy(diff, "b")
                } else {
                        data.abtime = 0
                }
                data.time += diff
        },
        layerShown(){return hasUpgrade("a", 24) || player.b.unlocked},
        prestigeButtonText(){
                if (isPassiveGainActive("b")) return ""
                return getGeneralizedPrestigeButtonText("b")
        },
         canReset(){
                return player.b.time >= 2 && !isPassiveGainActive("b") && tmp.b.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "变形虫自动购买速度乘以1 + 河狸重置次数"
                                return a
                        },
                        cost: new Decimal(20),
                        unlocked(){
                                return hasMilestone("b", 3) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "A 32赠送免费A 22等级，可批量购买[升级数]倍的变形虫可购买项"
                                return a
                        },
                        cost: new Decimal(1000),
                        unlocked(){
                                return hasUpgrade("b", 11) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "每个升级使河狸获取翻倍，A 22赠送免费A 13和A 11等级"
                                return a
                        },
                        cost: new Decimal(2000),
                        unlocked(){
                                return hasUpgrade("a", 25) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "每个升级使A 32基础值+0.2，A 31赠送免费A 22等级"
                                return a
                        },
                        cost: new Decimal(1e6),
                        unlocked(){
                                return hasUpgrade("a", 32) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "A 32赠送免费A 21和A 13等级，解锁河狸可购买项"
                                return a
                        },
                        cost: new Decimal(6e7),
                        unlocked(){
                                return hasUpgrade("a", 33) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "A 21赠送免费A 12和A 13等级，解锁另一个可购买项"
                                return a
                        },
                        cost: new Decimal(1e13),
                        unlocked(){
                                return hasUpgrade("b", 15) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "B 13赠送免费B 11等级"
                                return a
                        },
                        cost: new Decimal(3e18),
                        unlocked(){
                                return hasUpgrade("b", 21) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "基础河狸获取×20"
                                return a
                        },
                        cost: new Decimal(3e24),
                        unlocked(){
                                return hasUpgrade("b", 22) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "每50个B 12使B 11基础值+0.01"
                                return a
                        },
                        cost: new Decimal(2e36),
                        unlocked(){
                                return hasUpgrade("b", 23) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "B 21赠送免费A 33等级"
                                return a
                        },
                        cost: new Decimal(3e66),
                        unlocked(){
                                return hasUpgrade("b", 24) || player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "B 31赠送免费B 22等级，水豚获取指数+1，每秒购买一个水豚可购买项"
                                return a
                        },
                        cost: new Decimal("ee6"),
                        unlocked(){
                                return hasUpgrade("c", 22) || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "移除C 12线性成本基础，本行及以下每个升级使C 13基础值+0.0001"
                                return a
                        },
                        cost: new Decimal("e39.9e6"),
                        unlocked(){
                                return hasUpgrade("b", 31) || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "C 11赠送免费B 33等级"
                                return a
                        },
                        cost: new Decimal("e157e6"),
                        unlocked(){
                                return hasUpgrade("b", 32) || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "B 22赠送免费B 13等级"
                                return a
                        },
                        cost: new Decimal("e737.5e6"),
                        unlocked(){
                                return hasUpgrade("b", 33) || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "B 23赠送免费B 22等级"
                                return a
                        },
                        cost: new Decimal("e4025e6"),
                        unlocked(){
                                return hasUpgrade("b", 34) || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 35)
                41: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "A 32赠送免费A 23等级，河狸可购买项批量数量平方"
                                return a
                        },
                        cost: new Decimal("e1.62e10"),
                        unlocked(){
                                return hasUpgrade("b", 35) || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 41)
                42: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "C 32的26级后计入水豚里程碑14和A---g-tor"
                                return a
                        },
                        cost: new Decimal("e6.75e10"),
                        unlocked(){
                                return hasUpgrade("b", 41) && player.c.best.gte("1e4989") || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 42)
                43: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "A 12赠送免费A 11等级"
                                return a
                        },
                        cost: new Decimal("e2.01e11"),
                        unlocked(){
                                return hasUpgrade("b", 42) && player.c.best.gte("1e5577") || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 43)
                44: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "B 12影响河狸获取"
                                return a
                        },
                        cost: new Decimal("e9.94e11"),
                        unlocked(){
                                return hasUpgrade("b", 43) && player.c.best.gte("1e6614") || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 44)
                45: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "禁用B-av-r并解锁一个挑战"
                                return a
                        },
                        cost: new Decimal("e1.00e12"),
                        unlocked(){
                                return hasUpgrade("b", 44) && player.c.best.gte("1e7182") || player.d.unlocked
                        }, 
                }, // hasUpgrade("b", 45)
                51: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "变形虫可购买项最大数量为1e100，鸭子升级计入鸭子里程碑5"
                                return a
                        },
                        cost: new Decimal("e2.39e18"),
                        unlocked(){
                                return hasUpgrade("d", 15) || player.e.unlocked
                        }, 
                }, // hasUpgrade("b", 51)
                52: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "C 22赠送免费C 13等级"
                                return a
                        },
                        cost: new Decimal("e2.24e19"),
                        unlocked(){
                                return hasUpgrade("b", 51) || player.e.unlocked
                        }, 
                }, // hasUpgrade("b", 52)
                53: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "C 21赠送免费C 13等级"
                                return a
                        },
                        cost: new Decimal("e9.70e20"),
                        unlocked(){
                                return player.d.buyables[11].gte(6) || player.e.unlocked
                        }, 
                }, // hasUpgrade("b", 53)
                54: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "C 21赠送免费C 11等级"
                                return a
                        },
                        cost: new Decimal("e1.36e21"),
                        unlocked(){
                                return player.d.buyables[11].gte(12) || player.e.unlocked
                        }, 
                }, // hasUpgrade("b", 54)
                55: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>河狸"
                        },
                        description(){
                                let a = "C 13赠送免费C 11等级，水豚批量购买数量平方"
                                return a
                        },
                        cost: new Decimal("e2.02e26"),
                        unlocked(){
                                return player.d.buyables[11].gte(870) || player.e.unlocked
                        }, 
                }, // hasUpgrade("b", 55)
        },
        buyables: getLayerGeneralizedBuyableData("b", [
                        function(){
                                return hasUpgrade("b", 15) || player.c.unlocked
                        },
                        function(){
                                return hasMilestone("b", 5) || player.c.unlocked
                        },
                        function(){
                                return hasUpgrade("b", 21) || player.c.unlocked
                        },
                        function(){
                                return player.b.best.gte(1e48) || player.c.unlocked
                        },
                        function(){
                                return hasMilestone("b", 9) || player.c.unlocked
                        },
                        function(){
                                return hasMilestone("b", 10) || player.c.unlocked
                        },
                        function(){
                                return player.b.buyables[23].gte(8) || player.c.unlocked
                        },
                        function(){
                                return player.b.buyables[31].gte(58) || player.c.unlocked
                        },
                        function(){
                                return player.b.buyables[31].gte(71) || player.c.unlocked
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return "1次河狸重置"
                        },
                        done(){
                                return player.b.times >= 1
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：A13赠送免费A11等级"
                        },
                }, // hasMilestone("b", 1)
                2: {
                        requirementDescription(){
                                return "2次河狸重置"
                        },
                        done(){
                                return player.b.times >= 2
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个变形虫升级和里程碑，移除A 23的线性成本成分"
                        },
                }, // hasMilestone("b", 2)
                3: {
                        requirementDescription(){
                                return "4次河狸重置"
                        },
                        done(){
                                return player.b.times >= 4
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每秒自动购买一个变形虫可购买项，A 31赠送免费A 23等级"
                        },
                }, // hasMilestone("b", 3)
                4: {
                        requirementDescription(){
                                return "8次河狸重置"
                        },
                        done(){
                                return player.b.times >= 8
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：变形虫自动购买器每次激活触发所有可购买项，A 32赠送免费A 12等级"
                        },
                }, // hasMilestone("b", 4)
                5: {
                        requirementDescription(){
                                return "500,000,000河狸"
                        },
                        done(){
                                return player.b.points.gte(5e8)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：A 32赠送免费A 31等级，解锁另一个可购买项"
                        },
                }, // hasMilestone("b", 5)
                6: {
                        requirementDescription(){
                                return "1e23河狸"
                        },
                        done(){
                                return player.b.points.gte(1e23)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：A 31赠送免费A 12等级，移除A可购买项的线性成本成分"
                        },
                }, // hasMilestone("b", 6)
                7: {
                        requirementDescription(){
                                return "1个B 21"
                        },
                        done(){
                                return player.b.buyables[21].gte(1)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 21影响A 32并赠送免费B 11和B 12等级"
                        },
                }, // hasMilestone("b", 7)
                8: {
                        requirementDescription(){
                                return "5e54河狸"
                        },
                        done(){
                                return player.b.points.gte(5e54)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：(里程碑数/6)<sup>里程碑数</sup>倍增河狸获取"
                        },
                }, // hasMilestone("b", 8)
                9: {
                        requirementDescription(){
                                return "1e99河狸"
                        },
                        done(){
                                return player.b.points.gte(1e99)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 13赠送免费B 12等级，移除B 12基础成本，解锁新河狸可购买项"
                        },
                }, // hasMilestone("b", 9)
                10: {
                        requirementDescription(){
                                return "25个B 22"
                        },
                        done(){
                                return player.b.buyables[22].gte(25)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：解锁新河狸可购买项，移除B 13基础成本"
                        },
                }, // hasMilestone("b", 10)
                11: {
                        requirementDescription(){
                                return "1e1112河狸"
                        },
                        done(){
                                return player.b.points.gte("1e1112")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：A 32二次成本基础和B 11线性成本基础变为1.3"
                        },
                }, // hasMilestone("b", 11)
                12: {
                        requirementDescription(){
                                return "1e1168河狸"
                        },
                        done(){
                                return player.b.points.gte("1e1168")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 32赠送免费B 31等级"
                        },
                }, // hasMilestone("b", 12)
                13: {
                        requirementDescription(){
                                return "1e1671河狸"
                        },
                        done(){
                                return player.b.points.gte("1e1671")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除B 11线性成本成分"
                        },
                }, // hasMilestone("b", 13)
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                ["prestige-button", "", function (){ return isPassiveGainActive("b") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "您的最佳河狸数量：" + format(player.b.best) : "已完成" + formatWhole(player.b.times) + "次河狸重置"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("b")) {
                                                        if (player.shiftAlias) return "河狸获取公式：" + getGeneralizedPrestigeButtonText("b")
                                                        return "每秒获取" + format(tmp.b.getResetGain) + "河狸"
                                                }
                                                return "声望有2秒冷却时间（剩余" + format(Math.max(0, 2-player.b.time)) + "秒）" 
                                        },
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("b")) return "每秒获取" + format(tmp.b.getResetGain) + "河狸"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("b", 15) || player.c.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "已完成" + formatWhole(player.b.times) + "次河狸重置"
                                        }
                                ],
                                "milestones"],
                        unlocked(){
                                return player.b.times > 0 || player.c.unlocked
                        },
                },
        },
        onPrestige(gain){
                player.b.times += player.c.best.gt(0) ? 3 : 1
        },
        doReset(layer){
                let data = player.b
                if (layer == "b") data.time = 0
                if (!getsReset("b", layer)) return
                
                data.times = Math.min(data.times, hasMilestone("c", 4) ? player.c.times : 0)

                if (!player.f.unlocked) { //升级
                        let keptUpgrades = 0
                        if (hasMilestone("c", 3)) keptUpgrades += player.c.times
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!player.e.unlocked) { //里程碑
                        let keptMilestones = 0
                        if (hasMilestone("c", 2)) keptMilestones += player.c.times
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //资源
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //可购买项
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        data.buyables[resetBuyables[j]] = decimalZero
                }
        },
})

addLayer("c", {
        name: "水豚", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "C", // 显示在层节点上，默认为首字母大写的ID
        position: 2, // 行内水平位置，默认按ID字母排序
        row: 2, // 层在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                everC12: false,
        }},
        color: "#6B8B2E",
        branches: ["b"],
        requires: new Decimal("1e1971"), // 可以是考虑需求增长的函数
        resource: "水豚", // 声望货币名称
        baseResource: "河狸", // 声望基础资源名称
        baseAmount() {return player.b.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        getResetGain() {
                return getGeneralizedPrestigeGain("c")
        },
        getBaseDiv(){
                return hasUpgrade("c", 51) ? decimalOne : new Decimal("1e1871")
        },
        getGainExp(){
                let ret = new Decimal(4)

                if (hasUpgrade("c", 11))        ret = ret.plus(player.c.upgrades.length)
                if (hasUpgrade("b", 31))        ret = ret.plus(1)
                                                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["c21"])

                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(.01)

                if (hasUpgrade("a", 52))        ret = ret.times(player.a.upgrades.filter(x => x > 50 && x < 60).length)
                                        
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["c31"])
                if (hasUpgrade("d", 15))        ret = ret.times(2)
                if (hasUpgrade("d", 34))        ret = ret.times(player.e.points.max(1).pow(hasUpgrade("c", 52) ? player.c.upgrades.filter(x => x > 50).length ** 2 : 1))

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("c")

                ret = ret.times(CURRENT_BUYABLE_EFFECTS["c11"])
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["c22"])
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["c33"].pow(player.c.upgrades.length))
                
                if (player.c.everC12)           ret = ret.times(10)
                if (hasMilestone("c", 21))      ret = ret.times(getBuyableAmount("c", 33).sub(33).max(0).div(4).floor().pow10())
                if (hasMilestone("c", 26))      ret = ret.times(getBuyableAmount("c", 33).sub(58).pow10().min(100).max(1))

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("c")) return decimalOne

                let amt = player.c.points

                let exp = new Decimal(5)
                if (hasUpgrade("c", 11))        exp = exp.plus(player.c.upgrades.length)

                                                exp = exp.times(CURRENT_BUYABLE_EFFECTS["c23"])
                if (hasMilestone("c", 27))      exp = exp.times(10)
                if (hasMilestone("c", 29))      exp = exp.times(2.5)
                if (hasMilestone("c", 30))      exp = exp.times(getBuyableAmount("c", 33).max(40).log(40).pow(getBuyableAmount("c", 33).sub(94).max(0).min(3)))
                if (hasUpgrade("c", 31))        exp = exp.times(player.d.points.max(10).log10())

                let ret = amt.times(2).plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("c")
        },
        getNextAt(){
                return getGeneralizedNextAt("c")
        },
        update(diff){
                let data = player.c

                if (tmp.c.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("c", diff)
                
                if (hasUpgrade("b", 31) || hasMilestone("d", 1) || player.e.unlocked) {
                        handleGeneralizedBuyableAutobuy(diff, "c")
                } else {
                        data.abtime = 0
                }
                data.time += diff

                if (hasChallenge("c", 12)) player.c.everC12 = true
        },
        layerShown(){return player.b.best.gte("1e1900") || player.c.unlocked},
        prestigeButtonText(){
                if (isPassiveGainActive("c")) return ""
                return getGeneralizedPrestigeButtonText("c")
        },
        canReset(){
                return player.c.time >= 2 && !isPassiveGainActive("c") && tmp.c.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "每个升级使水豚效果和获取指数+1，可批量购买10倍变形虫可购买项"
                                return a
                        },
                        cost: new Decimal(100),
                        unlocked(){
                                return true
                        }, 
                }, // hasUpgrade("c", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "升级数量倍增河狸批量数量，指数化变形虫批量数量，移除B 13线性成本基础"
                                return a
                        },
                        cost: new Decimal(3e7),
                        unlocked(){
                                return hasUpgrade("c", 11) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "移除B 22基础成本，每秒获得100%重置时的水豚，但无法再声望"
                                return a
                        },
                        cost: new Decimal(3e9),
                        unlocked(){
                                return hasUpgrade("c", 12) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "移除B 23基础成本，A 22赠送免费A 21等级"
                                return a
                        },
                        cost: new Decimal(3e12),
                        unlocked(){
                                return hasUpgrade("c", 13) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "移除B 31基础成本和B 2X线性成本基础，B 11赠送免费A 33等级"
                                return a
                        },
                        cost: new Decimal(3e14),
                        unlocked(){
                                return hasUpgrade("c", 14) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "C 12赠送免费B 32等级"
                                return a
                        },
                        cost: new Decimal(3e30),
                        unlocked(){
                                return hasUpgrade("c", 15) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "移除B 31线性成本基础"
                                return a
                        },
                        cost: new Decimal(3e60),
                        unlocked(){
                                return hasUpgrade("c", 21) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "移除C 11基础成本"
                                if (player.e.unlocked) a += makePurple(" 并批量购买所有水豚可购买项")
                                return a
                        },
                        cost: new Decimal("3e1651"),
                        unlocked(){
                                return hasUpgrade("c", 22) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "每个C 31将C 21和C 22基础成本除以10（最小1）"
                                return a
                        },
                        cost: new Decimal("3e4461"),
                        unlocked(){
                                return hasUpgrade("c", 23) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "C 21赠送免费C 12等级"
                                return a
                        },
                        cost: new Decimal("3e5765"),
                        unlocked(){
                                return hasUpgrade("c", 24) || player.d.unlocked
                        }, 
                }, // hasUpgrade("c", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "log10(鸭子数量)倍增水豚效果指数"
                                return a
                        },
                        cost: new Decimal("3e37619"),
                        unlocked(){
                                return hasUpgrade("d", 13) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "每个鸭子升级使鸭子升级倍增鸭子获取，C 31赠送免费C 22等级"
                                return a
                        },
                        cost: new Decimal("3e39714"),
                        unlocked(){
                                return hasUpgrade("c", 31) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "升级数-11倍增基础鸭子获取，C 23赠送免费C 13等级"
                                return a
                        },
                        cost: new Decimal("3e94525"),
                        unlocked(){
                                return hasUpgrade("c", 32) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "D 11赠送免费C 33等级，平方河狸可购买项批量数量"
                                return a
                        },
                        cost: new Decimal("3e538070"),
                        unlocked(){
                                return hasUpgrade("c", 33) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "批量购买5倍鸭子可购买项"
                                if (player.e.unlocked) a += makePurple(" 并为D 13基础值增加0.0001")
                                return a
                        },
                        cost: new Decimal("e73.9e6"),
                        unlocked(){
                                return hasUpgrade("c", 34) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 35)
                41: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "每个升级使C 32和鸭子获取×1.2"
                                return a
                        },
                        cost: new Decimal("e1.52e9"),
                        unlocked(){
                                return hasUpgrade("d", 21) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 41)
                42: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "D 11等级超过16,000时，每级使D 21线性基础降低0.01%（直到1）"
                                return a
                        },
                        cost: new Decimal("e4.401e9"),
                        unlocked(){
                                return hasUpgrade("c", 41) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 42)
                43: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "平方变形虫批量数量、河狸批量数量和河狸可购买项上限"
                                return a
                        },
                        cost: new Decimal("e5.272e9"),
                        unlocked(){
                                return hasUpgrade("c", 42) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 43)
                44: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "D 12等级超过10,000时，每级使D 21和D 22基础成本降低1%，在1e14,042和1e14,126鸭子时重新应用此效果"
                                return a
                        },
                        cost: new Decimal("e5.619e9"),
                        unlocked(){
                                return hasUpgrade("c", 43) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 44)
                45: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "D 22每超过160级时，每10级为D 21基础值增加0.0001，并使D 11和D 12基础成本×1e4（最多10次）"
                                return a
                        },
                        cost: new Decimal("e5.75247e9"),
                        unlocked(){
                                return hasUpgrade("c", 44) || player.e.unlocked
                        }, 
                }, // hasUpgrade("c", 45)
                51: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "移除前五层的获取除数，log10(鹰数量)倍增鹰和基础鸭子获取"
                                return a
                        },
                        cost: new Decimal("e1.05e11"),
                        unlocked(){
                                return hasUpgrade("d", 23) || player.f.unlocked
                        }, 
                }, // hasUpgrade("c", 51)
                52: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "应用Du---效果（本行升级数²），log10(log10(水豚数量))倍增鹰获取（每本行升级）"
                                return a
                        },
                        cost: new Decimal("e1.76e11"),
                        unlocked(){
                                return player.d.points.gte("e26630") || player.f.unlocked
                        }, 
                }, // hasUpgrade("c", 52)
                53: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "应用C-p-b-ra效果（每本行升级）"
                                return a
                        },
                        cost: new Decimal("e5e11"),
                        unlocked(){
                                return player.d.points.gte("e28607") || player.f.unlocked
                        }, 
                }, // hasUpgrade("c", 53)
                54: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                let a = "C--yb-ra影响D 23，D 23基础成本减少1e483，但基础鸭子获取÷1e5"
                                return a
                        },
                        cost: new Decimal("e4.29e12"),
                        unlocked(){
                                return player.d.points.gte("e35741") || player.f.unlocked
                        }, 
                }, // hasUpgrade("c", 54)
                55: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>水豚"
                        },
                        description(){
                                if (player.f.unlocked) return "雀解锁后禁用！"
                                let a = "D 1X基础成本×1e140"
                                return a
                        },
                        cost: new Decimal("e1.12e13"),
                        unlocked(){
                                return player.d.points.gte("e37658") || player.f.unlocked
                        }, 
                }, // hasUpgrade("c", 55)
        },
        buyables: getLayerGeneralizedBuyableData("c", [
                        function(){
                                return hasMilestone("c", 6) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(6) || hasMilestone("c", 7) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(125) || player.d.unlocked
                        },
                        function(){
                                return hasMilestone("c", 9) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(2030) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(2550) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(2800) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(3300) || player.d.unlocked
                        },
                        function(){
                                return player.c.buyables[11].gte(3620) || player.d.unlocked
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return "1次水豚重置"
                        },
                        done(){
                                return player.c.times >= 1
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.d.unlocked) return "奖励：A 22赠送免费A 12等级，每秒自动购买" + makeRed("所有") + "河狸可购买项"
                                return "奖励：A 22赠送免费A 12等级，每秒自动购买一个河狸可购买项"
                        },
                }, // hasMilestone("c", 1)
                2: {
                        requirementDescription(){
                                return "3只水豚"
                        },
                        done(){
                                return player.c.points.gte(3)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除B 21基础成本，每次重置保留一个里程碑"
                        },
                }, // hasMilestone("c", 2)
                3: {
                        requirementDescription(){
                                return "40只水豚"
                        },
                        done(){
                                return player.c.points.gte(40)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个升级，可一次性购买所有河狸可购买项"
                        },
                }, // hasMilestone("c", 3)
                4: {
                        requirementDescription(){
                                return "3,000只水豚"
                        },
                        done(){
                                return player.c.points.gte(3000)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个重置次数，重置倍增河狸自动购买次数/秒，B 32赠送免费B 22等级"
                        },
                }, // hasMilestone("c", 4)
                5: {
                        requirementDescription(){
                                return "1,000,000只水豚"
                        },
                        done(){
                                return player.c.points.gte(1e6)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 32赠送免费B 23等级，可批量购买2倍河狸可购买项"
                        },
                }, // hasMilestone("c", 5)
                6: {
                        requirementDescription(){
                                return "1e17只水豚"
                        },
                        done(){
                                return player.c.points.gte(1e17)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：解锁水豚可购买项，移除B 32基础成本，每个里程碑使B 13基础值+1"
                        },
                }, // hasMilestone("c", 6)
                7: {
                        requirementDescription(){
                                return "1e29只水豚"
                        },
                        done(){
                                return player.c.points.gte(1e29)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除B 33基础成本"
                        },
                }, // hasMilestone("c", 7)
                8: {
                        requirementDescription(){
                                return "1e53只水豚"
                        },
                        done(){
                                return player.c.points.gte(1e53)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：C 13赠送免费C 12和B 33等级，移除B 32线性成本基础"
                        },
                }, // hasMilestone("c", 8)
                9: {
                        requirementDescription(){
                                return "1e1102只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e1102")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除B 33和C 12线性成本基础，解锁新水豚可购买项"
                        },
                }, // hasMilestone("c", 9)
                10: {
                        requirementDescription(){
                                return "1e2660只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e2660")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 12赠送免费B 11等级，每个里程碑使C 22基础值+0.01"
                        },
                }, // hasMilestone("c", 10)
                11: {
                        requirementDescription(){
                                return "1e2906只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e2906")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 21赠送免费B 13等级，Bea--r影响C 12"
                        },
                }, // hasMilestone("c", 11)
                12: {
                        requirementDescription(){
                                return "3e3213只水豚"
                        },
                        done(){
                                return player.c.points.gte("3e3213")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：C 23赠送免费C 22等级"
                        },
                }, // hasMilestone("c", 12)
                13: {
                        requirementDescription(){
                                return "1e3943只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e3943")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个B 33使C 23基础成本-1（直到25,000）"
                        },
                }, // hasMilestone("c", 13)
                14: {
                        requirementDescription(){
                                return "1e4210只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e4210")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个C 22使C 11线性成本基础-0.0001（直到1）"
                        },
                }, // hasMilestone("c", 14)
                15: {
                        requirementDescription(){
                                return "1e4682只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e4682")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 31赠送免费B 23等级"
                        },
                }, // hasMilestone("c", 15)
                16: {
                        requirementDescription(){
                                return "1e4943只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e4943")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：C-py-ara影响C 23"
                        },
                }, // hasMilestone("c", 16)
                17: {
                        requirementDescription(){
                                return "1e5325只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e5325")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：平方B 11基础值"
                        },
                }, // hasMilestone("c", 17)
                18: {
                        requirementDescription(){
                                return "1e6202只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e6202")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：可批量购买2倍更多变形虫和河狸可购买项"
                        },
                }, // hasMilestone("c", 18)
                19: {
                        requirementDescription(){
                                return "1e6531只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e6531")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 12基础值提升至C 33等级数，每个B 33使C 32线性成本基础-1（最小100,000）"
                        },
                }, // hasMilestone("c", 19)
                20: {
                        requirementDescription(){
                                return "1e7761只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e7761")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：解锁新挑战，B 23赠送免费B 13等级，B 32赠送免费B 21等级"
                        },
                }, // hasMilestone("c", 20)
                21: {
                        requirementDescription(){
                                return "1e8443只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e8443")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过33的C 33将C 23线性成本基础÷2.5（直到1），每4个额外赠送10倍水豚"
                        },
                }, // hasMilestone("c", 21)
                22: {
                        requirementDescription(){
                                return "1e9214只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e9214")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个后续里程碑使C 33基础值+0.015"
                        },
                }, // hasMilestone("c", 22)
                23: {
                        requirementDescription(){
                                return "1e9418只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e9418")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 23赠送免费B 12等级"
                        },
                }, // hasMilestone("c", 23)
                24: {
                        requirementDescription(){
                                return "1e9488只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e9488")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个C 32将C 31基础成本÷10"
                        },
                }, // hasMilestone("c", 24)
                25: {
                        requirementDescription(){
                                return "1e9658只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e9658")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个C 33将C 32基础成本÷10"
                        },
                }, // hasMilestone("c", 25)
                26: {
                        requirementDescription(){
                                return "1e10,050只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e10050")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 22赠送免费B 11等级，超过54的C 33将C 31线性成本基础÷40（最小1），超过58的每个赠送10倍水豚"
                        },
                }, // hasMilestone("c", 26)
                27: {
                        requirementDescription(){
                                return "1e10,933只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e10933")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：水豚效果提升至10次方，超过65的C 33将C 22线性成本基础÷1.4（最小1）"
                        },
                }, // hasMilestone("c", 27)
                28: {
                        requirementDescription(){
                                return "1e11,116只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e11116")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：B 11基础值提升至sqrt(C 33)（69个C 33时指数变为0.76）"
                        },
                }, // hasMilestone("c", 28)
                29: {
                        requirementDescription(){
                                return "1e11,363只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e11363")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：水豚效果指数×2.5，超过74的C 33使C 31基础值+0.0008，超过72的C 33使C 13线性成本基础-6（最小15）"
                        },
                }, // hasMilestone("c", 29)
                30: {
                        requirementDescription(){
                                return "1e12,896只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e12896")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：log40(C 33数量)<sup>min(3, C 33 - 94)</sup>倍增水豚效果指数"
                        },
                }, // hasMilestone("c", 30)
                31: {
                        requirementDescription(){
                                return "1e14,001只水豚"
                        },
                        done(){
                                return player.c.points.gte("1e14001")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过100的C 33将其线性成本基础÷2.041（最小1e58）"
                        },
                }, // hasMilestone("c", 31)
        },
        challenges: {
                11: {
                        name: "挑战？",
                        goal(){
                                let id = player.c.challenges[11]
                                let x = [
                                        4.428e9, 5.305e9, 5.777e9, 6.269e9, 6.7821e9, 
                                        3.586e10, 3.878e10, 4.028e10, 4.181e10, 4.337e10, 
                                        7.432e11, 7.702e11, 7.975e11, 8.533e11, 8.963e11]
                                return Decimal.pow(10, x[id])
                        },
                        canComplete: () => player.b.points.gte(tmp.c.challenges[11].goal),
                        fullDisplay(){
                                let a = "禁用水豚和B 23效果" + br 
                                a += "目标：" + format(tmp.c.challenges[11].goal, 4) + "河狸" + br2
                                a += "奖励：为C 11、C 22和C 33基础值增加" + format(tmp.c.challenges[11].rewardEffect) + br
                                a += "（每完成一次增加0.01）"
                                return a + br2 + "完成次数：" + player.c.challenges[11] + "/15"
                        },
                        rewardEffect(){
                                return new Decimal(player.c.challenges[11] / 100)
                        },
                        unlocked(){
                                return hasUpgrade("b", 45) || player.d.unlocked
                        },
                        countsAs: [],
                        completionLimit: 15,
                }, // inChallenge("c", 11)
                12: {
                        name: "挑战！",
                        goal(){
                                let id = player.c.challenges[12]
                                return Decimal.pow(10, [3.15e12, 5.99e12, 6.095e12, 6.421e12, 6.615e12][id])
                        },
                        canComplete: () => player.b.points.gte(tmp.c.challenges[12].goal),
                        fullDisplay(){
                                if (player.shiftAlias) return "公式：(x-1)<sup>1.4</sup>"
                                let a = "禁用B 12效果" + br 
                                a += "目标：" + format(tmp.c.challenges[12].goal, 4) + "河狸" + br2
                                a += "奖励：C 22赠送免费C 12等级，永久获得10倍水豚，"
                                a += "每个水豚可购买项使C 22线性成本基础-" + formatWhole(tmp.c.challenges[12].rewardEffect) + br
                                a += "（基于完成次数）"
                                return a + br2 + "完成次数：" + player.c.challenges[12] + "/5"
                        },
                        rewardEffect(){
                                return new Decimal(player.c.challenges[12]).sub(1).max(0).pow(1.4)
                        },
                        unlocked(){
                                return hasMilestone("c", 20) || player.d.unlocked
                        },
                        countsAs: [],
                        completionLimit: 5,
                }, // inChallenge("c", 12)
                21: {
                        name: "挑战！？",
                        goal(){
                                let id = player.c.challenges[21]
                                return Decimal.pow(10, [6.7e13, 7.85e13, 1.53e14, 2e14, 2.73e14, 5.46e16, 6.36e16, 1.26e17, 1.462e17, 7.45e17][id])
                        },
                        canComplete: () => player.b.points.gte(tmp.c.challenges[21].goal),
                        fullDisplay(){
                                let a = "基础河狸获取倍率禁用" + br 
                                a += "目标：" + format(tmp.c.challenges[21].goal, 4) + "河狸" + br2
                                a += "奖励：C 32赠送免费C 31/23/22等级，完成3次后每个额外完成使C 33基础值+1"
                                return a + br2 + "完成次数：" + player.c.challenges[21] + "/10"
                        },
                        unlocked(){
                                return hasUpgrade("d", 12)
                        },
                        countsAs: [],
                        completionLimit: 10,
                }, // inChallenge("c", 21)
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                ["prestige-button", "", function (){ return isPassiveGainActive("c") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "您的最佳水豚数量：" + format(player.c.best) : "已完成" + formatWhole(player.c.times) + "次水豚重置"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("c")) {
                                                        if (player.shiftAlias) return "水豚获取公式：" + getGeneralizedPrestigeButtonText("c")
                                                        return "每秒获取" + format(tmp.c.getResetGain) + "水豚"
                                                }
                                                return "声望有2秒冷却时间（剩余" + format(Math.max(0, 2-player.c.time)) + "秒）" 
                                        },
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("c")) return "每秒获取" + format(tmp.c.getResetGain) + "水豚"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasMilestone("c", 6) || player.d.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "已完成" + formatWhole(player.c.times) + "次水豚重置"
                                        }
                                ],
                                "milestones"
                        ],
                        unlocked(){
                                return player.c.times > 0 || player.d.unlocked
                        },
                },
                "挑战": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "已完成" + formatWhole(player.c.times) + "次水豚重置"
                                        }
                                ],
                                "challenges"
                        ],
                        unlocked(){
                                return hasUpgrade("b", 45) || player.d.unlocked
                        },
                },
                "信息": {
                        content: [
                                ["display-text", "解锁一个层会使..." + br + makeRed("上方2层") + "获得被动生成和自动购买"],
                                ["display-text", 
                                        function() {
                                                let a = makeRed("上方3层") + "保留所有里程碑并使自动购买器一次性购买所有可购买项"
                                                if (player.f.unlocked) return a.replace("购买", makePurple("批量10倍购买"))
                                                return a
                                        }
                                ],
                                ["display-text", makeRed("上方4层") + "保留所有升级"],
                                ["display-text", function(){return player.d.unlocked ? makeRed("上方5层") + "保留所有挑战" : ""}],
                                ["display-text", function(){return player.f.buyables[12].gte(100) ? "基础鹰获取效果软上限为1e7800" : ""}]
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
        onPrestige(gain){
                player.c.times += player.d.best.gt(0) ? 3 : 1
        },
        doReset(layer){
                let data = player.c
                if (layer == "c") data.time = 0
                if (!getsReset("c", layer)) return
                
                data.times = Math.min(hasMilestone("d", 2) ? player.d.times : 0, data.times)

                if (!false/*player.g.unlocked*/) { //升级
                        let keptUpgrades = 0
                        if (hasMilestone("d", 5)) keptUpgrades += player.d.times
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!player.f.unlocked) { //里程碑
                        let keptMilestones = 0
                        if (hasMilestone("d", 3)) keptMilestones += player.d.times
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //资源
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //可购买项
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        data.buyables[resetBuyables[j]] = decimalZero
                }

                //挑战
                let resetChallenges = [11, 12]
                if (layer != "d") resetChallenges = [11, 12, 13]
                for (let j = 0; j < resetChallenges.length; j++) {
                        if (hasMilestone("d", 4) || hasMilestone("G", 2)) break
                        data.challenges[resetChallenges[j]] = 0
                }
        },
})



addLayer("d", {
        name: "鸭子", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "D", // 显示在层节点上，默认为首字母大写的ID
        position: 3, // 行内水平位置，默认按ID字母排序
        row: 3, // 层在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                everU15: false,
        }},
        color: "#6B46B9",
        branches: ["c"],
        requires: new Decimal("1e15020"), // 可以是考虑需求增长的函数
        resource: "鸭子", // 声望货币名称
        baseResource: "水豚", // 声望基础资源名称
        baseAmount() {return player.c.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        getResetGain() {
                return getGeneralizedPrestigeGain("d")
        },
        getBaseDiv(){
                return hasUpgrade("c", 51) ? decimalOne : new Decimal("1e14020")
        },
        getGainExp(){
                let ret = new Decimal(5)

                if (hasUpgrade("d", 11) && !hasUpgrade("d", 41)) {
                                                ret = ret.plus(player.d.upgrades.length)
                }
                                                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["d21"])
                if (hasMilestone("d", 18))      ret = ret.plus(1)
                if (hasMilestone("d", 20) && player.d.points.gte("1e15000") && !hasMilestone("f", 8)) {
                                                ret = ret.sub(6)
                }
                                                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["e12"])
                if (hasMilestone("G", 1))       ret = ret.plus(player.T.points)

                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(.001)

                if (!hasMilestone("e", 45))     ret = ret.plus(CURRENT_BUYABLE_EFFECTS["d21"])

                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["d23"])
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e11"])
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e13"])
                if (hasUpgrade("c", 33))        ret = ret.times(Math.max(player.c.upgrades.length - 11, 1))
                
                /* */
                let eaglesexp = hasMilestone("d", 22) ? 1 : 0
                if (hasUpgrade("c", 51) && !hasMilestone("e", 24)) eaglesexp += hasUpgrade("c", 53) ? player.c.upgrades.filter(x => x > 50).length : 1
                if (hasUpgrade("e", 15)) {
                        eaglesexp += player.e.upgrades.length
                        if (!hasMilestone("f", 4))      ret = ret.div(Decimal.pow(16, player.e.upgrades.length))
                }

                if (hasMilestone("e", 13) && (getBuyableAmount("e", 11).gte(150)) && !hasMilestone("e", 33)) {
                                                ret = ret.times(player.e.points.max(10).log10().ceil().pow(eaglesexp))
                } else {
                                                ret = ret.times(player.e.points.max(10).log10().pow(eaglesexp))
                }
                /* */ 
                
                if (hasMilestone("d", 24))      ret = ret.div(2)
                if (hasMilestone("d", 25))      ret = ret.div(24)
                if (hasUpgrade("c", 54))        ret = ret.div(1e5)
                if (hasUpgrade("d", 42) && player.d.points.gte("1e10000"))        ret = ret.div(65432)
                if (hasMilestone("e", 14) && getBuyableAmount("e", 11).gte(200) && !hasMilestone("f", 5)) {
                                                ret = ret.div(700)
                }
                if (hasMilestone("e", 18))      ret = ret.times(Decimal.pow(10, hasMilestone("f", 5) ? 40 : -4))
                if (hasMilestone("e", 19))      ret = ret.div(1e7)
                if (hasMilestone("e", 20))      ret = ret.div(10)
                if (!hasMilestone("f", 7)) {
                        if (hasMilestone("e", 48) && player.e.points.gte("1e1720")) {
                                ret = ret.div(1e6)
                        }
                        if (hasMilestone("e", 49) && player.e.points.gte("1e1745")) {
                                ret = ret.div(1e6)
                        }
                        if (hasMilestone("e", 50) && player.e.points.gte("1e1776")) {
                                ret = ret.div(1e6)
                        }
                        if (hasMilestone("e", 51) && player.e.points.gte("1e1790")) {
                                ret = ret.div(1e6)
                        }
                }
                if (hasMilestone("e", 58))      ret = ret.div(1e50)
                if (hasMilestone("e", 61)) {
                        ret = ret.div(1e10)
                        if (player.e.best.gte("1e5183")) ret = ret.div(1e51)
                }
                if (hasMilestone("e", 62))      ret = ret.div(1e31)
                if (hasMilestone("e", 67))      ret = ret.div(1e210)
                if (hasMilestone("e", 75))      ret = ret.div("1e409")
                if (hasMilestone("e", 77))      ret = ret.times(Decimal.pow(2, getBuyableAmount("e", 31).sub(100).max(0)))
                if (hasMilestone("f", 8) && hasMilestone("T", 8)) {
                                                ret = ret.times("1e5000")
                }

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("d")

                if (!hasMilestone("d", 19)) {
                        if (hasUpgrade("c", 32))        ret = ret.times(Decimal.pow(player.d.upgrades.length, player.d.upgrades.length))
                        if (hasUpgrade("c", 41))        ret = ret.times(Decimal.pow(1.2, player.c.upgrades.length))
                }
                if (hasMilestone("e", 5) && player.d.points.lt("1e10000")) {
                        ret = ret.times(1e20)
                }
                if (hasUpgrade("e", 12))                ret = ret.times(Decimal.pow(player.e.upgrades.length, player.e.upgrades.length))
                                                        ret = ret.times(CURRENT_BUYABLE_EFFECTS["d11"])
                                                        ret = ret.times(CURRENT_BUYABLE_EFFECTS["d32"])
                                                        ret = ret.times(CURRENT_BUYABLE_EFFECTS["d33"].pow(player.c.upgrades.length))
                if (hasMilestone("f", 4))               ret = ret.times(player.G.unlocked ? "1e1000" : 1e10)

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("d")) return decimalOne

                let amt = player.d.points

                let exp = amt.plus(999).log10().min(100)
                if (hasUpgrade("d", 24)) exp = exp.times(player.d.upgrades.length ** 2)
                if (hasMilestone("d", 18) && player.d.points.gte("1e14830")) exp = exp.times(5)
                if (hasMilestone("d", 20) && player.d.points.gte("1e15444")) exp = exp.times(2)
                if (hasMilestone("e", 12))      exp = exp.times(player.e.milestones.length ** 2)

                let ret = amt.plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("d")
        },
        getNextAt(){
                return getGeneralizedNextAt("d")
        },
        update(diff){
                let data = player.d

                if (tmp.d.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("d", diff)
                
                if (hasMilestone("d", 11)  || player.f.unlocked) {
                        if (hasMilestone("e", 22) || player.f.unlocked) {
                                handleGeneralizedBuyableAutobuy(diff, "d")
                        } else {
                                let mincost = getBuyableCost("d", 11).min(getBuyableCost("d", 12)).min(getBuyableCost("d", 13))
                                if (mincost.div(10).lte(tmp.d.getResetGain)) {
                                        handleGeneralizedBuyableAutobuy(diff, "d")
                                }
                        }
                } else {
                        data.abtime = 0
                }
                data.time += diff

                if (hasUpgrade("d", 15)) data.everU15 = true
        },
        layerShown(){return player.c.best.gte("1e15000") || player.d.unlocked},
        prestigeButtonText(){
                if (isPassiveGainActive("d")) return ""
                return getGeneralizedPrestigeButtonText("d")
        },
        canReset(){
                return player.d.time >= 2 && !isPassiveGainActive("d") && tmp.d.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 13线性成本基础每150个C 33减少0.1，每个升级使获取指数+1"
                                return a
                        },
                        cost: new Decimal(1e4),
                        unlocked(){
                                return true 
                        }, 
                }, // hasUpgrade("d", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "禁用鸭子声望，但重置时获得100%鸭子且每秒重置一次"
                                return a
                        },
                        cost: new Decimal(1e5),
                        unlocked(){
                                return player.d.times >= 70 || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 32对C 21上限的加成变为0.27，鸭子数量每增加10个数量级将C 33线性成本基础÷10"
                                return a
                        },
                        cost: new Decimal(1e10),
                        unlocked(){
                                return hasUpgrade("d", 12) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 31赠送免费C 23等级，河狸批量数量×3"
                                return a
                        },
                        cost: new Decimal(5e15),
                        unlocked(){
                                return hasUpgrade("d", 13) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "永久移除C 32基础成本，基础水豚获取×2"
                                return a
                        },
                        cost: new Decimal(1e20),
                        unlocked(){
                                return hasUpgrade("d", 14) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "鸭子可购买项免费"
                                return a
                        },
                        cost: new Decimal(1e41),
                        unlocked(){
                                return hasUpgrade("d", 15) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 23赠送免费C 21等级"
                                return a
                        },
                        cost: new Decimal(1e66),
                        unlocked(){
                                return hasUpgrade("d", 21) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "当拥有超过1e600鸭子时，D 13赠送免费D 11和C 33等级，但D 11基础成本×1e100"
                                return a
                        },
                        cost: new Decimal("1e613"),
                        unlocked(){
                                return hasUpgrade("d", 22) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 11减少D 21线性基础（最多900,000），升级数²倍增鸭子效果指数"
                                return a
                        },
                        cost: new Decimal("1e831"),
                        unlocked(){
                                return hasUpgrade("d", 23) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "D 21赠送免费D 11、D 12和D 13等级"
                                return a
                        },
                        cost: new Decimal("1e895"),
                        unlocked(){
                                return hasUpgrade("d", 24) || player.e.unlocked
                        }, 
                }, // hasUpgrade("d", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 13基础值提升至D 11的立方根次方"
                                return a
                        },
                        cost: new Decimal("1e21916"),
                        unlocked(){
                                return hasUpgrade("e", 14) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "C 33基础值提升至D 12的立方根次方"
                                return a
                        },
                        cost: new Decimal("1e22675"),
                        unlocked(){
                                return hasUpgrade("d", 31) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "D 22等级倍增鹰获取，并为D 13基础值+0.0004"
                                return a
                        },
                        cost: new Decimal("1e22990"),
                        unlocked(){
                                return hasUpgrade("d", 32) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "鹰倍增基础水豚获取"
                                return a
                        },
                        cost: new Decimal("1e26375"),
                        unlocked(){
                                return hasUpgrade("d", 33) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子"
                        },
                        description(){
                                let a = "升级倍增鹰获取"
                                return a
                        },
                        cost: new Decimal("1e27700"),
                        unlocked(){
                                return hasUpgrade("d", 34) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 35)
                41: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "D-cks不再影响鸭子获取指数，D 21基础×2，D 23基础×2.5"
                                return a
                        },
                        cost: new Decimal("1e40205"),
                        unlocked(){
                                return hasUpgrade("c", 55) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 41)
                42: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "D 23基础成本÷1e1000，基础鸭子获取÷65,432"
                                return a
                        },
                        cost: new Decimal("1e40342"),
                        unlocked(){
                                return hasUpgrade("d", 41) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 42)
                43: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "每18,000个D 12为D 23基础+0.0002，在1e43,052和1e43,161鸭子时重新应用此效果"
                                return a
                        },
                        cost: new Decimal("1e42943"),
                        unlocked(){
                                return hasUpgrade("d", 42) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 43)
                44: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "每个D 23等级（最多10,000）使鹰获取×D 22等级/1e5"
                                return a
                        },
                        cost: new Decimal("1e43377"),
                        unlocked(){
                                return hasUpgrade("d", 43) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 44)
                45: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "log10(log10(鸭子数量))倍增鹰获取"
                                return a
                        },
                        cost: new Decimal("1e49380"),
                        unlocked(){
                                return getBuyableAmount("e", 11).gte(7) || player.f.unlocked
                        }, 
                }, // hasUpgrade("d", 45)
                51: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "D 11基础值提升至层级数²次方，超过200的层级每级使Faster Sifter基础-0.01"
                                return a
                        },
                        cost: new Decimal("e3.55e19"),
                        unlocked(){
                                return hasMilestone("f", 8) || player.G.unlocked
                        }, 
                }, // hasUpgrade("d", 51)
                52: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "鹰里程碑83计入每个层级，被动增益完成也会减少雀里程碑7"
                                return a
                        },
                        cost: new Decimal("e2.18e22"),
                        unlocked(){
                                return hasUpgrade("d", 51) || player.G.unlocked
                        }, 
                }, // hasUpgrade("d", 52)
                53: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "层级数<sup>立方根(F 11)</sup>倍增E 31基础值"
                                return a
                        },
                        cost: new Decimal("e3.76e25"),
                        unlocked(){
                                return hasUpgrade("d", 52) || player.G.unlocked
                        }, 
                }, // hasUpgrade("d", 53)
                54: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                if (player.shiftAlias) return "当前：每层级×" + format(tmp.d.upgrades[54].effect)
                                let a = "每超过639的层级使每个F 12×3翡翠获取（在1000/10,000时软上限/硬上限，按住shift查看效果）"
                                return a
                        },
                        effect(){
                                let l = getBuyableAmount("f", 12)
                                if (l.gte(4000)) l = l.min(1e4).times(4000).sqrt()//.times(2.5).log10().pow(2.5).times(125)
                                if (l.gte(3600)) l = l.times(3600).sqrt()
                                if (l.gte(1000)) l = l.times(2000).sub(1e6).sqrt()
                                return Decimal.pow(3, l)
                        },
                        cost: new Decimal("e3.81e38"),
                        unlocked(){
                                return hasUpgrade("d", 53) || player.G.unlocked
                        }, 
                }, // hasUpgrade("d", 54)
                55: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>鸭子<sup>2</sup>"
                        },
                        description(){
                                let a = "每10个F 13等级使Tired Tiers二次基础-0.0001"
                                return a
                        },
                        cost: new Decimal("e2.58e40"),
                        unlocked(){
                                return hasUpgrade("d", 54) || player.G.unlocked
                        }, 
                }, // hasUpgrade("d", 55)
        },
        buyables: getLayerGeneralizedBuyableData("d", [
                        function(){
                                return hasMilestone("d", 8) || player.e.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(500) || player.e.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(1100) || player.e.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(3750) || player.e.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(17000) || player.e.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(26700) || player.f.unlocked
                        },
                        function(){
                                return hasMilestone("e", 18) || player.f.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(52e3) || player.f.unlocked
                        },
                        function(){
                                return player.d.buyables[11].gte(62e3) || player.f.unlocked
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return "1次鸭子重置"
                        },
                        done(){
                                return player.d.times >= 1
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：自动购买水豚可购买项，每次自动购买触发所有可购买项，平方变形虫获取，C 11基础成本-0.01"
                        },
                }, // hasMilestone("d", 1)
                2: {
                        requirementDescription(){
                                return "2次鸭子重置"
                        },
                        done(){
                                return player.d.times >= 2
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：批量购买2倍河狸和水豚可购买项，每次重置保留一个水豚重置，C 32超过0.05的效果加成到C 22基础值"
                        },
                }, // hasMilestone("d", 2)
                3: {
                        requirementDescription(){
                                return "3次鸭子重置"
                        },
                        done(){
                                return player.d.times >= 3
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个里程碑，重置倍增水豚自动购买速度"
                        },
                }, // hasMilestone("d", 3)
                4: {
                        requirementDescription(){
                                return "4次鸭子重置"
                        },
                        done(){
                                return player.d.times >= 4
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：保留挑战，每次重置<sup>1.5</sup>使C 32线性成本基础÷1.02（最小1）"
                        },
                }, // hasMilestone("d", 4)
                5: {
                        requirementDescription(){
                                return "100只鸭子"
                        },
                        done(){
                                return player.d.points.gte(100)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个升级，水豚批量数量×3，每个里程碑使C 33线性成本基础÷10"
                        },
                }, // hasMilestone("d", 5)
                6: {
                        requirementDescription(){
                                return "1000只鸭子"
                        },
                        done(){
                                return player.d.points.gte(1000)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：平方水豚批量数量，C 13基础值+0.0001"
                        },
                }, // hasMilestone("d", 6)
                7: {
                        requirementDescription(){
                                return "200,000/(鸭子重置次数+1)只鸭子"
                        },
                        done(){
                                return player.d.points.times(player.d.times + 1).gte(2e5)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：鸭子<sup>鸭子重置次数</sup>÷C 33成本基础"
                        },
                }, // hasMilestone("d", 7)
                8: {
                        requirementDescription(){
                                return "1e30只鸭子"
                        },
                        done(){
                                return player.d.points.gte(1e30)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：C 31赠送免费C 21等级，解锁鸭子可购买项"
                        },
                }, // hasMilestone("d", 8)
                9: {
                        requirementDescription(){
                                return "1e115只鸭子"
                        },
                        done(){
                                return player.d.points.gte(1e115)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：C 22赠送免费C 21等级"
                        },
                }, // hasMilestone("d", 9)
                10: {
                        requirementDescription(){
                                return "1e168只鸭子"
                        },
                        done(){
                                return player.d.points.gte(1e168)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：C 33基础值提升至里程碑数量次方，当拥有1,000个D 11时C 11从C 12获得免费等级"
                        },
                }, // hasMilestone("d", 10)
                11: {
                        requirementDescription(){
                                return "1e196只鸭子"
                        },
                        done(){
                                return player.d.points.gte(1e196)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.unlocked)          return "奖励：每秒自动购买" + makePurple("所有") + "鸭子可购买项，每个D 13使D 11和D 12成本基础-" + makePurple("1.04")
                                if (hasMilestone("e", 22))      return "奖励：每秒自动购买一个鸭子可购买项，每个D 13使D 11和D 12成本基础×1.03"
                                return "奖励：每秒自动购买一个鸭子可购买项（当10秒生产能购买第一行升级时），每个D 13使D 11和D 12成本基础×1.03"
                        },
                }, // hasMilestone("d", 11)
                12: {
                        requirementDescription(){
                                return "1e727只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e727")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 13减少自身线性基础（最多8），前一里程碑也影响D 13"
                        },
                }, // hasMilestone("d", 12)
                13: {
                        requirementDescription(){
                                return "1e1134只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e1134")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.shiftAlias) return "注意：仅在超过1e1111鸭子时生效"
                                return "奖励：D 13赠送免费D 12等级，D 11基础-0.1，D 21基础成本÷1e145"
                        },
                }, // hasMilestone("d", 13)
                14: {
                        requirementDescription(){
                                return "1e4000只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e4000")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：鸭子自动购买器触发频率×2，效果×2，同时购买所有可购买项，D 21线性基础=1e6 - C 21"
                        },
                }, // hasMilestone("d", 14)
                15: {
                        requirementDescription(){
                                return "1e12,825只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e12825")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：鸭子自动购买器触发频率×2，效果×2，D 22线性基础÷2，在1e12,859和1e13,059鸭子时重新应用此效果"
                        },
                }, // hasMilestone("d", 15)
                16: {
                        requirementDescription(){
                                return "1e13,440只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e13440")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 22基础÷2但D 12成本基础×1e21。在1e13,475鸭子时重新应用。在1e13,631鸭子时，每个D 22等级使D 21基础-（1 + 里程碑数/400）"
                        },
                }, // hasMilestone("d", 16)
                17: {
                        requirementDescription(){
                                return "1e14,393只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e14393")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 22线性成本基础-1,250,000。在203、214、215和226级D 22时重新应用此效果"
                        },
                }, // hasMilestone("d", 17)
                18: {
                        requirementDescription(){
                                return "1e14,668只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e14668")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 11和D 12基础成本×1e18，鸭子指数+1。在1e14,830鸭子时鸭子效果指数×5"
                        },
                }, // hasMilestone("d", 18)
                19: {
                        requirementDescription(){
                                return "1e14,938只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e14938")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 21基础+0.0005，但Cap--ara和Capyb-ra不再倍增鸭子获取"
                        },
                }, // hasMilestone("d", 19)
                20: {
                        requirementDescription(){
                                return "1e15,025只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e15025")
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                player.d.buyables[22] = player.d.buyables[22].min(260)
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8增强"
                                        return "奖励：D 22等级降至260，线性基础×6，赠送免费D 12等级。在1e15,444鸭子时鸭子效果指数×2"
                                }
                                if (player.shiftAlias) return "仅在超过1e15,000鸭子时生效"
                                return "奖励：鸭子获取指数-6，D 22等级降至260，线性基础×6，赠送免费D 12等级。在1e15,444鸭子时鸭子效果指数×2"
                        },
                }, // hasMilestone("d", 20)
                21: {
                        requirementDescription(){
                                return "1e19,205只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e19205")
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                player.d.buyables[22] = player.d.buyables[22].min(260)
                        },
                        effectDescription(){
                                return "奖励：D 22赠送免费D 13等级，D 11基础-0.1，鸭子里程碑16不再减少D 21基础成本，D 22基础成本÷1e2182，D 22线性基础×1e5"
                        },
                }, // hasMilestone("d", 21)
                22: {
                        requirementDescription(){
                                return "1e20,480只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e20480")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：log10(鹰数量)倍增鹰和基础鸭子获取。C 22基础值提升至sqrt(D 21等级+1)"
                        },
                }, // hasMilestone("d", 22)
                23: {
                        requirementDescription(){
                                return hasMilestone("d", 24) ? "1e32,353只鸭子" : "1e31,160只鸭子"
                        },
                        done(){
                                return player.d.points.gte(hasMilestone("d", 24) ? "1e32353" : "1e31160")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("d", 24)) return "奖励：D 23赠送免费D 13等级<i>但D 23线性基础×8e12</i>。在1e31,304鸭子时也赠送免费D 12等级"
                                return "奖励：D 23赠送免费D 13等级。在1e31,304鸭子时也赠送免费D 12等级"
                        },
                }, // hasMilestone("d", 23)
                24: {
                        requirementDescription(){
                                return "1e31,468只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e31468")
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                player.d.milestones = filterOut(player.d.milestones, [23])
                        },
                        effectDescription(){
                                return "奖励：撤销前一里程碑并提高其要求。D 23赠送免费D 21等级但基础鸭子获取÷2。在1e32,132鸭子时，每个D 23使其线性成本基础-1%，在1e32,232和1e32,305鸭子时D 21成本基础-0.1%"
                        },
                }, // hasMilestone("d", 24)
                25: {
                        requirementDescription(){
                                return "1e33,120只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e33120")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 23赠送免费D 11等级，基础鸭子获取÷24"
                        },
                }, // hasMilestone("d", 25)
                26: {
                        requirementDescription(){
                                return "1e40,473只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e40473")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D 23等级倍增鹰获取"
                        },
                }, // hasMilestone("d", 26)
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                ["prestige-button", "", function (){ return isPassiveGainActive("d") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "您的最佳鸭子数量：" + format(player.d.best) : "已完成" + formatWhole(player.d.times) + "次鸭子重置"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("d")) {
                                                        if (player.shiftAlias) return "鸭子获取公式：" + getGeneralizedPrestigeButtonText("d")
                                                        return "每秒获取" + format(tmp.d.getResetGain) + "鸭子"
                                                }
                                                return "声望有2秒冷却时间（剩余" + format(Math.max(0, 2-player.d.time)) + "秒）" 
                                        },
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("d")) return "每秒获取" + format(tmp.d.getResetGain) + "鸭子"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasMilestone("d", 8) || player.e.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "已完成" + formatWhole(player.d.times) + "次鸭子重置"
                                        }
                                ],
                                "milestones"
                        ],
                        unlocked(){
                                return player.d.times > 0 || player.e.unlocked
                        },
                },
        },
        onPrestige(gain){
                player.d.times += player.e.best.gt(0) ? 3 : 1
        },
        doReset(layer){
                let data = player.d
                if (layer == "d") data.time = 0
                if (!getsReset("d", layer)) return
                
                if (hasMilestone("e", 2)) data.times = Math.min(data.times, player.e.times)
                else data.times = 0

                if (!false/*player.h.unlocked*/) { //升级
                        let keptUpgrades = 0
                        if (hasMilestone("e", 4)) keptUpgrades += player.e.times
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!false/*player.g.unlocked*/) { //里程碑
                        let keptMilestones = 0
                        if (hasMilestone("e", 3)) keptMilestones += player.e.times
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //资源
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero
                tmp.d.getResetGain = decimalZero

                //可购买项
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        data.buyables[resetBuyables[j]] = decimalZero
                }
        },
})

addLayer("e", {
        name: "鹰", // 可选，仅少数地方使用。若缺失则直接使用层ID
        symbol: "E", // 显示在节点上的符号，默认为首字母大写的ID
        position: 1, // 行内横向位置（默认按ID字母排序）
        row: 4, // 在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
        }},
        color: "#CBC6B9",
        branches: ["d"],
        requires: new Decimal("1e15599"), // 可以是考虑需求增长的函数
        resource: "鹰", // 声望货币名称
        baseResource: "鸭", // 基于的资源名称
        baseAmount() {return player.d.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        getResetGain() {
                if (inChallenge("f", 21)) {
                        if (player.f.challenges[21] > 3) return tmp.f.effect.pow(3).root(player.f.challenges[21])
                        return tmp.f.effect
                }
                let ret = getGeneralizedPrestigeGain("e")

                if (hasMilestone("e", 11) && !hasMilestone("e", 20)) {
                        let x = ret.max(100).log10().times(.6989700043360189).sub(2).max(player.e.points.max(10).log10()).min(100)
                        ret = ret.div(Decimal.pow(2, x.floor()))
                }

                return ret
        },
        getBaseDiv(){
                return hasUpgrade("c", 51) ? decimalOne : new Decimal("1e15100")
        },
        getGainExp(){
                let ret = new Decimal(2)

                if (hasMilestone("e", 6) && !hasMilestone("e", 63)) {
                        ret = ret.plus(player.e.milestones.length / 25)
                }       
                if (hasUpgrade("e", 14))        ret = ret.plus(player.e.upgrades.length * .08)
                if (hasMilestone("e", 11))      ret = ret.plus(2)
                if (hasMilestone("e", 24))      ret = ret.plus(1)
                                                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["e12"])
                if (hasMilestone("E", 2))       ret = ret.plus(player.T.points)
                if (hasMilestone("G", 1))       ret = ret.plus(player.T.points.sub(1).max(0))

                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(1)

                if (hasUpgrade("e", 12))        ret = ret.times(Decimal.pow(1.1, player.e.upgrades.length))
                if (hasMilestone("e", 18) && !hasMilestone("e", 22)) {
                                                ret = ret.times(2)
                }
                if (hasMilestone("e", 31))      ret = ret.times(7)
                if (hasMilestone("e", 32))      ret = ret.times(100/7)
                if (hasMilestone("e", 34))      ret = ret.div(4)
                if (hasMilestone("e", 35))      ret = ret.div(hasMilestone("f", 5) ? 1 : 2)
                if (hasMilestone("e", 36))      ret = ret.div(hasMilestone("f", 5) ? 1 : 6)
                if (hasMilestone("e", 37)) {
                        let l = new Decimal(player.e.milestones.length).sub(36).max(0)
                        let b = .4
                        if (hasMilestone("f", 7)) {
                                if (hasMilestone("e", 48)) b *= 1.05
                                if (hasMilestone("e", 49)) b *= 1.05
                                if (hasMilestone("e", 50)) b *= 1.05
                                if (hasMilestone("e", 51)) b *= 1.05
                                if (hasMilestone("e", 52)) b *= 1.05
                        } else {
                                if (hasMilestone("e", 48) && player.e.points.gte("1e1795")) b *= 1.05
                                if (hasMilestone("e", 49) && player.e.points.gte("1e1808")) b *= 1.05
                                if (hasMilestone("e", 50) && player.e.points.gte("1e1820")) b *= 1.05
                                if (hasMilestone("e", 51) && player.e.points.gte("1e2127")) b *= 1.02
                                if (hasMilestone("e", 52) && player.e.points.gte("1e2378")) b *= 1.01
                        }
                        if (hasMilestone("f", 5)) {
                                if (hasMilestone("e", 68))                                  b *= 1.03
                                if (hasMilestone("e", 69))                                  b *= 1.03
                                if (hasMilestone("e", 70))                                  b *= 1.03
                        } else {
                                if (hasMilestone("e", 68))                                  b *= 1.01
                                if (hasMilestone("e", 69))                                  b *= 1.01
                                if (hasMilestone("e", 70))                                  b *= 1.01
                                if (hasMilestone("e", 68) && player.e.points.gte("1e8223")) b *= 1.01
                                if (hasMilestone("e", 69) && player.e.points.gte("1e8261")) b *= 1.01
                                if (hasMilestone("e", 70) && player.e.points.gte("1e8300")) b *= 1.01
                        }
                        if (hasMilestone("e", 72) && player.e.points.gte("1e8620")) b *= 1.01
                        if (hasMilestone("e", 73) && player.e.points.gte("1e9496")) b *= 1.01
                        if (hasMilestone("e", 74) && player.e.points.gte("1e9658")) b *= 1.01
                        if (hasMilestone("e", 74) && player.e.points.gte("1e9855")) b *= 1.01
                        if (hasMilestone("e", 74) && player.e.points.gte("1e9895")) b *= 1.01
                        if (hasMilestone("e", 75) && player.e.points.gte("1e9935")) b *= 1.01
                        if (hasMilestone("e", 75) && player.e.points.gte("1e9974")) b *= 1.01
                        if (hasMilestone("e", 79) && player.e.points.gte("1e11607"))b *= 1.01
                        if (hasMilestone("e", 79) && player.e.points.gte("1e11645"))b *= 1.01
                                                ret = ret.times(Decimal.pow(.4, l.min(14)))
                                                ret = ret.times(Decimal.pow(b, l.sub(14).max(0)))
                }
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e21"])
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e32"])
                if (hasMilestone("e", 41) && player.e.best.gte("1e1163")) {
                                                ret = ret.times(1e5)
                }
                if (hasMilestone("e", 44))      ret = ret.times(103)
                if (hasMilestone("e", 47)) {
                        if (player.e.points.gte("1e1591")) ret = ret.times(100)
                        if (player.e.points.gte("1e1606")) ret = ret.times(100)
                }
                if (hasMilestone("e", 56))      ret = ret.times(10)
                if (hasMilestone("e", 59))      ret = ret.times(10)
                if (hasMilestone("e", 63)) {
                        if (player.e.points.gte("1e5422")) ret = ret.times(2)
                        if (player.e.points.gte("1e5624")) ret = ret.times(2)
                }
                if (hasMilestone("e", 64))      ret = ret.times(1.24)
                if (hasMilestone("e", 65) && player.e.points.gte("1e6563")) {
                                                ret = ret.times(1.01)
                }
                if (hasMilestone("e", 66)) {
                        if (player.e.points.gte("1e6829"))      ret = ret.times(1.02)
                        if (player.e.points.gte("1e6906"))      ret = ret.times(1.02)
                        if (player.e.points.gte("1e7067"))      ret = ret.times(1.02)
                        if (player.e.points.gte("1e7267"))      ret = ret.times(1.02)
                        if (player.e.points.gte("1e7765"))      ret = ret.times(1.02)
                }
                if (hasMilestone("e", 71)) {
                        if (hasMilestone("f", 5))               ret = ret.times(1.06) 
                        else {
                                if (player.e.points.gte("1e8401"))      ret = ret.times(1.015)
                                if (player.e.points.gte("1e8420"))      ret = ret.times(1.015)
                                if (player.e.points.gte("1e8461"))      ret = ret.times(1.015)
                                if (player.e.points.gte("1e8500"))      ret = ret.times(1.015)
                        }
                }
                if (hasMilestone("e", 73))      ret = ret.times(10)
                if (hasMilestone("e", 74))      ret = ret.times(10)
                if (hasMilestone("e", 76)) {
                        if (player.e.points.gte("1e10117"))     ret = ret.times(1.01)
                        if (player.e.points.gte("1e10155"))     ret = ret.times(1.01)
                        if (player.e.points.gte("1e10157"))     ret = ret.times(1.01)
                        if (player.e.points.gte("1e10277"))     ret = ret.times(1.01)
                        if (player.e.points.gte("1e10593"))     ret = ret.times(1.01)
                        if (player.e.points.gte("1e11161"))     ret = ret.times(1.01)
                        if (player.e.points.gte("1e11197"))     ret = ret.times(1.01)
                }
                if (hasMilestone("e", 79)) {
                        ret = ret.times(1.2)
                        if (player.e.points.gte("1e11607")) ret = ret.times(.76)
                        if (player.e.points.gte("1e11645")) ret = ret.times(.76)
                }
                if (hasUpgrade("E", 11))        ret = ret.times(Decimal.pow(1.01, player.E.upgrades.length))
                if (hasMilestone("T", 1))       ret = ret.times(Decimal.pow(1.02, player.T.points))
                if (hasMilestone("T", 2))       ret = ret.times(Decimal.pow(1.02, player.T.milestones))
                if (hasUpgrade("e", 31))        ret = ret.times(Decimal.pow(1.1, player.e.upgrades.length).pow(layerChallengeCompletions("f")))
                                                ret = ret.times(tmp.f.challenges[12].rewardEffect)
                if (hasUpgrade("E", 22))        ret = ret.times(player.T.points.max(1))
                                                
                let t = CURRENT_BUYABLE_EFFECTS["f12"]
                if (t.gte("1e9432")) t = t.max("1e9436")
                if (t.gte("1e9400")) t = t.max("1e9407")
                if (t.gte("1e8100")) t = t.log10().sqrt().times(123).sub(2970).pow10()
                if (t.gte("1e7777")) t = t.log10().times(1.7 * 7777).sub(7777 * 7777*.7).sqrt().pow10()
                if (t.gte("1e7979")) t = t.div(1e18).max("1e7979")
                
                                                ret = ret.times(t)
                
                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("e")

                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e11"].pow(player.e.milestones.length))

                                                ret = ret.div(25e4)
                if (hasMilestone("e", 7))       ret = ret.times(player.e.milestones.length)
                if (hasUpgrade("e", 13))        ret = ret.times(Decimal.pow(2, player.e.upgrades.length))
                if (hasMilestone("d", 22))      ret = ret.times(player.e.points.max(10).log10())
                if (hasUpgrade("c", 51) && !hasMilestone("e", 24)) {
                                                ret = ret.times(player.e.points.max(10).log10().pow(hasUpgrade("c", 53) ? player.c.upgrades.filter(x => x > 50).length : 1))
                }
                if (hasUpgrade("d", 33) && !hasMilestone("e", 25)) {
                                                ret = ret.times(getBuyableAmount("d", 22).max(1))
                }
                if (hasUpgrade("c", 52) && !hasMilestone("e", 23)) {
                                                ret = ret.times(player.c.points.max(10).log10().max(10).log10().pow(player.c.upgrades.filter(x => x > 50).length))
                }
                if (hasUpgrade("d", 35))        ret = ret.times(player.d.upgrades.length)
                if (hasMilestone("e", 10))      ret = ret.div(100)
                if (hasMilestone("e", 11))      ret = ret.div(250)
                if (hasMilestone("e", 20))      ret = ret.div(4e32)
                if (hasMilestone("e", 21))      ret = ret.div(56789)
                if (hasMilestone("e", 32))      ret = ret.div(1e35)
                if (hasUpgrade("e", 24))        ret = ret.div(Decimal.pow(10, player.e.upgrades.length))
                if (hasUpgrade("e", 25))        ret = ret.div(Decimal.pow(150, player.e.upgrades.length))
                if (hasMilestone("d", 26))      ret = ret.times(getBuyableAmount("d", 23).max(1))
                if (hasUpgrade("d", 44))        ret = ret.times(getBuyableAmount("d", 22).div(1e5).plus(1).pow(getBuyableAmount("d", 23).min(10000)))
                if (hasUpgrade("d", 45))        ret = ret.times(player.d.points.max(10).log10().max(10).log10())
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e13"])
                if (hasMilestone("e", 41) && player.e.best.gte("1e1163")) {
                                                ret = ret.div(1e200)
                }
                if (hasMilestone("e", 44))      ret = ret.div(1e103)
                if (hasMilestone("e", 47)) {
                        if (player.e.points.gte("1e1591")) ret = ret.div(1e100)
                        if (player.e.points.gte("1e1606")) ret = ret.div(1e100)
                }
                if (hasMilestone("e", 56))      ret = ret.div(1e85)
                if (hasMilestone("e", 58) && player.e.best.gte("1e3922")) {
                                                ret = ret.div(1e29)
                }
                
                if (hasMilestone("e", 63)) {
                        ret = ret.div(1e6)
                        if (player.e.points.gte("1e5422")) ret = ret.div(3e35)
                        if (player.e.points.gte("1e5624")) ret = ret.div(3e36)
                }
                if (!hasMilestone("f", 5)) {
                        if (hasMilestone("e", 59))      ret = ret.div(1e100)
                        if (hasMilestone("e", 68))      ret = ret.div(1e8)
                        if (hasMilestone("e", 68) && player.e.points.gte("1e8223")) ret = ret.div(1e13)
                        if (hasMilestone("e", 69))      ret = ret.div(3e7)
                        if (hasMilestone("e", 69) && player.e.points.gte("1e8261")) ret = ret.div(15e11)
                        if (hasMilestone("e", 70))      ret = ret.div(3e7)
                        if (hasMilestone("e", 70) && player.e.points.gte("1e8300")) ret = ret.div(3e12)
                }
                if (hasMilestone("e", 71))      ret = ret.div(1e40)
                if (hasMilestone("e", 72) && player.e.points.gte("1e8620")) ret = ret.div(1e16)
                if (hasMilestone("e", 73) && player.e.points.gte("1e9496")) ret = ret.div(1e18)
                if (hasMilestone("e", 74) && player.e.points.gte("1e9658")) ret = ret.div(1e19)
                if (hasMilestone("e", 74) && player.e.points.gte("1e9855")) ret = ret.div(1e19)
                if (hasMilestone("e", 74) && player.e.points.gte("1e9895")) ret = ret.div(1e19)
                if (hasMilestone("e", 75) && player.e.points.gte("1e9935")) ret = ret.div(1e20)
                if (hasMilestone("e", 75) && player.e.points.gte("1e9974")) ret = ret.div(1e20)

                if (hasMilestone("e", 73))      ret = ret.div(1e176)
                if (hasMilestone("e", 74))      ret = ret.div(1e190)

                if (hasMilestone("T", 3))       ret = ret.times(player.E.best.max(1).pow(player.T.milestones.length))
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["e33"])
                if (hasMilestone("T", 8))       ret = ret.times(Decimal.pow10(hasMilestone("f", 8) ? 5000 : -2650))
                if (hasUpgrade("T", 14))        ret = ret.div("1e3500")
                if (hasMilestone("E", 5))       ret = ret.div("1e600")
                if (hasMilestone("f", 7))       ret = ret.times(tmp.f.milestones[7].effectPer.pow(player.T.points.sub(tmp.f.milestones[7].start).max(0)))

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("e") || player.e.points.lt(1)) return decimalOne

                let amt = player.e.points
                amtlog = hasMilestone("e", 33) ? amt.log10() : amt.log10().floor()

                let exp = amtlog.plus(hasUpgrade("e", 13) ? 0 : 1).min(20)

                if (hasMilestone("e", 37)) {
                        exp = new Decimal(5)
                        if (hasMilestone("e", 46)) {
                                exp = exp.plus(1)
                                if (player.e.points.gte("1e1469")) exp = exp.plus(1)
                                if (player.e.points.gte("1e1499")) exp = exp.plus(1)
                                if (player.e.points.gte("1e1527")) exp = exp.plus(1)
                                if (player.e.points.gte("1e1554")) exp = exp.plus(1)
                        }
                        exp = exp.times(CURRENT_BUYABLE_EFFECTS["e23"])
                }
                else {
                        if (hasMilestone("e", 12))      exp = exp.div(2)
                        if (hasMilestone("e", 13) && player.e.best.gte("1e38"))      exp = exp.div(2)
                        if (hasMilestone("e", 16))      exp = exp.sub(1)
                        if (hasMilestone("e", 17))      exp = exp.sub(1)
                        if (hasMilestone("e", 24))      exp = exp.plus(1.5)
                        if (hasMilestone("e", 33))      exp = exp.plus(.25)
                }

                let ret = amtlog.pow10().plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("e")
        },
        getNextAt(){
                return getGeneralizedNextAt("e")
        },
        update(diff){
                let data = player.e

                if (tmp.e.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("e", diff)
                
                if (hasMilestone("T", 1) || (hasMilestone("e", 23) && player.f.unlocked) || hasMilestone("f", 5)) {
                        handleGeneralizedBuyableAutobuy(diff, "e")
                } else {
                        data.abtime = 0
                }
                data.time += diff
        },
        layerShown(){return player.d.best.gte("1e15600") || player.e.unlocked},
        prestigeButtonText(){
                if (isPassiveGainActive("e")) return ""
                return getGeneralizedPrestigeButtonText("e")
        },
        canReset(){
                return player.e.time >= 2 && !isPassiveGainActive("e") && tmp.e.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E-agle"
                        },
                        description(){
                                let a = "注意：此标签页每个升级都会应用。向D13基础值增加0.0001"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                return player.e.best.gte(10) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Ea-le"
                        },
                        description(){
                                let a = "将鸭子获取量乘以升级数，并将鹰获取量预指数乘以1.1"
                                return a
                        },
                        cost: new Decimal(10),
                        unlocked(){
                                return player.e.best.gte(61) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E--le"
                        },
                        description(){
                                let a = "将鹰获取量翻倍但移除鹰效果指数中的+1"
                                return a
                        },
                        cost: new Decimal(1e4),
                        unlocked(){
                                return player.e.best.gte(3000) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Eag-e"
                        },
                        description(){
                                let a = "将鹰获取指数增加0.08，并向D21基础值增加0.0001，但将D1X基础成本乘以1e7"
                                return a
                        },
                        cost: new Decimal(1e9),
                        unlocked(){
                                return player.e.best.gte(5e8) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E-g-e"
                        },
                        description(){
                                let a = "将基础鸭子获取量乘以log10(鹰)/16"
                                if (hasMilestone("f", 4)) a = a.replace("/16", "")
                                return a
                        },
                        cost: new Decimal(1e16),
                        unlocked(){
                                return player.e.best.gte(2e15) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Ea--e"
                        },
                        description(){
                                let a = "每个D22将其线性基础值乘以0.9999"
                                return a
                        },
                        cost: new Decimal(1e25),
                        unlocked(){
                                return player.e.best.gte(1e20) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E---e"
                        },
                        description(){
                                let a = "每个D23将其线性基础值乘以0.9998，但将D2X基础成本乘以1e25"
                                return a
                        },
                        cost: new Decimal(1e36),
                        unlocked(){
                                return player.e.best.gte(1e35) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Eagl-"
                        },
                        description(){
                                let a = "将E11基础成本乘以10，并向其基础值增加0.0003"
                                return a
                        },
                        cost: new Decimal(1e64),
                        unlocked(){
                                return player.e.best.gte(1e63) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E-gl-"
                        },
                        description(){
                                let a = "将C22和C33的基础值立方，但将鹰获取量除以10"
                                return a
                        },
                        cost: new Decimal(1e256),
                        unlocked(){
                                return player.e.best.gte(1e200) || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Ea-l-"
                        },
                        description(){
                                let a = "将鹰获取量除以150，并向E13基础值增加0.1"
                                return a
                        },
                        cost: new Decimal("1e521"),
                        unlocked(){
                                return player.e.best.gte("1e510") || player.f.unlocked
                        }, 
                }, // hasUpgrade("e", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E--l-"
                        },
                        description(){
                                let a = "雀的立方根除以E32基础值，每个雀挑战完成将雀和基础鹰获取量乘以1.1"
                                return a
                        },
                        cost: new Decimal("e1450e3"),
                        unlocked(){
                                return player.f.challenges[11] > 0 || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Eag--"
                        },
                        description(){
                                let a = "雀（最大1e250）乘以绿宝石获取量并改进雀里程碑7"
                                return a
                        },
                        cost: new Decimal("e3381e3"),
                        unlocked(){
                                return player.f.challenges[12] > 0 || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E-g--"
                        },
                        description(){
                                let a = "每超过350级，每个雀挑战的绿宝石获取量翻倍"
                                return a
                        },
                        cost: new Decimal("ee7"),
                        unlocked(){
                                return player.f.challenges[21] > 0 || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Ea---"
                        },
                        description(){
                                let a = "将F11线性成本基础值增加0.005（低于1e400 雀时禁用）"
                                return a
                        },
                        cost: new Decimal("e67676767"),
                        unlocked(){
                                return hasUpgrade("e", 33) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E----"
                        },
                        description(){
                                let a = "将E22和E32的基础值翻倍"
                                return a
                        },
                        cost: new Decimal("e123456789"),
                        unlocked(){
                                return hasUpgrade("e", 34) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 35)
                41: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E<sup>2</sup>agle"
                        },
                        description(){
                                let a = "将F11基础成本乘以10,000"
                                return a
                        },
                        cost: new Decimal("e4450600e3"),
                        unlocked(){
                                return hasUpgrade("f", 15) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 41)
                42: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E<sup>2</sup>-gle"
                        },
                        description(){
                                let a = "将F12成本基础值乘以1e20"
                                return a
                        },
                        cost: new Decimal("e3.23e10"),
                        unlocked(){
                                return hasUpgrade("e", 41) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 42)
                43: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E<sup>2</sup>a-le"
                        },
                        description(){
                                let a = "F11给予免费E33等级，雀获取量翻倍，并将基础雀获取量减少0.1%"
                                return a
                        },
                        cost: new Decimal("e5.56e10"),
                        unlocked(){
                                return (hasUpgrade("e", 42) && player.f.points.gte("1e59434")) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 43)
                44: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E<sup>2</sup>--le"
                        },
                        description(){
                                let a = "向F11线性成本基础值增加0.001，并将Rank II线性系数减少1"
                                return a
                        },
                        cost: new Decimal("e6.85e10"),
                        unlocked(){
                                return hasUpgrade("e", 43) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 44)
                45: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>E<sup>2</sup>ag-e"
                        },
                        description(){
                                let a = "F13给予免费F12等级，超过1000级的每级向雀获取指数增加0.0005，并将雀获取量除以5e163"
                                return a
                        },
                        cost: new Decimal("e9.45e10"),
                        unlocked(){
                                return hasMilestone("f", 18) || player.G.unlocked
                        }, 
                }, // hasUpgrade("e", 45)
        },
        buyables: getLayerGeneralizedBuyableData("e", [
                        function(){
                                return hasUpgrade("e", 22) || player.f.unlocked
                        },
                        function(){
                                return (getBuyableAmount("e", 11).gte(150) && hasMilestone("e", 13)) || player.f.unlocked
                        },
                        function(){
                                return getBuyableAmount("e", 11).gte(1790) || player.f.unlocked
                        },
                        function(){
                                return hasMilestone("e", 40) //|| player.g.unlocked
                        },
                        function(){
                                return hasMilestone("e", 51) //|| player.g.unlocked
                        },
                        function(){
                                return getBuyableAmount("e", 11).gte(4550) //|| player.g.unlocked
                        },
                        function(){
                                return getBuyableAmount("e", 11).gte(6950) //|| player.g.unlocked
                        },
                        function(){
                                return hasMilestone("e", 79) //|| player.g.unlocked
                        },
                        function(){
                                return hasMilestone("T", 7) //|| player.g.unlocked
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return "1次鹰重置"
                        },
                        done(){
                                return player.e.times >= 1
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：平方海狸获取量，翻倍并平方水豚批量数量，并向C33基础值增加1.5"
                        },
                }, // hasMilestone("e", 1)
                2: {
                        requirementDescription(){
                                return "2次鹰重置"
                        },
                        done(){
                                return player.e.times >= 2
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个鸭子重置，D12给予C32免费等级"
                        },
                }, // hasMilestone("e", 2)
                3: {
                        requirementDescription(){
                                return "3次鹰重置"
                        },
                        done(){
                                return player.e.times >= 3
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个鸭子里程碑，将鸭子自动购买速度和批量数量乘以重置次数+1，D11给予C32免费等级"
                        },
                }, // hasMilestone("e", 3)
                4: {
                        requirementDescription(){
                                return "4只鹰"
                        },
                        done(){
                                return player.e.points.gte(4)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个鸭子升级，前四十次重置每次给予一个免费D11等级"
                        },
                }, // hasMilestone("e", 4)
                5: {
                        requirementDescription(){
                                return "50只鹰（或17次鹰重置）"
                        },
                        done(){
                                return player.e.points.gte(50) || player.e.times >= 17
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：在1e10,000以下获得1e20倍鸭子，并将C22基础值平方"
                        },
                }, // hasMilestone("e", 5)
                6: {
                        requirementDescription(){
                                return "150只鹰"
                        },
                        done(){
                                return player.e.points.gte(150)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D22线性基础值为7e10，其基础值增加0.0001。每个里程碑将鹰获取指数增加0.04"
                        },
                }, // hasMilestone("e", 6)
                7: {
                        requirementDescription(){
                                return "1000只鹰"
                        },
                        done(){
                                return player.e.points.gte(1000)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D22线性基础值为1e14，每级减少0.1%。D22给予D11免费等级，里程碑乘以鹰获取量"
                        },
                }, // hasMilestone("e", 7)
                8: {
                        requirementDescription(){
                                return "200,000只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e5)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除鹰声望能力，每秒获得100%重置时获得的鹰，每秒获得一次鹰重置。鹰重置不再给予免费D11等级"
                        },
                }, // hasMilestone("e", 8)
                9: {
                        requirementDescription(){
                                return "1e28,369只鸭子"
                        },
                        done(){
                                return player.d.points.gte("1e28369")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D12给予C31和C33免费等级"
                        },
                }, // hasMilestone("e", 9)
                10: {
                        requirementDescription(){
                                return "5e26只鹰"
                        },
                        done(){
                                return player.e.points.gte("5e26")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将鹰获取量除以100倍，并将C11基础值提升至里程碑数量"
                        },
                }, // hasMilestone("e", 10)
                11: {
                        requirementDescription(){
                                return "7e30只鹰"
                        },
                        done(){
                                return player.e.points.gte("7e30")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：将鹰获取量除以250，鹰的每个数量级（最多100）将其减半，向鹰获取指数增加2，并将D23线性基础值除以1e5但将其基础成本乘以" + makeBlue("1000") + "。"
                                return "奖励：将鹰获取量除以250，鹰的每个数量级（最多100）将其减半，向鹰获取指数增加2，并将D23线性基础值除以1e5但将其基础成本乘以1e1000。"
                        },
                }, // hasMilestone("e", 11)
                12: {
                        requirementDescription(){
                                return "4.34e34只鹰"
                        },
                        done(){
                                return player.e.points.gte("4.34e34")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将鹰效果指数减半，将鸭子指数乘以里程碑的平方，并将D23线性成本基础值除以123,456。在1e46,428鸭子时，进一步将D23的线性成本基础值减半"
                        },
                }, // hasMilestone("e", 12)
                13: {
                        requirementDescription(){
                                return "121个E11等级"
                        },
                        done(){
                                return getBuyableAmount("e", 11).gte(121) || player.e.points.gte(1e100)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将鹰效果指数减半，并将D22基础值六分之一。在150个E11等级时，解锁新可购买项，并将乘以基础鸭子获取量的log10(鹰)取上限"
                        },
                }, // hasMilestone("e", 13)
                14: {
                        requirementDescription(){
                                return "2e47只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e47)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "奖励：E11等级从E12线性基础值减去0.0001，反之亦然。E11等级将23基础值减少1%。"
                                }
                                return "奖励：E11等级从E12线性基础值减去0.0001，反之亦然。在200个E11等级时，其等级将D23基础值减少1%但将基础鸭子获取量除以700。"
                        },
                }, // hasMilestone("e", 14)
                15: {
                        requirementDescription(){
                                return "2e52只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e52)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个里程碑平方水豚可购买限制和批量数量，并向E12基础值增加0.0001"
                        },
                }, // hasMilestone("e", 15)
                16: {
                        requirementDescription(){
                                return "2e58只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e58)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：从鹰效果指数中减去1。在1e62,000鸭子时，E12向D23基础值增加，并向E11基础值增加0.0002"
                        },
                }, // hasMilestone("e", 16)
                17: {
                        requirementDescription(){
                                return "2e71只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e71)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：从鹰效果指数中减去1。在100个E12等级时，将E11基础成本除以10"
                        },
                }, // hasMilestone("e", 17)
                18: {
                        requirementDescription(){
                                return "2e80只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e80)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return  "奖励：将基础鸭子获取量乘以1e40，并解锁一个鸭子可购买项，基础鹰获取量翻倍。"
                                }
                                return "奖励：将基础鸭子获取量除以10,000，但解锁一个鸭子可购买项，基础鹰获取量翻倍。"
                        },
                }, // hasMilestone("e", 18)
                19: {
                        requirementDescription(){
                                return "2e93只鹰"
                        },
                        done(){
                                return player.e.points.gte(2e93)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将基础鸭子获取量除以10,000,000，但E11给予免费D31等级"
                        },
                }, // hasMilestone("e", 19)
                20: {
                        requirementDescription(){
                                return "1e102只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e102)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                tmp.e.getGainMultPost = decimalOne
                        },
                        effectDescription(){
                                return "奖励：将鹰获取量除以4e32，基础鸭子获取量除以10，不再每数量级减半鹰获取量，每个鹰可购买项按E11效果减少D31基础值"
                        },
                }, // hasMilestone("e", 20)
                21: {
                        requirementDescription(){
                                return "1e116只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e116)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将鹰获取量除以56789，E11不再给予免费D31等级，但D31给予免费D21等级并影响E12"
                        },
                }, // hasMilestone("e", 21)
                22: {
                        requirementDescription(){
                                return "1.32e132只鹰"
                        },
                        done(){
                                return player.e.points.gte(1.32e132)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：鹰里程碑16不再向E11基础值增加，鹰里程碑18不再影响基础鹰获取量，并永久移除鸭子自动购买器的限制"
                        },
                }, // hasMilestone("e", 22)
                23: {
                        requirementDescription(){
                                return "1e137只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e137)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.unlocked) return "奖励：Ca--b-ra不再乘以鹰获取量，并向D31基础值增加0.0001" + makePurple("并自动购买鹰可购买项") + "。"
                                return "奖励：Ca--b-ra不再乘以鹰获取量，并向D31基础值增加0.0001。"
                        },
                }, // hasMilestone("e", 23)
                24: {
                        requirementDescription(){
                                return "1e141只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e141)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：禁用C-p-b-ra（除前半部分外），向D31基础值增加0.0002，向鹰获取指数增加1，向鹰效果指数增加1.5"
                        },
                }, // hasMilestone("e", 24)
                25: {
                        requirementDescription(){
                                return "1e174只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e174)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                player.d.buyables[31] = decimalZero
                        },
                        effectDescription(){
                                return "奖励：D22等级不再乘以鹰获取量，D31给予免费D23等级，但重置其等级，将其效果乘以2.5，并将其线性成本基础值增加至1e175"
                        },
                }, // hasMilestone("e", 25)
                26: {
                        requirementDescription(){
                                return "1e192只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e192)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                CURRENT_BUYABLE_BASES["e11"] = decimalOne
                                CURRENT_BUYABLE_EFFECTS["e11"] = decimalOne
                        },
                        effectDescription(){
                                return "奖励：接下来的五个里程碑每个从E11基础值减去0.0004，并将D31基础成本增加1e10,00，但超过16,000的每个D12将D31线性成本基础值除以1.01"
                        },
                }, // hasMilestone("e", 26)
                27: {
                        requirementDescription(){
                                return "1e206只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e206)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                CURRENT_BUYABLE_BASES["e11"] = decimalOne
                                CURRENT_BUYABLE_EFFECTS["e11"] = decimalOne
                        },
                        effectDescription(){
                                return "奖励：D31给予免费D22等级，并向D22基础值增加0.0001，但D23不再给予D11等级"
                        },
                }, // hasMilestone("e", 27)
                28: {
                        requirementDescription(){
                                return "1e226只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e226)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                CURRENT_BUYABLE_BASES["e11"] = decimalOne
                                CURRENT_BUYABLE_EFFECTS["e11"] = decimalOne
                        },
                        effectDescription(){
                                return "奖励：平方海狸可购买限制，D23基础值的来源变为相乘而非相加，1 + 里程碑数/100将其基础值指数化"
                        },
                }, // hasMilestone("e", 28)
                29: {
                        requirementDescription(){
                                return "1e234只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e234)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                CURRENT_BUYABLE_BASES["e11"] = decimalOne
                                CURRENT_BUYABLE_EFFECTS["e11"] = decimalOne
                        },
                        effectDescription(){
                                return "奖励：E12等级将D31基础值除以1.01"
                        },
                }, // hasMilestone("e", 29)
                30: {
                        requirementDescription(){
                                return "1e243只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e243)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                CURRENT_BUYABLE_BASES["e11"] = decimalOne
                                CURRENT_BUYABLE_EFFECTS["e11"] = decimalOne
                        },
                        effectDescription(){
                                return "奖励：D31以30倍速率影响自身"
                        },
                }, // hasMilestone("e", 30)
                31: {
                        requirementDescription(){
                                return "1e265只鹰"
                        },
                        done(){
                                return player.e.points.gte(1e265)
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                CURRENT_BUYABLE_BASES["e11"] = decimalOne
                                CURRENT_BUYABLE_EFFECTS["e11"] = decimalOne
                        },
                        effectDescription(){
                                return "奖励：将基础鹰获取量乘以7，但从E11基础值减去0.001"
                        },
                }, // hasMilestone("e", 31)
                32: {
                        requirementDescription(){
                                return "1e313只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e313")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个D32向其基础值增加1，其线性成本基础值为1e20，将基础鹰获取量乘以100/7，但将鹰获取量除以1e35"
                        },
                }, // hasMilestone("e", 32)
                33: {
                        requirementDescription(){
                                return "1e331只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e331")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D13不再给予D12免费等级，但D23给予D22免费等级，向鹰效果指数增加0.25，不再对鹰到鸭子的获取量进行取整或上限"
                        },
                }, // hasMilestone("e", 33)
                34: {
                        requirementDescription(){
                                return "1e410只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e410")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E11给予免费D32等级，但将基础鹰获取量四分之一，并从D11基础值减去1。在1e416鹰时，鹰里程碑30影响D32并平方水豚批量数量"
                        },
                }, // hasMilestone("e", 34)
                35: {
                        requirementDescription(){
                                return "1e430只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e430")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "奖励：移除D33线性基础值，D32给予免费D21等级。"
                                }
                                return "奖励：D33等级将其线性基础值除以10（在1e100后软上限：x -> log10(x)<sup>5log10(x)<sup>2</sup></sup>），并将基础鹰获取量减半。D32给予免费D21等级，但从D21/D22基础值减去0.0035/0.0001。"
                        },
                }, // hasMilestone("e", 35)
                36: {
                        requirementDescription(){
                                return "1e443只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e443")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "奖励：将D33基础值提升至sqrt(里程碑)次方。"
                                }
                                return "奖励：将前一里程碑的基础效果变为D33基础值，并将D33基础值提升至sqrt(里程碑)次方。将基础鹰获取量除以6。"
                        },
                }, // hasMilestone("e", 36)
                37: {
                        requirementDescription(){
                                return "1e500只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e500")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E13给予免费D32等级，此及之后所有里程碑将基础鹰获取量乘以0.4，在1e508鹰时，鹰效果指数为5"
                        },
                }, // hasMilestone("e", 37)
                38: {
                        requirementDescription(){
                                return "1e547只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e547")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E13等级从其线性基础值减去0.1（低于90时为五分之一，低于25时为一半，低于14时为每隔一个，低于5时为十分之一），并将D33基础成本除以1e900"
                        },
                }, // hasMilestone("e", 38)
                39: {
                        requirementDescription(){
                                return "1e578只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e578")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将D32/D33基础成本乘以1e3000/1e7000，E13给予免费D31等级"
                        },
                }, // hasMilestone("e", 39)
                40: {
                        requirementDescription(){
                                return "1e1039只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1039")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：鹰里程碑36不再影响D33，解锁新鹰可购买项，并向D33基础值增加8.5。在1e1041/1e1045/1e1055鹰时，将E21成本基础值除以1e13/1e13/1e7。在1e1078鹰时，E21给予E13免费等级并从其线性成本基础值减去（低于250时为十分之一，低于75时为一半，低于50时为五分之一）。"
                        },
                }, // hasMilestone("e", 40)
                41: {
                        requirementDescription(){
                                return "1e1095只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1095")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将D22/D23基础成本除以1e10,000/1e30,000，但将E11/E12/E13基础成本乘以1e4/1e4/1e35。在1e1163鹰时，获得1e5倍基础鹰，但将鹰获取量除以1e200"
                        },
                }, // hasMilestone("e", 41)
                42: {
                        requirementDescription(){
                                return "1e1174只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1174")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过5500的总鹰可购买项将E11成本基础值减少1%；对E12应用一次，对E13应用十次。在1e1180时，将E21的基础成本乘以1e5，超过5500的总鹰可购买项将E21基础值减少12%"
                        },
                }, // hasMilestone("e", 42)
                43: {
                        requirementDescription(){
                                return "1e1214只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1214")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.unlocked) return "奖励：将D33基础成本除以1e10,000" + makePurple("并将鹰自动购买器速度和批量数量翻倍。")
                                return "奖励：将D33基础成本除以1e10,000。"
                        },
                }, // hasMilestone("e", 43)
                44: {
                        requirementDescription(){
                                return "1e1283只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1283")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E21基础成本为E13基础成本的平方，向下取整到最近的OoM，将D33基础成本除以1e50,000，并将鹰获取量除以1e103但将基础鹰获取量乘以103"
                        },
                }, // hasMilestone("e", 44)
                45: {
                        requirementDescription(){
                                return "1e1375只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1375")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：平方海狸可购买批量数量和限制，并向D21基础值增加0.0003，但其不再影响基础鸭子获取量。在1e1402和1e1428鹰时，向D21基础值增加0.0001"
                        },
                }, // hasMilestone("e", 45)
                46: {
                        requirementDescription(){
                                return "1e1452只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1452")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：向鹰效果指数增加1。在1e1469、1e1499、1e1527和1e1554鹰时重新应用此效果"
                        },
                }, // hasMilestone("e", 46)
                47: {
                        requirementDescription(){
                                return "1e1579只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1579")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D32基础值变为其总等级的一半。在1e1591和1e1606鹰时，将基础鹰获取量乘以100但将鹰获取量除以1e100"
                        },
                }, // hasMilestone("e", 47)
                48: {
                        requirementDescription(){
                                return "1e1637只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1637")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8改进。"
                                        return "奖励：向D21和D31基础值增加0.001，超过50的里程碑将基础鹰获取量增加5%。"
                                }
                                return "奖励：向D21基础值增加0.0001。在1e1720鹰时，向D31基础值增加0.0001但将基础鸭子获取量除以1e6。在1e1795鹰时，超过50的里程碑将基础鹰获取量增加5%。"
                        },
                }, // hasMilestone("e", 48)
                49: {
                        requirementDescription(){
                                return "1e1677只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1677")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8改进。"
                                        return "奖励：向D21和D31基础值增加0.001，超过50的里程碑将基础鹰获取量增加5%。"
                                }
                                return "奖励：向D21基础值增加0.0001。在1e1745鹰时，向D31基础值增加0.0001但将基础鸭子获取量除以1e6。在1e1808鹰时，超过50的里程碑将基础鹰获取量增加5%。"
                        },
                }, // hasMilestone("e", 49)
                50: {
                        requirementDescription(){
                                return "1e1700只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1700")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8改进。"
                                        return "奖励：向D21和D31基础值增加0.001，超过50的里程碑将基础鹰获取量增加5%。"
                                }
                                return "奖励：向D21基础值增加0.0001。在1e1776鹰时，向D31基础值增加0.0001但将基础鸭子获取量除以1e6。在1e1820鹰时，超过50的里程碑将基础鹰获取量增加5%。"
                        },
                }, // hasMilestone("e", 50)
                51: {
                        requirementDescription(){
                                return "1e1768只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1768")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8改进。"
                                        return "奖励：向D21和D31基础值增加0.001，超过50的里程碑将基础鹰获取量增加5%。"
                                }
                                return "奖励：向D21基础值增加0.0001。在1e1790鹰时，向D31基础值增加0.0001但将基础鸭子获取量除以1e6。在1e2127鹰时，超过50的里程碑将基础鹰获取量增加2%。"
                        },
                }, // hasMilestone("e", 51)
                52: {
                        requirementDescription(){
                                return "1e1782只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1782")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8改进。"
                                        return "奖励：向D21和D31基础值增加0.001，超过50的里程碑将基础鹰获取量增加5%。"
                                }
                                return "奖励：向D21基础值增加0.0001。向D31基础值增加0.0001。在1e2378鹰时，超过50的里程碑将基础鹰获取量增加1%。"
                        },
                }, // hasMilestone("e", 52)
                53: {
                        requirementDescription(){
                                return "1e1919只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e1919")
                        },
                    
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E22给予免费E11等级，但将其线性成本基础值乘以10。在1e2088鹰时，E22给予免费D33等级"
                        },
                }, // hasMilestone("e", 53)
                54: {
                        requirementDescription(){
                                return "1e2038只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e2038")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E22给予免费E12等级，但将其线性成本基础值乘以10。在1e2189鹰时，E22给予免费E13等级，但将其基础成本增加1e30"
                        },
                }, // hasMilestone("e", 54)
                55: {
                        requirementDescription(){
                                return "1e2259只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e2259")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.unlocked) return "奖励：将C22基础值提升至log10(10+鹰)" + makePurple("并将鹰自动购买器速度和批量数量翻倍") + "。"
                                return "奖励：将C22基础值提升至log10(10+鹰)。"
                        },
                }, // hasMilestone("e", 55)
                56: {
                        requirementDescription(){
                                return "1e3081只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e3081")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E23给予免费E12等级，将鹰获取量除以1e85，基础鹰获取量乘以10，并将E23线性成本基础值乘以10。在1e3342鹰时，每个E23向其基础值增加0.0001（在1e3442鹰时翻倍）"
                        },
                }, // hasMilestone("e", 56)
                57: {
                        requirementDescription(){
                                return "1e3643只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e3643")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.unlocked) return "奖励：D31基础值变为E22的效果，将D32基础值乘以10，向D22基础值增加0.0001，将E23线性基础值除以10，并" + makePurple("同时自动购买所有鹰可购买项") + "。"
                                return "奖励：D31基础值变为E22的效果，将D32基础值乘以10，并向D22基础值增加0.0001。在1e3660和1e3703鹰时将E23线性基础值减半；在1e3764鹰时将其除以2.5"
                        },
                }, // hasMilestone("e", 57)
                58: {
                        requirementDescription(){
                                return "1e3905只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e3905")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D32给予免费D22等级，但将基础鸭子获取量除以1e50。在1e3922鹰时，将鹰获取量除以1e29且E23给予免费E13等级"
                        },
                }, // hasMilestone("e", 58)
                59: {
                        requirementDescription(){
                                return "1e4146只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e4146")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "将基础鹰获取量乘以10"
                                }
                                return "奖励：将基础鹰获取量乘以10，但将鹰获取量除以1e100，且在100个E23等级时将其线性成本基础值翻倍"
                        },
                }, // hasMilestone("e", 59)
                60: {
                        requirementDescription(){
                                return "1e4649只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e4649")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E22等级将E23线性成本基础值减少0.1%，反之亦然。将E23初始基础值乘以1e22，在5e4701/1e5000鹰时将其降低至1e14/1e9"
                        },
                }, // hasMilestone("e", 60)
                61: {
                        requirementDescription(){
                                return "1e5121只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e5121")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D13给予免费D12等级而非D23等级，但将基础鸭子获取量除以1e10。在1e5183鹰时，E12给予免费D32等级，但将基础鸭子获取量除以1e51"
                        },
                }, // hasMilestone("e", 61)
                62: {
                        requirementDescription(){
                                return "1e5302只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e5302")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将D33基础值乘以10，但将基础鸭子获取量除以1e31"
                        },
                }, // hasMilestone("e", 62)
                63: {
                        requirementDescription(){
                                return "1e5361只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e5361")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E23给予免费E11等级，但鹰里程碑6不再影响鹰获取指数，并将鹰获取量除以1,000,000。在1e5422/1e5624鹰时，基础鹰获取量翻倍，但将鹰获取量除以3e35/3e36"
                        },
                }, // hasMilestone("e", 63)
                64: {
                        requirementDescription(){
                                return "1e6043只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e6043")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将E11基础成本乘以100，E13基础成本乘以1e20，并将基础鹰获取量增加24%"
                        },
                }, // hasMilestone("e", 64)
                65: {
                        requirementDescription(){
                                return "1e6428只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e6428")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E31给予免费E21等级。在1e6503鹰时，E31等级将所有E可购买项基础成本减半。在1e6563鹰时，基础鹰获取量增加1%"
                        },
                }, // hasMilestone("e", 65)
                66: {
                        requirementDescription(){
                                return "1e6723只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e6723")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将E22基础成本增加1e7，并将E31基础成本减少1e137。在1e6829、1e6906、1e7067、1e7267和1e7765鹰时，基础鹰获取量增加2%"
                        },
                }, // hasMilestone("e", 66)
                67: {
                        requirementDescription(){
                                return "1e7823只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e7823")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：D32给予免费D23等级，但将基础鸭子获取量除以1e210"
                        },
                }, // hasMilestone("e", 67)
                68: {
                        requirementDescription(){
                                return "1e8024只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e8024")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "将超过50的每个鹰里程碑的乘数增加3%"
                                }
                                return "奖励：将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以1e8。在1e8223鹰时，重新应用此效果但将鹰获取量除以1e5"
                        },
                }, // hasMilestone("e", 68)
                69: {
                        requirementDescription(){
                                return "1e8142只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e8142")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "将超过50的每个鹰里程碑的乘数增加3%"
                                }
                                return "奖励：将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以3e7。在1e8261鹰时，重新应用此效果但将鹰获取量除以5e4"
                        },
                }, // hasMilestone("e", 69)
                70: {
                        requirementDescription(){
                                return "1e8181只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e8181")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "将超过50的每个鹰里程碑的乘数增加3%"
                                }
                                return "奖励：将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以3e7。在1e8300鹰时，重新应用此效果但将鹰获取量除以1e5"
                        },
                }, // hasMilestone("e", 70)
                71: {
                        requirementDescription(){
                                return "1e8357只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e8357")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (hasMilestone("f", 5) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑5改进。"
                                        return "E23给予免费E21等级而非E11等级，但将鹰获取量除以1e40。基础鹰获取量增加6%"
                                }
                                return "奖励：E23给予免费E21等级而非E11等级，但将鹰获取量除以1e40。在1e8401、1e8420、1e8461和1e8500鹰时，基础鹰获取量增加1.5%"
                        },
                }, // hasMilestone("e", 71)
                72: {
                        requirementDescription(){
                                return "1e8441只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e8441")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过53的E31等级将E22基础值增加0.1%。在1e8620鹰时，将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以1e16"
                        },
                }, // hasMilestone("e", 72)
                73: {
                        requirementDescription(){
                                return "1e8662只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e8662")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：基础鹰获取量增加10倍，但鹰获取量减少1e176倍。在1e9496鹰时，将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以1e18"
                        },
                }, // hasMilestone("e", 73)
                74: {
                        requirementDescription(){
                                return "1e9577只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e9577")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：基础鹰获取量增加10倍，但鹰获取量减少1e190倍。在1e9658、1e9855和1e9895鹰时，将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以1e19"
                        },
                }, // hasMilestone("e", 74)
                75: {
                        requirementDescription(){
                                return "1e9818只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e9818")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将基础鸭子获取量减少1e409倍，D12给予免费D11等级而非D22等级。在1e9935和1e9974鹰时，将超过50的每个鹰里程碑的乘数增加1%，但将鹰获取量除以1e20"
                        },
                }, // hasMilestone("e", 75)
                76: {
                        requirementDescription(){
                                return "1e10018只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e10018")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过97的E31等级将E21基础值增加0.1%。在1e10095鹰时，将E31线性基础值降低至7.5e39。在1e10117、1e10155、1e10157、1e10277、1e10593、1e11161和1e11197鹰时，基础鹰获取量增加1%"
                        },
                }, // hasMilestone("e", 76)
                77: {
                        requirementDescription(){
                                return "1e10250只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e10250")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将E31线性基础值降低至7e39。在1e10317鹰时，超过100的每个E31等级将E22和E23线性基础值减少0.2%，在1e10354鹰时它们还会使基础鸭子获取量翻倍"
                        },
                }, // hasMilestone("e", 77)
                78: {
                        requirementDescription(){
                                return "1e11235只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e11235")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E31等级将其线性基础值减少0.1%。在1e11260鹰时，将E23线性基础成本翻倍，但将E31线性基础值减少1e300"
                        },
                }, // hasMilestone("e", 78)
                79: {
                        requirementDescription(){
                                return "1e11474只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e11474")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：基础鹰获取量增加20%，并将E23基础成本增加1e100。在1e11607和1e11645鹰时，将超过50的每个鹰里程碑的乘数增加1%，但基础鹰获取量减少24%。在5个E32等级时，E32将其线性成本基础值乘以100，在7级时增至4321"
                        },
                }, // hasMilestone("e", 79)
                80: {
                        requirementDescription(){
                                return "1e17750只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e17750")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.unlocked) return "奖励：里程碑乘以绿宝石获取量" + makePurple("每1+雀里程碑") + "。"
                                return "奖励：里程碑乘以绿宝石获取量。"
                        },
                }, // hasMilestone("e", 80)
                81: {
                        requirementDescription(){
                                return "1e41320只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e41320")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.challenges[22] >= 1) return "被战斗试炼禁用。"
                                return "奖励：里程碑乘以绿宝石获取量每超过30级。"
                        },
                }, // hasMilestone("e", 81)
                82: {
                        requirementDescription(){
                                return "1e43176只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e43176")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.challenges[22] >= 1) return "被战斗试炼禁用。"
                                return "奖励：里程碑^3乘以绿宝石获取量每超过33级。"
                        },
                }, // hasMilestone("e", 82)
                83: {
                        requirementDescription(){
                                return "1e44180只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e44180")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.challenges[22] >= 1) return "被战斗试炼禁用。"
                                if (hasUpgrade("d", 52)) {
                                        if (player.shiftAlias) return "由D<sup>2</sup>u--s改进。"
                                        return "奖励：里程碑^2乘以绿宝石获取量每级。"
                                }
                                return "奖励：里程碑^2乘以绿宝石获取量每超过33级。"
                        },
                }, // hasMilestone("e", 83)
                84: {
                        requirementDescription(){
                                return "1e48080只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e48080")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.challenges[22] >= 2) return "被战斗试炼禁用。"
                                return "奖励：里程碑^3乘以绿宝石获取量每超过38级。"
                        },
                }, // hasMilestone("e", 84)
                85: {
                        requirementDescription(){
                                return "1e55500只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e55500")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：疲惫层级给予免费矿工等级。"
                        },
                }, // hasMilestone("e", 85)
                86: {
                        requirementDescription(){
                                return "1e56585只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e56585")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：疲惫层级给予免费筛选者等级。"
                        },
                }, // hasMilestone("e", 86)
                87: {
                        requirementDescription(){
                                return "1e64646只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e64646")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.challenges[22] >= 2) return "被战斗试炼禁用。"
                                return "奖励：里程碑^4乘以绿宝石获取量每超过56级。"
                        },
                }, // hasMilestone("e", 87)
                88: {
                        requirementDescription(){
                                return "1e67865只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e67865")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将更快筛选者成本基础值和疲惫层级线性基础值每超过57级减半。"
                        },
                }, // hasMilestone("e", 88)
                89: {
                        requirementDescription(){
                                return "1e73340只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e73340")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每超过50级将E33的线性基础值除以10。"
                        },
                }, // hasMilestone("e", 89)
                90: {
                        requirementDescription(){
                                return "1e102140只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e102140")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：E33等级和层级从疲惫层级二次成本基础值中减去0.001（最大1000/700）。"
                        },
                }, // hasMilestone("e", 90)
                91: {
                        requirementDescription(){
                                return "1e109145只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e109145")
                        },
                        unlocked(){
                                return true
                        },
                        effect(){
                                let p = .2
                                let t = new Decimal(1).plus(player.T.points.sub(94).max(0).min(9))

                                if (player.T.points.gte(95)) p += .05
                                if (player.T.points.gte(98)) p += .05

                                return t.times(p)
                        },
                        effectDescription(){
                                let ret = "奖励：减去0.2有效层级，在95至103层级重新应用此效果。在95和98层级时每次应用效果增加0.05。"
                                return ret + br + "当前：" + format(tmp.e.milestones[91].effect)
                        },
                }, // hasMilestone("e", 91)
                92: {
                        requirementDescription(){
                                return "1e158100只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e158100")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：里程碑^(里程碑<sup>2/3</sup>)乘以绿宝石获取量每超过109级。"
                        },
                }, // hasMilestone("e", 92)
                93: {
                        requirementDescription(){
                                return "1e183130只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e183130")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：向疲惫层级基础值增加(层级-120)*0.001（最大+0.05），且每次层级转换时仅失去每个绿宝石可购买项的20个。"
                        },
                }, // hasMilestone("e", 93)
                94: {
                        requirementDescription(){
                                return "1e740000只鹰"
                        },
                        done(){
                                return player.e.points.gte("1e740e3")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除所有鹰可购买项的基础成本。"
                        },
                }, // hasMilestone("e", 94)
                95: {
                        requirementDescription(){
                                return "2e2222222只鹰"
                        },
                        done(){
                                return player.e.points.gte("2e2222222")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过222层级时始终拥有恰好一秒的绿宝石生产时间（在雀挑战中禁用）。永久将过滤器'每'数量在挑战外限制为123。"
                        },
                }, // hasMilestone("e", 95)
        },
        tabFormat: {
                "升级": {
                        content: ["主显示",
                                ["prestige-button", "", function (){ return isPassiveGainActive("e") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "您的最佳鹰数量是 " + format(player.e.best) : "您已完成 " + formatWhole(player.e.times) + " 次鹰重置"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("e")) {
                                                        if (player.shiftAlias) return "鹰获取公式为 " + getGeneralizedPrestigeButtonText("e")
                                                        return "您每秒获得 " + format(tmp.e.getResetGain) + " 只鹰"
                                                }
                                                return "声望有2秒冷却时间 (" + format(Math.max(0, 2-player.e.time)) + ")" 
                                        },
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["主显示",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("e")) return "您每秒获得 " + format(tmp.e.getResetGain) + " 只鹰"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("e", 22) || player.f.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "主显示",
                                ["display-text",
                                        function() {
                                                return "您已完成 " + formatWhole(player.e.times) + " 次鹰重置"
                                        }
                                ],
                                "milestones"
                        ],
                        unlocked(){
                                return player.e.times > 0 || player.f.unlocked
                        },
                },
        },
        onPrestige(gain){
                player.e.times += player.f.best.gt(0) || player.G.unlocked ? 3 : 1
        },
        doReset(layer){
                let data = player.e
                if (layer == "e") data.time = 0
                if (!getsReset("e", layer)) return
                
                data.times = hasMilestone("f", 2) ? Math.min(data.times, player.f.times) : 0

                if (!false/*player.i.unlocked*/) { //升级
                        let keptUpgrades = 0
                        if (hasMilestone("f", 4)) keptUpgrades += player.f.times
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!false/*player.h.unlocked*/) { //里程碑
                        let keptMilestones = 0
                        if (hasMilestone("f", 3)) keptMilestones += player.f.times
                        if (hasMilestone("f", 8)) keptMilestones += player.f.times
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //资源
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //可购买项
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        data.buyables[resetBuyables[j]] = decimalZero
                }
        },
})

addLayer("f", {
        name: "雀", // 可选，仅少数地方使用。若缺失则直接使用层ID
        symbol: "F", // 显示在节点上的符号，默认为首字母大写的ID
        position: 2, // 行内横向位置（默认按ID字母排序）
        row: 5, // 在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
        }},
        color: "#D16FA9",
        branches: ["e"],
        requires: new Decimal("1e293000"), // 可以是考虑需求增长的函数
        resource: "雀", // 声望货币名称
        baseResource: "鹰", // 基于的资源名称
        baseAmount() {return player.e.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        getResetGain() {
                let ret = getGeneralizedPrestigeGain("f")

                if (!hasUpgrade("f", 25) || player.f.challenges[22] == 0) return ret.min("1e90000")

                return ret
        },
        getBaseDiv(){
                return new Decimal("1e93000")
        },
        getGainExp(){
                let ret = new Decimal(2)

                if (hasUpgrade("f", 12))        ret = ret.plus(Math.max(0, player.f.challenges[12]-10) * .2)
                if (!hasUpgrade("f", 25))       ret = ret.plus(CURRENT_BUYABLE_EFFECTS["f11"])
                                                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["f23"])
                if (hasUpgrade("e", 45))        ret = ret.plus(player.T.points.sub(1000).max(0).div(100).div(20).times(player.e.upgrades.length))
                if (hasMilestone("f", 20))      ret = ret.plus(5)
                if (hasMilestone("f", 22))      ret = ret.plus(5)
                if (hasMilestone("E", 18))      ret = ret.plus(player.T.points.max(1500).sub(1562).div(100))
                if (hasMilestone("E", 19)) {
                        if (player.E.points.gte("1e5147"))      ret = ret.plus(player.T.points.sub(1600).max(0).div(100))
                        if (player.E.points.gte("1e5164"))      ret = ret.plus(player.T.points.sub(1607).max(0).div(100))
                        if (player.E.points.gte("1e5186"))      ret = ret.plus(player.T.points.sub(1615).max(0).div(100))
                }
                if (hasMilestone("f", 24))      ret = ret.plus(1)
                if (hasMilestone("E", 21) && player.f.points.gte("1e191769"))      ret = ret.plus(2)
                if (hasMilestone("G", 7))       ret = ret.plus(player.T.totalranks.sub(92).max(0))

                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(.0001) // 10^-4

                if (hasMilestone("E", 7)) {
                        ret = ret.times(Decimal.pow(1.01, player.T.points.min(777)))
                        if (hasMilestone("f", 15) || player.T.points.gte(1200)) {
                                ret = ret.times(Decimal.pow(1.01, player.T.points.min(1024).sub(777).max(0).div(2)))
                                ret = ret.times(Decimal.pow(1.01, player.T.points.sub(1024).max(0).div(4)))
                        } else {
                                ret = ret.times(Decimal.pow(1.01, player.T.points.sub(777).max(0).div(2)))
                        }
                }
                let exp = new Decimal(Math.min(60, layerChallengeCompletions("f")))
                exp = exp.plus(tmp.T.buyables[22].effect)
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["f13"].pow(exp))
                if (hasMilestone("E", 10)) {
                        if (player.f.points.gte("4e44444"))     ret = ret.times(.98)
                        if (player.f.points.gte("1e48000"))     ret = ret.times(.955)
                }
                if (hasMilestone("E", 12))      ret = ret.times(.923)
                if (hasUpgrade("e", 43))        ret = ret.times(Decimal.pow(.999, player.e.upgrades.length))
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["E33"])
                
                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("f").div(400)

                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["f12"])
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["f21"])

                if (hasMilestone("f", 7))       ret = ret.times(Decimal.pow(1.05, player.T.points.sub(tmp.f.milestones[7].start).max(0)))
                if (hasUpgrade("e", 31))        ret = ret.times(Decimal.pow(1.1, player.e.upgrades.length).pow(layerChallengeCompletions("f")))
                if (hasUpgrade("f", 22))        ret = ret.div(1e84)
                if (hasUpgrade("e", 43))        ret = ret.times(Decimal.pow(3, player.e.upgrades.length))
                if (hasMilestone("f", 16))      ret = ret.times(10)
                if (hasUpgrade("f", 25))        ret = ret.times(CURRENT_BUYABLE_EFFECTS["f11"])
                if (hasMilestone("T", 19) && player.f.buyables[13].gte(3000)) {
                                                ret = ret.div("1e8000")
                }
                if (hasUpgrade("e", 45) && player.e.points.gte("ee10")) {
                        ret = ret.div(Decimal.pow(5e163, player.e.upgrades.length))
                }
                if (player.f.points.gte("e90000")) {
                        if (hasMilestone("f", 19))      ret = ret.div("2e543")
                        if (hasMilestone("f", 20))      ret = ret.div("1e916")
                }
                if (hasUpgrade("T", 31) && player.T.points.gte(1000)) {
                        ret = ret.div("1e200")
                }
                if (hasMilestone("G", 5))       ret = ret.times(10)
                let exp1 = player.T.points
                let exp2 = player.G.points
                if (exp1.gte(5500) && !hasMilestone("G", 10))   exp1 = exp1.div(5500).pow(.7).times(5500)
                if (exp1.gte(5412))                             exp1 = exp1.sub(4412).log10().times(1804)
                if (exp2.gte(87) && !hasMilestone("G", 10))     exp2 = exp2.times(87).sqrt()
                if (exp2.gte(82))                               exp2 = exp2.times(82).sqrt()
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["f32"].pow(exp1).pow(exp2))

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("f") || player.f.points.lt(1)) return decimalOne

                let amt = player.f.points

                let exp1 = amt.max(10).log10()

                let exp = exp1.times(exp1.pow(2).min(400)).min(7e4)
                if (player.f.challenges[22] == 0) {
                        exp = exp.times(CURRENT_BUYABLE_EFFECTS["f13"])
                }
                if (hasMilestone("f", 19))      exp = exp.times(3)
                if (hasMilestone("T", 20))      exp = exp.times(player.f.points.gte("1e92536") ? 9 : 3)

                let ret = amt.plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("f")
        },
        getNextAt(){
                return getGeneralizedNextAt("f")
        },
        update(diff){
                let data = player.f

                if (tmp.f.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("f", diff)
                if (hasMilestone("f", 11) && !player.f.mileAB && !hasMilestone("E", 17)) {
                        if (player.f.points.div(tmp.f.getResetGain.max(1)).lte(20)) {
                                player.f.points = player.f.points.max(tmp.f.getResetGain.max(1).times(20))
                        }
                }
                
                if (hasMilestone("f", 21)) {
                        handleGeneralizedBuyableAutobuy(diff, "f")
                } else if (hasMilestone("f", 11) && player.G.unlocked) {
                        handleGeneralizedBuyableAutobuy(diff, "f")
                } else if (hasMilestone("f", 16) && player.f.mileAB && (canAffordBuyable("f", 11) || canAffordBuyable("f", 12) || canAffordBuyable("f", 13))) {
                        handleGeneralizedBuyableAutobuy(diff, "f")
                } else {
                        data.abtime = 0
                }
                data.time += diff
        },
        layerShown(){return player.T.best.gte(145) || player.f.unlocked},
        prestigeButtonText(){
                if (isPassiveGainActive("f")) return ""
                return getGeneralizedPrestigeButtonText("f")
        },
        canReset(){
                return player.f.time >= 2 && !isPassiveGainActive("f") && tmp.f.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>F-nch"
                        },
                        description(){
                                let a = "雀挑战将矿工线性成本基础值减少0.02"
                                return a
                        },
                        cost: new Decimal(1e13),
                        unlocked(){
                                return layerChallengeCompletions("f") >= 11 || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Fi-ch"
                        },
                        description(){
                                let a = "被动增益完成超过10次时，将筛子基础成本除以雀数量，并向雀增益指数增加0.2"
                                return a
                        },
                        cost: new Decimal(2.7e27),
                        unlocked(){
                                return layerChallengeCompletions("f") >= 36 || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>F--ch"
                        },
                        description(){
                                let a = "超过456级时矿工给予免费快速筛选者等级，但矿工基础值为1"
                                return a
                        },
                        cost: new Decimal(1e243),
                        unlocked(){
                                return layerChallengeCompletions("f") >= 40 || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Fin-h"
                        },
                        description(){
                                if (player.shiftAlias) return "F12的减少在1500级后每三级应用一次"
                                let a = "重置矿工并更改其公式。向其基础值增加0.4。每个F13将F12基础成本除以10"
                                return a
                        },
                        onPurchase(){
                                player.E.buyables[21] = decimalZero
                        },
                        cost: new Decimal("1e8081"),
                        unlocked(){
                                return layerChallengeCompletions("f") >= 60 || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>F-n-h"
                        },
                        description(){
                                let a = "向快速筛选者基础值增加0.293，并向筛子基础值每超过1500级增加0.0001"
                                return a
                        },
                        cost: new Decimal("1e13992"),
                        unlocked(){
                                return hasUpgrade("f", 14) || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Fi--h"
                        },
                        description(){
                                let a = "将快速/快速效果乘以10/5，但禁用鹰里程碑92"
                                return a
                        },
                        cost: new Decimal("1e23141"),
                        unlocked(){
                                return hasUpgrade("f", 15) || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>F---h"
                        },
                        description(){
                                let a = "超过950级时从Rank I加成中减去，并将雀增益除以1e84"
                                return a
                        },
                        cost: new Decimal("1e41951"),
                        unlocked(){
                                return hasUpgrade("f", 21) || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Finc-"
                        },
                        description(){
                                let a = "E23给予免费E22等级而非E12等级，但将F11/筛子线性成本基础值增加0.119/11"
                                return a
                        },
                        onPurchase(){
                                player.E.buyables[31] = decimalZero
                        },
                        cost: new Decimal("1e50886"),
                        unlocked(){
                                return hasUpgrade("f", 22) || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>F-nc-"
                        },
                        description(){
                                let a = "层级可购买项将同行的可购买项基础值增加5%，并向F11线性基础值增加0.063"
                                return a
                        },
                        onPurchase(){
                                player.E.buyables[31] = decimalZero
                        },
                        cost: new Decimal("1e60498"),
                        unlocked(){
                                return hasUpgrade("f", 23) || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Fi-c-"
                        },
                        description(){
                                if (player.shiftAlias) return "需要此升级才能获得超过1e90000雀/秒"
                                let a = "将F11基础和基础绿宝石获取量乘以989倍，但其效果变为雀数量<sup>**</sup>"
                                return a
                        },
                        onPurchase(){
                                player.f.everU25 = true
                        },
                        cost: new Decimal("1e90000"),
                        unlocked(){
                                return hasUpgrade("f", 24) || player.G.unlocked
                        }, 
                }, // hasUpgrade("f", 25)
        },
        buyables: getLayerGeneralizedBuyableData("f", [
                        function(){
                                return player.f.challenges[12] >= 13 //|| player.g.unlocked
                        },
                        function(){
                                return player.f.challenges[12] >= 19 //|| player.g.unlocked
                        },
                        function(){
                                return player.f.challenges[12] >= 23 //|| player.g.unlocked
                        },
                        function(){
                                return player.f.buyables[12].gte(9500) //|| player.g.unlocked
                        },
                        function(){
                                return player.f.buyables[12].gte(13000) //|| player.g.unlocked
                        },
                        function(){
                                return player.f.buyables[12].gte(15750) //|| player.g.unlocked
                        },
                        function(){
                                return player.f.buyables[12].gte(31700) //|| player.g.unlocked
                        },
                        function(){
                                return player.f.buyables[12].gte(52000) //|| player.g.unlocked
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return "1次雀重置"
                        },
                        done(){
                                return player.f.times >= 1
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将前一中间列可购买项的基础值乘以1.01，并将鸭批量数量翻倍并平方"
                        },
                }, // hasMilestone("f", 1)
                2: {
                        requirementDescription(){
                                return "2次雀重置"
                        },
                        done(){
                                return player.f.times >= 2
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个鹰重置，平方鹰可购买项批量数量，每个鹰里程碑或E33等级将鸭和前8个鹰可购买项的线性成本基础值减少1%"
                        },
                }, // hasMilestone("f", 2)
                3: {
                        requirementDescription(){
                                return "4只雀"
                        },
                        done(){
                                return player.f.points.gte(4)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个鹰里程碑，并将绿宝石和鹰自动购买器的速度和批量数量翻倍。一次性购买所有绿宝石可购买项"
                        },
                }, // hasMilestone("f", 3)
                4: {
                        requirementDescription(){
                                return "8只雀"
                        },
                        done(){
                                return player.f.points.gte(8)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：自动购买层级，获得" + makeBlue("1e1000") + "倍鸭，过滤器基础成本为1。每次重置保留一个绿宝石和鹰升级，并将E33基础成本除以10^雀数量"
                                return "奖励：自动购买层级，获得1e10倍鸭，过滤器基础成本为1。每次重置保留一个绿宝石和鹰升级，并将E33基础成本除以10^雀数量"
                        },
                }, // hasMilestone("f", 4)
                5: {
                        requirementDescription(){
                                return "16只雀"
                        },
                        done(){
                                return player.f.points.gte(16)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：在层级重置和雀重置时保留绿宝石里程碑，雀重置次数+1乘以绿宝石和鹰的批量数量并保留其自动购买器。改进多个鹰里程碑"
                        },
                }, // hasMilestone("f", 5)
                6: {
                        requirementDescription(){
                                return "32只雀"
                        },
                        done(){
                                return player.f.points.gte(32)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：鹰里程碑91和绿宝石里程碑3不再影响有效层级。将疲惫层级基础值乘以" + makeBlue("1.49")
                                return "奖励：鹰里程碑91和绿宝石里程碑3不再影响有效层级。将疲惫层级基础值乘以1.5/1.01（约1.49）"
                        },
                }, // hasMilestone("f", 6)
                7: {
                        requirementDescription(){
                                return "E33基础成本低于64"
                        },
                        done(){
                                return getBuyableBases("e", 33)[0].lte(64)
                        },
                        unlocked(){
                                return true
                        },
                        effectPer(){
                                let e = getBuyableAmount("e", 33)
                                if (e.gte(3025)) e = e.times(3025**3).root(4).min(1e5)
                                return Decimal.pow(1.05, e)
                        },
                        start(){
                                let r = 170
                                if (hasUpgrade("e", 32))        r -= player.f.challenges[11]
                                if (hasUpgrade("d", 52))        r -= player.f.challenges[12]
                                if (hasMilestone("G", 3))       r -= player.G.points.times(2).min(1e7).floor().toNumber()
                                if (hasMilestone("E", 22))      r += 400
                                return Math.max(0, r)
                        },
                        effectDescription(){
                                if (hasUpgrade("e", 32)) {
                                        if (player.shiftAlias) return "由Eag--改进：每完成一个活跃层级挑战，起始层级提前1级"
                                        return "奖励：超过" + tmp.f.milestones[7].start + "的层级将雀增益增加5%，绿宝石和鹰增益每E33等级增加5%（在3000时软上限）<br>当前：每层级x" + format(tmp.f.milestones[7].effectPer)
                                }
                                return "奖励：超过170的层级将雀增益增加5%，绿宝石和鹰增益每E33等级增加5%（在3000时软上限）<br>当前：每层级x" + format(tmp.f.milestones[7].effectPer)
                        },
                }, // hasMilestone("f", 7)
                8: {
                        requirementDescription(){
                                return "128只雀"
                        },
                        done(){
                                return player.f.points.gte(128)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每次重置保留一个层级升级、层级里程碑和鹰里程碑。将鸭和鹰的批量数量和速度翻倍。改进更多里程碑"
                        },
                }, // hasMilestone("f", 8)
                9: {
                        requirementDescription(){
                                return "1024只雀"
                        },
                        done(){
                                return player.f.points.gte(1024)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除雀声望能力，每秒获得100%重置时获得的雀，每秒获得一次雀重置"
                        },
                }, // hasMilestone("f", 9)
                10: {
                        requirementDescription(){
                                return "1.80e308只雀"
                        },
                        done(){
                                return player.f.points.gte(Decimal.pow(2, 1024))
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.f.points.lte("1e100") && hasMilestone("f", 10) && !player.shiftAlias) return "在1e100雀之前禁用。按住Shift查看效果"
                                return "奖励：每超过500级向矿工基础值增加0.001并使其每雀挑战应用，但将F11线性成本基础值增加0.1"
                        },
                }, // hasMilestone("f", 10)
                11: {
                        requirementDescription(){
                                return "1e512只雀"
                        },
                        done(){
                                return player.f.points.gte("1e512")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：您始终至少有20秒的雀生产时间，被动增益目标减1" + makeBlue("并自动购买雀可购买项")
                                return "奖励：您始终至少有20秒的雀生产时间，被动增益目标减1"
                        },
                }, // hasMilestone("f", 11)
                12: {
                        requirementDescription(){
                                return "1e5530只雀"
                        },
                        done(){
                                return player.f.points.gte("1e5530")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：从筛子基础值减去0.1，E32给予免费E31等级，筛子给予免费矿工等级"
                        },
                }, // hasMilestone("f", 12)
                13: {
                        requirementDescription(){
                                return "1e9869只雀"
                        },
                        done(){
                                return player.f.points.gte("1e9869")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：更好的所有等级将F11基础成本除以10，其效果乘以雀升级"
                        },
                }, // hasMilestone("f", 13)
                14: {
                        requirementDescription(){
                                return "1e33,972只雀"
                        },
                        done(){
                                return player.f.points.gte("1e33972")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：从筛子线性成本基础值减去1，F13始终将F12基础成本除以" + makeBlue("雀自动购买器速度翻倍")
                                return "奖励：从筛子线性成本基础值减去1，F13始终将F12基础成本除以"
                        },
                }, // hasMilestone("f", 14)
                15: {
                        requirementDescription(){
                                return "1e57,052只雀"
                        },
                        done(){
                                return player.f.points.gte("1e57052")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过1024级的层级对基础雀增益的乘数减半，将F21线性成本基础值减少5e28，E12给予免费E11等级"
                        },
                }, // hasMilestone("f", 15)
                16: {
                        requirementDescription(){
                                return "1e62,901只雀"
                        },
                        done(){
                                return player.f.points.gte("1e62901")
                        },
                        unlocked(){
                                return true
                        },
                        toggles(){
                                return [["f", "mileAB"]]
                        },
                        effectDescription(){
                                return "奖励：获得10倍雀，当以下选项开启时可以自动购买雀可购买项（如果能负担F1X），但不再自动获得20秒的生产时间"
                        },
                }, // hasMilestone("f", 16)
                17: {
                        requirementDescription(){
                                return "1e90,042只雀"
                        },
                        done(){
                                return player.f.points.gte("1e90042")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将F11基础成本乘以1e1000，但将其线性成本基础值减少0.1"
                        },
                }, // hasMilestone("f", 17)
                18: {
                        requirementDescription(){
                                return "1e91,169只雀"
                        },
                        done(){
                                return player.f.points.gte("1e91169")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将F21线性成本基础值除以1e100，F22线性成本基础值除以4e34，但将其基础成本增加4e14,141。在2e91,313雀时，将F22线性成本基础值除以5e144，更好的所有基础值除以2"
                        },
                }, // hasMilestone("f", 18)
                19: {
                        requirementDescription(){
                                return "9.1e91,919只雀"
                        },
                        done(){
                                return player.f.points.gte("9.1e91919")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：F21给予免费F13等级，雀效果指数三倍，但将雀增益除以2e543。在1309级和1e92,322雀时，将F22线性成本基础值除以7e77"
                        },
                }, // hasMilestone("f", 19)
                20: {
                        requirementDescription(){
                                return "1e95,689只雀"
                        },
                        done(){
                                return player.f.points.gte("1e95689")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：F21给予免费F11等级，向雀指数增加5，雀自动购买器速度翻倍，将雀增益除以1e916"
                        },
                }, // hasMilestone("f", 20)
                21: {
                        requirementDescription(){
                                return "1e96,389只雀"
                        },
                        done(){
                                return player.f.points.gte("1e96389")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：雀自动购买器始终激活，F21基础变为[等级]/100，但将其线性成本基础值除以1e5。在1e96,605雀时，敏捷效果翻倍，但将F12基础成本乘以1e600"
                        },
                }, // hasMilestone("f", 21)
                22: {
                        requirementDescription(){
                                return "1e104,308只雀"
                        },
                        done(){
                                return player.f.points.gte("1e104308")
                        },
                        unlocked(){
                                return true
                        },
                        onComplete(){
                                player.f.buyables[12] = player.f.buyables[12].min(16400)
                        },
                        effectDescription(){
                                return "奖励：批量2倍雀可购买项，将F12基础成本增加1e3030，将其等级设置为16,400，向雀增益指数增加5"
                        },
                }, // hasMilestone("f", 22)
                23: {
                        requirementDescription(){
                                return "1e142,630只雀"
                        },
                        done(){
                                return player.f.points.gte("1e142630")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：批量2倍雀可购买项，F23影响更快筛选者并给予免费F12等级，将F12基础成本增加1e1190"
                        },
                }, // hasMilestone("f", 23)
                24: {
                        requirementDescription(){
                                return "1e150,727只雀"
                        },
                        done(){
                                return player.f.points.gte("1e150727")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：向F22基础值增加0.0001，向雀增益指数增加1，但将F1X基础成本增加1e400"
                        },
                }, // hasMilestone("f", 24)
                25: {
                        requirementDescription(){
                                return "1e253,784只雀"
                        },
                        done(){
                                return player.f.points.gte("1e253784")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将F31线性成本基础值除以1e188，筛子等级从Dlareme二次基础值中减去（最大9000）。在1e7390绿宝石时，每超过90的更好的所有等级向Dlareme基础值增加0.0001（在1e349,800/1e358,306雀时减少至30/0）"
                        },
                }, // hasMilestone("f", 25)
                26: {
                        requirementDescription(){
                                return "1e352,550只雀"
                        },
                        done(){
                                return player.f.points.gte("1e352550")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：F31等级从疲惫层级二次基础值中减去0.0001（最大520）"
                        },
                }, // hasMilestone("f", 26)
                27: {
                        requirementDescription(){
                                return "1e598,690只雀"
                        },
                        done(){
                                return player.f.points.gte("1e598690")
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：将等级里程碑6的每项除以10。在1e602,907、1e623,648、1e630,327、1e833,329、3e837,524、1e851,865、1e857,997、1e864,355、1e890,441、1e901,228、1e986,934和1e1,145,677雀时重新应用此效果"
                        },
                }, // hasMilestone("f", 27)
        },
        challenges: {
                11: {
                        name: "活跃层级",
                        goal(){
                                let id = player.f.challenges[11]
                                if (player.G.unlocked) return id == 25 ? 0 : 200
                                let x = [
                                        200, 200, 200, 200, 200, 
                                        209, 200, 211, 207, 201, 
                                        203, 200, 203, 200, 202, 
                                        200, 200, 202, 200, 203, 
                                        202, 201, 200, 202, 201, 
                                        ]
                                return new Decimal(x[id])
                        },
                        canComplete: () => player.T.points.gte(tmp.f.challenges[11].goal),
                        fullDisplay(){
                                let a = "增加" + (player.f.challenges[11] + 1) + "有效层级" + br 
                                if (hasMilestone("T", 15)) a = "有效层级增加" + ((player.f.challenges[11] + 1)/2) + "%<br>"
                                a += "目标：" + formatWhole(tmp.f.challenges[11].goal) + "层级" + br2
                                a += "奖励：向疲惫层级基础值增加" + format(tmp.f.challenges[11].rewardEffect, 3) + br
                                a += "。"+br
                                return a + br2 + "完成次数：" + player.f.challenges[11] + "/25"
                        },
                        rewardEffect(){
                                return new Decimal(player.f.challenges[11] / 200)
                        },
                        onEnter(){
                                player.T.milestones = filter(player.T.milestones, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                player.T.upgrades = filter(player.T.upgrades, [11,12,13,14,15,21,22,25])
                                player.E.milestones = filter(player.E.milestones, [1,2,3,4,5,6])
                                player.E.upgrades = filter(player.E.upgrades, [11,12,13,14,15,21])
                        },
                        unlocked(){
                                return true
                        },
                        countsAs: [],
                        completionLimit: 25,
                }, // inChallenge("f", 11)
                12: { // 17-7 to 17-8, 23-9 to 23-10
                        name: "被动增益",
                        goal(){
                                let id = player.f.challenges[12]
                                let x = [
                                        225, 255, 251, 257, 271, 
                                        271, 272, 277, 278, 284, 
                                        285, 285, 286, 294, 307, 
                                        373, 408, 410, 414, 415, 
                                        414, 411, 416, 420, 417, 
                                        1
                                        ]
                                let ret = new Decimal(x[id])
                                if (hasMilestone("f", 11)) ret = ret.sub(1)
                                return ret
                        },
                        canComplete: () => player.T.points.gte(tmp.f.challenges[12].goal),
                        fullDisplay(){
                                let a = "将绿宝石获取量开" + format(player.f.challenges[12]/100 + 1.01) + "次方根" + br 
                                a += "目标：" + formatWhole(tmp.f.challenges[12].goal) + "层级" + br2
                                a += "奖励：将基础鹰获取量"
                                if (player.f.challenges[12] >= 22) a += "和鸭可购买限制"
                                a += "乘以" + formatWhole(tmp.f.challenges[12].rewardEffect, 3)
                                a += "，并从疲惫层级线性基础值减去" + format(player.f.challenges[12] * .36)
                                return a + br2 + "完成次数：" + player.f.challenges[12] + "/25"
                        },
                        rewardEffect(){
                                return Decimal.pow(10, player.f.challenges[12])
                        },
                        onEnter(){
                                player.T.milestones = filter(player.T.milestones, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                player.T.upgrades = filter(player.T.upgrades, [11,12,13,14,15,21,22,25])
                                player.E.milestones = filter(player.E.milestones, [1,2,3,4,5,6])
                                player.E.upgrades = filter(player.E.upgrades, [11,12,13,14,15,21])
                        },
                        unlocked(){
                                return player.f.challenges[11] >= 1 || hasMilestone("G", 2)
                        },
                        countsAs: [],
                        completionLimit: 25,
                }, // inChallenge("f", 12)
                21: {
                        name: "仅雀",
                        goal(){
                                let id = player.f.challenges[21]
                                let x = [
                                        321, 350, 397, 419, 449, 
                                        484, 517, 551, 567, 575, 
                                        //999, 285, 286, 555, 400, 
                                        ]
                                return new Decimal(x[id])
                        },
                        canComplete: () => player.T.points.gte(tmp.f.challenges[21].goal),
                        fullDisplay(){
                                let a = "鹰获取量是雀效果"
                                if (player.f.challenges[21] >= 4) a += "<sup>3/" + player.f.challenges[21] + "</sup>"
                                a += br + "目标：" + formatWhole(tmp.f.challenges[21].goal) + "层级" + br2
                                a += "奖励：层级向筛子基础值增加" + format(player.f.challenges[21]/10000,4) + "<br>"
                                a += "并保留除" + formatWhole(hasMilestone("G", 2) ? 100 - Math.max(0, player.f.challenges[21]-1)**2 : 100 - 2 * player.f.challenges[21]) + "外的所有层级（挑战外）"
                                return a + br2 + "完成次数：" + player.f.challenges[21] + "/10"
                        },
                        onEnter(){
                                player.T.milestones = filter(player.T.milestones, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                player.T.upgrades = filter(player.T.upgrades, [11,12,13,14,15,21,22,25])
                                player.E.milestones = filter(player.E.milestones, [1,2,3,4,5,6])
                                player.E.upgrades = filter(player.E.upgrades, [11,12,13,14,15,21])
                        },
                        unlocked(){
                                return player.f.challenges[12] >= 13 || hasMilestone("G", 2)
                        },
                        countsAs: [],
                        completionLimit: 10,
                }, // inChallenge("f", 21)
                22: {
                        name: "战斗试炼",
                        goal(){
                                let id = player.f.challenges[22]
                                let x = [
                                        318, 313, 0, 419, 449, 
                                        484, 517, 551, 567, 575, 
                                        //999, 285, 286, 555, 400, 
                                        ]
                                return new Decimal(x[id])
                        },
                        canComplete: () => player.T.points.gte(tmp.f.challenges[22].goal),
                        fullDisplay(){
                                let a = "所有先前挑战"
                                a += br + "目标：" + formatWhole(tmp.f.challenges[22].goal) + "层级" + br2
                                a += "奖励：F13的效果被削弱，并禁用鹰里程碑81、82和83"
                                if (player.f.challenges[22] >= 2) a = a.replace("和83", "83、84和87")
                                return a + br2 + "完成次数：" + player.f.challenges[22] + "/2"
                        },
                        onEnter(){
                                player.T.milestones = filter(player.T.milestones, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                player.T.upgrades = filter(player.T.upgrades, [11,12,13,14,15,21,22,25])
                                player.E.milestones = filter(player.E.milestones, [1,2,3,4,5,6])
                                player.E.upgrades = filter(player.E.upgrades, [11,12,13,14,15,21])
                        },
                        unlocked(){
                                return hasUpgrade("T", 24) || player.T.best.gte(835) || hasMilestone("G", 2)
                        },
                        countsAs: [11,12,21],
                        completionLimit: 2,
                }, // inChallenge("f", 22)
                31: {
                        name: "不知疲倦",
                        goal(){
                                let id = player.f.challenges[31]
                                let x = [
                                        111, 377, 433, 446, 460,
                                        489, 524, 3900, 0, 0, 
                                        ]
                                if (id == 4 && player.T.best.lt(1252)) x[4] += 100
                                if (id == 5 && player.f.best.lt("3e95033") && !player.G.unlocked) x[5] += 100
                                return new Decimal(x[id])
                        },
                        canComplete: () => player.T.points.gte(tmp.f.challenges[31].goal),
                        fullDisplay(){
                                let a = "有效层级乘以log10(层级 + 10)"
                                if (player.f.challenges[31] >= 1) a += "<sup>.25</sup>"
                                if (player.f.challenges[31] >= 2) a = a.replace(".25", ".2")
                                a += br + "目标：" + formatWhole(tmp.f.challenges[31].goal) + "层级" + br2
                                a += "奖励：增加F13线性成本基础值"
                                if (player.f.challenges[31] >= 5) a += "并将有效层级^" + format(tmp.f.challenges[31].tiersExp, 3)

                                return a + "。" + br2 + "完成次数：" + player.f.challenges[31] + " / " + formatWhole(tmp.f.challenges[31].completionLimit)
                        },
                        tiersExp(){
                                let times = player.f.challenges[31]
                                if (times < 5) return 1
                                return 1.004-.001 * times
                        },
                        onEnter(){
                                player.T.milestones = filter(player.T.milestones, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                player.T.upgrades = filter(player.T.upgrades, [11,12,13,14,15,21,22,25])
                                player.E.milestones = filter(player.E.milestones, [1,2,3,4,5,6])
                                player.E.upgrades = filter(player.E.upgrades, [11,12,13,14,15,21])

                                if (player.G.points.gte(50)) {
                                        player.T.best = new Decimal(3800)
                                        player.T.points = new Decimal(3800)
                                }
                        },
                        onComplete(){
                                if (player.f.challenges[31] >= 8) player.T.best = new Decimal(5700)
                        },
                        unlocked(){
                                return (hasUpgrade("e", 44) && player.T.best.gte(1079)) || player.G.unlocked
                        },
                        countsAs: [],
                        completionLimit(){
                                return player.G.points.gte(88) ? 8 : 7
                        },
                }, // inChallenge("f", 31)
        },
        tabFormat: {
                "升级": {
                        content: ["主显示",
                                ["prestige-button", "", function (){ return isPassiveGainActive("f") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "您的最佳雀数量是 " + format(player.f.best) : "您已完成 " + formatWhole(player.f.times) + " 次雀重置"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("f")) {
                                                        if (player.shiftAlias) return "雀获取公式是 " + getGeneralizedPrestigeButtonText("f")
                                                        return "您每秒获得 " + format(tmp.f.getResetGain) + " 只雀"
                                                }
                                                return "声望有2秒冷却时间 (" + format(Math.max(0, 2-player.f.time)) + ")" 
                                        },
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["主显示",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("f")) return "您每秒获得 " + format(tmp.f.getResetGain) + " 只雀"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return player.f.challenges[12] >= 13 //|| player.g.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "主显示",
                                ["display-text",
                                        function() {
                                                return "您已完成 " + formatWhole(player.f.times) + " 次雀重置"
                                        }
                                ],
                                "milestones"
                        ],
                        unlocked(){
                                return player.f.times > 0 || player.G.unlocked
                        },
                },
                "挑战": {
                        content: [
                                "主显示",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("f")) return "您每秒获得 " + format(tmp.f.getResetGain) + " 只雀"
                                                return ""
                                        },
                                ],
                                "challenges"
                        ],
                        unlocked(){
                                return player.T.best.gte(218) || inChallenge("f", 11) || player.f.challenges[11] >= 1 //|| player.g.unlocked 
                        },
                },
                "信息": {
                        content: [
                                "主显示",
                                ["display-text",
                                        function() {
                                                let a = "雀重置所有先前资源包括层级和绿宝石。<br><br>雀乘数影响绿宝石获取量最多1e100倍。<br>查看水豚信息标签页获取更新的加成"
                                                if (layerChallengeCompletions("f") < 5) return a
                                                return a + br2 + "如果挑战完成超过5次，<br>将绿宝石获取量上限设为10秒的生产量"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                let r = br
                                                if (player.f.buyables[12].gte(1)) r += br + "<sup>*</sup>最终会有软上限"
                                                if (hasUpgrade("f", 24)) r += br + "<sup>**</sup>快速现在影响F13"
                                                if (player.f.buyables[32].gte(2000)) r += br + "F32从等级/层级获得的效果在83/5412时有平方根/对数软上限，在88/5500时有进一步的(-)<sup>.5/.7</sup>软上限"
                                                return r
                                        }
                                ],
                                
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
        onPrestige(gain){
                player.f.times += player.G.best.gt(0) ? 3 : 1
        },
        doReset(layer){
                let data = player.f
                if (layer == "f") data.time = 0
                if (!getsReset("f", layer)) return
                
                data.times = hasMilestone("G", 1) ? Math.min(data.times, player.G.points.min(1e7).toNumber()) : 0

                if (!false/*player.j.unlocked*/) { //升级
                        let keptUpgrades = 0
                        if (false) keptUpgrades += 0
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!false/*player.i.unlocked*/) { //里程碑
                        let keptMilestones = hasMilestone("G", 1) ? player.G.points.min(data.milestones.length).toNumber() : 0
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //资源
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //可购买项
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        data.buyables[resetBuyables[j]] = decimalZero
                }

                //挑战
                let resetChallenges = [11, 12, 21, 22, 31]
                if (hasMilestone("G", 3)) resetChallenges = [22, 31]
                for (let j = 0; j < resetChallenges.length; j++) {
                        if (hasMilestone("G", 7)) break
                        data.challenges[resetChallenges[j]] = 0
                }
        },
})

addLayer("ach", {
        name: "成就",
        symbol: "⭑", 
        position: 1,
        startData(){ return {
                unlocked: true,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                hiddenRows: 0,
                clickedYeet: 0,
                completedRows: 0,
        }},
        color: "#FFC746",
        branches: [],
        requires: decimalZero,
        resource: "成就",
        baseResource: "点数",
        baseAmount(){return decimalZero},
        type: "none",
        update(diff){
                let data = player.ach
                data.points = new Decimal(data.achievements.length).max(data.points)
                data.best = data.best.max(data.points)
                if (hasCompletedFirstNRows(player.ach.completedRows + 1)){
                        player.ach.completedRows ++
                }
        },
        row: "side",
        hotkeys: [
                {
                        key: "THIS SHOULD NOT BE POSSIBLE",
                        description: makeBlue("<b>通用快捷键</b>:"),
                        onPress(){
                                console.log("出错了，发生了严重问题")
                        },
                },
                {key: "Control+C", description: "Control+C: 打开更新日志", onPress(){
                                showTab("changelog-tab")
                        }
                },
                {key: ",", description: ",: 向左切换一个标签页", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                player.subtabs[l].mainTabs = getNextLeftTab(l)
                        }
                },
                {key: ".", description: ".: 向右切换一个标签页", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                player.subtabs[l].mainTabs = getNextRightTab(l)
                        }
                },
                {key: "ArrowLeft", description: "左箭头: 向左切换一个标签页", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                if (!player.arrowHotkeys) return
                                player.subtabs[l].mainTabs = getNextLeftTab(l)
                        }
                },
                {key: "ArrowRight", description: "右箭头: 向右切换一个标签页", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                if (!player.arrowHotkeys) return
                                player.subtabs[l].mainTabs = getNextRightTab(l)
                        }
                },
                {key: "shift+<", description: "Shift+,: 切换到最左侧标签页", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                k = getUnlockedSubtabs(l)
                                player.subtabs[l].mainTabs = k[0]
                        }
                },
                {key: "shift+>", description: "Shift+.: 切换到最右侧标签页", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                k = getUnlockedSubtabs(l)
                                player.subtabs[l].mainTabs = k[k.length-1]
                        }
                },
                {key: "Control+S", description: "Control+S: 保存游戏", 
                        onPress(){
                                save()
                        }
                },
                {key: "shift+Control+S", description: "Shift+Control+S: 保存游戏", 
                        onPress(){
                                save()
                        }
                },
                {key: "shift+Control+E", description: "Shift+Control+E: 强制结束游戏",
                        onPress(){ // 强制弹出结束游戏界面
                                forceEndgame = true
                                player.keepGoing = false
                        }
                },
                {key: " ", description: "空格键: 暂停/继续", 
                        onPress(){
                                if (player.spaceBarPauses) player.paused = !player.paused
                        }
                },
                {
                        key: "THIS SHOULD NOT BE POSSIBLE2",
                        description: br + makeBlue("<b>快速跳转</b>:"),
                        onPress(){
                                console.log("出错了，发生了严重问题")
                        },
                },
                {key: "shift+!", description: "Shift+1: 跳转到成就", 
                        onPress(){
                                player.tab = "ach"
                        }
                },
                {key: "shift+A", description: "Shift+A: 跳转到鳄鱼", 
                        onPress(){
                                if (player.a.unlocked) player.tab = "a"
                        }
                },
                {key: "shift+B", description: "Shift+B: 跳转到海狸", 
                        onPress(){
                                if (player.b.unlocked) player.tab = "b"
                        },
                        unlocked(){
                                return player.b.unlocked
                        }
                },
                {key: "shift+C", description: "Shift+C: 跳转到水豚", 
                        onPress(){
                                if (player.c.unlocked) player.tab = "c"
                        },
                        unlocked(){
                                return player.c.unlocked
                        }
                },
                {key: "shift+D", description: "Shift+D: 跳转到鸭子", 
                        onPress(){
                                if (player.d.unlocked) player.tab = "d"
                        },
                        unlocked(){
                                return player.d.unlocked
                        }
                },
                {key: "shift+E", description: "Shift+E: 跳转到鹰", 
                        onPress(){
                                if (player.e.unlocked) player.tab = "e"
                        },
                        unlocked(){
                                return player.e.unlocked
                        }
                },
                {key: "shift+F", description: "Shift+F: 跳转到雀", 
                        onPress(){
                                if (player.f.unlocked) player.tab = "f"
                        },
                        unlocked(){
                                return player.f.unlocked
                        }
                },
                {
                        key: "THIS SHOULD NOT BE POSSIBLE3",
                        description: br + makeBlue("<b>声望</b>:"),
                        onPress(){
                                console.log("出错了，发生了严重问题")
                        },
                        unlocked(){
                                return true
                        },
                },
                {key: "a", description: "A: 重置鳄鱼",
                        onPress(){
                                if (canReset("a")) doReset("a")
                        }
                },
                {key: "b", description: "B: 重置海狸",
                        onPress(){
                                if (canReset("b")) doReset("b")
                        },
                        unlocked(){
                                return player.b.unlocked
                        }
                },
                {key: "c", description: "C: 重置水豚",
                        onPress(){
                                if (canReset("c")) doReset("c")
                        },
                        unlocked(){
                                return player.c.unlocked
                        }
                },
                {key: "d", description: "D: 重置鸭子",
                        onPress(){
                                if (canReset("d")) doReset("d")
                        },
                        unlocked(){
                                return player.d.unlocked
                        }
                },
                {key: "e", description: "E: 重置鹰",
                        onPress(){
                                if (canReset("e")) doReset("e")
                        },
                        unlocked(){
                                return player.e.unlocked
                        }
                },
                {key: "f", description: "F: 重置雀",
                        onPress(){
                                if (canReset("f")) doReset("f")
                        },
                        unlocked(){
                                return player.f.unlocked
                        }
                },
                {
                        key: "THIS SHOULD NOT BE POSSIBLE4",
                        description: br + makeBlue("<b>其他</b>:"),
                        onPress(){
                                console.log("出错了，发生了严重问题")
                        },
                        unlocked(){
                                return true
                        },
                },
                {key: "Control+T", description: "Control+T: 重置层级",
                        onPress(){
                                if (canReset("T")) doReset("T")
                        },
                        unlocked(){
                                return player.T.unlocked
                        }
                },
        ],
        layerShown(){return true},
        prestigeButtonText(){
                return ""
        },
        canReset(){
                return false
        },
        achievements: getFirstNAchData(Object.keys(PROGRESSION_MILESTONES).length),
        clickables: {
                rows: 1,
                cols: 3,
                11: {
                        title(){
                                return "<h3 style='color: #0033FF'>隐藏顶行</h3>"
                        },
                        display(){
                                return "Shift: 隐藏顶部行直到未完成的层"
                        },
                        unlocked(){
                                return true
                        },
                        canClick(){
                                if (player.shiftAlias) return true
                                return player.ach.hiddenRows < Object.keys(PROGRESSION_MILESTONES).length/7
                        },
                        onClick(){
                                if (!this.canClick()) return
                                if (!player.shiftAlias) {
                                        player.ach.hiddenRows ++
                                        return
                                }
                                player.ach.hiddenRows = 0
                                let b = 0
                                while (hasCompletedFirstNRows(player.ach.hiddenRows + 1)) {
                                        b ++ 
                                        player.ach.hiddenRows ++
                                        if (b > 1000) {
                                                console.log('出问题了')
                                                return
                                        }
                                }
                        },
                },
                12: {
                        title(){
                                return "<h3 style='color: #0033FF'>显示一行</h3>"
                        },
                        display(){
                                return "Shift: 显示所有行"
                        },
                        unlocked(){
                                return true
                        },
                        canClick(){
                                return player.ach.hiddenRows > 0
                        },
                        onClick(){
                                if (!this.canClick()) return
                                if (player.shiftAlias) player.ach.hiddenRows = 0
                                else player.ach.hiddenRows --
                        },
                },
                13: {
                        title(){
                                return "<h3 style='color: #0033FF'>点击</h3>"
                        },
                        display(){
                                return formatWhole(player.ach.clickedYeet) + (player.ach.clickedYeet == 69 ? " 不错" : "")
                        },
                        unlocked(){
                                return true
                        },
                        canClick(){
                                return true
                        },
                        onClick(){
                                player.ach.clickedYeet ++ 
                        },
                },
        },
        tabFormat: {
                "成就": {
                        content: [
                                "main-display",
                                "clickables",
                                ["display-text",function(){
                                        return "您已完成前" + formatWhole(player.ach.completedRows) + "行"
                                }],
                                "achievements",
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
        doReset(layer){
                
        },
})

addLayer("E", {
        name: "翡翠", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "Em", // 显示在层节点上，默认为首字母大写的ID
        position: 0, // 行内水平位置，默认按ID字母排序
        row: 3, // 层在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                tier: decimalOne,
        }},
        color: "#3CED20",
        branches: [],
        requires: new Decimal("1e13500"), // 可以是考虑需求增长的函数
        resource(){
                return "翡翠 " + romanize(player.E.tier)
        }, // 声望货币名称
        tooltip(){
                if (player.T.points.gte(500) && !player.shiftAlias) return format(player.E.points) + " / " + format(tmp.T.nextAtDisp)
                return format(player.E.points) + " / " + format(tmp.T.nextAtDisp) + " " + tmp.E.resource
        },
        baseResource: "鹰", // 声望基础资源名称
        baseAmount() {return player.e.points.floor()}, // 获取当前基础资源量
        type: "custom", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        resetsNothing: true,
        getResetGain() {
                if (player.e.best.lt("1e13500")) return decimalZero

                let ret = tmp.E.getGainMultPre.pow(tmp.E.getGainExp).times(tmp.E.getGainMultPost)

                if (inChallenge("f", 12)) ret = ret.root(player.f.challenges[12]/100 + 1.01)

                return ret
        },
        getNextAt(){
                return decimalOne
        },
        getGainExp(){
                let div = new Decimal(1)
                let tier = player.T.points //player.E.tier

                if (tier.gte(tmp.G.nextAt)) tier = tier.plus(tier.plus(1).sub(tmp.G.nextAt))

                if (inChallenge("f", 11)) {
                        if (hasMilestone("T", 15)) tier = tier.times(1.005 + player.f.challenges[11]/200)
                        else tier = tier.plus(1 + player.f.challenges[11])
                }
                if (inChallenge("f", 31)) {
                        let exp = player.f.challenges[31] >= 1 ? .25 : 1
                        if (player.f.challenges[31] >= 2) exp = .2
                        tier = tier.times(tier.plus(10).log10().pow(exp))
                }

                tier = tier.sub(CURRENT_BUYABLE_EFFECTS["E13"])
                tier = tier.sub(CURRENT_BUYABLE_EFFECTS["E22"])
                tier = tier.sub(tmp.G.effect)
                tier = tier.sub(tmp.T.buyables[21].effect)
                if (!hasMilestone("f", 6)) {
                        if (hasMilestone("E", 3))       tier = tier.sub(.5)
                        if (hasMilestone("e", 91))      tier = tier.sub(tmp.e.milestones[91].effect)
                }

                tier = tier.max(0)

                tier = tier.pow(tmp.f.challenges[31].tiersExp)

                if (!hasMilestone("T", 6) || tier.lte(16)) {
                        div = div.plus(tier.div(10).pow(2))
                }
                else    div = div.plus(tier.pow(1.5).div(25))

                return div.pow(-1)
        },
        getGainWeights(layer){
               return {
                        "a": .001,
                        "b": .002,
                        "c": .005,
                        "d": .01,
                        "e": .02,
                        "G": 100,
                }[layer]
        },
        getInitialGain(){
                let ret = decimalOne
                let layersCurrent = ["a", "b", "c", "d", "e", "G"]
                let calcLayerWeight = function(amt){
                        return amt.max(0).plus(10).log10().pow(.1).min(Decimal.pow(2, 1024))
                }
                for (j in layersCurrent){
                        i = layersCurrent[j]
                        ret = ret.times(calcLayerWeight(player[i].points).pow(layers.E.getGainWeights(i)))
                }
                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(.1)

                ret = ret.times(tmp.E.getInitialGain)
                ret = ret.times(tmp.f.effect.min(1e100))

                ret = ret.times(CURRENT_BUYABLE_EFFECTS["E11"])
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["E21"].pow(hasMilestone("f", 10) && player.f.points.gte("1e100") ? layerChallengeCompletions("f") : 1))
                let exp = player.E.milestones.length + player.T.milestones.length + player.e.milestones.length + player.f.milestones.length
                if (exp > 123) {
                        if (!player.f.activeChallenge) exp = 123
                        else if (player.f.activeChallenge == 21) exp = 123
                        else if (canCompleteChallenge("f", player.f.activeChallenge)) exp = 123
                }
                ret = ret.times(CURRENT_BUYABLE_EFFECTS["E23"].pow(exp))
                
                if (hasMilestone("T", 2)) ret = ret.times(Decimal.pow(3, player.T.milestones.length))
                if (hasMilestone("T", 3)) ret = ret.times(Decimal.pow(4, getBuyableAmount("e", 32).sub(player.T.points.gte(25) ? 0 : 21).max(0).min(1500)))
                if (hasMilestone("T", 4) && !hasUpgrade("E", 21)) {
                        ret = ret.times(Decimal.pow(6, player.E.points.max(1e15).log10().floor().sub(player.T.points.gte(24) ? 0 : 15)))
                }
                if (hasMilestone("T", 9)) {
                        let exp = player.T.milestones.length
                        if (player.T.points.gte(28)) exp *= player.T.upgrades.length ** .7
                        ret = ret.times(Decimal.pow(player.T.points.max(1), exp))
                }
                if (hasMilestone("T", 10) && player.T.points.gte(29) && player.E.points.gte(player.T.points.gte(30) || player.f.unlocked ? 0 : 1e57)) {
                        if (player.f.unlocked)  ret = ret.times(getBuyableAmount("e", 12).plus(getBuyableAmount("e", 11)).max(1))
                        else                    ret = ret.times(getBuyableAmount("e", 11).max(1))
                }
                if (hasMilestone("T", 14)) {
                        ret = ret.times(Decimal.pow(1e95, player.T.points.min(104)))
                        if (player.T.points.eq(105)) ret = ret.times(1e15)
                        if (player.T.points.eq(106)) ret = ret.times(1e30)
                }

                if (hasUpgrade("T", 23))        ret = ret.div(Decimal.pow(2, layerChallengeCompletions("f")**2).pow(player.T.points.min(580)))

                if (hasMilestone("E", 1))       ret = ret.div(Decimal.pow(player.T.points.gte(12) ? 5 : 2, player.T.points.min(player.T.points.gte(13) ? 0 : 7)))

                if (hasUpgrade("E", 13))        ret = ret.times(Decimal.pow(7, player.E.upgrades.length - 2).max(1))
                if (hasUpgrade("E", 15))        ret = ret.div(player.f.unlocked ? 1e10 : 1e40)

                if (hasMilestone("e", 80))      ret = ret.times(Decimal.pow(player.e.milestones.length, 1 + player.f.milestones.length))
                if (hasMilestone("e", 81) && player.f.challenges[22] < 1)      ret = ret.div(Decimal.pow(player.e.milestones.length, player.T.points.min(30)))
                if (hasMilestone("e", 82) && player.f.challenges[22] < 1)      ret = ret.div(Decimal.pow(player.e.milestones.length, player.T.points.min(33).times(3)))
                if (hasMilestone("e", 83) && !hasUpgrade("d", 52) && player.f.challenges[22] < 1) {
                        ret = ret.div(Decimal.pow(player.e.milestones.length, player.T.points.min(33).times(2)))
                }
                if (hasMilestone("e", 84) && player.f.challenges[22] < 2)      ret = ret.div(Decimal.pow(player.e.milestones.length, player.T.points.min(38).times(3)))
                if (hasMilestone("e", 87) && player.f.challenges[22] < 2)      ret = ret.div(Decimal.pow(player.e.milestones.length, player.T.points.min(56).times(4)))
                if (hasMilestone("e", 92) && !hasUpgrade("f", 21))             ret = ret.div(Decimal.pow(player.e.milestones.length, player.T.points.min(109).times(player.e.milestones.length ** (2/3))))

                if (hasMilestone("f", 7))       ret = ret.div(tmp.f.milestones[7].effectPer.pow(player.T.points.min(tmp.f.milestones[7].start)))

                if (hasUpgrade("e", 32))        ret = ret.times(player.f.points.max(1).min(1e250).pow(player.e.upgrades.length))
                if (hasUpgrade("e", 33))        ret = ret.div(Decimal.pow(2, layerChallengeCompletions("f")).pow(player.T.points.min(350)).pow(player.e.upgrades.length))

                if (hasUpgrade("d", 54))        ret = ret.div(tmp.d.upgrades[54].effect.pow(player.T.points.min(639)))

                let emBuys = getBuyableAmount("f", 11).plus(getBuyableAmount("f", 12)).plus(getBuyableAmount("f", 13))
                emBuys = emBuys.plus(getBuyableAmount("f", 21)).plus(getBuyableAmount("f", 22)).plus(getBuyableAmount("f", 23))
                emBuys = emBuys.plus(getBuyableAmount("f", 31)).plus(getBuyableAmount("f", 32)).plus(getBuyableAmount("f", 33))
                ret = ret.times(Decimal.pow(CURRENT_BUYABLE_EFFECTS["E33"], emBuys))
                ret = ret.times(tmp.E.getPerTierMultiplier.pow(player.T.points))

                return ret
        },
        getPerTierMultiplier(){
                let ret = decimalOne

                if (hasMilestone("T", 1))       ret = ret.times(2)
                if (hasMilestone("E", 1))       ret = ret.times(player.T.points.gte(12) ? 5 : 2)
                if (hasMilestone("T", 14))      ret = ret.div(1e95)
                if (hasMilestone("e", 81) && player.f.challenges[22] < 1)      ret = ret.times(player.e.milestones.length)
                if (hasMilestone("e", 82) && player.f.challenges[22] < 1)      ret = ret.times(player.e.milestones.length ** 3)
                if (hasMilestone("e", 83) && player.f.challenges[22] < 1)      ret = ret.times(player.e.milestones.length ** 2)
                if (hasMilestone("e", 84) && player.f.challenges[22] < 2)      ret = ret.times(player.e.milestones.length ** 3)
                if (hasMilestone("e", 87) && player.f.challenges[22] < 2)      ret = ret.times(player.e.milestones.length ** 4)
                if (hasMilestone("e", 92) && !hasUpgrade("f", 21))             ret = ret.times(Decimal.pow(player.e.milestones.length, player.e.milestones.length ** (2/3)))
                if (hasMilestone("f", 7))       ret = ret.times(tmp.f.milestones[7].effectPer)
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["E31"])
                if (hasUpgrade("d", 54))        ret = ret.times(tmp.d.upgrades[54].effect)
                if (hasUpgrade("T", 23))        ret = ret.times(Decimal.pow(2, layerChallengeCompletions("f")**2))
                if (hasUpgrade("e", 33))        ret = ret.times(Decimal.pow(2, layerChallengeCompletions("f")).pow(player.e.upgrades.length))

                return ret
        },
        getGainMultPost(){
                let ret = decimalOne

                if (hasMilestone("T", 13) && player.E.points.gte(1e147)) ret = ret.times(tmp.E.getInitialGain)
                if (hasUpgrade("f", 25))        ret = ret.times(989)
                if (hasUpgrade("E", 32))        ret = ret.times(10)

                return ret
        },
        update(diff){
                let data = player.E

                if (player.e.best.gt("1e13500")) data.unlocked = true
                if (!data.unlocked) return
                
                if (hasMilestone("e", 95) && !player.f.activeChallenge && player.T.points.gte(222) && !(hasUpgrade("T", 23) && player.f.challenges[21] >= 10)) {
                        data.points = tmp.E.getResetGain
                } else if (player.f.activeChallenge && player.f.challenges[player.f.activeChallenge] >= 5 && player.f.activeChallenge < 30) {
                        data.points = data.points.div(tmp.E.getResetGain).plus(diff).min(10).times(tmp.E.getResetGain)
                } else {
                        data.points = data.points.plus(tmp.E.getResetGain.times(diff))
                }
                if (data.points.gte(tmp.T.nextAtDisp)) {
                        data.points = tmp.T.nextAtDisp
                        if (hasMilestone("f", 4) || (hasMilestone("T", 7) && player.G.unlocked)) doReset("T")
                }

                if (hasMilestone("G", 2) && player.f.challenges[21] > 0) {
                        if (player.T.time > 1) {
                                if (player.f.activeChallenge) {
                                        player.T.points = player.T.points.max(player.T.best.min(tmp.f.challenges[player.f.activeChallenge].goal).sub(100 - (player.f.challenges[21]-1)**2))
                                        player.E.points = player.E.points.max(tmp.T.nextAtDisp.pow(.9).div(1e6))
                                } else {
                                        player.T.points = player.T.points.max(player.T.best.sub(100 - (player.f.challenges[21]-1)**2))
                                        player.E.points = player.E.points.max(tmp.T.nextAtDisp.pow(.9).div(1e6))
                                }
                        }
                } else if (player.f.challenges[21] > 0 && !player.f.activeChallenge) {
                        if (player.T.time > 1) player.T.points = player.T.points.max(player.T.best.sub(100 - 2 * player.f.challenges[21]))
                }

                data.best = data.best.max(data.points)
                data.time += diff
        },
        layerShown(){return player.E.unlocked || player.e.best.gte("1e13500")},
        canReset(){
                return false
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>I 翡翠"
                        },
                        description(){
                                let a = "前十个升级解锁一个可购买项并使基础鹰获取+1%"
                                return a
                        },
                        cost: new Decimal(10),
                        unlocked(){
                                return true
                        }, 
                }, // hasUpgrade("E", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>II 翡翠"
                        },
                        description(){
                                let a = "每次触发购买所有鹰可购买项，速度×sqrt(层级)/2"
                                return a
                        },
                        cost: new Decimal(1e7),
                        unlocked(){
                                return player.E.tier.gte(5) || hasUpgrade("E", 12)
                        }, 
                }, // hasUpgrade("E", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>III 翡翠"
                        },
                        description(){
                                let a = "本及后续升级使翡翠获取×7且D 11基础值×7"
                                return a
                        },
                        cost: new Decimal(1e11),
                        unlocked(){
                                return player.E.tier.gte(11) || hasUpgrade("E", 13)
                        }, 
                }, // hasUpgrade("E", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>IV 翡翠"
                        },
                        description(){
                                let a = "E 32赠送免费E 22等级"
                                return a
                        },
                        cost: new Decimal(1e17),
                        unlocked(){
                                return player.E.tier.gte(17) || hasUpgrade("E", 14)
                        }, 
                }, // hasUpgrade("E", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>V 翡翠"
                        },
                        description(){
                                let a = "Faster Sifter赠送免费Sifter等级但翡翠获取÷1e40"
                                if (player.f.unlocked) a = a.replace("40", "10")
                                return a
                        },
                        cost(){
                                return new Decimal(1e77).div(Decimal.pow(100, player.T.points.sub(37).max(0))).max(1e18)
                        },
                        unlocked(){
                                return player.E.tier.gte(37) || hasUpgrade("E", 15)
                        }, 
                }, // hasUpgrade("E", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>VI 翡翠"
                        },
                        description(){
                                let a = "层级里程碑4不再影响翡翠"
                                return a
                        },
                        cost(){
                                return new Decimal(1e185).div(Decimal.pow(1e5, player.T.points.sub(100).max(0))).max(1e19)
                        },
                        unlocked(){
                                return player.E.tier.gte(80) || hasUpgrade("E", 21)
                        }, 
                }, // hasUpgrade("E", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>VII 翡翠"
                        },
                        description(){
                                let a = "层级倍增基础鹰获取"
                                return a
                        },
                        cost(){
                                return new Decimal("1e623")
                        },
                        unlocked(){
                                return player.T.best.gte(254) || hasUpgrade("E", 22)
                        }, 
                }, // hasUpgrade("E", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>VIII 翡翠"
                        },
                        description(){
                                let a = "每10个F 13使F 11线性成本基础-0.001"
                                return a
                        },
                        cost(){
                                return new Decimal("1e2004")
                        },
                        unlocked(){
                                return player.T.best.gte(700) || hasUpgrade("E", 23)
                        }, 
                }, // hasUpgrade("E", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>IX 翡翠"
                        },
                        description(){
                                let a = "Dlareme等级使F 1X基础成本×1e60并可批量购买所有雀可购买项"
                                return a
                        },
                        cost(){
                                return new Decimal("1e6035")
                        },
                        unlocked(){
                                return player.T.best.gte(1849) || hasUpgrade("E", 24)
                        }, 
                }, // hasUpgrade("E", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>X 翡翠"
                        },
                        description(){
                                let a = "在1e7014/1e7102/2e7142/1e7161翡翠时，F 31线性成本基础÷1e480"
                                return a
                        },
                        cost(){
                                return new Decimal("1e7004")
                        },
                        unlocked(){
                                return hasUpgrade("E", 24)
                        }, 
                }, // hasUpgrade("E", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XI 翡翠"
                        },
                        description(){
                                return "F 21基础成本÷4e1303"
                        },
                        cost(){
                                return new Decimal("1e9597")
                        },
                        unlocked(){
                                return player.G.points.gte(23)
                        }, 
                }, // hasUpgrade("E", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XII 翡翠"
                        },
                        description(){
                                return "翡翠获取×10（减益后）且前500个Better Everything等级使Rank III基础-0.001"
                        },
                        cost(){
                                return new Decimal("1e12237")
                        },
                        unlocked(){
                                return player.T.points.gte(3460)
                        }, 
                }, // hasUpgrade("E", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XIII 翡翠"
                        },
                        description(){
                                return "移除Rank I成本公式中的+x项"
                        },
                        cost(){
                                return new Decimal("1e12976")
                        },
                        unlocked(){
                                return player.T.points.gte(3645)
                        }, 
                }, // hasUpgrade("E", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XIV 翡翠"
                        },
                        description(){
                                return "F 32赠送免费F 22等级但F 22基础值-0.0001"
                        },
                        cost(){
                                return new Decimal("5e17215")
                        },
                        unlocked(){
                                return player.T.points.gte(4600)
                        }, 
                }, // hasUpgrade("E", 34)
        },
        buyables: getLayerGeneralizedBuyableData("E", [
                        function(){
                                return hasUpgrade("E", 11) || player.E.tier.gte(2)
                        },
                        function(){
                                return hasUpgrade("E", 12) || player.E.tier.gte(6)
                        },
                        function(){
                                return hasUpgrade("E", 13) || player.E.tier.gte(12)
                        },
                        function(){
                                return hasUpgrade("E", 14) || player.E.tier.gte(18)
                        },
                        function(){
                                return hasUpgrade("E", 15) || player.E.tier.gte(38)
                        },
                        function(){
                                return hasUpgrade("E", 21) || (player.E.tier.gte(100) && player.E.tier.lt(150))
                        },
                        function(){
                                return hasUpgrade("E", 22)
                        },
                        function(){
                                return hasUpgrade("E", 23)
                        },
                        function(){
                                return hasUpgrade("E", 24)
                        },
                ]),
        milestones: {
                1: {
                        requirementDescription(){
                                return formatWhole(tmp.E.milestones[1].goal) + " 翡翠"
                        },
                        goal(){
                                let ret = new Decimal(1.28e13).div(Decimal.pow(2, player.T.points))
                                if (ret.lt(1)) return new Decimal(0)
                                return ret.ceil()
                        },
                        done(){
                                return player.E.points.gte(tmp.E.milestones[1].goal) && player.T.points.gte(7)
                        },
                        unlocked(){
                                return player.T.points.gte(7)
                        },
                        effectDescription(){
                                if (player.T.points.gte(44)) return "奖励：每个层级使翡翠获取×5，Sifter基础成本÷3，每个层级使Sifter线性成本基础-0.01"
                                if (player.T.points.gte(13)) return "奖励：每个层级使里程碑目标减半" + makePurple("且翡翠获取×5") + "。Sifter基础成本÷3。在10,000倍本里程碑目标时(" + format(tmp.E.milestones[1].goal.times(1e4)) + ")每个层级使Sifter线性成本基础-0.01"
                                if (player.T.points.gte(12)) return "奖励：每个层级使里程碑目标减半" + makePurple("且翡翠获取×5（仅解锁后至层级13）") + "。Sifter基础成本÷3。在10,000倍本里程碑目标时(" + format(tmp.E.milestones[1].goal.times(1e4)) + ")每个层级使Sifter线性成本基础-0.01"
                                if (player.T.points.gte(8))  return "奖励：每个层级使里程碑目标减半" + makePurple("且翡翠获取×2（层级12时×5，仅解锁后至层级13）") + "。Sifter基础成本÷3。在10,000倍本里程碑目标时(" + format(tmp.E.milestones[1].goal.times(1e4)) + ")每个层级使Sifter线性成本基础-0.01"
                                return "奖励：每个层级使里程碑目标减半。Sifter基础成本÷3。在10,000倍本里程碑目标时(" + format(tmp.E.milestones[1].goal.times(1e4)) + ")每个层级使Sifter线性成本基础-0.01"
                        },
                }, // hasMilestone("E", 1)
                2: {
                        requirementDescription(){
                                return formatWhole(tmp.E.milestones[2].goal) + " 翡翠"
                        },
                        goal(){
                                let ret = new Decimal(1e22).div(Decimal.pow(3, player.T.points.sub(15)))
                                if (ret.lt(1)) return new Decimal(0)
                                return ret.ceil()
                        },
                        done(){
                                return player.E.points.gte(tmp.E.milestones[2].goal) && player.T.points.gte(15)
                        },
                        unlocked(){
                                return player.T.points.gte(15)
                        },
                        effectDescription(){
                                return "奖励：每个层级使里程碑目标÷3，Lazy Tiers基础值÷2，鹰获取指数+1"
                        },
                }, // hasMilestone("E", 2)
                3: {
                        requirementDescription(){
                                return formatWhole(tmp.E.milestones[3].goal) + " 翡翠"
                        },
                        goal(){
                                let ret = new Decimal(1e63).div(Decimal.pow(10, player.T.points))
                                if (ret.lt(1)) return new Decimal(0)
                                return ret.ceil()
                        },
                        done(){
                                return player.E.points.gte(tmp.E.milestones[3].goal) && player.T.points.gte(23)
                        },
                        unlocked(){
                                return player.T.points.gte(23)
                        },
                         effectDescription(){
                                if (player.T.points.gte(26)) return "Reward: Subtract .5 effective Tiers and each Tier tenths the goal of the milestone and E 33 base. " + makePurple("At 1e8 times the goal of this milestone (" + format(tmp.E.milestones[3].goal.times(1e8)) + ") Lazy Tiers give free Faster Sifter levels.")
                                return "Reward: Subtract .5 effective Tiers and each Tier tenths the goal of the milestone and E 33 base."
                        },
                }, // hasMilestone("E", 3)
                4: {
                        requirementDescription(){
                                return formatWhole(tmp.E.milestones[4].goal) + " 翡翠"
                        },
                        goal(){
                                let ret = new Decimal(1e178).div(Decimal.pow(10, player.T.points.times(2.5).sub(22.5)))
                                if (ret.lt(1)) return new Decimal(0)
                                return ret.ceil()
                        },
                        done(){
                                return player.E.points.gte(tmp.E.milestones[4].goal) && player.T.points.gte(45)
                        },
                        unlocked(){
                                return player.T.points.gte(45)
                        },
                         effectDescription(){
                                if (player.shiftAlias) return "Tiers reduced goal by 10<sup>2.5</sup> (~316)."
                                if (player.T.points.gte(50)) return "Reward: Each E 33 subtracts .005 from the Miner linear cost base (max 200 times). " + makePurple("At 1e25 times the goal of this milestone (" + format(tmp.E.milestones[4].goal.times(1e25)) + ") each milestone adds .01 to Lazy Tiers' base.")
                                return "Reward: Each E 33 subtracts .005 from the Miner linear cost base (max 200 times)."
                        },
                }, // hasMilestone("E", 4)
                5: {
                        requirementDescription(){
                                return formatWhole(tmp.E.milestones[5].goal) + " 翡翠"
                        },
                        goal(){
                                let ret = new Decimal(1e127).div(Decimal.pow(1000, player.T.points.sub(64)))
                                if (ret.lt(1)) return new Decimal(0)
                                return ret.ceil()
                        },
                        done(){
                                return player.E.points.gte(tmp.E.milestones[5].goal) && player.T.points.gte(64)
                        },
                        unlocked(){
                                return player.T.points.gte(60)
                        },
                        effectDescription(){
                                if (player.shiftAlias) return "层级使目标÷1000倍"
                                return "奖励：E 32赠送免费E 23等级但翡翠获取÷1e600。在2e132翡翠时超过65的层级使Miner基础值+0.5%（最多27次）"
                        },
                }, // hasMilestone("E", 5)
                6: {
                        requirementDescription(){
                                return formatWhole(tmp.E.milestones[6].goal) + " 翡翠"
                        },
                        goal(){
                                let ret = new Decimal(1e217).div(Decimal.pow(1e20, player.T.points.sub(130).max(0))).div(player.T.points.sub(109).max(0).pow10())
                                if (ret.lt(1)) return new Decimal(0)
                                return ret.ceil()
                        },
                        done(){
                                return player.E.points.gte(tmp.E.milestones[6].goal) && player.T.points.gte(109)
                        },
                        unlocked(){
                                return player.T.points.gte(109)
                        },
                        effectDescription(){
                                if (player.shiftAlias) return "目标随层级超过109每级÷10，超过130每级÷1e20"
                                return "奖励：100级后每个层级使Filter基础值-0.01（150级后减半），E 32基础值+0.0002但增加Filter二次基础值"
                        },
                }, // hasMilestone("E", 6)
                7: {
                        requirementDescription(){
                                return "4e863 翡翠"
                        },
                        done(){
                                return player.E.points.gte("4e863")
                        },
                        unlocked(){
                                return player.T.points.gte(340)
                        },
                        effectDescription(){
                                return "奖励：层级使基础雀获取×1%（777级后减半）并使Sieve线性基础-（最多940）"
                        },
                }, // hasMilestone("E", 7)
                8: {
                        requirementDescription(){
                                return "3e1590 翡翠"
                        },
                        done(){
                                return player.E.points.gte("3e1590")
                        },
                        unlocked(){
                                return player.T.points.gte(555)
                        },
                        effectDescription(){
                                return "奖励：层级倍增鸭子批量数量，F 11等级使F 12基础值-0.0001并使线性成本基础-1（最多77,777次）"
                        },
                }, // hasMilestone("E", 8)
                9: {
                        requirementDescription(){
                                return "1e2685 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e2685")
                        },
                        unlocked(){
                                return hasMilestone("E", 8)
                        },
                        onComplete(){
                                player.E.buyables[31] = decimalZero
                        },
                        effectDescription(){
                                return "奖励：Better Everything等级使其线性成本基础÷1.13但Sieve线性成本基础+10"
                        },
                }, // hasMilestone("E", 9)
                10: {
                        requirementDescription(){
                                return "1e2951 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e2951")
                        },
                        unlocked(){
                                return hasMilestone("E", 9)
                        },
                        effectDescription(){
                                return "奖励：F 12基础成本×1e350并解锁Rank II。在4e44,444和1e48,000雀时基础雀获取-2%和4.5%"
                        },
                }, // hasMilestone("E", 10)
                11: {
                        requirementDescription(){
                                return "1e3015 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e3015")
                        },
                        unlocked(){
                                return hasMilestone("E", 10)
                        },
                        effectDescription(){
                                return "奖励：1000级后每个层级使Sieve线性成本基础-0.1（640级后÷5，1150级后÷2，1400级后÷2，1675级后÷5，2300级后÷5）但F 13线性成本基础为15e20"
                        },
                }, // hasMilestone("E", 11)
                12: {
                        requirementDescription(){
                                return "3e3065 翡翠"
                        },
                        done(){
                                return player.E.points.gte("3e3065")
                        },
                        unlocked(){
                                return hasMilestone("E", 11)
                        },
                        effectDescription(){
                                return "奖励：E 12赠送免费E 11等级但基础雀获取-7.7%"
                        },
                }, // hasMilestone("E", 12)
                13: {
                        requirementDescription(){
                                return "1e3122 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e3122")
                        },
                        unlocked(){
                                return hasMilestone("E", 12)
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：Rank II指数为^2，层级可购买项成本为x<sup>2</sup>，雀可购买项基础成本×" + makeBlue("1e80") + "，F 21线性成本基础降至1.8e308"
                                return "奖励：Rank II指数为^2，层级可购买项成本为x<sup>2</sup>，雀可购买项基础成本×1e88，F 21线性成本基础降至1.8e308"
                        },
                }, // hasMilestone("E", 13)
                14: {
                        requirementDescription(){
                                return "1e3215 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e3215")
                        },
                        unlocked(){
                                return hasMilestone("E", 13)
                        },
                        effectDescription(){
                                return "奖励：1063级后每个层级（最多100）使Sifter基础×层级/1000但F 12基础成本×1e414。在1e3233翡翠时前340个F 21等级使其线性成本基础÷2（175/200/300级后效果减半）"
                        },
                }, // hasMilestone("E", 14)
                15: {
                        requirementDescription(){
                                return "1e3390 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e3390")
                        },
                        unlocked(){
                                return hasMilestone("E", 14)
                        },
                        onComplete(){
                                player.E.buyables[32] = decimalZero
                        },
                        effectDescription(){
                                return "奖励：Better Everything/F 12基础成本×1e600/1e120，1095级后每个层级使Miner基础+0.5%（最多50次）"
                        },
                }, // hasMilestone("E", 15)
                16: {
                        requirementDescription(){
                                return "1e4182 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e4182")
                        },
                        unlocked(){
                                return hasMilestone("E", 15)
                        },
                        effectDescription(){
                                if (player.f.points.gte("1e93687")) return "奖励：在<b>1e92,933</b>/<b>1e93,279</b>/<b>1e93,687</b>/1e94,153雀时F 22线性成本基础÷<b>2.3e56</b>/<b>4e54</b>/<b>6.6e43</b>/1.2e23"
                                if (player.f.points.gte("1e93279")) return "奖励：在<b>1e92,933</b>/<b>1e93,279</b>/1e93,687雀时F 22线性成本基础÷<b>2.3e56</b>/<b>4e54</b>/6.6e43"
                                if (player.f.points.gte("1e92933")) return "奖励：在<b>1e92,933</b>/1e93,279雀时F 22线性成本基础÷<b>2.3e56</b>/4e54"
                                return "奖励：在1e92,933雀时F 22线性成本基础÷2.3e56"
                        },
                }, // hasMilestone("E", 16)
                17: {
                        requirementDescription(){
                                return "1e4683 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e4683")
                        },
                        unlocked(){
                                return hasMilestone("E", 16)
                        },
                        exp(){
                                if (!hasMilestone("E", 17)) return 1
                                if (player.f.points.gte("1e109252")) return 10
                                if (player.f.points.gte("1e108786")) return 9
                                if (player.f.points.gte("1e108350")) return 8
                                if (player.f.points.gte("1e108251")) return 7
                                if (player.f.points.gte("1e108193")) return 6
                                if (player.f.points.gte("1e108168")) return 5
                                if (player.f.points.gte("1e107666")) return 4
                                if (player.f.points.gte("1e107450")) return 3
                                if (player.f.points.gte("1e107392")) return 2
                                return 1
                        },
                        effectDescription(){
                                let f = function(a){
                                        if (player.f.points.gte(a)) return "<b>" + format(a) + "</b>"
                                        return format(a)
                                }
                                return "奖励：不再获得免费雀。雀自动购买速度×2。在" 
                                        + f(new Decimal("1e107,392")) + "、" + f(new Decimal("1e107,450")) + "、" + f(new Decimal("1e107,666")) 

                                        + "、" + f(new Decimal("1e108168")) + "、" + f(new Decimal("1e108193")) + "、" + f(new Decimal("1e108251")) 

                                        + "、" + f(new Decimal("1e108350")) + "、" + f(new Decimal("1e108786")) + "和" + f(new Decimal("1e109252"))

                                        + "雀时F 22再次影响F 2X可购买项（注：F 22最多影响4次）"
                        },
                }, // hasMilestone("E", 17)
                18: {
                        requirementDescription(){
                                return "1e4793 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e4793")
                        },
                        unlocked(){
                                return hasMilestone("E", 17)
                        },
                        effectDescription(){
                                return "奖励：F 23影响E 11且（层级-1562）/100加到雀获取指数（层级>1500时）。在1e114,029雀时F 22线性成本基础÷11111，在3.894e4983时增至15432"
                        },
                }, // hasMilestone("E", 18)
                19: {
                        requirementDescription(){
                                return "1e5083 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e5083")
                        },
                        unlocked(){
                                return hasMilestone("E", 18)
                        },
                        effectDescription(){
                                return "奖励：F 22线性成本基础每超过70级÷2，F 23线性成本基础每超过70级÷2（最多811和140次）。在1e5147/1e5164/1e5186翡翠时1600/1607/1615级后每个层级使雀获取指数+0.01"
                        },
                }, // hasMilestone("E", 19)
                20: {
                        requirementDescription(){
                                return "1e5591 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e5591")
                        },
                        unlocked(){
                                return hasMilestone("E", 19)
                        },
                        effectDescription(){
                                let r = "奖励：F 1X基础成本×1e2850并平方根，F 22赠送免费F 21等级"
                                if (player.E.points.gte("1e5600")) r += "。在1e5653/NEXT1翡翠时F 22基础÷2/NEXT2。在5e164,970和1e174,460雀时Faster Sifter基础×3"
                                if (player.E.points.gte("1e5700")) r = r.replace("NEXT1", "1e5718/NEXT1").replace("NEXT2", "3/NEXT2")
                                if (player.E.points.gte("1e5750")) r = r.replace("NEXT1", "1e5773/NEXT1").replace("NEXT2", "4/NEXT2")
                                if (player.E.points.gte("1e5950")) r = r.replace("NEXT1", "1e6005/NEXT1").replace("NEXT2", "5/NEXT2")
                                if (player.E.points.gte("1e6010")) r = r.replace("NEXT1", "1e6032/NEXT1").replace("NEXT2", "6/NEXT2")
                                if (player.E.points.gte("1e6033")) r = r.replace("NEXT1", "1e6035/NEXT1").replace("NEXT2", "7/NEXT2")
                                if (player.E.points.gte("1e7000")) r = r.replace("NEXT1", "1e7102/NEXT1").replace("NEXT2", "8/NEXT2")
                                if (player.E.points.gte("1e7110")) r = r.replace("NEXT1", "1e7159/NEXT1").replace("NEXT2", "9/NEXT2")
                                if (player.E.points.gte("1e7110")) r = r.replace("NEXT1", "1e7160/NEXT1").replace("NEXT2", "10/NEXT2")
                                return r.replace(" / NEXT1", "").replace(" / NEXT2", "")
                        },
                }, // hasMilestone("E", 20)
                21: {
                        requirementDescription(){
                                return "1e5999 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e5999")
                        },
                        unlocked(){
                                return hasMilestone("E", 20)
                        },
                        onComplete(){
                                player.E.buyables[32] = player.E.buyables[32].sub(5).max(0)
                        },
                        effectDescription(){
                                return "奖励：Better Everything线性成本基础×7。在1e191,769雀时雀获取指数+2但F 12基础成本×1e2480" 
                        },
                }, // hasMilestone("E", 21)
                22: {
                        requirementDescription(){
                                return "1e13,146 翡翠"
                        },
                        done(){
                                return player.E.points.gte("1e13146")
                        },
                        unlocked(){
                                return hasMilestone("E", 21)
                        },
                        effectDescription(){
                                return "奖励：F 22按等级影响F 3X可购买项但F 21/F 22基础成本×1e15,001且雀里程碑7延后400级" 
                        },
                }, // hasMilestone("E", 22)
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                return "当前层级：" + formatWhole(player.E.tier) + "。使翡翠" + romanize(player.E.tier) + "获取开" + format(tmp.E.getGainExp.pow(-1)) + "次方根"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (player.shiftAlias) return "减益前翡翠获取：" + format(tmp.E.getGainMultPre)
                                                return "当前获取：" + format(tmp.E.getResetGain) + " 翡翠" + romanize(player.E.tier) + "/秒"
                                        }
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                return "当前层级：" + formatWhole(player.E.tier) + "。使翡翠" + romanize(player.E.tier) + "获取开" + format(tmp.E.getGainExp.pow(-1)) + "次方根"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (player.shiftAlias) return "减益前翡翠获取：" + format(tmp.E.getGainMultPre)
                                                return "当前获取：" + format(tmp.E.getResetGain) + " 翡翠" + romanize(player.E.tier) + "/秒"
                                        }
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("E", 11) || player.T.best.gte(2)
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "当前层级：" + formatWhole(player.E.tier) + "。使翡翠" + romanize(player.E.tier) + "获取开" + format(tmp.E.getGainExp.pow(-1)) + "次方根"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (player.shiftAlias) return "减益前翡翠获取：" + format(tmp.E.getGainMultPre)
                                                return "当前获取：" + format(tmp.E.getResetGain) + " 翡翠" + romanize(player.E.tier) + "/秒"
                                        }
                                ],
                                "milestones"],
                        unlocked(){
                                return player.T.points.gte(7)
                        },
                },
                "信息": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "基础翡翠获取受以下货币影响：<br> log10(数量+10)<sup>.1</sup>（上限1.80e308）"+br2
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                let init = "按权重计算"
                                                let a = "当前权重：<br> a: 0.001<br> b: 0.002 <br> c: 0.005 <br> d: 0.010 <br> e: 0.020 "
                                                if (player.G.unlocked) a += "<br> G: 100"
                                                return init + br + a + br2 + "当前效果：" + format(tmp.E.getInitialGain)
                                        }
                                ],
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
        doReset(layer){
                let data = player.E 

                data.points = decimalZero
                data.best = decimalZero
                let toSub = hasMilestone("e", 93) ? 20 : 50
                if (hasMilestone("T", 12)) toSub = Math.max(Math.min(toSub, 85-player.f.times),0)
                let onlySubtract = hasMilestone("T", 12) && !getsReset("e", layer)
                for (i in data.buyables) {
                        data.buyables[i] = onlySubtract ? data.buyables[i].sub(toSub).max(0) : decimalZero
                }
                if (player.T.points.lt(100) && !hasMilestone("f", 4)) data.buyables[23] = decimalZero

                let keepupgrades = hasMilestone("T", 12) ? [11,12,13,14,15] : []
                if (player.T.points.gte(100)) keepupgrades.push(21)
                if (hasMilestone("f", 4)) keepupgrades = keepupgrades.concat(data.upgrades.slice(0, player.f.times))
                data.upgrades = filter(data.upgrades, keepupgrades)

                if (layer != "T") {
                        data.milestones = []
                } else if (!hasMilestone("f", 5)) {
                        let keep = []
                        for (j in data.milestones){
                                i = data.milestones[j]
                                if (tmp.E.milestones[i].goal.lt(1)) {
                                        keep.push(i)
                                }
                        }
                        data.milestones = filter(data.milestones, keep)
                }

                tmp.E.getResetGain = decimalZero
                tmp.E.getGainMultPre = decimalOne
                CURRENT_BUYABLE_EFFECTS["E11"] = decimalOne

                data.tier = player.T.points
                data.time = 0
        }
})

addLayer("T", {
        name: "层级", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "Ti", // 显示在层节点上，默认为首字母大写的ID
        position: 0, // 行内水平位置，默认按ID字母排序
        row: 4, // 层在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalOne,
                best: decimalOne,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                tier: decimalOne,
                ranks: decimalZero,
                totalranks: decimalZero,
        }},
        color: "#333333",
        branches: ["E"],
        requires: new Decimal("1e6"), // 可以是考虑需求增长的函数
        resource: "层级", // 声望货币名称
        baseResource: "翡翠", // 声望基础资源名称
        baseAmount() {return player.E.points.floor()}, // 获取当前基础资源量
        type: "static", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        base(){
                let ret = new Decimal(100).max(player.T.points)
                return ret
        },
        gainMult(){
                return new Decimal(hasUpgrade("T", 14) ? .000001 : .01) // 10^-6
        },
        exponent(){
                let ret = new Decimal(1000)//.max(player.T.points)
                return ret.div(1000)
        },
        prestigeButtonText(){
                if (player.shiftAlias) {
                        let init = hasUpgrade("T", 14) ? "" : "10,000 * "
                        if (player.T.points.gte(101)) return init + "层级<sup>层级</sup>"
                        return init + "100<sup>层级</sup>"
                }
                return "重置获得一个层级<br>需求: " + format(player.E.points) + " / " + format(tmp.T.nextAtDisp)
        },
        update(diff){
                let data = player.T

                if (player.E.best.gt("1e6")) data.unlocked = true
                if (!data.unlocked) return

                player.E.tier = data.points

                if (data.points.eq(0)) data.points = decimalOne
                data.best = data.best.max(data.points)

                if (hasMilestone("f", 5) || hasMilestone("G", 2)) {
                        handleGeneralizedBuyableAutobuy(diff, "E")
                } else if (hasUpgrade("T", 11) && (player.T.points.lt(player.T.best) || player.f.unlocked)) {
                        handleGeneralizedBuyableAutobuy(diff, "E")
                }
                
                data.time += diff
        },
        layerShown(){return player.E.best.gte(1e5) || player.T.unlocked},
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>I 层级"
                        },
                        description(){
                                if (player.shiftAlias && player.f.unlocked) return "雀解锁后移除限制！" + (hasMilestone("f", 3) ? " 雀里程碑3使成本降为1。" : "")
                                let a = "自动购买翡翠可购买项（当层级低于最佳时），翡翠可购买项免费，并为Faster Sifter基础值+0.02"
                                if (player.f.unlocked) a = a.replace("（当层级低于最佳时）", "")
                                return a
                        },
                        cost:() => new Decimal(hasMilestone("f", 3) ? 1 : 16),
                        unlocked(){
                                if (hasUpgrade("T", 11) || player.T.points.gte(17)) return true 
                                return player.T.points.gte(16) && player.E.points.gte(1e20)
                        }, 
                }, // hasUpgrade("T", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>II 层级"
                        },
                        description(){
                                if (player.shiftAlias && player.f.unlocked) return "雀解锁后成本降为1！"
                                let a = "E 31等级减少Lazy Tiers线性成本基础（最多990次），翡翠可购买项批量购买并提速[升级数]倍"
                                return a
                        },
                        cost:() => new Decimal(player.f.unlocked ? 1 : 28),
                        unlocked(){
                                if (hasUpgrade("T", 12) || player.T.points.gte(29)) return true 
                                return player.T.points.gte(28) && player.E.points.gte(player.f.unlocked ? 1e41 : 1e50)
                        }, 
                }, // hasUpgrade("T", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>III 层级"
                        },
                        description(){
                                let a = "所有后续升级成本为1层级。每个超过31的层级为E 11基础值+0.0001"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 13) || player.T.points.gte(33)) return true 
                                return player.T.points.gte(32) && player.E.points.gte(1e62)
                        }, 
                }, // hasUpgrade("T", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>IV 层级"
                        },
                        description(){
                                let a = "E 31赠送免费E 22等级并将层级目标÷10,000，但鹰获取÷1e3500"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 14) || player.T.points.gte(53)) return true 
                                return player.T.points.gte(52) && player.E.points.gte(1e103)
                        }, 
                }, // hasUpgrade("T", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>V 层级"
                        },
                        description(){
                                let a = "60到79层级为Tired Tiers基础值+0.005"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 15) || player.T.points.gte(62)) return true 
                                return player.T.points.gte(61) && player.E.points.gte(1e119)
                        }, 
                }, // hasUpgrade("T", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>VI 层级"
                        },
                        description(){
                                let a = "超过100的层级将Filter基础成本÷1e15（在1e206翡翠时提升至÷1e18）"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 21) || player.T.points.gte(102)) return true 
                                return player.T.points.gte(101) && player.E.points.gte(5e198)
                        }, 
                }, // hasUpgrade("T", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>VII 层级"
                        },
                        description(){
                                let a = "超过112的层级使Lazy Tier二次基础-0.002（最多30次）"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 22) || player.T.points.gte(115)) return true 
                                return player.T.points.gte(114) && player.E.points.gte(1e232)
                        }, 
                }, // hasUpgrade("T", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>VIII 层级"
                        },
                        description(){
                                let a = "超过580的层级使翡翠获取×2^雀挑战完成数²，且在10次雀挑战完成时解除翡翠获取上限"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 23) || player.T.points.gte(582)) return true 
                                return player.T.points.gte(581) && player.E.points.gte("8e1604")
                        }, 
                }, // hasUpgrade("T", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>IX 层级"
                        },
                        description(){
                                let a = "Better Everything赠送免费Lazy Tier等级但Lazy Tier不再赠送免费等级且基础值-0.03"
                                return a
                        },
                        cost: new Decimal(1),
                        unlocked(){
                                if (hasUpgrade("T", 24) || player.T.points.gte(833)) return true 
                                return player.T.points.gte(833) && player.E.points.gte("2e2431")
                        }, 
                }, // hasUpgrade("T", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>X 层级"
                        },
                        description(){
                                let a = "解锁一个可购买项并使F 12基础成本×1e850"
                                return a
                        },
                        cost: new Decimal(927),
                        unlocked(){
                                return hasUpgrade("T", 24) || hasUpgrade("T", 25)
                        }, 
                }, // hasUpgrade("T", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XI 层级"
                        },
                        description(){
                                let a = "F 23赠送免费F 21等级但雀获取÷1e200，且在1532层级时E 31赠送免费E 23等级"
                                return a
                        },
                        cost: new Decimal(1531),
                        unlocked(){
                                return (hasUpgrade("T", 25) && player.f.best.gte("e110570")) || hasUpgrade("T", 31)
                        }, 
                }, // hasUpgrade("T", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XII 层级"
                        },
                        description(){
                                let a = "F 13基础成本×1e791并为Faster Sifter基础值+黄金比例（约1.618）"
                                return a
                        },
                        onPurchase(){
                                player.f.buyables[13] = player.f.buyables[13].sub(50).max(0)
                        },
                        cost: new Decimal(1618),
                        unlocked(){
                                return (hasUpgrade("T", 31) && player.E.best.gte("3e5190")) || hasUpgrade("T", 32)
                        }, 
                }, // hasUpgrade("T", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XIII 层级"
                        },
                        description(){
                                let a = "雀自动购买器速度×2。Rank II指数为1.8且每F 23等级超过77使F 11基础值+0.01"
                                return a
                        },
                        cost: new Decimal(1647),
                        unlocked(){
                                return hasUpgrade("T", 32) || hasUpgrade("T", 33)
                        }, 
                }, // hasUpgrade("T", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XIV 层级"
                        },
                        description(){
                                let a = "F 23赠送免费F 13等级但F 1X基础成本×1e380"
                                return a
                        },
                        cost: new Decimal(1671),
                        unlocked(){
                                return hasUpgrade("T", 33) || hasUpgrade("T", 34)
                        }, 
                }, // hasUpgrade("T", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XV 层级"
                        },
                        description(){
                                let a = "第十个Dlareme二次成本基础且在1e7289翡翠时Faster Sifter基础值^1.234"
                                return a
                        },
                        cost: new Decimal(2171),
                        unlocked(){
                                return hasUpgrade("T", 34)
                        }, 
                }, // hasUpgrade("T", 35)
                41: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XVI 层级"
                        },
                        description(){
                                let a = "第三个F 22线性成本基础。在1e9096翡翠时重新应用此效果。在1e9097翡翠时重新应用此升级3次。"
                                return a
                        },
                        cost: new Decimal(2635),
                        unlocked(){
                                return hasUpgrade("T", 35)
                        }, 
                }, // hasUpgrade("T", 41)
                42: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XVII 层级"
                        },
                        description(){
                                let a = "Lazy Tiers成本基础-0.0001且F 22线性成本基础÷2.5，但在Grade 77时Tired Tiers成本基础为1.15"
                                return a
                        },
                        cost: new Decimal(5036),
                        unlocked(){
                                return hasUpgrade("T", 41)
                        }, 
                }, // hasUpgrade("T", 42)
                43: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>XVIII 层级"
                        },
                        description(){
                                let a = "F 22基础÷200"
                                return a
                        },
                        cost: new Decimal(5603),
                        unlocked(){
                                return hasUpgrade("T", 42)
                        }, 
                }, // hasUpgrade("T", 43)
        },
        milestones: {
                1: {
                        requirementDescription(){
                                return "层级2"
                        },
                        done(){
                                return player.T.points.gte(2)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每个层级使翡翠获取×2，基础鹰获取+2%。每秒自动购买一个鹰可购买项。"
                        },
                }, // hasMilestone("T", 1)
                2: {
                        requirementDescription(){
                                return "1亿翡翠 VI"
                        },
                        done(){
                                return player.T.points.gte(7) || (player.T.points.gte(6) && player.E.points.gte(1e8) && player.E.points.neq(1e14))
                        },
                        unlocked(){
                                return player.T.points.gte(6) || player.f.unlocked
                        },
                        effectDescription(){
                                return "奖励：每个里程碑使翡翠获取×3，基础鹰获取+2%。批量购买[里程碑数]个鹰可购买项。"
                        },
                }, // hasMilestone("T", 2)
                3: {
                        requirementDescription(){
                                return "1亿翡翠 VIII"
                        },
                        done(){
                                return player.T.points.gte(9) || (player.T.points.gte(8) && player.E.points.gte(1e8) && player.E.points.neq(1e18))
                        },
                        unlocked(){
                                return player.T.points.gte(8) || player.f.unlocked
                        },
                        effectDescription(){
                                if (player.T.points.gte(25)) return "奖励：每个E 32使翡翠获取×4（最多1500次）。最佳翡翠数倍增每个里程碑的鹰获取。"
                                return "奖励：21级后的每个E 32（25级时移除）使翡翠获取×4。最佳翡翠数倍增每个里程碑的鹰获取。"
                        },
                }, // hasMilestone("T", 3)
                4: {
                        requirementDescription(){
                                return "1e13翡翠 X"
                        },
                        done(){
                                return player.T.points.gte(11) || (player.T.points.gte(10) && player.E.points.gte(1e13) && player.E.points.neq(1e22))
                        },
                        unlocked(){
                                return player.T.points.gte(10) || player.f.unlocked
                        },
                        effectDescription(){
                                if (player.T.points.gte(24)) return "奖励：翡翠数量级使翡翠获取×6。Faster Sifter基础成本÷10但E 32基础成本×1e139。"
                                return "奖励：1e15后的每个数量级（24级时移除）使翡翠获取×6。Faster Sifter基础成本÷10但E 32基础成本×1e139。"
                        },
                }, // hasMilestone("T", 4)
                5: {
                        requirementDescription(){
                                return "1e26翡翠 XIV"
                        },
                        done(){
                                return player.T.points.gte(15) || (player.T.points.gte(14) && player.E.points.gte(1e26) && player.E.points.neq(1e30))
                        },
                        unlocked(){
                                return player.T.points.gte(14) || player.f.unlocked
                        },
                        effectDescription(){
                                return "奖励：Lazy Tiers赠送免费Sifter等级。"
                        },
                }, // hasMilestone("T", 5)
                6: {
                        requirementDescription(){
                                return "1e27翡翠 XVIII"
                        },
                        done(){
                                return player.T.points.gte(19) || (player.T.points.gte(18) && player.E.points.gte(1e27) && player.E.points.neq(1e38))
                        },
                        unlocked(){
                                return player.T.points.gte(18) || player.f.unlocked
                        },
                        effectDescription(){
                                return "奖励：减弱层级对翡翠获取的削减效果（超过16级时）。"
                        },
                }, // hasMilestone("T", 6)
                7: {
                        requirementDescription(){
                                return "1e30翡翠 XIX"
                        },
                        done(){
                                return player.T.points.gte(20) || (player.T.points.gte(19) && player.E.points.gte(1e30) && player.E.points.neq(1e40))
                        },
                        unlocked(){
                                return player.T.points.gte(19) || player.f.unlocked
                        },
                        effectDescription(){
                                if (player.G.unlocked) return "奖励：层级减少Faster Sifter线性成本基础（最多92次）并使E 32线性成本基础÷4。" + makeBlue(" 自动购买层级并批量购买2倍翡翠可购买项。")
                                return "奖励：层级减少Faster Sifter线性成本基础（最多92次）并使E 32线性成本基础÷4。"
                        },
                }, // hasMilestone("T", 7)
                8: {
                        requirementDescription(){
                                return "1e23翡翠 XXI"
                        },
                        done(){
                                return player.T.points.gte(22) || (player.T.points.gte(21) && player.E.points.gte(1e23) && player.E.points.neq(1e44))
                        },
                        unlocked(){
                                return player.T.points.gte(21) || player.f.unlocked
                        },
                        effectDescription(){
                                if (hasMilestone("f", 8) && !player.controlAlias) {
                                        if (player.shiftAlias) return "由雀里程碑8增强。"
                                        return "奖励：翡翠可购买项不再赠送免费普通可购买项，E 21赠送免费E 11等级并使鹰和基础鸭子获取×1e5000。"
                                }
                                return "奖励：翡翠可购买项不再赠送免费普通可购买项，E 21赠送免费E 11等级但鹰获取÷1e2650。"
                        },
                }, // hasMilestone("T", 8)
                9: {
                        requirementDescription(){
                                return "1e39翡翠 XXVII"
                        },
                        done(){
                                return player.T.points.gte(28) || (player.T.points.gte(27) && player.E.points.gte(1e39) && player.E.points.neq(1e56))
                        },
                        unlocked(){
                                return player.T.points.gte(27) || player.f.unlocked
                        },
                        effectDescription(){
                                if (player.T.points.gte(28)) return "奖励：每个里程碑使翡翠获取×层级" + makePurple("*升级数<sup>.7</sup>") + "。"
                                return "奖励：每个里程碑使翡翠获取×层级。"
                        },
                }, // hasMilestone("T", 9)
                10: {
                        requirementDescription(){
                                return "1e50翡翠 XXIX"
                        },
                        done(){
                                return player.T.points.gte(30) || (player.T.points.gte(29) && player.E.points.gte(1e50) && player.E.points.neq(1e60))
                        },
                        unlocked(){
                                return player.T.points.gte(29) || player.f.unlocked
                        },
                        effectDescription(){
                                if (player.f.unlocked) return "奖励：每个层级使Lazy Tiers二次成本基础-0.01（最多84次），E 11" + makePurple("和E 12") + "赠送免费D 33等级并倍增翡翠获取。"
                                return "奖励：每个层级使Lazy Tiers二次成本基础-0.01（最多84次），在1e57翡翠XXIX时E 11赠送免费D 33等级并倍增翡翠获取。"
                        },
                }, // hasMilestone("T", 10)
                11: {
                        requirementDescription(){
                                return "30层级"
                        },
                        done(){
                                return player.T.points.gte(30)
                        },
                        unlocked(){
                                return player.T.points.gte(29) || player.f.unlocked
                        },
                        effectDescription(){
                                return "奖励：超过29的每个层级使Miner效果基础+1。"
                        },
                }, // hasMilestone("T", 11)
                12: {
                        requirementDescription(){
                                if (player.f.times > 33) return "免费！"
                                return player.f.unlocked ? (Math.max(2, 35-player.f.times) + "层级") : "54层级"
                        },
                        done(){
                                return player.T.points.gte(player.f.unlocked ? (35-player.f.times) : 54)
                        },
                        unlocked(){
                                return hasMilestone("T", 11) || player.f.unlocked
                        },
                        effectDescription(){
                                if (player.shiftAlias && player.f.unlocked) {
                                        if (player.f.times > 33) return "注意：每次雀重置保留更多可购买项。"
                                        return "注意：每次雀重置使成本减少1层级。"
                                }
                                if (player.f.unlocked && player.f.times > 84) {
                                        return "奖励：保留所有翡翠可购买项和前五个翡翠升级。Miner基础成本每超过53的层级-1000。"
                                }
                                if (player.f.unlocked && player.f.times > 33) {
                                        return "奖励：保留除" + Math.max(85 - player.f.times, 0) + "个外的所有翡翠可购买项和前五个翡翠升级。Miner基础成本每超过53的层级-1000。"
                                }
                                return "奖励：保留除50个外的所有翡翠可购买项和前五个翡翠升级。Miner基础成本每超过53的层级-1000。"
                        },
                }, // hasMilestone("T", 12)
                13: {
                        requirementDescription(){
                                return "5e144翡翠"
                        },
                        done(){
                                return player.E.points.gte(5e144)
                        },
                        unlocked(){
                                return hasMilestone("T", 12) || player.f.unlocked
                        },
                        effectDescription(){
                                return "奖励：每个层级使河狸和短吻鳄可购买项上限和批量数量×2。在1e147翡翠时基础翡翠获取也倍增减益后的翡翠获取。"
                        },
                }, // hasMilestone("T", 13)
                14: {
                        requirementDescription(){
                                return "1e200翡翠 CIV"
                        },
                        done(){
                                return player.E.points.gte(1e200) && player.T.points.gte(104) && player.E.points.max(1).log(103).sub(103).abs().gt(.0000000001)
                        },
                        unlocked(){
                                return hasMilestone("T", 13) || player.f.unlocked
                        },
                        effectDescription(){
                                return "奖励：超过104的层级使Filter基础值+0.01但翡翠获取÷1e80（在107级时增至÷1e95）且E 33基础值提升至sqrt(层级)次方。"
                        },
                }, // hasMilestone("T", 14)
                15: {
                        requirementDescription(){
                                return "8e676翡翠"
                        },
                        done(){
                                return player.E.points.gte("8e676")
                        },
                        unlocked(){
                                return hasMilestone("T", 14)
                        },
                        onComplete(){
                                player.E.buyables[31] = decimalZero
                        },
                        effectDescription(){
                                return "奖励：Sieve赠送免费Filter等级但立方其线性成本基础。略微削弱Active Tiers削弱公式。"
                        },
                }, // hasMilestone("T", 15)
                16: {
                        requirementDescription(){
                                return "561层级"
                        },
                        done(){
                                return player.T.points.gte("561")
                        },
                        unlocked(){
                                return hasMilestone("T", 15)
                        },
                        effectDescription(){
                                return "奖励：Tired Tiers不再赠送免费等级且E 13赠送免费E 12等级。"
                        },
                }, // hasMilestone("T", 16)
                17: {
                        requirementDescription(){
                                return "786层级"
                        },
                        done(){
                                return player.T.points.gte("786")
                        },
                        unlocked(){
                                return hasMilestone("T", 16)
                        },
                        effectDescription(){
                                if (player.G.unlocked )return "奖励：层级使Better Everything二次成本基础-0.0001且超过785的层级使基础成本÷1e15" + makeBlue("且雀自动购买器批量×2") + "。"
                                return "奖励：层级使Better Everything二次成本基础-0.0001且超过785的层级使基础成本÷1e15。"
                        },
                }, // hasMilestone("T", 17)
                18: {
                        requirementDescription(){
                                return "1206层级"
                        },
                        done(){
                                return player.T.points.gte("1206")
                        },
                        unlocked(){
                                return hasMilestone("T", 17)
                        },
                        effectDescription(){
                                return "奖励：F 21线性基础÷1e100但其基础成本×1e13,000。Agile和Speedy效果×5。"
                        },
                }, // hasMilestone("T", 18)
                19: {
                        requirementDescription(){
                                return "1234层级"
                        },
                        done(){
                                return player.T.points.gte("1234")
                        },
                        unlocked(){
                                return hasMilestone("T", 18)
                        },
                        effectDescription(){
                                return "奖励：F 13赠送免费F 11等级但雀获取÷1e8000且F 12基础成本×1e1111。超过1000的层级使Lazy Tiers二次基础-0.0001（直到1000级，832级后每隔一个）。"
                        },
                }, // hasMilestone("T", 19)
                20: {
                        requirementDescription(){
                                return "1310层级"
                        },
                        done(){
                                return player.T.points.gte("1310")
                        },
                        unlocked(){
                                return hasMilestone("T", 19)
                        },
                        effectDescription(){
                                return "奖励：每超过4150的F 13使其线性成本基础÷1.001（13594/17700/34000次后每隔一个/四个/八个）并使雀效果指数×3（在1e92,536雀时再次×3）。F 22线性成本基础÷2.5e5。"
                        },
                }, // hasMilestone("T", 20)
        },
        buyables: {
                rows: 3,
                columns: 3,
                costFormula(t){
                        if (hasMilestone("E", 13)) return Decimal.pow(t, 2).round()
                        return Decimal.pow(2, t).round()
                },
                costDisplayFormula(){
                        if (hasMilestone("E", 13)) return "x<sup>2</sup>"
                        return "2<sup>x</sup>"
                },
                11: {
                        title: "快速",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 11) + "</b><br>"
                                        let eff = "<b><h2>效果</h2>: " + format(tmp.T.buyables[11].effect.times(1000), 4) + "/1000 所有翡翠可购买项基础</b>" + br
                                        let cost = "<b><h2>成本</h2>: " + formatWhole(tmp.T.buyables[11].cost) + " 等级</b><br>"
        
                                        return br + amt + eff + cost + "按住shift查看详情"
                                }
                                let effForm = "<b><h2>效果公式</h2>:<br>" + format(tmp.T.buyables[11].base.times(1000), 4) + "*x/1000</b>" + br
                                let costForm = "<b><h2>成本公式</h2>:<br>" + tmp.T.buyables.costDisplayFormula() + "</b>" + br
                                if (hasUpgrade("E", 24)) costForm += br + "注意：不影响Dlamere" + br
                                return br + effForm + costForm
                        },
                        base(){
                                let ret = new Decimal(10**-5)
                                if (hasUpgrade("f", 21)) ret = ret.times(10)
                                if (hasUpgrade("f", 24)) ret = ret.times(player.T.buyables[12].div(20).plus(1))
                                return ret
                        },
                        effect(){
                                return tmp.T.buyables[11].base.times(player.T.buyables[11])
                        },
                        canAfford(){
                                return player.T.ranks.gte(tmp.T.buyables[11].cost)
                        },
                        cost(){
                                return layers.T.buyables.costFormula(player.T.buyables[11])
                        },
                        buy(){
                                if (!layers.T.buyables[11].canAfford()) return 
                                player.T.ranks = player.T.ranks.sub(tmp.T.buyables[11].cost)
                                player.T.buyables[11] = player.T.buyables[11].plus(1)
                        },
                        unlocked(){
                                return true
                        },
                },
                12: {
                        title: "高速",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 12) + "</b><br>"
                                        let eff = "<b><h2>效果</h2>: " + format(tmp.T.buyables[12].effect.times(1000), 4) + "/1000 F 11基础</b>" + br
                                        if (hasUpgrade("f", 25)) eff = eff.replace("F 11基础", "F 11和F 13基础")
                                        let cost = "<b><h2>成本</h2>: " + formatWhole(tmp.T.buyables[12].cost) + " 等级</b><br>"
        
                                        return br + amt + eff + cost + "按住shift查看详情"
                                }
                                let effForm = "<b><h2>效果公式</h2>:<br>" + format(tmp.T.buyables[12].base.times(1000), 4) + "*x/1000</b>" + br
                                let costForm = "<b><h2>成本公式</h2>:<br>" + tmp.T.buyables.costDisplayFormula() + "</b>" + br
                                return br + effForm + costForm
                        },
                        base(){
                                let ret = new Decimal(.00002)
                                if (hasUpgrade("f", 21)) ret = ret.times(5)
                                if (hasUpgrade("f", 24)) ret = ret.times(player.T.buyables[11].div(20).plus(1))
                                return ret
                        },
                        effect(){
                                return tmp.T.buyables[12].base.times(player.T.buyables[12])
                        },
                        canAfford(){
                                return player.T.ranks.gte(tmp.T.buyables[12].cost)
                        },
                        cost(){
                                return layers.T.buyables.costFormula(player.T.buyables[12])
                        },
                        buy(){
                                if (!layers.T.buyables[12].canAfford()) return 
                                player.T.ranks = player.T.ranks.sub(tmp.T.buyables[12].cost)
                                player.T.buyables[12] = player.T.buyables[12].plus(1)
                        },
                        unlocked(){
                                return true
                        },
                },
                21: {
                        title: "极速",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 21) + "</b><br>"
                                        let eff = "<b><h2>效果</h2>: -" + format(tmp.T.buyables[21].effect, 4) + " 有效层级</b>" + br
                                        let cost = "<b><h2>成本</h2>: " + formatWhole(tmp.T.buyables[21].cost) + " 等级</b><br>"
        
                                        return br + amt + eff + cost + "按住shift查看详情"
                                }
                                let effForm = "<b><h2>效果公式</h2>:<br>" + format(tmp.T.buyables[21].base, 4) + "*x</b>" + br
                                let costForm = "<b><h2>成本公式</h2>:<br>" + tmp.T.buyables.costDisplayFormula() + "</b>" + br
                                return br + effForm + costForm
                        },
                        base(){
                                let ret = new Decimal(.5).times(CURRENT_BUYABLE_EFFECTS["f22"].min(3))
                                if (hasUpgrade("f", 24))        ret = ret.times(player.T.buyables[22].div(20).plus(1))
                                if (hasMilestone("T", 18))      ret = ret.times(5)
                                return ret
                        },
                        effect(){
                                return tmp.T.buyables[21].base.times(player.T.buyables[21])
                        },
                        canAfford(){
                                return player.T.ranks.gte(tmp.T.buyables[21].cost)
                        },
                        cost(){
                                return layers.T.buyables.costFormula(player.T.buyables[21])
                        },
                        buy(){
                                if (!layers.T.buyables[21].canAfford()) return 
                                player.T.ranks = player.T.ranks.sub(tmp.T.buyables[21].cost)
                                player.T.buyables[21] = player.T.buyables[21].plus(1)
                        },
                        unlocked(){
                                return player.T.best.gte(917) 
                        },
                },
                22: {
                        title: "敏捷",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 22) + "</b><br>"
                                        let eff = "<b><h2>效果</h2>: " + format(tmp.T.buyables[22].effect, 4) + " F 13应用次数</b>" + br
                                        let cost = "<b><h2>成本</h2>: " + formatWhole(tmp.T.buyables[22].cost) + " 等级</b><br>"
        
                                        return br + amt + eff + cost + "按住shift查看详情"
                                }
                                let effForm = "<b><h2>效果公式</h2>:<br>" + format(tmp.T.buyables[22].base, 4) + "*x</b>" + br
                                let costForm = "<b><h2>成本公式</h2>:<br>" + tmp.T.buyables.costDisplayFormula() + "</b>" + br
                                return br + effForm + costForm
                        },
                        base(){
                                let ret = new Decimal(.5)
                                if (hasUpgrade("f", 24)) ret = ret.times(player.T.buyables[21].div(20).plus(1))
                                if (hasMilestone("T", 18)) ret = ret.times(5)
                                if (/*player.g.unlocked || */ (hasMilestone("f", 21) && player.f.best.gte("1e96605")) ) ret = ret.times(2)
                                return ret
                        },
                        effect(){
                                return tmp.T.buyables[22].base.times(player.T.buyables[22])
                        },
                        canAfford(){
                                return player.T.ranks.gte(tmp.T.buyables[22].cost)
                        },
                        cost(){
                                return layers.T.buyables.costFormula(player.T.buyables[22])
                        },
                        buy(){
                                if (!layers.T.buyables[22].canAfford()) return 
                                player.T.ranks = player.T.ranks.sub(tmp.T.buyables[22].cost)
                                player.T.buyables[22] = player.T.buyables[22].plus(1)
                        },
                        unlocked(){
                                return hasUpgrade("T", 25)
                        },
                },

                71: {
                        title: "重置",
                        display(){
                                return br + "重置所有可购买项"
                        },
                        buy(){
                                player.T.ranks = player.T.totalranks 
                                player.T.buyables[11] = decimalZero
                                player.T.buyables[12] = decimalZero
                                player.T.buyables[21] = decimalZero
                                player.T.buyables[22] = decimalZero
                        },
                        canAfford(){
                                return true 
                        },
                        unlocked(){
                                return true
                        },
                        style(){
                                return {height: '80px', width: '80px', 'border-radius': "20%"}
                        }
                },

                41: {
                        title: "等级 I",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 41) + "</b><br>"
                                        let cost = "<b><h2>需求</h2>: " + formatWhole(tmp.T.buyables[41].requires) + " 层级</b><br>"
        
                                        return br + amt + cost + "按住shift查看详情"
                                }
                                let costForm = "<b><h2>成本公式</h2>:<br> x<sup>2</sup> + x + 899END</b>" + br
                                if (hasUpgrade("E", 33)) costForm = costForm.replace("+ x ", "")
                                if (hasUpgrade("f", 22)) costForm = costForm.replace("899", formatWhole(player.T.points.sub(950).max(0).times(-1).plus(899).max(0)))
                                costForm = costForm.replace(" + 0END", "").replace("END", "")
                                return br + costForm
                        },
                        canAfford(){
                                return player.T.points.gte(tmp.T.buyables[41].requires)
                        },
                        requires(){
                                let l = player.T.buyables[41]
                                let add = hasUpgrade("f", 22) ? player.T.points.sub(950).max(0).times(-1).plus(899).max(0) : 899
                                if (hasUpgrade("E", 33)) return l.pow(2).plus(add).round()
                                return l.plus(1).times(l).plus(add).round()
                        },
                        buy(){
                                if (!layers.T.buyables[41].canAfford()) return 
                                player.T.buyables[41] = player.T.buyables[41].plus(1)
                                player.T.ranks = player.T.ranks.plus(1)
                                player.T.totalranks = player.T.totalranks.plus(1)
                        },
                        unlocked(){
                                return true
                        },
                },
                42: {
                        title: "等级 II",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 42) + "</b><br>"
                                        let cost = "<b><h2>需求</h2>: " + formatWhole(tmp.T.buyables[42].requires) + " Better Everything</b><br>"
        
                                        return br + amt + cost + "按住shift查看详情"
                                }
                                let costForm = "<b><h2>成本公式</h2>:<br> x<sup>EXP</sup> + 25x</b>" + br
                                let exp = hasUpgrade("T", 33) ? 1.8 : hasMilestone("E", 13) ? 2 : 3
                                if (hasMilestone("G", 5)) {
                                        if (player.E.points.gte("1e9149")) exp -= .07
                                        if (player.E.points.gte("1e9283")) exp -= .07
                                }
                                if (hasMilestone("G", 7) && player.T.points.gte(3570)) exp -= .03
                                if (hasMilestone("G", 7) && player.T.points.gte(3580)) exp -= .03
                                if (hasUpgrade("e", 44)) costForm = costForm.replace("25", formatWhole(25 - player.e.upgrades.length)).replace(" + 0x", "").replace("+ 1", "+ ")
                                return br + costForm.replace("EXP", formatWhole(exp))
                        },
                        canAfford(){
                                return player.E.buyables[32].gte(tmp.T.buyables[42].requires)
                        },
                        requires(){
                                let l = player.T.buyables[42]
                                let exp = hasUpgrade("T", 33) ? 1.8 : hasMilestone("E", 13) ? 2 : 3
                                if (hasMilestone("G", 5)) {
                                        if (player.E.points.gte("1e9149")) exp -= .07
                                        if (player.E.points.gte("1e9283")) exp -= .07
                                }
                                if (hasMilestone("G", 7) && player.T.points.gte(3570)) exp -= .03
                                if (hasMilestone("G", 7) && player.T.points.gte(3580)) exp -= .03
                                let lin = new Decimal(hasUpgrade("e", 44) ? (25 - player.e.upgrades.length) : 25).times(l)
                                return l.pow(exp).plus(lin).ceil()
                        },
                        buy(){
                                if (!layers.T.buyables[42].canAfford()) return 
                                player.T.buyables[42] = player.T.buyables[42].plus(1)
                                player.T.ranks = player.T.ranks.plus(1)
                                player.T.totalranks = player.T.totalranks.plus(1)
                        },
                        unlocked(){
                                return hasMilestone("E", 10)
                        },
                },
                43: {
                        title: "等级 III",
                        display(){
                                if (!player.shiftAlias) {
                                        let amt = "<b><h2>数量</h2>: " + getBuyableAmountDisplay("T", 43) + "</b><br>"
                                        let cost = "<b><h2>需求</h2>: " + formatWhole(tmp.T.buyables[43].requires) + " F 31</b><br>"
        
                                        return br + amt + cost + "按住shift查看详情"
                                }
                                let str = tmp.T.buyables[43].base.eq(tmp.T.buyables[43].base.floor()) ? formatWhole(tmp.T.buyables[43].base) : format(tmp.T.buyables[43].base, 3)
                                let costForm = "<b><h2>成本公式</h2>:<br> " + str +  "<sup>x</sup></b>" + br
                                return br + costForm
                        },
                        canAfford(){
                                return player.f.buyables[31].gte(tmp.T.buyables[43].requires)
                        },
                        base(){
                                if (hasUpgrade("E", 32))  return player.E.buyables[32].div(1000).min(.5).times(-1).plus(2)
                                if (hasMilestone("G", 4)) return new Decimal(10).sub(player.G.points.sub(12).max(0).min(8))
                                return new Decimal(10)
                        },
                        requires(){
                                let l = player.T.buyables[43]
                                let base = tmp.T.buyables[43].base
                                return base.pow(l)
                        },
                        buy(){
                                if (!layers.T.buyables[43].canAfford()) return 
                                player.T.buyables[43] = player.T.buyables[43].plus(1)
                                player.T.ranks = player.T.ranks.plus(1)
                                player.T.totalranks = player.T.totalranks.plus(1)
                        },
                        unlocked(){
                                return hasUpgrade("E", 25)
                        },
                },
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                return "您当前处于翡翠层级 " + formatWhole(player.E.tier) + "。"
                                        }
                                ],
                                "prestige-button",
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "可购买项": {
                        content: [
                                "main-display",
                                ["rank-display", "ranks"],
                                ["buyables", [1,2,3,7]]
                        ],
                        unlocked(){
                                return player.f.challenges[22] >= 2 || player.G.unlocked
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                "milestones"
                        ],
                        unlocked(){
                                return true
                        },
                },
                "等级": {
                        content: [
                                "main-display",
                                ["rank-display", "ranks"],
                                ["buyables", [4,5,6]]
                        ],
                        unlocked(){
                                return player.f.challenges[22] >= 2 || player.G.unlocked
                        },
                },
        },
        doReset(layer){
                if (!getsReset("e", layer)) return 
                let data = player.T

                if (!hasMilestone("G", 9)) {
                        data.points = decimalZero
                        if (hasMilestone("G", 6) && layer == "G") data.best = tmp.G.nextAt.times(hasMilestone("G", 8) ? .98 : .9).floor()
                        else if (layer != "f" || !hasMilestone("f", 9)) data.best = decimalZero
                }

                data.upgrades = data.upgrades.slice(0, hasMilestone("f", 8) ? player.f.times : 0)
                
                data.milestones = data.milestones.slice(0, hasMilestone("f", 8) ? player.f.times : 0)

                if (layer != "f" && !hasMilestone("G", 9)) {
                        data.buyables[11] = decimalZero
                        data.buyables[12] = decimalZero
                        data.buyables[21] = decimalZero
                        data.buyables[22] = decimalZero
                        data.buyables[41] = decimalZero
                        data.buyables[42] = decimalZero
                        data.buyables[43] = decimalZero
                        data.ranks = decimalZero
                        data.totalranks = decimalZero
                }
        },
})

addLayer("G", {
        name: "等级", // 可选，仅少数地方使用，若缺失则使用层ID
        symbol: "Gr", // 显示在层节点上，默认为首字母大写的ID
        position: 0, // 行内水平位置，默认按ID字母排序
        row: 6, // 层在树中的行数（0为第一行）
        startData() { return {
                unlocked: false,
                points: decimalZero,
                best: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                tier: decimalOne,
                ranks: decimalZero,
                totalranks: decimalZero,
        }},
        color: "#A38A2A",
        branches: ["T"],
        requires: new Decimal(2187), // 可以是考虑需求增长的函数
        resource: "等级", // 声望货币名称
        baseResource: "层级", // 声望基础资源名称
        baseAmount() {return player.T.points.floor()}, // 获取当前基础资源量
        type: "static", // normal: 货币获取成本随获取量变化 static: 成本随现有量变化
        base(){
                return new Decimal(3).pow(0.01)
        },
        gainMult(){
                return decimalOne
        },
        exponent(){
                let ret = new Decimal(1000)
                if (player.G.points.gte(90)) ret = ret.plus(hasMilestone("G", 10) ? 27.4 : 46.98)
                return ret.div(1000)
        },
        prestigeButtonText(){
                if (player.shiftAlias) {
                        if (hasMilestone("G", 10)) return "3<sup>7+等级<sup>1.0274</sup>/100</sup>"
                        if (player.G.points.gte(90)) return "3<sup>7+等级<sup>1.04698</sup>/100</sup>"
                        return "3<sup>7+等级/100</sup>"
                }
                return "重置获得一个等级<br>需求: " + formatWhole(player.T.points) + " / " + formatWhole(tmp.G.nextAtDisp)
        },
        update(diff){
                let data = player.G

                if (player.T.best.gt(2187)) data.unlocked = true
                if (!data.unlocked) return

                if (data.points.eq(0)) data.points = decimalOne
                data.best = data.best.max(data.points)
                
                data.time += diff
        },
        layerShown(){return player.T.best.gte(2180) || player.G.unlocked},
        effect(){
                return player.G.points
        },
        effectDescription(){
                return "减少" + formatWhole(tmp.G.effect) + "有效层级"
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>等级 I"
                        },
                        description(){
                                return "待定"
                        },
                        cost: new Decimal(1e10),
                        unlocked(){
                                return true 
                        }, 
                }, // hasUpgrade("G", 11)
        },
        milestones: {
                1: {
                        requirementDescription(){
                                return "等级1"
                        },
                        done(){
                                return player.G.points.gte(1)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：保留雀重置和里程碑（每等级1个），超过0/1的层级为鸭子/鹰获取指数加成。乘以(等级+1)并平方之前自动购买器的批量，双倍其速度，且一次性购买所有可购买项。"
                        },
                }, // hasMilestone("G", 1)
                2: {
                        requirementDescription(){
                                return "等级2"
                        },
                        done(){
                                return player.G.points.gte(2)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：保留水豚挑战并自动购买翡翠可购买项。仅在挑战中保留层级的雀效果更好（不会超越正常进度）。E 22改为赠送免费E 21等级而非E 11等级。"
                        },
                }, // hasMilestone("G", 2)
                3: {
                        requirementDescription(){
                                return "等级11"
                        },
                        done(){
                                return player.G.points.gte(11)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：保留前三个雀挑战，雀里程碑7起始提前2层级/等级。移除F 1X基础成本。"
                        },
                }, // hasMilestone("G", 3)
                4: {
                        requirementDescription(){
                                return "等级14"
                        },
                        done(){
                                return player.G.points.gte(14)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：每隔一个等级使等级除以Dlareme线性成本基础。超过12的等级（最多8次）从Rank III基础中减去。"
                        },
                }, // hasMilestone("G", 4)
                5: {
                        requirementDescription(){
                                return "等级18"
                        },
                        done(){
                                return player.G.points.gte(18)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：超过630的F 22等级每级为F 11基础+0.05（最多22222级）。在1e9149和1e9283翡翠时从Rank II成本公式指数中减去0.07。获得10倍雀。"
                        },
                }, // hasMilestone("G", 5)
                6: {
                        requirementDescription(){
                                return "等级26"
                        },
                        done(){
                                return player.G.points.gte(26)
                        },
                        unlocked(){
                                return true
                        },
                        per(){
                                let base = new Decimal(1e80)
                                if (player.T.points.gte(3069)) {
                                        base = base.div(Decimal.pow(10, player.G.points.sub(30).min(24).max(0)))
                                        base = base.div(Decimal.pow(10, player.G.points.sub(54).div(2).min(12).max(0)))
                                }
                                if (hasMilestone("f", 27)) {
                                        base = base.div(10)
                                        if (player.f.points.gte("1e602907")) base = base.div(10)
                                        if (player.f.points.gte("1e623648")) base = base.div(10)
                                        if (player.f.points.gte("1e630327")) base = base.div(10)
                                        if (player.f.points.gte("1e833329")) base = base.div(10)
                                        if (player.f.points.gte("3e837524")) base = base.div(10)
                                        if (player.f.points.gte("1e851865")) base = base.div(10)
                                        if (player.f.points.gte("1e857997")) base = base.div(10)
                                        if (player.f.points.gte("1e864355")) base = base.div(10)
                                        if (player.f.points.gte("1e890441")) base = base.div(10)
                                        if (player.f.points.gte("1e901228")) base = base.div(10)
                                        if (player.f.points.gte("1e986934")) base = base.div(10)
                                        if (player.f.points.gte("1e1145677"))base = base.div(10)
                                }
                                if (hasMilestone("G", 8)) {
                                        base = base.div(100)
                                        if (player.T.points.gte(3910)) base = base.div(3)
                                        if (player.T.points.gte(3946)) base = base.div(1.9)
                                        if (player.T.points.gte(4039)) base = base.div(3.5)
                                        if (player.T.points.gte(4080)) base = base.div(2)
                                        if (player.T.points.gte(4133)) base = base.div(1.4)
                                        if (player.T.points.gte(4169)) base = base.div(2.6)
                                        if (player.T.points.gte(4801)) base = base.div(9)
                                }
                                return base.max(1)
                        },
                        effectDescription(){
                                let r = "奖励：超过23的每个等级使F 32线性成本基础×1e80（在3069层级时减少为每超过30等级÷10，24后减半，48后上限），在11级时×8e59，36/55级时减少为4.8e51/1e45。F 23基础成本×5e69。从升级所需层级的90%开始。"
                                return r + br + "当前倍数: " + format(tmp.G.milestones[6].per)
                        },
                }, // hasMilestone("G", 6)
                7: {
                        requirementDescription(){
                                return "等级44"
                        },
                        done(){
                                return player.G.points.gte(44)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：保留所有雀挑战。超过40的等级使Dlareme基础成本÷雀<sup>0.0001</sup>。超过92的等级为雀获取指数加成，在3570和3580层级时从Rank II指数中减去0.03。"
                        },
                }, // hasMilestone("G", 7)
                8: {
                        requirementDescription(){
                                return "等级52"
                        },
                        done(){
                                return player.G.points.gte(52)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：等级里程碑6倍数÷100并保留8%更多层级。在3910/3946/4039/4080/4133/4169/4801层级时分别÷3/1.9/3.5/2/1.4/2.6/9。"
                        },
                }, // hasMilestone("G", 8)
                9: {
                        requirementDescription(){
                                return "等级71"
                        },
                        done(){
                                return player.G.points.gte(71)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：保留层级和Rank内容，超过70的每个等级为F 23基础+0.0017，超过72的每个等级使F 22线性成本基础÷5e4（最多10次，在75/78/79/80/81/82级时减少为1500/250/175/130/45/11）。F 21基础÷10且改为赠送免费F 12等级而非F 23。"
                        },
                }, // hasMilestone("G", 9)
                10: {
                        requirementDescription(){
                                return "等级91"
                        },
                        done(){
                                return player.G.points.gte(91)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "奖励：移除F 32效果的第二个软上限并将下一等级指数降为1.0274。"
                        },
                }, // hasMilestone("G", 10)
        },
        tabFormat: {
                "升级": {
                        content: ["main-display",
                                "prestige-button",
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "里程碑": {
                        content: [
                                "main-display",
                                "milestones"
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
        doReset(layer){
                if (!getsReset("g", layer) || layer == "g") return 
                let data = player.G

                data.points = decimalZero

                data.upgrades = data.upgrades.slice(0, false ? player.f.times : 0)
                
                data.milestones = data.milestones.slice(0, false ? player.f.times : 0)
        },
})





