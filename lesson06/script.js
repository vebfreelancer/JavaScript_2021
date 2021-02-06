'use srict';

// Обьявляем переменную с загаданным числом
let secret = 50;

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