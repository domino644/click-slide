var box = document.getElementById("ukladanka");
var wspolczynnik;
var klocki = [];
var czyGra = true;
const zdjecie = document.querySelector(".img_cont");
zdjecie.scrollLeft = 0;
var grafika = "url(./floppas/floppa.png)";
var czas = 0;
var final_czas = czas;
var wynik = "";
var chronomierz;
var nick = "";
var mode = "";

function lewo() {
    document.getElementById("lewo").setAttribute("onclick", "");
    if (zdjecie.scrollLeft == 0) {
        zdjecie.scrollLeft = 540;
    }
    let x = 180;
    let interval = setInterval(() => {
        if (x > 0) {
            zdjecie.scrollLeft -= 1;
            x--;
        } else {
            clearInterval(interval);
            document.getElementById("lewo").setAttribute("onclick", "lewo()");
        }
    }, 1);
    switch (zdjecie.scrollLeft) {
        case 0:
            grafika = "url(./floppas/floppa.png)";
            break;
        case 180:
            grafika = "url(./floppas/floppa.png)";
            break;
        case 360:
            grafika = "url(./floppas/floppa_ass.png)";
            break;
        case 540:
            grafika = "url(./floppas/floppa_kaptur.png)";
            break;
    }
    console.log(grafika);
}
function prawo() {
    document.getElementById("prawo").setAttribute("onclick", "");
    if (zdjecie.scrollLeft == 540) {
        zdjecie.scrollLeft = 0;
    }
    let y = 180;
    let interval = setInterval(() => {
        if (y > 0) {
            zdjecie.scrollLeft += 1;
            y--;
        } else {
            clearInterval(interval);
            document.getElementById("prawo").setAttribute("onclick", "prawo()");
        }
    }, 1);

    switch (zdjecie.scrollLeft) {
        case 0:
            grafika = "url(./floppas/floppa_ass.png)";
            break;
        case 180:
            grafika = "url(./floppas/floppa_kaptur.png)";
            break;
        case 360:
            grafika = "url(./floppas/floppa.png)";
            break;
        case 540:
            grafika = "url(./floppas/floppa_ass.png)";
            break;
    }
    console.log(grafika);
}

