// selectors
let todoInput = document.querySelector(".todo-input")
let todoButton = document.querySelector(".todo-button")
let todoList = document.querySelector(".todo-list")
let todoPriority = document.querySelector(".priority-todo")
let pop_sound = document.querySelector("#myAudio")

let url = "https://todo-list-g.herokuapp.com/"

todoButton.addEventListener("click", sendDataToDb)

// functions
function deleteTodo(todo, data){
    todo.classList.add("fall")
    pop_sound.play()
    todo.addEventListener("transitionend", ()=>{
        todo.remove();
    })
    const options = {
        method: 'DELETE'
    }
    fetch(`${url}api/del/${data._id}`,options)
}

function checkTodo(e){
    let item = e.target
    const todo = item.parentElement
    todo.classList.toggle("completed");
}

// onload of the page we get the previous tasks data from db
async function get_tasks_onload(){
    let response = await fetch(`${url}api/tasks`)
    tasks = await response.json()
    addTodo(tasks)
}


function addTodo(data){
    data.forEach(element => {
        // todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
    
        // priority
        const priority = document.createElement("div")
        priority.innerHTML = '<i class="fas fa-circle"></i>'
        priority.classList.add("priority")
        priority.classList.add(element.priority)
        todoDiv.appendChild(priority)
    
        // create li
        const newTodo = document.createElement("li")
        newTodo.innerText = element.title
        newTodo.classList.add("todo-item")
        newTodo.addEventListener("click", checkTodo)
        todoDiv.appendChild(newTodo);
    
        // creating delete buttons
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add("delete-btn")
        todoDiv.appendChild(deleteButton)
        // adding event listner to delete
        deleteButton.addEventListener("click", function() { deleteTodo(todoDiv,element); } )
    
        // appending div to list
        todoList.appendChild(todoDiv)
        if(element.isDone){    
        todoDiv.classList.toggle("completed");
        }
    });

}

async function sendDataToDb(event){
    // prevent form from submitting
    event.preventDefault();

    // check for invalid inputs and null cases to prevent error.
    if(todoPriority.value=="none" || todoInput.value==""){
        if(todoPriority.value=="none"){
            alert("priority cannot be none. select a priority level")
        }else{
            alert("Input cannot be empty")
        }
        return
    }

    // setting all the data into a object
    let data = {
        title:todoInput.value,
        priority:todoPriority.value,
        isDone: false
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let re = await fetch(`${url}api/add`,options)
    data = await re.json()
    todoInput.value = ""
    addTodo([data])
}
