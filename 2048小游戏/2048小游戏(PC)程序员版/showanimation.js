function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + "-" + j);
    var job = switchJob(randNumber);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.css('font-size',22);
    numberCell.text(job);
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPostTop(i,j),
        left: getPostLeft(i,j)
    },50);

}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top:getPostTop(tox, toy),
        left:getPostLeft(tox, toy)
    },200)
}

function updateScore(score) {
    $("#score").text(score);
}