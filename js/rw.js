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
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "成就: "+player.rw.achievements.length+"/"+(Object.keys(tmp.rw.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],

})