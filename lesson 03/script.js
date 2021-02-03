'use strict';

// Обьявляем переменные
let money = +prompt('Ваш месячный доход');
// console.log(`Ваш месячный доход ${money}`);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
console.log(addExpenses.split(','));

let deposit = confirm('Есть ли у вас депозит в банке?');
// console.log(deposit);

let mission = 1000000;

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

// Вычисляем месячный бюджет
let budgetMonth = money - (amount1 + amount2);
// console.log('budgetMonth: ' + budgetMonth);

// Вычисляем время выполнения мисси
mission /= budgetMonth;
console.log('Время mission: ' + Math.round(mission));

// Делим месячный бюджет на 30 дней выводим дневной бюджет
let budgetDay = budgetMonth / 30;
console.log('budgetDay:' + Math.floor(budgetDay));

// Используя ветку условий определяем уровень доходов
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 || budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 || budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
} else if (budgetDay = 0) {
    console.log('У вас нулевой уровень дохода');
} else if (budgetDay = 600) {
    console.log('У вас нормальный уровень дохода');
} else if (budgetDay = 1200) {
    console.log('У вас неплохой уровень дохода');
}
