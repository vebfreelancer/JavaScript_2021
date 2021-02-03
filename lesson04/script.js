'use strict';

// Обьявляем переменные
let money = +prompt('Ваш месячный доход');
// console.log(`Ваш месячный доход ${money}`);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');

let deposit = confirm('Есть ли у вас депозит в банке?');
// console.log(deposit);

let mission = 1000000;

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let getStatusIncome = function () {
    // Используя ветку условий определяем уровень доходов
    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600 || budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600 || budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return ('Что то пошло не так');
    } else if (budgetDay = 0) {
        return ('У вас нулевой уровень дохода');
    } else if (budgetDay = 600) {
        return ('У вас нормальный уровень дохода');
    } else if (budgetDay = 1200) {
        return ('У вас неплохой уровень дохода');
    }
};


function getExpensesMonth(x, y) {
    return x + y;
}
getExpensesMonth(amount1, amount2);


function getAccumulatedMonth(x, y, z) {
    return x - (y + z);
}
getAccumulatedMonth(money, amount1, amount2);

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
// console.log(`accumulatedMonth: ${accumulatedMonth}`);


function getTargetMonth(x, y) {
    return x / y;
}
getTargetMonth(mission, accumulatedMonth);

let budgetDay = accumulatedMonth / 30;

let showTypeOf = function (data) {
    console.log('showTypeOf: ' + data);
}
showTypeOf(amount1);
showTypeOf(amount2);
showTypeOf(money);
showTypeOf(mission);

console.log(`getExpensesMonth: ${getExpensesMonth(amount1, amount2)}`);
console.log(addExpenses.split(','));
console.log(`getTargetMonth: ${Math.floor(getTargetMonth(mission, accumulatedMonth))}`);
console.log('budgetDay: ' + Math.floor(budgetDay));
console.log(`getStatusIncome: ${getStatusIncome()}`);