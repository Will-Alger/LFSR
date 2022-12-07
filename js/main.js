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
        let val = registerVal();
        let taps = getTaps();

        if (taps.length > 0) {
            if (ERROR.is(':visible')) {
                ERROR.fadeOut(100);
            }

            if(tripped) {
                result = keystream_output(val, result);
            } else {
                result = keystream_output(val);
                tripped = true;
            }
            let next = next_register_val(val, taps);
            $(".cell").each(function (index) {
                this.innerHTML = next[index];
            })

            let regVal = ""
            for (let cell of val)
                regVal = regVal.concat(cell);

            OUTPUT.append(
                $("<div>", {class: "output-item mt-3"}).append(
                    $("<p>", ).append(
                        $("<span>").html(
                            "Register: &nbsp&nbsp&nbsp&nbsp&nbsp" + regVal
                        ),
                    ),
                    $("<p>", {class: "col-12 bg-light mt-1"}).append(
                        $("<span>", ).html(
                            "Keystream: &nbsp" + result
                        ),
                        $("<span>", {class:"float-end"}).text(
                            result.length + " bit(s)"
                        ),
                    )
                ),
            );
            OUTPUT.scrollTop(OUTPUT[0].scrollHeight);
        } else{
            displayError("* at least 1 cell must be tapped");
        }
    });
})

function init() {
    if ($('.dropdown-item').length === 0)
        renderMenuOptions(20);
     renderRegister(5);
}

function reset() {
    ERROR.empty();
    resetKeyStream();
    init();
}

function displayError(str) {
    ERROR.html("<h6 class='ps-1'>" + str + "</h6>").fadeIn(300)
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
            let tap = $('#cell_contents td:nth-child(' + (index + 1) + ') button');
            if (this.checked) {
                tap.removeClass('btn-outline-dark').addClass('btn-secondary');
            }
            else {
                tap.removeClass('btn-secondary').addClass('btn-outline-dark');
            }
        });
    });
}





















