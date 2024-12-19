import {v4 as uuidV4 } from 'uuid' 

type Task = { 
  id: string , 
  title : string , 
  complete : boolean , 
  createdAt : Date 
}

const list = document.querySelector<HTMLUListElement>("#list") 
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const btn = document.querySelector<HTMLButtonElement>("#bttn")
const input = document.querySelector<HTMLInputElement>("#new-task-title") 

const loadtasks = () : Task[] => { 
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}

const tasks : Task[]  = loadtasks() 
tasks.forEach(addlistitem)

form?.addEventListener("submit", (e) =>{
  e.preventDefault() ; 
  console.log(input?.value) 

  if(input?.value == "" || input?.value == null ){
    console.log("error")
    return ; 
  }
  console.log("run2") 
  const newTask : Task  = {
    id : uuidV4() ,
    title : input.value , 
    complete : false , 
    createdAt: new Date()
  }

  tasks.push(newTask)
  saveTasks() 

  addlistitem(newTask)


  input.value = "" ; 
})

function saveTasks() {
  localStorage.setItem("TASKS",JSON.stringify(tasks)) 
}

function addlistitem(task : Task ){
  const item = document.createElement('li') 
  const label = document.createElement('lable') 
  const checkbox = document.createElement('input') 

  checkbox.type = 'checkbox'  
  checkbox.addEventListener("change", () => {
    task.complete = checkbox.checked
    saveTasks()
  })
  checkbox.checked = task.complete 
  label.append(checkbox,task.title) 
  item.append(label) 
  list?.append(item) 
}

