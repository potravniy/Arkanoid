define(["./main"], function(main){
    //	Class for flying ball
    return function Circle(vX, vY, slider) {
        var that = this;
        this.power = false;
        this.darkColor = "#440";
        this.lightColor = "#ff7";
        this.reset = function () {
            that.r = Math.round((inboxViewWidth + inboxViewHeight) / 100);
            that.x = Math.round(slider.x - slider.width / 7);
            that.y = Math.round(slider.y - slider.height - that.r);
            that.vX = vX;			//	px/sec
            that.vY = vY;			//	px/sec
            startFollowingSlider();
        }
        this.reset();
        var lastRenderedPosition = {
            x: that.x,
            y: that.y,
            r: that.r
        }
        this.render = function () {
            clearPreviousBall();
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(this.x, this.y, this.r, this.x - 0.3 * this.r, this.y - 0.3 * this.r, 0);
            gradient.addColorStop(0, that.darkColor);
            if (that.power) gradient.addColorStop(1, "#f00");
            else gradient.addColorStop(1, that.lightColor);
            ctx.fillStyle = gradient;
            ctx.arc(that.x, that.y, that.r, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.shadowColor = "#f00";
            if (that.power) {
                ctx.shadowOffsetX = -that.vX / Math.sqrt(that.vX * that.vX + that.vY * that.vY);
                ctx.shadowOffsetY = -that.vY / Math.sqrt(that.vX * that.vX + that.vY * that.vY);
                ctx.shadowBlur = that.r / 2;

            }
            ctx.fill();
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            lastRenderedPosition = {
                x: that.x,
                y: that.y,
                r: that.r
            }
        }
        this.updatePosition = function (time, startTime) {
            if (that.y <= viewHeight + that.r) {
                that.x += that.vX * (time - startTime) / 1000;
                that.y += that.vY * (time - startTime) / 1000;
                that.timeOfCurrentPosition = time;
            }
        }


        //  This code moves ball together with slider untill first mouseclick. After click game starts and this code does not work.
        function startFollowingSlider() {
            $can.addEventListener("mousemove", ballMove);
            $can.addEventListener("click", stopFollowing);

        }
        function ballMove() {
            that.x = slider.x - slider.width / 10;
            that.y = slider.y - slider.height - that.r - 2;
//            that.render();
        }
        function stopFollowing() {
            $can.removeEventListener("mousemove", ballMove);
            $can.removeEventListener("click", stopFollowing);
        }
        //  End of code for moving ball with slider.

        function clearPreviousBall() {
            ctx.beginPath();
            ctx.fillStyle = "#006";
            ctx.arc(lastRenderedPosition.x, lastRenderedPosition.y, lastRenderedPosition.r + 1, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.fill();
        }
        return this
    }

})