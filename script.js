let inputDir={x:0,y:0};
let foodSound=new Audio('food.mp3');
let gameOverSound=new Audio('gameover.mp3');
let moveSound=new Audio('move.mp3')
let musicSound=new Audio('music.mp3')
let speed=7;  
let lastPaintTime=0; 
let snakeArr=[
    {x:13,y:15}
]
let score=0;
food={x:6,y:7};
musicSound.play();
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        // const element = array[index];
        if(snake[0].x===snake[i].x&&snake[0].y===snake[i].y){
            return true;
        }
    }
        if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
            return true;
        }
        
}
function gameEngine() {

    //update snake arr and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over...Press any key to play again!!");
        snakeArr=[
            {x:13,y:15}
        ];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score: "+score;

    }
    //if u have food have eaten the food
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        let b=17;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        // const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};
        
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    board.innerHTML="";
    //snake
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //food
    foodElement=document.createElement('div');
    foodElement.style.gridColumnStart=food.x;
    foodElement.style.gridRowStart=food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}












window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0 ;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            inputDir.x=0 ;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            inputDir.x=1 ;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});