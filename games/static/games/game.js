// variables
let person = {};
let choosePlayer = true;
let player = {};
let computer = {};
let turn;
let numVariables = [];
let strVariables = [];
let gridVariables = [];

// functions
function showMessage(text) {
    $('#message').text(text)
}

function showErrorMessage(text) {
    $('#error-message').text(text);
}

function showTurn() {
    showMessage(turn + 'のターン');
}

function showWJ() {
    $('#WJ').show();
    $('#AC').hide();
    $('#WA').hide();
}

function showAC() {
    $('#WJ').hide();
    $('#AC').show();
    $('#WA').hide();
}

function showWA() {
    $('#WJ').hide();
    $('#AC').hide();
    $('#WA').show();
}

function changeTurn() {
    if (turn === person.A) turn = person.B;
    else turn = person.A;
    showTurn();
}

function changePlayground(text) {
    $('#playground').html(text);
}

function finishGame(winner) {
    if (winner === player) showAC();
    else showWA();
    showMessage('ゲーム終了');
    $('#buttons').children().off();
    $('#inputs').children().off();
}

function addButton(text, callback) {
    let btn = $('<button class="m-1 btn btn-secondary"></button>').text(text).click(callback);
    $('#buttons').append(btn);
}

function addInput(text, callback) {
    let group = $('<div class="form-group row justify-content-md-center"></div>');
    group.append($(`<input type="text" class="col-sm-5 form-control" id="input-${text}" placeholder=${text}>`));
    group.append($('<button type="submit" class="col-sm-1 btn btn-secondary">送信</button>'));
    let form = $('<form></form>').append(group).submit(function (e) {
        e.preventDefault();
        callback($(`#input-${text}`).val());
    })
    $('#inputs').append(form);
}

// main function
$(document).ready(function () {
    $('#person-A-label').text(person.A);
    $('#person-B-label').text(person.B);
    if (!choosePlayer) {
        $('#person-B').prop('disabled', true);
    }

    numVariables.forEach(v => {
        let group = $('<div class="form-group row"></div>');
        group.append($(`<label for="var-${v}" class="col-sm-2">${v}</label>`));
        group.append($(`<input type="number" class="col-sm-10 form-control" id="var-${v}">`));
        $('#variables').append(group);
    });

    strVariables.forEach(v => {
        let group = $('<div class="form-group row"></div>');
        group.append($(`<label for="var-${v}" class="col-sm-2">${v}</label>`));
        group.append($(`<input type="text" class="col-sm-10 form-control" id="var-${v}">`));
        $('#variables').append(group);
    });

    gridVariables.forEach(v => {
        let group = $('<div class="form-group row"></div>');
        group.append($(`<label for="var-${v}" class="col-sm-2">${v}</label>`));
        group.append($(`<textarea class="col-sm-10 form-control" id="var-${v}">`));
        $('#variables').append(group);
    })

    $('#form').submit(function (e) {
        e.preventDefault();
        if (choosePlayer) {
            if ($('#person-A').is(':checked')) {
                player.name = person.A;
                computer.name = person.B;
            } else {
                player.name = person.B;
                computer.name = person.A;
            }
        } else {
            player.name = person.A;
            computer.name = person.B;
        }

        variables = {};
        numVariables.forEach(v => {
            variables[v] = $(`#var-${v}`).val();
        });
        strVariables.forEach(v => {
            variables[v] = $(`#var-${v}`).val();
        });
        gridVariables.forEach(v => {
            variables[v] = $(`#var-${v}`).val();
        });
        showWJ();
        $('#buttons').children().remove();
        $('#inputs').children().remove();
        startGame(variables);
    });
});
