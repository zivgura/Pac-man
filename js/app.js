
//fixing monsters and chery algorithm
//option for timer - changing computation time probably needed

var numberOfCellsOnX =20;
var numberOfCellsOnY =10;
var cellWidth=700/numberOfCellsOnX;
var cellHeight=500/numberOfCellsOnY;

var context;
var shape = new Object();
var monsterShape1 = new Object();
var monsterShape2 = new Object();
var monsterShape3 = new Object();
var monsterShape4 = new Object();
var specialShape = new Object();
var timeShape = new Object();
var lifeShape = new Object();

var monsterImage1 = new Image();
monsterImage1.src = "./images/redMonster.png"
var monsterImage2 = new Image();
monsterImage2.src = "./images/blueMonster.png"
var monsterImage3 = new Image();
monsterImage3.src = "./images/orangeMonster.png"
var monsterImage4 = new Image();
monsterImage4.src = "./images/pinkMonster.png"
var specialImage = new Image();
specialImage.src = "./images/cherry.png"
var timeImage = new Image();
timeImage.src="./images/time.png";
var lifeImage = new Image();
lifeImage.src="./images/life.png";

var lifeCell;
var timeCenter;
var randomX= 0;
var randomY= 0;
var firstUpdate = true;
var eaten;//chery
var taken;//time
var added;//life

var numberOfBallsRemain;
var board;
var maxScore = 100;
var score;
var gameScore;
var pac_color;
var start_time;
var time_elapsed;
var lifes = 5;
var interval;
var specialInterval;
var monsterInterval1;
var monsterInterval2;
var monsterInterval3;
var monsterInterval4;
var numberOfMonsters;
var users = Array();
var currentUserName;
var upKey=38;
var downKey=40;
var rightKey=39;
var leftKey=37;

$(document).ready(function() {
	context = canvas.getContext("2d");
	localStorage.setItem("p","p");
	users.push("Admin,p,p");
	fillLifes();
	
});

function newGame(){
	fillLifes();
	resetScreen();
	$("#settings").show("slow");
	$("#random").show("slow");
	$("#save").show("slow");
}

//0 - empty cell
//1- food 25 points
//2- pacman location
//3- food 15 points
//4- obstacle
//6- food 5 points
function Start() {
	document.getElementById("beginningSound").play();
	eaten=false;
	taken =false;
	added = false;
	gameScore=0;
	board = new Array();
	score = gameScore;
	pac_color = "yellow";
	var cnt = 200; //number of remaining empty cells on board
	var food_remain = $("#totalNumberOfBalls").val(); //get number of food from user
	
	var pacman_remain = 1;

	//start_time
	for (var i = 0; i < numberOfCellsOnX; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < numberOfCellsOnY; j++) {
			if (
				(i == 5 && j == 1) || (i == 5 && j == 2) || (i == 5 && j == 3) ||
				(i == 1 && j == 1) || (i == 1 && j == 2) || (i == 2 && j == 1) || (i == 2 && j == 2) || (i == 3 && j == 1) || (i == 3 && j == 2) ||
				(i == 8 && j == 2) || (i == 9 && j == 2) || (i == 10 && j == 2) || (i == 11 && j == 2) ||
				(i == 14 && j == 1) || (i == 14 && j == 2) || (i == 14 && j == 3) ||
				(i == 16 && j == 1) || (i == 16 && j == 2) || (i == 17 && j == 1) || (i == 17 && j == 2) || (i == 18 && j == 1) || (i == 18 && j == 2) ||
				(i == 5 && j == 6) || (i == 5 && j == 7) || (i == 5 && j == 8) ||
				(i == 1 && j == 7) || (i == 1 && j == 8) || (i == 2 && j == 7) || (i == 2 && j == 8) || (i == 3 && j == 7) || (i == 3 && j == 8) ||
				(i == 8 && j == 7) || (i == 9 && j == 7) || (i == 10 && j == 7) || (i == 11 && j == 7) ||
				(i == 14 && j == 6) || (i == 14 && j == 7) || (i == 14 && j == 8) ||
				(i == 16 && j == 7) || (i == 16 && j == 8) || (i == 17 && j == 7) || (i == 17 && j == 8) || (i == 18 && j == 7) || (i == 18 && j == 8)

			) {
				board[i][j] = 4;
			}else if(
					(i == 0 && j == 0)||
					(i == numberOfCellsOnX-1 && j == numberOfCellsOnY-1)||
					(i == 0 && j == numberOfCellsOnY-1)||
					(i == numberOfCellsOnX-1 && j == 0)
					){
				monsterShape1.i = 0;
				monsterShape1.j = 0;
				monsterShape1.lastLocation=[i,j];

				
				if(numberOfMonsters >=2){
					monsterShape2.i = numberOfCellsOnX-1;
					monsterShape2.j = numberOfCellsOnY-1;
					monsterShape2.lastLocation=[i,j];

				}
				if(numberOfMonsters >= 3){
					monsterShape3.i = 0;
					monsterShape3.j = numberOfCellsOnY-1;
					monsterShape3.lastLocation=[i,j];

				}
				if(numberOfMonsters == 4){
					monsterShape4.i = numberOfCellsOnX-1;
					monsterShape4.j = 0;
					monsterShape4.lastLocation=[i,j];
				}
				if(specialRandom() || (i==numberOfCellsOnX-1 && j==numberOfCellsOnY-1 && specialShape.i==null)){
					specialShape.i=i;
					specialShape.j=j;
					specialShape.lastLocation=[i,j];
				}
			}		
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					var randomNum2=Math.random();
					if(randomNum2 >= 0.4){//60%
						board[i][j] = 6;
					}
					else if(randomNum2 >= 0.1 && randomNum2<0.4){ //30%
						board[i][j] = 3;
					}
					else { //10%
						board[i][j] = 1;
					}

				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
			cnt--;
			}
		}
	}
	if(pacman_remain == 1){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		pacman_remain--;
	}
	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
		food_remain--;
	}

	timeCell =findRandomEmptyCell(board);
	lifeCell =findRandomEmptyCell(board);

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);


	Draw();
	document.getElementById("beginningSound").onended = function(){afterBegginingSoundEnds();}
}


