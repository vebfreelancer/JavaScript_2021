let money = 20000;
let income = 5000;
let addExpenses = 'Развлечения, собственные нужды, отдых';
let deposit = true;
let mission = 1000000;
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев. ' + 'Цель заработать ' + mission + ' гривен.');
console.log(addExpenses.toLowerCase().split(','));

let budgetDay = 30000 / 30;
console.log(budgetDay);