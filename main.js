'use strict';
(function (){
class EditableList extends HTMLElement {
    constructor(){
    super();
    const shadow = this.attachShadow({mode:'open'});
    const container = document.createElement('div');
    container.classList.add('editable-list');

    const title = this.title
    const addItemText = this.addItemText
    const listItems = this.items
    
    container.classList.add('editable-list');

    container.innerHTML = `
     <style>

     li, div > div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        border-bottom: 1px solid #ccc;
     }
    .icon{
        cursor: pointer;
        color: #fff;
        font-size: 1.3rem;} 
     </style>
     <h3>${title}</h3>
     <ul class="item-list">

     ${listItems.map(item => `

        <li>${item}
        <button class= "editable-list-remove-item icon">&ominus;</button>
        </li>

     `).join('')} 
    </ul>
    <div>
        <label>${addItemText}</label>
        <input class="add-new-list-item-input" type="text">
        <button class="editable-list-add-item icon">&oplus;</button>
    </div>
    `
    this.addListItem = this.addListItem.bind(this);
    this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    shadow.appendChild(container);
     }


    connectedCallback(){
        const removeButtons = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')];
        const addButton = this.shadowRoot.querySelector('.editable-list-add-item');
        this.itemList = this.shadowRoot.querySelector('.item-list');

        this.handleRemoveItemListeners(removeButtons);
        addButton.addEventListener('click', this.addListItem);
    }

    get title(){
        return this.getAttribute('title') || '';
    }

    get addItemText(){
        return this.getAttribute('add-item-text') || '';
    }

    get items (){

        const items = [];
        [...this.attributes].forEach(attr => {
            if(attr.name.includes('list-item')){
                items.push(attr.value);
            }
        });
        return items;
    }

    addListItem(e){
        const input = this.shadowRoot.querySelector('.add-new-list-item-input');
        if (input.value){
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.textContent = input.value;
            button.classList.add('editable-list-remove-item', 'icon');
            button.innerHTML = '&ominus;';
            this.itemList.appendChild(li);
            li.appendChild(button);
            this.handleRemoveItemListeners([button]);
            input.value = '';

        }
    }

    handleRemoveItemListeners(buttons){
        buttons.forEach(btn => {
            btn.addEventListener('click', this.removeListItem);
     } );

    }

    removeListItem(e){
        e.target.parentNode.remove();
    }
    
}
customElements.define('editable-list', EditableList);
})();