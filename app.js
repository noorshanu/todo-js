// let x = 2;
// let y = 8;
// let z = y + x;

// document.getElementById("total").innerHTML = z;

// const cars = { name: "bmw", color: "red", price: 500 }
// document.getElementById("cars").innerHTML = cars.name + "<br>" + cars.color;

// console.log(z);

// //functions


// let noor = (a, b) => {
//     return document.getElementById("fun").innerHTML = a + b;

// }

// let dated = () => {
//     document.getElementById("date").innerHTML = Date();
// }

// function sub() {
//     return document.getElementById("submit").innerHTML = "submitted";
// }


// let a = prompt("Enter a number: ");

// if (a % 2 == 0) {
//     document.getElementById("even").innerHTML = "this is a even nummber";

// } else {
//     document.getElementById("even").innerHTML = "this is odd nummber";
// }


// const prom = new Promise(function(myResolve, myReject) {
//     setTimeout(function() {
//         myResolve("i love you");

//     }, 3000);

// });

// prom.then(function(value) {
//     document.getElementById("promi").innerHTML = value;

// })

// const imgPro = new Promise(function(myResolve, myReject) {
//     setTimeout(function() {
//         myResolve("<img src='logo.jpg'>");

//     }, 2000)

// });
// imgPro.then(function(value) {
//     document.getElementById("imgp").innerHTML = value;

// })

//todo
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
// const filterOption = document.querySelector('.filter-todo');

//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//function
function addTodo(event) {
    //prevent from submitting
    event.preventDefault();

    //todo div
    const todoDive = document.createElement('div');
    todoDive.classList.add("todo");

    //create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDive.appendChild(newTodo);

    saveTodos(todoInput.value);

    //buttons check
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fa-regular fa-check'></i>";
    completedButton.classList.add('complete-btn')
    todoDive.appendChild(completedButton);

    //buttons trash

    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fa-regular fa-trash-can'></i>";
    trashButton.classList.add('trash-btn');
    todoDive.appendChild(trashButton);

    //append todo list
    todoList.appendChild(todoDive);
    //clear input value
    todoInput.value = "";


}

function deleteCheck(e) {
    const item = e.target;

    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();

        })


    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")


    }

}

// function filterTodo(e) {
//     const todoS = todoList.childNodes;
//     todoS.forEach(function(todo) {
//         switch                      (e.target.value) {
//             case "all":
//                 // todo.style.display = 'flex';
//                 break;

//             case "completed":
//                 if (todo.classList.contains('completed')) {
//                     // todo.style.display = 'flex';

//                 } else {
//                     // todo.style.display = "none";
//                 }
//                 break;

//             case "uncompleted":
//                 if (!todo.classList.contains('completed')) {
//                     // todo.style.display = "flex";
//                 } else {
//                     // todo.style.display = "none";
//                 }


//         }

//     });
// }

function saveTodos(todo) {
    //check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //todo div
        const todoDive = document.createElement('div');
        todoDive.classList.add("todo");

        //create li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDive.appendChild(newTodo);



        //buttons check
        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class='fa-regular fa-check'></i>";
        completedButton.classList.add('complete-btn')
        todoDive.appendChild(completedButton);

        //buttons trash

        const trashButton = document.createElement('button');
        trashButton.innerHTML = "<i class='fa-regular fa-trash-can'></i>";
        trashButton.classList.add('trash-btn');
        todoDive.appendChild(trashButton);

        //append todo list
        todoList.appendChild(todoDive);

    })

}

function removeTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}