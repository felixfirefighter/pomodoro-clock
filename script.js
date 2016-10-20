/**
 * Created by LEE on 2016/10/19.
 */

$(document).ready(function () {
    var startButton = $("#btn-start");
    var resetButton = $("#btn-reset");

    var isSessionStop = true;
    var isBreakStop = true;

    //user choice of break time, used to reset
    var sessionTimeSet = 5;
    var breakTimeSet = 5;

    var sessionTime = 5;
    var breakTime = 5;

    var becomeReset = false;

    var sessionClock = $('.session-clock').FlipClock(sessionTime, {
        clockFace: 'MinuteCounter',

        countdown: true,
        autoStart: false,

        callbacks: {
            interval: function () {
                sessionTime = sessionClock.getTime().time;
                if (sessionTime == 0) {
                    //set time again to offset the one second difference
                    breakClock.setTime(breakTimeSet+1);
                    breakClock.start();
                    isBreakStop = false;

                    isSessionStop = true;
                }else if(breakTime == 0 && isBreakStop){

                    //set time for display
                    breakClock.setTime(breakTimeSet);
                }
            }
        }
    });

    var breakClock = $('.break-clock').FlipClock(breakTime, {
        clockFace: 'MinuteCounter',

        countdown: true,
        autoStart: false,

        callbacks: {
            interval: function () {
                breakTime = breakClock.getTime().time;

                if (breakTime == 0) {

                    //set time again to offset the one second difference
                    sessionClock.setTime(sessionTimeSet+1);
                    sessionClock.start();
                    isSessionStop= false;

                    isBreakStop = true;
                }else if(sessionTime == 0 && isSessionStop){

                    //set time for display
                    sessionClock.setTime(sessionTimeSet);
                }
            }
        }
    });

    startButton.click(function () {
        if (isSessionStop) {
            sessionClock.start();
            startButton.text("Stop");

            isSessionStop = false;
        } else {
            sessionClock.stop();
            startButton.text("Start");

            isSessionStop = true;
        }
    });

    resetButton.click(function () {
        //stop the countdown when reset is clicked
    });
});


