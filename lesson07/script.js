'use strict';

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

// Обьект appData
let appData = {
    budjet: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 20,

    // Метод asking
    asking: function (){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');        
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        // Добавлениие в appData обязательных расходов

        // Проверка на ввод числа
        let check = function () {
            numPrompt = prompt('Во сколько это обойдется?:');
            while (!isNumber(numPrompt)){
                numPrompt = prompt('Во сколько это обойдется?:');
            };
        };

        let expensesPrompt;
        let sum = 0;
        let numPrompt;

        for (let i = 0; i < 2; i++) {

            expensesPrompt = prompt('Введите обязательную статью расходов?');
            numPrompt = prompt("Во сколько это обойдется?:");
    
            if (!isNumber(numPrompt)){
                check();
            }

            sum = parseFloat(numPrompt);
            appData.expenses[expensesPrompt] = sum;
        }
    }
};
appData.asking();

// Добавляем функции в методы обьекта appData
appData.getExpensesMonth = getExpensesMonth;
appData.getBudget = getBudget;
appData.getTargetMonth = getTargetMonth;
appData.getStatusIncome = getStatusIncome;

// Заносим сумму расходов в appData expensesMonth 
function getExpensesMonth() {
    for (let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
    }
};

let expensesAmount = appData.getExpensesMonth();

// Вычисляем budgetMonth, budgetDay и заносим в  appData
function getBudget() {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
};

// Время достижения цели
function getTargetMonth() {
    appData.period = Math.round(appData.mission / appData.budgetMonth);
    if(appData.period >= 0){
        return  `Цель будет достигнута: ${appData.period} месяцев`;
    }
    else {
        return 'Цель не будет достигнута';
    };
};

// Определяем уровень доходов
function getStatusIncome() {
    if (appData.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 || appData.budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 || appData.budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay = 0) {
        return ('У вас нулевой уровень дохода');
    } else if (appData.budgetDay < 0) {
        return ('Что то пошло не так');
    }
};

// Вызов методов appData
getBudget();
getTargetMonth();


console.log('"Наша программа включает в себя данные: "');
for (let key in appData){
    console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
}

// Консоль логи
console.log('Расходы за месяц: ' + appData.expenses);
console.log(getTargetMonth());
console.log(`getStatusIncome: ${getStatusIncome()}`);
