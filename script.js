// UI variables
const form = document.querySelector('#item-form');
const input = document.querySelector('#item');
const itemList = document.querySelector('.item-list');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getItems);

    //Add item event
    form.addEventListener('submit', addItem);

    // Remove item event
    document.body.addEventListener('click', removeItem);
    
    // Clear all
    clearBtn.addEventListener('click', removeAll);

    // Filter items
    filter.addEventListener('keyup', filterItems);
}

// Get Items from Local Storage
function getItems(){
    let items;
    if(localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(item){
        // create li element
        const li = document.createElement('li');
        // create text node and append to li
        li.appendChild(document.createTextNode(item));
        // add class
        li.className = 'item';
        // create link item
        const link = document.createElement('a');
        link.textContent = 'x';
        // add class
        link.className = 'delete-item';
        // append link to li
        li.appendChild(link);

        // append li to ul
        itemList.appendChild(li);
    });
}

// Add Item
function addItem(e){
    if(input.value === ''){
        return;
    }

    // create li element
    const li = document.createElement('li');
    // create text node and append to li
    li.appendChild(document.createTextNode(input.value));
    // add class
    li.className = 'item';
    // create link item
    const link = document.createElement('a');
    link.textContent = 'x';
    // add class
    link.className = 'delete-item';
    // append link to li
    li.appendChild(link);

    // append li to ul
    itemList.appendChild(li);

    // store in local storage
    storeItemInLocalStorage(input.value);

    // clear input
    input.value = '';

    e.preventDefault();
}

// Store Item
function storeItemInLocalStorage(item){
    let items;
    if(localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(item);

    localStorage.setItem('items', JSON.stringify(items));
}

// Remove Item
function removeItem(e){
    if(e.target.classList.contains('delete-item')){

        const val = e.target.parentElement.firstChild.textContent;

        e.target.parentElement.remove();

        // Delete from local storage
        deleteItemFromLocalStorage(val);
    }
}

// Delete Item from LS
function deleteItemFromLocalStorage(val){
    let items;
    if(localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(item, index){
        if(item === val) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}

// Remove All
function removeAll(){
    if(confirm('are you sure?')){
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild);
        }
        localStorage.clear();
    }
}

// Filter Items
function filterItems(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(function(item){
        
        if(item.firstChild.textContent.toLowerCase().indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}