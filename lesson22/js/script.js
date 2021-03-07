'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('toDolist', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        }   else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault()
        if (this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };

            this.todoData.set(newTodo.key, newTodo);
            this.clearInput();
            this.render();
        }   else {
            alert('Пустое задание добавить нельзя!');
        }
    }

    clearInput() {
        this.input.value = '';
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(toDoRemove) {
        this.todoData.forEach((item, key) => {
            if (item.value.trim() === toDoRemove.closest('li').textContent.trim()){
                this.todoData.delete(key, 1);
                this.render();
            }
        });

    }

    completedItem(toDoCompleted){
        this.todoData.forEach((item) => {
            if (item.value.trim() === toDoCompleted.closest('li').textContent.trim()){
                item.completed = !item.completed; 
                this.render();
            }
        });
    }

    handler(){
        const todoContainer = document.querySelector('.todo-container'),
            todoRemove = document.querySelector('.todo-remove'),
            todoComplete = document.querySelector('.todo-complete');
            
            todoContainer.addEventListener('click', (event) => {

            const target = event.target;
            if (target.matches('.todo-complete')) {
                this.completedItem(target);
            }

            if (target.matches('.todo-remove')) {
                this.deleteItem(target);
            }
        });
    }
    
    init () {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.handler();
todo.init();