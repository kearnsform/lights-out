function randomSelection(array, selectSize) {
    shuffleArray(array);
    return array.slice(0, selectSize);
}

function randomInt(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

function randomColor() {
    return hslColor(randomInt(0, 360));
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}