function clear() {
    clearInterval(chronomierz);
    box.innerHTML = "";
    klocki = [];
    document.getElementById("3x3").setAttribute("onclick", "");
    document.getElementById("4x4").setAttribute("onclick", "");
    document.getElementById("5x5").setAttribute("onclick", "");
    document.getElementById("6x6").setAttribute("onclick", "");
}
function fill() {
    let id = 0;
    for (let y = 0; y < wspolczynnik; y++) {
        for (let x = 0; x < wspolczynnik; x++) {
            var klocek = {
                id: id,
                img_posx: (360 / wspolczynnik) * x * -1 + "px",
                img_posy: (360 / wspolczynnik) * y * -1 + "px",
                move: false,
                x: x,
                y: y,
            };
            klocki.push(klocek);
            id++;
        }
    }
    for (let x = 0; x < klocki.length; x++) {
        if (x < klocki.length - 1) {
            let puzzle = document.createElement("div");
            puzzle.setAttribute("id", klocki[x].id);
            puzzle.style.width = 360 / wspolczynnik + "px";
            puzzle.style.height = 360 / wspolczynnik + "px";
            puzzle.style.backgroundPositionX = klocki[x].img_posx;
            puzzle.style.backgroundPositionY = klocki[x].img_posy;
            puzzle.style.backgroundImage = grafika;
            puzzle.style.backgroundColor = "";
            //puzzle.innerHTML = '<p style="color:red">' + x + '</p>'
            box.appendChild(puzzle);
        } else {
            let puzzle = document.createElement("div");
            puzzle.setAttribute("id", klocki[x].id);
            puzzle.style.width = 360 / wspolczynnik + "px";
            puzzle.style.height = 360 / wspolczynnik + "px";
            puzzle.style.backgroundPositionX = klocki[x].img_posx;
            puzzle.style.backgroundPositionY = klocki[x].img_posy;
            puzzle.style.backgroundImage = "none";
            puzzle.style.backgroundColor = "black";
            //++puzzle.innerHTML = '<p style="color:red">' + x + '</p>'
            box.appendChild(puzzle);
        }
    }
}
function trzy() {
    wspolczynnik = 3;
    n = wspolczynnik * wspolczynnik * 10;
    clear();
    fill();
    ifMoveable();
    losuj(n);
    console.log(klocki);
    mode = "3x3";
}
function cztery() {
    wspolczynnik = 4;
    n = wspolczynnik * wspolczynnik * 10;
    clear();
    fill();
    ifMoveable();
    losuj(n);
    console.log(klocki);
    mode = "4x4";
}
function piec() {
    wspolczynnik = 5;
    n = wspolczynnik * wspolczynnik * 10;
    clear();
    fill();
    ifMoveable();
    losuj(n);
    console.log(klocki);
    mode = "5x5";
}
function szesc() {
    wspolczynnik = 6;
    n = wspolczynnik * wspolczynnik * 10;
    clear();
    fill();
    ifMoveable();
    losuj(n);
    console.log(klocki);
    mode = "6x6";
}
function ifMoveable() {
    console.log("ifmoveable");
    for (let x = 0; x < klocki.length; x++) {
        let kolor = document.getElementById(klocki[x].id);
        if (kolor.style.backgroundColor == "black") {
            // console.log(kolor)
            // console.log(klocki[x])
            for (let y = 0; y < klocki.length; y++) {
                if (klocki[y].x == klocki[x].x && klocki[y].y == klocki[x].y) {
                    klocki[y].move = false;
                } else if (
                    klocki[y].x == klocki[x].x - 1 &&
                    klocki[y].y == klocki[x].y
                ) {
                    klocki[y].move = true;
                } else if (
                    klocki[y].x == klocki[x].x + 1 &&
                    klocki[y].y == klocki[x].y
                ) {
                    klocki[y].move = true;
                } else if (
                    klocki[y].x == klocki[x].x &&
                    klocki[y].y == klocki[x].y - 1
                ) {
                    klocki[y].move = true;
                } else if (
                    klocki[y].x == klocki[x].x &&
                    klocki[y].y == klocki[x].y + 1
                ) {
                    klocki[y].move = true;
                }
            }
        }
    }
    for (let x = 0; x < klocki.length; x++) {
        let puzzle = document.getElementById(x);
        puzzle.setAttribute(
            "onclick",
            "klikanie(" + klocki[x].move + "," + klocki[x].id + ")"
        );
    }
    console.log(klocki);
}
function klikanie(czy, id) {
    console.log("klikanie");
    if (czy) {
        var czyWin = false;
        for (let i = 0; i < klocki.length; i++) {
            klocki[i].move = false;
        }
        let clicked = document.getElementById(id);
        let empty = findBlack();

        console.log(clicked.style.backgroundColor);
        clicked.style.backgroundColor = "black";
        empty.style.backgroundColor = "";
        // console.log(empty.style.backgroundColor)

        clicked.style.backgroundImage = "none";
        empty.style.backgroundImage = grafika;

        x = clicked.style.backgroundPositionX;
        y = empty.style.backgroundPositionX;

        clicked.style.backgroundPositionX = y;
        empty.style.backgroundPositionX = x;

        x = clicked.style.backgroundPositionY;
        y = empty.style.backgroundPositionY;

        clicked.style.backgroundPositionY = y;
        empty.style.backgroundPositionY = x;

        ifMoveable();
        for (let x = 0; x < klocki.length; x++) {
            if (
                klocki[x].img_posx !=
                    document.getElementById(x).style.backgroundPositionX ||
                klocki[x].img_posy !=
                    document.getElementById(x).style.backgroundPositionY
            ) {
                czyWin = false;
                break;
            } else {
                czyWin = true;
            }
        }
        if (czyWin) {
            clearInterval(chronomierz);
            alert("brawo, wygrałeś \n twoj czas to: " + wynik);
            nick = prompt("podaj swoj nick");
            clearInterval(chronomierz);
            addTime(nick, final_czas, mode);
            displayTimes();
        }
    }
}
function klikanie_comp(czy, id) {
    console.log("klikanie");
    if (czy) {
        for (let i = 0; i < klocki.length; i++) {
            klocki[i].move = false;
        }
        let clicked = document.getElementById(id);
        let empty = findBlack();

        console.log(clicked.style.backgroundColor);
        clicked.style.backgroundColor = "black";
        empty.style.backgroundColor = "";
        // console.log(empty.style.backgroundColor)

        clicked.style.backgroundImage = "none";
        empty.style.backgroundImage = grafika;

        x = clicked.style.backgroundPositionX;
        y = empty.style.backgroundPositionX;

        clicked.style.backgroundPositionX = y;
        empty.style.backgroundPositionX = x;

        x = clicked.style.backgroundPositionY;
        y = empty.style.backgroundPositionY;

        clicked.style.backgroundPositionY = y;
        empty.style.backgroundPositionY = x;

        ifMoveable();
    }
}
function findBlack() {
    for (let x = 0; x < klocki.length; x++) {
        let kolor = document.getElementById(klocki[x].id);
        if (kolor.style.backgroundColor == "black") {
            return kolor;
        }
    }
}
function losuj(n) {
    if (n > 0) {
        let tab1 = [];
        let tab2 = [];
        for (let x = 0; x < klocki.length; x++) {
            if (klocki[x].move == true) {
                tab2.push(klocki[x].move);
                tab2.push(klocki[x].id);
                tab1.push(tab2);
            }
            tab2 = [];
        }
        let wylosowana = Math.floor(Math.random() * tab1.length);
        klikanie_comp(tab1[wylosowana][0], tab1[wylosowana][1]);

        setTimeout(function () {
            losuj(0);
        }, 50);
    } else {
        // zakończ losowanie
        alert("wylosowano, milej rozgrywki 8)");
        d = new Date();
        czas = d.getTime();

        chronomierz = setInterval(() => {
            time();
        }, 0);
        document.getElementById("3x3").setAttribute("onclick", "trzy()");
        document.getElementById("4x4").setAttribute("onclick", "cztery()");
        document.getElementById("5x5").setAttribute("onclick", "piec()");
        document.getElementById("6x6").setAttribute("onclick", "szesc()");
    }
}
function time() {
    d = new Date();
    let milisekundy = d.getTime() - czas;
    final_czas = milisekundy;
    let sekundy = Math.floor(milisekundy / 1000);
    let minuty = Math.floor(sekundy / 60);
    let godziny = Math.floor(minuty / 60);

    sekundy = sekundy % 60;
    minuty = minuty % 60;
    milisekundy = milisekundy.toString();
    sekundy = sekundy.toString();
    minuty = minuty.toString();
    godziny = godziny.toString();

    if (godziny.length < 2) {
        godziny = "0" + godziny;
    }
    if (minuty.length < 2) {
        minuty = "0" + minuty;
    }
    if (sekundy.length < 2) {
        sekundy = "0" + sekundy;
    }
    if (milisekundy.length < 2) {
        milisekundy = "0" + milisekundy;
    }
    if (milisekundy.length < 3) {
        milisekundy = "0" + milisekundy;
    }

    godziny = godziny.substring(godziny.length - 2, godziny.length);
    minuty = minuty.substring(minuty.length - 2, minuty.length);
    sekundy = sekundy.substring(sekundy.length - 2, sekundy.length);
    milisekundy = milisekundy.substring(
        milisekundy.length - 3,
        milisekundy.length
    );

    wynik = godziny + ":" + minuty + ":" + sekundy + "." + milisekundy;
    console.log(wynik);

    let tab1 = [
        document.getElementById("h1"),
        document.getElementById("h2"),
        document.getElementById("m1"),
        document.getElementById("m2"),
        document.getElementById("s1"),
        document.getElementById("s2"),
        document.getElementById("ms1"),
        document.getElementById("ms2"),
        document.getElementById("ms3"),
    ];
    let tab2 = [
        godziny[0],
        godziny[1],
        minuty[0],
        minuty[1],
        sekundy[0],
        sekundy[1],
        milisekundy[0],
        milisekundy[1],
        milisekundy[2],
    ];
    for (let i = 0; i < tab2.length; i++) {
        tab1[i].setAttribute("src", "./cyferki/c" + tab2[i] + ".gif");
    }
}
function getTopTimes() {
    if (!localStorage["times"]) {
        localStorage.setItem("times", JSON.stringify({ arr: [] }));
        let tmp = localStorage.getItem("times");
        return JSON.parse(tmp);
    }
    tmp = localStorage.getItem("times");

    return JSON.parse(tmp);
}
function displayTimes() {
    const all_lists = document.querySelectorAll(".time-list");
    for (let list of all_lists) {
        list.innerHTML = "";
    }
    let times = getTopTimes();
    for (let time of times.arr) {
        let item = document.createElement("li");
        item.innerHTML = `${time.nick}-${msToTime(time.time)}`;
        const time_list = document.getElementById(time.mode + "b");
        time_list.appendChild(item);
    }
    console.log(times);
}
function addTime(nick, time, mode) {
    let times = getTopTimes();
    if (times.arr.length === 0) {
        times.arr.push({ nick: nick, time: time, mode: mode });
        console.log(times);
        localStorage.setItem("times", JSON.stringify(times));
        return;
    }
    for (let i = 0; i < times.arr.length; i++) {
        if (time < times.arr[i].time) {
            times.arr.splice(i, 0, { nick: nick, time: time, mode: mode });
            localStorage.setItem("times", JSON.stringify(times));
            return;
        }
    }
    times.arr.push({ nick: nick, time: time, mode: mode });
    localStorage.setItem("times", JSON.stringify(times));
    return;
}
function msToTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    ms = ms.toString();
    secs = secs.toString();
    mins = mins.toString();
    hrs = hrs.toString();

    if (hrs.length < 2) {
        hrs = "0" + hrs;
    }
    if (mins.length < 2) {
        mins = "0" + mins;
    }
    if (secs.length < 2) {
        secs = "0" + secs;
    }
    if (ms.length < 3) {
        ms = "0" + ms;
    }

    return hrs + ":" + mins + ":" + secs + "." + ms;
}
