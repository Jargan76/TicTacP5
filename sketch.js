var startCanvas;
var gameCanvas;
// used to hold the marker, keeps from alowing dbl clicks
var boxes = [[],[],[],[],[],[],[],[],[]];
// will always start on X but changes back and forth O X . ..
var xOrO = "X";
// reset button used by setResetBtn function
var resetBtn;
// same as above
var newGameBtn;
// hold the number needed used for pc's turn
var holder = [];
// helps keep track of home screen activity
var isHomeActive = true;
// which page of the home screen are you on. used by wantXorO() 
var homeOne = true;
// used by announceWinner() stops player from add any more marks to the board
var winner = false;
// by default set to 2 player mode
var single = false;
// keeps track of pc/players turns ++ default set to true
var playersTurn = true;
// keeps track of players symbol
var playersMark = "X";
// used by runFlasher()...**BLINK BLINK**
var flasher = 40;

// this is p5 base function sets up and starts the home page
function setup() {
  setCanvas();
}
// this is another p5 base function it is a forever loop  
function draw() {
    // always checking to see if it it's turn
    pcTurn();
    
    // runs in background when home screens are visible
    runFlasher();
}
// create the canvas gives it a class and event listener then runs numPlayers()
function setCanvas(){
    startCanvas = createCanvas(600,600);
    startCanvas.class("myCan");
    startCanvas.mouseClicked(theChoice);
    numPlayers();
}
//creates game board canvas, reset, and new game buttons with a classes and event listeners, 
function setGCanvas(){
    isHomeActive = false;
    gameCanvas = createCanvas(600,600);
    gameCanvas.class("myCan");
    // watches the canvas and tell us where it was clicked/touched. 
    gameCanvas.mouseClicked(theOneThatGetsItDone);
    background(232, 243, 255);
    setResetBtn();
    setNewGameBtn();
    lines();
}
// prints all you see on the home screen 1- flashing borders
function numPlayers(){
    background(33);
    stroke(136,85,204);
    strokeWeight(3);
    fill(230);
    textSize(64);
    textAlign(CENTER);
    text("Tic Tac Toe", 300, 90);
    textSize(52);
    text("By", 150, 250 );
    text("yourself", 150, 300 );
    text("With a", 450, 250 );
    text("friend", 450, 300);
    stroke(250);
    line(0, 150, width, 150);
    line(300, 150, 305, height);
    Person(125, 450);
    Person(399, 450);
    Person(451, 450);
}
// simple bathroom door style person image Constructor. just give it an x and y location 
function Person(x,y){
    this.x = x;
    this.y = y;
    noStroke();
    fill(151,99,204);
    rect(this.x, this.y, 50, 50);
    ellipse(this.x+25, this.y, 50);
    ellipse(this.x+25, this.y-50, 45);
}
// used on home screens. Event listener function 1 player or 2, X or O
function theChoice(){
    if(isHomeActive === true){
        if(homeOne === true){
        // these are the options on main home page
            if(mouseX < 300 && mouseY > 150){
            // single player option sends you to ask if you want X or O
                wantXorO();
                single = true;
            }
            if(mouseX > 300 && mouseY > 150){
            // two player option starts standard game you and friend deside who is first
                setGCanvas();
            }
        }else{
        // these are the options on the second home page single player options
           if(mouseX < 300 && mouseY > 150){
                // you chose X so you pick first.
                playersMark = "X"
                setGCanvas();
            }
            if(mouseX > 300 && mouseY > 150){
                setGCanvas();
                playersTurn = false;
                playersMark = "O";
                pcTurn();
            }    
        }
    }
    
}
// prints all you see on the home screen 2- flashing borders
function wantXorO(){
    homeOne = false;
    background(33);
    stroke(136,85,204);
    strokeWeight(3);
    fill(230);
    textSize(64);
    textAlign(CENTER);
    text("Tic Tac Toe", 300, 90);
    textSize(52);
    text("Go first", 150, 300 );
    text("Go next", 450, 300);
    textSize(108);
    text("X", 150, 483);
    text("O", 450, 483);
    stroke(250);
    line(0, 150, width, 150);
    line(300, 150, 305, height);
}
// creates reset button with a class and click listner
function setResetBtn(){
    resetBtn = createButton("New Game");
    resetBtn.mouseClicked(resetBoard);
    resetBtn.class("btn reset");
}
// creates new game button with a class and click listner
function setNewGameBtn(){
    newGameBtn = createButton("Home");
    newGameBtn.mouseClicked(newGame);
    newGameBtn.class("btn new-game");
}
// function used by new Game btn. Sort of a cheat reloading page
function newGame(){
    window.location.reload();
}
// as it's name says resets the game board
function resetBoard(){
    // no longer a winner change back to false
    winner = false;
    // empty array again
    boxes = [[],[],[],[],[],[],[],[],[]];
    // set back to X since X always starts
    xOrO = "X";
    // repaints bg - washes away the X's n O's
    background(232, 243, 255);
    //redraw the lines
    lines();
    // ensures that the pc continues to go first
    if(playersMark === "O"){
        playersTurn = false;
        pcTurn();
    }
    // ensures that the player will still go first
    if(playersMark === "X"){
        playersTurn = true;
    }
}
// draws the line on the board
function lines(){
    var count = 0;
    for(var i = 0; i < 2; i++){
        var cnt = 200+count;
        stroke(33);
        strokeWeight(2);
        line(cnt, 5, cnt, 595);
        for(var j = 0; j < 2; j++){
            line(5,cnt, 595, cnt);
        }
        count = 200;
    }
}
// returns int based on the mouse x y 
function getCords(){
    // box 1
    if(mouseX < 200 && mouseY < 200){
        return 1;
    }
    // box 2
    if(mouseX > 200 && mouseX < 400 && mouseY < 200){
       return 2;
    }
    // box 3
    if(mouseX > 400 && mouseY < 200){
        return 3;
    }
    //box 4 middle row
    if(mouseX < 200 && mouseY > 200 && mouseY < 400){
        return 4;   
    }
    //box 5 
    if(mouseX > 200 && mouseX < 400 && mouseY > 200 && mouseY < 400){
        return 5;
    }
    // box 6  
    if(mouseX > 400 && mouseY > 200 && mouseY < 400){
       return 6;
    }
    // box 7 bottom row
    if(mouseX < 200 && mouseY > 400){
       return 7;
    }
    // box 8 
    if(mouseX > 200 && mouseX < 400 & mouseY > 400){
        return 8;
    }
    // box 9 
    if(mouseX > 400 && mouseY > 400){
       return 9;
    }
}
// the name kind of says it all. 
function theOneThatGetsItDone(){
    if(winner === false){
        // returns box number 
        var cords = getCords();
        if(boxes[cords-1].length === 0){    
            // tells us what the current symbol is
            var marker = setMarker();
            // save the spot so can tell if it has been used or not
            boxes[cords-1].push(marker);
            // Print to the screen so the world can see
            printMark(cords, marker);
            winConditions();
            playersTurn = false;
        }
    }
}
// flips the X to O back and forth
function setMarker(){
    // if it is X return X to fill box and make it O
    if(xOrO === "X"){
        xOrO = "O";
        return "X";
    }else{
        // change to X and return O to fill box
        xOrO = "X";
        return "O";
    }
}
// as name suggests prints to screen. using getcords() and setMarker()
function printMark(num, symbl){
    var xLocal;
    var yLocal;
    switch(num){
        case 1:
            xLocal = 100;
            yLocal = 100;
            break;
        case 2:
            xLocal = 300;
            yLocal = 100;
            break;
        case 3:
            xLocal = 500;
            yLocal = 100;
            break;
        case 4:
            xLocal = 100;
            yLocal = 300;
            break;
        case 5:
            xLocal = 300;
            yLocal = 300;
            break;
        case 6:
            xLocal = 500;
            yLocal = 300;
            break;
        case 7:
            xLocal = 100;
            yLocal = 500;
            break;
        case 8:
            xLocal = 300;
            yLocal = 500;
            break;
        case 9:
            xLocal = 500;
            yLocal = 500;
            break;
    }
    fill(232, 243, 255);
    stroke(33);
    strokeWeight(7);
    if(symbl === "X"){
        line(xLocal-55, yLocal-55, xLocal+55, yLocal+55);
        line(xLocal-55, yLocal+55, xLocal+55, yLocal-55);
    }else{
        ellipse(xLocal, yLocal, 100);
    }
}
// has anyone won this game?? 
function winConditions(){
    if(isHomeActive === false){
        // handles horixontial wins
        for(var i = 0; i <= 6; i++){
            if(boxes[i].length > 0 && boxes[i+1].length > 0 && boxes[i+2].length > 0){
                if(i === 0 || i === 3 || i === 6){
                    if(boxes[i][0] === "X" && boxes[i+1][0] === "X" && boxes[i+2][0] === "X"){
                        setInterval(500);
                        winner = true;
                        announceWinner("X");
                    }else if(boxes[i][0] === "O" && boxes[i+1][0] === "O" && boxes[i+2][0] === "O"){
                        winner = true;
                        announceWinner("O");
                    }
                }    
            }
        }
        // handles vertical Wins
        for(var j = 0; j <= 2; j++){
            if(boxes[j].length > 0 && boxes[j+3].length > 0 && boxes[j+6].length > 0){
                if(boxes[j][0] === "X" && boxes[j+3][0] === "X" && boxes[j+6][0] === "X"){
                    winner = true;
                    announceWinner("X");
                }else if(boxes[j][0] === "O" && boxes[j+3][0] === "O" && boxes[j+6][0] === "O"){
                    winner = true;
                    announceWinner("O");
                }
            }
        }
        // handels diangle left to right wins
        if(boxes[0].length > 0 && boxes[4].length > 0 && boxes[8].length > 0){
            if(boxes[0][0] === "X" && boxes[4][0] === "X" && boxes[8][0] === "X"){
                winner = true;
                announceWinner("X");
            }else if(boxes[0][0] === "O" && boxes[4][0] === "O" && boxes[8][0] === "O"){
                winner = true;
                announceWinner("O");
            }
        }
        // handels diangle right to left wins
        if(boxes[2].length > 0 && boxes[4].length > 0 && boxes[6].length > 0){
            if(boxes[2][0] === "X" && boxes[4][0] === "X" && boxes[6][0] === "X"){
                winner = true;
                announceWinner("X");
            }else if(boxes[2][0] === "O" && boxes[4][0] === "O" && boxes[6][0] === "O"){
                winner = true;
                announceWinner("O");
            }
        }
        var cat = catCheck();
        if(cat === true){
            announceWinner("Draw");
        }
    }
}
function catCheck(){
    var filled = true;
    for(var box = 0; box < boxes.length; box++){
        if(boxes[box].length === 0){
            filled = false
        }
    }
    return filled;
}
// prints the winner on the screen.
function announceWinner(sym){
    textSize(100);
    textAlign(CENTER);
    stroke(33);
    strokeWeight(2);
    fill(230, 155);
    rect(100, 210, 400, 115);
    fill(51, 9, 204);
    if(winner === true && sym === "X" || sym === "O"){
        text(sym + " wins!!!", width/2, height/2);
    }
    if(winner === false && sym === "Draw"){
        text(sym + "!!!", width/2, height/2);
    }
}
// this runs all the flashing borders on home screens
function runFlasher(){
    // var flasher = 40;
    if(isHomeActive === true){
        if(flasher < 150){
            flasher += 1.5;
        }
        noFill();
        strokeWeight(2);
        stroke(flasher);
        rect(320,170,270,410);
        rect(18,175,260,400);
        rect(13,170,270,410);
        rect(325,175,260,400);
        ellipse(150, 445, 165);
        ellipse(150, 445, 160);
        ellipse(450, 445, 165);
        ellipse(450, 445, 160);
        stroke(100+flasher, 55+flasher, 104+flasher);
        rect(15,173,265,405);
        rect(323,173,265,405);
        ellipse(150, 445, 163);
        ellipse(450, 445, 163);
        if(flasher >= 110){
            flasher = 40;
        }
    }
}
// quick check to see what boxes can be played puts that list in holder
function addToHolder(){
    // keeps it fresh, always empty at start
    holder = [];
    // runs through boxes array and adds empty slots to holder
    for(var a = 0; a < boxes.length; a++){
         if(boxes[a].length === 0){
            holder.push(a);
         }
    }
}
// time for the computer to pick a box
function pcTurn(){
    if(winner === false && single === true && playersTurn === false){
        addToHolder();
        var r = random(holder);
        boxes[r].push(xOrO);
        printMark(r+1, xOrO);
        setMarker();
        winConditions();
        playersTurn = true;
    }
}

