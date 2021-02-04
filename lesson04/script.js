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


function getExpensesMonth(amount1, amount2) {
    return amount1 + amount2;
}
getExpensesMonth(amount1, amount2);


function getAccumulatedMonth(money, amount1, amount2) {
    return money - (amount1 + amount2);
}
getAccumulatedMonth(money, amount1, amount2);

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
// console.log(`accumulatedMonth: ${accumulatedMonth}`);


function getTargetMonth(mission, accumulatedMonth) {
    return mission / accumulatedMonth;
}
getTargetMonth(mission, accumulatedMonth);

let budgetDay = accumulatedMonth / 30;

let showTypeOf = function (data) {
    console.log(data, typeof(data));
}
showTypeOf(amount1);
showTypeOf(amount2);
showTypeOf(money);
showTypeOf(mission);

console.log(`Расходы за месяц: ${getExpensesMonth(amount1, amount2)}`);
console.log(addExpenses.split(',') );
console.log(`Время миссии: ${Math.floor(getTargetMonth(mission, accumulatedMonth))}`);
console.log(`Дневной бюджет: ${Math.floor(budgetDay)}`);
console.log(`Уровень доходов: ${getStatusIncome()}`);
