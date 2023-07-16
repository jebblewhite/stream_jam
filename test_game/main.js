var farms = 1;
var harvestPower = 1;
var harvestableCrops = 200;
var harvestedCrops = 0;
var buyPower = 1;
var sellPower = 1;
var coins = 0;
var plantPower = 1;
var buyPrice = 1;
var sellPrice = 10;
var plantableSeeds = 0;
var farmStorage = 200;



function harvestCrops(x){
    if(harvestableCrops >= x && season == 0){                                   
        harvestedCrops = harvestedCrops + x;
        harvestableCrops = harvestableCrops - x;                          
        document.getElementById('harvestedCrops').innerHTML = harvestedCrops;  
        document.getElementById('harvestableCrops').innerHTML = harvestableCrops;  
    };
};


function sellCrops(x){
    if(harvestedCrops >= x){                                   
        harvestedCrops = harvestedCrops - x;
        coins = coins + x*sellPrice;                          
        document.getElementById('harvestedCrops').innerHTML = harvestedCrops;  
        document.getElementById('coins').innerHTML = coins;  
    };
};

function buySeeds(x){
    if(coins >= x*buyPrice){                                   
        plantableSeeds = plantableSeeds + x;
        coins = coins - x*buyPrice;                          
        document.getElementById('coins').innerHTML = coins;  
        document.getElementById('plantableSeeds').innerHTML = plantableSeeds;  
    };
};

function plantCrops(x){
    if(plantableSeeds >= x && harvestableCrops < farmStorage*farms && season == 2){                                   
        plantableSeeds = plantableSeeds - x;
        harvestableCrops = harvestableCrops + x;                          
        document.getElementById('harvestableCrops').innerHTML = harvestableCrops;  
        document.getElementById('plantableSeeds').innerHTML = plantableSeeds;    
    };
};

var timer = 0;
var date = '0';
var year = 0;
var season = 0;
var day = 0;
const seasonmap = ['Autumn', 'Winter', 'Spring', 'Summer'];

function createDate(time){
    year = Math.floor(time/400);
    season = Math.floor(time % 400 / 100);
    day = Math.floor(time%400%100);
    if(year>0){
        date = 'Year ' + year + ', ' + seasonmap[season] + ', Day ' + day;
    }
    else{
        date = seasonmap[season] + ', Day ' + day;
    };
    console.log([year, season, day], date);
    document.getElementById('date').innerHTML = date;
}
window.setInterval(function(){
	timer++;
    createDate(timer);
    
	
}, 1000);