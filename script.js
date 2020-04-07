var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//setInterval(draw, 10); // draw is the funciton and 10 is the millisecond
var x= canvas.width/2;	//half the width of canvas would be in the cente of canvas
var y= canvas.height-30;
// to make the small changes in such a way that ball be drawn has small changes 
var dx=2;
var dy=-2;
var ballRadius =10;
var paddleHeight= 10;
var paddleWidth= 75;
var paddleX= (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3 ;
var brickColumnCount = 5;
var brickWidth= 75;
var brickHeight= 20;
var brickPadding = 10;
var brickOffsetTop =30;
var brickOffsetLeft = 30;
var score = 0;
var lives=3;


var bricks = [];
for(c=0; c<brickColumnCount; c++)
{
	bricks[c]=[];
	for(r=0; r<brickRowCount; r++)
	{
		bricks[c][r] = {x:0, y:0, status:1}
	}
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

function keyDownHandler(e){
	//To detect when the key is pressed
	if(e.keyCode == 39)
	{
		rightPressed = true;
	}
	else if(e.keyCode == 37)
	{
		leftPressed=true;
	}

}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score :"+score, 8, 20);
}
function keyUpHandler(e){
	// when key is released then what happens
	if(e.keyCode == 39)
	{
		rightPressed = false;
	}
	else if(e.keyCode == 37)
	{
		leftPressed=false;
	}	 
}
function drawBall(){
	 		 ctx.beginPath();
 		 	 ctx.arc(x, y, ballRadius, 0, Math.PI*2);
 		 	 // this idea need to be implemented ctx.text("No",x,y);
 		 	 ctx.font = "10px Arial";
 		 	 ctx.fillStyle = "#FF0044";
			 //ctx.fillText("Say No To", x, y);
 		 	 //ctx.fillStyle = "#FF0000"; Make a seperate dwawballtext fynction preceeding draw ball   
 		 	 ctx.fill();
 		 	 ctx.closePath();
}
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0000FF";
 	ctx.fill();
	ctx.closePath();
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status  == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						alert("You can fight corona , Stay Home Stay Safe");
						document.location.reload();
					}
				}
			}
		}
	}
}

function draw(){
		//drawing code
			 ctx.clearRect(0,0, canvas.width, canvas.height);  // this line gives the no trace concept, This allows you to set the limited canvas are
 		 	 drawBricks();
 		 	 drawBall();
 		 	 drawPaddle();
 		 	 drawScore();
 		 	 drawLives();
 		 	 collisionDetection();
 		 	  		 	 if(y+dy < ballRadius)
 		 	 {
 		 	 	dy = -dy; // so basically it is using 10 because we are having radius of circle as 10 , if 0 ball is half the way inside the hboundaries as we are checking the center of the system.
 		 	 }
 		 	 else if(y+dy > canvas.height-ballRadius)
 		 	 {	// now everytime the ball hits the ground it will say the end of game ,to simpligy this adding a new if else statement 
 		 	 		if(x > paddleX && x < paddleX + paddleWidth)
 		 	 		{
 		 	 			// if the paddle is at the particular location.
 		 	 			dy = -dy //shoot the ball back to the field
 		 	 		}
 		 	 		else {
						lives--;
						if(!lives) {
								alert("Corona will win , if you don't play well");
								document.location.reload();
							} else {
									x = canvas.width/2;
									y = canvas.height-30;
									dx = 2;
									dy = -2;
									paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
 		 	 if(x+dx < ballRadius || x+dx > canvas.width-ballRadius)
 		 	 {
 		 	 	dx = -dx;
 		 	 }
 		 	 if(rightPressed && paddleX < canvas.width-paddleWidth)
				{
				//this will be the end of canvas
				paddleX +=7;
				}
			else if(leftPressed && paddleX > 0)
				{
					//this is the start of the canvas
					paddleX -=7;
				}
 		 	 x += dx;
 		 	 y += dy;
 		 	 requestAnimationFrame(draw);
 		 	 // When you write code only this then you will be able to only go in upward direction but a trail will be left excluding the clearRect part
}
 
document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}

draw();