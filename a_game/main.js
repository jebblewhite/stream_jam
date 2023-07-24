var timer = 0;
var procSection = 1

var i_f_params = {}
var proc_params = {}

var job = 0
var peace = 0
var dignity = 0
var social = 0
var mentalSpirit = 4763

var jobDone = 0
var peacePerClick = 1
var dignityPerClick = 1
var socialPerClick = 1

var noWorkDone = 0
var jobWarned = false
var workPerTen = [1,1,1,1,1,1,1,0]
var timeTilDecay = 13
var socialWarned = false

var harvestPower = 1;
var workers = 0;
var workerCost = 20;
var copperChance = 0;
var tinChance = 0;
var oreChanceIncreaseCost = 100;
var unassignedWorkers = 0
var workerSpirit = 1
var spiritThreshold = 0

var farmers = 0
var merchants = 0
var soldiers = 0

var farmerPower = 2
var merchantPower = 10
var soldierPower = 100

var farmerPower = 2
var farmerClick = 0
var farmerSpirit = 0
var fuseMetals = false

var soldierReward = 1
var soldierRisk = 0
var soldierChance = 0


var merchantSpirit = 2
var dealModifier = 1;
var tradeCooldownTime = 10000;

var progression = 0;

var warCooldownTime = 10000;

var resources = {
    "crops" : 0,
    "copper" : 0,
    "tin" : 0,
    "spirit" : 0,
    "grivna" : 0,
    "trophies" : 0,
    "bronze" : 0
}

var upgrades = {
    "oreChanceIncrease":{"segment": 'divupgrades',"cost":30, "resource":"crops", "div":"divoreincrease", "element_id":"oreincrease", "element_content": "Increase chance of finding ores when harvesting crops -- Cost : ^^^F crops"},
    "betterTradeDeals":{"segment": 'divupgrades',"cost":100, "resource":"grivna", "div":"divbettertradedeals", "element_id":"bettertradedeals", "element_content": "Better Trade deals -- Cost : ^^^F grivna"},
    "reduceTradeCooldown":{"segment": 'divupgrades',"cost":150, "resource":"grivna", "div":"divreducetradecooldown", "element_id":"reducetradecooldown", "element_content": "Reduce Trade Cooldown -- Cost : ^^^F grivna"},
    "fuseMetalsUp": {"segment": 'divupgrades',"cost":150, "resource":"tin", "div":"divfusemetals", "element_id":"fusemetals", "element_content": "Farmers fuse copper and tin (2:1) to create bronze -- Cost : ^^^F tin"},
    "farmerClickUp": {"segment": 'divupgrades',"cost":1000, "resource":"crops", "div":"divfarmerclick", "element_id":"farmerclick", "element_content": "Multiply Click harvest power by total Farmer harvest power -- Cost : ^^^F crops"},
    "farmerSpiritUp": {"segment": 'divupgrades',"cost":100, "resource":"bronze", "div":"divfarmerspirit", "element_id":"farmerspirit", "element_content": "Gain spirit when you gain crops -- Cost : ^^^F bronze"},
    "farmerPowerUp": {"segment": 'divupgrades',"cost":100, "resource":"copper", "div":"divfarmerpower", "element_id":"farmerpower", "element_content": "Double Farmer harvest power -- Cost : ^^^F copper"},
    "soldierMultiUp": {"segment": 'divwarfare',"cost":120, "resource":"trophies", "div":"divsoldiermulti", "element_id":"soldiermulti", "element_content": "Double War rewards -- Cost : ^^^F trophies"},
    "soldierChanceUp": {"segment": 'divwarfare',"cost":80, "resource":"copper", "div":"divsoldierchance", "element_id":"soldierchance", "element_content": "Reward Chance Boost Up -- Cost : ^^^F copper"},
    "soldierRiskUp": {"segment": 'divwarfare',"cost":80, "resource":"tin", "div":"divsoldierrisk", "element_id":"soldierrisk", "element_content": "Risk Chance Reduction -- Cost : ^^^F tin"}
}


var goodsList = [
    "crops",
    "copper",
    "tin"
]

const grivnaTable = {
    "crops" : 1,
    "copper" : 10,
    "tin" : 20,
    "trophies" : 50,
    "bronze" : 100
}

var fullTrade = {
    1: ['empty'],
    2: ['empty'],
    3: ['empty'],
}

var fullWar = {
    1: ['empty'],
    2: ['empty'],
    3: ['empty'],
}