function afterBegginingSoundEnds(){
	start_time = new Date();
	interval = setInterval(UpdatePosition, 250);
	specialInterval = setInterval(UpdateSpecialPosition, 200);
	monsterInterval1 = setInterval(UpdateMonster1Position, 600);
	if(numberOfMonsters>1){
		monsterInterval2 = setInterval(UpdateMonster2Position, 600);
		if(numberOfMonsters>2){
			monsterInterval3 = setInterval(UpdateMonster3Position, 600);
		}
		if(numberOfMonsters>3){
			monsterInterval4 = setInterval(UpdateMonster4Position, 600);
		}
	}
}

function specialRandom(){
	var random = Math.random();
	if(random>=0.5){
		return true;
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (numberOfCellsOnX-1) + 1);
	var j = Math.floor(Math.random() * (numberOfCellsOnY-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (numberOfCellsOnX-1) + 1);
		j = Math.floor(Math.random() * (numberOfCellsOnY-1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) {//up
		return 1;
	}
	if (keysDown[downKey]) {//down
		return 2;
	}
	if (keysDown[leftKey]) {//left
		return 3;
	}
	if (keysDown[rightKey]) {//right
		return 4;
	}
}

function Draw(pacmanSide) {
	canvas.width = canvas.width; //clean board
	lblUserName.value = currentUserName;
	lblScore.value = score;
	lblTime.value = time_elapsed;
	// lbllife.value = lifes;
	for (var i = 0; i < numberOfCellsOnX; i++) {
		for (var j = 0; j < numberOfCellsOnY; j++) {
			var center = new Object();
			center.x = i * cellWidth + (cellWidth/2);
			center.y = j * cellHeight + (cellHeight/2);
			
			var monsterCenter1 = new Object();
			monsterCenter1.x = monsterShape1.i * cellWidth + (cellWidth/2);
			monsterCenter1.y = monsterShape1.j * cellHeight + (cellHeight/2);

			var monsterCenter2 = new Object();
			monsterCenter2.x = monsterShape2.i * cellWidth + (cellWidth/2);
			monsterCenter2.y = monsterShape2.j * cellHeight + (cellHeight/2);

			var monsterCenter3 = new Object();
			monsterCenter3.x = monsterShape3.i * cellWidth + (cellWidth/2);
			monsterCenter3.y = monsterShape3.j * cellHeight + (cellHeight/2);

			var monsterCenter4 = new Object();
			monsterCenter4.x = monsterShape4.i * cellWidth + (cellWidth/2);
			monsterCenter4.y = monsterShape4.j * cellHeight + (cellHeight/2);

			var specialCenter = new Object();
			specialCenter.x = specialShape.i * cellWidth + (cellWidth/2);
			specialCenter.y = specialShape.j * cellHeight + (cellHeight/2);

			

			if(monsterShape1.i == i && monsterShape1.j == j){
				context.drawImage(monsterImage1,monsterCenter1.x-(cellWidth/2),monsterCenter1.y-(cellHeight/2),cellWidth,cellHeight);
			}

			if(monsterShape2.i == i && monsterShape2.j == j && numberOfMonsters>=2){
				context.drawImage(monsterImage2,monsterCenter2.x-(cellWidth/2),monsterCenter2.y-(cellHeight/2),cellWidth,cellHeight);
			}

			if(monsterShape3.i == i && monsterShape3.j == j && numberOfMonsters>=3){
				context.drawImage(monsterImage3,monsterCenter3.x-(cellWidth/2),monsterCenter3.y-(cellHeight/2),cellWidth,cellHeight);
			}

			if(monsterShape4.i == i && monsterShape4.j == j && numberOfMonsters==4){
				context.drawImage(monsterImage4,monsterCenter4.x-(cellWidth/2),monsterCenter4.y-(cellHeight/2),cellWidth,cellHeight);
			}

			if(specialShape.i == i && specialShape.j == j && !eaten){
				context.drawImage(specialImage,specialCenter.x-(cellWidth/2),specialCenter.y-(cellHeight/2),cellWidth,cellHeight);
			}

			if(timeforgame.value-time_elapsed <= timeforgame.value/4 && !taken){
				timeShape.i=timeCell[0];
				timeShape.j=timeCell[1];
				context.drawImage(timeImage,timeShape.i * cellWidth,timeShape.j * cellHeight,cellWidth,cellHeight);
			}

			if(lifes == 1 && !added){
				lifeShape.i=lifeCell[0];
				lifeShape.j=lifeCell[1];
				context.drawImage(lifeImage,lifeShape.i * cellWidth,lifeShape.j * cellHeight,cellWidth,cellHeight);
			}

			if (board[i][j] == 2) {
				pacmanDraw(pacmanSide,center);
			} else if (board[i][j] == 1) { //25 points
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = highPointsColor.value; //color1 from user
				context.fill();
			} else if (board[i][j] == 3) { // 15 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = mediumPointsColor.value; //color2 from user
				context.fill();
			} else if (board[i][j] == 6) { //5 points
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = lowPointsColor.value; //color3 from user
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - (cellWidth/2), center.y - (cellHeight/2), cellWidth, cellHeight);
				context.fillStyle = "grey"; //color
				context.fill();
			}

		}
	}
}

function UpdatePosition() {
	document.getElementById("chompSound").play();

	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {//down
		if (shape.j < numberOfCellsOnY-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {//left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i < numberOfCellsOnX-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score= score +25;
		numberOfBallsRemain--;
	}else if(board[shape.i][shape.j] == 3){
		score= score +15;
		numberOfBallsRemain--;
	}else if(board[shape.i][shape.j] == 6){
		score= score +5;
		numberOfBallsRemain--;
	}

	

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(time_elapsed >= timeforgame.value){
		GameOver();
	}
	if(timeShape.i == shape.i && timeShape.j == shape.j && !taken){
		AddExtraTime();
	}
	if(lifeShape.i == shape.i && lifeShape.j == shape.j && !added){
		AddExtraLife();
	}
	if (
		(monsterShape1.i == shape.i && monsterShape1.j == shape.j)||
		(monsterShape2.i == shape.i && monsterShape2.j == shape.j)||
		(monsterShape3.i == shape.i && monsterShape3.j == shape.j)||
		(monsterShape4.i == shape.i && monsterShape4.j == shape.j)
		){
		hit();///
	}

	if (score >= 20 && time_elapsed <= 10) {///////////////////////////////green
		pac_color = "green";
	}
	if (numberOfBallsRemain == 0) {//////////////win!
		document.getElementById("winningSound").play();
		clearAllIntervals();
		window.alert("Winner!!!");
		// alert("Want to play again?");
		// fillLifes()
		// Start();
	} else {
		Draw(x);
	}
}

function clearAllIntervals(){
	if(window!=null && interval!=null){
		window.clearInterval(specialInterval);
		window.clearInterval(interval);
		window.clearInterval(monsterInterval1);
		window.clearInterval(monsterInterval2);
		window.clearInterval(monsterInterval3);
		window.clearInterval(monsterInterval4);
	}
}

function UpdateMonster1Position(){
	var dx = shape.i - monsterShape1.i;
	var dy = shape.j - monsterShape1.j; 
	if(Math.abs(dx)>Math.abs(dy)){//go right/left
		if(dx > 0){//go right 
			if(monsterShape1.i + 1 <=numberOfCellsOnX-1 && board[monsterShape1.i + 1][monsterShape1.j] != 4){
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i++;
			}
			else if(monsterShape1.lastLocation[0]==monsterShape1.i && monsterShape1.lastLocation[1]==monsterShape1.j - 1){//came from top
				if(monsterShape1.j + 1 <=numberOfCellsOnY-1 && board[monsterShape1.i][monsterShape1.j + 1] != 4){//go down
					monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
					monsterShape1.j++;
				}
			}
			else if(monsterShape1.j - 1 >= 0 && board[monsterShape1.i][monsterShape1.j - 1] != 4) { //go up
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j--;			
			}
		
		}
		else{//go left
			if (monsterShape1.i - 1 >= 0 && board[monsterShape1.i - 1][monsterShape1.j] != 4) {
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i--;
			}
			else if(monsterShape1.lastLocation[0]==monsterShape1.i && monsterShape1.lastLocation[1]==monsterShape1.j - 1){//came from top
				if(monsterShape1.j + 1 <=numberOfCellsOnY-1 && board[monsterShape1.i][monsterShape1.j + 1] != 4){//go down
					monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
					monsterShape1.j++;
				}
			}
			else if (monsterShape1.j - 1 >= 0 && board[monsterShape1.i][monsterShape1.j - 1] != 4) { //go up
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j--;			
			}
		}
	}
	else if(Math.abs(dx)<Math.abs(dy)){
	// else {// go up/down
		if(dy > 0){
			if(monsterShape1.j + 1 <=numberOfCellsOnY-1 && board[monsterShape1.i][monsterShape1.j + 1] != 4){//go down
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j++;
			}
			else if(monsterShape1.lastLocation[0]==monsterShape1.i + 1 && monsterShape1.lastLocation[1]==monsterShape1.j){//came from right
				if(monsterShape1.i - 1 >=0 && board[monsterShape1.i-1][monsterShape1.j] != 4){//go left
					monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
					monsterShape1.i--;
				}
			}
			else if(monsterShape1.i + 1 <= numberOfCellsOnX-1 && board[monsterShape1.i + 1][monsterShape1.j] != 4){//go right
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i++;
			}
		}else{//go up 
			if (monsterShape1.j - 1 >= 0 && board[monsterShape1.i][monsterShape1.j - 1] != 4) {
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j--;
			}
			else if(monsterShape1.lastLocation[0]==monsterShape1.i + 1 && monsterShape1.lastLocation[1]==monsterShape1.j){//came from right
				if(monsterShape1.i - 1 >=0 && board[monsterShape1.i-1][monsterShape1.j] != 4){//go left
					monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
					monsterShape1.i--;
				}
			}
			else if(monsterShape1.i + 1 <= numberOfCellsOnX-1 && board[monsterShape1.i + 1][monsterShape1.j] != 4){//go right
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i++;
			}
		}
	}
	else{//equal
		if(dy > 0 && dx > 0){
			if(monsterShape1.i + 1 <= numberOfCellsOnX-1 && board[monsterShape1.i + 1][monsterShape1.j] != 4){//go right
					monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
					monsterShape1.i++;
			}
			else if(monsterShape1.j + 1 <=numberOfCellsOnY-1 && board[monsterShape1.i][monsterShape1.j + 1] != 4){//go down
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j++;
			}
		}
		else if(dy > 0 && dx < 0){
			if(monsterShape1.i - 1 >=0 && board[monsterShape1.i-1][monsterShape1.j] != 4){//go left
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i--;
			}
			else if(monsterShape1.j + 1 <=numberOfCellsOnY-1 && board[monsterShape1.i][monsterShape1.j + 1] != 4){//go down
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j++;
			}
		}
		else if(dy < 0 && dx > 0){
			if(monsterShape1.i + 1 <= numberOfCellsOnX-1 && board[monsterShape1.i + 1][monsterShape1.j] != 4){//go right
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i++;
			}
			else if (monsterShape1.j - 1 >= 0 && board[monsterShape1.i][monsterShape1.j - 1] != 4) {//go up
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j--;
			}
		}
		else if(dy < 0 && dx < 0){
			if (monsterShape1.j - 1 >= 0 && board[monsterShape1.i][monsterShape1.j - 1] != 4) {//go up
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.j--;
			}
			else if(monsterShape1.i - 1 >=0 && board[monsterShape1.i-1][monsterShape1.j] != 4){//go left
				monsterShape1.lastLocation = [monsterShape1.i,monsterShape1.j];
				monsterShape1.i--;
			}
		}
		
	}


	if (monsterShape1.i == shape.i && monsterShape1.j == shape.j) {//////////////Dead!
		hit();
	} else {
		Draw();
	}
	
}

function UpdateMonster2Position(){
	var dx = shape.i - monsterShape2.i;
	var dy = shape.j - monsterShape2.j; 
	if(Math.abs(dx)>Math.abs(dy)){//go right/left
		if(dx > 0){//go right 
			if(monsterShape2.i + 1 <=numberOfCellsOnX-1 && board[monsterShape2.i + 1][monsterShape2.j] != 4){
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i++;
			}
			else if(monsterShape2.lastLocation[0]==monsterShape2.i && monsterShape2.lastLocation[1]==monsterShape2.j - 1){//came from top
				if(monsterShape2.j + 1 <=numberOfCellsOnY-1 && board[monsterShape2.i][monsterShape2.j + 1] != 4){//go down
					monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
					monsterShape2.j++;
				}
			}
			else if(monsterShape2.j - 1 >= 0 && board[monsterShape2.i][monsterShape2.j - 1] != 4) { //go up
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j--;			
			}
		
		}
		else{//go left
			if (monsterShape2.i - 1 >= 0 && board[monsterShape2.i - 1][monsterShape2.j] != 4) {
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i--;
			}
			else if(monsterShape2.lastLocation[0]==monsterShape2.i && monsterShape2.lastLocation[1]==monsterShape2.j - 1){//came from top
				if(monsterShape2.j + 1 <=numberOfCellsOnY-1 && board[monsterShape2.i][monsterShape2.j + 1] != 4){//go down
					monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
					monsterShape2.j++;
				}
			}
			else if (monsterShape2.j - 1 >= 0 && board[monsterShape2.i][monsterShape2.j - 1] != 4) { //go up
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j--;			
			}
		}
	}
	else if(Math.abs(dx)<Math.abs(dy)){
	// else {// go up/down
		if(dy > 0){
			if(monsterShape2.j + 1 <=numberOfCellsOnY-1 && board[monsterShape2.i][monsterShape2.j + 1] != 4){//go down
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j++;
			}
			else if(monsterShape2.lastLocation[0]==monsterShape2.i + 1 && monsterShape2.lastLocation[1]==monsterShape2.j){//came from right
				if(monsterShape2.i - 1 >=0 && board[monsterShape2.i-1][monsterShape2.j] != 4){//go left
					monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
					monsterShape2.i--;
				}
			}
			else if(monsterShape2.i + 1 <= numberOfCellsOnX-1 && board[monsterShape2.i + 1][monsterShape2.j] != 4){//go right
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i++;
			}
		}else{//go up 
			if (monsterShape2.j - 1 >= 0 && board[monsterShape2.i][monsterShape2.j - 1] != 4) {
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j--;
			}
			else if(monsterShape2.lastLocation[0]==monsterShape2.i + 1 && monsterShape2.lastLocation[1]==monsterShape2.j){//came from right
				if(monsterShape2.i - 1 >=0 && board[monsterShape2.i-1][monsterShape2.j] != 4){//go left
					monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
					monsterShape2.i--;
				}
			}
			else if(monsterShape2.i + 1 <= numberOfCellsOnX-1 && board[monsterShape2.i + 1][monsterShape2.j] != 4){//go right
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i++;
			}
		}
	}
	else{//equal
		if(dy > 0 && dx > 0){
			if(monsterShape2.i + 1 <= numberOfCellsOnX-1 && board[monsterShape2.i + 1][monsterShape2.j] != 4){//go right
					monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
					monsterShape2.i++;
			}
			else if(monsterShape2.j + 1 <=numberOfCellsOnY-1 && board[monsterShape2.i][monsterShape2.j + 1] != 4){//go down
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j++;
			}
		}
		else if(dy > 0 && dx < 0){
			if(monsterShape2.i - 1 >=0 && board[monsterShape2.i-1][monsterShape2.j] != 4){//go left
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i--;
			}
			else if(monsterShape2.j + 1 <=numberOfCellsOnY-1 && board[monsterShape2.i][monsterShape2.j + 1] != 4){//go down
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j++;
			}
		}
		else if(dy < 0 && dx > 0){
			if(monsterShape2.i + 1 <= numberOfCellsOnX-1 && board[monsterShape2.i + 1][monsterShape2.j] != 4){//go right
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i++;
			}
			else if (monsterShape2.j - 1 >= 0 && board[monsterShape2.i][monsterShape2.j - 1] != 4) {//go up
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j--;
			}
		}
		else if(dy < 0 && dx < 0){
			if (monsterShape2.j - 1 >= 0 && board[monsterShape2.i][monsterShape2.j - 1] != 4) {//go up
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.j--;
			}
			else if(monsterShape2.i - 1 >=0 && board[monsterShape2.i-1][monsterShape2.j] != 4){//go left
				monsterShape2.lastLocation = [monsterShape2.i,monsterShape2.j];
				monsterShape2.i--;
			}
		}
		
	}


	if (monsterShape2.i == shape.i && monsterShape2.j == shape.j) {//////////////Dead!
		hit();
	} else {
		Draw();
	}
	
}

function UpdateMonster3Position(){
	var dx = shape.i - monsterShape3.i;
	var dy = shape.j - monsterShape3.j; 
	if(Math.abs(dx)>Math.abs(dy)){//go right/left
		if(dx > 0){//go right 
			if(monsterShape3.i + 1 <=numberOfCellsOnX-1 && board[monsterShape3.i + 1][monsterShape3.j] != 4){
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i++;
			}
			else if(monsterShape3.lastLocation[0]==monsterShape3.i && monsterShape3.lastLocation[1]==monsterShape3.j - 1){//came from top
				if(monsterShape3.j + 1 <=numberOfCellsOnY-1 && board[monsterShape3.i][monsterShape3.j + 1] != 4){//go down
					monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
					monsterShape3.j++;
				}
			}
			else if(monsterShape3.j - 1 >= 0 && board[monsterShape3.i][monsterShape3.j - 1] != 4) { //go up
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j--;			
			}
		
		}
		else{//go left
			if (monsterShape3.i - 1 >= 0 && board[monsterShape3.i - 1][monsterShape3.j] != 4) {
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i--;
			}
			else if(monsterShape3.lastLocation[0]==monsterShape3.i && monsterShape3.lastLocation[1]==monsterShape3.j - 1){//came from top
				if(monsterShape3.j + 1 <=numberOfCellsOnY-1 && board[monsterShape3.i][monsterShape3.j + 1] != 4){//go down
					monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
					monsterShape3.j++;
				}
			}
			else if (monsterShape3.j - 1 >= 0 && board[monsterShape3.i][monsterShape3.j - 1] != 4) { //go up
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j--;			
			}
		}
	}
	else if(Math.abs(dx)<Math.abs(dy)){
	// else {// go up/down
		if(dy > 0){
			if(monsterShape3.j + 1 <=numberOfCellsOnY-1 && board[monsterShape3.i][monsterShape3.j + 1] != 4){//go down
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j++;
			}
			else if(monsterShape3.lastLocation[0]==monsterShape3.i + 1 && monsterShape3.lastLocation[1]==monsterShape3.j){//came from right
				if(monsterShape3.i - 1 >=0 && board[monsterShape3.i-1][monsterShape3.j] != 4){//go left
					monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
					monsterShape3.i--;
				}
			}
			else if(monsterShape3.i + 1 <= numberOfCellsOnX-1 && board[monsterShape3.i + 1][monsterShape3.j] != 4){//go right
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i++;
			}
		}else{//go up 
			if (monsterShape3.j - 1 >= 0 && board[monsterShape3.i][monsterShape3.j - 1] != 4) {
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j--;
			}
			else if(monsterShape3.lastLocation[0]==monsterShape3.i + 1 && monsterShape3.lastLocation[1]==monsterShape3.j){//came from right
				if(monsterShape3.i - 1 >=0 && board[monsterShape3.i-1][monsterShape3.j] != 4){//go left
					monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
					monsterShape3.i--;
				}
			}
			else if(monsterShape3.i + 1 <= numberOfCellsOnX-1 && board[monsterShape3.i + 1][monsterShape3.j] != 4){//go right
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i++;
			}
		}
	}
	else{//equal
		if(dy > 0 && dx > 0){
			if(monsterShape3.i + 1 <= numberOfCellsOnX-1 && board[monsterShape3.i + 1][monsterShape3.j] != 4){//go right
					monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
					monsterShape3.i++;
			}
			else if(monsterShape3.j + 1 <=numberOfCellsOnY-1 && board[monsterShape3.i][monsterShape3.j + 1] != 4){//go down
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j++;
			}
		}
		else if(dy > 0 && dx < 0){
			if(monsterShape3.i - 1 >=0 && board[monsterShape3.i-1][monsterShape3.j] != 4){//go left
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i--;
			}
			else if(monsterShape3.j + 1 <=numberOfCellsOnY-1 && board[monsterShape3.i][monsterShape3.j + 1] != 4){//go down
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j++;
			}
		}
		else if(dy < 0 && dx > 0){
			if(monsterShape3.i + 1 <= numberOfCellsOnX-1 && board[monsterShape3.i + 1][monsterShape3.j] != 4){//go right
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i++;
			}
			else if (monsterShape3.j - 1 >= 0 && board[monsterShape3.i][monsterShape3.j - 1] != 4) {//go up
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j--;
			}
		}
		else if(dy < 0 && dx < 0){
			if (monsterShape3.j - 1 >= 0 && board[monsterShape3.i][monsterShape3.j - 1] != 4) {//go up
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.j--;
			}
			else if(monsterShape3.i - 1 >=0 && board[monsterShape3.i-1][monsterShape3.j] != 4){//go left
				monsterShape3.lastLocation = [monsterShape3.i,monsterShape3.j];
				monsterShape3.i--;
			}
		}
		
	}

	if (monsterShape3.i == shape.i && monsterShape3.j == shape.j) {//////////////Dead!
		hit();
	} else {
		Draw();
	}	
}

function UpdateMonster4Position(){
	var dx = shape.i - monsterShape4.i;
	var dy = shape.j - monsterShape4.j; 
	if(Math.abs(dx)>Math.abs(dy)){//go right/left
		if(dx > 0){//go right 
			if(monsterShape4.i + 1 <=numberOfCellsOnX-1 && board[monsterShape4.i + 1][monsterShape4.j] != 4){
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i++;
			}
			else if(monsterShape4.lastLocation[0]==monsterShape4.i && monsterShape4.lastLocation[1]==monsterShape4.j - 1){//came from top
				if(monsterShape4.j + 1 <=numberOfCellsOnY-1 && board[monsterShape4.i][monsterShape4.j + 1] != 4){//go down
					monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
					monsterShape4.j++;
				}
			}
			else if(monsterShape4.j - 1 >= 0 && board[monsterShape4.i][monsterShape4.j - 1] != 4) { //go up
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j--;			
			}
		
		}
		else{//go left
			if (monsterShape4.i - 1 >= 0 && board[monsterShape4.i - 1][monsterShape4.j] != 4) {
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i--;
			}
			else if(monsterShape4.lastLocation[0]==monsterShape4.i && monsterShape4.lastLocation[1]==monsterShape4.j - 1){//came from top
				if(monsterShape4.j + 1 <=numberOfCellsOnY-1 && board[monsterShape4.i][monsterShape4.j + 1] != 4){//go down
					monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
					monsterShape4.j++;
				}
			}
			else if (monsterShape4.j - 1 >= 0 && board[monsterShape4.i][monsterShape4.j - 1] != 4) { //go up
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j--;			
			}
		}
	}
	else if(Math.abs(dx)<Math.abs(dy)){
	// else {// go up/down
		if(dy > 0){
			if(monsterShape4.j + 1 <=numberOfCellsOnY-1 && board[monsterShape4.i][monsterShape4.j + 1] != 4){//go down
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j++;
			}
			else if(monsterShape4.lastLocation[0]==monsterShape4.i + 1 && monsterShape4.lastLocation[1]==monsterShape4.j){//came from right
				if(monsterShape4.i - 1 >=0 && board[monsterShape4.i-1][monsterShape4.j] != 4){//go left
					monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
					monsterShape4.i--;
				}
			}
			else if(monsterShape4.i + 1 <= numberOfCellsOnX-1 && board[monsterShape4.i + 1][monsterShape4.j] != 4){//go right
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i++;
			}
		}else{//go up 
			if (monsterShape4.j - 1 >= 0 && board[monsterShape4.i][monsterShape4.j - 1] != 4) {
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j--;
			}
			else if(monsterShape4.lastLocation[0]==monsterShape4.i + 1 && monsterShape4.lastLocation[1]==monsterShape4.j){//came from right
				if(monsterShape4.i - 1 >=0 && board[monsterShape4.i-1][monsterShape4.j] != 4){//go left
					monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
					monsterShape4.i--;
				}
			}
			else if(monsterShape4.i + 1 <= numberOfCellsOnX-1 && board[monsterShape4.i + 1][monsterShape4.j] != 4){//go right
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i++;
			}
		}
	}
	else{//equal
		if(dy > 0 && dx > 0){
			if(monsterShape4.i + 1 <= numberOfCellsOnX-1 && board[monsterShape4.i + 1][monsterShape4.j] != 4){//go right
					monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
					monsterShape4.i++;
			}
			else if(monsterShape4.j + 1 <=numberOfCellsOnY-1 && board[monsterShape4.i][monsterShape4.j + 1] != 4){//go down
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j++;
			}
		}
		else if(dy > 0 && dx < 0){
			if(monsterShape4.i - 1 >=0 && board[monsterShape4.i-1][monsterShape4.j] != 4){//go left
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i--;
			}
			else if(monsterShape4.j + 1 <=numberOfCellsOnY-1 && board[monsterShape4.i][monsterShape4.j + 1] != 4){//go down
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j++;
			}
		}
		else if(dy < 0 && dx > 0){
			if(monsterShape4.i + 1 <= numberOfCellsOnX-1 && board[monsterShape4.i + 1][monsterShape4.j] != 4){//go right
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i++;
			}
			else if (monsterShape4.j - 1 >= 0 && board[monsterShape4.i][monsterShape4.j - 1] != 4) {//go up
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j--;
			}
		}
		else if(dy < 0 && dx < 0){
			if (monsterShape4.j - 1 >= 0 && board[monsterShape4.i][monsterShape4.j - 1] != 4) {//go up
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.j--;
			}
			else if(monsterShape4.i - 1 >=0 && board[monsterShape4.i-1][monsterShape4.j] != 4){//go left
				monsterShape4.lastLocation = [monsterShape4.i,monsterShape4.j];
				monsterShape4.i--;
			}
		}
		
	}
	if (monsterShape4.i == shape.i && monsterShape4.j == shape.j) {//////////////Dead!
		hit();
	} else {
		Draw();
	}	
}

function UpdateSpecialPosition(){
	var dx = randomX - specialShape.i;
	var dy = randomY - specialShape.j; 
	if(Math.abs(dx)>Math.abs(dy)){//go right/left
		if(dx > 0){//go right 
			if(specialShape.i + 1 <=numberOfCellsOnX-1 && board[specialShape.i + 1][specialShape.j] != 4){
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i++;
			}
			else if(specialShape.lastLocation[0]==specialShape.i && specialShape.lastLocation[1]==specialShape.j - 1){//came from top
				if(specialShape.j + 1 <=numberOfCellsOnY-1 && board[specialShape.i][specialShape.j + 1] != 4){//go down
					specialShape.lastLocation = [specialShape.i,specialShape.j];
					specialShape.j++;
				}
			}
			else if(specialShape.j - 1 >= 0 && board[specialShape.i][specialShape.j - 1] != 4) { //go up
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j--;			
			}
		
		}
		else{//go left
			if (specialShape.i - 1 >= 0 && board[specialShape.i - 1][specialShape.j] != 4) {
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i--;
			}
			else if(specialShape.lastLocation[0]==specialShape.i && specialShape.lastLocation[1]==specialShape.j - 1){//came from top
				if(specialShape.j + 1 <=numberOfCellsOnY-1 && board[specialShape.i][specialShape.j + 1] != 4){//go down
					specialShape.lastLocation = [specialShape.i,specialShape.j];
					specialShape.j++;
				}
			}
			else if (specialShape.j - 1 >= 0 && board[specialShape.i][specialShape.j - 1] != 4) { //go up
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j--;			
			}
		}
	}
	else if(Math.abs(dx)<Math.abs(dy)){
	// else {// go up/down
		if(dy > 0){
			if(specialShape.j + 1 <=numberOfCellsOnY-1 && board[specialShape.i][specialShape.j + 1] != 4){//go down
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j++;
			}
			else if(specialShape.lastLocation[0]==specialShape.i + 1 && specialShape.lastLocation[1]==specialShape.j){//came from right
				if(specialShape.i - 1 >=0 && board[specialShape.i-1][specialShape.j] != 4){//go left
					specialShape.lastLocation = [specialShape.i,specialShape.j];
					specialShape.i--;
				}
			}
			else if(specialShape.i + 1 <= numberOfCellsOnX-1 && board[specialShape.i + 1][specialShape.j] != 4){//go right
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i++;
			}
		}else{//go up 
			if (specialShape.j - 1 >= 0 && board[specialShape.i][specialShape.j - 1] != 4) {
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j--;
			}
			else if(specialShape.lastLocation[0]==specialShape.i + 1 && specialShape.lastLocation[1]==specialShape.j){//came from right
				if(specialShape.i - 1 >=0 && board[specialShape.i-1][specialShape.j] != 4){//go left
					specialShape.lastLocation = [specialShape.i,specialShape.j];
					specialShape.i--;
				}
			}
			else if(specialShape.i + 1 <= numberOfCellsOnX-1 && board[specialShape.i + 1][specialShape.j] != 4){//go right
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i++;
			}
		}
	}
	else{//equal
		if(dy > 0 && dx > 0){
			if(specialShape.i + 1 <= numberOfCellsOnX-1 && board[specialShape.i + 1][specialShape.j] != 4){//go right
					specialShape.lastLocation = [specialShape.i,specialShape.j];
					specialShape.i++;
			}
			else if(specialShape.j + 1 <=numberOfCellsOnY-1 && board[specialShape.i][specialShape.j + 1] != 4){//go down
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j++;
			}
		}
		else if(dy > 0 && dx < 0){
			if(specialShape.i - 1 >=0 && board[specialShape.i-1][specialShape.j] != 4){//go left
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i--;
			}
			else if(specialShape.j + 1 <=numberOfCellsOnY-1 && board[specialShape.i][specialShape.j + 1] != 4){//go down
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j++;
			}
		}
		else if(dy < 0 && dx > 0){
			if(specialShape.i + 1 <= numberOfCellsOnX-1 && board[specialShape.i + 1][specialShape.j] != 4){//go right
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i++;
			}
			else if (specialShape.j - 1 >= 0 && board[specialShape.i][specialShape.j - 1] != 4) {//go up
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j--;
			}
		}
		else if(dy < 0 && dx < 0){
			if (specialShape.j - 1 >= 0 && board[specialShape.i][specialShape.j - 1] != 4) {//go up
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.j--;
			}
			else if(specialShape.i - 1 >=0 && board[specialShape.i-1][specialShape.j] != 4){//go left
				specialShape.lastLocation = [specialShape.i,specialShape.j];
				specialShape.i--;
			}
		}
		
	}

	firstUpdate=false;
	if(specialShape.i == randomX && specialShape.j == randomY)
	{
		var cell=findRandomEmptyCell(board);
		randomX= cell[0];
		randomY= cell[1];
		
	}

	if (specialShape.i == shape.i && specialShape.j == shape.j) {
		specialScore();
	} else {
		Draw();
	}
	
}

function specialScore(){
	eaten = true;
	document.getElementById("specialSound").play();
	window.clearInterval(specialInterval);
	score = score + 50;
}

function AddExtraTime(){
	time_elapsed = time_elapsed - timeforgame.value/4;
	taken = true;
}

function AddExtraLife(){
	lifes++;
	added = true;
	addLife();
}

function removeLife(){
	var lifesList = document.getElementById("lifesIcons");
	if(lifesList.childNodes.length>0){
		lifesList.removeChild(lifesList.childNodes[0]);
		lifes--;
	}
}

function addLife(){
	var lifesList = document.getElementById("lifesIcons");
	var lifeIcon = new Image();
	lifeIcon.src = "./images/life.png"
	lifeIcon.width = "20px";
	lifeIcon.height = "20px";
	lifeIcon.className = "life-icon";
	if(lifesList.childNodes.length<6){
		lifesList.appendChild(lifeIcon);
	}
	
	
}

function fillLifes(){
	for(var i=0; i<5; i++){
		addLife();
	}
	lifes=5;
}

function emptyLifes(){
	for(var i=0; i<5; i++){
		removeLife();
	}
	lifes=0;
}

function hit(){
	document.getElementById("deathSound").play();
	window.clearInterval(interval);
	window.clearInterval(specialInterval);
	window.clearInterval(monsterInterval1);
	window.clearInterval(monsterInterval2);
	window.clearInterval(monsterInterval3);
	window.clearInterval(monsterInterval4);
	score = score-10;
	gameScore=score;  //points starts from 0 every hit
	removeLife();
	
	if(lifes == 0){
		GameOver();
	}
	else{
		window.alert("You've died!");
		Start();
	}
}

var PackmanstartAngle = 1.15;
var PackmanEndAngle = 0.85 ;
var PackmanEye = new Object();
PackmanEye.x = 4 ; //was 5
PackmanEye.y = -12; // was -15
function pacmanDraw(side , center) {

	if(side == 2){
		PackmanstartAngle = 0.65;
		PackmanEndAngle=0.35;
		PackmanEye.x = 12 ;
		PackmanEye.y = 4;
	}else if(side == 1){
		PackmanstartAngle = 1.65;
		PackmanEndAngle=1.35;
		PackmanEye.x = 12 ;
		PackmanEye.y = -4;
	}else if(side ==4){
		PackmanstartAngle = 0.15;
		PackmanEndAngle=1.85;
		PackmanEye.x = 4 ;
		PackmanEye.y = -12;
	}else if (side == 3 ){
		PackmanstartAngle = 1.15;
		PackmanEndAngle=0.85;
		PackmanEye.x = -4 ; //was -5
		PackmanEye.y = -12; // was 15
	}
	context.beginPath();
	context.arc(center.x, center.y, 17, PackmanstartAngle * Math.PI, PackmanEndAngle * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + PackmanEye.x, center.y + PackmanEye.y, 2, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

  function AfterLogIn() {
    var getAccess = false;
    var username = $("#userLogin").val();
	// var password = $("#passwordLogin").val();
	var userPassword = localStorage.getItem(username);
	if(userPassword!=null){
		getAccess = true;
		currentUserName = username;
	}

    if (getAccess){
		ShowSettings();
    }
    else {
        window.alert("Wrong Username or Password");
    }
}

function signIn(){
	var getAccess = false;
    var username = $("#userReg").val();
	var password = $("#passwordReg").val();
	var userPassword = localStorage.getItem(username);
	if(userPassword!=null && userPassword==password){
		getAccess = true;
		currentUserName = username;
	}

    // for (var i = 0; i < users.length; i++) {
    //     user = users[i].split(",");
    //     if (user[1] == username && user[2] == password) {
    //         getAccess = true;
    //         break;
    //     }
    // }
    if (getAccess){
		window.alert("You're already register to this game \n Just click Log In and start playing");
		// Login();
    }
    else {
		if(username!="" && password!=""){
			var newUser = $("#fullname").val()+","+ $("#userReg").val()+","+ $("#passwordReg").val()+","+ $("#email").val()+","+ $("#date").val();
			users.push(newUser);
			localStorage.setItem(username,password);		
			window.alert("Registration completed successfully! \n Click Log In and start playing");
		}

		// currentUserName = username;
		// ShowSettings();
		
  	}
	
}


function keyPressed(id,event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(id == "rKey"){ 
		rightKey=keycode;
		$("#rightKey").val("("+event.key+")");
	}
	if(id == "lKey"){
		leftKey=keycode;
		$("#leftKey").val("("+event.key+")");
	}
	if(id == "uKey"){
		upKey=keycode;
		$("#upKey").val("("+event.key+")");
	}
	if(id == "dKey"){
		downKey=keycode;
		$("#downKey").val("("+event.key+")");
	}
  }


  function GameOver(){
	document.getElementById("gameOverSound").play();
	if(lifes==0){
		alert("Loser!");
	}
	else if(time_elapsed>=timeforgame.value){
		if(score < maxScore){
			alert("You are better then "+score+ " points!");
			clearAllIntervals();
			emptyLifes();
		}else {
			document.getElementById("winningSound").play();
			clearAllIntervals();
			alert("Winner!!");
		}
	}
	//update fields
	lblScore.value = score;
	lblTime.value = time_elapsed;
	// lbllife.value = lifes;

	// alert("Want to play again?");
	// fillLifes();
	// Start();
	

}

  function randomFromUser(){
	document.getElementById("save").disabled=false;
	upKey=38;
	downKey=40;
	rightKey=39;
	leftKey=37;
	document.getElementById("upKey").value = "(ArrowUp)";
	document.getElementById("downKey").value = "(ArrowDown)";
	document.getElementById("leftKey").value = "(ArrowLeft)";
	document.getElementById("rightKey").value = "(ArrowRight)";
	totalNumberOfBalls.value=getRndInteger(50,90);
	document.getElementById("totalNumberOfBalls").value = totalNumberOfBalls.value;
	lowPointsColor.value=getRandomColor();
	mediumPointsColor.value= getRandomColor();
	highPointsColor.value=getRandomColor();
	totalNumberOfMonsters.value=getRndInteger(1,4);
	document.getElementById("totalNumberOfMonsters").value = totalNumberOfMonsters.value;
	timeforgame.value=getRndInteger(60,100);
	document.getElementById("timeforgame").value = timeforgame.value;
}

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
 }

 function getRandomColor() {
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++) {
	 color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
 }

 function resetScreen(){
	clearAllIntervals();

	$("#welcome").hide("slow");
	$("#settings").hide("slow");
	$("#game").hide("slow");
	$("#time").hide("slow");
	$("#newGame").hide("slow");
	$("#score").hide("slow");
	$("#lifes").hide("slow");
	$("#lifesIcons").hide("slow");
	$("#login").hide("slow");
	$("#register").hide("slow");
	
	settings.style="display: none;"

}
	///show
function Register(){
	resetScreen();
	$("#register").show("slow");
	$("#registerForm").show("slow");
}	
	  
function Login() {
	resetScreen();
	$("#login").show("slow");
}	
	  
function welcome(){
	resetScreen();
	$("#welcome").show("slow");
}

function showAboutModal(){
	document.getElementById("modalWindow").style.display = "block";
}

$("#close").ready(function() {
document.getElementsByClassName("close")[0].onclick = function() {
	document.getElementById("modalWindow").style.display = "none";
  }
})

$(document).keyup(function(e) {
	if (e.key === "Escape") { // escape key maps to keycode `27`
	document.getElementById("modalWindow").style.display = "none";
   }
});

window.onclick = function(event) {
	if (event.target == document.getElementById("modalWindow")) {
		document.getElementById("modalWindow").style.display = "none";
	}
  }

  window.addEventListener("keydown", function(e) {
    //arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function ShowGame(){
	$("#register").hide("slow");
	$("#settings").hide("slow");
	$("#game").show("slow");
	$("#newGame").show("slow");
	$("#userName").show("slow");
	$("#time").show("slow");
	$("#score").show("slow");
	$("#lifes").show("slow");
	$("#lifesIcons").show("slow");
	settings.style="float: right; margin-top: 10px; margin-right: 10px;"
	$("#settings").show("slow");
	$("#random").hide();
	$("#save").hide();
	numberOfMonsters = $("#totalNumberOfMonsters").val();
	numberOfBallsRemain = $("#totalNumberOfBalls").val();
	//play begginingSound
	Start();	
}

function ShowSettings(){
	$("#registerForm").hide("slow");
	$("#login").hide("slow");
	$("#welcome").hide("slow");
	$("#firstCol").hide("slow");
	$("#settings").show("slow");
	$("#random").show();
	$("#save").show();
}

var validCounter=0;
function validateSettings(name){
	if(name == "totalNumberOfBalls"){
		if(totalNumberOfBalls.value<50 || totalNumberOfBalls.value>90){
			window.alert("Total number of balls must be in range 50-90");
		}
		else{validCounter++;}
	}
	if(name == "totalNumberOfMonsters"){
		if(totalNumberOfMonsters.value<1 || totalNumberOfMonsters.value>4){
			window.alert("Total number of monsters must be in range 1-4");
		}
		else{validCounter++;}
	}
	if(name == "timeforgame"){
		if(timeforgame.value<60){
			window.alert("Game duration must be more then 60 seconds");
		}
		else{validCounter++;}
	}

	if(validCounter==3){
		document.getElementById("save").disabled=false;
	}
	

}
	
//validtion!!!

$(function(){

	jQuery.validator.addMethod("lettersonly", function(value, element) {
			return this.optional(element) || /^[a-z ]+$/i.test(value);
	},      "Please use only english letters");
	
	
	jQuery.validator.addMethod("lettersNumbers", function(value, element) {
		return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value);
	},      "The password must contain number and letters");
	

		// $('settingsForm').validate({
		// 	rules:{
		// 		totalNumberOfBalls:{
		// 			required:true,
		// 			min: 50,
		// 			max: 90
		// 		},
		// 		totalNumberOfMonsters:{
		// 			required:true,
		// 			min: 1,
		// 			max: 4
		// 		},
		// 		timeforgame:{
		// 			required:true,
		// 			min: 60
		// 		}
		// 	},
		// 	errorPlacement: function(error, element) {
		// 		error.appendTo('#invalid-' + element.attr('id'));
		// 		console.log(element.attr('id'))
		// 	}
		// }),


		$('#registerForm').validate({
			rules: {
			email:{
				required:true,
				email:true
			},
			fullname:{
				required:true,
				lettersonly: true
			},
			userReg:{
				required:true,
			},
			passwordReg:{
				required:true,
				lettersNumbers:true,
				minlength:6
			},
			date:{
				required:true,
			}
				
			},
			errorPlacement: function(error, element) {
				error.appendTo('#invalid-' + element.attr('id'));
				console.log(element.attr('id'))
			}
	
	});
	}
	)

	