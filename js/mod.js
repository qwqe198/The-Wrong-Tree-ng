let modInfo = {
	name: "二代链",
	id: "二代链",
	author: "pg132",
	pointsName: "Points",
	modFiles: ["layers.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// 胜利文本
let winText = `恭喜！您已到达当前版本的终点！更多内容即将到来...`

// 如果你在任何层级中添加了新函数，并且这些函数在被调用时会产生效果，请在这里添加它们
// (这里的函数是示例，所有官方函数已经处理好了)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "getGainWeights", "costDisplayFormula"]

// 获取初始点数
function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 判断是否显示点数/秒
function canGenPoints(){
    return true
}

// 添加与层级无关的玩家数据变量，这些变量会存入"player"并被保存
function addedPlayerData() { return {
    toggleKeys: false,          // 切换键模式
    undulating: false,         // 波动效果
    lastSave: new Date().getTime(), // 最后保存时间
    arrowHotkeys: true,        // 箭头快捷键
    modTab: false,            // 模组标签页
    lastLettersPressed: [],   // 最后按下的字母
    targetWord: "johnson",     // 目标单词
    wordsSpelled: 0,          // 已拼写单词数
    currentTime: new Date().getTime(), // 当前时间
    showBuiltInSaves: false,  // 显示内置存档
    dev: {},                  // 开发者数据
    spaceBarPauses: false,    // 空格暂停
    paused: false,            // 暂停状态
    shiftAlias: false,        // Shift别名
    controlAlias: false,      // Control别名
    CUSTOM_SAVES_PAGE: 0,     // 自定义存档页
    CHANGELOG_PAGE: 0,        // 更新日志页
}}

// 获取最后保存时间显示
function getLastSaveDisplay(a){
    return "最后保存于: " + formatTime((new Date().getTime()-player.lastSave)/1000, a) + "前。"
}

// 在页面顶部显示额外信息
var displayThings = [
    function(){
        list1 = []
        if (shiftDown) list1.push("S")
        if (controlDown) list1.push("C")
        if (player.undulating) list1.push("U")
        if (!player.arrowHotkeys) list1.push("¬A")
        if (!player.spaceBarPauses) list1.push("¬P")
        
        let end = ""
        if (list1.length > 0) end = "(" + combineStrings(list1) + ")"
        let saveFinal = getLastSaveDisplay() + end

        let len = pastTickTimes.length
        if (len <= 3) return saveFinal
        let a = 0
        for (i = 0; i < len; i++){
            a += pastTickTimes[i]
        }

        let val = Math.round(a/len)
        let p1 = ""
        let p2 = ""
        if (val > 50) {
            p1 = "<bdi style='color: #CC0000'>"
            p2 = "</bdi>"
        }

        let msptFinal = " 毫秒/帧 = " + p1 + formatWhole(val) + p2+"（翻译质量一般，建议结合原文）"
        return saveFinal + msptFinal
    }, 
    function(){
        if (paused || player.paused) return "<bdi style='color:#CC0033'>游戏已暂停</bdi>"
        if (player.keepGoing && isEndgameRaw()) return makeBlue("您已超过游戏终点，<br>此处游戏可能不平衡。")
    },
]

var backgroundStyle = {

}

// 设置最大帧时长（防止长时间帧导致问题）
function maxTickLength() {
    return 1 // 默认为1小时，这个值足够大
}

var controlDown = false
var shiftDown = false
var logKeyCode = false

// 检查是否拼出特定单词
function hasSpelledWord(word){
    let l = word.length
    if (l > 25) {
        console.log("单词过长")
        return false
    }
    for (i = 0; i < l; i++){
        let id = 25 - l + i
        let is = player.lastLettersPressed[id]
        let shouldbe = word[i]
        if (is != shouldbe) return false
    }
    return true
} 

// 将键码转换为字母
function getLetterFromNum(x){
    return {
        32: " ", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e",
        70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k",
        76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q",
        82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w",
        88: "x", 89: "y", 90: "z",
    }[x]
}

// 键盘按下事件监听
window.addEventListener('keydown', function(event) {
    code = event.keyCode
    if (player.toggleKeys) {
        if (code == 16) shiftDown = !shiftDown;
        if (code == 17) controlDown = !controlDown;
    } else {
        if (code == 16) shiftDown = true;
        if (code == 17) controlDown = true;
    }
    if (logKeyCode) console.log(code)
    if ((code >= 65 && code <= 90) || code == 32) {
        player.lastLettersPressed.push(getLetterFromNum(code))
        let l = player.lastLettersPressed.length
        if (l > 25) {
            player.lastLettersPressed = player.lastLettersPressed.slice(l-25,)
        }
    }
}, false);

// 键盘释放事件监听
window.addEventListener('keyup', function(event) {
    if (player != undefined && player.toggleKeys) return 
    if (event.keyCode == 16) shiftDown = false;
    if (event.keyCode == 17) controlDown = false;
}, false);

// 切换Shift状态
function toggleShift(){
    shiftDown = !shiftDown
}

// 切换Control状态
function toggleControl(){
    controlDown = !controlDown
}

// 切换波动效果
function toggleUndulating(){
    player.undulating = !player.undulating
}

// 切换箭头快捷键
function toggleArrowHotkeys(){
    player.arrowHotkeys = !player.arrowHotkeys
}