const tradeFactions = ['The Barony of St Byzantinov', 'The Kingdom of Polthia', 'The lands of Sul-os']

const warTable = {
    'The Barony of St Byzantinov':{"riskChance": 10, "rewardChance": 30, "riskMultiplier": 1, "rewardMultiplier": 1, "bonusResource": "crops"},
    'The Kingdom of Polthia': {"riskChance": 25, "rewardChance": 25, "riskMultiplier": 3, "rewardMultiplier": 5, "bonusResource": "tin"}, 
    'The lands of Sul-os': {"riskChance": 50, "rewardChance": 5, "riskMultiplier": 8, "rewardMultiplier": 69, "bonusResource": "copper"}
}



var timeTilWeekend = 600








document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      resources.crops = resources.crops + 1000;
    }
  });

function harvestCrops(x, click){
        if (click == 1){
            x = x + x*farmerClick*farmers*farmerPower
        }
        resources.crops = resources.crops + x;
        let y = Math.random() * 100;
        if (copperChance > y) {
            resources.copper = resources.copper + x;
        }
        let z = Math.random() * 100;
        if (tinChance > z) {
            resources.tin = resources.tin + x
        }
        resources.spirit = resources.spirit+(x*farmerSpirit)
        document.getElementById('spirit').innerHTML = resources.spirit;
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('divcrops').style.display = "block";
        document.getElementById('copper').innerHTML = resources.copper;
        if (resources.copper > 0) {
            document.getElementById('divcopper').style.display = "block";
        }
        document.getElementById('tin').innerHTML = resources.tin;
        if (resources.tin > 0) {
            document.getElementById('divtin').style.display = "block";
        }
        if (resources.bronze > 0) {
            document.getElementById('divbronze').style.display = "block";
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
        document.getElementById('soldiers').innerHTML = soldiers
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers; 
        document.getElementById('divwarfare').style.display = "block";
        generateWar()
    }
}


function fuseMetalsUp() {
    upgradeName = "fuseMetalsUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        fuseMetals = true //Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = "none"; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
        document.getElementById('divbronze').style.display = 'block';
    }
}

