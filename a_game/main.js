var timer = 0;
var harvestPower = 1;
var crops = 0;
var copper = 0;
var tin = 0;
var workers = 0;
var workerCost = 50;
var spirit = 0;
var copperChance = 0;
var tinChance = 0;
var oreChanceIncreaseCost = 100;
var unassignedWorkers = 0
var farmers = 0
var merchants = 0
var soldiers = 0
var farmerPower = 2
var soldierPower = 10
var soldierReward = 30
var soldierRisk = 10

function harvestCrops(x){
        crops = crops + x;
        let y = Math.random() * 100;
        if (copperChance > y) {
            copper = copper + x;
        }
        let z = Math.random() * 100;
        if (tinChance > z) {
            tin = tin + x
        }
        document.getElementById('crops').innerHTML = crops;
        document.getElementById('copper').innerHTML = copper;
        if (copper > 0) {
            document.getElementById('divcopper').style.display = "block";
        }
        document.getElementById('tin').innerHTML = tin;
        if (tin > 0) {
            document.getElementById('divtin').style.display = "block";
        }
    };


function buyWorker(){
    if (crops >= workerCost) {
        workers = workers + 1;
        unassignedWorkers = unassignedWorkers + 1;
        crops = crops - workerCost;
        workerCost = Math.ceil(workerCost*1.08)
        document.getElementById('crops').innerHTML = crops;
        document.getElementById('workers').innerHTML = workers;
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers;        
        document.getElementById('divworkers').style.display = "block";
        document.getElementById('divunassignedworkers').style.display = "block";
        document.getElementById('buyworker').innerHTML = "Hire Worker -- Cost : " + workerCost + " crops";
        document.getElementById('divassignfarmer').style.display = "block";
        document.getElementById('divassignmerchant').style.display = "block";
        document.getElementById('divassignsoldier').style.display = "block";
    }
}

function assignFarmer() {
    if (unassignedWorkers > 0) {
        unassignedWorkers = unassignedWorkers - 1
        farmers = farmers + 1
        document.getElementById('farmers').innerHTML = farmers; 
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers; 
    }
}

function assignMerchant() {
    if (unassignedWorkers > 0) {
        unassignedWorkers = unassignedWorkers - 1
        merchants = merchants + 1
        document.getElementById('merchants').innerHTML = merchants; 
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers;
        document.getElementById('divtrade').style.display = "block"; 
    }
}

function assignSoldier() {
    if (unassignedWorkers > 0) {
        unassignedWorkers = unassignedWorkers - 1
        soldiers = soldiers + 1
        document.getElementById('soldiers').innerHTML = soldiers; 
        document.getElementById('unassignedworkers').innerHTML = unassignedWorkers; 
        document.getElementById('divwarfare').style.display = "block";
    }
}

function increaseOreChance(){
    if (crops >= oreChanceIncreaseCost) {
        copperChance++;
        tinChance++;
        crops = crops - oreChanceIncreaseCost;
        oreChanceIncreaseCost = oreChanceIncreaseCost*2;
        document.getElementById('crops').innerHTML = crops;
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
    spirit = spirit + x;
    document.getElementById('spirit').innerHTML = spirit;
    document.getElementById('divspirit').style.display = "block";
}


function makeWar(x, riskChance, rewardChance){
    let y = Math.random() * 100;
    if (riskChance > y) {
        soldiers = soldiers - 1
        workers = workers - 1
    }
    let z = Math.random() * 100;
    if (rewardChance > z) {
        tin = tin + x
        copper = copper + x;
        crops = crops + 10*x
        spirit = spirit + 100*x
    }
    document.getElementById('spirit').innerHTML = spirit;
    document.getElementById('soldiers').innerHTML = soldiers;
    document.getElementById('workers').innerHTML = workers;
    document.getElementById('tin').innerHTML = tin;
    document.getElementById('copper').innerHTML = copper;
    document.getElementById('crops').innerHTML = crops;
    document.getElementById('divtin').style.display = "block";
    document.getElementById('divcopper').style.display = "block";


}


window.setInterval(function(){
	timer++;
    document.getElementById('timer').innerHTML = timer; 
    if (crops >= 50) {
        document.getElementById('divworker').style.display = "block";
    }
    if (crops >= 100) {
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
	
}, 100);