var timer = 0;
var procSection = 1

var i_f_params = {}
var proc_params = {}

var weakness = 0
var section8outcome = ""  //I've changed this because you're setting it to a string later, hope this doesn't break anything!
var screamPressed = false

var insubordination = 0
var usb = 0

var foreignAidGiven = false
var morale = 1000000
var manpower = 500000
var economy = 2000000
var land = 60000
var section5prebreak = ["Spirit", "Grivna", "Soldiers", "Trophies", "Make war with neighbouring states", "Push back against The Barony"]
var section5postbreak = ["Morale", "Economy", "Manpower", "Land", "Defend your home", "Fight for Ukraine"]

var section5progress = 0
var section5type = "m"
var section5scene = 0
var timeTil5end = 60
var section5scenelist = [1,2,3,4,5,6,7,8,9,10]

var timeTil8end = 100

var job = 0
var peace = 0
var dignity = 0
var social = 0
var mentalSpirit = 5146
var jobLow = false
var peaceLow = false
var socialLow = false
var dignityLow = false

var jobDone = 0
var peacePerClick = 1
var dignityPerClick = 1
var socialPerClick = 1
var socincrementSteps = [1, 2, 3, 4, 6, 8, 10, 13, 16, 20];
var peaceincrementSteps = [1, 2, 3, 4, 6, 8, 10, 13, 16, 20];

var noWorkDone = 0
var jobWarned = false
var workPerTen = [1,1,1,1,1,1,1,0]
var timeTilDecay = 13
var socialWarned = false
var eventCounter = 0
var timeTilWeekend = 600
var section3outcome = "none"

var eventList = [
    {
        "event_text": "Borysko says you're behind on the Kostenko account.  You are, of course.  Very behind.",
        "options": ["Find someone else to help you.","Put in some (unpaid) overtime.","Just leave it."], 
        "outcomes": [[10,-30,10,15],[-15,-15,20,-5],[0,10,-40,0],""]
    },
    {
        "event_text": "A colleague, Anna, is having an 'Olympics party' at the bar frequented by the rest of the accounts team.  You weren't invited.",
        "options": ["Go anyway.","Just go home."], 
        "outcomes": [[-20,-15,0,20],[0,-5,0,-10],"",""]
    },
    {
        "event_text": "You spill coffee over yourself at lunch.  The stain, almost impressively, looks like you had a bathroom accident.",
        "options": ["Live with it.","Spend your lunch break dashing back home to get clean clothes.","Just go home.  And stay there."], 
        "outcomes": [[10,-30,0,0],[-5,10,10,-15],[10,5,-30,-5],""]
    },
    {
        "event_text": "A girl at a the bar you go to after work sometimes says she recognises you and asks if you want to dance.",
        "options": ["Say you're very bad at dancing, but say you'll buy her a drink anyway.","Dance (badly).","Tell her no."], 
         "outcomes": [[10,0,0,15],[10,-10,0,25],[20,5,0,-30],""]
    },
    {   
        "event_text": "Your lunch is missing from the breakroom fridge.",
        "options": ["Find whoever took it and confront them.","Eat nothing.","Complain to Borysko."], 
        "outcomes": [[10,30,-5,-30],[-20,-20,0,0],[10,-10,0,5],""]
    },
    {
        "event_text": "It's Artur's birthday.  You didn't get him anything.",
        "options": ["Avoid him all day.","Just wish him a happy birthday.","Sneak out to buy him something."], 
        "outcomes": [[-10,-5,0,-20],[-15,-10,10,5],[-10,-15,-10,30],""]
    },
    {
        "event_text": "You are very thirsty, but Herda, the most boring person in the office, is standing by the water cooler and shows no sign of leaving.",
        "options": ["Go get water.","Just dehydrate."], 
        "outcomes": [[5,-20,0,10],[-5,5,-10,0],"",""]
    },
    {
        "event_text": "Someone brings their dog to work.",
        "options": ["Give it a pet, despite your allergies.","Avoid it.","Take an antihistamine and commit to spending the whole day with the dog."], 
        "outcomes": [[15,-10,-5,5],[-5,5,5,-5],[25,0,-30,10],""]
    },
    {
        "event_text": "Borysko wants you to present to management.  It'll be extra work.",
        "options": ["Ask him to find someone else.","Say you'll do it (and do).","Say you'll do it (and don't)."], 
        "outcomes": [[10,-20,-15,0],[-20,-5,20,10],[15,-30,-40,0],""]
    },
    {
        "event_text": "The president has called for emergency international talks over the continued presence of Russian troops and material on the Russian, Belarusian, Crimean borders, and in the Black Sea.  Among others, the American, Japanese, German, Australian, Israeli governments have instructed their citizens to leave the country. Roleplaying is tomorrow.",
        "options": ["Cancel roleplaying.","Carry on."], 
        "outcomes": ["cancel","carry_on"]
    }
]