function farmerClickUp() {
    upgradeName = "farmerClickUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        farmerClick++ //Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function farmerSpiritUp() {
    upgradeName = "farmerSpiritUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        farmerSpirit = 1//Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function farmerPowerUp() {
    upgradeName = "farmerPowerUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        farmerPower = farmerPower*2 //Upgrade Effect
        document.getElementById('farmers').innerHTML = farmers + " -- gen. " + farmers*farmerPower + " Crops per tick"; 
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function soldierMultiUp() {
    upgradeName = "soldierMultiUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        rewardMultiplier = rewardMultiplier*2 //Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function soldierChanceUp() {
    upgradeName = "soldierChanceUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        soldierChance = soldierChance + 10 //Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function soldierRiskUp() {
    upgradeName = "soldierRiskUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        soldierRisk = soldierRisk + 10 //Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function reduceTradeCooldown(){
    if (resources.grivna >= upgrades["reduceTradeCooldown"]["cost"]) {
        if (tradeCooldownTime>1000){
            tradeCooldownTime = tradeCooldownTime - 1000
        }
        resources.grivna = resources.grivna - upgrades["reduceTradeCooldown"]["cost"];
        upgrades["reduceTradeCooldown"]["cost"] = upgrades["reduceTradeCooldown"]["cost"]*2;
        document.getElementById('grivna').innerHTML = resources.grivna;
        document.getElementById(upgrades["reduceTradeCooldown"]["element_id"]).innerHTML = upgrades["reduceTradeCooldown"]["element_content"].replace("^^^F", upgrades["reduceTradeCooldown"]["cost"])
        document.getElementById(upgrades["reduceTradeCooldown"]["div"]).style.display = "none";
    }
}

function betterTradeDeals(){
    if (resources.grivna >= upgrades["betterTradeDeals"]["cost"]) {
        dealModifier = dealModifier + 0.25
        resources.grivna = resources.grivna - upgrades["betterTradeDeals"]["cost"];
        upgrades["betterTradeDeals"]["cost"] = upgrades["betterTradeDeals"]["cost"]*2;
        document.getElementById('grivna').innerHTML = resources.grivna;
        document.getElementById(upgrades["betterTradeDeals"]["element_id"]).innerHTML = upgrades["betterTradeDeals"]["element_content"].replace("^^^F", upgrades["betterTradeDeals"]["cost"])
        document.getElementById(upgrades["betterTradeDeals"]["div"]).style.display = "none";
    }
}

function increaseOreChance(){
    if (resources.crops >= upgrades["oreChanceIncrease"]["cost"]) {
        copperChance = copperChance + 4;
        tinChance = tinChance + 2;
        resources.crops = resources.crops - upgrades["oreChanceIncrease"]["cost"];
        upgrades["oreChanceIncrease"]["cost"] = upgrades["oreChanceIncrease"]["cost"]*2;
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('oreincrease').innerHTML = "Increase chance of finding ores when harvesting crops -- Cost : " + upgrades["oreChanceIncrease"]["cost"] + " crops";
        document.getElementById('divoreincrease').style.display = "none";
    }
}

function eatFood(x){
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
    var appropList = []
    for (let item in goodsList) {
        if (grivnaTable[goodsList[item]] <= x) {
            appropList.push(goodsList[item])
            document.getElementById('div'+goodsList[item]).style.display = "block";
        }
    }
    let z = getRandomInt(appropList.length)
    var tradeValue = Math.ceil(x*(Math.random()*3+1)/2) // if x=10 -- generate number between 5 and 20
    if (getRandomInt(2) == 1){
        giveGood = "grivna"
        getGood = appropList[z]
        giveValue = tradeValue
        getValue = Math.round(Math.ceil((x/grivnaTable[getGood])*(Math.random()*3+1)/2)*dealModifier) // if x=10 and resource = "tin" -- number between
    } else {
        getGood = "grivna"
        giveGood = appropList[z]
        getValue = Math.round(tradeValue*dealModifier)
        giveValue = Math.ceil((x/grivnaTable[giveGood])*(Math.random()*3+1)/2)
    }
    return [tradePartner, giveGood, giveValue, getGood, getValue, tradeValue]
    
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
        resources.spirit = resources.spirit + 10*fullTrade[x][5]
        console.log("Traded " + fullTrade[x][2] + " " + fullTrade[x][1] + " for " + fullTrade[x][4] + " " + fullTrade[x][3] + ".")
        console.log("Gained " + 10*fullTrade[x][5] + " Spirit through Trade")
        //update all resources
        document.getElementById('tin').innerHTML = resources.tin;
        document.getElementById('copper').innerHTML = resources.copper;
        document.getElementById('crops').innerHTML = resources.crops;
        document.getElementById('spirit').innerHTML = resources.spirit;
        document.getElementById('grivna').innerHTML = resources.grivna;
        tradeCooldown()
        
    }
}

function refreshTrade(){
    tradeCooldown()
    
}

function generateSingleWar(x){
    warPartner = tradeFactions[x]
    riskChance = Math.round((1.2 - Math.random()*0.4)*warTable[warPartner]["riskChance"])
    rewardChance = Math.round((1.2 - Math.random()*0.4)*warTable[warPartner]["rewardChance"])
    riskMultiplier = warTable[warPartner]["riskMultiplier"]
    rewardMultiplier = warTable[warPartner]["rewardMultiplier"]
    bonusResource = warTable[warPartner]["bonusResource"]
    return [riskChance, rewardChance, riskMultiplier, rewardMultiplier, bonusResource]
}

function generateWar(){
    war1list = generateSingleWar(0)
    fullWar[1] = war1list
    document.getElementById('war1').innerHTML = "Go to war with " + tradeFactions[0] + " -- Risk of losses: " + fullWar[1][0] + "% / Chance of Reward: " + fullWar[1][1] + "%.";
    war2list = generateSingleWar(1)
    fullWar[2] = war2list
    document.getElementById('war2').innerHTML = "Go to war with " + tradeFactions[1] + " -- Risk of losses: " + fullWar[2][0] + "% / Chance of Reward: " + fullWar[2][1] + "%.";
    war3list = generateSingleWar(2)
    fullWar[3] = war3list
    document.getElementById('war3').innerHTML = "Go to war with " + tradeFactions[2] + " -- Risk of losses: " + fullWar[3][0] + "% / Chance of Reward: " + fullWar[3][1] + "%.";
}

function war(x) {
    if (soldiers>=1){
    makeWar(soldierPower*soldiers, fullWar[x][0], fullWar[x][1], fullWar[x][2], fullWar[x][3], fullWar[x][4])
    warCooldown()
    }
}

