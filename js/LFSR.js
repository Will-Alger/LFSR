const DROP_DOWN_MENU = $('.dropdown-menu');
const CELL_CONTENTS = $('#cell_contents');
const CELL_SELECT = $('#cell_select');
const CELL = $('#cell');

$(function () {


    /*
* .dropdown-menu
* # cell_contents
*  # cell_select
*
* */


    init();


    // swap value of dropdown menu
    DROP_DOWN_MENU.on('click', '.dropdown-item', function() {
        CELL_SELECT.html($(this).html());
    });

    CELL_SELECT.on('DOMSubtreeModified', function () {
        renderCells(CELL_SELECT.html());
    })

    CELL.each(function () {
        this.addEventListener("click", function () {
            $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
        });
    });


    //
    // $("#calculate").click(function() {
    //     let x = "";
    //     $(".btn_content button").each(function(i, element) {
    //         x =  x.concat(element.innerHTML);
    //     })
    //     console.log(x);
    // })



    // $("#reload").click(function() {
    //     $("tr").empty();
    //     for(let i = 0; i<$("#cells").val(); i++) {
    //     $("tr").append('<td><div class="btn_content"><button type="button" class="btn btn-outline-dark rounded-0 ">0</button></div></td>')
    //     }
    //     console.log('yes')
    //     $(".btn_content button").each(function () {
    //         this.addEventListener("click", function () {
    //             $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
    //         });
    //     });
    // })
    

})
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
    $('#cell_contents').empty();
    for (let i = 0; i < n; i++) {
        CELL_CONTENTS.append('<td><div class="cell"><button type="button" class="btn btn-outline-dark rounded-0 ">0</button></div></td>');
    }
}






