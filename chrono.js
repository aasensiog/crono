var startTime = 0;
var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
var time = null;
var start_string = '0:00:00:000';

$(document).ready(function(){
    $('#chronotime').html(start_string);
	
	$(document).keydown(function(event) {
		event.preventDefault();
		switch(event.which) {
			case 13: //Enter
			case 37: //Left arrow
			case 32: //Space bar
				$('#startstop').click();
				event.preventDefault();
				break;
			case 39: //Right arrow
			case 46: //Supr
			case 8:  //Backspace or Del
				$('#reset').click();
				event.preventDefault();
				break;
		}
	});
});

function chrono() {
	end = new Date();
	diff = end - start;
	diff = new Date(diff);
	var msec = diff.getMilliseconds();
	var sec = diff.getSeconds();
	var min = diff.getMinutes();
	var hr = diff.getHours() - 1;
	if (min < 10) {
		min = "0" + min;
	}
	if (sec < 10) {
		sec = "0" + sec;
	}
	if (msec < 10) {
		msec = "00" + msec;
	} else if (msec < 100) {
		msec = "0" + msec;
	}
	document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec;
	timerID = setTimeout("chrono()", 10);
}
function chronoStart() {
	document.chronoForm.startstop.innerHTML = "<i class='fa fa-caret-square-left'></i> Start";
	document.chronoForm.startstop.onclick = chronoStop;
	document.chronoForm.reset.onclick = chronoReset;
	start = new Date();
	chrono();
}
function chronoContinue() {
	document.chronoForm.startstop.innerHTML = "<i class='fa fa-caret-square-left'></i> Stop";
	document.chronoForm.startstop.onclick = chronoStop;
	document.chronoForm.reset.onclick = chronoReset;
	start = new Date() - diff;
	start = new Date(start);
	chrono();
}
function chronoReset() {
	document.getElementById("chronotime").innerHTML = start_string;
	start = new Date();
}
function chronoStopReset() {
	document.getElementById("chronotime").innerHTML = start_string;
	document.chronoForm.startstop.onclick = chronoStart;
}
function chronoStop() {
	document.chronoForm.startstop.innerHTML = "<i class='fa fa-caret-square-left'></i> Start";
	document.chronoForm.startstop.onclick = chronoContinue;
	document.chronoForm.reset.onclick = chronoStopReset;
	clearTimeout(timerID);
}