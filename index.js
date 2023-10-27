const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
//current player, winning position 


let currentPlayer;
let gameGrid;
// to check how many grids filled 
const winningPositions=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
initilizeGame();
// fucntion to intilize game
function initilizeGame(){
    currentPlayer = 'X';
    gameGrid=["","","","","","","","","",""];
    // empty in ui also
    boxes.forEach((box,index)=>{
        box.innerText = '';
        boxes[index].style.pointerEvents="all";
        // boxes[index].classList.remove("win   ");
        // or
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;

}
function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //update UI
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner id X
            if(gameGrid[position[0]]==="X"){
                answer="X"
            }
            else{
                answer="O";
            }
            //disable pointer event
            boxes.forEach(box=>{
                box.style.pointerEvents="none";
            })
            //we know the winner now
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //lets check for tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });
    //if all box non empty then fill count is 9
    if(fillCount === 9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }


}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //switch turn
        swapTurn();
        //check if someboy has won or not
        checkGameOver();
    }
    
}
// now add event listner to the boxes
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
newGameBtn.addEventListener("click",initilizeGame);

