'use strict';

// Восстанавливаем порядок книг
const book = document.querySelectorAll('.book');
book[0].before(book[1]);
book[5].after(book[2]);
book[3].before(book[4]);

// Восстанавливаем порядок глав
const bookTwo = book[0].querySelectorAll('li');
const bookFive = book[5].querySelectorAll('li');
bookTwo[3].after(bookTwo[6]);
bookTwo[6].after(bookTwo[8]);
bookFive[1].after(bookFive[9]);
bookFive[4].after(bookFive[2]);

// Меняем картинку фона
document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

// Исправляем заголовок
const bookThreeTitle = book[4].querySelector('h2');
bookThreeTitle.textContent = 'Книга 3. this и Прототипы Объектов';
bookThreeTitle.style.color = '#bdb76b';

// Убираем рекламу
const advertising = document.querySelector('.adv');
advertising.remove();

// Добавляем новую главу в шестую книгу 
const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6'; 
const bookSix = book[2].querySelector('ul');
bookSix.append(newChapter);
const newChapterBookSix = book[2].querySelectorAll('li');
newChapterBookSix[8].after(newChapterBookSix[10]);

// console.log(book);
// console.log(bookTwo);
// console.log(bookFive);
// console.log(newChapterBookSix);
// console.log(bookThreeTitle);