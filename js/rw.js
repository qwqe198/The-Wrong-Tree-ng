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
        21: {
            name: "解锁试炼",
            done() { return player.cq.points.gte(3) },
            tooltip: "获得3战力，奖励：点数获取x2。",
        },
   22: {
            name: "劝退点反效果",
            done() { return player.cq.challenges[11] >= 1 },
            tooltip: "完成1次简单试炼1，奖励：自动购买声望加成。",
        },
  23: {
            name: "通天塔！",
            done() { return player.cq.points.gte(5) },
            tooltip: "获得5战力，奖励：攻击对通天塔中怪物生效。",
        },
  24: {
            name: "更弱的购买项",
            done() { return player.cq.challenges[12] >= 1 },
            tooltip: "完成1次简单试炼2，奖励：p层级购买11效果x1.01，12效果^1.1。",
        },
 25: {
            name: "开始爬塔",
            done() { return buyableEffect("t",11).gte(1) },
            tooltip: "爬1层塔，奖励：重置能量获取^1.025后x1e10。",
        },
26: {
            name: "渐入佳境",
            done() { return buyableEffect("t",11).gte(5) },
            tooltip: "爬5层塔，奖励： 防御x1.1。",
        },
27: {
            name: "此任务已被旋转放置赞助",
            done() { return player.cq.challenges[13] >= 1 },
            tooltip: "完成1次简单试炼3，奖励：扩张奖励^1.05",
        },
31: {
            name: "自动化1",
            done() { return player.cq.points.gte(13) },
            tooltip: "在战力重置时保留所有自动p层级购买，奖励：自动获取劝退点",
        },
32: {
            name: "自动化2",
            done() { return player.cq.points.gte(20) },
            tooltip: "在战力重置时保留所有自动p层级挑战，奖励：劝退点不再重置任何东西",
        },
33: {
            name: "醉翁亭记",
            done() { return player.cq.challenges[21] >= 1 },
            tooltip: "完成1次简单试炼4，奖励：血量获取^1.1",
        },
34: {
            name: "双倍战力",
            done() { return player.lcb.points.gte(5) },
            tooltip: "一次重置获得2战力，奖励：自动重置里程碑",
        },
35: {
            name: "竟然还有副本",
            done() { return player.cq.points.gte(25) },
            tooltip: "解锁副本，奖励：解锁一个新层级",
        },
36: {
            name: "捉虫虫",
            done() { return player.a1.points.gte(1) },
            tooltip: "击杀1只变形虫，奖励：提升血量购买价格^0.9",
        },
37: {
            name: "虫虫捉点数",
            done() { return hasUpgrade("a1",12) },
            tooltip: "获得A层级升级12，奖励：购买升级数量提升上一个升级效果(^x)",
        },
41: {
            name: "更多虫虫",
            done() { return hasUpgrade("a1",13) },
            tooltip: "获得A层级升级13，奖励：变形虫x1.2",
        },
42: {
            name: "虫虫自增",
            done() { return hasUpgrade("a1",14) },
            tooltip: "获得A层级升级14，奖励：保留自动购买p层级升级",
        },
43: {
            name: "虫虫购买",
            done() { return hasUpgrade("a1",15) },
            tooltip: "获得A层级升级15，奖励：自动购买esc层级升级",
        },
44: {
            name: "点数上限",
            done() { return player.points.gte("1e50000") },
            tooltip: "获得1e50000点数，奖励：变形虫只重置血量 提示 点数获取好像遇到硬上限了，你要进入第2个副本才能提高",
        },
45: {
            name: "劝退超限",
            done() { return hasMilestone("esc",11) },
            tooltip: "获得11劝退点，奖励：自动购买L层级可购买11",
        },
46: {
            name: "增量开始",
            done() { return player.i.points.gte(1) },
            tooltip: "获得1增量点，奖励：增量点获取基于自身增加",
        },
51: {
            name: "病毒树残局？",
            done() { return player.points.gte("1.1981e7")&&inChallenge("t",11) },
            tooltip: "在加强疫苗中获得1.1981e7点数，奖励：防御对通天塔怪物生效",
        },
47: {
            name: "1e6",
            done() { return player.points.gte("1e6")&&inChallenge("t",11) },
            tooltip: "在加强疫苗中获得1e6点数，奖励：简单试炼3真简单 重置时保留L层级购买",
        },
52: {
            name: "哦不，软上限",
            done() { return upgradeEffect("a1",11).gte(1e100) },
            tooltip: "A层级升级11效果到1e100，奖励：效果超过1e100的部分指数^0.5",
        },
53: {
            name: "这个好像太没用了",
            done() { return getBuyableAmount("a1", 11).gte(5) },
            tooltip: "买5次A层级购买11，奖励：该购买效果对增量获取生效",
        },
54: {
            name: "更多增量",
            done() { return player.i.points.gte(5e22) },
            tooltip: "获得5e22增量，奖励：解锁简单试炼5",
        },
55: {
            name: "黄道十二宫",
            done() { return buyableEffect("t",11).gte(14)},
            tooltip: "获得12塔里程碑，奖励：无瑕点数x12",
        },
56: {
            name: "1e10",
            done() { return player.points.gte("1e10")&&player.i.points.gte("1e110")&&inChallenge("t",11) },
            tooltip: "在加强疫苗中获得1e10点数和1e110增量，奖励：点数x1e15后^1.15",
        },
57: {
            name: "突破禁制",
            done() { return player.cq.challenges[22] >= 1 },
            tooltip: "完成1次简单试炼5，奖励：血量获取^1.05",
        },
61: {
            name: "指数基础",
            done() { return hasUpgrade("a1",25) },
            tooltip: "获得A层级升级25，奖励：这个升级效果已经很强大了",
        },
62: {
            name: "1e13",
            done() { return player.points.gte("1e13")&&player.i.points.gte("1e411")&&inChallenge("t",11) },
            tooltip: "在加强疫苗中获得1e13点数和1e411增量，奖励：自动购买I层级升级,变形虫获取x13",
        },
63: {
            name: "变形虫生命",
            done() { return getBuyableAmount("a1", 13).gte(1) },
            tooltip: "买1次A层级购买13，奖励：解锁新的战斗（制作中）",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "任务: "+player.rw.achievements.length+"/"+(Object.keys(tmp.rw.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],

})
