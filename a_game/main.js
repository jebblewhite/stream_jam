var timer = 0;
var harvestPower = 1;
var crops = 0;
var copper = 0;
var tin = 0;

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


window.setInterval(function(){
	timer++;
    document.getElementById('timer').innerHTML = timer; 
    
	
}, 1000);