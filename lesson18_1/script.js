'use strict';

// Получаем параграфы вывода информации
let timeOfDay = document.getElementsByTagName('p')[0],
    dayWeeks = document.getElementsByTagName('p')[1],
    timeShow = document.getElementsByTagName('p')[2],
    countNewYear = document.getElementsByTagName('p')[3];
// Калькулирующая функция
function calculateFunc(){
    // Текущие дата и время
    let date = new Date();
    // Время суток
    if (date.getHours() > 6 && date.getHours() < 10){
        timeOfDay.textContent = 'Добрый день: Утро';
    }   else if (date.getHours() > 10 && date.getHours() < 18){
        timeOfDay.textContent = 'Добрый день: День';
    }   else if (date.getHours() > 18 && date.getHours() < 23){
        timeOfDay.textContent = 'Добрый день: Вечер';
    }   else {
        timeOfDay.textContent = 'Добрый день: Ночь';
    }
    // День недели
    if (date.getDay() === 1){
        dayWeeks.textContent = 'Сегодня: Понедельник';
    }   else if(date.getDay() === 2){
        dayWeeks.textContent = 'Сегодня: Вторник';
    }   else if(date.getDay() === 3){
        dayWeeks.textContent = 'Сегодня: Среда';
    }   else if(date.getDay() === 4){
        dayWeeks.textContent = 'Сегодня: Четверг';
    }   else if(date.getDay() === 5){
        dayWeeks.textContent = 'Сегодня: Пятница';
    }   else if(date.getDay() === 6){
        dayWeeks.textContent = 'Сегодня: Суббота';
    }   else if(date.getDay() === 0){
        dayWeeks.textContent = 'Сегодня: Воскресенье';
    }
    // Текущее время
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let time = `${hours}:${minutes}:${seconds}`;
    
    if (hours < 12){
        timeShow.innerHTML = `${time} AM`;
    } else {
        timeShow.innerHTML = `${time} PM`;
    }
    // Счетчик дней до нового года
    let dateStop = new Date('2022 01 01 00:00:00').getTime(),
        dateNow = new Date().getTime(),
        countDate = (dateStop - dateNow) / 1000,
        dayTime = 60 * 60 * 24,
        countDays = Math.floor(countDate / dayTime);
        countNewYear.innerHTML = `До нового года осталось ${countDays} дней`;
}
// Вызов калькулирующей функции
setInterval(function(){
    calculateFunc();
},1000);