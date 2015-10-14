define(["./main"], function(main){
    return function() {
        //  Sign "Arkanoid"
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#a00";
        ctx.font = viewWidth * 0.12 + 'px font';
        ctx.shadowColor = "#a00";
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = 15;
        ctx.shadowBlur = 15;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText("arkanoid", viewWidth / 2, viewHeight * 0.25);
        ctx.strokeText("arkanoid", viewWidth / 2, viewHeight * 0.25);
        //  Button-ball
        var circle = {
            coordX: viewWidth * 2 / 3,
            coordY: viewHeight * 0.65,
            radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
            darkColor: "#330",
            lightColor: "#ff7"
        }
        ctx.save();
        ctx.beginPath();
        var gradient = ctx.createRadialGradient(circle.coordX, circle.coordY, circle.radius, circle.coordX - 0.3 * circle.radius, circle.coordY - 0.3 * circle.radius, 0);
        gradient.addColorStop(0, circle.darkColor);
        gradient.addColorStop(1, circle.lightColor);
        ctx.fillStyle = gradient;
        ctx.arc(circle.coordX, circle.coordY, circle.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.shadowOffsetX = -25;
        ctx.shadowBlur = 100;
        ctx.fill();
        ctx.restore();
        //  Text on the button 
        ctx.fillStyle = "#000";
        ctx.font = circle.radius * 0.25 + 'px font';
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText("Play NOW!", circle.coordX, circle.coordY);
        //  License
        ctx.font = viewWidth * 0.015 + 'px Arial';
        ctx.fillText("\u00A9" + " Viacheslav Potravnyi. Using is allowed under MIT License.", viewWidth / 2, viewHeight * 0.95);
        //  Mouse catch area position above button
        $div.innerHTML = "";
        $div.style.left = circle.coordX - circle.radius + "px";
        $div.style.top = circle.coordY - circle.radius + "px";
        $div.style.height = 2 * circle.radius + "px";
        $div.style.width = 2 * circle.radius + "px";
        $div.style["border-radius"] = circle.radius + "px";
        var isPointerInCircle = false;

        //  Sign
        var circle2 = {
            coordX: viewWidth / 3,
            coordY: viewHeight * 0.65,
            radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
            darkColor: "#030",
            lightColor: "#7f7"
        }
        ctx.beginPath();
        var gradient = ctx.createRadialGradient(circle2.coordX, circle2.coordY, circle2.radius, circle2.coordX - 0.3 * circle2.radius, circle2.coordY - 0.3 * circle2.radius, 0);
        gradient.addColorStop(0, circle2.darkColor);
        gradient.addColorStop(1, circle2.lightColor);
        ctx.fillStyle = gradient;
        ctx.arc(circle2.coordX, circle2.coordY, circle2.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.shadowOffsetX = -25;
        ctx.shadowBlur = 100;
        ctx.fill();
        ctx.restore();
        //  Text on the sign 
        ctx.fillStyle = "#000";
        ctx.font = circle2.radius * 0.25 + 'px font';
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.textAlign = "center";
        ctx.textBaseline = 'bottom';
        ctx.fillText("mouse", circle2.coordX, circle2.coordY);
        ctx.textBaseline = 'top';
        ctx.fillText("only", circle2.coordX, circle2.coordY);


        //  End of synchronous part of module


        //  Events listeners
        $div.addEventListener("mousemove", findMouseCoords);
        $div.addEventListener("click", buttonClickProcessing);

        //  Functions
        function findMouseCoords(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            isPointerInCircle = ((mouseX - circle.coordX) * (mouseX - circle.coordX) + (mouseY - circle.coordY) * (mouseY - circle.coordY) < circle.radius * circle.radius) ? true : false;
            if (isPointerInCircle) {
                $div.style.cursor = "pointer";
            } else {
                $div.style.cursor = "default";
            }
        }
        function buttonClickProcessing() {
            if (isPointerInCircle) {
                $div.removeEventListener("mousemove", findMouseCoords);
                $div.removeEventListener("click", buttonClickProcessing);
                $div.style.display = "none";
                ctx.clearRect(0, 0, $can.width, $can.height);

                //  Uncomment following for fullscreen only
                //if ($can.requestFullscreen) {
                //    $can.requestFullscreen();
                //} else if ($can.mozRequestFullScreen) {
                //    $can.mozRequestFullScreen();
                //} else if ($can.webkitRequestFullscreen) {
                //    $can.webkitRequestFullscreen();
                //}
                //viewWidth = window.screen.width;
                //viewHeight = window.screen.height;
                //resizeCanvas();

                scoreSectionWidth = Math.round(viewWidth / 5);                          //  without borders
                borderLineWidth = Math.round(viewWidth / 50);
                inboxViewWidth = viewWidth - scoreSectionWidth - 2 * borderLineWidth;   //  between left and right borders without them
                inboxViewHeight = viewHeight - borderLineWidth;                         //  between upper border without it

                window.postMessage("loadController", "*");
            }
        }
    }
})
