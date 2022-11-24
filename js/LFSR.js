$(function () {




    $("#calculate").on('click', function() {
        let x = "";
        $(".btn_content button").each(function(i, element) {
            x =  x.concat(element.innerHTML);
        })
        console.log(x);
    })

    $(".btn_content button").each(function () {
        this.addEventListener("click", function () {
            $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
        });
    });

})






