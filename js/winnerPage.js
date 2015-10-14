define(["./main"], function(main){
    return function() {
        //  Sign "Arkanoid requires fullscreen mode"
        ctx.clearRect(0, 0, $can.width, $can.height);
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#a00";
        ctx.font = viewWidth * 0.06 + 'px font';
        ctx.shadowColor = "#a00";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 15;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText("congratulation!", viewWidth / 2, viewHeight * 0.2);
        ctx.fillText("your score: " + score, viewWidth / 2, viewHeight * 0.3);
        ctx.strokeText("congratulation!", viewWidth / 2, viewHeight * 0.2);
        ctx.strokeText("your score: " + score, viewWidth / 2, viewHeight * 0.3);
        //  Button-ball for start
        var circle1 = {
            coordX: viewWidth / 3,
            coordY: viewHeight * 0.65,
            radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
            darkColor: "#330",
            lightColor: "#ff7"
        }
        ctx.save();
        ctx.beginPath();
        var gradient = ctx.createRadialGradient(circle1.coordX, circle1.coordY, circle1.radius, circle1.coordX - 0.3 * circle1.radius, circle1.coordY - 0.3 * circle1.radius, 0);
        gradient.addColorStop(0, circle1.darkColor);
        gradient.addColorStop(1, circle1.lightColor);
        ctx.fillStyle = gradient;
        ctx.arc(circle1.coordX, circle1.coordY, circle1.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.shadowOffsetX = -25;
        ctx.shadowBlur = 100;
        ctx.fill();
        ctx.restore();
        //  Text on the button 
        ctx.fillStyle = "#000";
        ctx.font = circle1.radius * 0.25 + 'px font';
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.textAlign = "center";
        ctx.textBaseline = 'bottom';
        ctx.fillText("play", circle1.coordX, circle1.coordY);
        ctx.textBaseline = 'top';
        ctx.fillText("again", circle1.coordX, circle1.coordY);

        //  Button-ball for exit
        var circle2 = {
            coordX: 2 * viewWidth / 3,
            coordY: viewHeight * 0.65,
            radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
            darkColor: "#000",
            lightColor: "#555"
        }
        ctx.save();
        ctx.beginPath();
        var gradient = ctx.createRadialGradient(circle2.coordX, circle2.coordY, circle2.radius, circle2.coordX - 0.3 * circle2.radius, circle2.coordY - 0.3 * circle2.radius, 0);
        gradient.addColorStop(0, circle2.darkColor);
        gradient.addColorStop(1, circle2.lightColor);
        ctx.fillStyle = gradient;
        ctx.arc(circle2.coordX, circle2.coordY, circle2.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.shadowColor = "#a00";
        ctx.shadowOffsetY = 15;
        ctx.shadowOffsetX = -25;
        ctx.shadowBlur = 15;
        ctx.shadowBlur = 100;
        ctx.fill();
        ctx.restore();
        //  Text on the button 
        ctx.fillStyle = "#a00";
        ctx.font = circle2.radius * 0.25 + 'px font';
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText("exit", circle2.coordX, circle2.coordY);

        //  License
        ctx.font = viewWidth * 0.015 + 'px Arial';
        ctx.fillStyle = "#000";
        ctx.fillText("\u00A9" + " Viacheslav Potravnyi. Using is allowed under MIT License.", viewWidth / 2, viewHeight * 0.95);

        //  Mouse catch area position above buttonPlay
        $div.style.display = "block";
        $div.style.left = circle1.coordX - circle1.radius + "px";
        $div.style.top = circle1.coordY - circle1.radius + "px";
        $div.style.height = 2 * circle1.radius + "px";
        $div.style.width = 2 * circle1.radius + "px";
        $div.style["border-radius"] = circle1.radius + "px";
        //  Mouse catch area position above buttonExit
        var $div2 = $div.cloneNode(true);
        $div2.style.left = circle2.coordX - circle2.radius + "px";
        $div2.style.top = circle2.coordY - circle2.radius + "px";
        $div2.style.height = 2 * circle2.radius + "px";
        $div2.style.width = 2 * circle2.radius + "px";
        $div2.style["border-radius"] = circle2.radius + "px";
        $body.appendChild($div2);
        //  Button behavior processing (from this position to the end of synchronous part of programm)
        var isPointerInCircle1 = false;
        var isPointerInCircle2 = false;
        //  Events listeners
        $div.addEventListener("mousemove", findMouseCoords);
        $div.addEventListener("click", buttonClickProcessing);
        $div2.addEventListener("mousemove", findMouseCoords);
        $div2.addEventListener("click", button2ClickProcessing);

        var timerID = setInterval(changeMousePointer, 100);
        //  End of synchronous part of module


        //  Functions
        function findMouseCoords(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            isPointerInCircle1 = ((mouseX - circle1.coordX) * (mouseX - circle1.coordX) + (mouseY - circle1.coordY) * (mouseY - circle1.coordY) < circle1.radius * circle1.radius) ? true : false;
            isPointerInCircle2 = ((mouseX - circle2.coordX) * (mouseX - circle2.coordX) + (mouseY - circle2.coordY) * (mouseY - circle2.coordY) < circle2.radius * circle2.radius) ? true : false;
        }
        function changeMousePointer() {
            if (isPointerInCircle1) {
                $div.style.cursor = "pointer";
            } else {
                $div.style.cursor = "default";
            }
            if (isPointerInCircle2) {
                $div2.style.cursor = "pointer";
            } else {
                $div2.style.cursor = "default";
            }
        }
        function buttonClickProcessing() {
            if (isPointerInCircle1) {
                location.reload();
            }
        }
        function button2ClickProcessing() {
            if (isPointerInCircle2) {
                window.close();
            }
        }
    }
})
