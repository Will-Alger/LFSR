
// input should be arr of 0s and 1s (int)
function feedback(taps) { //xor is actually just modulo 2 so this does work
    let i = taps[0];
    for(let j = 1; j < taps.length; j++) {
        i = i + taps[j] === 1? 1 : 0;
    }
    return i;
}

// concatenates to given input the next output
function keystream_output(arr, keystream_input="") {
    keystream_input = keystream_input.concat(arr[arr.length - 1]);
    return keystream_input;
}

//returns an array of ints which should be the next register value
function next_register_val(arr, taps) {
    let arr2 = [];
    for(let i = 0; i < arr.length; i++) {
        if(i === 0) {
            arr2[i] = feedback(taps);
        } else {
            arr2[i] = arr[i - 1];
        }
    }
    return arr2;
}

function   getTaps() {
    let x = [];
    let arr = registerVal();
    $(".tap").each(function(index) {
        if(this.checked){
            x.push(arr[index]);
        }
    })
    return x;
}

function registerVal() {
    let x = []
    $(".cell").each(function() {
        x.push(parseInt($(this).html()));
    })
    return x;
}

