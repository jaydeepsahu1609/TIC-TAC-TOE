let x = true,
    checkedBlocks = 0;

let board = document.getElementById("board");

let blocks = Object.values(document.getElementsByClassName("blocks"));

let block = [
    blocks.slice(0, 3),
    blocks.slice(3, 6),
    blocks.slice(6, 9)
];

let result = document.getElementById("res");

// ----------------------------------------------------------------------------------------------------------------------------

function setBlock(index) {
    console.log("set block for " + (x ? "x" : "o"));
    // FILL THE BLOCK
    //IF X = TRUE : FILL X
    //   ELSE : FILL O
    if (x)
        block[index[0]][index[1]].innerHTML = "X";
    else
        block[index[0]][index[1]].innerHTML = "O";

    //DISABLE THAT BLOCK
    block[index[0]][index[1]].style.pointerEvents = "none";

    checkedBlocks++;

    //CHECK FOR VICTORY
    checkVictory();

    //TOGGLE THE VALUE OF X
    x = x ? false : true;
}

// ----------------------------------------------------------------------------------------------------------------------------

function checkVictory() {
    if (checkedBlocks >= 5 || checkedBlocks <= 9) {
        console.log("checkvictory() if");
        // Logic: A player wins if
        //
        for (let i = 0; i < 3; i++) {
            // 1. Rows are same
            // --> 00 == 01 == 02
            // --> 10 == 11 == 12
            // --> 20 == 21 == 22
            //

            if (block[i][0].innerHTML.trim().length != 0 && block[i][1].innerHTML.trim().length != 0 && block[i][2].innerHTML.trim().length != 0) {
                console.log("check for row");
                if ((block[i][0].innerHTML == block[i][1].innerHTML) && (block[i][1].innerHTML == block[i][2].innerHTML)) {
                    win("Row " + (i + 1));
                    return;
                }
            }

            // 2. Columns are same
            // --> 00 == 10 == 20
            // --> 01 == 11 == 21
            // --> 02 == 12 == 22
            //
            else
            if (block[0][i].innerHTML.trim().length != 0 && block[1][i].innerHTML.trim().length != 0 && block[2][i].innerHTML.trim().length != 0) {
                console.log("check for column");

                if ((block[0][i].innerHTML == block[1][i].innerHTML) && (block[1][i].innerHTML == block[2][i].innerHTML)) {
                    win("Column " + (i + 1));
                    return;
                }
            }

        }

        // 3. Diagonals are same
        // --> 00 == 11 == 22
        //
        if (block[0][0].innerHTML.trim().length != 0 && block[1][1].innerHTML.trim().length != 0 && block[2][2].innerHTML.trim().length != 0) {
            console.log("check for diaognal");

            if ((block[0][0].innerHTML == block[1][1].innerHTML) && (block[1][1].innerHTML == block[2][2].innerHTML)) {
                win("Digonal-1");
            }
        } else
        // --> 02 == 11 == 20
        //
        if (block[0][2].innerHTML.trim().length != 0 && block[1][1].innerHTML.trim().length != 0 && block[2][0].innerHTML.trim().length != 0) {
            console.log("check for diaognal");
            if ((block[0][2].innerHTML == block[1][1].innerHTML) && (block[1][1].innerHTML == block[2][0].innerHTML)) {
                win("Digonal-2");
            }
        }
    }
    // 4. Else Draw
    //
    else if (checkedBlocks > 9) {
        console.log("checkvictory() else");

        console.log("draw");
        board.style.pointerEvents = "none";
        result.innerHTML = "Draw!!! Press Reset!!";
    }
}

// ----------------------------------------------------------------------------------------------------------------------------

function win(winBy) {
    console.log("win");

    //STOP THE USER FROM CLICKING THE BOARD, UNTILL THE BOARD HAS BEEN RESET
    board.style.pointerEvents = "none";

    result.classList.add("blinkResult");

    //DISPLAY WIN
    result.innerHTML = "Player '" + (x ? 'X' : 'O') + "' WON by " + winBy + " !!! Press reset!!";

}

// ----------------------------------------------------------------------------------------------------------------------------

function resetBoard() {
    console.log("reset");
    board.style.pointerEvents = "auto";
    result.innerHTML = "";
    checkedBlocks = 0;
    x = true;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            block[i][j].style.pointerEvents = "auto";
            block[i][j].innerHTML = "";
        }
    }

    result.classList.remove("blinkResult");
}
// ----------------------------------------------------------------------------------------------------------------------------