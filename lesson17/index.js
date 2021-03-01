'use strict';

const firstInput = document.getElementById('a');
const secondInput = document.getElementById('b');
const resInput = document.getElementById('res');
const summaBtn = document.getElementById('sum');
const multipleBtn = document.getElementById('mult');

const calculator = {
    a: 0, 
    b: 0,
    summa: 0,
    multiple: 0,
    sum: function(){
        this.summa = this.a + this.b;
    },
    mult: function(){
        this.multiple = this.a * this.b;
    },
    show: function(){
        this.a = +firstInput.value;
        this.b = +secondInput.value;
        this.sum();
        this.mult();
    }
};

summaBtn.addEventListener('click', () => {
    calculator.show();
    resInput.value = calculator.summa;
});
multipleBtn.addEventListener('click', () => {
    calculator.show();
    resInput.value = calculator.multiple;
});