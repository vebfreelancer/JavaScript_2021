'use strict';

// Функция проверки на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let checkbox = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthMonthWalue = document.getElementsByClassName('result-total')[0];
let budgetDayValue = document.getElementsByClassName('result-total')[1];
let expensesMonthValue = document.getElementsByClassName('result-total')[2];
let additionalIncomeValue = document.getElementsByClassName('result-total')[3];
let additionalExpensesValue = document.getElementsByClassName('result-total')[4];
let money = document.querySelector('.salary-amount');
let expensesTitle = document.querySelector('.expenses-items>.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let range = document.querySelector('[type="range"]');
let targetMonthValue = document.querySelector('.target_month-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let incomeItems = document.querySelectorAll('.income-items');
let periodSelect = document.querySelector('.period-select');
let periodAmount =  document.querySelector('.period-amount');


// Обьект appData
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonths: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    // Метод старт
    start: function () {

        appData.budget = +money.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();        
        appData.getBudget();
        appData.showResult();
    },

    // Вывод значений
    showResult: function(){
        budgetMonthMonthWalue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    },

    // Добавление блоков обязательных расходов
    addExpensesBlock: function (){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    //Добавление блоков обязательных расходов дополнительных доходов
    addIncomeBlock: function(){
        let cloneincomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }

    },

    // Получение обязательных расходов
    getExpenses: function (){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            };
        });
    },

    getIncome: function (){
        // Дополнительный источник заработка
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            appData.income[itemIncome] = cashIncome;
        })
        for (let key in appData.income){
            appData.incomeMonths += +appData.income[key];
        }
    },

    getAddExpenses: function (){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function (){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

    // Депозит
    getInfoDeposit: function (){
        if (confirm('Есть ли у вас депозит в банке?')){
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

    // Время достижения цели
    getTargetMonth: function () {
        
        return targetAmount.value / appData.budgetMonth;
    },

    // Накопления за период
    calcSaveMoney: function (){
        console.log(appData.budgetMonth);
        console.log(range.value);
        periodAmount.textContent  = periodSelect.value;
        return appData.budgetMonth * range.value;
    },

    // Вычисляем budgetMonth, budgetDay и заносим в  appData
    getBudget : function () {
        appData.budgetMonth = appData.budget + appData.incomeMonths - appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth / 30);
    },

    // Заносим сумму расходов в appData expensesMonth 
    getExpensesMonth: function () {
        for (let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    }

};

// События кнопка старт
start.addEventListener('click', appData.start);

money.addEventListener('input', function(){
    if (!isNumber(money.value) || money.value <= 0){
        start.disabled = true;
    } else {
        start.disabled = false;
    }
});

if (!isNumber(money.value) || money.value <= 0){
    start.disabled = true;  
};

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.textContent  = periodSelect.value;
    incomePeriodValue.value = appData.calcSaveMoney();

});

// appData.getInfoDeposit();

appData.getStatusIncome = getStatusIncome;

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

// console.log('"Наша программа включает в себя данные: "');
// for (let key in appData){
//     console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
// }
