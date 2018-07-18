# AoG-Scheduler

## How to make Logic?
1) Create a new Intent name: `addSchedule`.
2) Under Training phrases type: `add schedule on 5th July for yourmessage at yourTime ` and Change the parameters name: `a` b` and `c`.
3) Then go to Fulfillment session under intent. and `Enable webhook call for this intent`.
4) Now go to Fulfillment menu undersidebar and `Enable` the `Inline Editor`.
6) Define `intentMap.set('YourIntentName', FunctionsName)` Functions. For example in this intent I'm using 

    ```js  
        intentMap.set('addSchedule', addNewSchedule);
    ```
7) Create a function named 'addTwoNumbers'.
    ```js
     function addNewSchedule(agent){
          var time =agent.parameters.a;
          var date =agent.parameters.b;
          var msg = agent.parameters.c;

          firebase.database().ref('schedules').push({
              time:time,
              date:date,
              message:msg
          });
          agent.add('Your Schedule for '+msg+' on '+ date +' at '+time +' has added successfully.');
      }
    ```
 8) Add `const firebase = require("firebase");`
 9) Add `"firebase ":"*"` in dependencies.
 10) Add Firebase key in `index.js` file.
 10) Click on Deploy Button and Test it.


### Developed By Varsha Jaiswal & Sonakshi Shukla
