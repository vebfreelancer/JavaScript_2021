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
    countTimer('2021 03 05 21:36:00');

    // Меню
    const tooggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            body = document.querySelector('body');

        body.addEventListener('click', (event) => {

            let target = event.target;
            target = target.closest('menu, .menu');

            if (target) {
                menu.classList.toggle('active-menu');
            }
        });
    };
    tooggleMenu();

    // popup
    const togglePopup = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        // let count = 0;

        // let moveContent;
        // let animationPopup = function (){
        //     count++;
        //     moveContent = requestAnimationFrame(animationPopup);
        //     if (count < 100) {
        //         popupContent.style.top = count + 'px';
        //     }   else {
        //         cancelAnimationFrame(moveContent);
        //         count = 0;
        //     }
        // };

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
                popUp.style.display = 'block';
                // moveContent = requestAnimationFrame(animationPopup);
                if (screen.width >= 768) {
                    animate({
                        duration: 3000,
                        timing: bounceEaseOut,
                        draw: function (progress) {
                            popupContent.style.top = progress * 100 + 'px';
                        }
                    });
                } else {
                    popupContent.style.top = '10%';
                }
            });
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    };

    togglePopup();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
    // Слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');
        
        let createDot = document.createElement('li');

        for (let i = 0; i < slide.length; i++){
            createDot = document.createElement('li');
            createDot.classList.add('dot');
            portfolioDots.append(createDot);
        }

        let dot = document.querySelectorAll('.dot');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')){
                currentSlide++;
            }   else if (target.matches('#arrow-left')){
                currentSlide--;
            }   else if (target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length){
                currentSlide = 0;
            }

            if (currentSlide < 0){
                currentSlide = slide.length -1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);

    };

    slider();

});
