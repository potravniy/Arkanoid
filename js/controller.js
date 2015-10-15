define(["./main", "./renderField", "./Circle", "./Slider", "./Surprise", "./Brick1", "./Brick2", "./Brick3", "./Brick4", "./levels"]
    , function (main, renderField, Cicle, Slider, Surprise, Brick1, Brick2, Brick3, Brick4, levels) {
    return function () {
        level = 1;
        var slider = new Slider();
        var circle = new Cicle(-100, -400, slider);
        var leftWallX = borderLineWidth + circle.r;
        var topWallY = borderLineWidth + circle.r;
        var rightWallX = borderLineWidth + inboxViewWidth - circle.r;
        var bricksInRow = 12;
        var brickWigth = Math.round(inboxViewWidth / bricksInRow);
        var bricksInColumn = 12;
        var bricksHeight = Math.round(inboxViewHeight * 0.6 / bricksInColumn);
        var bricks = levels[1];
        var countDesroyableBricks = 0;
        var powerTimeTimeoutID;
        var powerTime = 20000;   //  ms
        var surpriseFound = false;
        var surprise = [];
        // Converting the map into array of brick objects
        creareBrickField();

        var startTime;
        var time;
        var intervalID;
        var runRender = true;
        render();

        //     Events 
        $can.addEventListener("click", go);

        //  Functions
        function creareBrickField() {
            for (var i = 0; i < bricks.length; i++) {
                for (var j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j] === 1) {
                        bricks[i][j] = new Brick1(borderLineWidth + j * brickWigth, borderLineWidth + i * bricksHeight, brickWigth, bricksHeight);
                        countDesroyableBricks++;
                    } else if (bricks[i][j] === 2) {
                        bricks[i][j] = new Brick2(borderLineWidth + j * brickWigth, borderLineWidth + i * bricksHeight, brickWigth, bricksHeight);
                        countDesroyableBricks++;
                    } else if (bricks[i][j] === 3) {
                        bricks[i][j] = new Brick3(borderLineWidth + j * brickWigth, borderLineWidth + i * bricksHeight, brickWigth, bricksHeight);
                        countDesroyableBricks++;
                    } else if (bricks[i][j] === 4) {
                        bricks[i][j] = new Brick4(borderLineWidth + j * brickWigth, borderLineWidth + i * bricksHeight, brickWigth, bricksHeight);
                    }
                }
            }
        }
        function render() {
            ctx.clearRect(borderLineWidth, borderLineWidth, borderLineWidth + inboxViewWidth, borderLineWidth + inboxViewHeight);
            renderField();
            renderBricks();
            slider.render();
            circle.render();
            renderSurprise();
            if (runRender) requestAnimationFrame(render);
        }
        function go() {
            intervalID = setInterval(function () {
                time = Date.now();
                if (!startTime) {
                    startTime = time;
                    $can.removeEventListener("click", go);
                }
                circle.updatePosition(time, startTime);
                surpriseUpdatePosition(time, startTime);
                collisionWithWall();
                collisionWithSlider();
                collisionWithBricks();
                collisionSliderWithSurprise();
                startTime = time;
            }, 4)
        }
        function collisionWithWall() {
            if (circle.x <= leftWallX) {
                circle.vX = +Math.abs(circle.vX);
                return
            } else if (circle.x >= rightWallX) {
                circle.vX = -Math.abs(circle.vX);
                return
            } else if (circle.y <= topWallY) {
                circle.vY = +Math.abs(circle.vY);
                return
            } else if (circle.y > viewHeight) {          //      Ball has been lost
                lostSliderSound.play();
                if (circle.y > viewHeight + circle.r) lostBall();

            }
        }
        function collisionWithSlider() {
            var speed = 0;
            var angle = 0;
            var collidingAngle = 0;
            if (circle.y + circle.r >= slider.topCoord && circle.x + circle.r >= slider.leftX && circle.x - circle.r <= slider.rightX && circle.y <= slider.y) {
                var initCond = circle.y + circle.r >= slider.topCoord && circle.x + circle.r >= slider.leftX && circle.x - circle.r <= slider.rightX;
                var isInRangeOfY = (circle.y + circle.r >= slider.topCoord);
                var isInRangeOfLeftX = (circle.x >= slider.leftStraightX);
                var isInRangeOfRightX = (circle.x <= slider.rightStraightX);
                if (isInRangeOfY && isInRangeOfLeftX && isInRangeOfRightX) {    //  Ball collides with flat part of Slider
                    speed = Math.sqrt(circle.vX * circle.vX + circle.vY * circle.vY);
                    angle = Math.PI * (circle.x - slider.x) / ((slider.rightStraightX - slider.leftStraightX) * 2);
                    circle.vY = - speed * Math.cos(angle) * 1.03;
                    circle.vX = speed * Math.sin(angle) * 1.03;
                } else if ((circle.x < slider.leftStraightX) 
                    && ((circle.x - slider.leftStraightX) * (circle.x - slider.leftStraightX) 
                    + (circle.y - slider.y) * (circle.y - slider.y) 
                    <= (circle.r + slider.height) * (circle.r + slider.height))) {    //  Ball collides with left rounded part of Slider
                    var dY = slider.y - circle.y;
                    var dX = slider.leftStraightX - circle.x;
                    collidingAngle = Math.atan(dX / dY);
                    var collidingAngleG = collidingAngle * 180 / Math.PI;
                    angle = - Math.PI/4 - collidingAngle / 2;
                    speed = Math.sqrt(circle.vX * circle.vX + circle.vY * circle.vY);
                    circle.vY = -speed * Math.cos(angle) * 1.03;
                    circle.vX = speed * Math.sin(angle) * 1.03;
                }
                else if ((circle.x > slider.rightStraightX)
                    && ((circle.x - slider.rightStraightX) * (circle.x - slider.rightStraightX)
                    + (circle.y - slider.y) * (circle.y - slider.y)
                    <= (circle.r + slider.height) * (circle.r + slider.height))) {    //  Ball collides with left rounded part of Slider
                    var dY = slider.y - circle.y;
                    var dX = slider.rightStraightX - circle.x;
                    collidingAngle = Math.atan(dX / dY);
                    var collidingAngleG = collidingAngle * 180 / Math.PI;
                    angle = Math.PI / 4 - collidingAngle / 2;
                    speed = Math.sqrt(circle.vX * circle.vX + circle.vY * circle.vY);
                    circle.vY = -speed * Math.cos(angle) * 1.03;
                    circle.vX = speed * Math.sin(angle) * 1.03;
                }
            }
        }
        function collisionWithBricks() {
            for (var i = 0; i < bricks.length; i++) {
                for (var j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j]) {
                        var b = bricks[i][j];
                        var dist = Math.sqrt((circle.x - b.centrX) * (circle.x - b.centrX) + (circle.y - b.centrY) * (circle.y - b.centrY));
                        var destroyed = false;
                        if (dist <= circle.r + b.halfDiag) {
                            //b.color3 = "#400";
                            if (circle.x < b.leftX) {
                                if (circle.y < b.topY && (!bricks[i - 1]||!bricks[i - 1][j]) && (!bricks[i]||!bricks[i][j - 1])) {
                                    dist = Math.sqrt((circle.x - b.leftX) * (circle.x - b.leftX) + (circle.y - b.topY) * (circle.y - b.topY));
                                    if (dist <= circle.r) {  // Collision with upper left corner
                                        if (!circle.power) collisionWithCorner(b.leftX, b.topY, circle, dist);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                } else if (circle.y >= b.topY && circle.y <= b.bottomY) {
                                    if (b.leftX - circle.x <= circle.r) {       //  Collision with left side
                                        if (!circle.power) circle.vX = -Math.abs(circle.vX);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                } else if (circle.y > b.bottomY && (!bricks[i + 1]||!bricks[i + 1][j]) && (!bricks[i]||!bricks[i][j - 1])) {
                                    dist = Math.sqrt((circle.x - b.leftX) * (circle.x - b.leftX) + (circle.y - b.bottomY) * (circle.y - b.bottomY));
                                    if (dist <= circle.r) {  // Collision with lower left corner
                                        if (!circle.power) collisionWithCorner(b.leftX, b.bottomY, circle, dist);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                }
                            } else if (circle.x >= b.leftX && circle.x <= b.rightX) {
                                if (circle.y < b.topY) {
                                    if (b.topY - circle.y <= circle.r) {       //  Collision with top side
                                        if (!circle.power) circle.vY = -Math.abs(circle.vY);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                } else if (circle.y > b.bottomY) {
                                    if (circle.y - b.bottomY <= circle.r) {       //  Collision with bottom side
                                        if (!circle.power) circle.vY = Math.abs(circle.vY);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                }
                            } else if (circle.x > b.rightX) {
                                if (circle.y < b.topY && (!bricks[i - 1]||!bricks[i - 1][j]) && (!bricks[i]||!bricks[i][j + 1])) {
                                    dist = Math.sqrt((circle.x - b.rightX) * (circle.x - b.rightX) + (circle.y - b.topY) * (circle.y - b.topY));
                                    if (dist <= circle.r) {  // Collision with upper right corner
                                        if (!circle.power) collisionWithCorner(b.rightX, b.topY, circle, dist);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                } else if (circle.y >= b.topY && circle.y <= b.bottomY) {
                                    if (circle.x - b.rightX <= circle.r) {       //  Collision with right side
                                        if (!circle.power) circle.vX = Math.abs(circle.vX);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                } else if (circle.y > b.bottomY && (!bricks[i + 1]||!bricks[i + 1][j]) && (!bricks[i]||!bricks[i][j + 1])) {
                                    dist = Math.sqrt((circle.x - b.rightX) * (circle.x - b.rightX) + (circle.y - b.bottomY) * (circle.y - b.bottomY));
                                    if (dist <= circle.r) {  // Collision with lower right corner
                                        if (!circle.power) collisionWithCorner(b.rightX, b.bottomY, circle, dist);
                                        if (b.sign === "s") surpriseFound = true;
                                        if (b.hit() === "destroyed") destroyed = true;
                                    }
                                }
                            }
                        }
                        if (destroyed) {
                            bricks[i][j] = undefined;
                            countDesroyableBricks--;
                            score++;
                        }
                        if (surpriseFound) {
                            surprise.push(new Surprise(bricks[i][j].centrX, bricks[i][j].centrY, bricks[i][j].rightX - bricks[i][j].leftX, bricks[i][j].bottomY - bricks[i][j].topY));
                            surpriseFound = false;
                        }
                    }
                }
            }
            if (countDesroyableBricks == 0) {
                levelCompleted();
            }
        }
        function collisionSliderWithSurprise() {
            surprise = surprise.filter(function (item) {
                var isMatchX = Math.abs(slider.x - item.x) < (slider.width + item.width) / 2;
                var isMatchY = Math.abs(slider.y - item.y) < (slider.height + item.height) / 2;
                if (isMatchX && isMatchY) {
                    if (item.value === "slow") {
                        circle.vX = circle.vX / 1.5;
                        circle.vY = circle.vY / 1.5;
                    } else if (item.value === "fast") {
                        circle.vX = circle.vX * 1.5;
                        circle.vY = circle.vY * 1.5;
                    } else if (item.value === "big") {
                        slider.width = Math.round(slider.width * 1.5);
                        slider.leftX = Math.round(slider.x - slider.width / 2);
                        slider.rightX = Math.round(slider.leftX + slider.width);
                        if (slider.leftX < borderLineWidth) {
                            slider.x += borderLineWidth - slider.leftX;
                            slider.leftX = Math.round(slider.x - slider.width / 2);
                            slider.rightX = Math.round(slider.leftX + slider.width);
                        }
                        if (slider.rightX > inboxViewWidth + borderLineWidth) {
                            slider.x -= slider.rightX - (inboxViewWidth + borderLineWidth);
                            slider.leftX = Math.round(slider.x - slider.width / 2);
                            slider.rightX = Math.round(slider.leftX + slider.width);
                        }
                        slider.leftStraightX = slider.leftX + slider.height;
                        slider.rightStraightX = slider.rightX - slider.height;
                    } else if (item.value === "small") {
                        slider.width = Math.round(slider.width / 1.5);
                        slider.leftX = Math.round(slider.x - slider.width / 2);
                        slider.rightX = Math.round(slider.leftX + slider.width);
                        slider.leftStraightX = slider.leftX + slider.height;
                        slider.rightStraightX = slider.rightX - slider.height;
                    } else if (item.value === "life") {
                        lifes++;
                    } else if (item.value === "power") {
                        circle.power = true;
                        if (powerTimeTimeoutID) clearTimeout(powerTimeTimeoutID);
                        powerTimeTimeoutID = setTimeout(function () {
                            circle.power = false;
                            powerTimeTimeoutID = undefined;
                        }, powerTime)
                    }
                    catchSound.play();
                    return false;
                } else return true;
            })
        }
        function collisionWithCorner(cornerX, cornerY, circ, dist) {
            var ortNx = (circ.x - cornerX) / dist;      //  Normal coord x
            var ortNy = (circ.y - cornerY) / dist;      //  Normal coord y
            var ortTx = ortNy;                          //  Tangential coord x
            var ortTy = -ortNx;                         //  Tangential coord x
            var circleVT = circ.vX * ortTx + circ.vY * ortTy;
            var circleVN = circ.vX * ortNx + circ.vY * ortNy;
            circ.vX = circleVT * ortTx - circleVN * ortNx;
            circ.vY = circleVT * ortTy - circleVN * ortNy;
        }
        function renderBricks() {
            bricks.forEach(function (item) {
                item.forEach(function (unit) {
                    if (unit) unit.render();
                })
            })
        }
        function renderSurprise() {
            surprise.forEach(function (unit) {
                    unit.render();
            })
        }
        function surpriseUpdatePosition(time, startTime) {
            surprise = surprise.filter(function (unit) {
                unit.updatePosition(time, startTime);
                if (unit.y < viewHeight + 100) {
                    return true;
                } else {
                    return false;
                }
            })
        }
        function lostBall() {
            surprise = [];
            slider.loosing();
            clearInterval(intervalID);
            if (powerTimeTimeoutID) clearTimeout(powerTimeTimeoutID);
            lifes--;
            if (lifes < 0) {
                lifes = "X"
                runRender = false;
                slider.removeSliderMove();
                window.postMessage("loadGameOver", "*");
            } else {
                $can.addEventListener("click", go);
                setTimeout(function () {
                    slider.reset();
                    circle.reset();
                    startTime = undefined;
                }, 2000);
            }
        }
        function levelCompleted() {
            surprise = [];
            clearInterval(intervalID);
            runRender = false;
            if (level < levels.length - 1) {
                $can.addEventListener("click", nextLevel);
                setTimeout(function () {
                    startTime = undefined;
                    ctx.fillStyle = "goldenrod";
                    ctx.font = inboxViewWidth * 0.07 + 'px font';
                    ctx.fillText("completed!", inboxViewWidth / 2 + borderLineWidth, viewHeight * 0.3);
                    ctx.font = inboxViewWidth * 0.05 + 'px font';
                    ctx.fillText(" click for next level.", inboxViewWidth / 2 + borderLineWidth, viewHeight * 0.6);
                }, 300)
            } else {
                slider.removeSliderMove();
                window.postMessage("loadWinnerPage", "*");
            }
        }
        function nextLevel() {
            $can.removeEventListener("click", nextLevel);
            level++;
            bricks = levels[level];
            $can.addEventListener("click", go);
            creareBrickField();
            slider.reset();
            circle.reset();
            runRender = true;
            render();
        }
    }
})
