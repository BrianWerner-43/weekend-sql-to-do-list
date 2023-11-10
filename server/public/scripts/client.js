console.log('JS is sourced!');

// Create a GET function to get data from the server(call the render function in .then)
function getTask() {
  
  // axios call to the server to get todos
  axios({
    method: 'GET',
    url: '/todos'
  }).then((response) => {
    console.log('In the then function');
  })

};// End of getTask

// Create a submit function that has a POST route to send a request and recieve a response.(aka submit button)
// call the get function in .then
function submitTask(event) {
    
};

// Create a update function that is connected to a PUT route to update the database

// Delete function that deletes the task from the DOM and database

// Render function to append the taksk table to the DOM