var taxWorkers = 0
var harvestPower = 1;
var workers = 0;
var workerCost = 20;
var copperChance = 0;
var tinChance = 0;
var oreChanceIncreaseCost = 100;
var unassignedWorkers = 0
var workerSpirit = 1
var spiritThreshold = 10000000

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
var spiritModifier = 1
var dealModifier = 1;
var tradeCooldownTime = 6000;

var progression = 0;

var warCooldownTime = 7000;

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
    "betterTradeDeals":{"segment": 'divtrade',"cost":120, "resource":"crops", "div":"divbettertradedeals", "element_id":"bettertradedeals", "element_content": "Better Trade deals -- Cost : ^^^F crops"},
    "reduceTradeCooldown":{"segment": 'divtrade',"cost":15, "resource":"copper", "div":"divreducetradecooldown", "element_id":"reducetradecooldown", "element_content": "Reduce Trade Cooldown -- Cost : ^^^F copper"},
    "fuseMetalsUp": {"segment": 'divupgrades',"cost":150, "resource":"tin", "div":"divfusemetals", "element_id":"fusemetals", "element_content": "Farmers fuse copper and tin (2:1) to create bronze -- Cost : ^^^F tin"},
    "farmerClickUp": {"segment": 'divupgrades',"cost":70, "resource":"tin", "div":"divfarmerclick", "element_id":"farmerclick", "element_content": "Increase click power by 10% of total Farmer harvest power -- Cost : ^^^F tin"},
    "farmerSpiritUp": {"segment": 'divupgrades',"cost":100, "resource":"bronze", "div":"divfarmerspirit", "element_id":"farmerspirit", "element_content": "Gain spirit when you gain crops -- Cost : ^^^F bronze"},
    "farmerPowerUp": {"segment": 'divupgrades',"cost":100, "resource":"copper", "div":"divfarmerpower", "element_id":"farmerpower", "element_content": "Boost Farmer harvest power by 50% -- Cost : ^^^F copper"},
    "soldierMultiUp": {"segment": 'divwarfare',"cost":120, "resource":"trophies", "div":"divsoldiermulti", "element_id":"soldiermulti", "element_content": "Double War rewards -- Cost : ^^^F trophies"},
    "soldierChanceUp": {"segment": 'divwarfare',"cost":80, "resource":"copper", "div":"divsoldierchance", "element_id":"soldierchance", "element_content": "Reward Chance Boost Up -- Cost : ^^^F copper"},
    "soldierRiskUp": {"segment": 'divwarfare',"cost":80, "resource":"tin", "div":"divsoldierrisk", "element_id":"soldierrisk", "element_content": "Risk Chance Reduction -- Cost : ^^^F tin"},
    "doubleTradeValue": {"segment": 'divtrade',"cost":40, "resource":"tin", "div":"divdoubletradevalue", "element_id":"doubletradevalue", "element_content": "Double Trade Value -- Cost : ^^^F tin"},
    "taxThePops": {"segment": 'divtrade',"cost":100, "resource":"grivna", "div":"divtaxthepops", "element_id":"taxthepops", "element_content": "Tax your workers -- Cost : ^^^F grivna"},
    "doubleSpiritValue": {"segment": 'divtrade',"cost":300, "resource":"grivna", "div":"divdoublespiritvalue", "element_id":"doublespiritvalue", "element_content": "Double Spirit from Trades -- Cost : ^^^F grivna"}
}


var goodsList = [
    "crops",
    "copper",
    "tin"
]

