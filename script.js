/**
 * Created by LEE on 2016/10/19.
 */

$(document).ready(function () {
    var startButton = $("#btn-start");
    var resetButton = $("#btn-reset");

    var isSessionStop = true;
    var isBreakStop = true;

    var resetSession = 1500;
    var resetBreak = 300;

    //user choice of session and break time
    var sessionTime = 1500;
    var breakTime = 300;

    var sessionClock = $('.session-clock').FlipClock(sessionTime, {
        clockFace: 'MinuteCounter',

        countdown: true,
        autoStart: false,

        callbacks: {
            interval: function () {
                sessionTime = sessionClock.getTime().time;
                if (sessionTime == 0) {
                    //set time again to offset the one second difference
                    breakClock.setTime(breakTime + 1);
                    breakClock.start();
                    isBreakStop = false;

                    isSessionStop = true;
                } else if (breakTime == 0 && isBreakStop) {

                    //set time for display
                    breakClock.setTime(breakTime);
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
                    sessionClock.setTime(sessionTime + 1);
                    sessionClock.start();
                    isSessionStop = false;

                    isBreakStop = true;
                } else if (sessionTime == 0 && isSessionStop) {

                    //set time for display
                    sessionClock.setTime(sessionTime);
                }
            }
        }
    });

    $("#btn-reduce-session-minute").click(function () {
        changeSessionTime(-60);
    });

    $("#btn-increase-session-minute").click(function () {
        changeSessionTime(60);
    });

    $("#btn-reduce-session-second").click(function () {
        changeSessionTime(-10);
    });

    $("#btn-increase-session-second").click(function () {
        changeSessionTime(10);
    });

    function changeSessionTime(time) {
        if ((sessionTime + time >= 0) && (sessionTime + time <= 6000)) {
            stopAllClocks();
            sessionTime += time;
            sessionClock.setTime(sessionTime);
        }
    }

    $("#btn-reduce-break-minute").click(function () {
        changeBreakTime(-60);
    });

    $("#btn-increase-break-minute").click(function () {
        changeBreakTime(60);
    });

    $("#btn-reduce-break-second").click(function () {
        changeBreakTime(-10);
    });

    $("#btn-increase-break-second").click(function () {
        changeBreakTime(10);
    });

    function changeBreakTime(time) {
        if ((breakTime + time >= 0) && (breakTime + time <= 6000)) {
            stopAllClocks();
            breakTime += time;
            breakClock.setTime(breakTime);
        }
    }


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

        stopAllClocks();

        sessionTime = resetSession;
        breakTime = resetBreak;

        sessionClock.setTime(sessionTime);
        breakClock.setTime(breakTime);
    });

    function stopAllClocks(){
        sessionClock.stop();
        isSessionStop = true;

        breakClock.stop();
        isBreakStop = true;

        startButton.text("Start");
    }

});

