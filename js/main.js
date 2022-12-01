const DROP_DOWN_MENU = $('.dropdown-menu');
const CELL_CONTENTS = $('#cell_contents');
const CELL_SELECT = $('#cell_select');
const EXECUTE = $('#execute');
const OUTPUT = $('#output');
const RESET = $('#reset');
const CELL_TAPS = $("#cell_taps");
const ERROR = $('#error_msg');

let result = "";
let tripped = false;
ERROR.hide();

$(function () {
    init();

    // when # of cells selected change
    DROP_DOWN_MENU.on('click', '.dropdown-item', function() {
        renderRegister($(this).html())
        resetKeyStream();
    });

    RESET.on('click', function () {
        reset()
    });

    EXECUTE.on('click', function() {
        ERROR.empty();

        let val = registerVal();
        let taps = getTaps();

        if (taps.length > 0) {
            if(tripped) { // if output has already occurred
                result = keystream_output(val, result); // append to end of current output as part of the key stream

            } else { // otherwise
                result = keystream_output(val);
                tripped = true;
            }
            let next = next_register_val(val, taps);
            $(".cell").each(function (index) {
                this.innerHTML = next[index];
            })
            OUTPUT.append(("<p>" + result + "</p>"));
        } else{
            ERROR
                .html("<h6 class='ps-1'>error: at least one tap must be selected</h6>")
                .fadeToggle(300).delay(3000).fadeToggle(300).delay(3000);
        }
    });
})

function init() {
    if ($('.dropdown-item').length === 0)
        renderMenuOptions(20);
     renderRegister(5);
}

function reset() {
    resetKeyStream();
    init();
}

function resetKeyStream() {
    OUTPUT.empty();
    result = "";
    tripped = false;
}

function renderMenuOptions (n) {
    for (let i = 1; i <= n; i++)
        DROP_DOWN_MENU.append('<li><a class="dropdown-item">' + i.toString() + '</a></li>');
}

function renderRegister(n) {
    CELL_SELECT.html(n);
    renderCells(n);
    renderTaps(n);
}

function renderCell() {
    CELL_CONTENTS.append('<td><button type="button" class="btn btn-outline-dark rounded-0 cell">0</button></td>');
}

function renderCells(n) {
    CELL_CONTENTS.empty();
    for (let i = 0; i < n; i++) {renderCell();}
    attachCellListeners();
}

function attachCellListeners() {
    $('.cell').each(function () {
        this.addEventListener('click', function(){
            resetKeyStream();
            $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
        });
    });
}

function renderTap() {
    CELL_TAPS.append('<td><input type="checkbox" class="tap form-check-input mt-2"></td>');
}

function renderTaps(n) {
    CELL_TAPS.empty();
    for (let i = 0; i < n; i++) {renderTap();}
    attachTapListeners();
}
function attachTapListeners() {
    $('.tap').each(function (index) {
        this.addEventListener('change', function(){
            resetKeyStream();
            if (this.checked) {
                $('#cell_contents td:nth-child(' + (index + 1) + ') button')
                    .removeClass('btn-outline-dark')
                    .addClass('btn-secondary')
                    .css("border", '1px solid black')
            }
            else {
                $('#cell_contents td:nth-child(' + (index + 1) + ') button')
                    .removeClass('btn-secondary')
                    .addClass('btn-outline-dark')
            }
        });
    });
}





















