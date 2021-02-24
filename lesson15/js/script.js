'use strict';

// Функция проверки на число
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

// Получение классов из DOM
const start = document.getElementById(`start`);
const reset = document.getElementById(`cancel`);
const btnPlus = document.getElementsByTagName(`button`);
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const checkbox = document.querySelector(`#deposit-check`);
const budgetMonthMonthValue = document.getElementsByClassName(`result-total`)[0];
const budgetDayValue = document.getElementsByClassName(`result-total`)[1];
const expensesMonthValue = document.getElementsByClassName(`result-total`)[2];
const additionalIncomeValue = document.getElementsByClassName(`result-total`)[3];
const additionalExpensesValue = document.getElementsByClassName(`result-total`)[4];
let expensesItems = document.querySelectorAll(`.expenses-items`);
const depositAmount = document.querySelector(`.deposit-amount`);
const depositPercent = document.querySelector(`.deposit-percent`);
const targetMonthValue = document.querySelector(`.target_month-value`);
let incomeItems = document.querySelectorAll(`.income-items`);
const range = document.querySelector(`[type="range"]`);
const incomePeriodValue = document.querySelector(`.income_period-value`);
const periodSelect = document.querySelector(`.period-select`);
const periodAmount =  document.querySelector(`.period-amount`);
const additionalIncomeItem = document.querySelectorAll(`.additionalIncomeItem`);

// Получаем инпуты ввода вывода
let inputEnter = document.querySelectorAll(`.data input[type = text]`);
const inputShow = document.querySelectorAll(`.result-total`);

// Валидация текстовых полей
let incomeTitle = document.querySelector(`input.income-title`);
const additionalIncomeItemFirst = document.getElementsByClassName(`additional_income-item`)[0];
const additionalIncomeItemSecond = document.getElementsByClassName(`additional_income-item`)[1];
const expensesTitle = document.querySelector(`input.expenses-title`);
const additionalExpensesItem = document.querySelector(`.additional_expenses-item`);

let inputString = [incomeTitle, additionalIncomeItemFirst, additionalIncomeItemSecond, expensesTitle, additionalExpensesItem];

for (let key in inputString){
    inputString[key].onkeypress = (e) => {
        e = e || window.e;
        if (e.charCode <= 57 && e.charCode >= 48){
            alert(`Данные нужно ввести в текстовом формате!`);
            return false;
        }
    };
    // console.log(inputString[key]);
};

// Валидация числовых полей
const money = document.querySelector(`.salary-amount`);
const incomeAmount = document.querySelector(`.income-amount`);
let expensesAmount = document.querySelector(`.expenses-amount`);
const targetAmount = document.querySelector(`.target-amount`);

let inputNumber = [money, incomeAmount, expensesAmount, targetAmount];

