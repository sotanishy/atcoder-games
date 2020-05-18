// set variables
choosePlayer = false;
person.A = 'あなた';
person.B = 'ルンルン';
numVariables = ['N'];
strVariables = ['a'];

// additional global variables
let N;
let a;

// functions
function render() {
    let pg = '残り個数: ';
    for (let i = 0; i < N; i++) {
        pg += a[i];
        if (i != N - 1) pg += ', ';
    }
    changePlayground(pg);
}

function movePlayer(colors) {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else if (colors.some(x => isNaN(x))) {
        showErrorMessage('数字を入力してください');
    } else if (colors.some(x => x < 1 || N < x)) {
        showErrorMessage('1以上N以下の整数を入力してください');
    } else if (colors.some(x => a[x-1] == 0)) {
        showErrorMessage('残り0個のりんごは選べません');
    } else {
        showErrorMessage('');

        for (let i = 0; i < colors.length; i++) {
            a[colors[i]-1]--;
        }

        render();
        if (!a.some(x => x > 0)) {
            finishGame(player);
        } else {
            changeTurn();
            setTimeout(moveComputer, 1000);
        }
    }
}

function moveComputer() {
    if (a.some(x => x % 2 == 1)) {
        for (let i = 0; i < N; i++) {
            if (a[i] % 2 == 1) a[i]--;
        }
    } else {
        for (let i = 0; i < N; i++) {
            if (a[i] > 0) {
                a[i]--;
                break;
            }
        }
    }

    render();
    if (!a.some(x => x > 0)) {
        finishGame(computer);
    } else {
        changeTurn();
    }
}

function checkVariables(N, a) {
    if (isNaN(N) || a.some(x => isNaN(x))) {
        showErrorMessage('数字を入力してください');
        return false;
    } else if (a.length != N) {
        showErrorMessage('Nとaの長さが一致しません');
        return false;
    } else if (N < 1 || 100 < N) {
        showErrorMessage('Nには1以上100以下の整数を入力してください');
        return false;
    } else if (a.some(x => x < 1 || 100 < x)) {
        showErrorMessage('aの要素には1以上100以下の整数を入力してください');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    N = parseInt(variables['N']);
    a = variables['a'].split(' ').map(x => parseInt(x));

    if (checkVariables(N, a)) {
        turn = person.A;
        showTurn();

        addInput('選ぶりんごの色を空白区切りで入力してください', function (value) {
            movePlayer(value.split(' ').map(x => parseInt(x)));
        });

        render();
    }
}