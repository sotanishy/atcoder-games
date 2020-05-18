// set variables
choosePlayer = false;
person.A = '高橋君';
person.B = '青木君';
numVariables = ['N'];
strVariables = ['S'];

// additional global variables
let N;
let S;
let ans;
let takScore = Array(N).fill(0);
let aokPos = Array(N).fill(0);

// functions
function render(t) {
    let pg = '';
    for (let i = 0; i < N; i++) {
        if (i == t) {
            pg += '<span style="color: red">' + S[i] + '</span>';
        } else if (t >= 0 && i == aokPos[t]) {
            pg += '<span style="color: blue">' + S[i] + '</span>';
        } else {
            pg += S[i];
        }
        if (i != N - 1) pg += ' ';
    }
    if (t >= 0) {
        pg += '<br>Score: ' + takScore[t];
    }
    changePlayground(pg);
}

function movePlayer(i) {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else if (isNaN(i)) {
        showErrorMessage('数字を入力してください');
    } else if (i < 1 || N < i) {
        showErrorMessage('1以上N以下の整数を入力してください');
    } else {
        showErrorMessage('');

        i--;
        render(i);
        if (takScore[i] == ans) {
            finishGame(player);
        } else {
            finishGame(computer);
        }
    }
}

function calcAns() {
    ans = -10000;
    for (let i = 0; i < N; i++) {
        let max = -10000, pos = -1, score = 0;
        for (let j = 0; j < N; j++) {
            if (i == j) continue;

            let tak = 0;
            let aok = 0;
            let s = Math.min(i, j);
            let t = Math.max(i, j);
            for (let k = 0; k <= t - s; k++) {
                if (k % 2 == 0) tak += S[s+k];
                else aok += S[s+k];
            }
            if (max < aok) {
                max = aok;
                pos = j;
                score = tak;
            }
        }
        takScore[i] = score;
        ans = Math.max(ans, score);
        aokPos[i] = pos;
    }
}

function checkVariables(N, S) {
    if (isNaN(N) || S.some(x => isNaN(x))) {
        showErrorMessage('数字を入力してください');
        return false;
    } else if (S.length != N) {
        showErrorMessage('NとSの長さが一致しません');
        return false;
    } else if (N < 2 || 50 < N) {
        showErrorMessage('Nには2以上50以下の整数を入力してください');
        return false;
    } else if (S.some(x => x < -50 || 50 < x)) {
        showErrorMessage('Sの要素には-50以上50以下の整数を入力してください');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    N = parseInt(variables['N']);
    S = variables['S'].split(' ').map(x => parseInt(x));

    if (checkVariables(N, S)) {
        turn = person.A;
        showTurn();

        calcAns();

        addInput('左から何番目の要素を選ぶか入力してください', function (value) {
            movePlayer(parseInt(value));
        });

        render(-1);
    }
}