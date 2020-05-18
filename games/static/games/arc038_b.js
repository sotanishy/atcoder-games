// set variables
choosePlayer = true;
person.A = '先手';
person.B = '後手';
numVariables = ['H', 'W'];
gridVariables = ['S']

// additional global variables
let H, W;
let win;
let r, c;

// functions
function render() {
    let pg = '<pre>';
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (i == r && j == c) pg += 'O';
            else pg += S[i][j];
            pg += j == W-1 ? '<br>' : ' ';
        }
    }
    pg += '</pre>'
    changePlayground(pg);
}

function isGameOver() {
    return !(isValid(r+1, c) || isValid(r, c+1) || isValid(r+1, c+1))
}

function isValid(i, j) {
    return i < H && j < W && S[i][j] == '.'
}

function movePlayer(dr, dc) {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else if (!isValid(r+dr, c+dc)) {
        showErrorMessage('その方向には動けません');
    } else {
        showErrorMessage('');

        r += dr;
        c += dc;

        render();
        if (isGameOver()) {
            finishGame(player);
        } else {
            changeTurn();
            setTimeout(moveComputer, 1000);
        }
    }
}

function moveComputer() {
    if (isValid(r+1, c) && !win[r+1][c]) r++;
    else if (isValid(r, c+1) && !win[r][c+1]) c++;
    else if (isValid(r+1, c+1) && !win[r+1][c+1]) { r++; c++; }
    else if (isValid(r+1, c)) r++;
    else if (isValid(r, c+1)) c++;
    else { r++; c++; }


    render();
    if (isGameOver()) {
        finishGame(computer);
    } else {
        changeTurn();
    }
}

function calcAns() {
    win = new Array(H);
    for (let i = H-1; i >= 0; i--) {
        win[i] = new Array(W);
        for (let j = W-1; j >= 0; j--) {
            win[i][j] = false;
            if (S[i][j] == '#') win[i][j] = true;
            if (i < H-1 && !win[i+1][j]) win[i][j] = true;
            if (j < W-1 && !win[i][j+1]) win[i][j] = true;
            if (i < H-1 && j < W-1 && !win[i+1][j+1]) win[i][j] = true;
        }
    }
}

function checkVariables(H, W, S) {
    if (isNaN(H) || isNaN(W)) {
        showErrorMessage('数字を入力してください');
        return false;
    } else if (H < 1 || 100 < H || W < 1 || 100 < W) {
        showErrorMessage('HとWには1以上100以下の整数を入力してください');
        return false;
    } else if (S.length != H || S.some(row => row.length != W)) {
        showErrorMessage('Sの大きさがH、Wと一致しません');
        return false;
    }
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (S[i][j] != '#' && S[i][j] != '.') {
                showErrorMessage('Sの各文字は#か.である必要があります');
                return false;
            }
        }
    }
    if (S[0][0] == '#') {
        showErrorMessage('左上のマスは.である必要があります');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    H = parseInt(variables['H']);
    W = parseInt(variables['W']);
    S = variables['S'].split('\n');

    if (checkVariables(H, W, S)) {

        calcAns();

        turn = person.A;
        showTurn();

        r = c = 0;

        addButton('右', function () {
            movePlayer(0, 1);
        });

        addButton('下', function () {
            movePlayer(1, 0);
        });

        addButton('右下', function () {
            movePlayer(1, 1);
        });

        render();

        if (turn === computer.name) {
            setTimeout(moveComputer, 1000);
        }
    }
}