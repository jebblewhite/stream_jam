var timer = 0;
var harvestPower = 1;
var workers = 0;
var workerCost = 50;
var copperChance = 0;
var tinChance = 0;
var oreChanceIncreaseCost = 100;
var unassignedWorkers = 0
var farmers = 0
var merchants = 0
var soldiers = 0
var farmerPower = 2
var merchantPower = 10
var soldierPower = 5
var soldierReward = 30
var soldierRisk = 10
var workerSpirit = 1
var merchantSpirit = 2
var progression = 0;

var resources = {
    "crops" : 0,
    "copper" : 0,
    "tin" : 0,
    "spirit" : 0,
    "grivna" : 0
}

const goodsList = [
    "crops",
    "copper",
    "tin"
]

const grivnaTable = {
    "crops" : 1,
    "copper" : 10,
    "tin" : 10
}

var fullTrade = {
    1: ['empty'],
    2: ['empty'],
    3: ['empty'],
}

const tradeFactions = ['The Barony of St Byzantinov', 'The Kingdom of Polthia', 'The lands of Sul-os']

function harvestCrops(x){
        resources.crops = resources.crops + x;
        let y = Math.random() * 100;
        if (copperChance > y) {
            resources.copper = resources.copper + x;
        }
        let z = Math.random() * 100;
        if (tinChance > z) {
            resources.tin = resources.tin + x
        }
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('divcrops').style.display = "block";
        document.getElementById('copper').innerHTML = resources.copper;
        if (copper > 0) {
            document.getElementById('divcopper').style.display = "block";
        }
        document.getElementById('tin').innerHTML = resources.tin;
        if (tin > 0) {
            document.getElementById('divtin').style.display = "block";
        }
    };


function buyWorker(){
    if (resources.crops >= workerCost) {
        workers = workers + 1;
        unassignedWorkers = unassignedWorkers + 1;
        resources.crops = resources.crops - workerCost;
        workerCost = Math.ceil(workerCost*1.08)
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('workers').innerHTML = workers + " -- gen. " + workers*workerSpirit + " Spirit per tick";
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers;        
        document.getElementById('divworkers').style.display = "block";
        document.getElementById('divunassignedworkers').style.display = "block";
        document.getElementById('buyworker').innerHTML = "Offer food -- Cost : " + workerCost + " crops";
        document.getElementById('divassignfarmer').style.display = "block";
        document.getElementById('divassignmerchant').style.display = "block";
        document.getElementById('divassignsoldier').style.display = "block";
    }
}

function assignFarmer() {
    if (unassignedWorkers > 0) {
        unassignedWorkers = unassignedWorkers - 1
        farmers = farmers + 1
        document.getElementById('farmers').innerHTML = farmers + " -- gen. " + farmers*farmerPower + " Crops per tick"; 
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers; 
    }
}

function assignMerchant() {
    if (unassignedWorkers > 0) {
        unassignedWorkers = unassignedWorkers - 1
        merchants = merchants + 1
        if (merchants == 1) {
            generateTrades(merchantPower)
            resources.grivna = resources.grivna + 10
            console.log("Your first Merchant brings with him 10 grivna.")
            console.log("(The local currency)")
            document.getElementById('grivna').innerHTML = resources.grivna
            document.getElementById('divgrivna').style.display = "block";
        }
        document.getElementById('merchants').innerHTML = merchants+ " -- gen. " + merchants*merchantSpirit + " Spirit per tick"; 
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers;
        document.getElementById('divtrade').style.display = "block"; 
    }
}

function assignSoldier() {
    if (unassignedWorkers > 0) {
        unassignedWorkers = unassignedWorkers - 1
        soldiers = soldiers + 1
        document.getElementById('soldiers').innerHTML = soldiers + " -- gen. approx." + soldiers*soldierPower*10 + " Spirit per conquest"; 
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers; 
        document.getElementById('divwarfare').style.display = "block";
    }
}

