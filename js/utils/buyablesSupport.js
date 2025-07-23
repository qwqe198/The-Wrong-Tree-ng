/*
key = [buyable layer][buyable id] i.e. a11 or b23
data = [another key]: function
*/

var MAIN_BUYABLE_DATA = {
        a11: {
                name: "A 11",
                func: "exp",
                effects: "points",
                base: {
                        initial: new Decimal(1.5),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["a13"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b21"]
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b32"]
                                },
                        },
                        4: {
                                active(){
                                        return hasUpgrade("a", 44)
                                },
                                type: "mult",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b31"]
                                },
                        }
                },
                bases(){
                        let b0 = new Decimal(30)
                        let b1 = new Decimal(1.1)
                        let b2 = new Decimal(1.001)
                        if (hasUpgrade("a", 21)) b0 = decimalOne
                        if (hasUpgrade("a", 22)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a12: {active:() => hasUpgrade("b", 43)},
                a13: {active:() => hasMilestone("b", 1)},
                a22: {active:() => hasUpgrade("b", 13)},
        },
        a12: {
                name: "A 12",
                func: "exp",
                effects: "Alligators",
                base: {
                        initial: new Decimal(1.3),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["a21"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b21"]
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(200)
                        let b1 = new Decimal(1.3)
                        let b2 = new Decimal(1.003)
                        if (hasUpgrade("a", 21)) b0 = decimalOne
                        if (hasUpgrade("b", 11)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a21: {active:() => hasUpgrade("b", 21)},
                a22: {active:() => hasMilestone("c", 1)},
                a31: {active:() => hasMilestone("b", 6)},
                a32: {active:() => hasMilestone("b", 4)},
        },
        a13: {
                name: "A 13",
                func: "lin",
                effects: "A 11 base",
                base: {
                        initial: new Decimal(.03),
                        1: {
                                active(){
                                        return hasUpgrade("a", 15)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.005)
                                },
                        },
                        2: {
                                active(){
                                        return hasUpgrade("a", 25)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.01).times(player.a.upgrades.length)
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b21"]
                                },
                        },
                        4: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c12"]
                                },
                        },
                        5: {
                                activation(){
                                        return hasUpgrade("a", 45)
                                },
                                type: "mult",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b31"]
                                },
                        }
                },
                bases(){
                        let b0 = new Decimal(300)
                        let b1 = new Decimal(1.5)
                        let b2 = new Decimal(1.01)
                        if (hasUpgrade("a", 21)) b0 = decimalOne
                        if (hasMilestone("a", 3)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a21: {active:() => hasUpgrade("b", 21)},
                a22: {active:() => hasUpgrade("b", 13)},
                a32: {active:() => hasUpgrade("b", 15)},
        },
        a21: {
                name: "A 21",
                func: "lin",
                effects: "A 12 base",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return hasMilestone("a", 1)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.001 * player.a.milestones.length)
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b22"]
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b32"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(5e16)
                        let b1 = new Decimal(3)
                        let b2 = new Decimal(1.03)
                        if (hasUpgrade("a", 25)) b0 = decimalOne
                        if (hasUpgrade("a", 31)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a22: {active:() => hasUpgrade("c", 14)},
                a31: {active:() => hasUpgrade("a", 41)},
                a32: {active:() => hasUpgrade("b", 15)},
        },
        a22: {
                name: "A 22",
                func: "lin",
                effects: "A-ligator effect exponent",
                base: {
                        initial: new Decimal(.3),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b22"]
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e34)
                        let b1 = new Decimal(2)
                        let b2 = new Decimal(1.05)
                        if (hasUpgrade("a", 23)) b0 = decimalOne
                        if (hasMilestone("a", 4)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a23: {active:() => hasUpgrade("a", 31)},
                a31: {active:() => hasUpgrade("b", 14)},
                a32: {active:() => hasUpgrade("b", 12)},
        },
        a23: {
                name: "A 23",
                func: "lin",
                effects: "Alligator effect exponent",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b22"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c12"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e55)
                        let b1 = new Decimal(6)
                        let b2 = new Decimal(1.1)
                        if (hasUpgrade("a", 24)) b0 = decimalOne
                        if (hasMilestone("b", 2)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a31: {active:() => hasMilestone("b", 3)},
                a32: {active:() => hasUpgrade("b", 41)},
        },
        a31: {
                name: "A 31",
                func: "lin",
                effects: "Alligator gain exponent",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b32"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e84)
                        let b1 = new Decimal(10)
                        let b2 = new Decimal(1.2)
                        if (hasUpgrade("a", 35)) b0 = decimalOne
                        if (hasMilestone("b", 6)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                a32: {active:() => hasMilestone("b", 5)},
        },
        a32: {
                name: "A 32",
                func: "linp1",
                effects: "pre-exp Alligator gain",
                base: {
                        initial: new Decimal(.2),
                        1: {
                                active(){
                                        return hasUpgrade("b", 14)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(player.b.upgrades.length).div(5)
                                }
                        },
                        2: {
                                active(){
                                        return hasMilestone("b", 7)
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b21"]
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e138)
                        let b1 = new Decimal(200)
                        let b2 = new Decimal(1.5)
                        if (hasUpgrade("a", 35)) b0 = decimalOne
                        if (hasMilestone("b", 6)) b1 = decimalOne
                        if (hasMilestone("b", 11)) b2 = new Decimal(1.3)
                        return [b0, b1, b2]
                },
                b12: {active:() => hasUpgrade("a", 34)},
        },
        a33: {
                name: "A 33",
                func: "exp",
                effects: "Alligators per upgrade",
                base: {
                        initial: new Decimal(1.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c12"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "mult",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b33"].pow(player.b.upgrades.length)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e214)
                        let b1 = new Decimal(5e12)
                        let b2 = new Decimal(2)
                        if (hasUpgrade("a", 35)) b0 = decimalOne
                        if (hasMilestone("b", 6)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b11: {active:() => hasUpgrade("c", 15)},
                b21: {active:() => hasUpgrade("b", 25)},
        },
        b11: {
                name: "B 11",
                func: "exp",
                effects: "Beavers",
                base: {
                        initial: new Decimal(1.4),
                        1: {
                                active() {
                                        return hasUpgrade("b", 24)
                                },
                                type: "add",
                                amount(){
                                        return player.b.buyables[12].sub(50).max(0).div(100)
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b22"]
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b32"]
                                },
                        },
                        4: {
                                active(){
                                        return hasMilestone("c", 17)
                                },
                                type: "pow",
                                amount(){
                                        return new Decimal(2)
                                },
                        },
                        5: {
                                active(){
                                        return hasMilestone("c", 28)
                                },
                                type: "pow",
                                amount(){
                                        return getBuyableAmount("c", 33).max(1).pow(getBuyableAmount("c", 33).gte(69) ? .76 : .5)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e8)
                        let b1 = new Decimal(1.5)
                        let b2 = new Decimal(1.01)
                        if (hasUpgrade("a", 41)) b0 = decimalOne
                        if (hasMilestone("b", 11)) b1 = new Decimal(1.3)
                        if (hasMilestone("b", 13)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b12: {active:() => hasMilestone("c", 10)},
                b13: {active:() => hasUpgrade("b", 22)},
                b21: {active:() => hasMilestone("b", 7)},
                b22: {active:() => hasMilestone("c", 26)},
        },
        b12: {
                name: "B 12",
                func: "exp",
                effects: "Alligators",
                base: {
                        initial: new Decimal(1e10),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c13"]
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("c", 19)
                                },
                                type: "exp",
                                amount(){
                                        return getBuyableAmount("c", 33).max(1)
                                },
                        },
                        3: {
                                active(){
                                        return inChallenge("c", 12)
                                },
                                type: "exp",
                                amount(){
                                        return decimalZero
                                },
                        },
                        4: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(2e8)
                        let b1 = new Decimal(1)
                        let b2 = new Decimal(1.02)
                        if (hasMilestone("b", 9)) b0 = decimalOne
                        return [b0, b1, b2]
                },
                b13: {active:() => hasMilestone("b", 9)},
                b21: {active:() => hasMilestone("b", 7)},
                b22: {active:() => hasUpgrade("a", 42)},
                b23: {active:() => hasMilestone("c", 23)},
        },
        b13: {
                name: "B 13",
                func: "lin",
                effects: "Beaver effect exponent",
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return hasMilestone("c", 6)
                                },
                                type: "add",
                                amount(){
                                        return player.c.milestones.length
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c12"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e17)
                        let b1 = new Decimal(3)
                        let b2 = new Decimal(1.03)
                        if (hasMilestone("b", 10)) b0 = decimalOne
                        if (hasUpgrade("c", 12)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b21: {active:() => hasMilestone("c", 11)},
                b22: {active:() => hasUpgrade("b", 34)},
                b23: {active:() => hasMilestone("c", 20)},
                b31: {active:() => hasUpgrade("a", 44)},
        },
        b21: {
                name: "B 21",
                func: "lin",
                effects: "A 1X bases",
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b32"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e50)
                        let b1 = new Decimal(5)
                        let b2 = new Decimal(1.05)
                        if (hasMilestone("c", 2)) b0 = decimalOne
                        if (hasUpgrade("c", 15)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b22: {active:() => hasUpgrade("a", 53)},
                b23: {active:() => hasUpgrade("a", 43)},
                b31: {active:() => hasUpgrade("a", 45)},
                b32: {active:() => hasMilestone("c", 20)},
        },
        b22: {
                name: "B 22",
                func: "lin",
                effects: "A 2X and B 11 bases",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c13"]
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e113)
                        let b1 = new Decimal(50)
                        let b2 = new Decimal(1.08)
                        if (hasUpgrade("c", 13)) b0 = decimalOne
                        if (hasUpgrade("c", 15)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b23: {active:() => hasUpgrade("b", 35)},
                b31: {active:() => hasUpgrade("b", 31)},
                b32: {active:() => hasMilestone("c", 4)},
        },
        b23: {
                name: "B 23",
                func: "lin",
                effects: "Beaver gain exponent",
                base: {
                        initial: new Decimal(.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c12"]
                                },
                        },
                        2: {
                                active(){
                                        return inChallenge("c", 11)
                                },
                                type: "times",
                                amount(){
                                        return decimalZero
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e200)
                        let b1 = new Decimal(1e7)
                        let b2 = new Decimal(1.13)
                        if (hasUpgrade("c", 14)) b0 = decimalOne
                        if (hasUpgrade("c", 15)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b31: {active:() => hasMilestone("c", 15)},
                b32: {active:() => hasMilestone("c", 5)},
        },
        b31: {
                name: "B 31",
                func: "exp",
                effects: "Beavers and base Alligators",
                base: {
                        initial: new Decimal(5),
                        1: {
                                active(){
                                        return hasUpgrade("a", 42)
                                },
                                type: "add",
                                amount(){
                                        return player.a.upgrades.filter(x => x > 40 && x < 50).length
                                }
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["b32"]
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c31"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e256)
                        let b1 = new Decimal(1e10)
                        let b2 = new Decimal(1.21) // fibonacci
                        if (hasUpgrade("c", 15)) b0 = decimalOne
                        if (hasUpgrade("c", 22)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                b32: {active:() => hasMilestone("b", 12)},
        },
        b32: {
                name: "B 32",
                func: "lin",
                effects: "Prior left column bases",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c13"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c31"]
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e1107")
                        let b1 = new Decimal(1e23)
                        let b2 = new Decimal(1.34) // fibonacci
                        if (hasMilestone("c", 6)) b0 = decimalOne
                        if (hasMilestone("c", 8)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                c12: {active:() => hasUpgrade("c", 21)},
        },
        b33: {
                name: "B 33",
                func: "exp",
                effects: "Beaver gain and A 33 base per upgrade",
                base: {
                        initial: new Decimal(1.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c12"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c31"]
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c33"].pow(player.c.upgrades.length)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("5e1371")
                        let b1 = new Decimal(1e161)
                        let b2 = new Decimal(1.55) // fibonacci
                        if (hasMilestone("c", 7)) b0 = decimalOne
                        if (hasMilestone("c", 9)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                c11: {active:() => hasUpgrade("b", 33)},
                c13: {active:() => hasMilestone("c", 8)},
        },
        c11: {
                name: "C 11",
                func: "exp",
                effects: "Capybara gain",
                base: {
                        initial: new Decimal(1.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c13"]
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return tmp.c.challenges[11].rewardEffect
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("e", 10)
                                },
                                type: "exp",
                                amount(){
                                        return player.e.milestones.length
                                },
                        },
                        /*
                        4: {
                                active(){
                                        return hasMilestone("e", 28)
                                },
                                type: "exp",
                                amount(){
                                        return getBuyableAmount("d", 31).max(1)
                                },
                        },*/
                },
                bases(){
                        let b0 = new Decimal(1e17)
                        let b1 = new Decimal(1.3)
                        let b2 = new Decimal(1.001) // 2**x
                        if (hasUpgrade("c", 23)) b0 = decimalOne
                        if (hasMilestone("d", 1)) b1 = b1.sub(.01)
                        if (hasMilestone("c", 14)) {
                                b1 = b1.sub(getBuyableAmount("c", 22).div(1e4)).max(1)
                                if (hasUpgrade("b", 42) && !hasUpgrade("b", 45)) {
                                        b1 = b1.sub(getBuyableAmount("c", 32).sub(26).max(0).div(1e4)).max(1)
                                }
                        }
                        return [b0, b1, b2]
                },
                c12: {active:() => hasMilestone("d", 10) && player.d.buyables[11].gte(1000)},
                c13: {active:() => hasUpgrade("b", 55)},
                c21: {active:() => hasUpgrade("b", 54)},
        },
        c12: {
                name: "C 12",
                func: "lin",
                effects: "Previous Right Column bases",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return hasUpgrade("b", 32) && hasMilestone("c", 11)
                                },
                                type: "add",
                                amount(){
                                        return player.b.upgrades.filter(x => x > 30).length / 1e4
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c32"]
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e18)
                        let b1 = new Decimal(1.5)
                        let b2 = new Decimal(1.002) // 2**x
                        if (hasMilestone("c", 9)) b0 = decimalOne
                        if (hasUpgrade("b", 32)) b1 = decimalOne
                        return [b0, b1, b2]
                },
                c13: {active:() => hasMilestone("c", 8)},
                c21: {active:() => hasUpgrade("c", 25)},
                c22: {active:() => hasChallenge("c", 12)},
        },
        c13: {
                name: "C 13",
                func: "lin",
                effects: "C 11 and B X2 bases",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return hasUpgrade("b", 32)
                                },
                                type: "add",
                                amount(){
                                        return player.b.upgrades.filter(x => x > 30).length / 1e4
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("d", 6)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d12"]
                                },
                        },
                        4: {
                                active(){
                                        return hasUpgrade("d", 31)
                                },
                                type: "exp",
                                amount(){
                                        return getBuyableAmount("d", 11).cbrt().max(1)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e39)
                        let b1 = new Decimal(100)
                        let b2 = new Decimal(1.004) // 2**x
                        if (hasUpgrade("a", 51)) b0 = decimalOne
                        if (hasMilestone("c", 29)) b1 = b1.sub(getBuyableAmount("c", 33).sub(72).max(0).pow(.8).times(6)).max(15)
                        if (hasUpgrade("d", 11)) b1 = b1.sub(getBuyableAmount("c", 33).sub(150).max(0).div(10)).max(1)
                        return [b0, b1, b2]
                },
                c21: {active:() => hasUpgrade("b", 53)},
                c22: {active:() => hasUpgrade("b", 52)},
                c23: {active:() => hasUpgrade("c", 33)},
        },
        c21: {
                name: "C 21",
                func: "lin",
                effects: "Capybara Gain exponent",
                base: {
                        initial: new Decimal(.13),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c32"].min(hasUpgrade("d", 13) ? .27 : .07)
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d13"]
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d22"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e1108")
                        let b1 = new Decimal(1e4)
                        let b2 = new Decimal(1.008) // 2**x
                        if (hasUpgrade("a", 55)) {
                                b1 = b1.sub(getBuyableAmount("c", 12)).max(1)
                                if (hasUpgrade("b", 42) && !hasUpgrade("b", 45)) {
                                        b1 = b1.sub(getBuyableAmount("c", 32).sub(26).max(0)).max(1)
                                }
                        }
                        if (hasUpgrade("c", 24)) b0 = b0.div(getBuyableAmount("c", 31).pow10()).max(1)
                        return [b0, b1, b2]
                },
                c22: {active:() => hasMilestone("d", 9)},
                c23: {active:() => hasUpgrade("d", 22)},
                c31: {active:() => hasMilestone("d", 8)},
        },
        c22: {
                name: "C 22",
                func: "exp",
                effects: "Capybara and Base Beaver gain",
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return hasMilestone("c", 10)
                                },
                                type: "add",
                                amount(){
                                        return player.c.milestones.length / 100
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return tmp.c.challenges[11].rewardEffect
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("d", 2)
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["c32"].sub(.05).max(0)
                                },
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 5)
                                },
                                type: "exp",
                                amount(){
                                        return 2
                                },
                        },
                        5: {
                                active(){
                                        return hasMilestone("d", 22)
                                },
                                type: "exp",
                                amount(){
                                        return getBuyableAmount("d", 21).plus(1).sqrt()
                                },
                        },
                        6: {
                                active(){
                                        return hasUpgrade("e", 24)
                                },
                                type: "exp",
                                amount(){
                                        return Decimal.pow(3, player.e.upgrades.length)
                                },
                        },
                        7: {
                                active(){
                                        return hasMilestone("e", 55)
                                },
                                type: "exp",
                                amount(){
                                        return player.e.points.plus(10).log10()
                                },
                        },
                        8: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e2024")
                        let b1 = new Decimal(1e5)
                        let b2 = new Decimal(1.016) // 2**x
                        if (hasUpgrade("c", 24)) b0 = b0.div(getBuyableAmount("c", 31).pow10()).max(1)
                        
                        if (hasChallenge("c", 12)) {
                                function g(x) {return getBuyableAmount("c", x)}
                                let a = g(11).plus(g(12)).plus(g(13)).plus(g(21)).plus(g(22)).plus(g(23)).plus(g(31)).plus(g(32)).plus(g(33))
                                b1 = b1.sub(a.times(tmp.c.challenges[12].rewardEffect).floor()).max(900)
                        }
                        if (hasMilestone("c", 27)) b1 = b1.div(Decimal.pow(1.4, getBuyableAmount("c", 33).sub(65).max(0))).max(1)
                        return [b0, b1, b2]
                },
                c23: {active:() => hasMilestone("c", 12)},
                c31: {active:() => hasUpgrade("c", 32)},
                c32: {active:() => player.c.challenges[21] >= 3},
        },
        c23: {
                name: "C 23",
                func: "linp1",
                effects: "Capybara effect exponent",
                base: {
                        initial: new Decimal(500),
                        1: {
                                active(){
                                        return hasUpgrade("a", 54)
                                },
                                type: "add",
                                amount(){
                                        return getBuyableAmount("c", 23)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e3131")
                        let b1 = new Decimal(1e6)
                        let b2 = new Decimal(1.032) // 2**x
                        if (hasMilestone("c", 13)) b1 = b1.sub(getBuyableAmount("b", 33)).max(25e3)
                        if (hasMilestone("c", 21)) {
                                b1 = b1.div(Decimal.pow(2.5, getBuyableAmount("c", 33).sub(33).max(0))).max(1)
                        }
                        if (hasMilestone("c", 16)) if (hasUpgrade("c", 24)) b0 = b0.div(getBuyableAmount("c", 31).pow10()).max(1)
                        return [b0, b1, b2]
                },
                c31: {active:() => hasUpgrade("d", 14)},
                c32: {active:() => player.c.challenges[21] >= 2},
        },
        c31: {
                name: "C 31",
                func: "linp1",
                effects: "B 3X bases and base Capybara gain",
                base: {
                        initial: new Decimal(.05),
                        1: {
                                active(){
                                        return hasMilestone("c", 29)
                                },
                                type: "add",
                                amount(){
                                        return getBuyableAmount("c", 33).sub(74).max(0).times(.0008)
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "exp",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d23"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e3727")
                        let b1 = new Decimal(1e10)
                        let b2 = new Decimal(1.064) // 2**x
                        if (hasMilestone("c", 24)) b0 = b0.div(getBuyableAmount("c", 32).pow10()).max(1)
                        if (hasMilestone("c", 26)) b1 = b1.div(Decimal.pow(40, getBuyableAmount("c", 33).sub(54).max(0).pow(.8))).max(1)
                        return [b0, b1, b2]
                },
                c32: {active:() => player.c.challenges[21] >= 1},
                d12: {active:() => hasMilestone("e", 9)},
        },
        c32: {
                name: "C 32",
                func: "lin",
                effects: "C 12 and C 21 [max .07] bases",
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasUpgrade("c", 41)
                                },
                                type: "mult",
                                amount(){
                                        return Decimal.pow(1.2, player.c.upgrades.length)
                                }
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d22"]
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e5078")
                        let b1 = new Decimal(3e7)
                        let b2 = new Decimal(1.128) // 2**x
                        if (hasMilestone("c", 25)) b0 = b0.div(getBuyableAmount("c", 33).pow10()).max(1)
                        if (hasMilestone("c", 19)) b1 = b1.sub(getBuyableAmount("b", 33)).max(1e5)
                        if (hasMilestone("d", 4)) {
                                b1 = b1.div(Decimal.pow(1.02, player.d.times ** 1.5)).max(1)
                        }
                        if (player.d.everU15) b0 = decimalOne
                        return [b0, b1, b2]
                },
                d11: {active:() => hasMilestone("e", 3)},
                d12: {active:() => hasMilestone("e", 2)},
        },
        c33: {
                name: "C 33",
                func: "exp",
                effects: "Capybara gain and B 33 base per upgrade",
                base: {
                        initial: new Decimal(1.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return tmp.c.challenges[11].rewardEffect
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("c", 22)
                                },
                                type: "add",
                                amount(){
                                        return .015 * Math.max(player.c.milestones.length - 21, 0)
                                },
                        },
                        3: {
                                active(){
                                        return player.c.challenges[21] >= 4
                                },
                                type: "add",
                                amount(){
                                        return player.c.challenges[21] - 3
                                },
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 1)
                                },
                                type: "add",
                                amount(){
                                        return 1.5
                                },
                        },
                        5: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d33"].pow(player.d.upgrades.length)
                                },
                        },
                        6: {
                                active(){
                                        return hasMilestone("d", 10)
                                },
                                type: "exp",
                                amount(){
                                        return player.d.milestones.length
                                },
                        },
                        7: {
                                active(){
                                        return hasUpgrade("d", 32)
                                },
                                type: "exp",
                                amount(){
                                        return getBuyableAmount("d", 12).cbrt().max(1)
                                }
                        },
                        8: {
                                active(){
                                        return hasUpgrade("e", 24)
                                },
                                type: "exp",
                                amount(){
                                        return Decimal.pow(3, player.e.upgrades.length)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e6067")
                        let b1 = new Decimal(1e69)
                        let b2 = new Decimal(1.256) // 2**x
                        
                        if (hasMilestone("c", 31))      b1 = b1.div(Decimal.pow(2.041, getBuyableAmount("c", 33).sub(100).max(0))).max(1e58)
                        if (hasMilestone("d", 5)){
                                b1 = b1.div(Decimal.pow10(player.d.milestones.length)).max(1)
                                if (hasUpgrade("b", 51)) b1 = b1.div(Decimal.pow10(player.d.upgrades.length))
                        }
                        if (hasUpgrade("d", 13))        b1 = b1.div(Decimal.pow10(player.d.points.div(1e10).max(1).log10().floor())).max(1)
                        if (hasMilestone("d", 7))       b0 = b0.div(player.d.points.max(1).pow(player.d.times))
                        if (hasUpgrade("e", 14))        b0 = b0.times(Decimal.pow(1e7, player.e.upgrades.length))

                        return [b0.max(1), b1.max(1), b2]
                },
                d11: {active:() => hasUpgrade("c", 34)},
                d12: {active:() => hasMilestone("e", 9)},
                d13: {active:() => hasUpgrade("d", 23) && player.d.points.gte("1e600")},
        },
        d11: {
                name: "D 11",
                func: "exp",
                effects: "Duck gain",
                base: {
                        initial: new Decimal(1.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d12"]
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("d", 13) && player.d.points.gte("1e1111")
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(-.1)
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d22"]
                                },
                        },
                        4: {
                                active(){
                                        return hasMilestone("d", 21)
                                },
                                type: "add",
                                amount(){
                                        return -.1
                                },
                        },
                        5: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["d31"]
                                },
                        },
                        6: {
                                active(){
                                        return hasMilestone("e", 34)
                                },
                                type: "add",
                                amount(){
                                        return -1
                                },
                        },
                        7: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e22"]
                                },
                        },
                        8: {
                                active(){
                                        return hasUpgrade("E", 13)
                                },
                                type: "times",
                                amount(){
                                        return Decimal.pow(7, player.E.upgrades.length - 2).max(1)
                                }
                        },
                        9: {
                                active(){
                                        return hasUpgrade("d", 51)
                                },
                                type: "exp",
                                amount(){
                                        return player.T.points.max(1).pow(2)
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e33)
                        if (hasUpgrade("d", 23) && player.d.points.gte("1e600")) b0 = b0.times(1e100)
                        if (hasUpgrade("c", 45))        b0 = b0.times(getBuyableAmount("d", 22).sub(160).div(10).max(0).min(10).floor().times(4).pow10())
                        if (hasMilestone("d", 18))      b0 = b0.times(1e18)
                        if (hasMilestone("d", 11))      b0 = b0.div(Decimal.pow(player.f.unlocked ? 1.04 : 1.03, getBuyableAmount("d", 13)))
                        if (hasUpgrade("e", 14))        b0 = b0.times(Decimal.pow(1e7, player.e.upgrades.length))
                        if (hasUpgrade("c", 55) && !player.f.unlocked)        b0 = b0.times(1e140)
                        
                        let b1 = new Decimal(1.25)
                        b1 = b1.sub(CURRENT_BUYABLE_EFFECTS["d13"]).max(1)
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        let b2 = new Decimal(1.0001) // 3**x

                        return [b0.max(1), b1.max(1), b2]
                },
                d12: {active:() => hasMilestone("e", 75)},
                d13: {active:() => hasUpgrade("d", 23) && player.d.points.gte("1e600")},
                d21: {active:() => hasUpgrade("d", 25)},
                d22: {active:() => hasMilestone("e", 7) && !hasMilestone("e", 75)},
                d23: {active:() => hasMilestone("d", 25) && !hasMilestone("e", 27)},
        },
        d12: {
                name: "D 12",
                func: "lin",
                effects: "D 11 and C 13 bases",
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e91)
                        if (hasUpgrade("c", 45)) b0 = b0.times(getBuyableAmount("d", 22).sub(160).div(10).max(0).min(10).floor().times(4).pow10())
                        if (hasMilestone("d", 16)) {
                                b0 = b0.times(1e21)
                                if (player.d.points.gte("1e13475")) b0 = b0.times(1e21)
                        }
                        if (hasMilestone("d", 18))      b0 = b0.times(1e18)
                        if (hasMilestone("d", 11))      b0 = b0.div(Decimal.pow(player.f.unlocked ? 1.04 : 1.03, getBuyableAmount("d", 13)))
                        if (hasUpgrade("e", 14))        b0 = b0.times(Decimal.pow(1e7, player.e.upgrades.length))
                        if (hasUpgrade("c", 55) && !player.f.unlocked)        b0 = b0.times(1e140)

                        let b1 = new Decimal(1)
                        let b2 = new Decimal(1.0003) // 3**x

                        return [b0.max(1), b1, b2]
                },
                d13: {active:() => hasMilestone("e", 61) || (hasMilestone("d", 13) && player.d.points.gte("1e1111") && !hasMilestone("e", 33))},
                d21: {active:() => hasUpgrade("d", 25)},
                d22: {active:() => hasMilestone("d", 20) && player.d.points.gte("1e15000")},
                d23: {active:() => hasMilestone("d", 23) && player.d.points.gte("1e31304") && !hasMilestone("e", 61)},
        },
        d13: {
                name: "D 13",
                func: "lin",
                effects: "C 21 base and minus D 11 linear cost base",
                base: {
                        initial: new Decimal(.001),
                        1: {
                                active(){
                                        return player.e.unlocked && hasUpgrade("c", 35)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        2: {
                                active(){
                                        return hasUpgrade("e", 11)
                                },
                                type: "add",
                                amount(){
                                        return player.e.upgrades.length / 10000
                                },
                        },
                        3: {
                                active(){
                                        return hasUpgrade("d", 33)
                                },
                                type: "add",
                                amount(){
                                        return .0004
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e191)
                        let b1 = new Decimal(8)
                        let b2 = new Decimal(1.0009) // 3**x

                        if (hasMilestone("d", 12)) {
                                b1 = b1.sub(CURRENT_BUYABLE_EFFECTS["d13"])
                                b0 = b0.div(Decimal.pow(player.f.unlocked ? 1.04 : 1.03, getBuyableAmount("d", 13)))
                        }
                        if (hasUpgrade("e", 14))        b0 = b0.times(Decimal.pow(1e7, player.e.upgrades.length))
                        if (hasUpgrade("c", 55) && !player.f.unlocked)        b0 = b0.times(1e140)
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        return [b0.max(1), b1.max(1), b2]
                },
                d21: {active:() => hasUpgrade("d", 25)},
                d22: {active:() => hasMilestone("d", 21)},
                d23: {active:() => hasMilestone("d", 23)},
        },
        d21: {
                name: "D 21",
                func: "lin",
                effects:() => hasMilestone("e", 45) ? "Duck exponent" : "Base Ducks and Duck exponent",
                base: {
                        initial: new Decimal(.001),
                        1: {
                                active(){
                                        return hasUpgrade("c", 45)
                                },
                                type: "add",
                                amount(){
                                        return getBuyableAmount("d", 22).sub(160).div(10).max(0).min(10).floor().div(1e4)
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("d", 19)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.0005)
                                },
                        },
                        3: {
                                active(){
                                        return hasUpgrade("e", 14)
                                },
                                type: "add",
                                amount(){
                                        return player.e.upgrades.length / 1e4
                                },
                        },
                        4: {
                                active(){
                                        return hasUpgrade("d", 41)
                                },
                                type: "mult",
                                amount(){
                                        return 2
                                },
                        },
                        5: {
                                active(){
                                        return hasMilestone("e", 35) && !hasMilestone("f", 5)
                                },
                                type: "add",
                                amount(){
                                        return -.0035
                                }
                        },
                        6: {
                                active(){
                                        return hasMilestone("e", 45)
                                },
                                type: "add",
                                amount(){
                                        return .0003 + (player.e.points.gte("1e1402") ? .0001 : 0) + (player.e.points.gte("1e1428") ? .0001 : 0)
                                },
                        },
                        7: {
                                active(){
                                        return hasMilestone("e", 48)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        8: {
                                active(){
                                        return hasMilestone("e", 49)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        9: {
                                active(){
                                        return hasMilestone("e", 50)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        10: {
                                active(){
                                        return hasMilestone("e", 51)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        11: {
                                active(){
                                        return hasMilestone("e", 52)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        12: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e22"]
                                },
                        },
                        13: {
                                active(){
                                        return true 
                                },
                                type: "max",
                                amount(){
                                        return 0
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e745")
                        let b1 = new Decimal(1e6)
                        let b2 = new Decimal(1.0027) // 3**x

                        if (hasMilestone("d", 13) && player.d.points.gte("1e1111")) {
                                                        b0 = b0.div(1e145)
                        }
                        if (hasMilestone("d", 16) && !hasMilestone("d", 21)) {
                                                        b0 = b0.div(Decimal.pow(1 + player.d.milestones.length / 400, getBuyableAmount("d", 22)))
                        }
                        if (hasUpgrade("c", 44)) {
                                                        b0 = b0.times(Decimal.pow(.99, getBuyableAmount("d", 12).sub(1e4).max(0)).pow(1 + player.d.points.gte("1e14042") + player.d.points.gte("14126")))
                        }
                        if (hasUpgrade("e", 22))        b0 = b0.times(Decimal.pow(1e25, player.e.upgrades.length))

                        if (hasMilestone("d", 14))      b1 = b1.sub(getBuyableAmount("c", 21)).max(1e5)
                        else if (hasUpgrade("d", 24))   b1 = b1.sub(getBuyableAmount("c", 11)).max(1e5)
                        if (hasUpgrade("c", 42))        b1 = b1.times(Decimal.pow(.9999, getBuyableAmount("d", 11).sub(15000).max(0))).max(1)
                        if (hasMilestone("d", 24) && player.d.points.gte("1e32232")) {
                                                        b1 = b1.times(.999)
                                if (player.d.points.gte("1e32305")) b1 = b1.times(.999)
                        }
                                                        b1 = b1.div(Decimal.exp(CURRENT_BUYABLE_EFFECTS["d31"]))
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        

                        return [b0.max(1), b1.max(1), b2]
                },
                d23: {active:() => hasMilestone("d", 24)},
                d31: {active:() => hasMilestone("e", 21)},
                d32: {active:() => hasMilestone("e", 35)},
        },
        d22: {
                name: "D 22",
                func: "lin",
                effects: "D 11, C 32 and C 21 Base",
                base: {
                        initial: new Decimal(.0003),
                        1: {
                                active(){
                                        return hasMilestone("e", 6)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("e", 27)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                }
                        },
                        3: {
                                active(){
                                        return hasMilestone("e", 35) && !hasMilestone("e", 57) && !hasMilestone("f", 5)
                                },
                                type: "add",
                                amount(){
                                        return -.0001
                                }
                        },
                        4: {
                                active(){
                                        return true
                                },
                                type: "plus",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e31"]
                                }
                        },
                        5: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e12782")
                        let b1 = new Decimal(1e9)
                        let b2 = new Decimal(1.0081) // 3**x

                        if (hasUpgrade("c", 44)) {
                                b0 = b0.times(Decimal.pow(.99, getBuyableAmount("d", 12).sub(1e4).max(0)).pow(1 + player.d.points.gte("1e14042") + player.d.points.gte("14126")))
                        }
                        if (hasMilestone("d", 21)) b0 = b0.div("1e2182")
                        if (hasUpgrade("e", 22)) b0 = b0.times(Decimal.pow(1e25, player.e.upgrades.length))
                        
                        if (hasMilestone("e", 7))       b1 = new Decimal(1e14).times(Decimal.pow(.999, getBuyableAmount("d", 22)))
                        else if (hasMilestone("e", 6))  b1 = new Decimal(7e10)
                        else {
                                if (hasMilestone("d", 15)) {
                                        b1 = b1.div(2)
                                        if (player.d.points.gte("1e12859")) b1 = b1.div(2)
                                        if (player.d.points.gte("1e13059")) b1 = b1.div(2)
                                }
                                if (hasMilestone("d", 16)) {
                                        b1 = b1.div(2)
                                        if (player.d.points.gte("1e13475")) b1 = b1.div(2)
                                }
                                if (hasMilestone("d", 17)) {
                                        b1 = b1.sub(125e4)
                                        if (getBuyableAmount("d", 22).gte(203)) b1 = b1.sub(125e4)
                                        if (getBuyableAmount("d", 22).gte(214)) b1 = b1.sub(125e4)
                                        if (getBuyableAmount("d", 22).gte(215)) b1 = b1.sub(125e4)
                                        if (getBuyableAmount("d", 22).gte(226)) b1 = b1.sub(125e4)
                                }
                                if (hasMilestone("d", 20) && player.d.points.gte("1e15000")) b1 = b1.times(6)
                        }

                        if (hasMilestone("d", 21))      b1 = b1.times(1e5)
                        if (hasMilestone("e", 13))      b1 = b1.div(6)
                        if (hasUpgrade("e", 21))        b1 = b1.times(Decimal.pow(.9999, getBuyableAmount("d", 22).times(player.e.upgrades.length)))
                                                        b1 = b1.div(Decimal.exp(CURRENT_BUYABLE_EFFECTS["d31"]))
                        if (hasMilestone("e", 41))      b0 = b0.div("1e10000")
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        return [b0.max(1), b1.max(1), b2]
                },
                d23: {active:() => hasMilestone("e", 33)},
                d31: {active:() => hasMilestone("e", 27)},
                d32: {active:() => hasMilestone("e", 58)},
        },
        d23: {
                name: "D 23",
                func: "linp1",
                effects: "Base Duck gain and exponentiate C 31 base",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return hasUpgrade("d", 41)
                                },
                                type: "mult",
                                amount(){
                                        return 2.5
                                },
                        },
                        2: {
                                active(){
                                        return hasUpgrade("d", 43)
                                },
                                type:() => hasMilestone("e", 28) ? "mult" : "add",
                                amount(){
                                        return getBuyableAmount("d", 12).sub(18000).max(0).div(5000).times(1 + player.d.points.gte("1e43052") + player.d.points.gte("1e43161"))
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("e", 16) && player.d.points.gte("1e62000")
                                },
                                type:() => hasMilestone("e", 28) ? "mult" : "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e12"]
                                },
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 28)
                                },
                                type: "exp",
                                amount(){
                                        return 1 + player.e.milestones.length / 100
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e31083")
                        let b1 = new Decimal(1e24)
                        let b2 = new Decimal(1.0243) // 3**x

                        if (hasUpgrade("c", 54)) {
                                b0 = b0.div("1e483").times(Decimal.pow(.99, getBuyableAmount("d", 12).sub(1e4).max(0)).pow(1 + player.d.points.gte("1e14042") + player.d.points.gte("14126")))
                        }
                        if (hasUpgrade("d", 42)) b0 = b0.div("1e1000")
                        if (hasUpgrade("e", 22)) {
                                b0 = b0.times(Decimal.pow(1e25, player.e.upgrades.length))
                                b1 = b1.times(Decimal.pow(.9998, player.e.upgrades.length).pow(getBuyableAmount("d", 23)))
                        }
                        
                        if (hasMilestone("d", 24) && player.d.points.gte("1e32132")) {
                                b1 = b1.times(Decimal.pow(.99, getBuyableAmount("d", 23)))
                        }
                        if (hasMilestone("d", 23) && hasMilestone("d", 24)) b1 = b1.times(8e12)
                        if (hasMilestone("e", 11)) {
                                b0 = b0.times(player.G.unlocked ? 1000 : "1e1000")
                                b1 = b1.div(1e5)
                        }
                        if (hasMilestone("e", 12)) {
                                b1 = b1.div(123456)
                                if (player.d.points.gte("1e46428")) b1 = b1.div(2)
                        }
                        if (hasMilestone("e", 14) && (getBuyableAmount("e", 11).gte(200) || hasMilestone("f", 5))) {
                                b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 11)))
                        }
                                b1 = b1.div(Decimal.exp(CURRENT_BUYABLE_EFFECTS["d31"]))
                        if (hasMilestone("e", 41))      b0 = b0.div("1e30000")
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        return [b0.max(1), b1.max(1), b2]
                },
                d31: {active:() => hasMilestone("e", 25)},
                d32: {active:() => hasMilestone("e", 67)},
        },
        d31: {
                name: "D 31",
                func: "lin",
                effects: "D 11 base and (exponentially) decreasing D 2X linear bases",
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasMilestone("e", 23)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("e", 24)
                                },
                                type: "add",
                                amount(){
                                        return .0002
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("e", 25)
                                },
                                type: "add",
                                amount(){
                                        return .0006
                                }
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 48) && player.e.points.gte(hasMilestone("f", 8) ? 0 : "1e1720")
                                },
                                type: "add",
                                amount(){
                                        if (hasMilestone("f", 8)) return .001
                                        return .0001
                                },
                        },
                        5: {
                                active(){
                                        return hasMilestone("e", 49) && player.e.points.gte(hasMilestone("f", 8) ? 0 : "1e1745")
                                },
                                type: "add",
                                amount(){
                                        if (hasMilestone("f", 8)) return .001
                                        return .0001
                                },
                        },
                        6: {
                                active(){
                                        return hasMilestone("e", 50) && player.e.points.gte(hasMilestone("f", 8) ? 0 : "1e1776")
                                },
                                type: "add",
                                amount(){
                                        if (hasMilestone("f", 8)) return .001
                                        return .0001
                                },
                        },
                        7: {
                                active(){
                                        return hasMilestone("e", 52)
                                },
                                type: "add",
                                amount(){
                                        if (hasMilestone("f", 8)) return .001
                                        return .0001
                                },
                        },
                        8: {
                                active(){
                                        return hasMilestone("e", 51) && player.e.points.gte(hasMilestone("f", 8) ? 0 : "1e1790")
                                },
                                type: "add",
                                amount(){
                                        if (hasMilestone("f", 8)) return .001
                                        return .0001
                                },
                        },
                        9: {
                                active(){
                                        return hasMilestone("e", 57)
                                },
                                type: "set",
                                amount(){
                                        return 0
                                },
                        },
                        10: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e22"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e68e3")
                        let b1 = new Decimal(1e50)
                        let b2 = new Decimal(1.0729) // 3**x

                        if (hasMilestone("e", 20))      b0 = b0.div(CURRENT_BUYABLE_EFFECTS["e11"].pow(getLayerBuyableTotal("e")))
                                                        b0 = b0.div(CURRENT_BUYABLE_EFFECTS["d32"])
                        if (hasMilestone("e", 25))      b1 = new Decimal(1e175)
                        if (hasMilestone("e", 26)) {
                                b1 = b1.div(Decimal.pow(1.01, getBuyableAmount("d", 22)))
                                b0 = b0.times("1e3000")
                        }
                        if (hasMilestone("e", 29))      b1 = b1.div(Decimal.pow(1.01, getBuyableAmount("e", 12)))
                        if (hasMilestone("e", 30))      b1 = b1.div(Decimal.exp(CURRENT_BUYABLE_EFFECTS["d31"]).pow(30))
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        return [b0.max(1), b1.max(1), b2]
                },
                e11: {active:() => hasMilestone("e", 19) && !hasMilestone("e", 21)},
                e13: {active:() => hasMilestone("e", 39)},
        },
        d32: {
                name: "D 32",
                func: "exp",
                effects: "Duck and divide D 3X base cost",
                base: {
                        initial: new Decimal(10),
                        1: {
                                active(){
                                        return hasMilestone("e", 32)
                                },
                                type: "add",
                                amount(){
                                        return getBuyableAmount("d", 32)
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("e", 47)
                                },
                                type: "set",
                                amount(){
                                        return getBuyableTotal("d", 32).div(2)
                                }
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "mult",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e23"]
                                }
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 57)
                                },
                                type: "mult",
                                amount(){
                                        return 10
                                },
                        },
                        5: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("e119500")
                        let b1 = new Decimal(1e10)
                        let b2 = new Decimal(1.2187) // 3**x

                        b0 = b0.div(CURRENT_BUYABLE_EFFECTS["d32"])
                        if (hasMilestone("e", 32)) b1 = new Decimal(1e20)
                        if (hasMilestone("e", 34) && player.e.points.gte("1e416")) {
                                b1 = b1.div(Decimal.exp(CURRENT_BUYABLE_EFFECTS["d31"]).pow(30))
                        }
                        if (hasMilestone("e", 39)) b0 = b0.times("1e3000")
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        return [b0.max(1), b1.max(1), b2]
                },
                e11: {active:() => (hasMilestone("e", 19) && !hasMilestone("e", 21)) || hasMilestone("e", 34)},
                e12: {active:() => hasMilestone("e", 61) && player.e.best.gte("1e5183")},
                e13: {active:() => hasMilestone("e", 37)},
        },
        d33: {
                name: "D 33",
                func: "exp",
                effects: "Duck gain and C 33 base per upgrade",
                base: {
                        initial: new Decimal(1.5),
                        1:{
                                active(){
                                        return hasMilestone("e", 36) && !hasMilestone("e", 40)
                                },
                                type: "exp",
                                amount(){
                                        return player.e.milestones.length ** .5
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("e", 40)
                                },
                                type: "add",
                                amount(){
                                        return 8.5
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e21"]
                                }
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 62)
                                },
                                type: "times",
                                amount(){
                                        return 10
                                },
                        },
                        5: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e33"].pow(player.e.upgrades.length)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("e176400")
                        let b1 = new Decimal("1e666")
                        let b2 = new Decimal(1.6561) // 3**x

                        b0 = b0.div(CURRENT_BUYABLE_EFFECTS["d32"])
                        if (hasMilestone("e", 38)) b0 = b0.div("1e900")
                        if (hasMilestone("e", 35)) {
                                if (hasMilestone("f", 5)) b1 = decimalOne
                                else {
                                        let t = hasMilestone("e", 36) ? CURRENT_BUYABLE_EFFECTS["d33"] : Decimal.pow10(player.d.buyables[33])
                                        if (t.gte(1e100)) {
                                                s = t.log10()
                                                t = s.pow(s.sqrt().times(5))
                                        }
                                        b1 = b1.div(t)
                                }
                        }
                        if (hasMilestone("e", 39)) b0 = b0.times("1e7000")
                        if (hasMilestone("e", 43)) b0 = b0.div("1e10000")
                        if (hasMilestone("e", 44)) b0 = b0.div("1e50000")
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))

                        return [b0.max(1), b1.max(1), b2]
                },
                e11: {active:() => hasMilestone("T", 10) && player.T.points.gte(29) && player.E.points.gte(player.T.points.gte(30) || player.f.unlocked ? 0 : 1e57)},
                e12: {active:() => hasMilestone("T", 10) && player.f.unlocked},
                e22: {active:() => hasMilestone("e", 53) && player.e.points.gte("1e2088")},
        },
        e11: {
                name: "E 11",
                func: "exp",
                effects: "Base Duck gain and Eagle gain per Eagle milestone",
                base: {
                        initial: new Decimal(1.01),
                        1: {
                                active(){
                                        return hasMilestone("e", 16) && player.d.points.gte("1e62000") && !hasMilestone("e", 22)
                                },
                                type: "add",
                                amount(){
                                        return .0002
                                },
                        },
                        2: {
                                active(){
                                        return hasUpgrade("e", 23)
                                },
                                type: "add",
                                amount(){
                                        return .0003 * player.e.upgrades.length
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("e", 26)
                                },
                                type: "add",
                                amount(){
                                        return -.0004 * (1 + hasMilestone("e", 27) + hasMilestone("e", 28) + hasMilestone("e", 29) + hasMilestone("e", 30))
                                }
                        },
                        4: {
                                active(){
                                        return hasMilestone("e", 31)
                                },
                                type: "add",
                                amount(){
                                        return -.001
                                },
                        },
                        5: {
                                active(){
                                        return  hasUpgrade("T", 13)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(31).max(0).div(1e4)
                                }
                        },
                        6: {
                                active(){
                                        return hasMilestone("E", 18)
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f23"]
                                }
                        }
                },
                bases(){
                        let b0 = new Decimal(1e37)
                        let b1 = new Decimal(1.1)
                        let b2 = new Decimal(1.0003) // odd primes

                        if (hasMilestone("e", 14))      b1 = b1.sub(getBuyableAmount("e", 12).div(1e4))
                        if (hasUpgrade("e", 23))        b0 = b0.times(Decimal.pow(10, player.e.upgrades.length))
                        if (hasMilestone("e", 17) && getBuyableAmount("e", 12).gte(100)) {
                                                        b0 = b0.div(10)
                        }
                        if (hasMilestone("e", 41))      b0 = b0.times(1e4)
                        if (hasMilestone("e", 42)) {
                                let l = getLayerBuyableTotal("e").sub(5500).max(0)
                                                        b0 = b0.times(Decimal.pow(.99, l))
                        }
                        if (hasMilestone("e", 64))      b0 = b0.times(100)
                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))

                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e12: {active:() => hasMilestone("E", 12)},
                e13: {active:() => hasMilestone("f", 15)},
                e21: {active:() => hasMilestone("T", 8)},
                e22: {active:() => hasMilestone("e", 53) && !hasMilestone("G", 2)},
                e23: {active:() => hasMilestone("e", 63) && !hasMilestone("e", 71)},
        },
        e12: {
                name: "E 12",
                func: "lin",
                effects: "Duck and Eagle exponent",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return hasMilestone("e", 15)
                                },
                                type: "add",
                                amount(){
                                        return player.e.milestones.length / 1e4
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e46)
                        let b1 = new Decimal(2)
                        let b2 = new Decimal(1.0005) // odd primes

                        if (hasMilestone("e", 14)) b1 = b1.sub(getBuyableAmount("e", 11).div(1e4))
                        if (hasMilestone("e", 21)) b1 = b1.div(Decimal.exp(CURRENT_BUYABLE_EFFECTS["d31"]))
                        if (hasMilestone("e", 41))      b0 = b0.times(1e4)
                        if (hasMilestone("e", 42)) {
                                let l = getLayerBuyableTotal("e").sub(5500).max(0)
                                                        b0 = b0.times(Decimal.pow(.99, l))
                        }
                        if (hasMilestone("e", 64))      b0 = b0.times(100)
                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e13: {active:() => hasMilestone("T", 16)},
                e21: {active:() => hasMilestone("e", 40) && player.e.best.gte("1e1078")},
                e22: {active:() => hasMilestone("e", 54)},
                e23: {active:() => hasMilestone("e", 56) && !hasUpgrade("f", 23)},
        },
        e13: {
                name: "E 13",
                func: "exp_.8",
                effects: "Base Duck and Eagle gain",
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return hasUpgrade("e", 25)
                                },
                                type: "add",
                                amount(){
                                        return .1 * player.e.upgrades.length
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "plus",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e31"]
                                }
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e21"]
                                }
                        },
                        4: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e32"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e465")
                        let b1 = new Decimal(100)
                        let b2 = new Decimal(1.0007) // odd primes

                        if (hasMilestone("e", 38)) {
                                let l = player.e.buyables[13]
                                if (l.gte(100)) l = l.plus(400).div(5)
                                if (l.gte(750)) l = l.plus(750).div(2)
                                if (l.gte(860)) l = l.times(5).floor().div(10).plus(430)
                                if (l.gte(950)) l = l.div(10).plus(855)
                                b1 = b1.sub(l.div(10))
                        }
                        if (hasMilestone("e", 41))      b0 = b0.times(1e35)
                        if (hasMilestone("e", 42)) {
                                let l = getLayerBuyableTotal("e").sub(5500).max(0)
                                                        b0 = b0.times(Decimal.pow(.99, l.times(10)))
                        }
                        if (hasMilestone("e", 64))      b0 = b0.times(1e20)
                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e22: {active:() => hasMilestone("e", 54) && player.e.points.gte("1e2189")},
                e23: {active:() => hasMilestone("e", 58) && player.e.best.gte("1e3922")}
        },
        e21: {
                name: "E 21",
                func: "linp1",
                effects: "Base Eagle gain and E 13 and D 33 base",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return hasMilestone("e", 76)
                                },
                                type: "times",
                                amount(){
                                        return getBuyableAmount("e", 31).sub(97).max(0).div(1e3).plus(1)
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "times",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["e32"]
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e1028")
                        let b1 = new Decimal(1000)
                        let b2 = new Decimal(1.0011) // odd primes

                        if (hasMilestone("e", 40)) {
                                if (player.e.best.gte("1e1041")) b0 = b0.div(1e13)
                                if (player.e.best.gte("1e1045")) b0 = b0.div(1e13)
                                if (player.e.best.gte("1e1055")) b0 = b0.div(1e7)
                                if (player.e.best.gte("1e1078")) b1 = b1.sub(getBuyableAmount("e", 21))
                                if (b1.lte(250)) b1 = b1.plus(2250).div(10)
                                if (b1.lte(75))  b1 = b1.plus(75).div(2)
                                if (b1.lte(50))  b1 = b1.plus(200).div(5)
                        }
                        if (hasMilestone("e", 42) && player.e.best.gte("1e1180")) {
                                let l = getLayerBuyableTotal("e").sub(5500).max(0)
                                                        b0 = b0.times(Decimal.pow(.88, l)).times(1e5)
                        }
                        if (hasMilestone("e", 44)) b0 = getBuyableBases("e", 13)[0].pow(2).log10().floor().pow10()
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e22: {active:() => hasMilestone("G", 2)},
                e23: {active:() => hasMilestone("e", 71)},
                e31: {active:() => hasMilestone("e", 65)},
        },
        e22: {
                name: "E 22",
                func: "lin",
                effects: "D X1 bases",
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasMilestone("e", 72)
                                },
                                type: "times",
                                amount(){
                                        return getBuyableAmount("e", 31).sub(53).max(0).div(1e3).plus(1)
                                }
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                        3: {
                                active(){
                                        return hasUpgrade("e", 35)
                                },
                                type: "mult",
                                amount(){
                                        return Decimal.pow(2, player.e.upgrades.length)
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e1830")
                        let b1 = new Decimal(1e18)
                        let b2 = new Decimal(1.0013) // odd primes

                        if (hasMilestone("e", 53)) b1 = b1.times(10)
                        if (hasMilestone("e", 54)) b1 = b1.times(10)
                        if (hasMilestone("e", 54) && player.e.points.gte("1e2189")) b0 = b0.times(1e30)
                        if (hasMilestone("e", 60)) b1 = b1.times(Decimal.pow(.999, getBuyableAmount("e", 22)))
                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("e", 66)) b0 = b0.times(1e7)
                        if (hasMilestone("e", 77) && player.e.points.gte("1e10317")) {
                                b1 = b1.times(Decimal.pow(.998, getBuyableAmount("e", 31).sub(100).max(0)))
                        }
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e23: {active:() => hasUpgrade("f", 23)},
                e31: {active:() => hasUpgrade("T", 14)},
                e32: {active:() => hasUpgrade("E", 14)},
        },
        e23: {
                name: "E 23",
                func: "linp1",
                effects: "D 32 base and Eagle effect exponent",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return hasMilestone("e", 56) && player.e.points.gte("1e3342")
                                },
                                type: "add",
                                amount(){
                                        return getBuyableAmount("e", 23).div(1e4).times(1 + player.e.points.gte("1e3442"))
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e2758")
                        let b1 = new Decimal(1e18)
                        let b2 = new Decimal(1.0017) // odd primes

                        if (hasMilestone("e", 56)) b1 = b1.times(10)
                        if (hasMilestone("e", 57)) {
                                if (player.f.unlocked)  b1 = b1.div(10) 
                                else {
                                        if (player.e.points.gte("1e3660")) b1 = b1.div(2)
                                        if (player.e.points.gte("1e3703")) b1 = b1.div(2)
                                        if (player.e.points.gte("1e3764")) b1 = b1.div(2.5)
                                }
                        }
                        if (hasMilestone("e", 59) && getBuyableAmount("e", 23).gte(100) && !hasMilestone("f", 5)) b1 = b1.times(2)
                        if (hasMilestone("e", 60)) {
                                b0 = b0.times(1e22)
                                if (player.e.points.gte("5e4701")) b0 = b0.div(1e8)
                                if (player.e.points.gte("1e5000")) b0 = b0.div(1e5)
                                b1 = b1.times(Decimal.pow(.999, getBuyableAmount("e", 22)))
                        }
                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("e", 77) && player.e.points.gte("1e10317")) {
                                b1 = b1.times(Decimal.pow(.998, getBuyableAmount("e", 31).sub(100).max(0)))
                        }
                        if (hasMilestone("e", 78) && player.e.points.gte("1e11260")) b1 = b1.times(2)
                        if (hasMilestone("e", 79))      b0 = b0.times(1e100)
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e31: {active:() => hasUpgrade("T", 31)},
                e32: {active:() => hasMilestone("E", 5)},
        },
        e31: {
                name: "E 31",
                func: "lin.8",
                effects: "E 13 and D 22 base",
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasUpgrade("d", 53)
                                },
                                type: "mult",
                                amount(){
                                        return player.T.points.max(1).pow(player.f.buyables[11].max(1).cbrt())
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e6304")
                        let b1 = new Decimal(1e40)
                        let b2 = new Decimal(1.0019) // odd primes

                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("e", 66)) b0 = b0.div(1e137)
                        if (hasMilestone("e", 76) && player.e.points.gte("1e10095")) b1 = new Decimal(7.5e39)
                        if (hasMilestone("e", 77)) b1 = new Decimal(7e39)
                        if (hasMilestone("e", 78)) b1 = b1.times(Decimal.pow(.999, getBuyableAmount("e", 31)))
                        if (hasMilestone("e", 78) && player.e.points.gte("1e11260")) b0 = b0.div(1e300)
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                e32: {active:() => hasMilestone("f", 12)},
        },
        e32: {
                name: "E 32",
                func: "linp1",
                effects: "E 13 and E 21 base and base Eagle gain",
                base: {
                        initial: new Decimal(.005),
                        1: {
                                active(){
                                        return hasMilestone("E", 6)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(100).max(0).div(5e3)
                                }
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                }
                        },
                        3: {
                                active(){
                                        return hasUpgrade("e", 35)
                                },
                                type: "mult",
                                amount(){
                                        return Decimal.pow(2, player.e.upgrades.length)
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e11728")
                        let b1 = new Decimal(1e202)
                        let b2 = new Decimal(1.0023) // odd primes

                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("e", 79) && getBuyableAmount("e", 32).gte(5)) {
                                b1 = b1.times(Decimal.pow(getBuyableAmount("e", 32).gte(7) ? 4321 : 100, getBuyableAmount("e", 32).min(24)))
                        }
                        if (hasMilestone("T", 4)) b0 = b0.times(1e139)
                        if (hasMilestone("T", 7)) b1 = b1.div(Decimal.pow(4, player.T.points))
                        if (hasMilestone("f", 2))       b1 = b1.times(Decimal.pow(.99, getBuyableAmount("e", 33).plus(player.f.milestones.length)))
                        if (hasUpgrade("e", 31)) {
                                b1 = b1.div(player.f.points.max(1).cbrt().pow(player.e.upgrades.length))
                        }
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        e33: {
                name: "E 33",
                func: "exp",
                effects: "Eagle gain and D 33 base per upgrade",
                base: {
                        initial: new Decimal(10),
                        1: {
                                active(){
                                        return hasMilestone("T", 14)
                                },
                                type: "exp",
                                amount(){
                                        return player.T.points.max(1).sqrt()
                                }
                        }
                },
                bases(){
                        let b0 = new Decimal("1e24500")
                        let b1 = new Decimal("1e500")
                        let b2 = new Decimal(1.0029) // odd primes

                        if (hasMilestone("e", 65) && player.e.points.gte("1e6503")) b0 = b0.div(Decimal.pow(2, getBuyableAmount("e", 31)))
                        if (hasMilestone("E", 3)) b1 = b1.div(Decimal.pow(10, player.T.points))
                        if (hasMilestone("e", 89)) b1 = b1.div(player.T.points.sub(50).max(0).pow10())
                        if (hasMilestone("f", 4)) {
                                b0 = b0.div(player.f.points.times(player.f.times).pow10().pow(10))
                        }
                        if (hasMilestone("e", 94))      b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                f11: {active:() => hasUpgrade("e", 43)},
        },
        E11: {
                name: "Sifter",
                func: "exp",
                effects: "Emerald gain",
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E12"]
                                },
                        },
                        2: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                        3: {
                                active(){
                                        return hasMilestone("E", 14)
                                },
                                type: "mult",
                                amount(){
                                        return player.T.points.max(1000).div(1000).pow(player.T.points.sub(1063).max(0).min(100))
                                }
                        },
                        4: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f31"]
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(3)
                        let b1 = new Decimal(2)
                        let b2 = new Decimal(1.0001)

                        if (hasMilestone("E", 1)) {
                                b0 = decimalOne
                                if (player.E.points.gte(tmp.E.milestones[1].goal.times(1e4))) b1 = b1.sub(player.T.points.div(100))
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
                E12: {active:() => hasUpgrade("E", 15)},
                E13: {active:() => hasMilestone("T", 5) && !hasUpgrade("T", 24)},
                E22: {active:() => hasMilestone("e", 86) && !hasMilestone("T", 16)},
        },
        E12: {
                name: "Faster Sifter",
                func: "lin",
                effects: "Sifter base",
                base: {
                        initial: new Decimal(.05),
                        1: {
                                active(){
                                        return hasUpgrade("T", 11)
                                },
                                type: "add",
                                amount(){
                                        return .02
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        return 1.01
                                },
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E32"]
                                }
                        },
                        4: {
                                active(){
                                        return hasUpgrade("f", 15)
                                },
                                type: "add",
                                amount(){
                                        return .293
                                }
                        },
                        5: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                        6: {
                                active(){
                                        return hasUpgrade("T", 32)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(5).sqrt().plus(1).div(2)
                                }
                        },
                        7: {
                                active(){
                                        return hasMilestone("f", 23) 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f23"]
                                },
                        },
                        8: {
                                active(){
                                        return hasMilestone("E", 20) && player.f.points.gte("5e164970")
                                },
                                type: "times",
                                amount(){
                                        return player.f.points.gte("1e174460") ? 9 : 3
                                }
                        },
                        9: {
                                active(){
                                        return hasUpgrade("T", 35) && (player.E.points.gte("1e7289") || player.T.points.gte(2185))
                                },
                                type: "exp",
                                amount(){
                                        return 1.234
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e6)
                        let b1 = new Decimal(100)
                        let b2 = new Decimal(1.0001)

                        if (hasMilestone("T", 4)) b0 = b0.div(10)
                        if (hasMilestone("T", 7)) b1 = b1.sub(player.T.points.min(92))
                        if (hasMilestone("e", 88)) b0 = b0.div(Decimal.pow(2, player.T.points.sub(57).max(0)))
                        if (hasUpgrade("d", 51)) {
                                b1 = b1.sub(player.T.points.sub(200).max(0).div(100))
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
                E13: {active:() => player.E.points.gte(tmp.E.milestones[3].goal.times(1e8)) && hasMilestone("E", 3) && player.T.points.gte(26) && !hasUpgrade("T", 24)},
                E21: {active:() => hasUpgrade("f", 13)},
        },
        E13: {
                name: "Lazy Tiers",
                func: "lin.8",
                effectSymbol: "-",
                effects: "effective Tiers",
                base: {
                        initial: new Decimal(.2),
                        1: {
                                active(){
                                        if (!hasMilestone("E", 4)) return false
                                        if (player.T.points.lt(50)) return false
                                        return player.E.points.gte(tmp.E.milestones[3].goal.times(1e25))
                                },
                                type: "add",
                                amount(){
                                        return player.E.milestones.length / 100
                                }
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E32"].min(1)
                                }
                        },
                        3: {
                                active(){
                                        return hasUpgrade("T", 24)
                                },
                                type: "add",
                                amount(){
                                        return -.03
                                },
                        },
                        4: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e8)
                        let b1 = new Decimal(1000)
                        let b2 = new Decimal(2)

                        if (hasMilestone("E", 2))       b0 = b0.div(Decimal.pow(2, player.T.points))
                        if (hasUpgrade("T", 12))        b1 = b1.sub(getBuyableAmount("e", 31).min(990))
                        if (hasMilestone("T", 10))      b2 = b2.sub(player.T.points.min(84).div(100))
                        if (hasUpgrade("T", 22))        b2 = b2.sub(player.T.points.sub(112).max(0).min(30).div(500))
                                                        b1 = b1.sub(player.f.challenges[12] * .36)
                        if (hasMilestone("T", 19)) {
                                b2 = b2.sub(player.T.points.sub(1000).max(0).div(10000).min(.0832))
                                b2 = b2.sub(player.T.points.sub(1832).max(0).div(2).floor().div(10000).min(.0084))
                        }
                        if (hasUpgrade("T", 42)) {
                                b2 = b2.sub(.0001)
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
                E32: {active:() => hasUpgrade("T", 24)},
        },
        E21: {
                name: "Miner",
                func: "exp",
                effects(){
                        return hasMilestone("f", 10) && player.f.points.gte(1e100) ? "Emerald gain per 雀 Challenge" : "Emerald gain"
                },
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return hasMilestone("T", 11)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(29).max(0)
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("E", 5) && player.E.points.gte("2e132")
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(65).max(0).min(27)
                                }
                        },
                        3: {
                                active(){
                                        return hasUpgrade("f", 13)
                                },
                                type: "set",
                                amount(){
                                        return 1
                                }
                        },
                        4: {
                                active(){
                                        return hasMilestone("f", 10) && player.f.points.gte(1e100)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(500).max(0).div(1e3)
                                }
                        },
                        5: {
                                active(){
                                        return hasUpgrade("f", 14)
                                },
                                type: "add",
                                amount(){
                                        return .4
                                }
                        },
                        6: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E32"]
                                }
                        },
                        7: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                        8: {
                                active(){
                                        return hasMilestone("E", 15)
                                },
                                type: "mult",
                                amount(){
                                        return Decimal.pow(1.005, player.T.points.sub(1095).min(50).max(0))
                                }
                        },
                        9: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f31"]
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal(1e15)
                        let b1 = new Decimal(3)
                        let b2 = new Decimal(1.0001)

                        if (hasMilestone("T", 12))      b0 = b0.div(Decimal.pow(1e3, player.T.points.sub(53).max(0).min(5)))
                        if (hasMilestone("E", 4))       b1 = b1.sub(getBuyableAmount("e", 33).div(200).min(1))
                        if (hasUpgrade("f", 11))        b1 = b1.sub(layerChallengeCompletions("f") / 50)

                        if (hasUpgrade("f", 14))        b2 = new Decimal(1.0005)

                        return [b0.max(1), b1.max(1), b2]
                },
                E22: {active:() => hasMilestone("e", 85) && !hasMilestone("T", 16)},
                E31: {active:() => hasMilestone("f", 12)},
        },
        E22: {
                name: "Tired Tiers",
                func: "lin",
                effectSymbol: "-",
                effects: "effective Tiers",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return hasUpgrade("T", 15)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(59).max(0).min(20).div(200)
                                }
                        },
                        2: {
                                active(){
                                        return hasMilestone("e", 93)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(120).max(-5).min(50).div(1000)
                                }
                        },
                        3: {
                                active(){
                                        return hasMilestone("f", 1)
                                },
                                type: "mult",
                                amount(){
                                        if (hasMilestone("f", 6) && player.G.unlocked) return 1.01*1.49
                                        return hasMilestone("f", 6) ? 1.5 : 1.01
                                },
                        },
                        4: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return tmp.f.challenges[11].rewardEffect
                                },
                        },
                        5: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E32"].min(1)
                                }
                        },
                        6: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e79)
                        let b1 = new Decimal(1e4)
                        let b2 = new Decimal(3)

                        b0 = b0.div(Decimal.pow(1000, player.T.points.sub(37).max(0)))
                        if (hasMilestone("e", 88)) b1 = b1.div(Decimal.pow(2, player.T.points.sub(57).max(0)))
                        if (hasMilestone("e", 90)) {
                                b2 = b2.sub(getBuyableAmount("e", 33).min(1000).div(1000))
                                b2 = b2.sub(player.T.points.min(700).div(1000))
                        }
                        if (hasUpgrade("d", 55)) {
                                b2 = b2.sub(player.f.buyables[13].div(10).floor().div(1e4).min(.1))
                        }
                        if (hasMilestone("f", 26)) b2 = b2.sub(player.f.buyables[31].min(520).div(1e4))
                        if (hasUpgrade("T", 42) && player.G.points.gte(77)) {
                                b2 = new Decimal(1.15)
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        E23: {
                name: "Filter",
                func: "exp",
                effects(){
                        return player.f.unlocked ? "Emerald per Em/Ti/E/F milestone" : "Emerald per Em/Ti/E milestone"
                },
                base: {
                        initial: new Decimal(1.04),
                        1: {
                                active(){
                                        return hasMilestone("T", 14)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(104).max(0).times(.01)
                                },
                        },
                        2: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E32"]
                                }
                        },
                        3: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                        4: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f23"].min(1e5) // for now
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(1e135)
                        let b1 = new Decimal(4)
                        let b2 = new Decimal(1.0001)

                        if (hasMilestone("f", 4)) b0 = decimalOne
                        else if (hasUpgrade("T", 21)) b0 = b0.div(Decimal.pow(player.E.points.gte(1e206) ? 1e18 : 1e15, player.T.points.sub(100).max(0)))
                        if (hasMilestone("E", 6) || player.T.points.gte(140)) {
                                b2 = b2.plus(.0001)
                                let t = player.T.points.sub(100).max(0).div(100)
                                if (t.gte(1.5)) t = t.plus(1.5).div(2)
                                b1 = b1.sub(t)
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
                E31: {active:() => hasMilestone("T", 15)},
        },
        E31: {
                name: "Sieve",
                func: "exp",
                effects: "Emerald per Tier",
                base: {
                        initial: new Decimal(1.2),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.times(player.f.challenges[21]/10000)
                                },
                        },
                        2: {
                                active(){
                                        return hasMilestone("f", 12)
                                },
                                type: "add",
                                amount(){
                                        return -.1
                                }
                        },
                        3: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["E32"]
                                }
                        },
                        4: {
                                active(){
                                        return hasUpgrade("f", 15)
                                },
                                type: "add",
                                amount(){
                                        return player.T.points.sub(1500).div(1e4)
                                }
                        },
                        5: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                        6: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f31"]
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e620")
                        let b1 = new Decimal(10)
                        let b2 = new Decimal(1.0003)

                        if (hasMilestone("T", 15)) b1 = new Decimal(1e3)
                        if (hasUpgrade("f", 12)) {
                                b0 = b0.div(player.f.points.max(1).pow(Math.max(player.f.challenges[12] - 10, 0)))
                        }
                        if (hasMilestone("E", 9)) b1 = b1.plus(10)
                        if (hasMilestone("E", 7)) b1 = b1.sub(player.T.points.min(940))
                        if (hasMilestone("f", 14)) b1 = b1.sub(1)
                        if (hasMilestone("E", 11)) {
                                b1 = b1.sub(player.T.points.sub(1000).max(0).div(10).min(64))
                                b1 = b1.sub(player.T.points.sub(1640).max(0).div(50).min(10.2))
                                b1 = b1.sub(player.T.points.sub(2150).max(0).div(100).min(2.5))
                                b1 = b1.sub(player.T.points.sub(2400).max(0).div(200).min(1.375))
                                b1 = b1.sub(player.T.points.sub(2675).max(0).div(1000).min(.625))
                                b1 = b1.sub(player.T.points.sub(3300).max(0).div(5000).min(.625))
                        }
                        if (hasUpgrade("f", 23)) b1 = b1.plus(11)

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        E32: {
                name: "Better Everything",
                func: "lin",
                effects: "all previous bases (max +1 for Tier reductions)",
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasMilestone("f", 13)
                                },
                                type: "times",
                                amount(){
                                        return Math.max(1, player.f.upgrades.length)
                                }
                        },
                        2: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[11].effect
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal("1e2080")
                        let b1 = new Decimal(1e10)
                        let b2 = new Decimal(3)

                        if (hasMilestone("T", 17)) {
                                b2 = b2.sub(player.T.points.div(1000).min(1.5))
                                b0 = b0.div(player.T.points.sub(785).min(75).max(0).pow10().pow(15))
                                b0 = b0.div(player.T.points.sub(860).max(0).pow10().pow(5))
                        }
                        if (hasMilestone("E", 9)) {
                                b1 = b1.div(Decimal.pow(1.13, player.E.buyables[32]))
                        }
                        if (hasMilestone("E", 15)) b0 = b0.times("1e600")
                        if (player.f.points.gte("2e91313")) b1 = b1.div(2)
                        if (hasMilestone("E", 21)) b1 = b1.times(7)

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        E33: {
                name: "Dlareme",
                func: "exp",
                effects: "Emeralds per Emerald buyable and base 雀 gain",
                base: {
                        initial: new Decimal(1.1),
                        1: {
                                active(){
                                        return hasMilestone("f", 25) && player.E.points.gte("1e7390")
                                },
                                type: "add",
                                amount(){
                                        let sub = player.f.points.gte("1e358306") ? 0 : player.f.points.gte("1e349800") ? 30 : 90
                                        return getBuyableAmount("E", 32).sub(sub).max(0).div(1e4)
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e6034")
                        let b1 = new Decimal(1e65)
                        let b2 = new Decimal(1e5)

                        if (hasUpgrade("T", 35)) b2 = b2.div(10)
                        if (hasMilestone("f", 25)) b2 = b2.sub(getBuyableAmount("E", 31).min(9000))
                        if (hasMilestone("G", 4)) b1 = b1.div(player.G.points.max(1).pow(player.G.points.div(1).floor()))
                        if (hasMilestone("G", 7)) {
                                b0 = b0.div(player.f.points.max(1).pow(player.G.points.sub(40).max(0)).pow(.0001))
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        f11: {
                name: "F 11",
                func(a,b){
                        return hasUpgrade("f", 25) ? BUYABLE_EFFECT_EXPONENTIAL(a,b) : BUYABLES_EFFECT_LINEAR(a,b)
                },
                effectSymbol:() => hasUpgrade("f", 25) ? "*" : "+",
                effectString:() => hasUpgrade("f", 25) ? "^x" : "*x",
                effects:() =>  hasUpgrade("f", 25) ? "雀 gain" : "雀 gain exponent",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[12].effect
                                },
                        },
                        2: {
                                active(){
                                        return hasUpgrade("f", 25)
                                },
                                type: "times",
                                amount(){
                                        return 989
                                }
                        },
                        3: {
                                active(){
                                        return hasUpgrade("T", 33)
                                },
                                type: "add",
                                amount(){
                                        if (player.G.points.gte(13)) return player.f.buyables[23].sub(77).div(100).max(0)
                                        return player.f.buyables[23].sub(77).div(100)
                                }
                        },
                        4: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f31"]
                                }
                        },
                        5: {
                                active(){
                                        return hasMilestone("G", 5)
                                },
                                type: "add",
                                amount(){
                                        return player.f.buyables[22].min(22222).sub(635).max(0).div(20)
                                }
                        }
                },
                bases(){
                        let b0 = new Decimal(1e34).div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal(4)
                        let b2 = new Decimal(1.0001) // catalan

                        if (hasMilestone("f", 10) && player.f.best.gte(1e300)) b1 = b1.plus(.1)
                        if (hasUpgrade("e", 34) && player.f.points.gte("1e400")) b1 = b1.plus(player.e.upgrades.length / 200)
                        if (hasUpgrade("E", 23)) {
                                b1 = b1.sub(getBuyableAmount("f", 13).div(10).floor().div(1000))
                                //b1 = b1.sub(getBuyableAmount("f", 13).sub(2810).max(0).div(14).floor().div(1000))
                        }
                        if (hasUpgrade("e", 41))        b0 = b0.times(Decimal.pow(1e4, player.e.upgrades.length))
                        if (hasMilestone("f", 13))      b0 = b0.div(getBuyableAmount("E", 32).pow10())
                        if (hasUpgrade("f", 23))        b1 = b1.plus(.119)
                        if (hasMilestone("E", 13))      b0 = b0.times(player.G.unlocked ? 1e80 : 1e88)
                        if (hasUpgrade("f", 24))        b1 = b1.plus(.063)
                        if (hasUpgrade("e", 44))        b1 = b1.plus(player.e.upgrades.length / 1000)
                        if (hasMilestone("f", 17)) {
                                                        b0 = b0.times("1e2000")
                                                        b1 = b1.sub(.5)
                        }     
                        if (hasUpgrade("T", 34)) b0 = b0.times("1e380")
                        if (hasMilestone("f", 24)) b0 = b0.times("1e420")

                        b1 = b1.div(CURRENT_BUYABLE_EFFECTS["f22"])

                        if (hasMilestone("E", 20)) b0 = b0.times("1e2780").sqrt()
                        if (hasUpgrade("E", 24)) b0 = b0.times(new Decimal(1e60).pow(getBuyableAmount("E", 33)))
                        if (hasMilestone("G", 3)) b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                f13: {active:() => hasMilestone("T", 19)},
                f21: {active:() => hasMilestone("f", 20)},
        },
        f12: {
                name: "F 12",
                func: "exp",
                effects: "雀 and base Eagle gain<sup>*</sup>",
                base: {
                        initial: new Decimal(2),
                        1: {
                                active(){
                                        return hasMilestone("E", 8)
                                },
                                type: "add",
                                amount(){
                                        return player.f.buyables[11].div(1e4)
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e1038").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal(1e5)
                        let b2 = new Decimal(1.0002) // catalan

                        if (hasMilestone("E", 8)) b1 = b1.sub(player.f.buyables[11].min(77777))
                        if (hasUpgrade("T", 25)) b0 = b0.times("1e850")
                        if (hasMilestone("E", 10)) b0 = b0.times("1e350")
                        if (hasUpgrade("f", 14)) {
                                b0 = b0.div(getBuyableAmount("f", 13).min(1500).pow10())
                                b0 = b0.div(getBuyableAmount("f", 13).sub(1500).max(0).div(hasMilestone("f", 14) ? 1 : 3).floor().pow10())
                        }
                        if (hasUpgrade("e", 42)) b0 = b0.times(Decimal.pow(1e20, player.e.upgrades.length))
                        if (hasUpgrade("e", 44)) b0 = b0.times(Decimal.pow(1e9, player.e.upgrades.length))
                        if (hasMilestone("E", 13)) b0 = b0.times(player.G.unlocked ? 1e80 : 1e88)
                        if (hasMilestone("E", 14)) b0 = b0.times("1e414")
                        if (hasMilestone("E", 15)) b0 = b0.times("1e120")
                        if (hasMilestone("T", 19)) b0 = b0.times("1e1111")
                        if (hasMilestone("f", 21) && player.f.best.gte("1e96605")) b0 = b0.times("1e600")
                        if (hasMilestone("f", 22)) b0 = b0.times("1e3030")
                        if (hasMilestone("f", 23)) b0 = b0.times("1e1190")
                        if (hasUpgrade("T", 34)) b0 = b0.times("1e380")
                        if (hasMilestone("f", 24)) b0 = b0.times("1e420")

                        b1 = b1.div(CURRENT_BUYABLE_EFFECTS["f22"])

                        if (hasMilestone("E", 20)) b0 = b0.times("1e2780").pow(.5)
                        if (hasMilestone("E", 21) && player.f.points.gte("1e191769")) b0 = b0.times("1e2480")
                        if (hasUpgrade("E", 24)) b0 = b0.times(new Decimal(1e60).pow(getBuyableAmount("E", 33)))
                        if (hasMilestone("G", 3)) b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                f13: {active:() => hasUpgrade("e", 45)},
                f21: {active:() => hasMilestone("G", 9)},
                f23: {active:() => hasMilestone("f", 23) && !hasMilestone("G", 9)},
        },
        f13: {
                name: "F 13",
                func: "linp1",
                effects(){
                        return layerChallengeCompletions("f") > 60 ? "base 雀 (60 times)" : "base 雀 per 雀 challenge and 雀 exponent"
                },
                base: {
                        initial: new Decimal(.0001),
                        1: {
                                active(){
                                        return hasUpgrade("f", 25)
                                },
                                type: "add",
                                amount(){
                                        return tmp.T.buyables[12].effect
                                }
                        }
                },
                bases(){
                        let b0 = new Decimal("1e2968").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal(1e20)
                        let b2 = new Decimal(1.0005) // catalan
                        
                        if (getBuyableAmount("f", 13).gte(1500)) b1 = b1.times(1.25)
                        if (getBuyableAmount("f", 13).gte(1800)) b1 = b1.times(1.08)
                        if (getBuyableAmount("f", 13).gte(1825)) b1 = b1.times(28/27)
                        if (getBuyableAmount("f", 13).gte(1875)) {
                                b1 = b1.times(10)
                                b0 = b0.div("1e1868")
                        }
                        if (hasMilestone("E", 11))      b1 = new Decimal(1.5e21)
                        if (getBuyableAmount("f", 13).gte(2400)) {
                                b0 = b0.times(1e11)
                                b1 = new Decimal(1.51e21)
                        }
                        if (getBuyableAmount("f", 13).gte(2410)) b1 = new Decimal(1.55e21)
                        if (getBuyableAmount("f", 13).gte(2410)) b1 = new Decimal(1.6e21)
                        if (getBuyableAmount("f", 13).gte(2450)) b1 = new Decimal(1.95e21)
                        if (getBuyableAmount("f", 13).gte(2500)) b1 = new Decimal(2e21)
                        if (getBuyableAmount("f", 13).gte(2550)) b1 = new Decimal(2.11e21)
                        if (getBuyableAmount("f", 13).gte(2650)) b1 = new Decimal(2.18e21)
                        if (getBuyableAmount("f", 13).gte(2700)) b1 = new Decimal(2.24e21)
                        if (getBuyableAmount("f", 13).gte(2760)) b1 = new Decimal(2.35e21)
                        if (getBuyableAmount("f", 13).gte(2800)) b1 = new Decimal(2.41e21)
                        if (getBuyableAmount("f", 13).gte(3060)) {
                                b1 = new Decimal(2.44e21)
                                if (player.f.challenges[31] >= 1)        b1 = new Decimal(2.74e21)
                        }
                        
                        if (getBuyableAmount("f", 13).gte(3200)) {
                                b1 = new Decimal(2.82e21)
                                if (player.f.challenges[31] >= 2)        b1 = new Decimal(3.25e21)
                        }
                        if (getBuyableAmount("f", 13).gte(3300)) b1 = new Decimal(3.44e21)
                        if (getBuyableAmount("f", 13).gte(3340)) b1 = new Decimal(3.76e21)
                        if (getBuyableAmount("f", 13).gte(3350)) {
                                b1 = new Decimal(4.5e21)
                                if (player.f.challenges[31] >= 3)        b1 = new Decimal(6.45e21)
                        }
                        if (getBuyableAmount("f", 13).gte(3540)) b1 = new Decimal(6.51e21)
                        if (getBuyableAmount("f", 13).gte(3630)) b1 = new Decimal(6.53e21)
                        if (getBuyableAmount("f", 13).gte(3630)) b1 = new Decimal(6.656e21)
                        if (getBuyableAmount("f", 13).gte(3740)) b1 = new Decimal(7.78e21)
                        if (getBuyableAmount("f", 13).gte(3800)) b1 = new Decimal(7.87e21)
                        if (getBuyableAmount("f", 13).gte(3880)) {
                                b1 = new Decimal(7.97e21)
                                if (player.f.challenges[31] >= 4)        b1 = new Decimal(1.5e21)
                        }

                        if (hasMilestone("E", 13) || player.T.best.gte(1037)) b0 = b0.times(player.G.unlocked ? 1e80 : 1e88)
                        if (hasMilestone("T", 20)) {
                                b1 = b1.div(Decimal.pow(1.001, player.f.buyables[13].sub(4150).max(0).min(13594)))
                                b1 = b1.div(Decimal.pow(1.001, player.f.buyables[13].sub(17744).max(0).div(2).floor().min(2053)))
                                b1 = b1.div(Decimal.pow(1.001, player.f.buyables[13].sub(21850).max(0).div(4).floor().min(4075)))
                                b1 = b1.div(Decimal.pow(1.001, player.f.buyables[13].sub(38150).max(0).div(8).floor()))
                        }
                        if (hasUpgrade("T", 32)) b0 = b0.times("1e791")
                        if (hasUpgrade("T", 34)) b0 = b0.times("1e380")
                        if (hasMilestone("f", 24)) b0 = b0.times("1e420")

                        b1 = b1.div(CURRENT_BUYABLE_EFFECTS["f22"])

                        if (hasMilestone("E", 20)) b0 = b0.times("1e2780").sqrt()
                        if (hasUpgrade("E", 24)) b0 = b0.times(new Decimal(1e60).pow(getBuyableAmount("E", 33)))
                        if (hasMilestone("G", 3)) b0 = decimalOne

                        return [b0.max(1), b1.max(1), b2]
                },
                f21: {active:() => hasMilestone("f", 19)},
                f23: {active:() => hasUpgrade("T", 34)},
        },
        f21: {
                name: "F 21",
                func: "exp",
                effects: "雀es and divides F buyable base costs",
                base: {
                        initial: new Decimal(10),
                        1: {
                                active(){
                                        return hasMilestone("f", 21)
                                },
                                type: "add",
                                amount(){
                                        return player.f.buyables[21].max(100).div(100).sub(10)
                                }
                        },
                        2: {
                                active(){
                                        return true 
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["f31"]
                                }
                        },
                        3: {
                                active(){
                                        return hasMilestone("G", 9)
                                },
                                type: "times",
                                amount(){
                                        return .1
                                }
                        },
                        4: {
                                active(){
                                        return hasMilestone("G", 9)
                                },
                                type: "max",
                                amount(){
                                        return 1
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("1e54639").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal("5e1125")
                        let b2 = new Decimal(1.0014) // catalan

                        if (hasMilestone("f", 15)) b1 = b1.div(5e28)
                        if (hasMilestone("E", 13)) {
                                b0 = b0.times(player.G.unlocked ? 1e80 : 1e88)
                                b1 = Decimal.pow(2, 1024)
                        }
                        if (hasMilestone("E", 14) && player.E.points.gte("1e3233")) {
                                b1 = b1.div(Decimal.pow(2, player.f.buyables[21].min(175)))
                                b1 = b1.div(Decimal.pow(2, player.f.buyables[21].sub(175).max(0).div(2).min(12.5)))
                                b1 = b1.div(Decimal.pow(2, player.f.buyables[21].sub(200).max(0).div(4).min(25)))
                                b1 = b1.div(Decimal.pow(2, player.f.buyables[21].sub(300).max(0).div(8).min(5)))
                        }

                        if (hasMilestone("T", 18)) {
                                b1 = b1.div(1e100)
                                b0 = b0.times("1e13000")
                        }
                        if (hasMilestone("f", 18)) {
                                b1 = b1.div(1e100)
                                b0 = b0.times("4e14141")
                        }
                        if (hasMilestone("f", 21)) b1 = b1.div(1e5)
                        if (player.f.buyables[21].gte(675)) b1 = b1.times(1.4)
                        if (player.f.buyables[21].gte(850)) b1 = b1.times(1.65)
                        if (hasUpgrade("E", 31)) b0 = b0.div("4e302")

                        b1 = b1.div(CURRENT_BUYABLE_EFFECTS["f22"].pow(tmp.E.milestones[17].exp))
                        if (hasMilestone("E", 22)) b0 = b0.times("1e15001")

                        return [b0.max(1), b1.max(1), b2]
                },
                f22: {active:() => hasMilestone("E", 20)},
                f23: {active:() => hasUpgrade("T", 31)},
        },
        f22: {
                name: "F 22",
                func: "exp",
                effects: "Speedy base (max *3) and divide F buyable linear cost bases",
                base: {
                        initial: new Decimal(1.001),
                        1: {
                                active(){
                                        return hasMilestone("f", 24)
                                },
                                type: "add",
                                amount(){
                                        return .0001
                                }
                        },
                        2: {
                                active(){
                                        return hasUpgrade("E", 34)
                                },
                                type: "add",
                                amount(){
                                        return -.0001
                                }
                        },
                },
                bases(){
                        let b0 = new Decimal("e77558").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal("2e1186").div(CURRENT_BUYABLE_EFFECTS["f22"].pow(Math.min(4, tmp.E.milestones[17].exp)))
                        let b2 = new Decimal(1.0042) // catalan

                        if (hasMilestone("f", 18)) {
                                b1 = b1.div("4e34")
                                if (player.f.points.gte("2e91313")) b1 = b1.div(5e144)
                        }
                        if (hasMilestone("f", 19))  {
                                if (player.T.points.gte(1309))          b1 = b1.div(7e77)
                                if (player.f.points.gte("1e92322"))     b1 = b1.div(7e77)
                        }
                        if (hasMilestone("T", 20)) b1 = b1.div(2.5e5)
                        if (hasMilestone("E", 16)) {
                                if (player.f.points.gte("1e92933")) b1 = b1.div(2.3e56)
                                if (player.f.points.gte("1e93279")) b1 = b1.div(4e54)
                                if (player.f.points.gte("1e93687")) b1 = b1.div(6.6e43)
                                if (player.f.points.gte("1e94153")) b1 = b1.div(1.2e23)
                        }
                        if (hasMilestone("E", 18) && player.f.points.gte("1e114029")) b1 = b1.div(player.E.points.gte("3.984e4893") ? 15432 : 11111)
                        if (hasMilestone("E", 19))      b1 = b1.div(Decimal.pow(2, player.f.buyables[23].max(56).sub(70).min(811)))
                        if (hasMilestone("E", 20)) {
                                if (player.E.points.gte("1e5653")) b1 = b1.div(2)
                                if (player.E.points.gte("1e5718")) b1 = b1.div(3)
                                if (player.E.points.gte("1e5773")) b1 = b1.div(4)
                                if (player.E.points.gte("1e6005")) b1 = b1.div(5)
                                if (player.E.points.gte("1e6032")) b1 = b1.div(6)
                                if (player.E.points.gte("1e6035")) b1 = b1.div(7)
                                if (player.E.points.gte("1e7102")) b1 = b1.div(8)
                                if (player.E.points.gte("1e7159")) b1 = b1.div(9)
                                if (player.E.points.gte("1e7160")) b1 = b1.div(10)
                        }
                        if (hasUpgrade("T", 41)) {
                                b1 = b1.div(3)
                                if (player.E.points.gte("1e9096")) b1 = b1.div(3)
                                if (player.E.points.gte("1e9097")) b1 = b1.div(729)
                        }
                        if (hasMilestone("E", 22)) b0 = b0.times("1e15001")
                        if (hasMilestone("G", 9)) {
                                let base = player.G.points.gte(78) ? 250 : player.G.points.gte(75) ? 1.5e3 : 5e4
                                if (player.G.points.gte(79)) base = 175
                                if (player.G.points.gte(80)) base = 130
                                if (player.G.points.gte(81)) base = 45
                                if (player.G.points.gte(82)) base = 11
                                b1 = b1.div(Decimal.pow(base, player.G.points.sub(72).max(0).min(10)))
                        }
                        if (hasUpgrade("T", 42)) b1 = b1.div(2.5)
                        if (hasUpgrade("T", 43)) b1 = b1.div(200)

                        return [b0.max(1), b1.max(1), b2]
                },
                f32: {active:() => hasUpgrade("E", 34)},
        },
        f23: {
                name: "F 23",
                func: "lin",
                effects: "雀 gain exponent and Filter base",
                base: {
                        initial: new Decimal(.1),
                        1: {
                                active(){
                                        return hasMilestone("G", 9)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.0017).times(player.G.points.sub(70).max(0))
                                }
                        }
                },
                bases(){
                        let b0 = new Decimal("2e97487").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal("1e460").div(CURRENT_BUYABLE_EFFECTS["f22"].pow(tmp.E.milestones[17].exp))
                        let b2 = new Decimal(1.0132) // catalan

                        if (hasMilestone("E", 19))      b1 = b1.div(Decimal.pow(2, player.f.buyables[22].max(69).sub(70).min(140)))
                        if (hasMilestone("G", 6))       b0 = b0.times(5e69)

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        f31: {
                name: "F 31",
                func: "lin",
                effects: "previous left column bases",
                base: {
                        initial: new Decimal(.02),
                },
                bases(){
                        let b0 = new Decimal("3e233783").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal("3e4554").div(CURRENT_BUYABLE_EFFECTS["f22"].pow(hasMilestone("E", 22) ? player.G.points : 1))
                        let b2 = new Decimal(1.0429) // catalan
                        
                        if (hasUpgrade("E", 25)) {
                                if (player.E.points.gte("1e7014")) b1 = b1.div("1e480")
                                if (player.E.points.gte("1e7102")) b1 = b1.div("1e480")
                                if (player.E.points.gte("2e7142")) b1 = b1.div("1e480")
                                if (player.E.points.gte("1e7161")) b1 = b1.div("1e480")
                        }
                        if (hasMilestone("f", 25))      b1 = b1.div(1e188)

                        return [b0.max(1), b1.max(1), b2]
                },
        },
        f32: {
                name: "F 32",
                func: "exp",
                effects: "雀es per Grade per Tier",
                base: {
                        initial: new Decimal(1.005),
                },
                bases(){
                        let b0 = new Decimal("1e467924").div(CURRENT_BUYABLE_EFFECTS["f21"])
                        let b1 = new Decimal("2e1963").div(CURRENT_BUYABLE_EFFECTS["f22"].pow(hasMilestone("E", 22) ? player.G.points : 1))
                        let b2 = new Decimal(1.1430) // catalan

                        if (hasMilestone("G", 6)) {
                                let base = tmp.G.milestones[6].per
                                b1 = b1.times(Decimal.pow(base, player.G.points.sub(25).max(0)))
                                if (player.f.buyables[32].gte(11)) b1 = b1.times(8e59)
                                if (player.f.buyables[32].gte(36)) b1 = b1.div(8e8/4.8)
                                if (player.f.buyables[32].gte(55)) b1 = b1.div(4.8e6)
                        }

                        return [b0.max(1), b1.max(1), b2]
                },
        },
}

var EXTRA_FREE_BUYABLE_DATA = {
        d11: {
                1: {
                        name: "Eagle Resets",
                        amount(){
                                return Math.min(player.e.times, 40)
                        },
                        active(){
                                return hasMilestone("e", 4) && !hasMilestone("e", 8)
                        },
                },
        },
}


/*
Function order:
- Reset buyable extras
- Reset buyable effects
- Update buyable extras
- Update buyable effects
- is buyable defined (bool)
- is buyable unlocked (booL)
- getBuyableTotal (Decimal, amount)
- getLayerBuyableTotal (layer => decimal)
- getCodedBuyableAmount (Decimal, amount)
- isValidBuyableCode (bool)
- getBuyableName (string)
- calcBuyableExtra (recalls it)
- reCalcBuyableExtra (calcs it)
- getAlwaysActiveAdditionalBuyables (returns list)
- getBuyableExtraText (returns text)
- getBuyableEffectFunction (returns function for inputted buyable)
- getBuyableEffectSymbol (returns the symbol that the effect has)
- getBuyableEffectString (returns the effect display string)
- reCalcBuyableBase (calcs it)
- getIdentity (recalls what happens with no effect/disabled)
- reCalcBuyableEffect (calcs it)
- getBuyableBase (recalls it)
- getBuyableBases (recalls it)
- getBuyableCost (calcs it)
- canAffordBuyable (calcs it)
- isBuyableFree
- buyManualBuyable
- buyMaximumBuyable
- getBuyableAmountDisplay (calcs it)
- getBuyableDisplay (calcs it)
- canBuySimultaniously
*/

var CURRENT_BUYABLE_EXTRAS = {}
var CURRENT_BUYABLE_BASES = {}
var CURRENT_BUYABLE_EFFECTS = {}
var BUYABLES_FUNCTION_NAMES = {
        "exp": {
                "func": BUYABLE_EFFECT_EXPONENTIAL,
                "identity": decimalOne,
                "string": "^x",
                "eff": "*",
        },
        "exp_.8": {
                "func": BUYABLE_EFFECT_EXPONENTIAL_POINT8,
                "identity": decimalOne,
                "string": "^x<sup>.8</sup>",
                "eff": "*",
        },
        "exp_sqrt":{
                "func": BUYABLE_EFFECT_EXPONENTIAL_SQRT,
                "identity": decimalOne,
                "string": "^sqrt(x)",
                "eff": "*",
        },
        "exp_cbrt": {
                "func": BUYABLE_EFFECT_EXPONENTIAL_CBRT,
                "identity": decimalOne,
                "string": "^cbrt(x)",
                "eff": "*",
        },
        "lin": {
                "func": BUYABLES_EFFECT_LINEAR,
                "identity": decimalZero,
                "string": "*x",
                "eff": "+",
        },
        "lin.8": {
                "func": BUYABLES_EFFECT_LINEAR_POINT8,
                "identity": decimalZero,
                "string": "*x<sup>.8</sup>",
                "eff": "+",
        },
        "linp1": {
                "func": BUYABLES_EFFECT_LINEAR_PLUS1,
                "identity": decimalOne,
                "string": "*x",
                "eff": "*",
        },
        "linp1sq": {
                "func": BUYABLES_EFFECT_LINEAR_PLUS1_SQUARE,
                "identity": decimalOne,
                "string": "*x",
                "eff": "*",
        },
        "lin_sqrt": {
                "func": BUYABLES_EFFECT_LINEAR_SQRT,
                "identity": decimalZero,
                "string": "*sqrt(x)",
                "eff": "+",
        },
}

function resetCurrBuyableExtras(){ 
        // Fully general
        for (i in MAIN_BUYABLE_DATA){
                CURRENT_BUYABLE_EXTRAS[i] = decimalZero
        }
}
resetCurrBuyableExtras()

function resetCurrBuyableEffects(){
        // Fully general
        for (i in MAIN_BUYABLE_DATA){
                let id = getIdentity(i.slice(0,1), i.slice(1,3))
                CURRENT_BUYABLE_BASES[i] = id
                CURRENT_BUYABLE_EFFECTS[i] = id
        }
}
resetCurrBuyableEffects()

function updateAllBuyableExtras(){
        // Fully general
        resetCurrBuyableExtras()
        let order = Object.keys(MAIN_BUYABLE_DATA).reverse()
        for (j in order){
                i = order[j]
                CURRENT_BUYABLE_EXTRAS[i] = reCalcBuyableExtra(i.slice(0,1), i.slice(1,3))
        }
}

function updateAllBuyableEffects(){
        // Fully general
        resetCurrBuyableEffects()
        let order = Object.keys(MAIN_BUYABLE_DATA).reverse()
        for (j in order){
                i = order[j]
                CURRENT_BUYABLE_BASES[i]   = reCalcBuyableBase(  i.slice(0,1), i.slice(1,3))
                CURRENT_BUYABLE_EFFECTS[i] = reCalcBuyableEffect(i.slice(0,1), i.slice(1,3))
        }
}

function isBuyableDefined(layer, id){
        // Fully general
        if (layers[layer] == undefined) return false
        if (layers[layer].buyables == undefined) return false
        return layers[layer].buyables[id] != undefined
}

function isBuyableUnlocked(layer, id){
        // Fully general
        if (!isBuyableDefined(layer, id)) return false
        return layers[layer].buyables[id].unlocked()
}

function getBuyableTotal(layer, id){
        // Fully general
        if (!isBuyableDefined(layer, id)) return decimalZero
        return getBuyableAmount(layer, id).plus(calcBuyableExtra(layer, id))
}

function getLayerBuyableTotal(layer){
        // Fully general
        let a = decimalZero
        for (i in player[layer].buyables){
                a = a.plus(player[layer].buyables[i])
        }
        return a
}

function getCodedBuyableAmount(code){
        // NOT fully general
        return getBuyableTotal(code.slice(0,1), code.slice(1,3)) 
}

function isValidBuyableCode(code){
        // NOT fully general
        if (code.length != 3) return false
        let letter = code.slice(0,1)
        let num = Number(code.slice(1,3))
        return isBuyableDefined(letter, num)
}

function getBuyableName(code){
        // NOT fully general
        if (MAIN_BUYABLE_DATA[code] != undefined && MAIN_BUYABLE_DATA[code].name != undefined) return MAIN_BUYABLE_DATA[code].name
        console.log("Please implement: " + code)
        return "bug bug bug"
        //return layers[code.slice(0,1)].buyables[code.slice(1,3)].title
}

function getNoExtras(layer, id){
        return false
}

function calcBuyableExtra(layer, id){
        // Fully general
        if (!isBuyableDefined(layer, id)) return decimalZero
        if (getNoExtras(layer, id)) return decimalZero
        let a = CURRENT_BUYABLE_EXTRAS[layer + id]
        if (a != undefined) return a
        return decimalZero
}

function reCalcBuyableExtra(layer, id){
        // Fully general
        let key = layer + id
        let data = MAIN_BUYABLE_DATA[key] || {}
        if (data == undefined) return decimalZero
        let amt = decimalZero
        for (i in data) {
                if (!isValidBuyableCode(i)) continue
                if (data[i].active() == true) amt = amt.plus(getCodedBuyableAmount(i))
        }
        let data2 = getAlwaysActiveAdditionalBuyables(layer, id)
        for (j in data2) {
                let i = data2[j]
                amt = amt.plus(getCodedBuyableAmount(i))
        }
        if (layer.toLowerCase() != layer) return amt 
        let data3 = EXTRA_FREE_BUYABLE_DATA[key] || {}
        for (i in data3) {
                if (data3[i].active() == true) amt = amt.plus(data3[i].amount())
        }
        return amt
}

function getAlwaysActiveAdditionalBuyables(layer, id){
        // kinda a spec thing, but basically general
        let l = []
        let hitCurrentLayerYet = false
        for (j in LAYERS){
                i = LAYERS[j]
                if (layers[i].row == "side") continue
                if (hasMilestone("T", 8) && i != i.toLowerCase()) continue // remove all upper case letter buyables
                if (hitCurrentLayerYet && isBuyableDefined(i, id)) l.push(i+id)
                if (i == layer) hitCurrentLayerYet = true
        }
        if (id == 33) return l
        if (isBuyableDefined(layer, 33)) l.push(layer+33)
        return l
}

function getBuyableExtraText(layer, id){
        // Fully general
        let a = "<b><h3>Extra levels from:</h3><br>"
        let extra = false
        let key = layer + id
        let data = MAIN_BUYABLE_DATA[key] || {}
        for (i in data) {
                if (!isValidBuyableCode(i)) continue
                if (data[i].active() == true) {
                        extra = true
                        a += "<h3>" + getBuyableName(i) + "</h3>, "
                }
        }
        let data3 = EXTRA_FREE_BUYABLE_DATA[key] || {}
        for (i in data3) {
                if (!data3[i].name) continue
                if (data3[i].active() == true) {
                        extra = true
                        a += "<h3>" + data3[i].name + "</h3>, "
                }
        }
        if (!extra) return ""
        return a.slice(0, a.length-2) + "<br>"
}

function BUYABLE_EFFECT_EXPONENTIAL(a,b){
        return a.pow(b)
}

function BUYABLE_EFFECT_EXPONENTIAL_SQRT(a,b){
        return a.pow(b.sqrt())
}

function BUYABLE_EFFECT_EXPONENTIAL_POINT8(a,b){
        return a.pow(b.pow(.8))
}

function BUYABLE_EFFECT_EXPONENTIAL_CBRT(a,b){
        return a.pow(b.cbrt())
}

function BUYABLES_EFFECT_LINEAR(a,b){
        return a.times(b)
}

function BUYABLES_EFFECT_LINEAR_POINT8(a,b){
        return a.times(b.pow(.8))
}

function BUYABLES_EFFECT_LINEAR_PLUS1(a,b){
        return a.times(b).plus(1)
}

function BUYABLES_EFFECT_LINEAR_PLUS1SQRT(a,b){
        return a.times(b).plus(1).sqrt()
}

function BUYABLES_EFFECT_LINEAR_PLUS1_SQUARE(a,b){
        return a.times(b.pow(2)).plus(1)
}

function BUYABLES_EFFECT_LINEAR_SQRT(a,b){
        return a.times(b.sqrt())
}

function getBuyableEffectFunction(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) return BUYABLE_EFFECT_EXPONENTIAL
        let func = MAIN_BUYABLE_DATA[layer+id]["func"]
        if (typeof func == "function") return func // if its a function, then return the function
        return BUYABLES_FUNCTION_NAMES[func]["func"] || BUYABLE_EFFECT_EXPONENTIAL
}

function getBuyableEffectSymbol(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) return "bug"
        let data = MAIN_BUYABLE_DATA[layer+id]
        if (typeof data["effectSymbol"] == "function") return data["effectSymbol"]()
        
        return data["effectSymbol"] || BUYABLES_FUNCTION_NAMES[data["func"]]["eff"] || "bug"
}

function getBuyableEffectString(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) return "bug"
        let func = MAIN_BUYABLE_DATA[layer+id]["func"]
        if (typeof func == "function") {
                let ef = MAIN_BUYABLE_DATA[layer+id]["effectSymbol"]
                if (typeof ef == "function") return MAIN_BUYABLE_DATA[layer+id]["effectString"]()
                return ef
        }
        return BUYABLES_FUNCTION_NAMES[func]["string"] || "bug"
}

function reCalcBuyableBase(layer, id){
        if (!isValidBuyableCode(layer + id)) {
                console.log("Your code broke at " + layer + id)
                Decimal(0)
        }
        if (!isBuyableActive(layer, id)) return getIdentity(layer, id)
        
        let data = MAIN_BUYABLE_DATA[layer + id].base
        let a = data.initial
        let b = 0
        while (b < 20){ //maybe change later
                b ++
                let data2 = data[b]
                //this is the data
                if (data2 == undefined) break
                //if data undefined done w loop
                if (data2.active != undefined && !data2.active()) continue
                //if the effect isnt active continue to next effect
                let func = data2.type
                if (typeof func == "function") func = func()
                let eff = data2.amount()
                //effect of the effect... 
                if (func == "set") a = new Decimal(eff)
                else if (func == "add" || func == "plus") a = a.plus(eff)
                else if (func == "mult" || func == "times") a = a.times(eff)
                else if (func == "exp" || func == "pow") a = a.pow(eff)
                else if (func == "max") a = a.max(eff)
                else {
                        console.log("ahh")
                        console.log(b)
                        console.log(layer + id)
                }
                //do the effect to a
        }
        return a
}

function getIdentity(layer, id){
        // Fully general
        let data1 = MAIN_BUYABLE_DATA[layer + id]
        if (typeof data1.func == "function") return data1.identity
        return BUYABLES_FUNCTION_NAMES[data1.func]["identity"]
}

function reCalcBuyableEffect(layer, id){
        // Fully general
        if (!isBuyableActive(layer, id)) return getIdentity(layer, id)
        let base = CURRENT_BUYABLE_BASES[layer + id]

        return getBuyableEffectFunction(layer,id)(base, getBuyableTotal(layer, id))
}

function getBuyableBase(layer, id){
        // Fully general
        return CURRENT_BUYABLE_BASES[layer + id]
}

function getBuyableBases(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) {
                console.log("ya boi broke" + layer+ id)
                Decimal(0)
        }
        return MAIN_BUYABLE_DATA[layer + id].bases()
}

function getBuyableCost(layer, id, delta = decimalZero){
        // assuming the cost formula is alwuas the same fully general
        let b = getBuyableBases(layer, id)
        let x = getBuyableAmount(layer, id).plus(delta)

        return new Decimal(b[0]).times(Decimal.pow(b[1], x)).times(Decimal.pow(b[2], x.pow(2))).ceil()
}

function canAffordBuyable(layer, id, cost = undefined){
        // Fully general
        if (player.tab != layer) return false
        let amt = getBuyableAmount(layer, id)
        if (amt.eq(amt.plus(1))) return false
        if (cost == undefined) cost = getBuyableCost(layer, id, 0)
        return player[layer].points.gte(cost) && getBuyableAmount(layer, id).lt(getMaxBuyablesAmount(layer))
}

function isBuyableFree(layer){
        // Spec function
        if (hasUpgrade("T", 11) && layer == "E")        return true
        if (hasUpgrade("d", 21) && layer == "d")        return true
        if (hasMilestone("a", 4) && layer == "a")       return true
        return false
}

function buyManualBuyable(layer, id){
        // Fully general
        let cost = getBuyableCost(layer, id)
        if (!canAffordBuyable(layer, id, cost)) return
        player[layer].buyables[id] = player[layer].buyables[id].plus(1)
        if (!isBuyableFree(layer)) player[layer].points = player[layer].points.minus(cost)
        return true
}

function buyMaximumBuyable(layer, id, maximum){
        // Fully general
        let maxAllowed = getMaxBuyablesAmount(layer)
        if (getBuyableAmount(layer, id).gte(maxAllowed)) return
        let bases = getBuyableBases(layer, id)
        let pts = player[layer].points
        if (!isBuyableUnlocked(layer, id)) return 
        if (pts.lt(bases[0])) return 
        
        let pttarget = pts.div(bases[0]).log(1.01)
        let bfactor = Decimal.log(bases[1], 3).div(Decimal.log(1.01, 3))
        //want to find ax^2+bx = c
        let c = pttarget
        let b = bfactor
        let a = Decimal.log(bases[2], 3).div(Decimal.log(1.01, 3))

        let target = c.times(a).times(4).plus(b.pow(2)).sqrt().minus(b).div(2).div(a).floor().plus(1)
        //-b + sqrt(b*b+4*c*a)

        target = target.min(maxAllowed)

        let diff = target.minus(player[layer].buyables[id]).max(0)
        if (maximum != undefined) diff = diff.min(maximum)
                                
        player[layer].buyables[id] = player[layer].buyables[id].plus(diff)

        if (isBuyableFree(layer) || diff.eq(0)) return diff.gt(0)
        pts = pts.sub(getBuyableCost(layer, id, -1)).max(0)
        //max 0 so nothing goes horribly wrong with weird errors and stuffs
        return diff.gt(0)
}

function getBuyableAmountDisplay(layer, id){
        // Fully general
        let extra = calcBuyableExtra(layer, id)
        if (extra.eq(0)) return formatWhole(getBuyableAmount(layer, id))
        return formatWhole(getBuyableAmount(layer, id)) + "+" + formatWhole(extra)
}

function getBuyableDisplay(layer, id){
        // other than softcapping fully general
        if (!shiftDown) {
                let amt = "<b><h2>Amount</h2>: " + getBuyableAmountDisplay(layer, id) + "</b><br>"
                let eff1 = "<b><h2>Effect</h2>: " + getBuyableEffectSymbol(layer, id) 
                let effectsName = MAIN_BUYABLE_DATA[layer + id]["effects"]
                if (typeof effectsName == "function") effectsName = effectsName()
                let b = CURRENT_BUYABLE_EFFECTS[layer + id]
                let effDisp = (b.gte(.1) || b.eq(0) || controlDown) ? format(b, 4) : (format(b.times(1000), 4) + "/1000")
                let eff2 = effDisp + " " + effectsName + "</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost(layer, id)) + " " + layers[layer].name + "</b><br>"
        
                return br + amt + eff1 + eff2 + cost + "Shift to see details"
        }

        let eformula = ""
        let b = getBuyableBase(layer, id)
        let baseDisplay = (b.gte(.1) || controlDown) ? format(getBuyableBase(layer, id), 4) : (format(getBuyableBase(layer, id).times(1000), 4) + "/1000" )
        if (MAIN_BUYABLE_DATA[layer + id]["eFormula"] != undefined) {
                eformula = MAIN_BUYABLE_DATA[layer + id]["eFormula"]
                if (typeof eformula == "function") eformula = eformula()
                eformula = eformula.replace("[base]", baseDisplay)
        } else {
                eformula = baseDisplay + getBuyableEffectString(layer, id)
                if (MAIN_BUYABLE_DATA[layer + id].func == "linp1")      eformula = "1+" + eformula
                if (MAIN_BUYABLE_DATA[layer + id].func == "linp1sq")    eformula = "1+" + eformula + "<sup>2</sup>"
        }
        let allEff = "<b><h2>Effect formula:</h2><br>" + eformula + "</b><br>"

        let bases = getBuyableBases(layer, id)
        let cost1 = "<b><h2>Cost formula:</h2><br>"
        let cost3 = "</b><br>"
        let cost2a = bases[0].eq(1) ? "" :  "" + formatBuyableCostBase(bases[0]) + ""
        let cost2b = bases[1].eq(1) ? "" : "*" + formatBuyableCostBase(bases[1]) + "<sup>x</sup>"
        let cost2c = bases[2].eq(1) ? "" : "*" + formatBuyableCostBase(bases[2]) + "<sup>x<sup>2</sup></sup>" 
        let cost2 = cost2a + cost2b + cost2c
        if (cost2[0] == "*") cost2 = cost2.slice(1) //removes the star if its the first character
        let allCost = cost1 + cost2 + cost3

        return br + allEff + getBuyableExtraText(layer, id) + allCost
}

function formatBuyableCostBase(x){
        if (x.lt(1)) {
                let a = formatBuyableCostBase(Decimal.div(1, x))
                if (a == "1") return "1"
                return "1/" + a
        } else if (x.lt(1.0001)) return "1"
        else if (x.eq(x.floor())) return formatWhole(x)
        else if (x.lt(1.99)) return format(x, 4)
        else if (x.lt(10)) return format(x, 3)
        return format(x)
}

function getGeneralizedBuyableData(layer, id, unlockedTF){
        let title = getBuyableName(layer + id)
        let display = function(){
                return getBuyableDisplay(layer, id)
        }
        let effect = function(){
                return CURRENT_BUYABLE_EFFECTS[layer+id]
        }
        let canAfford = function(){
                return canAffordBuyable(layer, id)
        }
        let total = function(){
                return getBuyableAmount(layer, id).plus(this.extra())
        }
        let extra = function(){
                return calcBuyableExtra(layer, id)
        }
        let buy = function(){
                return buyManualBuyable(layer, id)
        }
        let buyMax = function(maximum){
                return buyMaximumBuyable(layer, id, maximum)
        }
        return {
                title: title, 
                display: display, 
                effect: effect,
                canAfford: canAfford,
                total: total,
                extra: extra,
                buy: buy,
                buyMax: buyMax,
                unlocked: unlockedTF,
                }
}

function getLayerGeneralizedBuyableData(layer, unlocks, additional){
        let ret = {
                rows: 3,
                cols: 3,
        }
        let ids = [11, 12, 13, 21, 22, 23, 31, 32, 33]
        for (i = 0; i < unlocks.length; i ++) {
                let id = ids[i]
                ret[id] = getGeneralizedBuyableData(layer, id, unlocks[i])
        }
        if (!additional) return ret
        let keys = additional.keys()
        for (i in keys){
                ret[keys[i]] = additional[keys[i]]
        }

        return ret
}

function getBuyableDataDisplay(layer, id) {
        let data = MAIN_BUYABLE_DATA[layer + id]
        if (data == undefined) return "Not defined"
        if (!tmp[layer].buyables[id].unlocked) return "Not unlocked"

        let a = "Buyable " + layer + id + " is named " + data.name + " and it's function is " + data.func

        if (data.func == "exp") a += " meaning it's formula is base<sup>amount</sup>"
        if (data.func == "lin") a += " meaning it's formula is base*amount"
        if (data.func == "linp1") a += " meaning it's formula is base*amount+1"

        let b = "It affects " + data.effects + ". It's base is initially " + format(data.base.initial)
        b += " and is affected by the following things:"
        //MAIN_BUYABLE_DATA['a11'].base[1] + ""

        let c = "It is given extra levels by the following things:"
        // MAIN_BUYABLE_DATA['a11'].a12.active + ""
        
}

function isBuyableActive(layer, id){
        if (layer == "o") return true
        if (layer == "n") return true
        if (layer == "m") return true
        if (layer == "l") return true
        if (layer == "k") return true
        if (layer == "j") return true
        if (layer == "i") return true
        if (layer == "h") return true
        if (layer == "g") return true
        if (layer == "f") return true
        if (layer == "e") return true
        if (layer == "E") return true
        if (layer == "d") return true
        if (layer == "c") return true
        if (layer == "b") return true
        if (layer == "a") return true
        console.log(layer, id)
        return true
}

function getABBulk(layer){
        let amt = decimalOne
        if (player.dev && player.dev.forceBulk) amt = amt.times(100) 
        if (layer == "a"){
                if (hasUpgrade("b", 12))        amt = amt.times(Math.max(1, player.b.upgrades.length))
                if (hasUpgrade("c", 11))        amt = amt.times(10)
                if (hasMilestone("c", 18))      amt = amt.times(2)
                if (player.f.unlocked)          amt = amt.times(10)
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1))
                if (hasUpgrade("c", 12))        amt = amt.pow(player.c.upgrades.length)
                if (hasUpgrade("c", 43))        amt = amt.pow(2)
                if (hasMilestone("e", 15))      amt = amt.pow(Decimal.pow(2, player.e.milestones.length))
                if (hasMilestone("G", 1))       amt = amt.pow(2)
        }
        if (layer == "b") {
                if (hasMilestone("c", 5))       amt = amt.times(2)
                if (hasUpgrade("c", 12))        amt = amt.times(player.c.upgrades.length)
                if (hasMilestone("c", 18))      amt = amt.times(2)
                if (hasMilestone("d", 2))       amt = amt.times(2)
                if (hasUpgrade("d", 14))        amt = amt.times(3)
                if (player.f.unlocked)          amt = amt.times(10)
                if (hasUpgrade("a", 51))        amt = amt.times(Decimal.pow(2, player.a.upgrades.filter(x => x < 60 && x > 50).length))
                if (hasMilestone("T", 13))      amt = amt.times(Decimal.pow(2, player.T.points))
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1))
                if (hasUpgrade("b", 41))        amt = amt.pow(2)
                if (hasUpgrade("c", 34))        amt = amt.pow(2)
                if (hasUpgrade("c", 43))        amt = amt.pow(2)
                if (hasMilestone("e", 45))      amt = amt.pow(2)
                if (hasMilestone("G", 1))       amt = amt.pow(2)
        }
        if (layer == "c") {
                if (hasMilestone("d", 2))       amt = amt.times(2)
                if (hasMilestone("d", 5))       amt = amt.times(3)
                if (hasMilestone("T", 13))      amt = amt.times(Decimal.pow(2, player.T.points))
                if (player.f.unlocked)          amt = amt.times(10)
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1))
                if (hasMilestone("e", 1))       amt = amt.times(2).pow(2)
                if (hasMilestone("d", 6))       amt = amt.pow(2)
                if (hasUpgrade("b", 55))        amt = amt.pow(2)
                if (hasMilestone("e", 34))      amt = amt.pow(2)
                if (hasMilestone("G", 1))       amt = amt.pow(2)
        }
        if (layer == "d") {
                if (hasUpgrade("c", 35))        amt = amt.times(5)
                if (hasMilestone("d", 14))      amt = amt.times(2)
                if (hasMilestone("d", 15)) {
                        amt = amt.times(2)
                        if (player.d.points.gte("1e12859")) amt = amt.times(2)
                        if (player.d.points.gte("1e13059")) amt = amt.times(2)
                }
                if (hasMilestone("e", 3))       amt = amt.times(1 + player.e.times)
                if (false /*player.g.unlocked*/)amt = amt.times(10)
                if (hasMilestone("f", 8))       amt = amt.times(2)
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1))
                if (hasMilestone("E", 8))       amt = amt.times(player.T.points.max(1))
                if (hasMilestone("f", 1))       amt = amt.times(2).pow(2)
                if (hasMilestone("G", 1))       amt = amt.pow(2)
        }
        if (layer == "e") {
                if (hasMilestone("T", 2))       amt = amt.times(player.T.milestones.length)
                if (hasMilestone("e", 43) && player.f.unlocked) {
                                                amt = amt.times(2)
                }
                if (hasMilestone("e", 55) && player.f.unlocked) {
                                                amt = amt.times(2)
                }
                if (hasMilestone("f", 3))       amt = amt.times(2)
                if (hasMilestone("f", 5))       amt = amt.times(1 + player.f.times)
                if (hasMilestone("f", 8))       amt = amt.times(2)
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1))
                if (false /*player.h.unlocked*/)amt = amt.times(10)
                if (hasMilestone("f", 2))       amt = amt.pow(2)
                if (hasMilestone("G", 1))       amt = amt.pow(2)
        }
        if (layer == "E") {
                if (hasMilestone("f", 3))       amt = amt.times(2)
                if (hasMilestone("T", 7) && player.G.unlocked) {
                                                amt = amt.times(2)
                }
                if (hasUpgrade("T", 12))        amt = amt.times(player.T.upgrades.length)
                if (hasMilestone("f", 5))       amt = amt.times(1 + player.f.times)
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1)).pow(2)
        }
        if (layer == "f") {
                if (hasMilestone("f", 22))      amt = amt.times(2)
                if (hasMilestone("f", 23))      amt = amt.times(2)
                if (hasMilestone("G", 1))       amt = amt.times(player.G.points.plus(1))
                if (hasMilestone("T", 17) && player.G.unlocked) {
                                                amt = amt.times(2)
                }
                if (hasMilestone("G", 1))       amt = amt.pow(2)
        }
        return amt.floor()
}

