define(["./main"], function (main) {
    return function Brick1(leftX, topY, width, height) {				//	Class for brick1
        var that = this;
        this.leftX = Math.round(leftX);
        this.topY = Math.round(topY);
        this.rightX = Math.round(leftX + width);
        this.bottomY = Math.round(topY + height);
        this.centrX = Math.round(this.leftX + width / 2);
        this.centrY = Math.round(this.topY + height / 2);
        this.halfDiag = Math.round(Math.sqrt(width * width + height * height) / 2);
        this.deltaW = Math.round(width * 0.1);     //  Brick border size
        this.deltaH = Math.round(height * 0.1);
        this.color1 = "#888";
        this.color2 = "#666";
        this.color3 = "#444";
        this.color4 = "#222";
        this.color5 = "#000";
        this.start;
        this.duration = 1000;    //  ms
        this.hited = false;
        this.id = 0;

        this.render = function () {
            //  1
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(that.leftX, that.topY);
            ctx.lineTo(that.rightX, that.topY);
            ctx.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            ctx.lineTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            ctx.closePath();
            ctx.fillStyle = that.color1;
            ctx.fill();
            //  2
            ctx.beginPath();
            ctx.moveTo(that.leftX, that.topY);
            ctx.lineTo(that.leftX, that.bottomY);
            ctx.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            ctx.closePath();
            ctx.fillStyle = that.color2;
            ctx.fill();
            //  3
            if (that.hited === true) {
                renderHit();
            } else {
                ctx.beginPath();
                ctx.moveTo(that.leftX + that.deltaW, that.topY + that.deltaH);
                ctx.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
                ctx.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
                ctx.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
                ctx.closePath();
                ctx.fillStyle = that.color3;
                ctx.fill();
            }
            //  4
            ctx.beginPath();
            ctx.moveTo(that.rightX, that.topY);
            ctx.lineTo(that.rightX, that.bottomY);
            ctx.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            ctx.closePath();
            ctx.fillStyle = that.color4;
            ctx.fill();
            //  5
            ctx.beginPath();
            ctx.moveTo(that.leftX, that.bottomY);
            ctx.lineTo(that.rightX, that.bottomY);
            ctx.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            ctx.closePath();
            ctx.fillStyle = that.color5;
            ctx.fill();
        }
        this.destroy = function () {
            ctx.clearRect(that.leftX, that.topY, that.rightX, that.bottomY);
            delete (that.render);
            delete (that.hit);
        }
        this.hit = function () {
            sound2.play();
            that.start = Date.now();
            that.hited = true;
            if (that.hited && that.id) clearInterval(that.id);
            that.id = setTimeout(function () {
                that.hited = false;
            }, 1000);
        }
        return this
        function renderHit() {
            var time = Date.now();
            var pr = (time - that.start) / that.duration;
            var move = pr * 1.6 - 0.8;
            ctx.beginPath();
            ctx.moveTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            ctx.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            ctx.closePath();
            var gradient = ctx.createLinearGradient(that.leftX + that.deltaW, that.topY + that.deltaH, that.rightX - that.deltaW, that.bottomY - that.deltaH);
            gradient.addColorStop((move + 0.1 < 0) ? 0 : (move + 0.1) > 1 ? 1 : (move + 0.1), that.color3);
            gradient.addColorStop((move + 0.35 < 0) ? 0 : (move + 0.35) > 1 ? 1 : (move + 0.35), '#222');
            gradient.addColorStop((move + 0.5 < 0) ? 0 : (move + 0.5) > 1 ? 1 : (move + 0.5), '#fff');
            gradient.addColorStop((move + 0.65 < 0) ? 0 : (move + 0.65) > 1 ? 1 : (move + 0.65), '#222');
            gradient.addColorStop((move + 0.9 < 0) ? 0 : (move + 0.9) > 1 ? 1 : (move + 0.9), that.color3);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

})
