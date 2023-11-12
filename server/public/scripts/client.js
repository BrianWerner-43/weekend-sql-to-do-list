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
    document.getElementById('todoItem').value = '';
    

    axios({
      method: 'POST',
      url: '/todos',
      data:
      {
        taskToDo: taskToDo    
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
  
  // looping through task and append a complete and delete buttons
  for(let task of tasks) {
    taskList.innerHTML +=
    `<tr data-todoid = "${task.id}">
        <td data-testid="toDoItem" class= ${task.isComplete ? "completed" : "not-complete"} >
        <button data-testid="completeButton"
        class="completed" onclick="updateTask(event)">Complete</button>${task.text}

        <button data-testid="deleteButton" onclick="deleteTask(event)"><span>Delete</span></button></td>
     <td>${task.isComplete}</td>
     </tr>
        
      
    `
   
  }
}; // End of renderTask


// Create a update function that is connected to a PUT route to update the database
function updateTask(event) {
  let todoId = event.target.closest("tr").getAttribute("data-todoid");
  console.log('In updateTask:', todoId);
  axios({
    method: 'PUT',
    url: `todos/${todoId}`
  }).then((response) => {
    console.log('Task by id');
    getTask();
  }).catch((error) => {
    console.log('error with PUT:', error)
  })
};// End of updateTask


// Delete function that deletes the task from the DOM and database
function deleteTask(event) {
  let todoId = event.target.closest("tr").getAttribute("data-todoid");
  console.log('In deleteTask:', todoId);
  

  axios({
    method: 'DELETE',
    url: `/todos/${todoId}`
  }).then((response) => {
    getTask();
  }).catch((error) => {
    console.log('DELETE /todos/:id fail:', error);
  })

};// End of deleteTask