function increaseOreChance(){
    if (resources.crops >= oreChanceIncreaseCost) {
        copperChance++;
        tinChance++;
        resources.crops = resources.crops - oreChanceIncreaseCost;
        oreChanceIncreaseCost = oreChanceIncreaseCost*2;
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('oreincrease').innerHTML = "Increase chance of finding ores when harvesting crops -- Cost : " + oreChanceIncreaseCost + " crops";
    }
}

function eatFood(x){
    /*
    if (crops >= x) {
        spirit = spirit + 1*x
        crops = crops - x
    } else {
        spirit = spirit + 1*crops
        crops = 0
    }
    document.getElementById('crops').innerHTML = crops;
    */
    resources.spirit = resources.spirit + x;
    document.getElementById('spirit').innerHTML = resources.spirit;
    document.getElementById('divspirit').style.display = "block";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function generateSingleTrade(x){
    let y = getRandomInt(3)
    tradePartner = tradeFactions[y]
    let z = getRandomInt(goodsList.length)
    if (getRandomInt(2) == 1){
        giveGood = "grivna"
        getGood = goodsList[z]
        giveValue = x*grivnaTable[getGood]
        getValue = x
    } else {
        getGood = "grivna"
        giveGood = goodsList[z]
        getValue = x*grivnaTable[giveGood]
        giveValue = x
    }
    return [tradePartner, giveGood, giveValue, getGood, getValue]
    
}

function generateTrades(x){
    trade1list = generateSingleTrade(x)
    fullTrade[1] = trade1list
    document.getElementById('trade1').innerHTML = trade1list[0] + " offers you " + trade1list[4] + " " + trade1list[3] + " for " + trade1list[2] + " " + trade1list[1]+".";
    trade2list = generateSingleTrade(x)
    fullTrade[2] = trade2list
    document.getElementById('trade2').innerHTML = trade2list[0] + " offers you " + trade2list[4] + " " + trade2list[3] + " for " + trade2list[2] + " " + trade2list[1]+".";
    trade3list = generateSingleTrade(x)
    fullTrade[3] = trade3list
    document.getElementById('trade3').innerHTML = trade3list[0] + " offers you " + trade3list[4] + " " + trade3list[3] + " for " + trade3list[2] + " " + trade3list[1]+".";
    //update trades
}

function trade(x){
    if (resources[fullTrade[x][1]] >= fullTrade[x][2]){
        resources[fullTrade[x][1]] = resources[fullTrade[x][1]] - fullTrade[x][2]
        resources[fullTrade[x][3]] = resources[fullTrade[x][3]] + fullTrade[x][4]
        resources.spirit = resources.spirit + 2*merchantPower*merchants
        console.log("Traded " + fullTrade[x][2] + " " + fullTrade[x][1] + " for " + fullTrade[x][4] + " " + fullTrade[x][3] + ".")
        console.log("Gained " + 2*merchantPower*merchants + " Spirit through Trade")
        //update all resources
        document.getElementById('tin').innerHTML = resources.tin;
        document.getElementById('copper').innerHTML = resources.copper;
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('spirit').innerHTML = resources.spirit;
        document.getElementById('grivna').innerHTML = resources.grivna;

    }
}

function makeWar(x, riskChance, rewardChance){
    let y = Math.random() * 100;
    if (riskChance > y) {
        soldiers = soldiers - 1
        workers = workers - 1
        console.log("One of your soldiers died in battle.")
    }
    let z = Math.random() * 100;
    if (rewardChance > z) {
        randTin = Math.floor(x*(Math.random()*3+1)/2);
        resources.tin = resources.tin + randTin;
        randCopper = Math.floor(x*(Math.random()*3+1)/2);
        resources.copper = resources.copper + randCopper;
        randCrops = Math.floor(10*x*(Math.random()*3+1)/2)
        resources.crops = resources.crops + randCrops;
        randSpirit = Math.floor((10*x)*(Math.random()*3+1)/2)
        resources.spirit = resources.spirit + randSpirit;
        console.log("Your army returns with spoils of war!")
        console.log("(Gained " + randSpirit + " Spirit, " + randCrops + " Crops, " + randCopper + " Copper, " + randTin + " Tin.)")
    }
    document.getElementById('spirit').innerHTML = resources.spirit;
    document.getElementById('soldiers').innerHTML = soldiers + " -- gen. approx." + soldiers*soldierPower*10 + " Spirit per conquest"; 
    document.getElementById('workers').innerHTML = workers + " -- gen. " + workers*workerSpirit + " Spirit per tick";
    document.getElementById('tin').innerHTML = resources.tin;
    document.getElementById('copper').innerHTML = resources.copper;
    document.getElementById('crops').innerHTML = resources.crops;
    document.getElementById('divtin').style.display = "block";
    document.getElementById('divcopper').style.display = "block";


}

rewireLoggingToElement(
    () => document.getElementById("log"),
    () => document.getElementById("log-container"), true);

function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll) {
    fixLoggingFunc('log');
    fixLoggingFunc('debug');
    fixLoggingFunc('warn');
    fixLoggingFunc('error');
    fixLoggingFunc('info');

    function fixLoggingFunc(name) {
        console['old' + name] = console[name];
        console[name] = function(...arguments) {
            const output = produceOutput(name, arguments);
            const eleLog = eleLocator();

            if (autoScroll) {
                const eleContainerLog = eleOverflowLocator();
                const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
                eleLog.innerHTML += output + "<br>";
                if (isScrolledToBottom) {
                    eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
                }
            } else {
                eleLog.innerHTML += output + "<br>";
            }

            console['old' + name].apply(undefined, arguments);
        };
    }

    function produceOutput(name, args) {
        return args.reduce((output, arg) => {
            return output +
                "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
                    (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
                "</span>&nbsp;";
        }, '');
    }
}


window.setInterval(function(){
	timer++;
    if (timer == 1) {
        console.log("This is the beginning of The Free Republic of Tielze.")
    }
    if (timer == 2) {
        console.log("Around you are sprawling fields, ripe to harvest.")
        console.log()
    }
    if (progression == 0 && resources.crops > 0 && timer > 2) {
        console.log("You swing your scythe, and gain crops")
        console.log("Is this your purpose?")
        console.log()
        progression++
    }
    if (progression == 1 && resources.crops > 9) {
        console.log("Maybe if you were to harvest more crops you could ")
        console.log("draw the attention of others?")
        console.log()
        progression++
    }
    if (progression == 2 && resources.crops > 49) {
        console.log("A lone wanderer comes to you, looking for food.")
        console.log()
        progression++
    }
    if (progression == 6 && workers > 0) {
        console.log("Which tools will you provide them?")
        console.log()
        progression++
    }
    if (progression == 5 && workers > 0) {
        console.log("This. This is your purpose.")
        progression++
    }
    if (progression == 4 && workers > 0) {
        console.log("You feel their Spirit surging forth.")
        progression++
    }
    if (progression == 3 && workers > 0) {
        console.log("The wanderer agrees to work with you.")
        progression++
    }
    
    
    
    //document.getElementById('timer').innerHTML = timer; 
    if (resources.crops >= 50) {
        document.getElementById('divworker').style.display = "block";
    }
    if (resources.crops >= 100) {
        document.getElementById('divupgrades').style.display = "block";
        document.getElementById('divoreincrease').style.display = "block";
    }
    if (workers > 0){
        eatFood(workers)
    }
    if (farmers > 0) {
        harvestCrops(farmers*farmerPower)
    }
    if (soldiers > 0 && timer%10 == 0) {
        makeWar(soldiers*soldierPower, soldierRisk, soldierReward)
    }
	
}, 1000);