function getABSpeed(layer){
        let diffmult = 1 // times per second
        if (layer == "a") {
                if (hasUpgrade("b", 11)) diffmult *= player.b.times + 1
                if (hasMilestone("G", 1))       diffmult *= 2
        }
        if (layer == "b") {
                if (hasMilestone("c", 4)) diffmult *= Math.max(1, player.c.times)
                if (hasMilestone("G", 1))       diffmult *= 2
        }
        if (layer == "c"){
                // do multiplications first
                if (hasMilestone("d", 3)) diffmult *= Math.max(1, player.d.times)
                if (hasMilestone("d", 1) && hasUpgrade("b", 31)) diffmult += 1
                if (hasMilestone("G", 1))       diffmult *= 2
        }
        if (layer == "d") {
                if (hasMilestone("d", 14)) diffmult *= 2
                if (hasMilestone("d", 15)) {
                        diffmult *= 2
                        if (player.d.points.gte("1e12859")) diffmult *= 2
                        if (player.d.points.gte("1e13059")) diffmult *= 2
                }
                if (hasMilestone("e", 3)) diffmult *= 1 + player.e.times
                if (hasMilestone("f", 8)) diffmult *= 2
                if (hasMilestone("G", 1))       diffmult *= 2
        }
        if (layer == "e") {
                if (hasUpgrade("E", 12))        diffmult *= player.T.tier.max(1).sqrt().div(2).min(1000).toNumber()
                if (hasMilestone("e", 43) && player.f.unlocked) diffmult *= 2
                if (hasMilestone("e", 55) && player.f.unlocked) diffmult *= 2
                if (hasMilestone("f", 3))       diffmult *= 2
                if (hasMilestone("f", 8))       diffmult *= 2
                if (hasMilestone("G", 1))       diffmult *= 2
        }
        if (layer == "E") {
                if (hasUpgrade("T", 12))        diffmult *= Math.max(player.T.upgrades.length, 1)
                if (hasMilestone("f", 3))       diffmult *= 2
                if (hasMilestone("G", 1))       diffmult *= 2
        }
        if (layer == "f") {
                if (hasMilestone("f", 20))      diffmult *= 2
                if (hasMilestone("E", 17))      diffmult *= 2
                if (hasUpgrade("T", 33))        diffmult *= 2
                if (hasMilestone("G", 1))       diffmult *= 2
                if (hasMilestone("f", 14) && player.G.unlocked) {
                                                diffmult *= 2
                }
        }
        return diffmult
}