function wakeUp(){
    output = []
}

function makeWar(x, riskChance, rewardChance, riskMultiplier, rewardMultiplier, bonusResource){
    var warOutcome = "None"
    let z = Math.random() * (100-soldierChance);
    if (rewardChance >= z) {
        randRes = Math.round((x/grivnaTable[bonusResource])*(1.2 - Math.random()*0.4)*rewardMultiplier*5)
        randTrophies = Math.round((x/10)*(1.2 - Math.random()*0.4)*rewardMultiplier)
        resources[bonusResource] = resources[bonusResource] + randRes
        resources.trophies = resources.trophies + randTrophies;
        goodsList.indexOf("trophies") === -1 ? goodsList.push("trophies") : oops = 1;
        console.log("Your army returns with spoils of war!")
        console.log("(Gained " + randTrophies + " trophies, and looted " + randRes + " " + bonusResource + ".)")
        warOutcome = "Success"
    }

    let y = Math.random() * (100+soldierRisk);
    if (riskChance >= y) {
        if (soldiers >= riskMultiplier){
            soldiers = soldiers - riskMultiplier
            workers = workers - riskMultiplier
            workerCost = Math.ceil(50*1.08**workers)
            if (warOutcome == "Success"){
                console.log("However,")
            }
            console.log(riskMultiplier + " of your soldiers died in battle.")
        }
        else {
            workers = workers - soldiers
            workerCost = Math.ceil(50*1.08**workers)
            if (warOutcome == "Success"){
                console.log("However,")
            }
            console.log(soldiers + " of your soldiers died in battle.")
            soldiers = 0
        }
        warOutcome = "Failure"
    }
    if (warOutcome == "None"){
        randSpirit = Math.round((x/10)*(1.2 - Math.random()*0.4)*10)
        resources.spirit = resources.spirit + randSpirit;
        console.log("Your soldiers fight to a bitter stalemate.")
        console.log("You gain " + randSpirit + " spirit.")
    }
    document.getElementById('trophies').innerHTML = resources.trophies;
    document.getElementById('soldiers').innerHTML = soldiers ; 
    document.getElementById('workers').innerHTML = workers + " -- gen. " + workers*workerSpirit + " Spirit per tick";
    document.getElementById('tin').innerHTML = resources.tin;
    document.getElementById('copper').innerHTML = resources.copper;
    document.getElementById('crops').innerHTML = resources.crops;
    document.getElementById('buyworker').innerHTML = "Offer food -- Cost : " + workerCost + " crops";
    document.getElementById('divtin').style.display = "block";
    document.getElementById('divcopper').style.display = "block";
    document.getElementById('divtrophies').style.display = "block";



}


function warCooldown(){
    document.getElementById('war1').disabled = true;
    document.getElementById('war2').disabled = true;
    document.getElementById('war3').disabled = true;
    document.getElementById('war1').innerHTML = 'War on cooldown...';
    document.getElementById('war2').innerHTML = 'War on cooldown...';
    document.getElementById('war3').innerHTML = 'War on cooldown...';
    setTimeout(function(){
        document.getElementById('war1').disabled = false;
        document.getElementById('war2').disabled = false;
        document.getElementById('war3').disabled = false;
        generateWar()
    },warCooldownTime);
}


function tradeCooldown(){
    document.getElementById('trade1').disabled = true;
    document.getElementById('trade2').disabled = true;
    document.getElementById('trade3').disabled = true;
    document.getElementById('refreshtrade').disabled = true;
    document.getElementById('trade1').innerHTML = 'Refreshing...';
    document.getElementById('trade2').innerHTML = 'Refreshing...';
    document.getElementById('trade3').innerHTML = 'Refreshing...';
    document.getElementById('refreshtrade').innerHTML = 'Refreshing...'
    setTimeout(function(){
        document.getElementById('trade1').disabled = false;
        document.getElementById('trade2').disabled = false;
        document.getElementById('trade3').disabled = false;
        document.getElementById('refreshtrade').disabled = false;
        generateTrades(merchantPower*merchants)
        document.getElementById('refreshtrade').innerHTML = 'Refresh Trades'
    },tradeCooldownTime);
}

