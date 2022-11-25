$(function () {




    $("#calculate").click(function() {
        let x = "";
        $(".btn_content button").each(function(i, element) {
            x =  x.concat(element.innerHTML);
        })
        console.log(x);
    })


    $("#reload").click(function() {
        $("tr").empty();
        for(i=0; i<$("#cells").val(); i++) {
        $("tr").append('<td><div class="btn_content"><button type="button" class="btn btn-outline-dark rounded-0 ">0</button></div></td>')
        } 
        console.log('yes')
        $(".btn_content button").each(function () {
            this.addEventListener("click", function () {
                $(this).html() === '1' ? $(this).html('0')  : $(this).html('1');
            });
        });
    })
    

})






