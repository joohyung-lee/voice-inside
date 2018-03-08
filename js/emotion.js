var svg = d3.select(".wave");
var emotionPath, facePath;
var leftEye, rightEye, mouth;
var timer;
var active = false;
var emotionType = 'angry';
facePath = d3.select("#face")
svg.attr("width", document.documentElement.clientWidth);
svg.attr("height", document.documentElement.clientHeight);
var angles = d3.range(0, 2 * Math.PI, Math.PI / 100);
var layer=document.querySelector('.btn-group');
var config=document.querySelector('.btn-config');
//set emotion
function setting(target,e){
    e.stopPropagation();
    if(target.classList.contains('active')){
        target.classList.remove('active');
        layer.classList.remove('active');
    }else{
        target.classList.add('active');
        layer.classList.add('active');
    }
}
//hide setting
function hideSetting(){
    layer.classList.remove('active');
    config.classList.remove('active')
}
function volumeTrigger(target,type,e) {
    e.stopPropagation();
    var siblings=document.querySelectorAll('.btn-group button');
    for(var i=0;i<siblings.length;i++){
        siblings[i].classList.remove('active');
    }
    target.classList.toggle('active');
    emotionType=type;
    layer.classList.remove('active');
    config.classList.remove('active');
}
window.addEventListener('resize', function () {
    var md = new MobileDetect(window.navigator.userAgent);
    var body = document.getElementsByTagName("BODY")[0];
    if (md.mobile()) {
        body.classList.remove('desk')
        body.classList.add('mobile')
    } else {

        body.classList.remove('mobile')
        body.classList.add('desk')
    }
    svg.attr("width", document.documentElement.clientWidth);
    svg.attr("height", document.documentElement.clientHeight);
    emotionPath._parents[0].parentNode.attributes.transform.value = "translate(" + document.documentElement.clientWidth /
        2 + "," + document.documentElement.clientHeight / 2 + ")";
});
var emotion = ["rgba(244, 67, 54,1)", "rgba(255, 166, 33,1)", "rgba(33, 150, 243,1)", "rgba(193, 69, 214,1)"]
var defaultColor = "rgba(255, 255, 255,1)";
var transparent = "rgba(255, 255, 255,0)";

//face code
var defaultEyeLeft = "M8.4,12.8L8.4,12.8c-1,0-1.9-0.8-1.9-1.9v0c0-1,0.8-1.9,1.9-1.9h0c1,0,1.9,0.8,1.9,1.9v0C10.3,11.9,9.4,12.8,8.4,12.8z"
var defaultEyeRight = "M21.6,12.8L21.6,12.8c-1,0-1.9-0.8-1.9-1.9v0c0-1,0.8-1.9,1.9-1.9h0c1,0,1.9,0.8,1.9,1.9v0C23.4,11.9,22.6,12.8,21.6,12.8z"
var defaultMouth = "M15.7,20.4h-1.3c-1.3,0-2.4,0-2.4-0.2v-0.1c0,0,1.8,0,2.4,0c0.3,0,1,0,1.3,0c0.6,0,2.4,0,2.4,0v0.1C18,20.4,17,20.4,15.7,20.4z";
var sleepEyeLeft = "M8.4,11.8L8.4,11.8c-1,0-1.9,0-1.9-0.9v0c0-1,0.8-1,1.9-1h0c1,0,1.9,0,1.9,1v0C10.3,11.8,9.4,11.8,8.4,11.8z";
var sleepEyeRight = "M21.6,11.8L21.6,11.8c-1,0-1.9,0-1.9-0.9v0c0-1,0.8-1,1.9-1h0c1,0,1.9,0,1.9,1v0C23.4,11.8,22.6,11.8,21.6,11.8z";
var sleepMouth = "M15.1,21.1h-0.2c-0.2,0-0.4,0-0.4-1.2v-0.4c0,0,0.3,0,0.4,0c0.1,0,0.2,0,0.2,0c0.1,0,0.4,0,0.4,0v0.4C15.5,21.1,15.3,21.1,15.1,21.1z";

var angryEyeLeft = "M8.4,12.8L8.4,12.8c-1,0-1.9-0.8-1.9-1.9v0c0-1,0.8-0.9,1.9-0.9h0c1,0,1.9-0.2,1.9,0.9v0C10.3,11.9,9.4,12.8,8.4,12.8z"
var angryEyeRight = "M21.6,12.8L21.6,12.8c-1,0-1.9-0.8-1.9-1.9v0c0-1,0.8-0.9,1.9-0.9h0c1,0,1.9-0.2,1.9,0.9v0C23.4,11.9,22.6,12.8,21.6,12.8z"
var angryMouth = "M16,19.1h-2c-2,0-3.7,2.9-3.7,0.3v-0.8c0,0,2.8,0,3.7,0c0.5,0,1.5,0,2,0c0.9,0,3.7,0,3.7,0v0.8C19.7,22,18.1,19.1,16,19.1z"

