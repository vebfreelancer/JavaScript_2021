let body = document.querySelector('body');
//класс 
class DomElement {
    constructor(selector, options){
    this.selector = selector;
    options = options || {},
    this.height = options.height;
    this.width = options.width;
    this.bg = options.bg;
    this.fontSize = options.fontSize;
}
   NewElement(n){
        console.log(n);
        let count = n.slice(0, 1);  
            if(count === '.'){
            let div = document.createElement('div');
            div.setAttribute('contenteditable', 'true');
            div.classList.add(`${n}`.slice(1)); 
            this.render (div);
        } else if(count === '#') {
            let paragraph = document.createElement('p');
            paragraph.id = ${n}.slice(1); 
            paragraph.setAttribute('contenteditable', 'true');
            this.render (paragraph);
        }
    }
    render (value){
        value.style.height = ${this.height};
        value.style.width = ${this.width};
        value.style.backgroundColor = ${this.bg};
        value.style.fontSize = ${this.fontSize};
        body.append(value); 
    }
}
//options передаются отдельным объектом
let Square = new DomElement('selector',{height: '50px', width: '300px', bg: '#89899e', fontSize: '25px'});
console.log(Square);
Square.NewElement('#paragraph');





