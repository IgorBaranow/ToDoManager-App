const listElement = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const clearButton = document.getElementById('clear-button');
let todos = [];

function updateTodosUI() { // by this function basically I create HTML elements and then assign values from my list of objects and then append this element to HTML, basically create li with custom data from object and append it to ul
    listElement.innerHTML = "";

    for (let todo of todos) {
        const span = document.createElement('span');  //create span element where I place text, like in HTML, here I creating the same element but by pieces.
        span.innerText =  todo.text;  // assign text value from my object were I store todo to created span. to get <span>text</span>
        const checkbox = document.createElement('input');  // creating input to have these squeres (checkbox)
        checkbox.setAttribute('type', 'checkbox')  // actually here I change standard input created above to type checkbox
        checkbox.checked = todo.isCompleted; // it changes status of my checkbox, checked or not. if isCompleted in my object is true, then checkbox will have checked state.
        checkbox.dataset.todoId = todo.id;  // add attribute with value from Date.now() to have a unick id
        checkbox.classList.add('checkbox'); // add this class to be sure lately that I am matches exactly this element with class checkbox

        const todoLiElement = document.createElement('li'); // create li element, where I place my span and checkbox already created.
        if (todo.isCompleted) {
            todoLiElement.classList.add('checked');  // if my task is completed and also wanna change style to have crossed line by adding class with this style
        }
        todoLiElement.append(checkbox);  // add created checkbox to created li to get exactly the same element as in HTML
        todoLiElement.append(span); // the same add span to created li

        listElement.append(todoLiElement); // listElement is my whole list ul which I got by id 'todo-list' and to this ul(listElement) I wanna add li(todoLiElement).
    }
}

listElement.addEventListener('click', (event) => {
    if(event.target.matches('input.checkbox')) {
        console.log(event.target.checked);
        const todoIndex = todos.findIndex(todo => todo.id == event.target.dataset.todoId);
        todos[todoIndex] = {...todos[todoIndex], isCompleted: event.target.checked};
        event.target.parentElement.classList.toggle('checked');
    };
})

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();   // to make sure that my page is not reloading each time i submit the form
    const todoInput = document.getElementById('todo-text'); // assigning whole html element with id todo-text to this const to be able later use value of this const by --- this const.value. I use it later during pushing text to new object

    if (!todoInput.value) {
        alert('You can not add an empty TODO!');
        return;
    }

    todos.push({ id: Date.now(), text: todoInput.value, isCompleted: false});
    todoInput.value = ""; // after I added value to the object and this object to list with my todos, Here I make this value empty to have clean field with text after submitting
    updateTodosUI();   // I by submitting this form I add new todo to my list with objects, but my UI is not updated. So each time after adding new object I have to call this function to update UI.
});

clearButton.addEventListener('click', () => {
    todos = [];
    updateTodosUI();
})

