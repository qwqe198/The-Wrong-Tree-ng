addLayer("rw", {
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "yellow",
    row: "side",
    layerShown() { return hasMilestone("cq", 1)||hasAchievement("rw", 81) },
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("任务")
    },
    symbol: `任务`,
    achievements: {

        11: {
            name: "进入新手村",
            done() { return hasMilestone("cq", 1) },
            tooltip: "获得1战力。奖励：离线时间不再有上限。",
        },
        12: {
            name: "无需花费",
            done() { return hasMilestone("cq", 1) && hasMilestone("esc", 4) },
            tooltip: "获得4劝退点。奖励：esc升级不再花费。",
        },
        13: {
            name: "再次声望",
            done() { return hasMilestone("cq", 1) && player.a.points.gte(1) },
            tooltip: "获得1声望点。奖励：bx1.005。",
        },
        14: {
            name: "元元元",
            done() { return hasMilestone("cq", 1) && player.m.points.gte(1) },
            tooltip: "获得1元性质。奖励：元性质效果^1.025。",
        },
        15: {
            name: "hp还是life",
            done() { return hasMilestone("cq", 1) && player.l.points.gte(1) },
            tooltip: "获得1生命。奖励：生命和血量获取x1.5。",
        },
        16: {
            name: "声望加成",
            done() { return hasMilestone("cq", 1) && player.q.points.gte(1) },
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
            done() { return buyableEffect("t", 11).gte(1) },
            tooltip: "爬1层塔，奖励：重置能量获取^1.025后x1e10。",
        },
        26: {
            name: "渐入佳境",
            done() { return buyableEffect("t", 11).gte(5) },
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
            done() { return hasUpgrade("a1", 12) },
            tooltip: "获得A层级升级12，奖励：购买升级数量提升上一个升级效果(^x)",
        },
        41: {
            name: "更多虫虫",
            done() { return hasUpgrade("a1", 13) },
            tooltip: "获得A层级升级13，奖励：变形虫x1.2",
        },
        42: {
            name: "虫虫自增",
            done() { return hasUpgrade("a1", 14) },
            tooltip: "获得A层级升级14，奖励：保留自动购买p层级升级",
        },
        43: {
            name: "虫虫购买",
            done() { return hasUpgrade("a1", 15) },
            tooltip: "获得A层级升级15，奖励：自动购买esc层级升级",
        },
        44: {
            name: "点数上限",
            done() { return player.points.gte("1e50000") },
            tooltip: "获得1e50000点数，奖励：变形虫只重置血量 提示 点数获取好像遇到硬上限了，你要进入第2个副本才能提高",
        },
        45: {
            name: "劝退超限",
            done() { return hasMilestone("esc", 11) },
            tooltip: "获得11劝退点，奖励：自动购买L层级可购买11",
        },
        46: {
            name: "增量开始",
            done() { return player.i.points.gte(1) },
            tooltip: "获得1增量点，奖励：增量点获取基于自身增加",
        },
        51: {
            name: "病毒树残局？",
            done() { return player.points.gte("1.1981e7") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1.1981e7点数，奖励：防御对通天塔怪物生效",
        },
        47: {
            name: "1e6",
            done() { return player.points.gte("1e6") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1e6点数，奖励：简单试炼3真简单 重置时保留L层级购买",
        },
        52: {
            name: "哦不，软上限",
            done() { return upgradeEffect("a1", 11).gte(1e100) },
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
            done() { return buyableEffect("t", 11).gte(14) },
            tooltip: "获得12塔里程碑，奖励：无瑕点数x12",
        },
        56: {
            name: "1e10",
            done() { return player.points.gte("1e10") && player.i.points.gte("1e110") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1e10点数和1e110增量，奖励：点数x1e15后^1.15",
        },
        57: {
            name: "突破禁制",
            done() { return player.cq.challenges[22] >= 1 },
            tooltip: "完成1次简单试炼5，奖励：血量获取^1.05",
        },
        61: {
            name: "指数基础",
            done() { return hasUpgrade("a1", 25) },
            tooltip: "获得A层级升级25，奖励：这个升级效果已经很强大了",
        },
        62: {
            name: "1e13",
            done() { return player.points.gte("1e13") && player.i.points.gte("1e411") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1e13点数和1e411增量，奖励：自动购买I层级升级,变形虫获取x13",
        },
        63: {
            name: "变形虫生命",
            done() { return getBuyableAmount("a1", 13).gte(1) },
            tooltip: "买1次A层级购买13，奖励：解锁新的战斗",
        },
        64: {
            name: "第四个数字是什么",
            done() { return hasUpgrade("cq", 64) },
            tooltip: "获得cq层级升级64，奖励：当然是伤害指数啦",
        },
        65: {
            name: "竟然和任务序号一样",
            done() { return hasUpgrade("cq", 65) },
            tooltip: "获得cq层级升级65，奖励：增量获取^1.05",
        },
        66: {
            name: "1e15",
            done() { return player.points.gte("1e15") && player.i.points.gte("1e533") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1e15点数和1e533增量，奖励：快了……增量的数量级加成无瑕点数和变形虫",
        },
        67: {
            name: "传送门",
            done() { return player.csm.points.gte("1") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1传送门，奖励：自动购买增量强度",
        },
        71: {
            name: "转生增量?",
            done() { return player.csm.ati.gte("1") && inChallenge("t", 11) },
            tooltip: "获得1转生增量，奖励：A层级升级14效果平方",
        },
        72: {
            name: "三次灌注1",
            done() { return getBuyableAmount("csm", 11).gte(3) },
            tooltip: "买3次点数灌注，奖励：在1传送门时解锁增量灌注",
        },
         73: {
            name: "三次灌注2",
            done() { return getBuyableAmount("csm", 12).gte(3) },
            tooltip: "买3次增量灌注，奖励：解锁一个变形虫升级和在1传送门时解锁变形虫灌注",
        },
  74: {
            name: "3^3次灌注3",
            done() { return getBuyableAmount("csm", 13).gte(7) },
            tooltip: "买3^3(7)次变形虫灌注，奖励：自动购买增量速度",
        },
75: {
            name: "简单试炼的一半",
            done() { return player.cq.challenges[13] >= 5 },
            tooltip: "彻底完成简单试炼3，奖励：解锁简单试炼6,点数x1e7.5后^1.075",
        },
    76: {
            name: "隐藏条件",
            done() { return inChallenge("cq", 23) },
            tooltip: "进入简单试炼6，奖励：你无法每秒获得重置点,但是劝退点7的第一个效果在试炼中生效",
        },  
     77: {
            name: "终于到来",
            done() { return player.cq.challenges[23] >= 1 },
            tooltip: "完成1次简单试炼6，奖励：你的扩张次数不会小于战力里程碑数量-3，隐藏简单试炼1，2，解锁新的战力里程碑",
        },
81: {
            name: "更多奖励，但也更难缠了",
            done() { return player.grz.points.gte(1) },
            tooltip: "击杀1只感染者，奖励：在所有重置中保留试炼",
        },
82: {
            name: "第二次2",
            done() { return player.grz.points.gte(2) },
            tooltip: "击杀2只感染者，奖励：保留25战力里程碑。",
        },
83:{         name: "再来两次",
            done() { return player.grz.points.gte(4) },
            tooltip: "击杀4只感染者，奖励：自动购买传奇升级。",
        },
84:{         name: "新的购买",
            done() { return player.grz.points.gte(6) },
            tooltip: "击杀6只感染者，奖励：IN层级升级15对感染力量生效。",
        },
85: {
            name: "两行升级",
            done() { return hasUpgrade("grz", 26) },
            tooltip: "获得两行感染者升级，奖励：转生增量x10，解锁前3个灌注的第二个效果",
        },
86: {
            name: "一个升级，超过上限",
            done() { return upgradeEffect("i", 11).gte("1e50000") },
            tooltip: "增量升级11效果超过1e50000，奖励：感染力量获取x10",
        },
87: {
            name: "第十个",
            done() { return player.grz.points.gte(10) },
            tooltip: "击杀10只感染者，奖励：重置时保留300战力。",
        },
 91: {
            name: "1e24",
            done() { return player.points.gte("1e24") && inChallenge("t", 11) },
            tooltip: "在加强疫苗中获得1e24点数 奖励：自动购买变形虫升级和保留每秒获得100%的变形虫",
        },
92:{         name: "传染感染",
            done() { return player.grz.points.gte(13) },
            tooltip: "击杀13只感染者，奖励：自动提升生命。",
        },
93: {
            name: "还要更多",
            done() { return player.grz.points.gte(14) },
            tooltip: "击杀14只感染者，奖励：点数上限x1e50。",
        },
  94: {
            name: "进一步扩张",
            done() { return player.l.challenges[11] >= 22 },
            tooltip: "完成22次扩张，奖励：写到战力里程碑那里了",
        },
95: {
            name: "非常吉利的数字",
            done() { return upgradeEffect("i", 11).gte("1e888888") },
            tooltip: "增量升级11效果超过1e888888，奖励：感染者升级23效果是原来的平方",
        },
96: {
            name: "2^4",
            done() { return player.grz.points.gte(16) },
            tooltip: "击杀16只感染者，奖励：你的爬塔层数不会低于20。",
        },
97: {
            name: "你真的买得起吗",
            done() { return player.cq.challenges[23] >= 2 },
            tooltip: "完成2次简单试炼6，奖励：进去看看就知道啦",
        },
101: {
            name: "新东西前的最后准备",
            done() { return hasUpgrade("grz", 61) },
            tooltip: "买完前5行传染感染升级，奖励：增量^1.1",
        },
102: {
            name: "非常吉利的数字2",
            done() { return player.i.points.gte("8.88e888") },
            tooltip: "获得8.88e888增量，奖励：增量获取上限变为传送门需求x1000",
        },
103: {
            name: "感染性疾病?",
            done() { return player.grz.points.gte(18) },
            tooltip: "击杀18只感染者，奖励：第2，3灌注第二个效果^2.2222。",
        },
104: {
            name: "记得点完再重置啊",
            done() { return player.csm.points.gte(2) },
            tooltip: "获得2传送门，奖励：在传送门重置时保留传送门里面的东西。",
        },
        105: {
            name: "1e3",
            done() { return player.points.gte("1e3") && inChallenge("t", 11)&&player.csm.points.gte(2) },
            tooltip: "在2传送门的加强疫苗中获得1e3点数，奖励：增量重置要求降低至原来的10%",
        },
106: {
            name: "两个资源",
            done() { return player.bg.points.gte(1) },
            tooltip: "获得1增幅器和生成器，奖励：生命获取x69。",
        },
107: {
            name: "第二生命可购买",
            done() { return getBuyableAmount("l", 12).gte(1)},
            tooltip: "买1次生命可购买12，奖励：移除力量获取和感染者基础购买的一个软上限。",
        },
111: {
            name: "无限感染",
            done() { return player.grz.ll.gte("1.798e308")},
            tooltip: "获得1.798e308感染力量，奖励：感染者升级14第一个效果^(感染者+1)。",
        },
112: {
            name: "无限感染x10",
            done() { return player.grz.ll.gte("1.798e309")},
            tooltip: "获得1.798e309感染力量，奖励：移除感染者升级22的软上限。",
        },
113: {
            name: "316",
            done() { return player.grz.ll.gte("3.16e316")},
            tooltip: "获得3.16e316感染力量，奖励：感染力量在溢出后x1e10。",
        },
114: {
            name: "感染性疾病！",
            done() { return player.grz.jb.gte(1) },
            tooltip: "获得1感染性疾病，奖励：在进入加强疫苗时保留1传送门。",
        },
    115: {
            name: "好像卡了？",
            done() { return getBuyableAmount("grz", 41).gte(9) },
            tooltip: "买9次疾病获取，奖励：扩张要求修改为点数",
        },
116: {
            name: "力量基础加成",
            done() { return hasUpgrade("grz", 72) },
            tooltip: "买完第6行传染感染升级，奖励：感染性疾病获取x1.5",
        },
117: {
            name: "游戏要炸了？",
            done() { return hasUpgrade("grz", 84) },
            tooltip: "购买感染性疾病的第四个升级，奖励：不可能的 其实感染者基础在300也有溢出 x->(lg(x+700))*100，免疫降低加成感染者升级25效果，且移除升级的软上限",
        },
121: {
            name: "力量基础！",
            done() { return getBuyableAmount("grz", 21).gte(2)},
            tooltip: "买2次力量基础，奖励：修改感染者升级21的公式。",
        },
122: {
            name: "深深深入",
            done() { return hasUpgrade("grz", 63) },
            tooltip: "购买一个第7行传染感染升级，奖励：修改感染者升级34的公式，感染性疾病获取x2.2222",
        },
123: {
            name: "777",
            done() { return player.grz.jb.gte(7.77e77) },
            tooltip: "获得7.77e77感染性疾病，奖励：第2个生命购买项效果对扩张效果生效。",
        },
124: {
            name: "《西游记》",
            done() { return player.l.challenges[11] >= 25 },
            tooltip: "完成25次扩张，奖励：降低里程碑价格",
        },
    },
    tabFormat: [
        "blank",
        ["display-text", function () { return "任务: " + player.rw.achievements.length + "/" + (Object.keys(tmp.rw.achievements).length - 2) }],
        "blank", "blank",
        "achievements",
    ],

})