function canBuySimultaniously(layer){
        if (player.dev && player.dev.forceBulk)       return true 

                if(hasMilestone("G", 1))return true
        if (layer == "f")               return hasUpgrade("E", 24)
        if (layer == "E")               return hasMilestone("f", 3)
        if (layer == "e")               return hasUpgrade("E", 12) || (hasMilestone("e", 57) && player.f.unlocked) //||player.h.unlocked
        if (layer == "d")               return hasMilestone("d", player.f.unlocked ? 11 : 14) // || player.g.unlocked
        if (layer == "c")               return hasMilestone("d", 1) || (hasUpgrade("c", 23) && player.e.unlocked) || player.f.unlocked
        if (layer == "b")               return hasMilestone("c", player.d.unlocked ? 1 : 3) || player.e.unlocked
        if (layer == "a")               return hasMilestone("b", 4) || player.d.unlocked
        return false
}

function getMaxBuyablesAmount(layer){
        let ret = Decimal.pow(10, 20)

        if (layer == "a") {
                if (hasUpgrade("b", 51))        ret = ret.pow(5)
                if (hasMilestone("e", 15))      ret = ret.pow(Decimal.pow(2, player.e.milestones.length))
        }
        if (layer == "b") {
                if (hasUpgrade("c", 43))        ret = ret.times(1e5)
                if (hasMilestone("T", 13))      ret = ret.times(Decimal.pow(2, player.T.points))
                if (hasMilestone("e", 28))      ret = ret.pow(2)
                if (hasMilestone("e", 45))      ret = ret.pow(2)
        }
        if (layer == "c") {
                if (hasMilestone("T", 13))      ret = ret.times(Decimal.pow(2, player.T.points))
        }
        if (layer == "d") {
                if (player.f.challenges[12] >= 22)      ret = ret.times(Decimal.pow(10, player.f.challenges[12]))
        }
        return ret
}

function handleGeneralizedBuyableAutobuy(diff, layer){
        if (player.dev && player.dev.autoSpeed) diff *= player.dev.autoSpeed
        player[layer].abtime += diff * getABSpeed(layer)

        if (player[layer].abtime > 10) player[layer].abtime = 10
        if (player[layer].abtime > 1) {
                player[layer].abtime += -1
                let amt = getABBulk(layer)
                let tlb = tmp[layer].buyables
                let ids = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                let hasBoughtYet = false
                let cbs = canBuySimultaniously(layer)
                for (let i = 0; i < 9; i++) {
                        let id = ids[i]
                        //if (id == 32 && layer == "E" && !false) continue
                        if (tlb[id] && tlb[id].unlocked) {
                                hasBoughtYet = layers[layer].buyables[id].buyMax(amt) || hasBoughtYet
                        }
                        if (hasBoughtYet && !cbs) break
                }
        }
}

