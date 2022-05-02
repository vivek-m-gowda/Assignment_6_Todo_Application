//getting all the requriment elemnts
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>
{
    let userData = inputBox.value; //getting user entered values
    if(userData.trim() != 0) //is user values aren't only spaces
    {
        addBtn.classList.add("active"); //active the add button
    }
    else
    {
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks(); //calling showtask function


//if user clicked on add button
addBtn.onclick = ()=>
{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) //if localstorage is null
    {
        listArr = []; //creating blank array
    }
    else
    {
        listArr = JSON.parse(getLocalStorage); //transforming js string into js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into js string
    showTasks(); //calling showtask function
    addBtn.classList.remove("active");
}

//function to add task list inside ul
function showTasks()
{
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) //if localstorage is null
    {
        listArr = []; //creating blank array
    }
    else
    {
        listArr = JSON.parse(getLocalStorage); //transforming js string into js object
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //parsing the length value is pendingNumb
    if(listArr.length > 0)//if array length is gretter than 0
    {
        deleteAllBtn.classList.add("active"); //active the clearall button
    }
    else
    {
        deleteAllBtn.classList.remove("active");//unactive the clearall button

    }
    let newLiTag = '';
    listArr.forEach((element, index) =>
    {
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value=""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index)
{
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into js string
    showTasks(); //calling showtask function
}

//delete all the tasks function
deleteAllBtn.onclick = ()=>
{
    listArr = [];   //empty an array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into js string
    showTasks(); //calling showtask function
}