const grivnaTable = {
    "crops" : 1,
    "copper" : 5,
    "tin" : 10,
    "trophies" : 25,
    "bronze" : 50
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





document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      resources.crops = resources.crops + 1000;
    }
  });

function harvestCrops(x, click){
        if (click == 1){
            x = x + Math.floor(x*farmerClick*farmers*farmerPower*0.1)
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
            document.getElementById('merchantpower').innerHTML = merchantPower
            resources.grivna = resources.grivna + 10
            console.log("Your first Merchant brings with him 10 grivna.")
            console.log("(The local currency)")
            document.getElementById('grivna').innerHTML = resources.grivna
            document.getElementById('divgrivna').style.display = "block";
        } else {
            tradeCooldown()
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
        if (soldiers==1){
            generateWar()
        } else {
            warCooldown()
        }
        
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
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*3; // Change for onetime use
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
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2**1000; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function farmerPowerUp() {
    upgradeName = "farmerPowerUp" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        farmerPower = Math.round(farmerPower*1.5) //Upgrade Effect
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
    upgradeName = "reduceTradeCooldown"
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades["reduceTradeCooldown"]["cost"]) {
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades["reduceTradeCooldown"]["cost"];
        upgrades["reduceTradeCooldown"]["cost"] = upgrades["reduceTradeCooldown"]["cost"]*2;
        if (tradeCooldownTime>1000){
            tradeCooldownTime = tradeCooldownTime - 1000
        } else { 
            upgrades["reduceTradeCooldown"]["cost"] = 10**200
        }
        
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades["reduceTradeCooldown"]["element_id"]).innerHTML = upgrades["reduceTradeCooldown"]["element_content"].replace("^^^F", upgrades["reduceTradeCooldown"]["cost"])
        document.getElementById(upgrades["reduceTradeCooldown"]["div"]).style.display = "none";
        document.getElementById("merchantcooldown").innerHTML = Math.round(tradeCooldownTime/1000)
    }
}

function betterTradeDeals(){
    upgradeName = "betterTradeDeals"
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades["betterTradeDeals"]["cost"]) {
        dealModifier = dealModifier + 0.2
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades["betterTradeDeals"]["cost"];
        upgrades["betterTradeDeals"]["cost"] = upgrades["betterTradeDeals"]["cost"]*2;
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades["betterTradeDeals"]["element_id"]).innerHTML = upgrades["betterTradeDeals"]["element_content"].replace("^^^F", upgrades["betterTradeDeals"]["cost"])
        document.getElementById(upgrades["betterTradeDeals"]["div"]).style.display = "none";
        document.getElementById("merchantdeals").innerHTML = Math.round((dealModifier-1)*100)

    }
}

function doubleTradeValue(){
    upgradeName = "doubleTradeValue" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        merchantPower = merchantPower*2 //Upgrade Effect
        document.getElementById('merchantpower').innerHTML = merchantPower*merchants;
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*3; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
        tradeCooldown()
    }
}

function doubleSpiritValue(){
    upgradeName = "doubleSpiritValue" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        spiritModifier = spiritModifier * 2 //Upgrade Effect
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*3; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
    }
}

