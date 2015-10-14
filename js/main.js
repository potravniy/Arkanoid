requirejs.config({
    baseUrl: 'js',
    paths: {
        main: ''
    }
});

var $body = document.querySelector("body");
var $div = document.querySelector("#play");
var $can = document.querySelector("#canvas");
var viewWidth = $body.clientWidth;
var viewHeight = $body.clientHeight;
resizeCanvas();
var ctx = $can.getContext("2d");
var scoreSectionWidth;                          //  without borders
var borderLineWidth;
var inboxViewWidth;                             //  between left and right borders without them
var inboxViewHeight;                            //  between upper border without it

//	Audio
var sound1 = new Audio("./sound/sound1.wav");
sound1.volume = 0.05;
var sound2 = new Audio("./sound/sound2.wav");
sound2.volume = 0.05;
var lostSliderSound = new Audio("./sound/lostSlider.wav");
lostSliderSound.volume = 0.1;
var catchSound = new Audio("./sound/catch.wav");
catchSound.volume = 0.2;

//  Values for indication
var level = 0;
var lifes = 3;
var score = 0;

//  Let's begin
requirejs(["welcomePage"], function (welcomePage) {
    welcomePage();
});

//  Event Listeners
window.addEventListener("message", handleMessage, true);

//  Functions
function handleMessage(event) {
    if (event.source == window && event.data == "loadController") {
        event.stopPropagation();
        requirejs(["controller"], function (controller) {
            controller();
        });
    } else if (event.source == window && event.data == "loadGameOver") {
        event.stopPropagation();
        console.log("loadGameOver")
        requirejs(["gameOverPage"], function (gameOverPage) {
            gameOverPage();
        });
    } else if (event.source == window && event.data == "loadWinnerPage") {
        event.stopPropagation();
        requirejs(["winnerPage"], function (winnerPage) {
            winnerPage();
        });
    }
}
function resizeCanvas() {
    $can.style.width = viewWidth + "px";
    $can.style.height = viewHeight + "px";
    $can.setAttribute("width", viewWidth);
    $can.setAttribute("height", viewHeight);
}
