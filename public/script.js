let inputt = document.querySelector("input")
let button = document.querySelector(".submit")
let tasks_list = document.querySelector(".tasks")
let priority_high = document.querySelector(".H")
let priority_medium = document.querySelector(".M")
let priority_low = document.querySelector(".L")
let pop_sound = document.querySelector("#myAudio")

// url for getting the data from the database and entering data to the data base.
let Url = "https://todo-list-g.herokuapp.com/"

//default priority is low
let priority_of_task = "Low"


// function to reuse the code and pty is priority
function set_priority(pty_1,pty_2,pty_3,pty_text){
    pty_1.addEventListener("click",()=>{
        pty_1.classList.add("active")
        pty_2.classList.remove("active")
        pty_3.classList.remove("active")
        priority_of_task = pty_text
    })
}
set_priority(priority_high,priority_low,priority_medium,"High")
set_priority(priority_medium,priority_low,priority_high,"Medium")
set_priority(priority_low,priority_high,priority_medium,"Low")



let tasks
button.addEventListener("click", submit)



// onload of the page we get the previous tasks data from db
async function get_tasks_onload(){
    let response = await fetch(`${Url}/api/tasks`)
    tasks = await response.json()
    add_tasks(tasks)
}


// adds tasks to the page on submitting
function add_tasks(data){
    data.forEach(element => {
        let t= document.createElement("ul")
        let but = document.createElement("button")
        but.className = "delete"
        but.innerText = "Del"
        but.addEventListener("click", ()=>{
            pop_sound.play()
            const options = {
                method: 'DELETE'
            }
            fetch(`${Url}api/del/${element._id}`,options)
            setTimeout(()=>t.remove(), 10)
            
        })
        t.classList.add("task")
        t.classList.add(element.priority)
        t.innerHTML = `<span class="task_pty ${element.priority[0]}">${element.priority[0]}</span> ${element.title}` 
        tasks_list.append(t)
        t.append(but)
    });
}

// on submitting the task
async function submit (){
    if(inputt.value==""){
        alert("Blank task is not valied")
        return
    }
    let data = {
        title:inputt.value,
        priority:priority_of_task,
        isDone: false
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let re = await fetch(`${Url}api/add`,options)
    data = await re.json()
    inputt.value = ""
    add_tasks([data])
}
