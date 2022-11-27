const DROP_DOWN_MENU = $('.dropdown-menu');
const CELL_CONTENTS = $('#cell_contents');
const CELL_SELECT = $('#cell_select');
const CELL = $('.cell');
const EXECUTE = $('#execute');
const OUTPUT = $('#output');
const RESET = $('#reset');

$(function () {
    init();


    // swap value of dropdown menu
    DROP_DOWN_MENU.on('click', '.dropdown-item', function() {
        CELL_SELECT.html($(this).html());
    });

    CELL_SELECT.on('DOMSubtreeModified', function () {
        renderCells(CELL_SELECT.html());
        OUTPUT.empty();
    })

    RESET.on('click', function () {reset();});

    EXECUTE.on('click', function() {
        console.log("hello ")
        let result = " "
        $('.cell').each(function () {
            result = result.concat($(this).html());
        });
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
           console.log("hello");
           $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
       })
    })
}






