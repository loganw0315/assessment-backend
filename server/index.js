const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.
app.use(express.static('client'))
app.use(express.static(path.join(__dirname, 'client/client.js')))

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '../index.html'))
})

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '358a3f023ac241b5aeb566eebed4882c',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.log('Hello World')

//Compliments
app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];
  rollbar.info('Someone asked for a compliment')
  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});
//Fortunes
app.get("/api/fortune", (req, res) => {
  const fortunes = ["A friend asks only for your time not your money.", "A person of words and not deeds is like a garden full of weeds.", "Adventure can be real happiness.", "Advice, when most needed, is least heeded.", "Believe in yourself and others will too."];
  rollbar.info('Someone asked for a fortune')
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
});
//Life goal suggestion
app.get("/api/lifegoal", (req, res) => {
  const goals = ["Drive your dream car", "Eat healthy", "Climb a mountain", "Learn to play an instrument", "Read 100 books"];
  // rollbar.info('Someone asked for a life goal')
  let randomIndex = Math.floor(Math.random() * goals.length);
  let randomGoal = goals[randomIndex];

  res.status(200).send(randomGoal);
});

//Life goal list
let goals = [];
let goalId = 0;
//Fill life goal list


app.get(`/api/goals`, (req, res) => {
  res.status(200).send(goals)
  rollbar.info('Goals were retrieved from server')
})
//Add new goal
app.post(`/api/goals`, (req, res) => {
  let {text} = req.body
  rollbar.info('A new goal was added')
  let addedGoal = {
    id: goalId,
    text
  }
  goals.push(addedGoal)
  res.status(200).send(addedGoal)
  goalId++
})
//Edit goal
app.put(`/api/goals/:id`, (req, res) => {
  let {id} = req.params
  let {text} = req.body
  let index = goals.findIndex(e => +e.id === +req.params.id)
  goals[index].text = text
  res.status(200).send(goals[+id])
  rollbar.info('A goal was edited')
})
//Remove goal
app.delete(`/api/goals/:id`, (req, res) => {
  let index = goals.findIndex(e => +e.id === +req.params.id)
  deletedGoal = goals.splice(index, 1)
  res.status(200).send(deletedGoal)
  rollbar.info('A goal was deleted')
})

const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
})