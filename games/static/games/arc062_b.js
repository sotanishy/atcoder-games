// set variables
choosePlayer = false;
person.A = 'AtCoDeerくん';
person.B = 'TopCoDeerくん';
strVariables = ['s'];

// additional global variables
let s;
let ans;
let playerHand;
let score;

// functions
function render() {
    let pg = '<pre>';
    for (let i = 0; i < s.length; i++) {
        pg += s.charAt(i);
        if (i !== s.length - 1) pg += ' ';
        else pg += '\n';
    }
    for (let i = 0; i < s.length; i++) {
        if (i < playerHand.length) pg += playerHand.charAt(i);
        else pg += '_';
        if (i !== playerHand.charAt(i)) pg += ' ';
        else pg += '\n';
    }
    pg += '</pre>';
    pg += 'Score: ' + score;
    changePlayground(pg);
}

function movePlayer(hand) {
    if (turn !== player.name) {
        showErrorMessage('あなたのターンではありません');
    } else {
        if (!checkCondition(playerHand + hand)) {
            showErrorMessage('入力が制約を満たしていません');
            return;
        }

        showErrorMessage('');

        playerHand += hand;
        let opp = s.charAt(playerHand.length - 1);
        if (hand === 'p' && opp === 'g') score++;
        if (hand === 'g' && opp === 'p') score--;

        render();
        if (playerHand.length === s.length) {
            if (score === ans) {
                finishGame(player);
            } else {
                finishGame(computer);
            }
        }
    }
}

function calcAns() {
    ans = 0;
    for (let i = 0; i < s.length; i++) {
        let c = s.charAt(i);
        if (i % 2 === 0) {
            if (c === 'p') ans--;
        } else {
            if (c === 'g') ans++;
        }
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

function checkVariables(s) {
    if (s.length < 1 || Math.pow(10, 5) < s.length) {
        showErrorMessage('sの長さは1以上10^5以下で入力してください');
        return false;
    } else if ([...s].some(c => c !== 'p' && c !== 'g')) {
        showErrorMessage('gとp以外の文字が含まれています');
        return false;
    }
    if (!checkCondition(s)) {
        showErrorMessage('入力が制約を満たしていません');
        return false;
    }
    showErrorMessage('');
    return true;
}

function startGame(variables) {
    s = variables['s']

    if (checkVariables(s)) {
        turn = person.A;
        showTurn();

        playerHand = '';
        score = 0;

        calcAns();

        addButton('g', function () {
            movePlayer('g');
        });

        addButton('p', function () {
            movePlayer('p');
        });

        render();
    }
}