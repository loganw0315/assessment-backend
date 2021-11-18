let form = document.getElementById('lifeGoals')
let goalInput = document.querySelector('input');
let submitBtn = document.getElementById('submit');
let goals = document.querySelector('ul')


//Get compliment
document.getElementById("complimentButton").onclick = function () {
    axios.get(`/api/compliment/`)
        .then(function (response) {
          const data = response.data;
          document.querySelector('h1').textContent = data;
        });
};
//Get fortune
document.getElementById("fortuneButton").onclick = function () {
    axios.get(`https://loganwillis.herokuapp.com/api/fortune/`)
        .then(function (response) {
          const data = response.data;
          document.querySelector('h1').textContent = data;

        });
};
//Get life goal suggestion
document.getElementById("suggestGoalButton").onclick = function () {
    axios.get(`https://loganwillis.herokuapp.com/api/lifegoal/`)
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};




let videoViewer = document.getElementById('video')


//Change displayed video via drop down
document.getElementById("videoList").onchange = function (event) {
  event.preventDefault()
  let videoSelector = document.querySelector("#videoList")
  let selectedVideo = videoSelector.options[videoList.selectedIndex].text
  let video = "";
  if(selectedVideo === 'Never Give Up'){
    video = 'https://www.youtube.com/embed/KxGRhd_iWuE'
  } else if(selectedVideo === 'Just Do It'){
    video = 'https://www.youtube.com/embed/ZXsQAXx_ao0'
  } 

  videoViewer.src = video
    
}



//Fill goals list
const getGoals = () => {
  axios.get(`https://loganwillis.herokuapp.com/api/goals/`)
    .then(res => {
      console.log(res.data);
      goals.innerHTML = ''
      
      for(let i = 0; i < res.data.length; i++){
        let newGoal = document.createElement('li');
        let goal = document.createElement('span')
        let deleteBtn = document.createElement('button');
        let editBtn = document.createElement('button');
        editBtn.className = "editBtn"
        newGoal.appendChild(goal);
        newGoal.appendChild(deleteBtn);
        newGoal.appendChild(editBtn);
        goal.textContent = res.data[i].text
        deleteBtn.textContent = "X";
        editBtn.textContent = "Edit";
        newGoal.id = res.data[i].id
        goals.appendChild(newGoal)
        deleteBtn.addEventListener('click', deleteGoal)
        editBtn.addEventListener('click', editGoal)
      }
      if(res.data.length > 0){
        goals.id = "goalsList"
      } else{
        goals.id = ""
      }
    })

}

//Add new goal
const addGoal = (e) => {
  e.preventDefault()
  let addedGoal = {
    text: goalInput.value
  }
  axios.post(`https://loganwillis.herokuapp.com/api/goals/`, addedGoal)
    .then(res => {
      console.log(res);
      getGoals()
    })
  
  goalInput.value = "";
}
//Delete a goal
const deleteGoal = (event) => {
    event.preventDefault()
    let id = event.target.parentNode.id
    axios.delete(`https://loganwillis.herokuapp.com/api/goals/${id}`)
      .then(res => {
        getGoals()
      })
  
}

//Edit a goal
const editGoal = (event) => {
  event.preventDefault()
  event.target.id = 'editBtn'
  let editBtn = document.getElementById('editBtn');
  editBtn.addEventListener('click', formReset)
  form.removeEventListener('submit', addGoal)
  form.id = "lifeGoalEdit"
  let editForm = document.getElementById('lifeGoalEdit')
  submitBtn.textContent = "Update Goal"
  submitBtn.id = event.target.parentNode.id
  goalInput.placeholder = "Edit Life Goal"
  editBtn.textContent = "Cancel Edit"
  editForm.addEventListener('submit', updateGoal)
}

const formReset = (event) => {
  event.preventDefault()
  let editBtn = document.getElementById('editBtn');
  let editForm = document.getElementById('lifeGoalEdit')
  editBtn.removeEventListener('click', formReset);
  goalInput.value = ""
  submitBtn.textContent = "Add Goal"
  goalInput.placeholder = "Enter your Life Goals"
  editForm.id = "lifeGoals"
  editForm.removeEventListener('submit', updateGoal)
  form.addEventListener('submit', addGoal);
  editBtn.textContent = "Edit"
}

const updateGoal = (event) => {
  event.preventDefault()

  let editForm = document.getElementById('lifeGoalEdit')
  let changeGoal = {
    id: submitBtn.id,
    text: goalInput.value
  }
  console.log(submitBtn.id);
  if(changeGoal.text.length > 0){
  axios.put(`https://loganwillis.herokuapp.com/api/goals/${changeGoal.id}`, changeGoal)
    .then(res => {
      getGoals()
    })
  }
  goalInput.value = ""
  submitBtn.textContent = "Add Goal"
  goalInput.placeholder = "Enter your Life Goals"
  editForm.id = "lifeGoals"
  editForm.removeEventListener('submit', updateGoal)
  form.addEventListener('submit', addGoal);
  editBtn.textContent = "Edit"
  editBtn.addEventListener('click', formReset)
}


form.addEventListener('submit', addGoal);
getGoals()

