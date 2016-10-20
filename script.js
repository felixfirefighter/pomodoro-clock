/**
 * Created by LEE on 2016/10/19.
 */

$(document).ready(function () {
    var startButton = $("#btn-start");
    var resetButton = $("#btn-reset");

    var isStop = true;

    var time = 1500;
    var becomeReset = false;

    var sessionClock = $('.session-clock').FlipClock(time, {
        clockFace: 'MinuteCounter',

        countdown: true,
        autoStart: false,

        callbacks: {
            interval: function () {
                time = sessionClock.getTime().time;
            }
        }
    });

    var breakClock = $('.break-clock').FlipClock(time, {
        clockFace: 'MinuteCounter',

        countdown: true,
        autoStart: false,

        callbacks: {
            interval: function () {
                time = breakClock.getTime().time;
            }
        }
    });

    startButton.click(function () {
        if (isStop) {
            sessionClock.start();
            startButton.text("Stop");

            isStop = false;
        } else {
            sessionClock.stop();
            startButton.text("Start");

            isStop = true;
        }
    });

    resetButton.click(function () {
        //stop the countdown when reset is clicked
    });

});
