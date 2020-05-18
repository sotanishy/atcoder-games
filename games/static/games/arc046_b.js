// set variables
choosePlayer = true;
person.A = '高橋君';
person.B = '青木君';
numVariables = ['N', 'A', 'B'];

// additional global variables
let N;

// functions
function render() {
    changePlayground(`残り ${N} 個`);
}

function movePlayer(stones) {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else if (isNaN(stones)) {
        showErrorMessage('数字を入力してください');
    } else if (stones < 1 || player.stones < stones) {
        showErrorMessage(`1以上${player.stones}以下の整数を入力してください`);
    } else {
        showErrorMessage('');

        N = Math.max(0, N - stones);

        render();
        if (N === 0) {
            finishGame(player);
        } else {
            changeTurn();
            setTimeout(moveComputer, 1000);
        }
    }
}

function moveComputer() {
    if (N <= computer.stones) {
        N = 0;
    } else if (player.stones === computer.stones) {
        if (N % (computer.stones + 1) === 0) {
            N--;
        } else {
            N -= N % (computer.stones + 1);
        }
    } else {
        N--;
    }

    render();
    if (N === 0) {
        finishGame(computer);
    } else {
        changeTurn();
    }
}

function checkCondition(s) {
    let g = 0, p = 0;
    for (let i = 0; i < s.length; i++) {
        let c = s.charAt(i);
        if (c === 'g') g++;
        else if (c === 'p') p++;
        if (g < p) return false;
    }
    return true;
}

function checkVariables(N, A, B) {
    if (isNaN(N) || isNaN(A) || isNaN(B)) {
        showErrorMessage('数字を入力してください');
    } else if (N < 1 || 1000 < N || A < 1 || 1000 < A || B < 1 || 1000 < B) {
        showErrorMessage('1以上1000以下の整数を入力してください');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    N = parseInt(variables['N']);
    let A = parseInt(variables['A']);
    let B = parseInt(variables['B']);

    if (checkVariables(N, A, B)) {

        if (player.name === person.A) {
            player.stones = A;
            computer.stones = B;
        } else {
            player.stones = B;
            computer.stones = A;
        }

        turn = person.A;
        showTurn();

        addInput('取る石の数', function (value) {
            movePlayer(parseInt(value));
        });

        render();

        if (turn === computer.name) {
            setTimeout(moveComputer, 1000);
        }
    }
}