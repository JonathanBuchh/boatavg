var submitted = false
size = 0

function defineBoatClass(data) {
    const parent = document.getElementById("form")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    size = data.value
    parent.innerHTML += '<ol reversed>'
    for (i = 0; i < size; i++) {
        parent.innerHTML += '<li><input type="text" id="erg' + (i+1) + '" placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>'
    }
    parent.innerHTML += '</ol> <button id="submit">Calculate!</button>'
}

function calculate(data) {
    totalTime = 0
    for (i = 0; i < size; i++) {
        totalTime += getMilliseconds(document.getElementById("erg" + (i+1)).value)
    }
    totalTime = totalTime/size
    min = Math.floor(totalTime/600);
    sec = Math.floor((totalTime-min*600)/10);
    millisec = Math.round(totalTime%10);
    output = min + ":" + sec + "." + millisec;
    if (submitted == false) {
        submitted = true;
        var result = document.createElement("h2");
        result.id = "result";
        result.innerHTML = "Your boat's erg average is: <mark>" + output + "</mark>";
        document.getElementById("form").appendChild(result);
        document.getElementById("submit").innerHTML = "Recalculate!";
    } else {
        document.getElementById("result").innerHTML = "Your boat's erg average is: <mark>" + output + "</mark>";
    }
}

function getMilliseconds(data) {
    array = data.split("");
    return parseInt(array[0])*600 + parseInt(array[2]+array[3])*10 + parseInt(array[5]);
}