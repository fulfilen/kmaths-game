var playing = false;
var score;
var interval;
var time_remaining;
var correct_answer;
// if start reset button is clicked 

_('start-reset-btn').onclick = function(){
	if (playing == true) {
		// if we are playing
		location.reload(); //reload the page
	} else {
		// if we are not playing
		//set playing varable to true
		playing = true;
		//set score to 0
		score = 0;
		_('score-value').innerHTML = score;
		_show('time-remaining');
		time_remaining = 60;
		_('time-remaining-value').innerHTML = time_remaining;
		//hide game over box if exists
		_hide('game-over');
		//change start btn to reset
		_('start-reset-btn').innerHTML = 'Reset game';
		//start count down
		start_countdown();
		//generate questions with multiple answers
		generateQA();
	}
}

//when answer box is clicked
for (var i = 1; i <= 4; i++) {
	_('box-'+i).onclick = function() {
		console.log(this.innerHTML);
		//check if we are playing
		if (playing == true) { //yes we're playing
			if (this.innerHTML == correct_answer) {
				//increase score by 1
				score++;
				//update score value
				_('score-value').innerHTML = score;
				//hide wrong b0x
				_hide('wrong');
				//show wrong box
				//_show('correct');
				setTimeout(function(){
					_hide('correct');
				}, 1000);

				//generate questions with multiple answers
				generateQA();
			} else {
				//_hide('correct');
				_show('wrong');
				setTimeout(function(){
					_hide('wrong');
				}, 1000);

				//generate questions with multiple answers
				generateQA();
			}
		}
	}
}




function _(id) {
	return document.getElementById(id);
}
function _hide(id) {
	_(id).style.display = 'none';
}
function _show(id) {
	_(id).style.display = 'block';
}

function start_countdown() {
	interval = setInterval(function(){
		time_remaining -= 1;
		_('time-remaining-value').innerHTML = time_remaining;
		if (time_remaining == 0) {
			stop_countdown();
			_show('game-over');
			_('game-over').innerHTML = '<p>Game over!</p><p> Your score is '+ score +'</p>';
			_hide('time-remaining');
			_hide('correct');
			_hide('wrong');
			playing = false;
			_('start-reset-btn').innerHTML = 'Start game';
		}
	}, 1000);
}
function stop_countdown(){
	clearInterval(interval);
}
function generateQA() {
	var x =  1 + Math.round(10*Math.random());
	var y =  1 + Math.round(10*Math.random());
	correct_answer = x * y;
	_('question').innerHTML = x +'X'+ y;
	var correct_position = 1 + Math.round(3*Math.random());
	//fill one box randomly with the correct answer
	_('box-'+correct_position).innerHTML = correct_answer; 

	//store all answers in array
	var ans = [correct_answer];
	//fill other boxes with wrong answers
	for (var i = 1; i <= 4; i++) {
		if (i != correct_position) {
			//wrong answer
			var wrong_answer;
			do{ wrong_answer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random())); }
				while(ans.indexOf(wrong_answer)> -1)
			_('box-'+i).innerHTML = wrong_answer; 
			ans.push(wrong_answer);
		}
	}
	console.log(ans);
}