function taxThePops(){
    upgradeName = "taxThePops" //Upgrade Name
    if (resources[upgrades[upgradeName]["resource"]] >= upgrades[upgradeName]["cost"]) {
        if (taxWorkers==0){
            taxWorkers++
        }else{
            taxWorkers = taxWorkers*2 //Upgrade Effect
        }
        resources[upgrades[upgradeName]["resource"]] = resources[upgrades[upgradeName]["resource"]] - upgrades[upgradeName]["cost"];
        upgrades[upgradeName]["cost"] = upgrades[upgradeName]["cost"]*2; // Change for onetime use
        document.getElementById(upgrades[upgradeName]["resource"]).innerHTML = resources[upgrades[upgradeName]["resource"]];
        document.getElementById(upgrades[upgradeName]["element_id"]).innerHTML = upgrades[upgradeName]["element_content"].replace("^^^F", upgrades[upgradeName]["cost"])
        document.getElementById(upgrades[upgradeName]["div"]).style.display = "none";
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
        resources.spirit = resources.spirit + 10*fullTrade[x][5]*spiritModifier
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
    document.getElementById('merchantpower').innerHTML = merchantPower*merchants;
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

function taxation(){
    resources.grivna = resources.grivna + (workers*taxWorkers)
    console.log("Your workers pay " + (workers*taxWorkers) + " grivna in tax.")
    document.getElementById('grivna').innerHTML = resources.grivna;
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

function selectRandomScene() {
    let x = getRandomInt(section5scenelist.length)
    randomScene = section5scenelist[x]
    section5scenelist.splice(x,1)
    return randomScene
}

function setProcParams(x) {
    if (x==2) {
        passedArray = [parseInt(x), farmers, merchants, soldiers]
        
    }
    if (x==4) {
        passedArray = [parseInt(x), farmers, merchants, soldiers, job, peace, dignity, social, mentalSpirit, section3outcome]
        

    }
    if (x==6 || x==7) {
        if (section5progress % 2 == 0) {
            section5scene = (section5progress/2)+1
            section5type = "m"
        } else {
            section5scene = selectRandomScene()
            section5type = "s"
        }
        section5progress++
        passedArray = [parseInt(x), farmers, merchants, soldiers, job, peace, dignity, social, mentalSpirit, section3outcome, morale, manpower, economy, land, insubordination, usb, section5progress, section5type, section5scene] //Order changed BUT I think I've fixed in Twine.
        
    }
    if (x=="8_5") {
        passedArray = [x, farmers, merchants, soldiers, job, peace, dignity, social, mentalSpirit, section3outcome, morale, manpower, economy, land, insubordination, usb, section5progress, section5type, section5scene, section8outcome] //Order changed BUT I think I've fixed in twine.
    }
    console.log(x)
    return passedArray
}

function handOver(x) {
    document.getElementById("procedural"+(x-1)).style.display = "none";
    document.getElementById("log-container").style.color = "#424242";
    document.getElementById("hehe").style.overflow = "hidden";
    document.getElementById("interactiveFiction2").style.display = "block";
    procSection = x
    console.log(x)
    if (procSection == 6) {
        if (section5progress >= 1) {//change back to 10
            procSection = 7
        } else {
            timeTil5end = 60
            foreignAidGiven = false
        }
    
        
    }
    if (procSection == 9) {
        procSection = "8_5"
    }
    console.log(procSection)
    var myArray = setProcParams(procSection)
    console.log(myArray)
    document.getElementById("interactiveFiction2").contentWindow.postMessage(myArray, '*');
}

window.document.addEventListener('myCustomEvent', handleEvent, false)

function handleEvent(e) {
  console.log(e.detail) // outputs: {foo: 'bar'}
  hide_i_f();
  i_f_params[e.detail.section] = e.detail.passedArray
  if (e.detail.section == "8_5") {
    startProcedural(69)
  }
  else if (e.detail.section != 6) {
    startProcedural(parseInt(e.detail.section)+1)
  }
  else {
    startProcedural(parseInt(e.detail.section)-1);
}
  
}

function startProcedural(x) {
    if (x==3) {
        job = i_f_params[x-1][4]
        dignity = i_f_params[x-1][5]
        peace = i_f_params[x-1][6]
        social = i_f_params[x-1][7]
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
        console.log("The work week stretches out ahead of you.")
        console.log("Don't let it break you.")
        
    } else if (x==5) {
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
        if (section5progress <=8){ //I think this is right!  The mental break happens after 9 events.
            console.log("You are at war with The Barony of St Byzantinov.")
            console.log("Each day they push further into your territory and claim your trophies.")
            console.log("Fight for Tielze! Push them back!")
        } else {
            console.log("You are at war with The Russian Federation.")
            console.log("Each day they push further into your territory and claim your land.")
            console.log("Stay strong! Slava Ukraini!")
        }
        
    } else if (x==8){
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
        console.log("You find yourself in a bed.")
        console.log("Pain shoots through your body.")
        console.log("You hear voices, but all you see is black.")
    }
    procSection = x
    if (procSection == 69) {
        x = 5
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
        console.log("You are at war with The Russian Federation.")
        console.log("Each day they push further into your territory and claim your land.")
        console.log("Stay strong! Slava Ukraini!")
    }
    document.getElementById("procedural"+x).style.display = "block";
    
    
}

function hide_i_f() {
    document.getElementById("interactiveFiction2").style.display = "none";
    document.getElementById("log-container").style.color = "white";
    document.getElementById("hehe").style.overflow = "auto";
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
    peaceincrementSteps = [1, 2, 3, 4, 6, 8, 10, 13, 16, 20];
    document.getElementById('peace').innerHTML =  peace
}

function socialClick() {
    social = social + socialPerClick
    job--
    console.log("You catch up with friends. (+" + socialPerClick +" social contact)")
    socialPerClick = 0
    socincrementSteps = [1, 2, 3, 4, 6, 8, 10, 13, 16, 20];
    timeTilDecay = 13
    socialWarned = false
    document.getElementById('social').innerHTML =  social
    document.getElementById('job').innerHTML =  job
}

function increasePerClick() {
    dignityPerClick = 2;
    if (peacePerClick!=20){
        peacePerClick = peaceincrementSteps.shift()
    }
    if (socialPerClick!=20){
        socialPerClick = socincrementSteps.shift()
    }
    console.log(peacePerClick)
}


function calculateContribution(value) {
    if (value >= 900) return 4;
    if (value >= 700) return 3;
    if (value >= 500) return 2;
    if (value >= 300) return 1;
    if (value >= 100) return 0;
    return -1;
}

function changeSpirit() {
    const jobContribution = calculateContribution(job);
    const dignityContribution = calculateContribution(dignity);
    const peaceContribution = calculateContribution(peace);
    const socialContribution = calculateContribution(social);

    mentalSpirit += jobContribution + dignityContribution + peaceContribution + socialContribution - 1;
    mentalSpirit = Math.max(0, mentalSpirit);

    document.getElementById('spirit3').innerHTML = mentalSpirit;
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
            console.log("You miss your friends...")
            socialWarned = true
        }
    } else if (timeTilDecay == 0) {
        social = social - 5
        
    } else {
        timeTilDecay--
    }
    if (peace<0){
        peace=0
        if (!peaceLow) {
            console.log("You have a panic attack in the street.")
            peaceLow = true
        }
    }
    if (dignity<0){
        dignity=0
        if (!dignityLow) {
            console.log("You are disgusting.")
            dignityLow = true
        }
    }
    if (job<0){
        job=0
        if (!jobLow) {
            console.log("You are going to lose your job.")
            jobLow = true
        }
    }
    if (social<0){
        social=0
        if (!socialLow) {
            console.log("You have never felt so alone.")
            socialLow = true
        }
    }
    document.getElementById('job').innerHTML =  job
    document.getElementById('dignity').innerHTML =  dignity
    document.getElementById('peace').innerHTML =  peace
    document.getElementById('social').innerHTML =  social
}

function showEvent(x){
    document.getElementById('events').style.display = "block"
    document.getElementById('event_text').innerHTML =  eventList[x]["event_text"]
    for (let item in eventList[x]["options"]) {
        document.getElementById('eventoption'+item).style.display = "block"
        document.getElementById('eventoption'+item).innerHTML =  eventList[x]["options"][item]
    }


}

function eventOption(x){
    if (eventCounter==9){
        if (x==0){
            section3outcome = "cancel"
        } else {
            section3outcome = "carry_on"
        }
        handOver(4)
    } else {
        eventOutcome(eventList[eventCounter]["outcomes"][x])
    } 
    for (let item in eventList[x]["options"]) {
        document.getElementById('eventoption'+item).style.display = "none"
    }
    document.getElementById('events').style.display = "none"
    eventCounter++
    
}

function eventOutcome(decision){
    if (decision.length == 4){
        peace = peace + decision[0]
        dignity = dignity + decision[1]
        job = job + decision[2]
        social = social + decision[3]
        if (mentalSpirit<=2000) {
            peace = peace + 10
            dignity = dignity + 10
            job = job + 10
            social = social + 10
        }
        if (mentalSpirit>=5000) {
            peace = peace - 10
            dignity = dignity - 10
            job = job - 10
            social = social - 10
        }
        
        if (peace<0){
            peace=0
            if (!peaceLow) {
                console.log("You have a panic attack in the street.")
                peaceLow = true
            }
            
        }
        if (dignity<0){
            dignity=0
            if (!dignityLow) {
                console.log("You are disgusting.")
                dignityLow = true
            }
        }
        if (job<0){
            job=0
            if (!jobLow) {
                console.log("You are going to lose your job.")
                jobLow = true
            }
        }
        if (social<0){
            social=0
            if (!socialLow) {
                console.log("You have never felt so alone.")
                socialLow = true
            }
        }
        document.getElementById('job').innerHTML =  job
        document.getElementById('dignity').innerHTML =  dignity
        document.getElementById('peace').innerHTML =  peace
        document.getElementById('social').innerHTML =  social
    } else {
        console.log("You are paralysed by indecision.")
    }
    
}

function doctorsPrognosis(){
    const prognosisList = ["Poor", "Stable", "Improving", "Hopeful", "Good", "Ready to be sent back"]
    var prognosis = prognosisList[Math.floor((100-timeTil8end)/20)]
    document.getElementById("prognosis").innerHTML = prognosis
}

function loseSpirit(){
    //if (!screamPressed){
        mentalSpirit = mentalSpirit - 100
        document.getElementById("section8spirit").innerHTML = mentalSpirit
    //}
    
}

function powerThrough(){
    mentalSpirit = mentalSpirit + 5
    document.getElementById("section8spirit").innerHTML = mentalSpirit
}

function scream(){
    mentalSpirit = mentalSpirit + 400
    weakness++
    screamPressed = true
    console.log("You scream through the pain")
    document.getElementById("section8spirit").innerHTML = mentalSpirit
    document.getElementById("weakness").innerHTML = weakness
    document.getElementById("scream").style.display = "none"
}   

function war5(){
    manpower = manpower - 2000
    economy = economy - 4000
    land = land + 200
    morale = morale + 2000
    war5Cooldown()
    if (section5progress<=1){
        document.getElementById("morale").innerHTML = section5prebreak[0] + " : " + morale
        document.getElementById("economy").innerHTML = section5prebreak[1] + " : " + economy
        document.getElementById("land").innerHTML = section5prebreak[3] + " : " + land
        document.getElementById("manpower").innerHTML = section5prebreak[2] + " : " + manpower
        document.getElementById("fightforukraine").innerHTML = section5prebreak[4]
        if (!document.getElementById('war5').innerHTML == 'War on cooldown...'){
            document.getElementById("war5").innerHTML = section5prebreak[5]
        }
        
    } else {
        document.getElementById("morale").innerHTML = section5postbreak[0] + " : " + morale
        document.getElementById("economy").innerHTML = section5postbreak[1] + " : " + economy
        document.getElementById("land").innerHTML = section5postbreak[3] + " : " + land
        document.getElementById("manpower").innerHTML = section5postbreak[2] + " : " + manpower
        document.getElementById("fightforukraine").innerHTML = section5postbreak[4]
        if (!document.getElementById('war5').innerHTML == 'War on cooldown...'){
            document.getElementById("war5").innerHTML = section5postbreak[5]
        }
    }
    function war5Cooldown(){
        document.getElementById('war5').disabled = true;
        document.getElementById('war5').innerHTML = 'War on cooldown...';
        setTimeout(function(){
            document.getElementById('war5').disabled = false;
            if (section5progress<=1){
                document.getElementById("war5").innerHTML = section5prebreak[5]
            } else {
                document.getElementById("war5").innerHTML = section5postbreak[5]
            }
        },warCooldownTime/5);
    }
}

function loseMoraleEtc(){
    morale = morale - 1000
    manpower = manpower - 500
    land = land - 100
    economy = economy - 3000
}

function foreignAid(){
    const foreignAidListPre = ["New Anglimerican Terran Order"]
    const foreignAidListPost = ["NATO"]
    if (section5progress<=1){
        var aidGiver = foreignAidListPre[getRandomInt(foreignAidListPre.length)]
        var aidResource = "Grivna"
    } else {
        var aidGiver = foreignAidListPost[getRandomInt(foreignAidListPost.length)]
        var aidResource = "Dollars in aid"
    }
    economy = economy + 100000
    console.log(aidGiver + " provide 100,000 " + aidResource)
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
        if (taxWorkers>0 && timer%5==0){
            taxation()
        }
        
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
        if (timeTilWeekend <=570) {
            if (eventCounter==0) {
                showEvent(0)
                if (timeTilWeekend<=540){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=510) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=510) {
            if (eventCounter==1) {
                showEvent(1)
                if (timeTilWeekend<=480){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=450) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=450) {
            if (eventCounter==2) {
                showEvent(2)
                if (timeTilWeekend<=420){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=390) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=390) {
            if (eventCounter==3) {
                showEvent(3)
                if (timeTilWeekend<=360){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=330) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=330) {
            if (eventCounter==4) {
                showEvent(4)
                if (timeTilWeekend<=300){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=270) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=270) {
            if (eventCounter==5) {
                showEvent(5)
                if (timeTilWeekend<=240){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=210) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=210) {
            if (eventCounter==6) {
                showEvent(6)
                if (timeTilWeekend<=180){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=150) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=150) {
            if (eventCounter==7) {
                showEvent(7)
                if (timeTilWeekend<=120){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=90) {eventOption(3)}
            }
        }
        if (timeTilWeekend <=90) {
            if (eventCounter==8) {
                showEvent(8)
                if (timeTilWeekend<=60){
                    mentalSpirit = mentalSpirit - 3
                    if (mentalSpirit<0) {
                        mentalSpirit = 0
                    }
                    document.getElementById("spirit3").innerHTML = mentalSpirit
                }
                if (timeTilWeekend <=30) {eventOption(3)}
            }
        }
        //The last one needs to work differently here, see my note.
        if (timeTilWeekend <= 1) {
            showEvent(9)
            timeTilWeekend = 1
            document.getElementById('peacebutton').style.display = "none";
            document.getElementById('dignitybutton').style.display = "none";
            document.getElementById('jobbutton').style.display = "none";
            document.getElementById('socialbutton').style.display = "none";
            document.getElementById("log-container").style.color = "#424242";
            document.getElementById("hehe").style.overflow = "hidden";
            
        }
        
        
    }
    if (procSection == 5 || procSection == 69) {
        if (section5progress<=1){
            document.getElementById("morale").innerHTML = section5prebreak[0] + " : " + morale
            document.getElementById("economy").innerHTML = section5prebreak[1] + " : " + economy
            document.getElementById("land").innerHTML = section5prebreak[3] + " : " + land
            document.getElementById("manpower").innerHTML = section5prebreak[2] + " : " + manpower
            document.getElementById("fightforukraine").innerHTML = section5prebreak[4]
            if (!document.getElementById('war5').innerHTML == 'War on cooldown...'){
                document.getElementById("war5").innerHTML = section5prebreak[5]
            }
            
        } else {
            document.getElementById("morale").innerHTML = section5postbreak[0] + " : " + morale
            document.getElementById("economy").innerHTML = section5postbreak[1] + " : " + economy
            document.getElementById("land").innerHTML = section5postbreak[3] + " : " + land
            document.getElementById("manpower").innerHTML = section5postbreak[2] + " : " + manpower
            document.getElementById("fightforukraine").innerHTML = section5postbreak[4]
            if (!document.getElementById('war5').innerHTML == 'War on cooldown...'){
                document.getElementById("war5").innerHTML = section5postbreak[5]
            }
        }
        timeTil5end--
        loseMoraleEtc()
        if (timeTil5end < 30 && !foreignAidGiven){
            foreignAid()
            foreignAidGiven = true
        }
        if (timeTil5end <= 58 && procSection == 5) {
            handOver(6)
        }
    }
    if (procSection == 8) {
        document.getElementById("section8spirit").innerHTML = mentalSpirit
        timeTil8end--
        doctorsPrognosis()
        loseSpirit()
        screamPressed = false
        if (timeTil8end <= 90){
            document.getElementById("scream").style.display = "block"
        }
        if (timeTil8end <= 0 || mentalSpirit <=0) {
            console.log("gam ovr")
            if (timeTil8end <=0) {
                if (weakness >= 5){
                    section8outcome = "good_end"
                }
                else {
                    section8outcome = "bad_end"
                }
            } else {
                section8outcome = "medium_end"
            }
            handOver(9)
        }
    }
	
}, 1000);