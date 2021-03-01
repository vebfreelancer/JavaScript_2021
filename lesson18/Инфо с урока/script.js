'use strict';

// Циклическая функция, выполняет команду через
// заданное в милисекундах время
// let count = 0;
// let idInterval = setInterval(function(){
//     count++;
//     console.log(`setInterval: ${count}`);
// }, 1000);

// Функция callback, возвращает результат через
// заданное ей в милисекундах время
// setTimeout(function(){
    // Функция остановки setInterval
//     clearInterval(idInterval);
// }, 5000);


// Создаем функцию getMassage с аргументом name
// let getMassage = function(name){
//     console.log(`Привет ${name} !`);
// };

// Создаем функцию в котороую передаем аргументы getMassage,
// время и значение которое принимает getMassage, функция
// циклически вызывает в консоль getMassage с аргументом
// name (мир)
// let count = 0;
// let idInterval = setInterval(getMassage, 2000, 'мир');

// Создаем callback функцию в которую передаем аргументы
// getMassage время и значение которое принимает getMassage
// let idTimeout = setTimeout(getMassage, 5000, 'JS');

// Останавливаем вызов idTimeout
// clearTimeout(idTimeout);


// Получаем элементы из дом и обьявляем переменную счетчик
let arrowDown = document.querySelector('.arrow_down'),
    arrowRight = document.querySelector('.arrow_right'),
    count = 0;
// Создаем функцию для остановки анимации в том случае
// когда страница становится не активной
let moveInterval;
// Создаем рекурсивную функцию которая начнет сдвигать
// елементы вниз и вправо прибавляя им отступ равен
// счетчику count
let move = function(){
    moveInterval = requestAnimationFrame(move);
    count++;
    // Добавляем условие для ограничения бесконечного
    // вызова рекурсии
    if (count < 200){
        arrowDown.style.top = count + 'px';
        arrowRight.style.left = count * 2 + 'px';
    }   else if(count < 300){
        arrowRight.style.left = count * 2 + 'px';
    }   else{
        cancelAnimationFrame(moveInterval);
        // clearInterval(idInterval);
    }
    console.log(count);
};
// Вызываем callback функцию или рекурсивную
// функцию и приводим в действие move
// setTimeout(move, 10);
// let idInterval = setInterval(move, 10);

// Вешаем событие для отработки и остановки анимации по клику
let animate = false;
document.addEventListener('click', () => {
    if (!animate){
        moveInterval = requestAnimationFrame(move);
        animate = true;
    }   else{
        animate = false;
        cancelAnimationFrame(moveInterval);
    }
});


// Обработка даты и времени

// Получение текущей даты и времени
let date = new Date();

// Получение даты и времени с заданными параметрами
// let date = new Date('1987 10 april');
// let date = new Date(1987, 6, 26, 10, 30, 15, 100);
// console.log(date);

// Точка остчета времени в JS, Jan 01 1970 03:00:00

console.log(date);
// console.log(date.getTime());

// Отсчет времени от Jan 01 1970 03:00:00
// console.log(Date.now());
// console.log(Date.parse('10 march 1987'));

// Методы для вызова отдельно даты и времени
console.log(date.toDateString());
// console.log(date.toTimeString());

// Вывод с учетом локализации
console.log(date.toLocaleDateString('en'));
console.log(date.toLocaleTimeString());

// Вывод в ISO формате
console.log(date.toISOString().substr(0, 10));

// Метод set, работает также и с временем
// date.setFullYear(10, 2, 5);
// date.setMonth(10, 10);
// date.setDate(10);

// Прибавление и отнятие от текущего времени
// нужного количества времени
// date.setDate(date.getDate() + 100);
// date.setDate(date.getDate() - 100);

// Методы date
console.log(`Год ${date.getFullYear()}`);
console.log(`Месяц ${date.getMonth() + 1}`);
console.log(`День месяца ${date.getDate()}`);
console.log(`День недели ${date.getDay()}`);
console.log(`Час ${date.getHours()}`);
// console.log(`Минуты ${date.getMinutes()}`);
// console.log(`Секунды ${date.getSeconds()}`);
// console.log(`Миллисекунды ${date.getMilliseconds()}`);

// Для получения по гринвичу нужно после get указать UTC
// date.getUTCFullYear()
