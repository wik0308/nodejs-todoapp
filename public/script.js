const tasksDOM = document.querySelector(".tasks")
const formDOM = document.querySelector(".task-form")
const taskInputDom = document.querySelector(".task-input")
const formAlertDOM = document.querySelector(".form-alert")


const showTasks = async () => {
 try {
  const { data: tasks } = await axios.get("/api/v1/tasks")

  if (tasks.length < 1) {
    // タスクが1つもないとき
    tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
    return;
  }

  const allTasks = tasks.map((task) => {
   const { _id, name, completed } = task

   return `
   <div class="single-task ${completed && "task-completed"}">
     <h5>
       <span>
         <i class="fas fa-check-circle"></i>
       </span>
       ${name}
     </h5>
     <div class="task-links">
       <a href="edit.html?id=${_id}" class="edit-link">
         <i class="fas fa-edit"></i>
       </a>
       <button type="button" class="delete-btn" data-id="${_id}">
         <i class="fas fa-trash"></i>
       </button>
     </div>
  </div>`
  })
  .join("")
  tasksDOM.innerHTML = allTasks
 } catch (err) {
  console.log(err)
 }
}

showTasks()

formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = taskInputDom.value

  try {
    await axios.post("/api/v1/tasks", {name: name })
    formAlertDOM.textContent = "タスクを追加しました"
    formAlertDOM.style.display = "block"
    formAlertDOM.classList.add("text-success")
    showTasks()
    taskInputDom.value = ""
  } catch (err) {
    console.log(err)
    formAlertDOM.innerHTML = "無効です。もう一度やり直してください"
    formAlertDOM.style.display = "block"
    
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none"
    formAlertDOM.classList.remove("text-success")
  }, 3000)
})

tasksDOM.addEventListener("click", async (event) => {
  const element = event.target
  if (element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (err) {
      console.log(err)
    }
  }
})