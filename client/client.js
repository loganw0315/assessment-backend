let form = document.getElementById('lifeGoals')
let goalInput = document.querySelector('input');

//Get compliment
document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          document.querySelector('h1').textContent = data;
        });
};
//Get fortune
document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
        .then(function (response) {
          const data = response.data;
          document.querySelector('h1').textContent = data;

        });
};
//Get life goal suggestion
document.getElementById("suggestGoalButton").onclick = function () {
    axios.get("http://localhost:4000/api/lifegoal/")
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


let goals = document.querySelector('ul')
//Fill goals list
const getGoals = () => {
  axios.get('http://localhost:4000/api/goals/')
    .then(res => {
      console.log(res.data);
      goals.innerHTML = ''
      
      for(let i = 0; i < res.data.length; i++){
        let newGoal = document.createElement('li');
        let goal = document.createElement('span')
        let deleteBtn = document.createElement('button');
        newGoal.appendChild(goal);
        newGoal.appendChild(deleteBtn);
        goal.textContent = res.data[i].text
        deleteBtn.textContent = "X";
        newGoal.id = res.data[i].id
        goals.appendChild(newGoal)
        deleteBtn.addEventListener('click', deleteGoal)
        goal.addEventListener('click', editGoal)
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

  axios.post('http://localhost:4000/api/goals/', addedGoal)
    .then(res => {
      getGoals()
    })
  
  goalInput.value = "";
}
//Delete a goal
const deleteGoal = (event) => {
    event.preventDefault()
    let id = event.target.parentNode.id
    axios.delete(`http://localhost:4000/api/goals/${id}`)
      .then(res => {
        getGoals()
      })
  
}

//Edit a goal
const editGoal = (event) => {
  event.preventDefault()
  let changeGoal = {
    id: event.target.parentNode.id,
    text: goalInput.value
  }
  if(changeGoal.text.length > 0){
  axios.put(`http://localhost:4000/api/goals/${changeGoal.id}`, changeGoal)
    .then(res => {
      getGoals()
    })
  }
  goalInput.value = ""
}


form.addEventListener('submit', addGoal);
getGoals()

