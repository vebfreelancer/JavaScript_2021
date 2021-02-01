'use strict';

// Обьявляем переменные
let money = +prompt('Ваш месячный доход');
let addExpenses = +prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let budgetDay = 30000 / 30;
// console.log(money);
// console.log(addExpenses);
// console.log(deposit);

let qestions = 1;
let expenses1;
let expenses2;
let amount1;
let amount2;

// Используя switch решаем серию вопросов
switch(qestions) {
    case 1:
        expenses1 = prompt('Введите обязательную статью расходов?');
        // console.log(expenses1);
    case 2:
        amount1 = +prompt('Во сколько это обойдется?');
        // console.log(amount1);
    case 3:
        expenses2 = prompt('Введите обязательную статью расходов?');
        // console.log(expenses2);
    case 4:
        amount2 = +prompt('Во сколько это обойдется?');
        // console.log(amount2);
}

// Сумируем расходы получаем месячный бюджет
let budgetMonth = addExpenses + amount1 + amount2;
console.log(budgetMonth);

// Берем разницу месячных расходов и доходов делим
// на значение миссии выводим необходимое время
mission /= (money - budgetMonth);
console.log(Math.round(mission));

// Делим месячный бюджет на 30 дней выводим дневной бюджет
budgetDay = budgetMonth / 30;
console.log(budgetDay);

// Используя ветку условий определяем уровень доходов
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
}   else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
}   else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}   else if (budgetDay < 0) {
    console.log('Что то пошло не так');
}   else if (budgetDay = 0) {
    console.log('У вас нулевой уровень дохода');
}   else if (budgetDay = 600) {
    console.log('У вас нормальный уровень дохода');
}   else if (budgetDay = 1200) {
    console.log('У вас неплохой уровень дохода');
}