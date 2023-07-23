var timer = 0;
var i_f_params = {}
var proc_params = {}
var farmers = 1
var merchants = 2
var soldiers = 5
var happiness = 0


function setProcParams(x) {
    if (x==2) {
        passedArray = [farmers, merchants, soldiers]
        console.log(1, passedArray)
    }
    if (x==4) {
        passedArray = [farmers, merchants, soldiers, happiness]
        console.log(2, passedArray)

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
  startProcedural(e.detail.section)
}

function startProcedural(x) {
    if (x==1) {
        farmers = i_f_params[x][0]
        merchants = i_f_params[x][1]
        soldiers = i_f_params[x][2]
        happiness = i_f_params[x][3]
    }
    document.getElementById("procedural"+x).style.display = "block";
}

function hide_i_f(x) {
    document.getElementById("interactiveFiction"+x).style.display = "none";
}


window.setInterval(function(){
	timer++;
    document.getElementById('timer').innerHTML = timer; 
    
	
}, 1000);