
// cache commonly used selectors
const DROP_DOWN_MENU = $('.dropdown-menu');
const CELL_CONTENTS = $('#cell_contents');
const CELL_SELECT = $('#cell_select');
const CELL = $('.cell');
const EXECUTE = $('#execute');
const OUTPUT = $('#output');
const RESET = $('#reset');
const CELL_TAPS = $("#cell_taps");

$(function () {
    init();
    let result = "";
    let tripped = false;

    // when # of cells selected change
    DROP_DOWN_MENU.on('click', '.dropdown-item', function() {
        CELL_SELECT.html($(this).html());
    });

    CELL_SELECT.on('DOMSubtreeModified', function () {
        renderCells(CELL_SELECT.html());
        OUTPUT.empty();
    })

    RESET.on('click', function () {
        reset();
        result = "";
        tripped = false;
    });

    // TODO change to actually do a shift and not just put cell contents in output

    EXECUTE.on('click', function() {
        //console.log("hello ")
        let val = registerVal();
        let taps = getTaps();
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
        OUTPUT.append(("<p>" + result + "</p>"));
    });
})


function reset() {
    renderCells(5);
    OUTPUT.empty();
}


 function init() {
    renderCells(5);
    renderMenuOptions();
}

function renderMenuOptions () {
    for (let i = 1; i <= 20; i++) {
        DROP_DOWN_MENU.append('<li><a class="dropdown-item">' + i.toString() + '</a></li>')
    }
}





function renderCells(n) {
    CELL_SELECT.html(n);
    $('#cell_contents').empty();
    for (let i = 0; i < n; i++) {
        CELL_CONTENTS.append('<td><button type="button" class="btn btn-outline-dark rounded-0 cell">0</button></td>');
    }
    $('.cell').each(function () {
       this.addEventListener('click', function(){
           OUTPUT.empty();
           $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
       })
    })
    renderTaps(n);
}

function renderTaps(n) {
    $("#cell_taps").empty();
    for(let i = 0; i < n; i++) {
        CELL_TAPS.append('<td><input type="checkbox" class="taps"></td>')
   }
}






