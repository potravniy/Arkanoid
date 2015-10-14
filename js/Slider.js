define(["./main"], function (main) {
    return function Slider() {				//	Class for slider
        var that = this;
        this.height = Math.round(viewHeight * 0.03);
        this.width = Math.round(viewWidth * 0.15);
        this.x = Math.round(inboxViewWidth / 2 + borderLineWidth);  // Absolute x position of slider's center
        this.leftX = Math.round(this.x - this.width / 2);           // Absolute x position of slider's left end
        this.rightX = Math.round(this.leftX + this.width);          // Absolute x position of slider's right end
        this.y = Math.round(viewHeight - this.height / 4);          // Absolute y position of slider's bottom line
        this.topCoord = this.y - this.height;                       // Absolute y position of slider's top line
        this.leftStraightX = this.leftX + this.height;              // Absolute x position of slider's flat part left end
        this.rightStraightX = this.rightX - this.height;            // Absolute x position of slider's flat part right end
        var darkColor = "#000";
        var lightColor = "#7ff";
        var lastRenderedPosition = {
            xStart: this.leftX,
            xEnd: this.rightX
        }
        this.render = function () {
            ctx.clearRect(lastRenderedPosition.xStart, that.y - that.height, lastRenderedPosition.width, that.height);
            //  Left round part (1/4 of circle)
            ctx.beginPath();
            ctx.arc(that.leftX + that.height, that.y, that.height, Math.PI, 1.5 * Math.PI);
            ctx.lineTo(that.leftX + that.height, that.y);
            ctx.closePath();
            var gradient = ctx.createRadialGradient(that.leftX + that.height, that.y, that.height, that.leftX + that.height, that.y, 0);
            gradient.addColorStop(0, darkColor);
            gradient.addColorStop(1, lightColor);
            ctx.fillStyle = gradient;
            ctx.fill();
            //  Horisontal part
            ctx.beginPath();
            ctx.moveTo(that.leftX + that.height, that.y)
            ctx.lineTo(that.leftX + that.height, that.y - that.height);
            ctx.lineTo(that.rightX - that.height, that.y - that.height);
            ctx.lineTo(that.rightX - that.height, that.y);
            ctx.closePath();
            gradient = ctx.createLinearGradient(0, that.y - that.height, 0, that.y)
            gradient.addColorStop(0, darkColor);
            gradient.addColorStop(1, lightColor);
            ctx.fillStyle = gradient;
            ctx.fill();
            //  Right round part (1/4 of circle)
            ctx.beginPath();
            ctx.arc(that.rightX - that.height, that.y, that.height, 1.5 * Math.PI, 2 * Math.PI);
            ctx.lineTo(that.rightX - that.height, that.y);
            ctx.closePath();
            gradient = ctx.createRadialGradient(that.rightX - that.height, that.y, that.height, that.rightX - that.height, that.y, 0);
            gradient.addColorStop(0, darkColor);
            gradient.addColorStop(1, lightColor);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
            lastRenderedPosition = {
                xStart: that.leftX,
                width: that.width
            }
        }
        this.reset = function () {
            that.height = Math.round(viewHeight * 0.03);
            that.width = Math.round(viewWidth * 0.15);
            that.x = Math.round(inboxViewWidth / 2 + borderLineWidth);  // Absolute x position of slider's center
            that.leftX = Math.round(that.x - that.width / 2);           // Absolute x position of slider's left end
            that.rightX = Math.round(that.leftX + that.width);          // Absolute x position of slider's right end
            that.y = Math.round(viewHeight - that.height / 4);          // Absolute y position of slider's bottom line
            that.topCoord = that.y - that.height;                       // Absolute y position of slider's top line
            that.leftStraightX = that.leftX + that.height;              // Absolute x position of slider's flat part left end
            that.rightStraightX = that.rightX - that.height;            // Absolute x position of slider's flat part right end
            lastRenderedPosition = {
                xStart: that.leftX,
                xEnd: that.rightX
            }

        }
        this.loosing = function () {
            that.setIntervalID = setInterval(function () {
                that.y += 3;
                that.topCoord += 3;
                if (that.topCoord > viewHeight) {
                    clearInterval(that.setIntervalID);
                }
            }, 30)
        }

        //  Moving
        $can.addEventListener("mousemove", sliderMove);

        function sliderMove(event) {
            var x = event.clientX;
            var leftX = Math.round(x - that.width / 2);
            var rightX = Math.round(x + that.width / 2);
            if (leftX >= borderLineWidth && rightX <= inboxViewWidth + borderLineWidth) {
                that.x = x;
                that.leftX = leftX;
                that.rightX = rightX;
                that.leftStraightX = that.leftX + that.height;  // Absolute x position of slider's straight part left end
                that.rightStraightX = that.rightX - that.height;  // Absolute x position of slider's straight part right end
            } else if (leftX < borderLineWidth) {
                that.leftX = borderLineWidth;
                that.rightX = that.leftX + that.width;
                that.x = that.leftX + that.width / 2;
                that.leftStraightX = that.leftX + that.height;
                that.rightStraightX = that.rightX - that.height;
            } else if (rightX > inboxViewWidth + borderLineWidth) {
                that.rightX = inboxViewWidth + borderLineWidth;
                that.leftX = that.rightX - that.width;
                that.x = that.rightX - that.width / 2;
                that.leftStraightX = that.leftX + that.height;
                that.rightStraightX = that.rightX - that.height;
            }
            that.render();
        }
        this.removeSliderMove = function () {
            $can.removeEventListener("mousemove", sliderMove);
        }
        return this
    }

})
