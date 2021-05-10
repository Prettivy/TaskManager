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

console.time("test 1")
console.time("test 2")


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

const getRightColumn = (status)=>{
    switch (status){
        case "todo":
            return document.getElementById('todo-todo')
        case "inprogress":
            return document.getElementById("todo-inprogress")
        case "review":
            return document.getElementById("todo-review")
        case "done":
            return document.getElementById("todo-done")
    }
}

const createDivButton= (div,column,btn1,btn2)=>{
    div.append(btn1,btn2)
    column.appendChild(div)
}

const createRigthButton = (status,todoColumn,span,deleteFn)=>{
    const divButton = document.createElement("div");
    divButton.classList = "todo-btn d-flex justify-content-around"
    const buttonSupprimer= document.createElement("button")
    buttonSupprimer.classList = "btn btn-outline-danger"
    const buttonNext = document.createElement("button")
    buttonNext.classList = "btn btn-outline-secondary"
    const buttonBack = document.createElement("button")
    buttonBack.classList ="btn btn-outline-secondary"
    buttonSupprimer.innerHTML = '<i class="bi bi-x-circle-fill"></i>'
    buttonNext.innerHTML = '<i class="bi bi-arrow-right-circle-fill"></i>'
    buttonBack.innerHTML = '<i class="bi bi-arrow-left-circle-fill"></i>'
    buttonSupprimer.onclick = ()=>deleteFn()
    switch (status){
        case "todo":
            createDivButton(divButton,todoColumn,buttonSupprimer,buttonNext)
            span.classList.add("bg-danger")
            break
        case "inprogress":
            createDivButton(divButton,todoColumn,buttonBack,buttonNext)
            span.classList.add("bg-warning")
            break
        case "review":
            createDivButton(divButton,todoColumn,buttonBack,buttonNext)
            span.classList.add("bg-primary")
            break
        case "done":
            createDivButton(divButton,todoColumn,buttonBack,buttonSupprimer)
            span.classList.add("bg-success")
            break
    }
}

const createTaskHtml = (name,description,assignedTo,dueDate,assignedToId,idOfTask,status,deleteFn)=>{
    console.log(assignedToId)
    const img = getImgUser(userColor,assignedToId)
    console.log(img)
    const todoLi = document.createElement('li')
    todoLi.addEventListener('click',function(){
        showDetail(idOfTask,name,description,assignedTo,dueDate)
        todoLi.classList.toggle('bg-primary')
    })
    // todoLi.onclick = ()=>deleteFn(idOfTask)
    console.log(status)
    const todoColumn = getRightColumn(status)
    console.log(todoColumn);
    todoLi.classList = 'list-group-item border mt-1'
    todoLi.innerHTML = `
                    <div class="fw-bold mb-3  d-flex justify-content-between ">
                    <h6>${name}</h6> <div class="bg-danger" style="width:25px;height:25px"></div>
                    </div>
                    <img
                      class="mx-1"
                      src="${img}"
                      style="width: 25px; height: 25px"
                    />
                    `
                  
    todoColumn.appendChild(todoLi)
    // St-btn
    const divStBtn= document.createElement("div")
    // divStBtn.classList = "todo-st-btn d-flex justify-content-center" 
    todoLi.appendChild(divStBtn)
    // Span
    const span = document.createElement("span")
    // need to add bg selon le statut
    span.classList = "badge rounded-pill mb-4"
    span.innerHTML = " "
    // divStBtn.appendChild(span)
    createRigthButton(status,divStBtn,span,deleteFn)
    //Ajouter id a div pour les bouton
    // const divButton = document.createElement("div");
    // divButton.id = "todo-btn"
    // const buttonSupprimer= document.createElement("button")
    // const buttonNext = document.createElement("button")
    // buttonSupprimer.innerHTML = "x"
    // buttonNext.innerHTML = ">"
    // buttonSupprimer.onclick = ()=>deleteFn()
    // divButton.append(buttonSupprimer,buttonNext)
    // add button
    // divStBtn.appendChild(divButton)
    // console.log(buttonSupprimer,buttonNext)

    //Créer les élements boutons
    //Faire un onclick sur bouton avec truc fléché car l'élément sinon est appelé trop vite
}
// 


class TaskManager {

    constructor(currentId = 0){
        this.tasks=[];
        this.currentId = currentId;
    }

    addTask(name,description,assignedTo,dueDate,assignedToId,status = 'todo'){
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

    get task(){
        return this.tasks
    }

    removeTask = (id)=>{
        console.log(this)
        const element = this.tasks.find(e=>e.id === id)
        console.log('remove ele: ',element)
        const index = this.tasks.indexOf(element)
        this.tasks.splice(index,1)
        console.log('remove : ',this.tasks)
        this.renderTask()
        console.timeEnd("test 2")
    }
    
    renderTask(){
    // Ajouter des possibilité pour les différents status de la tâche
    const todoColumn = document.getElementById('todo-todo')
    todoColumn.innerHTML ='';
    console.log(this.tasks);
    this.tasks.forEach(e =>createTaskHtml(e.name,e.description,e.assignedTo,e.dueDate,e.assignedToId,e.id,e.status,this.removeTask))
    }
}

let test = new TaskManager()
test.addTask("Test","c'est une test",'Passs','2020-05-06',2,"done")
test.addTask("Test1 blalalalalalalalallaalla","c'est une test",'Passs','2020-05-06',2,"review")
test.addTask("Test2","c'est une test",'Passs','2020-05-06',2)
test.renderTask()

console.log(test.task);
// test.removeTask(2)
// console.log('la',test.task);