var smileEyeLeft = defaultEyeLeft;
var smileEyeRight = defaultEyeRight;
var smileMouth = "M16.3,24h-2.5c-2.5,0-4.6-2.1-4.6-4.6v-0.8c0,0,3.5,0,4.6,0c0.6,0,1.9,0,2.5,0c1.2,0,4.6,0,4.6,0v0.8C20.9,22,18.8,24,16.3,24z";

var sadEyeLeft = "M8.4,12.8L8.4,12.8c-1,0-1.9-0.2-1.9-1.2v0c0-1,0.8-2.5,1.9-2.5h0c1,0,1.9,1.5,1.9,2.5v0C10.3,12.6,9.4,12.8,8.4,12.8z"
var sadEyeRight = "M21.6,12.8L21.6,12.8c-1,0-1.9-0.2-1.9-1.2v0c0-1,0.8-2.5,1.9-2.5h0c1,0,1.9,1.5,1.9,2.5v0C23.4,12.6,22.6,12.8,21.6,12.8z"
var sadMouth = "M15.9,20.4h-1.7c-1.7,0-3.1,1.4-3.1,0.9v-0.2c0,0,2.3-0.9,3.1-0.9c0.4,0,1.3,0,1.7,0c0.8,0,3.1,0.9,3.1,0.9v0.2C18.9,21.8,17.6,20.4,15.9,20.4z"
//wave
setStyles('emotionPath', emotion, 0, 'multiply');
setFace();
faceSleep();


var hearing, speaking, result;

function voceTextAnimation(play) {
    var voiceIntro = document.querySelector('#intro p');
    var voiceText = document.querySelectorAll('.voice-text.' + emotionType + ' p');
    var emotionText = document.querySelectorAll('.emotion-text.' + emotionType);

    if (!play) {
        clearTimeout(hearing);
        clearTimeout(speaking);
        clearTimeout(result);
        
        var voiceTextAll=document.querySelectorAll('.voice-text p');
        var emotionTextAll=document.querySelectorAll('.emotion-text');
        for(var i=0; i<voiceTextAll.length;i++){
            voiceTextAll[i].classList.remove('active');
        }
        for(var i=0; i<emotionTextAll.length;i++){
            emotionTextAll[i].classList.remove('active');
        }
        voiceIntro.classList.add('active');
        return;
    }
    var resultText = voiceText[1].querySelectorAll('span');
    for (var i = 0; i < resultText.length; i++) {
        resultText[i].style.transitionDelay = "0." + (i + 1) + "s";
    }
    voiceIntro.classList.remove('active');
    hearing = setTimeout(function (e) {
        voiceText[0].classList.add('active');
        volume('emotionPath', 50, 'default');
    }, 500);
    speaking = setTimeout(function (e) {
        volume('emotionPath', 50, emotionType);
    }, 2000);
    result = setTimeout(function () {
        voiceText[0].classList.remove('active');
        voiceText[1].classList.add('active');
        emotionText[0].classList.add('active');
        volume('emotionPath', 50, emotionType);
    }, 3000)

}

function scaleTrigger(target) {

    if (target.classList.contains('active')) {
        target.classList.remove('active');
        active = false;
        scaleOut('emotionPath', emotion);
        voceTextAnimation(false);
    } else {
        target.classList.add('active');
        active = true;
        scale('emotionPath', emotion);
        voceTextAnimation(true);

    }

}

function setFace() {
    leftEye = facePath.append("g").attr("id", "eyes").append('path')
        .attr("d", [defaultEyeLeft])
        .attr("transform-box","fill-box")
        .attr("transform-origin", "center center")
        .attr("stroke", transparent)
        .attr("fill", "rgba(67, 74, 80,1)")
    rightEye = facePath.select('#eyes')
        .append('path')
        .attr("d", [defaultEyeRight])
        .attr("transform-box","fill-box")
        .attr("transform-origin", "center center")
        .attr("stroke", transparent)
        .attr("fill", "rgba(67, 74, 80,1)")
    mouth = facePath.append("g").attr("id", "mouth").append('path')
        .attr("d", [defaultMouth])
        .attr("transform-box","fill-box")
        .attr("transform-origin", "center center")
        .attr("stroke-width", 2)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-miterlimit", 20)
        .attr("stroke", "rgba(67, 74, 80,1)")
        .attr("fill", "rgba(67, 74, 80,1)")
}

