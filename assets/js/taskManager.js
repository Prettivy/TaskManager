const userColor = [
    {
        id:1,
        name: "Prettivy O.",
        img:`assets/img/abstract-user-flat-4.svg`,
    },
    {
        id:2,
        name: "Antoine R.",
        img:`./assets/img/user-icon_green.svg`,
    },
    {
        id:3,
        name: "Clément E.",
        img:`./assets/img/user-icon_red.svg`,
    },
    {
        id:4,
        name: "Xinyu X.",
        img:`./assets/img/user-icon_blue.svg`,
    }
]


const getImgUser = (userColor,id) =>{
    for(let user of userColor){
        if(user.id === +id){
            return user.img
        }
    }
}

const showDetail = (id,name,description,assignedTo,dueDate)=>{
    const cardHeader = document.getElementById('todo-title')
    const cardDescription = document.getElementById('todo-description')
    const cardDate = document.getElementById('todo-date')
    cardHeader.innerHTML = name
    cardDescription.innerHTML = description
    cardDate.innerHTML = `Date de fin : ${dueDate}`
}

const supprimer = (id)=>{

}


const createTaskHtml = (name,description,assignedTo,dueDate,assignedToId,idOfTask,status)=>{
    console.log(assignedToId)
    const img = getImgUser(userColor,assignedToId)
    console.log(img)
    const todoLi = document.createElement('li')
    todoLi.addEventListener('click',function(){
        showDetail(idOfTask,name,description,assignedTo,dueDate)
        todoLi.classList.toggle('bg-primary')
    })
    todoLi.classList = 'list-group-item d-flex justify-content-between align-items-start rounded-2 border'
    todoLi.innerHTML = `<div class="ms-2 me-auto">
                    <div class="fw-bold mb-3">${name}</div>
                    <img
                      class="mx-1"
                      src="${img}"
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div class="ms-2 d-flex flex-column justify-content-around">
                    <span class="badge bg-danger rounded-pill mb-4"> </span>
                    <div class="button">
                      <button onclick="supprimer()">x</button><button onclick="next()">></button>
                    </div>
                  </div>`
    const todoColumn = document.getElementById('todo-todo')
    todoColumn.appendChild(todoLi)

}




class TaskManager {

    constructor(currentId = 0){
        this.tasks=[];
        this.currentId = currentId;
    }

    addTask(name,description,assignedTo,dueDate,assignedToId,status = 'TODO'){
        this.currentId++;
        this.tasks.push({
            id: this.currentId,
            name,
            description,
            assignedTo,
            dueDate,
            assignedToId,
            status
        })
    }

    getTask(){
        return this.tasks
    }

    removeTask(id){
        this.tasks.splice(id-1,1)
        this.renderTask()
    }
    
    renderTask(){
    const todoColumn = document.getElementById('todo-todo')
    todoColumn.innerHTML ='';
    this.tasks.forEach(e =>createTaskHtml(e.name,e.description,e.assignedTo,e.dueDate,e.assignedToId,e.id,e.status))
    }
    
    renderSelectedTask(){

    }

}

