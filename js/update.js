function update() {
    const elem = document.querySelector('#test')
    if (elem.innerHTML == '1')
        elem.innerHTML = '0'
    else
        elem.innerHTML = '1'
}