define(["./main"], function(main){
    return function() {
        //  Left border
        var grd = ctx.createLinearGradient(0, 0, borderLineWidth, 0);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.5, "#777");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;
        ctx.fillRect(0, borderLineWidth, borderLineWidth, viewHeight);
        ctx.beginPath();    //  Upper Triangle
        ctx.moveTo(0, 0);
        ctx.lineTo(borderLineWidth, borderLineWidth);
        ctx.lineTo(0, borderLineWidth);
        ctx.closePath();
        ctx.fill();
        //  Right border
        var grd = ctx.createLinearGradient(inboxViewWidth + borderLineWidth, borderLineWidth, inboxViewWidth + 2 * borderLineWidth, borderLineWidth);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.5, "#777");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;
        ctx.fillRect(inboxViewWidth + borderLineWidth, borderLineWidth, inboxViewWidth + 2 * borderLineWidth, viewHeight);
        ctx.beginPath();    //  Upper Triangle
        ctx.moveTo(inboxViewWidth + 2 * borderLineWidth, 0);
        ctx.lineTo(inboxViewWidth + borderLineWidth, borderLineWidth);
        ctx.lineTo(inboxViewWidth + 2 * borderLineWidth, borderLineWidth);
        ctx.closePath();
        ctx.fill();
        //  Upper border
        var grd = ctx.createLinearGradient(0, 0, 0, borderLineWidth);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.5, "#777");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;
        ctx.fillRect(borderLineWidth, 0, inboxViewWidth, borderLineWidth);
        ctx.beginPath();    //  Left Triangle
        ctx.moveTo(0, 0);
        ctx.lineTo(borderLineWidth, borderLineWidth);
        ctx.lineTo(borderLineWidth, 0);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();    //  Right Triangle
        ctx.moveTo(inboxViewWidth + 2 * borderLineWidth, 0);
        ctx.lineTo(inboxViewWidth + borderLineWidth, borderLineWidth);
        ctx.lineTo(inboxViewWidth + borderLineWidth, 0);
        ctx.closePath();
        ctx.fill();

        //  Drowe score section
                                                                                            //  Signs
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "#040";
        ctx.fillRect(viewWidth - scoreSectionWidth, 0, $can.width, $can.height);
        // Level
        ctx.fillStyle = "goldenrod";
        ctx.font = scoreSectionWidth * 0.18 + 'px font';
        ctx.fillText("level", viewWidth - scoreSectionWidth / 2, viewHeight * 0.1);
        // Lifes
        ctx.fillText("lifes", viewWidth - scoreSectionWidth / 2, viewHeight * 0.4);
        // Score
        ctx.fillText("score", viewWidth - scoreSectionWidth / 2, viewHeight * 0.7);
                                                                                            // Values
        ctx.font = scoreSectionWidth * 0.25 + 'px font';
        // Level
        ctx.fillText(level, viewWidth - scoreSectionWidth / 2, viewHeight * 0.23);
        // Lifes
        ctx.fillText(lifes, viewWidth - scoreSectionWidth / 2, viewHeight * 0.53);
        // Score
        ctx.fillText(score, viewWidth - scoreSectionWidth / 2, viewHeight * 0.83);
    }
})
