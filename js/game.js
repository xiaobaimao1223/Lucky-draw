var spin = true;
var deg = 0;
var wheel = document.querySelector(".box");
var element = document.getElementById("mainbox");
var music = document.getElementById("bgm");
var loseMusic = document.getElementById("lose");
var sucessMusic = document.getElementById("success");
var canvas = document.getElementById("canvas");
var awardList = [
    "SAVE $0",
    "SAVE $2",
    "SAVE $0",
    "SAVE $4",
    "SAVE $0",
    "SAVE $7",
    "SAVE $0",
    "SAVE $5",
];
var coupon = canvas.getContext("2d");
var c = 0;
var password1 = "1234";
var password2 = "demo";

var price1 = document.getElementById("price1");
var price2 = document.getElementById("price2");
var price3 = document.getElementById("price3");
var price4 = document.getElementById("price4");
var price5 = document.getElementById("price5");
var price6 = document.getElementById("price6");
var price7 = document.getElementById("price7");
var price8 = document.getElementById("price8");

price1.value = awardList[0];
price2.value = awardList[1];
price3.value = awardList[2];
price4.value = awardList[3];
price5.value = awardList[4];
price6.value = awardList[5];
price7.value = awardList[6];
price8.value = awardList[7];

document.getElementById("shadow").addEventListener(
    "touchstart",
    function() {
        music.load();
        loseMusic.load();
        sucessMusic.load();
    },
    false
);
updatePrice();

//The winning effect when user wins the price
function startFire() {
    var end = Date.now() + 15 * 200;

    var colors = ["#ffd700", "#ff0000"];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// 中奖弹窗
function succPop(x) {
    if (c == 0) {
        document.getElementById("succPopBox").style.display = "block";
        document.getElementById("succBox").style.display = "block";
        document.getElementById("result").innerHTML = x;
        c = 1;
    } else {
        document.getElementById("succPopBox").style.display = "none";
        document.getElementById("succBox").style.display = "none";

        c = 0;
    }
}

// close按钮隐藏窗口
function popClose() {
    if (c == 1) {
        document.getElementById("succPopBox").style.display = "none";
        document.getElementById("succBox").style.display = "none";
        c = 0;
    }
}

// // 未中奖弹窗
function losePop() {
    if (c == 0) {
        document.getElementById("failPop").style.display = "block";
        document.getElementById("loseBox").style.display = "block";
        c = 1;
    } else {
        document.getElementById("failPop").style.display = "none";
        document.getElementById("loseBox").style.display = "none";
        c = 0;
    }
}

// close按钮隐藏窗口
function losePopClose() {
    if (c == 1) {
        document.getElementById("failPop").style.display = "none";
        document.getElementById("loseBox").style.display = "none";
        c = 0;
    }
}

//Spin the wheel
function myfunction() {
    if (spin) {
        spin = false;
        music.play();
        deg = Math.floor(3000 + Math.random() * 3000);
        wheel.style.transition = "all 10s ease-out";
        wheel.style.transform = "rotate(" + deg + "deg)";

        wheel.addEventListener(
            "transitionend",
            () => {
                wheel.style.transition = "none";
                var actualDeg = deg % 360;
                wheel.style.transform = `rotate(${actualDeg}deg)`;
                music.pause();
                if (actualDeg >= 0 && actualDeg < 22.5) {
                    loseMusic.play();
                    losePop();
                } else if (actualDeg > 22.5 && actualDeg < 67.5) {
                    sucessMusic.play();
                    startFire();
                    succPop(price6.value);
                } else if (actualDeg > 67.5 && actualDeg < 112.5) {
                    loseMusic.play();
                    losePop();
                } else if (actualDeg > 112.5 && actualDeg < 157.5) {
                    sucessMusic.play();
                    startFire();
                    succPop(price8.value);
                } else if (actualDeg > 157.5 && actualDeg < 202.5) {
                    loseMusic.play();
                    losePop();
                } else if (actualDeg > 202.5 && actualDeg < 247.5) {
                    sucessMusic.play();
                    startFire();
                    succPop(price4.value);
                } else if (actualDeg > 247.5 && actualDeg < 292.5) {
                    loseMusic.play();
                    losePop();
                } else if (actualDeg > 292.5 && actualDeg < 337.5) {
                    sucessMusic.play();
                    startFire();
                    succPop(price2.value);
                    // draw(awardList[6]);
                } else if (actualDeg > 337.5 && actualDeg < 360) {
                    loseMusic.play();
                    losePop();
                } else {
                    loseMusic.play();
                    losePop();
                    // draw("try again");
                }
                spin = true;
            }, { once: true }
        );
    }
}

//Update the price in the wheel
function updatePrice() {
    document.getElementById("span1_one").innerHTML = price7.value;
    document.getElementById("span1_two").innerHTML = price3.value;
    document.getElementById("span1_three").innerHTML = price5.value;
    document.getElementById("span1_four").innerHTML = price1.value;

    document.getElementById("span2_one").innerHTML = price4.value;
    document.getElementById("span2_two").innerHTML = price6.value;
    document.getElementById("span2_three").innerHTML = price2.value;
    document.getElementById("span2_four").innerHTML = price8.value;
}

//Open the sidebar with user clicks the hamburger icon
function showSiderbar() {
    var userPassword = document.getElementById("userPassword").value;
    if (userPassword == password1 || userPassword == password2) {
        popupClose();
        document.getElementById("userPassword").value = "";
        document.getElementById("controlBox").style.left = "0px";
        document.getElementById("controlBox").style.transition = "0.2s linear";
        document.getElementById("mainbox").style.marginLeft = "200px";
    } else {
        alert("The Password is wrong! You can't change the price.");
    }
}

//Close the sidebar when user click "x"
function closeSiderbar() {
    document.getElementById("controlBox").style.left = "-300px";
    document.getElementById("toggle-btn1").style.left = "100px";
    document.getElementById("toggle-btn1").style.transition = "0.2s linear";
    document.getElementById("controlBox").style.transition = "0.2s linear";
    document.getElementById("mainbox").style.marginLeft = "0px";
}

//Show the pop up input to let user enter the password
function popupPass() {
    var popup = document.getElementById("myPopup");
    popup.style.display = "block";
}

//Hide the pop up input
function popupClose() {
    document.getElementById("myPopup").style.display = "none";
}