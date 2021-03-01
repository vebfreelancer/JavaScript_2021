window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            if (parseInt(hours) < 10){
                hours = '0' + hours;
            }  
            if (parseInt(minutes) < 10){
                minutes = '0' + minutes;
            }   
            if (parseInt(seconds) < 10){
                seconds = '0' + seconds;
            }
            return {timeRemaining, hours, minutes, seconds};
        }

        let startTimer = setInterval(updateClock, 1000);
        function updateClock(){
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining <= 0){
                clearInterval(startTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } 
        }
        // updateClock();
    }
    countTimer('2021 03 01 21:36:00');
});