// set variables
choosePlayer = true;
person.A = 'アリス';
person.B = 'ボリス';
numVariables = ['N', 'A', 'B'];

// additional global variables
let N;
let COMPUTER_TIMEOUT = 1000;

// functions
function render() {
    let playground = Array(2*N - 1);
    for (let i = 0; i < 2*N - 1; i++) {
        if (i % 2 === 1) {
            playground[i] = ' ';
        } else if (player.position === Math.floor(i / 2) + 1) {
            if (player.name === person.A) {
                playground[i] = 'A';
            } else {
                playground[i] = 'B';
            }
        } else if (computer.position === Math.floor(i / 2) + 1) {
            if (computer.name === person.A) {
                playground[i] = 'A';
            } else {
                playground[i] = 'B';
            }
        } else {
            playground[i] = '_';
        }
    }
    changePlayground(playground.join(''));
}

function isGameOver() {
    let x = player.position;
    let y = computer.position;
    if (turn === player.name) {
        if (!isValid(x, y - 1) && !isValid(x, y + 1)) {
            return true;
        }
    } else {
        if (!isValid(x - 1, y) && !isValid(x + 1, y)) {
            return true;
        }
    }
    return false;
}

function isValid(a, b) {
    return 1 <= a && a <= N && 1 <= b && b <= N && a !== b;
}

function movePlayer(d) {
    if (d !== -1 && d !== 1) {
        showErrorMessage('無効な操作');
    } else if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else if (!isValid(player.position + d, computer.position)) {
        showErrorMessage('無効な操作');
    } else {
        showErrorMessage('');

        player.position += d;

        render();
        if (isGameOver()) {
            finishGame(player);
        } else {
            changeTurn();
            setTimeout(moveComputer, COMPUTER_TIMEOUT);
        }
    }
}

function moveComputer() {
    if (player.position < computer.position) {
        if (isValid(player.position, computer.position - 1)) {
            computer.position -= 1;
        } else {
            computer.position += 1;
        }
    } else {
        if (isValid(player.position, computer.position + 1)) {
            computer.position += 1;
        } else {
            computer.position -= 1;
        }
    }
    render();
    if (isGameOver()) {
        finishGame(computer);
    } else {
        changeTurn();
    }
}

function checkVariables(N, A, B) {
    if (isNaN(N) || isNaN(A) || isNaN(B)) {
        showErrorMessage('数字を入力してください');
        return false;
    } else if (N < 1 || 20 < N) {
        showErrorMessage('Nには1以上20以下の整数を入力してください');
        return false;
    } else if (A < 1 || N < A || B < 1 || N < B) {
        showErrorMessage('AとBには1以上N以下の整数を入力してください');
        return false;
    } else if (A === B) {
        showErrorMessage('AとBには異なる整数を入力してください');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    let A, B;
    N = parseInt(variables['N']);
    A = parseInt(variables['A']);
    B = parseInt(variables['B']);

    if (checkVariables(N, A, B)) {

        if (player.name === person.A) {
            player.position = A;
            computer.position = B;
        } else {
            player.position = B;
            computer.position = A;
        }

        turn = person.A;
        showTurn();

        addButton('<', function () {
            movePlayer(-1);
        });

        addButton('>', function () {
            movePlayer(1);
        });

        render();

        if (isGameOver()) {
            if (turn === player.name) finishGame(computer);
            else finishGame(player);
        } else if (turn === computer.name) {
            setTimeout(moveComputer, COMPUTER_TIMEOUT);
        }

    }
}