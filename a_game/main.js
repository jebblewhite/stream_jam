var timer = 0;
var harvestPower = 1;
var crops = 0;
var copper = 0;
var tin = 0;
var workers = 0
var workerCost = 50


function harvestCrops(x){
        let y = Math.random() * 100;
        if (y < 5){
            copper = copper + x
        } else if (y < 10 && y > 5) {
            tin = tin + x
        } else{
            crops = crops + x
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
    if (crops > workerCost) {
        workers = workers + 1
        crops = crops - workerCost
        workerCost = Math.ceil(workerCost*1.08)
        document.getElementById('crops').innerHTML = crops;
        document.getElementById('workers').innerHTML = workers;
        document.getElementById('divworkers').style.display = "block";
        document.getElementById('buyworker').innerHTML = "Hire Worker -- Cost : " + workerCost + " crops";
    }
}

window.setInterval(function(){
	timer++;
    document.getElementById('timer').innerHTML = timer; 
    if (crops >= 50) {
        document.getElementById('divworker').style.display = "block";
    }
    harvestCrops(workers)
	
}, 100);