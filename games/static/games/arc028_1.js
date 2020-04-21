// set variables
choosePlayer = true;
person.A = 'Antさん';
person.B = 'Bugくん';
numVariables = ['N', 'A', 'B'];

// additional global variables
let N;
let COMPUTER_TIMEOUT = 1000;

// functions
function render() {
    changePlayground(`残り ${N} 個`);
    showTurn();
}

function movePlayer() {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else {
        showErrorMessage('');

        N -= player.stones;
        if (N < 0) N = 0;
        render();
        if (N === 0) {
            finishGame(player);
        } else {
            changeTurn();
            setTimeout(moveComputer, COMPUTER_TIMEOUT);
        }
    }
}

function moveComputer() {
    N -= computer.stones;
    if (N < 0) N = 0;
    render();
    if (N == 0) {
        finishGame(computer);
    } else {
        changeTurn();
    }
}

function checkVariables(N, A, B) {
    if (isNaN(N) || isNaN(A) || isNaN(B)) {
        showErrorMessage('数字を入力してください');
        return false;
    } else if (N < 1 || 1000 < N || A < 1 || 1000 < A || B < 1 || 1000 < B) {
        showErrorMessage('1以上1000以下の整数を入力してください');
        return false;
    }
    return true;
}

function startGame(variables) {
    let A, B;
    N = parseInt(variables['N']);
    A = parseInt(variables['A']);
    B = parseInt(variables['B']);

    if (checkVariables(N, A, B)) {
        showErrorMessage('');

        if (player.name === person.A) {
            player.stones = A;
            computer.stones = B;
        } else {
            player.stones = B;
            computer.stones = A;
        }

        turn = person.A;

        addButton('小石を取る', function () {
            movePlayer();
        });

        render();

        if (turn === computer.name) {
            setTimeout(moveComputer, COMPUTER_TIMEOUT);
        }

    }
}