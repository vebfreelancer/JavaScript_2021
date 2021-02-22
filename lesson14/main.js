'use strict';

let body = document.querySelector('body');
//класс
function DomElement(selector, options){
    this.selector = selector;
    options = options || {},
    this.height = options.height;
    this.width = options.width;
    this.bg = options.bg;
    this.fontSize = options.fontSize;
}

DomElement.prototype.render =  function(){
    let count = this.selector.slice(0, 1);  
    if(count === '.'){
        // console.log(this.selector.slice(0, 1));
        this.newElement('div');  
    }else if(count === '#'){
        this.newElement('p');  
    }
};

DomElement.prototype.newElement =  function(value){
    // console.log(value);
    let el = document.createElement(`${value}`);
        el.setAttribute('contenteditable', 'true');
        el.classList.add(this.selector.slice(1));  
        el.style.height = `${this.height}`;
        el.style.width = `${this.width}`;
        el.style.backgroundColor = `${this.bg}`;
        el.style.fontSize = `${this.fontSize}`;
        body.append(el); 
};

//options передаются отдельным объектом
let Square = new DomElement('.block',{height: '50px', width: '300px', bg: '#89899e', fontSize: '25px'});
// console.log(Square);

Square.render();
// console.log(Square instanceof DomElement);