function makeBronze() {
    if (resources.copper >= 2 && resources.tin >= 1){
        resources.copper = resources.copper - 2
        resources.tin = resources.tin - 1
        resources.bronze = resources.bronze + 1;
        document.getElementById('divbronze').style.display = 'block';
        document.getElementById('tin').innerHTML = resources.tin;
        document.getElementById('copper').innerHTML = resources.copper;
        document.getElementById('bronze').innerHTML = resources.bronze;
        goodsList.indexOf("bronze") === -1 ? goodsList.push("bronze") : oops = 1;
    }
    
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

function trophySpirit(){
    resources.spirit = resources.spirit + resources.trophies
    document.getElementById('spirit').innerHTML = resources.spirit;
}

function checkUpgrades(){
    for (let item in upgrades){
        if (resources[upgrades[item]["resource"]] >= upgrades[item]["cost"]) {
            if (document.getElementById(upgrades[item]["segment"]).style.display == "block") {
                document.getElementById(upgrades[item]["div"]).style.display = "block";
                document.getElementById(upgrades[item]["element_id"]).innerHTML = upgrades[item]["element_content"].replace("^^^F", upgrades[item]["cost"])
            }
            
        }
    }     
}


function setProcParams(x) {
    if (x==2) {
        passedArray = [farmers, merchants, soldiers]
        console.log(2, passedArray)
    }
    if (x==4) {
        passedArray = [farmers, merchants, soldiers, job, peace, dignity, social]
        console.log(4, passedArray)

    }
    console.log(passedArray)
    return passedArray
}

function handOver(x) {
    document.getElementById("procedural"+(x-1)).style.display = "none";
    document.getElementById("interactiveFiction"+x).style.display = "block";
    var myArray = setProcParams(x)
    console.log(myArray)
    document.getElementById("interactiveFiction"+x).contentWindow.postMessage(myArray, '*');
}

window.document.addEventListener('myCustomEvent', handleEvent, false)

function handleEvent(e) {
  console.log(e.detail) // outputs: {foo: 'bar'}
  hide_i_f(e.detail.section);
  i_f_params[e.detail.section] = e.detail.passedArray
  startProcedural(parseInt(e.detail.section)+1)
}

function startProcedural(x) {
    if (x==3) {
        farmers = i_f_params[x-1][0]
        merchants = i_f_params[x-1][1]
        soldiers = i_f_params[x-1][2]
        job = i_f_params[x-1][3]
        dignity = i_f_params[x-1][4]
        peace = i_f_params[x-1][5]
        social = i_f_params[x-1][6]
        document.getElementById("job").innerHTML = job
        document.getElementById("dignity").innerHTML = dignity
        document.getElementById("peace").innerHTML = peace
        document.getElementById("social").innerHTML = social
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        
    }
    procSection = x
    document.getElementById("procedural"+x).style.display = "block";
    
    
}

function hide_i_f(x) {
    document.getElementById("interactiveFiction"+x).style.display = "none";
}

function jobClick() {
    jobDone = 1
    noWorkDone = 0
    jobWarned = false
    document.getElementById('job').innerHTML =  job
}

function dignityClick() {
    dignity = dignity + dignityPerClick   
    document.getElementById('dignity').innerHTML =  dignity
    console.log("You maintain your dignity. (+" + dignityPerClick +" dignity)")
    dignityPerClick = 0
}

function peaceClick() {
    peace = peace + peacePerClick
    console.log("You breathe deeply and find your focus. (+" + peacePerClick +" inner peace)")
    peacePerClick = 0
    document.getElementById('peace').innerHTML =  peace
}

function socialClick() {
    social = social + socialPerClick
    job--
    console.log("You catch up with friends and family. (+" + socialPerClick +" social contact)")
    socialPerClick = 0
    timeTilDecay = 13
    socialWarned = false
    document.getElementById('social').innerHTML =  social
    document.getElementById('job').innerHTML =  job
}

function increasePerClick() {
    dignityPerClick = 2

    if (peacePerClick <= 3) {
        peacePerClick = peacePerClick + 1
    } else if (peacePerClick <= 8) {
        peacePerClick = peacePerClick + 2
    } else if (peacePerClick <= 13) {
        peacePerClick = peacePerClick + 3
    } else if (peacePerClick <= 16) {
        peacePerClick = peacePerClick + 4
    } else {
        peacePerClick = 20
    }

    if (socialPerClick <= 3) {
        socialPerClick = socialPerClick + 1
    } else if (socialPerClick <= 8) {
        socialPerClick = socialPerClick + 2
    } else if (socialPerClick <= 13) {
        socialPerClick = socialPerClick + 3
    } else if (socialPerClick <= 16) {
        socialPerClick = socialPerClick + 4
    } else {
        socialPerClick = 20
    }
    
    // 0 -> 1 -> 2 -> 3 -> 4 -> 6 -> 8 -> 10 -> 13 -> 16 -> 20 -> 20 -> ... -> 20
    
}

function changeSpirit() {
    if (job>=900){
        mentalSpirit = mentalSpirit + 4
    } else if (job>=700){
        mentalSpirit = mentalSpirit + 3
    } else if (job>=500){
        mentalSpirit = mentalSpirit + 2
    } else if (job>=300){
        mentalSpirit = mentalSpirit + 1
    } else if (job>=100){
        mentalSpirit = mentalSpirit
    } else {
        mentalSpirit = mentalSpirit - 1
    }

    if (dignity>=900){
        mentalSpirit = mentalSpirit + 4
    } else if (dignity>=700){
        mentalSpirit = mentalSpirit + 3
    } else if (dignity>=500){
        mentalSpirit = mentalSpirit + 2
    } else if (dignity>=300){
        mentalSpirit = mentalSpirit + 1
    } else if (dignity>=100){
        mentalSpirit = mentalSpirit
    } else {
        mentalSpirit = mentalSpirit - 1
    }

    if (peace>=500){
        mentalSpirit = mentalSpirit + 4
    } else if (peace>=700){
        mentalSpirit = mentalSpirit + 3
    } else if (peace>=500){
        mentalSpirit = mentalSpirit + 2
    } else if (peace>=300){
        mentalSpirit = mentalSpirit + 1
    } else if (peace>=100){
        mentalSpirit = mentalSpirit
    } else {
        mentalSpirit = mentalSpirit - 1
    }

    if (social>=900){
        mentalSpirit = mentalSpirit + 4
    } else if (social>=700){
        mentalSpirit = mentalSpirit + 3
    } else if (social>=500){
        mentalSpirit = mentalSpirit + 2
    } else if (social>=300){
        mentalSpirit = mentalSpirit + 1
    } else if (social>=100){
        mentalSpirit = mentalSpirit
    } else {
        mentalSpirit = mentalSpirit - 1
    }
    mentalSpirit--
    document.getElementById('spirit3').innerHTML =  mentalSpirit
}

function statDecay() {
    var theRemovedElement = workPerTen.shift()
    workPerTen.push(jobDone)
    jobDone = 0
    if (workPerTen.reduce((a, b) => a + b, 0)==8){
        job = job + 12
        console.log("You finish up a hard day of work. (+" + 12 +" job security)")
        workPerTen = [1,1,1,1,1,1,1,0]
    }
    if (workPerTen.reduce((a, b) => a + b, 0)==0){
        noWorkDone++
    }
    if (noWorkDone >= 7) {
        job = job - 3
        if (!jobWarned) {
            console.log("You should really do some work...")
            jobWarned = true
        }
    if (noWorkDone >= 12) {
        job = job - 7
    }
        
    }
    dignity--
    peace--
    if (timeTilDecay <=3) {
        social = social - 2
        if (!socialWarned) {
            console.log("You miss your friends and family...")
            socialWarned = true
        }
    } else if (timeTilDecay == 0) {
        social = social - 5
        
    } else {
        timeTilDecay--
    }
    
    document.getElementById('job').innerHTML =  job
    document.getElementById('dignity').innerHTML =  dignity
    document.getElementById('peace').innerHTML =  peace
    document.getElementById('social').innerHTML =  social
}

window.setInterval(function(){
    if (procSection == 1){
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
        if (progression == 2 && resources.crops > 19) {
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
        
        
        if (resources.crops >= workerCost) {
            document.getElementById('divworker').style.display = "block";
        }
        if (resources.crops >= 30) {
            document.getElementById('divupgrades').style.display = "block";
        }
        checkUpgrades()
        if (workers > 0){
            eatFood(workers)
        }
        if (farmers > 0) {
            harvestCrops(farmers*farmerPower, 0)
            if (fuseMetals) {
                makeBronze()
            }
        }
        trophySpirit()
        if (resources.spirit >= spiritThreshold) {
            document.getElementById('wakeup').style.display = "block";
        }
    }
    if (procSection==3) {
        timeTilWeekend--
        document.getElementById('timetilweekend').innerHTML = timeTilWeekend
        changeSpirit()
        statDecay()
        increasePerClick()
        
    }
	
}, 1000);