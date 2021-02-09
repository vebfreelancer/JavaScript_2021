'use strict';

// Функция проверки на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Месячный доход
let money;

let start = function () {
    do{
        money = prompt('Ваш месячный доход?:', 50000);
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 20,

    // Метод asking
    asking: function (){

        // Дополнительный источник заработка
        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Фриланс');
            while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === ''){
                itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Фриланс');
            };
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while (!isNumber(cashIncome)){
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            };
            appData.income[itemIncome] = cashIncome;
        };

        // Возможные расходы
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
        while (isNumber(addExpenses) || addExpenses === null || addExpenses.trim() === ''){
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
        };
            // Вывод первой буквы в верхний регистр
            appData.addExpenses = addExpenses.trim().toLowerCase().split(', ');
            for (let key in appData.addExpenses){
                appData.addExpenses[key] = appData.addExpenses[key].slice(0, 1).toUpperCase() + appData.addExpenses[key].slice(1).toLowerCase();
            }
            appData.deposit = confirm('Есть ли у вас депозит в банке?');


        // Добавлениие в appData обязательных расходов
        let expensesPrompt;
        let sum = 0;
        let numPrompt;

        for (let i = 0; i < 2; i++) {

            expensesPrompt = prompt('Введите обязательную статью расходов?:');
            while (isNumber(expensesPrompt) || expensesPrompt === null || expensesPrompt.trim() === ''){
                expensesPrompt = prompt('Введите обязательную статью расходов?:');
            };

            numPrompt = prompt("Во сколько это обойдется?:");
            while (!isNumber(numPrompt)){
                numPrompt = prompt('Во сколько это обойдется?:');
            };

            sum = parseFloat(numPrompt);
            appData.expenses[expensesPrompt] = sum;
        };
    },

    // Депозит
    getInfoDeposit: function (){
        if (appData.deposit){
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit === null || appData.percentDeposit.trim() === ''){
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            };
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit)){
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            };
        }
    },

    calcSaveMoney: function (){
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getInfoDeposit();

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
    appData.budgetDay = Math.round(appData.budgetMonth / 30);
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
console.log(appData.addExpenses.join(', '));
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(getTargetMonth());
console.log(`getStatusIncome: ${getStatusIncome()}`);