function faceDefault() {
    leftEye
        .transition()
        .duration(1000)
        .attr("d", [defaultEyeLeft])
        .attr("transform", "translate(0,0)")

    rightEye
        .transition()
        .duration(1000)
        .attr("d", [defaultEyeRight])
        .attr("transform", "translate(0,0)")

    mouth.transition()
        .duration(1000)
        .attr("d", [defaultMouth])
        .attr("transform", "translate(0,0)")
}

function faceSleep() {
    leftEye.transition()
        .duration(1000)
        .attr("d", [sleepEyeLeft])
        .attr("transform", "translate(0,3)")
        .transition()
        .duration(1000)
        .attr("d", [defaultEyeLeft])
        .attr("transform", "translate(0,0)")
    rightEye.transition()
        .duration(1000)
        .attr("d", [sleepEyeRight])
        .attr("transform", "translate(0,3)")
        .transition()
        .duration(1000)
        .attr("d", [defaultEyeRight])
        .attr("transform", "translate(0,0)")
    mouth.transition()
        .duration(1000)
        .attr("d", [sleepMouth])
        .transition()
        .duration(1000)
        .attr("d", [defaultMouth])
        .on('end', faceSleep)
}

function faceSmile() {
    leftEye
        .transition()
        .duration(500)
        .attr("d", [smileEyeLeft])
        .attr("transform", "translate(0,0)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2) scale(1,0.8)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-1)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2) scale(1,0.8)")

    rightEye
        .transition()
        .duration(500)
        .attr("d", [smileEyeRight])
        .attr("transform", "translate(0,0)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2) scale(1,0.8)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-1)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2) scale(1,0.8)")
    mouth.transition()
        .duration(500)
        .attr("d", [smileMouth])
        .attr("transform", "translate(0,0)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2) scale(1.2,1)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-1)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2) scale(1.2,1)")
        .on('end', faceSmile)
}

function faceAngry() {
    leftEye
        .transition()
        .duration(500)
        .attr("d", [angryEyeLeft])
        .attr("transform", "translate(-2,7) rotate(10)")
        .transition()
        .duration(300)
        .attr("transform", "translate(-3,7) rotate(10)")
        .transition()
        .duration(300)
        .attr("transform", "translate(-1,7) rotate(10)")
        .transition()
        .duration(300)
        .attr("transform", "translate(-2,7) rotate(10)")
    rightEye
        .transition()
        .duration(500)
        .attr("d", [angryEyeRight])
        .attr("transform", "translate(2,7) rotate(-10)")
        .transition()
        .duration(300)
        .attr("transform", "translate(1,7) rotate(-10)")
        .transition()
        .duration(300)
        .attr("transform", "translate(3,7) rotate(-10)")
        .transition()
        .duration(300)
        .attr("transform", "translate(2,7) rotate(-10)")
    mouth.transition()
        .duration(500)
        .attr("d", [angryMouth])
        .attr("transform", "translate(0,2)")
        .transition()
        .duration(300)
        .attr("transform", "translate(-1,2)")
        .transition()
        .duration(300)
        .attr("transform", "translate(1,2)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,2)")
        .on('end', faceAngry)
}

function faceSad() {
    leftEye
        .transition()
        .duration(500)
        .attr("d", [sadEyeLeft])
        .attr("transform", "translate(0,0)")
    rightEye
        .transition()
        .duration(500)
        .attr("d", [sadEyeRight])
        .attr("transform", "translate(0,0)")
    mouth.transition()
        .duration(500)
        .attr("d", [sadMouth])
        .attr("transform", "translate(0,-2)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-4)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-4)")
        .transition()
        .duration(300)
        .attr("transform", "translate(0,-2)")
        .on('end', faceSad)
}

function setStyles(type, color, dgree, blend) {
    window[type] = d3.select(".wave").append("g")
        .style("mix-blend-mode", blend)
        .attr("opacity", "1")
        .attr("transform", "translate(" + document.documentElement.clientWidth / 2 + "," + document.documentElement.clientHeight / 2 + ")")
        .append("g")
        .attr("transform", "rotate(" + dgree + ")")
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .selectAll("path")
        .data(color)
        .enter().append("path")
        .attr("transform", "scale(0.7)")
        .style("mix-blend-mode", blend)
        .attr("stroke", function (d) {
            return d
        })
        .attr("fill", function (d, i) {
            return transparent
        })
        .attr("stroke-width", function (d, i) {
            return 3
        })
        .attr("opacity", function (d, i) {
            return 1 - (i * 0.25)

        })
        .datum(function (d, i) {
            return circleWave(d, i);

        });

}

