'use strict';

// Функция проверки на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
// Получение классов из DOM
let start = document.getElementById('start');
let reset = document.getElementById('cancel');
let btnPlus = document.getElementsByTagName('button');
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let checkbox = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthMonthValue = document.getElementsByClassName('result-total')[0];
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
let targetMonthValue = document.querySelector('.target_month-value');
let incomeItems = document.querySelectorAll('.income-items');
let range = document.querySelector('[type="range"]');
let incomePeriodValue = document.querySelector('.income_period-value');
let periodSelect = document.querySelector('.period-select');
let periodAmount =  document.querySelector('.period-amount');

// Получаем инпуты ввода вывода
let inputEnter = document.querySelectorAll('.data input[type = text]');
let inputShow = document.querySelectorAll('.result-total');
        
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
    start: function (){
        // Скрытие и вывод кнопок рассчитать/сбросить
        start.style.display = 'none';
        reset.style.display = 'block';
        // Перезаписываем состояние инпутов
        inputEnter = document.querySelectorAll('.data input[type = text]');
        // Блокировка инпутов
        let index;
        for (index = 0; index < inputEnter.length; index++){
            inputEnter[index].disabled = true;
        };
        // Блокировка кнопок +
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
        // Вызов данных appData
        this.budget = +money.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();        
        this.getBudget();
        // appData.getInfoDeposit();
        this.showResult();
    },

    // Метод reset
    reset: function (){
        // Скрытие и вывод кнопок рассчитать/сбросить
        start.style.display = 'block';
        reset.style.display = 'none';
        // Снятие блокировки и чистка инпутов
        let index;
        for (index = 0; index < inputEnter.length; index++){
            inputEnter[index].disabled = false;
            inputEnter[index].value = '';
        }
        let i;
        for (i = 0; i < inputShow.length; i++){
            inputShow[i].value = '';
        }
        // Проверка данных для поля месячный доход
        if (!isNumber(money.value) || money.value <= 0){
            start.disabled = true; 
        }
        // Снятие блокировки с кнопок +
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        // Сброс позунка
        periodSelect.value = 1;
        periodAmount.textContent = 1;
        // Сброс данных appData
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonths = 0;
        this.expensesMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
        for (let key in appData.income){
            delete appData.income[key];
        }
        for (let key in appData.expenses){
            delete appData.expenses[key];
        }
        // console.log(this);
    },
    
    // Вычисляем budgetMonth, budgetDay и заносим в  appData
    getBudget : function () {
        this.budgetMonth = this.budget + this.incomeMonths - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    },
    // Вывод значений
    showResult: function(){
        budgetMonthMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
    },

    //Добавление блоков дополнительных доходов
    addIncomeBlock: function(){
        let cloneincomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, incomePlus);
        // Чистка полей
        let cloneIncomeTitle = cloneincomeItems.querySelector('.income-title'),
            cloneIncomeAmount = cloneincomeItems.querySelector('.income-amount');
        cloneIncomeTitle.value = '';
        cloneIncomeAmount.value = '';
        // Ограничение на добаление полей
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },

    // Добавление блоков обязательных расходов
    addExpensesBlock: function (){
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        // Чистка полей
        let clonExpensesTitle = cloneExpensesItems.querySelector('.expenses-title'),
            cloneExpensesAmount = cloneExpensesItems.querySelector('.expenses-amount');
        clonExpensesTitle.value = '';
        cloneExpensesAmount.value = '';
        // Ограничение на добаление полей
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
        // console.log(this);
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
            appData.incomeMonths += +this.income[key];
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
            this.percentDeposit = prompt('Какой годовой процент?', 10);
            while (!isNumber(this.percentDeposit) || this.percentDeposit === null || this.percentDeposit.trim() === ''){
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            };
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(this.moneyDeposit)){
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            };
        }
    },

    // Время достижения цели
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    
    // Накопления за период
    calcSaveMoney: function (){
        periodAmount.textContent  = periodSelect.value;
        return this.budgetMonth * range.value;
    },

    // Заносим сумму расходов в appData expensesMonth 
    getExpensesMonth: function () {
        for (let key in this.expenses){
            this.expensesMonth += this.expenses[key];
        }
    }
};

// Присваиваем контекст вызова метода старт и сброс объекту appData
start.addEventListener('click', function(event){
    event.preventDefault();
    appData.start();
    
});
reset.addEventListener('click', function(event){
    event.preventDefault();
    appData.reset();
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

// Проверка поля месячный доход
if (!isNumber(money.value) || money.value <= 0){
    start.disabled = true; 
};

money.addEventListener('input', function(){
    if (!isNumber(money.value) || money.value <= 0){
        start.disabled = true;
    } else {
        start.disabled = false;
    }
});

// Период расчета
periodSelect.addEventListener('input', function(){
    periodAmount.textContent  = periodSelect.value;
    incomePeriodValue.value = appData.calcSaveMoney();
});

// Определяем уровень доходов
appData.getStatusIncome = getStatusIncome;

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
