function getLeft(i, j) {
    return 20 + j * 120;
}

function getTop(i, j) {
    return 20 + i * 120;
}

function CannotGenerate() {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(cell[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2: return "#eee4de"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f56e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c9"; break;
        case 8192: return "#93c"; break;

    }
    return "black";

}

function getNumberColor(number) {
    if(number <= 4) {
        return "#776e65";

    }
    else{
        return "white";
    }
} 

function MoveLeft() {
    for(var i = 0; i < 4; i++ ) {
        for(var be = 1; be < 4; be++ ) {
            for(var fi = 0; fi < be; fi++) {
                if(cell[i][be] != 0) {
                    if(ifLineObstcale(i,be,i,fi) == false && (cell[i][be] == cell[i][fi] || cell[i][fi] == 0)) {
                        if(cell[i][be] == cell[i][fi] ) {
                            cell[i][fi] = 2 * cell[i][fi];
                            cell[i][be] = 0;
                            showAnimationMove(i, be, i, fi);
                            score = score + cell[i][fi];
                        }
                        else if(cell[i][fi] == 0) {
                            cell[i][fi] = cell[i][be];
                            cell[i][be] = 0;
                            showAnimationMove(i, be, i, fi);
                        }
                    }
                }
            }
                
        }
    }
}

function MoveRight() {
    for(var i = 0; i < 4; i++) {
        for(var be = 2; be > -1; be--) {
            for(var fi = 3; fi > be; fi--) {
                if(cell[i][be] != 0) {
                    if(ifLineObstcale(i, fi, i, be) == false && (cell[i][be] == cell[i][fi] || cell[i][fi] == 0)) {
                        if(cell[i][be] == cell[i][fi]) {
                            cell[i][fi] = 2 * cell[i][fi];
                            cell[i][be] = 0;
                            showAnimationMove(i, be, i, fi);
                            score = score + cell[i][fi];
                        }
                        else if(cell[i][fi] == 0) {
                            cell[i][fi] = cell[i][be];
                            cell[i][be] = 0;
                            showAnimationMove(i, be, i, fi);
                        }
                    }
                }
            }
        }
    }
}

function MoveUp() {
    for(var j = 0; j < 4; j++) {
        for(var be = 1; be < 4; be++) {
            for(var fi = 0; fi < be; fi++) {
                if(cell[be][j] != 0) {
                    if(ifRowObstacle(be, j, fi, j) == false && (cell[be][j] == cell[fi][j] || cell[fi][j] == 0)) {
                        if(cell[be][j] == cell[fi][j]) {
                            cell[fi][j] = 2 * cell[fi][j];
                            cell[be][j] = 0;
                            showAnimationMove(be ,j, fi, j);
                            score = score + cell[fi][j];
                        }
                        else if(cell[fi][j] == 0) {
                            cell[fi][j] = cell[be][j];
                            cell[be][j] = 0;
                            showAnimationMove(be ,j, fi, j);
                        }
                    }
                }
            }
        }
    }
}

function MoveDown() {
    for(var j = 0; j < 4; j++ ) {
        for(var be = 2; be > -1; be--) {
            for(var fi = 3; fi > be; fi--) {
                if(cell[be][j] != 0) {
                    if(ifRowObstacle(fi, j, be, j) == false && (cell[be][j] == cell[fi][j] || cell[fi][j] == 0)) {
                        if(cell[be][j] == cell[fi][j]) {
                            cell[fi][j] = 2 *cell[fi][j];
                            cell[be][j] = 0;
                            showAnimationMove(be ,j, fi, j);
                            score = score + cell[fi][j];
                        }
                        else if(cell[fi][j] == 0) {
                            cell[fi][j] = cell[be][j];
                            cell[be][j] = 0;
                            showAnimationMove(be ,j, fi, j);
                        }
                    }
                }
            }
        }
    }
}

function ifMoveLeft() {
    for(var i = 0; i < 4; i++ ) {
        for(var be = 1; be < 4; be++ ) {
            for(var fi = 0; fi < be; fi++) {
                if(cell[i][be] != 0) {
                    if(ifLineObstcale(i,be,i,fi) == false && (cell[i][be] == cell[i][fi] || cell[i][fi] == 0)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function ifMoveRight(){
    for(var i = 0; i < 4; i++) {
        for(var be = 2; be > -1; be--) {
            for(var fi = 3; fi > be; fi-- ) {
                if(cell[i][be] != 0) {
                    if(ifLineObstcale(i, fi, i, be) == false && (cell[i][be] == cell[i][fi] || cell[i][fi] == 0)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function ifMoveUp() {
    for(var j = 0; j < 4; j++) {
        for(var be = 1; be < 4; be++) {
            for(var fi = 0; fi < be; fi++) {
                if(cell[be][j] != 0) {
                    if(ifRowObstacle(be, j, fi, j) == false && (cell[be][j] == cell[fi][j] || cell[fi][j] == 0)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function ifMoveDown() {
    for(var j = 0; j < 4; j++ ) {
        for(var be = 2; be > -1; be--) {
            for(var fi = 3; fi > be; fi--) {
                if(cell[be][j] != 0) {
                    if(ifRowObstacle(fi, j, be, j) == false && (cell[be][j] == cell[fi][j] || cell[fi][j] == 0)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function ifLineObstcale(i,be,i,fi) {
    for(var j = fi + 1; j < be; j++ ) {
        if(cell[i][j] != 0) {
            return true;
        }
    }
    return false;
}

function ifRowObstacle(be, j, fi ,j) {
    for(var i = fi + 1; i < be; i++ ) {
        if(cell[i][j] != 0) {
            return true;
        }
    }
    return false;
}

function generateOneNumber(){
    if(CannotGenerate()) {
        gameOver();
    }
    else {
        var t = 0;
        while(t < 40) {
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
            if(cell[x][y] == 0) {
                cell[x][y] = Math.random() >= 0.5 ? 2 : 4;
                showNumberWithAnimation(x, y, cell[x][y]);
                break;
            }
            else {
                t++;
            }
        }
        if(t == 40) {
            for(var i = 0; i < 4; i++) {
                for(var j = 0; j < 4; j++) {
                    if(cell[i][j] == 0) {
                        cell[i][j] = Math.random() >= 0.5 ? 2 : 4;
                        showNumberWithAnimation(i, j, cell[i][j]);
                        break;
                    }
                }
            }
        }
        setTimeout("updateBoardView()",50);
        
    }
}