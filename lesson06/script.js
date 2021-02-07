'use srict';

///Функция создания массива радомных чисел
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//произвольный выбор числа от 0 до 100 
let secret = getRandomInt(0,100);
console.log(secret);

// Переменная для хранения ввода пользователя
let numberPrompt;

// Вызываем функцию с обработкой и возвратом данных
let startGame = function (){

    // Проверка на тип данных
    let isNumber = function() {
    
        numberPrompt = prompt('"Угадай число от 1 до 100":');

        if (numberPrompt === null){
            alert('"Игра окончена"');
        }   else if (isNaN(numberPrompt)){
            alert('"Введи число!"');
            isNumber();
        }   else if (numberPrompt.trim() === ''){
            alert('"Введи число!"');
            isNumber();
        }
    };
    isNumber();

    // Обьявляем переменную в которую сохраним данные от
    // пользователя конвертированные в число
    let numberPromptConvert;
    
    // Создаем условие которое предотвращает вывод null
    // для дальнейшей обработке в выводе
    if (numberPrompt !== null) {
        numberPromptConvert = +numberPrompt;
    }

    // Создаем ветку условий
    if (numberPromptConvert === secret){
        alert('"Поздравляю, Вы угадали!!!"');
    }   else if (numberPromptConvert > secret){
        alert('"Загаданное число меньше"');
        startGame();
    }   else if (numberPromptConvert < secret) {
        alert('"Загаданное число больше"');
        startGame();
    }

    console.log(numberPromptConvert);
}
startGame();