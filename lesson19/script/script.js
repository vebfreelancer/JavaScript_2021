window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            if (parseInt(hours) < 10) {
                hours = '0' + hours;
            }
            if (parseInt(minutes) < 10) {
                minutes = '0' + minutes;
            }
            if (parseInt(seconds) < 10) {
                seconds = '0' + seconds;
            }
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        let startTimer = setInterval(updateClock, 1000);

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining <= 0) {
                clearInterval(startTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        // updateClock();
    }
    countTimer('2021 03 01 21:36:00');

    // Меню
    const tooggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        const handlerMenu = () => {
            // if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
            //     menu.style.transform = `translate(0)`;
            // }   else {
            //     menu.style.transform = `translate(-100%)`;
            // }
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };
    tooggleMenu();

    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        function animate(options) {
            let start = performance.now();
            requestAnimationFrame(function animate(time) {
                // timeFraction от 0 до 1
                let timeFraction = (time - start) / options.duration;
                if (timeFraction > 1) timeFraction = 1;
                // текущее состояние анимации
                let progress = options.timing(timeFraction)
                options.draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }

        function makeEaseOut(timing) {
            return function (timeFraction) {
                return 1 - timing(1 - timeFraction);
            }
        }

        function bounce(timeFraction) {
            for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                }
            }
        }

        let bounceEaseOut = makeEaseOut(bounce);

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width >= 768){
                    animate({
                        duration: 3000,
                        timing: bounceEaseOut,
                        draw: function (progress) {
                            popupContent.style.top = progress * 100 + 'px';
                        }
                    });
                }   else {
                    popupContent.style.top = '10%';
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopup();
});
