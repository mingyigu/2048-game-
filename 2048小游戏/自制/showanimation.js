function onMouseover() {
    $("#button").css("background-color","maroon");
}

function onMouseout(){
    $("#button").css("background-color","peru");
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++ ) {
        for(var j = 0; j < 4; j++) {
            $("#chessboard").append('<div class = "number-cell" id = "number-cell-' + i + "-" + j +'"></div>');
            var x = $("#number-cell-" + i + '-' + j);

            if(cell[i][j] != 0){
                x.css("width", "100px");
                x.css("height", "100px");
                x.css("top", getTop(i, j));
                x.css("left", getLeft(i, j));
                x.css('background-color', getNumberBackgroundColor(cell[i][j]));
                x.css('color', getNumberColor(cell[i][j]));
                x.text(cell[i][j]);
            }
            else {
                x.css("width", "0px");
                x.css("height", "0px");
                x.css("top", getTop(i, j) + 50);
                x.css("left", getLeft(i, j) + 50);
            }
        }
    }
    $("#goal").text(score);
}

function showNumberWithAnimation(i, j, number) {
    x = $("#number-cell-" + i + '-' + j );
    x.css('background-color', getNumberBackgroundColor(number));
    x.css('color', getNumberColor(number));
    x.text(number);
    x.animate({
        width: "100px",
        height: "100px",
        top: getTop(i,j),
        left: getLeft(i,j)
    },50);
}


function showAnimationMove(bex, bey, fix, fiy) {
    x = $("#number-cell-" + bex + '-' + bey);
    x.animate({
        top: getTop(fix,fiy),
        left: getLeft(fix,fiy),
        width: "100px",
        height: "100px",
    },300)
}