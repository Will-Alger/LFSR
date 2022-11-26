$(function () {






    $("#cell_select").on('click', function () {
        if ($(".dropdown-menu").empty())
            for (let i = 1; i <= 15; i++) {
                $(".dropdown-menu").append('<li><a class="dropdown-item">' + i.toString() + '</a></li>')
            }
    });

    $(".dropdown-menu").on('click', '.dropdown-item', function() {
        $('#cell_select').html($(this).html());

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






