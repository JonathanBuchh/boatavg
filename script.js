var submitted = false
var size = 8

function defineBoatClass(data) {
    submitted = false
    if (data.value == 2) {
        size = 2
        const parent = document.getElementById("form")
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
        parent.innerHTML = `<ol reversed>
        <li><input type=text id=erg2 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
        <li><input type=text id=erg1 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
        </ol>
        <button id=submit>Calculate!</button>`
    } else if (data.value == 4) {
        size = 4
        const parent = document.getElementById("form")
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
        parent.innerHTML = `<ol reversed>
            <li><input type=text id=erg4 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg3 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg2 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg1 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
        </ol>
        <button id=submit>Calculate!</button>`
    } else if (data.value == 8) {
        size = 8
        const parent = document.getElementById("form")
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
        parent.innerHTML = `<ol reversed>
            <li><input type=text id=erg8 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg7 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg6 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg5 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg4 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg3 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg2 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
            <li><input type=text id=erg1 placeholder="5:59.9" pattern="[1-9]:[0-6][0-9]\\.[0-9]" required></li>
        </ol>
        <button id=submit>Calculate!</button>`
    }
}

function calculate(data) {
    if (size == 2) {
        totalTime = (getMilliseconds(erg2.value) + getMilliseconds(erg1.value))/size;
    } else if (size == 4) {
        totalTime = (getMilliseconds(erg4.value) + getMilliseconds(erg3.value) + getMilliseconds(erg2.value) + getMilliseconds(erg1.value))/size;
    } else if (size == 8) {
        totalTime = (getMilliseconds(erg8.value) + getMilliseconds(erg7.value) + getMilliseconds(erg6.value) + getMilliseconds(erg5.value) + getMilliseconds(erg4.value) + getMilliseconds(erg3.value) + getMilliseconds(erg2.value) + getMilliseconds(erg1.value))/size;
    }
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
        document.getElementById("submit").innerHTML = "Recalculate!";
    }
}

function getMilliseconds(data) {
    array = data.split("");
    return parseInt(array[0])*600 + parseInt(array[2]+array[3])*10 + parseInt(array[5]);
}
