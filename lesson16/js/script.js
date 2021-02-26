'use strict';

// Функция проверки на число
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

// Получение классов из DOM

// Переменная месячный доход
const money = document.querySelector('.salary-amount');
// Переменные кнопок
const start = document.getElementById('start');
const reset = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
// Переменные блока дополнительный доход
let incomeItems = document.querySelectorAll('.income-items');
let incomeTitle = document.querySelector('input.income-title');
let incomeAmount = document.querySelector('.income-amount');
// Переменная блока возможный доход
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
// Переменные блока обязательные расходы
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesTitle = document.querySelector('input.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
// Переменная возможные расходы
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// Переменная поля цель
const targetAmount = document.querySelector('.target-amount');
// Переменные инпутов вывода
const budgetMonthMonthValue = document.getElementsByClassName('result-total')[0];
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];
// Переменные депозит
const depositCheck = document.getElementById('deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
// Переменная checkbox
const checkbox = document.querySelector('#deposit-check');
// Переменные ползунка
const periodSelect = document.querySelector('.period-select');
const periodAmount =  document.querySelector('.period-amount');
// Получаем все инпуты со значеним type = text для групповой блокировки и сброса
let allInputs = document.querySelectorAll('input[type = text]');

class AppData {
    constructor(budget = 0, budgetDay = 0, budgetMonth = 0, expensesMonth = 0, incomeMonths = 0, income = {}, addIncome = [], expenses = {}, addExpenses = [], deposit = false, percentDeposit = 0, moneyDeposit = 0) {
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
        this.incomeMonths = incomeMonths;
        this.income = income;
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses;
        this.deposit = deposit;
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
    }
    // Метод старт
    start() {
        // Скрытие и вывод кнопок рассчитать/сбросить
        start.style.display = 'none';
        reset.style.display = 'block';
        // Перезаписываем состояние инпутов
        allInputs = document.querySelectorAll('input[type = text]');
        // Блокировка инпутов
        let index;
        for (index = 0; index < allInputs.length; index++) {
            allInputs[index].disabled = true;
        };
        // Блокировка кнопок +
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
        // Вызов методов appData
        this.budget = +money.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
    }
    // Метод reset
    reset() {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1){
            const count = Array.prototype.slice.call(incomeItems, 1);
            for (let i = 0; i < count.length; i++){
                count[i].parentNode.removeChild(count[i]);
            }
            incomePlus.style.display = 'block';
        }   else if (incomeItems.length === 0 || incomeItems.length === 1){
            const inc = this.income;
            for(let i in inc){
                delete inc[i];
            }
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1){
            const count = Array.prototype.slice.call(expensesItems, 1);
            for (let i = 0; i < count.length; i++){
                count[i].parentNode.removeChild(count[i]);
            }
            expensesPlus.style.display = 'block';
        }   else if (expensesItems.length === 0 || expensesItems.length === 1){
            const exp = this.expenses;
            for(let i in exp){
                delete exp[i];
            }
        }
        // Скрытие и вывод кнопок рассчитать/сбросить
        start.style.display = 'block';
        reset.style.display = 'none';
        // Снятие блокировки и чистка инпутов
        let index;
        for (index = 0; index < allInputs.length; index++) {
            allInputs[index].disabled = false;
            allInputs[index].value = '';
        }
        // Проверка данных для поля месячный доход
        if (!isNumber(money.value) || money.value <= 0) {
            start.disabled = true;
        }
        // Снятие блокировки с кнопок +
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        // Сброс позунка
        periodSelect.value = 1;
        periodAmount.textContent = 1;
        // Сброс депозита
        depositCheck.checked = false;
        depositBank.value = '';
        depositAmount.value = '';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        // Сброс данных appData
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonths = 0;
        this.expensesMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        for (let key in this.income) {
            delete this.income[key];
        }
        for (let key in this.expenses) {
            delete this.expenses[key];
        }
        // console.log(this);
    }
    // Вывод значений
    showResult() {
        budgetMonthMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSaveMoney();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = appData.calcSaveMoney();
        });
    }
    //Добавление блоков дополнительных доходов
    addIncomeBlock() {
        const cloneincomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, incomePlus);
        // Чистка полей
        const cloneIncomeTitle = cloneincomeItems.querySelector('.income-title'),
            cloneIncomeAmount = cloneincomeItems.querySelector('.income-amount');
        cloneIncomeTitle.value = '';
        cloneIncomeAmount.value = '';
        // Ограничение на добавление полей
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    // Добавление блоков обязательных расходов
    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        // Чистка полей
        const clonExpensesTitle = cloneExpensesItems.querySelector('.expenses-title'),
            cloneExpensesAmount = cloneExpensesItems.querySelector('.expenses-amount');
        clonExpensesTitle.value = '';
        cloneExpensesAmount.value = '';
        // Ограничение на добаление полей
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    // Получение обязательных расходов
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            };
        });
    }
    getIncome() {
        // Дополнительный источник заработка
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            this.income[itemIncome] = cashIncome;
        });
        for (let key in this.income) {
            this.incomeMonths += +this.income[key];
        }
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    // Время достижения цели
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    // Накопления за период
    calcSaveMoney() {
        periodAmount.textContent = periodSelect.value;
        return this.budgetMonth * periodSelect.value;
    }
    // Вычисляем budgetMonth, budgetDay и заносим в  appData
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + (this.incomeMonths - this.expensesMonth) + monthDeposit;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    }
    // Заносим сумму расходов в appData expensesMonth 
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    // Депозит
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    // Метод обработки для поля процент
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other'){
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('input', () => {
                if (!isNumber(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value > 100) {
                    alert('Необходимо указать процент числом от 1 до 100');
                    start.disabled = true;
                }   else {
                    start.disabled = false;
                }
            });
        }   else{
            depositPercent.style.display = 'none';
            start.disabled = false;
            depositPercent.value = valueSelect;
        }
    }
    // Метод обработки функционала депозит
    depositHandler() {
        if (depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        }   else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    // Метод обработки событий
    listeners() {
        start.addEventListener('click', (event) => {
            event.preventDefault();
            appData.start();
        });
        reset.addEventListener('click', (event) => {
            event.preventDefault();
            appData.reset();
        });
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        // Проверка поля месячный доход
        if (!isNumber(money.value) || money.value <= 0) {
            start.disabled = true;
        };
        money.addEventListener('input', () => {
            if (!isNumber(money.value) || money.value <= 0) {
                start.disabled = true;
            } else {
                start.disabled = false;
            }
        });
        // Период расчета
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = appData.calcSaveMoney();
        });
        // Вешаем событие на чекбокс
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        // Валидация текстовых полей
        const inputString = document.querySelectorAll('input[placeholder="Наименование"');
        inputString.forEach((item) => {
                item.addEventListener('input', () => {
                item.value = item.value.replace(/[^\.\,\-\_\'\"\@\?\!\:\$ А-ЯЁа-яё()]/g, '');
            });
        });
        additionalExpensesItem.addEventListener('input', () => {
            additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^\.\,\-\_\'\"\@\?\!\:\$ А-ЯЁа-яё()]/g, '');
        });
        // Валидация числовых полей
        const inputNumber = document.querySelectorAll('input[placeholder="Сумма"');
        inputNumber.forEach((item) => {
                item.addEventListener('input', () => {
                item.value = item.value.replace(/[^0-9]/g, '');
            });
        });
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay < 1200 || this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 || this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay = 0) {
            return ('У вас нулевой уровень дохода');
        } else if (this.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    }
};

const appData = new AppData();
appData.listeners();