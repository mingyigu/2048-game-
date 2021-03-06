var board = new Array();
var score =0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    preproForMobile();
    newgame();

})

function preproForMobile(){
    if(documentWidth > 500) {
        chessBoard = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    $("#chessboard").css("width", chessBoard - 2 * cellSpace);
    $("#chessboard").css("height", chessBoard - 2 * cellSpace);
    $("#chessboard").css("padding", cellSpace);
    $("#chessboard").css("border-radius", 0.02 * chessBoard);

    $(".cell").css("width", cellSideLength);
    $(".cell").css("height", cellSideLength);
    $(".cell").css("border-radius", 0.02 * cellSideLength);

}

function newgame(){
    //初始化棋盘
    init();


    //生成两个随机数
    generateOneNumber();
    generateOneNumber();
    updateScore(score);

}

function init(){
    for(var i = 0; i < 4 ; i++ ){
        for (var j = 0; j < 4; j++){
            var Cell = $("#cell_" + i + "-" + j);
            Cell.css("top", getPostTop(i, j));
            Cell.css("left", getPostLeft(i, j));
        }

    }

    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
        }
    }

    updateBoardView();
    score = 0;

}

//更新棋盘数据显示
function updateBoardView(){
    $(".number-cell").remove();
    

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#chessboard").append('<div class = "number-cell" id = "number-cell-' + i + "-" + j +'"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            if(board[i][j] == 0){
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPostTop(i, j) + 0.5 * cellSideLength);
                theNumberCell.css('left', getPostLeft(i, j) + 0.5 * cellSideLength);
                
            }
            else{
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPostTop(i, j));
                theNumberCell.css('left', getPostLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                if(board[i][j] >= 1024) {
                    theNumberCell.css('fontSize',0.42 * cellSideLength + 'px');
                }
                else if(board[i][j] >= 128) {
                    theNumberCell.css('fontSize',0.5 * cellSideLength + 'px');
                }
                else {
                    theNumberCell.css('fontSize',0.55 * cellSideLength + 'px');
                }
            }
        }

    }
    $(".number-cell").css("line-height",cellSideLength + 'px');


}

//在棋盘随机生成一个2或4
function generateOneNumber(){
    if( noSpace(board)){
        return false;
    }
    else{
        var randx=parseInt(Math.floor(Math.random() * 4));
        var randy=parseInt(Math.floor(Math.random() * 4));
        var times = 0;
        var flag = 0;
        var randNumber;
        while(times < 50){
            if(board[randx][randy] == 0){
                flag = 1;
                randNumber = Math.random() <= 0.5 ? 2 : 4;
                board[randx][randy] = randNumber;
                showNumberWithAnimation(randx, randy, randNumber);
                break;
            }
            randx=parseInt(Math.floor(Math.random() * 4));
            randy=parseInt(Math.floor(Math.random() * 4));
            times++;
        }
    }
    if(flag == 0) {
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randNumber = Math.random() <= 0.5 ? 2 : 4;
                    showNumberWithAnimation(i, j, randNumber);
                    break;
                }
            }
        }
    }
    
}

//上下左右按键监听器
$(document).keydown(function(event){
    switch(event.keyCode){

        case 37 ://左
            if(moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;

        case 38 ://上
            if(moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;

        case 39 ://右
            if(moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;

        case 40 ://下
            if(moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;

        default :
            break;

    }
})


document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = startx - endx;
    var deltay = starty - endy;

    if(Math.abs(deltax) <= 0.2*documentWidth && (Math.abs(deltay) <= 0.2*documentWidth)) {
        return 0;
    }

    if(Math.abs(deltax) >= Math.abs(deltay)) {
        if(deltax >= 0){
            //向左移动
            if(moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
        else {
            //向右移动
            if(moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
    else {
        if(deltay > 0) {
            //向上移动
            if(moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
        else {
            //向下移动
            if(moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
});

function moveLeft() {
    if(!canMoveLeft(board)) {
        return false;
    }
    else {
        //所有数字往左移动
        for(var i = 0; i < 4; i++) {
            for(var j = 1 ; j < 4; j++) {
                if(board[i][j] != 0) {
                    for(var k = 0; k < j; k++) {
                        if(board[i][k] == 0 && noObstacle_row(i, k, j, board)) {
                            //移动
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[i][k] == board[i][j] && noObstacle_row(i, k, j, board)) {
                            //叠加
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = 2*board[i][j];
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score);
                            continue;

                        }
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()",200);
    return true;

}

function moveRight() {
    if(!canMoveRight(board)) {
        return false;
    }
    else {
        //所有数字右移
        for(var i = 0; i < 4; i++) {
            for(var j =2; j > -1; j--) {
                if(board[i][j] != 0){
                    for(var k = 3; k > j; k--){
                        if(board[i][k] == 0 && noObstacle_row(i, j, k, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[i][k] == board[i][j] && noObstacle_row(i, j, k, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = 2*board[i][j];
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score);
                            continue;
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp() {
    if(!canMoveUp(board)) {
        return false;
    }
    else{
        //所有数字上移
        for(var j = 0; j < 4; j++) {
            for(var i = 1; i < 4; i++) {
                if(board[i][j] != 0) {
                    for(var k = 0; k < i; k++) {
                        if(board[k][j] == 0 && noObstacle_line(j, k, i, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j] && noObstacle_line(j, k, i, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = 2*board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score);
                            continue;
                        }
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if(!canMoveDown(board)) {
        return false;
    }
    else{
        //所有数字下移
        for(var j = 0; j < 4; j++){
            for(var i = 2; i > -1; i--) {
                if(board[i][j] != 0) {
                    for(var k = 3; k > i; k--) {
                        if(board[k][j] == 0 && noObstacle_line(j, i, k, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j] && noObstacle_line(j, i, k, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = 2*board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score);
                            continue;
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//判断游戏是否结束
function isGameOver() {
    if(noSpace(board) && noMove(board)) {
        gameOver();
    }

}

//游戏结束
function gameOver() {
    alert("Game Over!");
}


