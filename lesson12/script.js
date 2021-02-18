'use strict';

// Обращаемся к класам
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

// Создаем масив
let todoData = [];

// Создаем функцию обновления
const render = function (){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    // Перебираем масив todoData
    todoData.forEach(function(item){

        // Добавляем в DOM разметку нового задания
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' + 
        '</div>';

        // Распределяем выполненные и не выполненные задания
        if (item.completed){
            todoCompleted.append(li);
        }   else {
            todoList.append(li);
        }
        
        // Создаем кнопку для добавления заданий в выполненные и обратно
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

         // Удаление задания из страницы и localStorage
        const btnDelete = li.querySelector('.todo-remove');
        btnDelete.addEventListener('click', function(){
            item.deleted = !item.deleted;
            let index;
            todoData.forEach(function (item, i){
                index = i;
                if (todoData[i].deleted === true) {
                    todoData.splice(index, 1);
                }
            });
            render();
        });
    });
    // Заносим изменения в localStorage
    jsonTodo();
};



// Удаление данных с инпута
let clearBtn = function(){
    headerInput.value = '';
};

// Обработка формы для добавления нового задания
todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    // Новое задание
    const newTodo = {
        value: headerInput.value,
        completed: false,
        deleted: false
    };

    // Проверка на пустую строку
    if (newTodo.value !== ''){
        todoData.push(newTodo);
    }
    // Заносим изменения в localStorage, обновляем и чистим инпут
    jsonTodo();
    render();
    clearBtn();
});

// Вызов данных при загрузке из localStorage
parseTodo();
render();

// Преобразование todoData в json и обратно
function jsonTodo() {
    localStorage.setItem('value', JSON.stringify(todoData));
};

function parseTodo() {
    if (localStorage.getItem('value')) {
        todoData = JSON.parse(localStorage.getItem('value'));
        render();
    }
};



// let arr;
    // for (arr = 0; arr < todoData.length; arr++){
    //     newTodo = headerInput.value;
    //     todoData[arr];

    //     const li = document.createElement('li');
    //     li.classList.add('todo-item');

    //     li.innerHTML = '<span class="text-todo">' + arr.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';

    //     todoList.append(li);
    //     console.log(todoData[arr]);
    // }


// const inputText = document.getElementById('myText'),
//     myBtn = document.getElementById('myBtn'),
//     text = document.getElementById('text');

// const showText = function (){
//     text.textContent = localStorage.getItem('memory');
// }

// myBtn.addEventListener('click', function(){
//     localStorage.setItem('memory', inputText.value);
//     showText();
// });

// localStorage.removeItem('myText');

// showText();


// document.cookie = 'name=value';

// document.cookie = 'hope=life; expires=Tue, 7 May 2022 00:00:00 GMT';

// function setCookie (key, value, year, month, day, path, domain, secure){
    
//     let cookieStr = encodeURI(key) + '=' + encodeURI(value);
//     if (year){
//         const expires = new Date(year, month-1, day);
//         cookieStr += '; expires=' + expires.toGMTString();
//     }

//     cookieStr += path ? '; path=' + encodeURI(path) : '';
//     cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
//     cookieStr += secure ? '; secure=' : '';

//     document.cookie = cookieStr;
// };



// setCookie('Hello', 'world');

// setCookie('Любимый праздник детей', 'Новый год', 2022, 1, 1);

// console.log(decodeURI(document.cookie));