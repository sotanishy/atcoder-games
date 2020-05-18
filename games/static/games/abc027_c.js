// set variables
choosePlayer = true;
person.A = '高橋君';
person.B = '青木君';
numVariables = ['N'];

// additional global variables
let N;
let x;
let add;

// functions
function render() {
    let pg = `x: ${x}`;
    changePlayground(pg);
}

function movePlayer(n) {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else {
        showErrorMessage('');

        x = 2 * x + n;

        render();
        if (x > N) {
            finishGame(computer);
        } else {
            changeTurn();
            setTimeout(moveComputer, 1000);
        }
    }
}

function moveComputer() {
    x *= 2;
    if (add) x++;
    render();
    if (x > N) {
        finishGame(player);
    } else {
        changeTurn();
    }
}

function calcAns() {
    let n = N;
    let d = 0;
    while (n > 1) {
        n = Math.floor(n / 2);
        d++;
    }
    if (d % 2 == 0) {
        // Takahashi should do 2x+1
        if (computer.name === person.A) add = true;
        else add = false;
    } else {
        // Takahashi should do 2x
        if (computer.name === person.A) add = false;
        else add = true;
    }
}

function checkVariables(N) {
    if (isNaN(N)) {
        showErrorMessage('数字を入力してください');
        return false;
    } else if (N < 1 || Math.pow(10, 18) < N) {
        showErrorMessage('Nは1以上10^18以下の整数を入力してください');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    N = parseInt(variables['N']);

    if (checkVariables(N)) {

        turn = person.A;
        showTurn();

        x = 1;

        calcAns();

        addButton('2x', function () {
            movePlayer(0);
        });

        addButton('2x+1', function () {
            movePlayer(1);
        });

        render();

        if (turn === computer.name) {
            setTimeout(moveComputer, 1000);
        }
    }
}