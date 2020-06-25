var cell = []
for(var i = 0; i < 4; i++ ) {
    cell[i] =[0,0,0,0];
}
var score = 0;

$(document).ready(function(){
    newGame();
})

function newGame() {
    init();
    generateOneNumber();
    generateOneNumber();
}



function gameOver(){
    alert("游戏结束");
}

function init() {
    var i,j;
    for(i = 0; i < 4; i++) {
        for(j = 0 ; j < 4; j++) {
            var m = $("#cell-" + i + '-' + j);
            m.css("left",getLeft(i,j));
            m.css("top",getTop(i,j));
        }
    }

    for(i = 0; i < 4; i++ ) {
        for(j = 0; j < 4; j++ ) {
            cell[i][j] = 0;
        }
    }
    score = 0;
    updateBoardView();
}


$(document).keydown(function(event){
    if (event.keyCode == 39) {
        if(ifMoveRight() == true) {
            MoveRight();
            setTimeout("updateBoardView()",300);
            setTimeout("generateOneNumber()",300);
        }
    }
    else if (event.keyCode == 37) {
        //判断能否左移
        if(ifMoveLeft() == true) {
            MoveLeft();
            setTimeout("updateBoardView()",300);
            setTimeout("generateOneNumber()",300);
        }

    }
    else if (event.keyCode == 38) {
        if(ifMoveUp() == true) {
            MoveUp();
            setTimeout("updateBoardView()",300);
            setTimeout("generateOneNumber()",300);
        }
    }
    else if (event.keyCode == 40) {
        if(ifMoveDown() == true) {
            MoveDown();
            setTimeout("updateBoardView()",300);
            setTimeout("generateOneNumber()",300);
        }
    }
    setTimeout(function() {
        if(ifMoveRight() == false && ifMoveLeft() == false && ifMoveUp() == false && ifMoveDown() == false) {
        gameOver();
    }
    },352);
    
     
});