for (let key in inputNumber){
    inputNumber[key].onkeypress = (e) => {
        e = e || window.e;
        if (e.charCode && (e.charCode > 57 || e.charCode < 48)){
            alert(`Данные нужно ввести в числовом формате!`);
            return false;
        }
    };
    // console.log(inputNumber[key]);
};

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
        start.style.display = `none`;
        reset.style.display = `block`;
        // Перезаписываем состояние инпутов
        inputEnter = document.querySelectorAll(`.data input[type = text]`);
        // Блокировка инпутов
        let index;
        for (index = 0; index < inputEnter.length; index++) {
            inputEnter[index].disabled = true;
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
        this.getBudget();
        // appData.getInfoDeposit();
        this.showResult();
    }
    // Метод reset
    reset() {
        // Скрытие и вывод кнопок рассчитать/сбросить
        start.style.display = `block`;
        reset.style.display = `none`;
        // Снятие блокировки и чистка инпутов
        let index;
        for (index = 0; index < inputEnter.length; index++) {
            inputEnter[index].disabled = false;
            inputEnter[index].value = ``;
        }
        let i;
        for (i = 0; i < inputShow.length; i++) {
            inputShow[i].value = ``;
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
        // Сброс данных appData
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonths = 0;
        this.expensesMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
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
        additionalExpensesValue.value = this.addExpenses.join(`, `);
        additionalIncomeValue.value = this.addIncome.join(`, `);
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSaveMoney();
        periodSelect.addEventListener(`change`, () => {
            incomePeriodValue.value = appData.calcSaveMoney();
        });
    }
    //Добавление блоков дополнительных доходов
    addIncomeBlock() {
        const cloneincomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, incomePlus);
        // Чистка полей
        const cloneIncomeTitle = cloneincomeItems.querySelector(`.income-title`),
            cloneIncomeAmount = cloneincomeItems.querySelector(`.income-amount`);
        cloneIncomeTitle.value = ``;
        cloneIncomeAmount.value = ``;
        // Ограничение на добаление полей
        incomeItems = document.querySelectorAll(`.income-items`);
        if (incomeItems.length === 3) {
            incomePlus.style.display = `none`;
        }
    }
    // Добавление блоков обязательных расходов
    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        // Чистка полей
        const clonExpensesTitle = cloneExpensesItems.querySelector(`.expenses-title`),
            cloneExpensesAmount = cloneExpensesItems.querySelector(`.expenses-amount`);
        clonExpensesTitle.value = ``;
        cloneExpensesAmount.value = ``;
        // Ограничение на добаление полей
        expensesItems = document.querySelectorAll(`.expenses-items`);
        if (expensesItems.length === 3) {
            expensesPlus.style.display = `none`;
        }
    }
    // Получение обязательных расходов
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector(`.expenses-title`).value;
            const cashExpenses = +item.querySelector(`.expenses-amount`).value;
            if (itemExpenses !== `` && cashExpenses !== ``) {
                this.expenses[itemExpenses] = cashExpenses;
            };
        });
    }
    getIncome() {
        // Дополнительный источник заработка
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector(`.income-title`).value;
            const cashIncome = item.querySelector(`.income-amount`).value;
            this.income[itemIncome] = cashIncome;
        });
        for (let key in this.income) {
            this.incomeMonths += +this.income[key];
        }
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(`,`);
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== ``) {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ``) {
                this.addIncome.push(itemValue);
            }
        });
    }
    // Депозит
    getInfoDeposit() {
        if (confirm(`Есть ли у вас депозит в банке?`)) {
            this.percentDeposit = prompt(`Какой годовой процент?, 10`);
            while (!isNumber(this.percentDeposit) || this.percentDeposit === null || this.percentDeposit.trim() === ``) {
                this.percentDeposit = prompt(`Какой годовой процент?, 10`);
            };
            this.moneyDeposit = prompt(`Какая сумма заложена?, 10000`);
            while (!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt(`Какая сумма заложена?, 10000`);
            };
        }
    }
    // Время достижения цели
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    // Накопления за период
    calcSaveMoney() {
        periodAmount.textContent = periodSelect.value;
        return this.budgetMonth * range.value;
    }
    // Вычисляем budgetMonth, budgetDay и заносим в  appData
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonths - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    }
    // Заносим сумму расходов в appData expensesMonth 
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return (`У вас высокий уровень дохода`);
        } else if (this.budgetDay < 1200 || this.budgetDay >= 600) {
            return (`У вас средний уровень дохода`);
        } else if (this.budgetDay < 600 || this.budgetDay > 0) {
            return (`К сожалению у вас уровень дохода ниже среднего`);
        } else if (this.budgetDay = 0) {
            return (`У вас нулевой уровень дохода`);
        } else if (this.budgetDay < 0) {
            return (`Что то пошло не так`);
        }
    }
    listeners() {
        // Присваиваем контекст вызова метода старт и сброс объекту appData
        start.addEventListener(`click`, (event) => {
            event.preventDefault();
            appData.start();

        });
        reset.addEventListener(`click`, (event) => {
            event.preventDefault();
            appData.reset();
        });

        expensesPlus.addEventListener(`click`, appData.addExpensesBlock);
        incomePlus.addEventListener(`click`, appData.addIncomeBlock);

        // Проверка поля месячный доход
        if (!isNumber(money.value) || money.value <= 0) {
            start.disabled = true;
        };

        money.addEventListener(`input`, () => {
            if (!isNumber(money.value) || money.value <= 0) {
                start.disabled = true;
            } else {
                start.disabled = false;
            }
        });

        // Период расчета
        periodSelect.addEventListener(`input`, () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = appData.calcSaveMoney();
        });
    }
};

const appData = new AppData();
appData.listeners();