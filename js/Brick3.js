define(["./main"], function (main) {
    return function Brick1(leftX, topY, width, height) {				//	Class for brick1
        var that = this;
        this.hitsForDestroy = 2;
        this.sign = "s";
        this.leftX = Math.round(leftX);
        this.topY = Math.round(topY);
        this.rightX = Math.round(leftX + width);
        this.bottomY = Math.round(topY + height);
        this.centrX = Math.round(this.leftX + width / 2);
        this.centrY = Math.round(this.topY + height / 2);
        this.halfDiag = Math.round(Math.sqrt(width * width + height * height) / 2);
        this.deltaW = Math.round(width * 0.1);     //  Brick border size
        this.deltaH = Math.round(height * 0.1);
        this.color1 = "#f44";
        this.color2 = "#d33";
        this.color3 = "#b22";
        this.color4 = "#911";
        this.color5 = "#700";
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
            ctx.beginPath();
            ctx.moveTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            ctx.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            ctx.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            ctx.closePath();
            ctx.fillStyle = that.color3;
            ctx.fill();
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
            //  Print sign on the brick
            ctx.fillStyle = "black";
            ctx.font = viewWidth * 0.03 + 'px font';
            ctx.textBaseline = 'middle';
            ctx.fillText(that.sign, that.centrX, that.centrY);
        }
        this.destroy = function () {
            ctx.clearRect(that.leftX, that.topY, that.rightX, that.bottomY);
            delete (that.render);
            delete (that.hit);
        }
        this.hit = function () {
            sound1.play();
            that.hitsForDestroy--;
            if (that.hitsForDestroy === 1) {
                that.color1 = "#8e8";        //  Green
                that.color2 = "#6c6";
                that.color3 = "#4a4";
                that.color4 = "#282";
                that.color5 = "#060";
                that.sign = "";
            }
            if (that.hitsForDestroy === 0) {
                return "destroyed";
            }
        }
        return this
    }

})
