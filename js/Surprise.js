define([], function () {
    return function Surprise(x, y, width, height) {
        var that = this;
        var values = ["slow", "fast", "big", "small", "power", "life"];
        var speed = viewHeight / 5;    //  px/sec
        this.value = values[Math.floor(6 * Math.random())];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.updatePosition = function (time, startTime) {
            if (that.y <= viewHeight + 100) {
                that.y += speed * (time - startTime) / 1000;
            }
        }
        this.render = function () {
            var gradient = ctx.createLinearGradient(borderLineWidth, borderLineWidth, borderLineWidth, viewHeight);
            gradient.addColorStop(0, "#f00");
            gradient.addColorStop(1 / 30, "#ff0");
            gradient.addColorStop(2 / 30, "#0f0");
            gradient.addColorStop(3 / 30, "#0ff");
            gradient.addColorStop(4 / 30, "#00f");
            gradient.addColorStop(5 / 30, "#f0f");
            gradient.addColorStop(6 / 30, "#f00");
            gradient.addColorStop(7 / 30, "#ff0");
            gradient.addColorStop(8 / 30, "#0f0");
            gradient.addColorStop(9 / 30, "#0ff");
            gradient.addColorStop(10 / 30, "#00f");
            gradient.addColorStop(11 / 30, "#f0f");
            gradient.addColorStop(12 / 30, "#f00");
            gradient.addColorStop(13 / 30, "#ff0");
            gradient.addColorStop(14 / 30, "#0f0");
            gradient.addColorStop(15 / 30, "#0ff");
            gradient.addColorStop(16 / 30, "#00f");
            gradient.addColorStop(17 / 30, "#f0f");
            gradient.addColorStop(18 / 30, "#f00");
            gradient.addColorStop(19 / 30, "#ff0");
            gradient.addColorStop(20 / 30, "#0f0");
            gradient.addColorStop(21 / 30, "#0ff");
            gradient.addColorStop(22 / 30, "#00f");
            gradient.addColorStop(23 / 30, "#f0f");
            gradient.addColorStop(24 / 30, "#f00");
            gradient.addColorStop(25 / 30, "#ff0");
            gradient.addColorStop(26 / 30, "#0f0");
            gradient.addColorStop(27 / 30, "#0ff");
            gradient.addColorStop(28 / 30, "#00f");
            gradient.addColorStop(29 / 30, "#f0f");
            gradient.addColorStop(1, "#f00");
            ctx.font = viewWidth * 0.05 + 'px font';
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = gradient;
            ctx.strokeText(that.value, that.x, that.y, that.width);
        }
    }
})