function circleWave(d, i, type) {

    return d3.radialLine()
        .curve(d3.curveLinearClosed)
        .angle(function (a) {
            return a;
        })
        .radius(function (a) {
            var t;
            if (type === 'scale') {
                t = d3.now() / (1000 - (d3.now()));
                if ((1000 - (d3.now()) < 700)) {
                    t = d3.now() / 700;
                }
            } else {
                angles = d3.range(0, 2 * Math.PI, Math.PI / 100);
                t = d3.now() / 1000;
            }

            return 80 + Math.cos(a * 4 - i * 1.3 * Math.PI / 4 + t) * Math.pow((1.2 + Math.cos(a - t)) / 2,
                4) * 8;
        })
}
timer = d3.timer(function () {
    emotionPath.attr("d", function (d) {
        return d(angles);
    });
});

function volume(type, size, emotionType) {
    var colorSet = ["rgba(244, 67, 54,1)", "rgba(255, 166, 33,1)", "rgba(33, 150, 243,1)", "rgba(193, 69, 214,1)"];
    var edge, time, color, valley
    if (emotionType === 'angry') {
        color = colorSet[0];
        edge = 8;
        time = 200;
        valley = 8;
        faceAngry();
    } else if (emotionType === 'sad') {
        color = colorSet[2];
        edge = 100;
        time = 400;
        valley = 1;
        faceSad();
    } else if (emotionType === "enjoy") {
        color = colorSet[1];
        edge = 100;
        time = 200;
        valley = 5;
        faceSmile();
    } else {
        edge = 100;
        time = 300;
        valley = 4;
        faceDefault();
    }
    angles = d3.range(0, 2 * Math.PI, Math.PI / edge);
    timer = d3.timer(function (elapsed) {
        if (!active) return false;
        var max = size;
        var min = 15;
        var elapsed = min + elapsed * 1.0 / 5;
        if (elapsed > max) {
            elapsed = max - elapsed * 1.0 / 5;
        }
        if (elapsed < max && elapsed > min) {
            window[type]
                .transition()
                .ease(d3.easeLinear)
                .duration(500)
                .attr("fill", function (d, i) {
                    if (emotionType === 'default') {
                        return colorSet[i]
                    } else {
                        return color
                    }
                })
            window[type].datum(function (d, i) {
                    return d3.radialLine()
                        .curve(d3.curveLinearClosed)
                        .angle(function (a) {
                            return a;
                        })
                        .radius(function (a) {
                            var t = d3.now() / (700 - (d3.now()));
                            if ((700 - (d3.now()) < time)) {
                                t = d3.now() / time;
                            }

                            var position = 80 + Math.cos(a * valley - i * 1 * Math.PI / 4 + t) *
                                Math.pow((1 + Math.cos(a - t)) / 2, 4) * elapsed;
                            return position
                        });
                })
                .attr("d", function (d) {
                    return d(angles);
                });


        }
    })

}

function scale(type, color) {
    leftEye.attr('fill', 'rgba(255, 255, 255,1)');
    rightEye.attr('fill', 'rgba(255, 255, 255,1)');
    mouth.attr('stroke', 'rgba(255, 255, 255,1)').attr("fill", "rgba(255, 255, 255,1)");
    faceDefault();
    window[type]
        .datum(function (d, i) {
            return circleWave(d, i);
        })
        .transition()
        .ease(d3.easeExp)
        .duration(500)
        .attr("transform", "scale(1)")
        .attr("fill", function (d, i) {
            return color[i]
        })
        .attr("stroke", transparent)

}

function scaleOut(type, color) {
    window[type]
        .datum(function (d, i) {
            return circleWave(d, i);
        })
        .transition()
        .ease(d3.easeExp)
        .duration(500)
        .attr("transform", "scale(0.7)")
        .attr("stroke", function (d, i) {
            return color[i]
        })
        .attr("fill", transparent);
    leftEye.attr('fill', 'rgba(67, 74, 80,1)');
    rightEye.attr('fill', 'rgba(67, 74, 80,1)');
    mouth.attr('stroke', 'rgba(67, 74, 80,1)').attr("fill", "rgba(67, 74, 80,1)");
    faceSleep();

}
//         var easing = [
//     "easeElastic",
//     "easeBounce",
//     "easeLinear",
//     "easeSin",
//     "easeQuad",
//     "easeCubic",
//     "easePoly",
//     "easeCircle",
//     "easeExp",
//     "easeBack"
//     ];