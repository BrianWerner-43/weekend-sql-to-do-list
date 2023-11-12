console.log('JS is sourced!');

getTask();

// Create a GET function to get data from the server(call the render function in .then)
function getTask() {
  
  // axios call to the server to get todos
  axios({
    method: 'GET',
    url: '/todos'
  }).then((response) => {
    console.log('GET /todos:', response.data);
    renderTask(response.data);
  }).catch((error) => {
    console.log('error with GET:', error);
  })

};// End of getTask

// Create a submit function that has a POST route to send a request and recieve a response.(aka submit button)
// call the get function in .then
function submitTask(event) {
    event.preventDefault();
    let taskToDo = document.getElementById('todoItem').value;
    // let completeTask = document.getElementById('isComplete').value;
    document.getElementById('todoItem').value = '';
    // document.getElementById('isComplete').value = '';

    axios({
      method: 'POST',
      url: '/todos',
      data:
      {
        taskToDo: taskToDo,
        // completeTask: completeTask
        
      }
    }).then(function(response) {
      console.log('POST /todos is getting a response:');
      getTask();
    }).catch(function(error) {
      console.log('error in POST:', error);
    })
};// End of submitTask

// Render function to append the taksk table to the DOM
function renderTask(tasks) {
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  console.log('In renderTask');
  

  for(let task of tasks) {
    console.log(task.text);
    taskList.innerHTML +=
    `<tr data-todoid = "${task.id}">
        <td data-testid="toDoItem" class= ${task.isComplete ? "completed" : "not-complete"}>

        <button data-testid="completeButton"
        class="completed" onclick="updateTask(event)">Complete</button>${task.text}
        <button data-testid="deleteButton" onclick="deleteTask(event)">Delete</button></td>
        <td>${task.isComplete}</td>
      </tr>
        
      
    `
    // if(task.isComplete) {
    //   document.getElementById(task.id).classList.add("completed");
    // }
    // console.log('Did class change?');
  }
}


// Create a update function that is connected to a PUT route to update the database
function updateTask(event) {
  let taskId = event.target.closet("tr").getAttribute("data-taskid");
  console.log('In updateTask:', taskId);
  axios({
    method: 'PUT',
    url: `todos/${taskId}`
  }).then((response) => {
    console.log('Task by id', response);
    getTask();
  }).catch((error) => {
    console.log('error with PUT:', error)
  })
};


// Delete function that deletes the task from the DOM and database


