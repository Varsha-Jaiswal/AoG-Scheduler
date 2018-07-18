// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const firebase = require("firebase");
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

var config = {
  apiKey: "xxxxx",
  authDomain: "xxxxx.firebaseapp.com",
  databaseURL: "https://xxxxx.firebaseio.com",
  storageBucket: "xxxxx.appspot.com",
};
firebase.initializeApp(config);
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

//Intent Map function 
//agent is used to give the values back to Assistant. 
function addNewSchedule(agent){
    var time =agent.parameters.a;
    var date =agent.parameters.b;
    var msg = agent.parameters.c;
   
    firebase.database().ref('schedule').push({
        time:time,
        date:date,
        message:msg
    });
    agent.add('Your Schedule for '+msg+' on '+ date +' at '+time +' has added successfully.');
}

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // Custom
  intentMap.set('addSchedule', addNewSchedule);
  
  agent.handleRequest(intentMap);
});
