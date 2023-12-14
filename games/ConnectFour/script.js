let turn = true
let coloring_allowed = true
let counter_draw
const SQUARES = document.getElementsByClassName('inner')
const BOARD = document.getElementById('pai')
const RED = 'red'
const GREEN = 'green'
const WIN_SITUATIONS = [
    [0,1,2,3],
    [1,2,3,4],
    [5,6,7,8],
    [6,7,8,9],
    [10,11,12,13],
    [11,12,13,14],
    [15,16,17,18],
    [16,17,18,19],
    [20,21,22,23],
    [21,22,23,24],
    [0,5,10,15],
    [5,10,15,20],
    [1,6,11,16],
    [6,11,16,21],
    [2,7,12,17],
    [7,12,17,22],
    [3,8,13,18],
    [8,13,18,23],
    [4,9,14,19],
    [9,14,19,24],
    [5,11,17,23],
    [0,6,12,18],
    [6,12,18,24],
    [1,7,13,19],
    [3,7,11,15],
    [4,8,12,16],
    [8,12,16,20],
    [9,13,17,21]
]

function fill(){
    BOARD.innerHTML = ``
    for (i = 0; i < 25; i++) {
        BOARD.innerHTML += `<div class="inner" onclick="paint(${i})"></div>`
        SQUARES[i].style.backgroundColor = 'darkblue'
    }
    document.querySelector('h2').innerText = `Winner :`
    coloring_allowed = true
    counter_draw = 0
}

function paint(x) {
    if (coloring_allowed && SQUARES[x].style.backgroundColor == 'darkblue') {
        if (turn) {
            SQUARES[x].style.backgroundColor = GREEN
        }
        else {
            SQUARES[x].style.backgroundColor = RED
        }
        turn = !turn
        isWin();
        counter_draw++
    }
    if(counter_draw == SQUARES.length){
        document.querySelector('h2').innerText = `Draw!`
    }
}

function isWin(){
    let counter_win
    let colors = [GREEN, RED]
    for(let color of colors){
        for(line=0; line<WIN_SITUATIONS.length; line++){
            if(counter_win == WIN_SITUATIONS[0].length){
                break
            }
            counter_win = 0
            for(position=0; position < WIN_SITUATIONS[line].length; position++){
                SQUARES[WIN_SITUATIONS[line][position]].style.backgroundColor == color && counter_win++
                if(counter_win == 4){
                    document.querySelector('h2').innerText = `Winner : ${color}!`
                    coloring_allowed = false
                }
            }
        }
    }
}
