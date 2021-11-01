var submitted = false

function calculate(data) {
    size = 8
    totalTime = getMilliseconds(erg8.value) + getMilliseconds(erg7.value) + getMilliseconds(erg6.value) + getMilliseconds(erg5.value) + getMilliseconds(erg4.value) + getMilliseconds(erg3.value) + getMilliseconds(erg2.value) + getMilliseconds(erg1.value)
    min = Math.floor((totalTime/size)/600)
    sec = Math.floor(((totalTime/size)-min*600)/10)
    millisec = Math.round((totalTime/size)%10)
    output = min + ":" + sec + "." + millisec
    if (submitted == false) {
        submitted = true
        var result = document.createElement("h2");
        result.id = "result"
        result.innerHTML = "Your boat's erg average is: <mark>" + output + "</mark>";
        document.getElementById("form").appendChild(result);
        document.getElementById("submit").innerHTML = "Recalculate!";
    } else {
        document.getElementById("result").innerHTML = "Your boat's erg average is: <mark>" + output + "</mark>";
        document.getElementById("submit").innerHTML = "Recalculate!";
    }
    console.log(output)
}

function getMilliseconds(data) {
    array = data.split("")
    return parseInt(array[0])*600 + parseInt(array[2]+array[3])*10 + parseInt(array[5])
}
