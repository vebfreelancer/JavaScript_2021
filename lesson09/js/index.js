'use strict';

const btnStart = document.getElementById('start');
console.log(btnStart);

const btnIncome = document.getElementsByTagName('button')[0];
console.log(btnIncome);

const btnExpenses = document.getElementsByTagName('button')[1];
console.log(btnExpenses);

const checkbox = document.querySelector('#deposit-check');
console.log(checkbox);

const inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
console.log(inputAdditionalIncome);

const expensesMonth = document.getElementsByClassName('result-total')[0];
console.log(expensesMonth);

const additionalIncome = document.getElementsByClassName('result-total')[1];
console.log(additionalIncome);

const additionalExpenses = document.getElementsByClassName('result-total')[2];
console.log(additionalExpenses);

const incomePeriod = document.getElementsByClassName('result-total')[3];
console.log(incomePeriod);

const targetMonth = document.getElementsByClassName('result-total')[4];
console.log(targetMonth);

const money = document.querySelector('.salary-amount');
console.log(money);

const incomeTitle = document.querySelector('.income-items>.income-title');
console.log(incomeTitle);

const incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

const expensesTitle = document.querySelector('.expenses-items>.expenses-title');
console.log(expensesTitle);

const expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

const depositAmount = document.querySelector('.deposit-amount');
console.log(depositAmount);

const depositPercent = document.querySelector('.deposit-percent');
console.log(depositPercent);

const targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

const range = document.querySelector('[type="range"]');
console.log(range);

