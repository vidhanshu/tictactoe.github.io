let tap = new Audio("tap.wav");
let bg = new Audio("bg.mp3")
let vic = new Audio('win.wav');
let r = new Audio('reset.wav');
let tie = new Audio("tie.wav");
let mode = new Audio("sweep.mp3");
var line = document.querySelector(".won-line");
var dark_mod = document.querySelector(".dark-mod3");
var body = document.querySelector(".body");
var p1, p2;
p1 = p2 = 0;
//initially paused
bg.pause();
/* dark mode */
const dark = () => {
    body.style.backgroundColor = "black";
    body.style.color = "white";
}
const light = () => {
    body.style.backgroundColor = "white";
    body.style.color = "black";
}

dark_mod.addEventListener('click', function() {
    if (dark_mod.className == "dark-mod3 fas fa-sun") {
        mode.play();
        dark_mod.className = "dark-mod3 fas fa-moon";
        dark();
    } else {
        light();
        mode.play();
        dark_mod.className = "dark-mod3 fas fa-sun";
    }
})
var turnCounter = 0;

//making score of both player 0
document.querySelector(".p1").innerText = p1;
document.querySelector(".p2").innerText = p2;

//for background music
var s = document.querySelector(".speak");
s.addEventListener('click', function() {
    if (bg.paused) {
        bg.play();
        s.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        bg.pause();
        s.classList.replace("fa-volume-up", "fa-volume-mute");
    }
})

//change turn
var turn = 0;

const changeTurn = () => {
    turnCounter++;
    if (turn == 0) {
        turn = 1;
        return "X";
    } else {
        turn = 0;
        return "O";
    }
}

var gameWon = false;


//getting all the elements from the html that are having class name "bax" and parsing this htmlobject collection into array
var boxes = document.getElementsByClassName("box");
//for every element in the array we have placed an event listener in such a way that if somebody press the  particular box then the function will be called which will chk if the box is empty or not if empty then and then onlly it will write x or o depending upon players turn
const ar = [...boxes]; //spread operator 
ar.map((elements) => {
    elements.addEventListener('click', function() {
        //change the inner html ifff there is nothing in the box else don't 
        if (gameWon != true) {
            if (elements.innerText == "") {
                elements.innerText = changeTurn();
                tap.play();
                document.querySelector(".turn").innerText = "Player " + (turn + 1) + "'s" + " turn";
            }
            chkWin();
            if (turnCounter == 9 && gameWon == false) {
                document.querySelector(".turn").innerText = "Ooops no one won\n please try again....!";
                tie.play();
            }
        }
        if (gameWon == true) {
            if (turn + 1 === 2) {
                p1++;
                document.querySelector(".p1").innerText = p1;
            } else {
                p2++;
                document.querySelector(".p2").innerText = p2;
            }
        }

    });
});

//reset all inner texts to blank

document.querySelector(".reset").addEventListener('click', function() {
        //play the reset music along with that make all boxes blank
        if (!bg.paused) {
            r.play();
        }
        ar.forEach(function(e) {
                e.innerText = '';
            })
            //write again bes of luck into info text
        document.querySelector(".turn").innerText = "Best Of luck both of you!......";
        //afte reset the turn should also be reseted
        turn = 0;
        //gamewon should also be reseted
        gameWon = false;
        //image size will also become 0 again
        document.querySelector(".img").style.width = "0%";
        //won line width 0
        line.style.width = "0%";
        //counter 0
        turnCounter = 0;
    })
    //taking all elements with class box from html in the form of array
var b = Array.from(document.getElementsByClassName("box"));
//to check if won or not we must check if one of the  combinatiojn among that 2d array is met or not
const chkWin = () => {
    let possible = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        //e will be replaced with the array above one by one
        //example [0,1,2][0] means first elemetnt of the array that is 0 and so on....
    possible.forEach((e) => {
        if ((b[e[0]].innerText === b[e[1]].innerText) && (b[e[1]].innerText === b[e[2]].innerText) && (b[e[0]].innerText != "")) {

            //printing that player (tunr+1) won 
            changeTurn();
            document.querySelector(".turn").innerText = "Player " + (turn + 1) + " won";
            changeTurn();
            //playing the victory sound
            vic.play();
            //gamewon true
            gameWon = true;
            //image size 50 dancing cat
            document.querySelector(".img").style.width = "50%";
            //line red

            if (e[0] == 0 && e[2] == 2) {
                line.style.width = "90%";
                line.style.transform = "rotate(180deg)";
                line.style.top = "22.7%";
            } else if (e[0] == 3 && e[2] == 5) {
                line.style.width = "90%";
                line.style.transform = "rotate(180deg)";
                line.style.top = "48%";
            } else if (e[0] == 6 && e[2] == 8) {
                line.style.width = "90%";
                line.style.transform = "rotate(180deg)";
                line.style.top = "77.6%";
                line.style.left = "5%";
            } else if (e[0] == 0 && e[2] == 6) {
                line.style.width = "90%";
                line.style.transform = "rotate(90deg)";
                line.style.left = "-22%";
                line.style.top = "50%";
            } else if (e[0] == 1 && e[2] == 7) {
                line.style.width = "95%";
                line.style.transform = "rotate(90deg)";
                line.style.left = "5%";
                line.style.top = "50%";
            } else if (e[0] == 2 && e[2] == 8) {
                line.style.width = "90%";
                line.style.transform = "rotate(90deg)";
                line.style.left = "33.4%";
                line.style.top = "50%";
            } else if (e[0] == 0 && e[2] == 8) {
                line.style.width = "90%";
                line.style.transform = "rotate(45deg)";
                line.style.top = "48%";
            } else if (e[0] == 2 && e[2] == 6) {
                line.style.width = "90%";
                line.style.transform = "rotate(-45deg)";
                line.style.top = "50%";
            }
        }
    })
}