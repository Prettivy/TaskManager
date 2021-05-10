const form = document.getElementById('add-todo-form')
const taskManager = new TaskManager()
console.log(taskManager.tasks)

function check_status(obj) {
    console.log(obj)
  const uid = obj.options[obj.selectedIndex].getAttribute('data-id');
  return uid
}




form.addEventListener('submit', e =>{
    e.preventDefault();
    console.log('submit')

    const nameInput = document.getElementById('todo-name')
    const descriptionInput = document.getElementById('description-text')
    const assignedToInput = document.getElementById('collaborateur')
    const dueDateInput = document.getElementById('date')

    const name = nameInput.value
    const description = descriptionInput.value
    const assignedTo = assignedToInput.value
    const dueDate = dueDateInput.value
    const assignedToId = check_status(assignedToInput)
    console.log('aID : ',assignedToId)

    taskManager.addTask(name,description,assignedTo,dueDate,assignedToId)


    // console.log(taskManager.tasks)
    taskManager.renderTask()
    console.timeEnd("test 1")
    nameInput.value = ''
    descriptionInput.value  = ''
    assignedToInput.value = ''
    dueDateInput.value = ''
})


const validateFormField = data =>{
    try{

    }catch (error){

    }
}