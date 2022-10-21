// create template
const wrapper = document.createElement('div')
const menu = document.createElement('div')
const field = document.createElement('div')
wrapper.classList.add('wrapper')
field.classList.add('field')
menu.classList.add('menu')
document.body.append(wrapper)
wrapper.append(menu)
wrapper.append(field)

// filed
let blocksNumber = 16;
let side = 4

for(let i=0; i <blocksNumber; i++) {
let div = document.createElement('div')
div.innerHTML = i;
div.classList.add('blcok');
field.append(div)
}

let matrix = document.querySelectorAll