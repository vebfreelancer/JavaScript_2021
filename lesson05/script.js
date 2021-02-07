'use strict';

// Обьявляем переменные
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;

let getStatusIncome = function () {
    // Используя ветку условий определяем уровень доходов
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay < 1200 || budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600 || budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay = 0) {
        return ('У вас нулевой уровень дохода');
    } else if (budgetDay < 0) {
        return ('Что то пошло не так');
    }
};

// Функция проверки на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Месячный доход
let money;

let start = function () {
    do{
        money = prompt(`Ваш месячный доход?:`);
    }
    while (!isNumber(money));
};
start();

// Вычисление расходов
let expenses = [];
let getExpensesMonth = function () {

    let sum = 0;
    let numPrompt;

    let check = function () {
        numPrompt = prompt('Во сколько это обойдется?:');
        while (!isNumber(numPrompt)){
            numPrompt = prompt('Во сколько это обойдется?:');
        };
    };

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?');
        numPrompt = prompt("Во сколько это обойдется?:");

        if (!isNumber(numPrompt)){
            check();
        }

        sum += parseFloat(numPrompt);
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

// Месячный бюджет
let getAccumulatedMonth = function () {
    return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

// Время достижения цели
let getTargetMonth = function () {
    let timeMission = Math.round(mission / accumulatedMonth);
    if(timeMission >= 0){
        return  `Цель будет достигнута: ${timeMission} месяцев`;
    }
    else {
        return 'Цель не будет достигнута';
    };
};

// Дневной бюджет
let budgetDay = accumulatedMonth / 30;

// Консоль логи
console.log('Расходы за месяц :' + expensesAmount);
console.log('Дневной бюджет: ' + Math.floor(budgetDay));
console.log(getTargetMonth());
console.log(`getStatusIncome: ${getStatusIncome()}`);
console.log(addExpenses.split(','));

let showTypeOf = function (data) {
    console.log(data, typeof(data));
}
showTypeOf(expenses);
showTypeOf(money);
showTypeOf(mission);