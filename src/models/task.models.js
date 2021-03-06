const CurrentHours = require('./currentHours.models.js');
const Utils = require('../utilities/utils.js');

const time = 1000; // How much miliseconds is 1 second;
var cron;
/* var hh = 0;
var mm = 0;
var ss = 0; */

class Task {
  constructor(data){
    if(typeof(data) !== 'undefined'){
      this.uid = data.uid;
      this.name = data.name;
      this.description = data.description;
      this.ownerUid = data.ownerUid;
      this.projectOwner = data.projectOwner;
      this.currentHours = new CurrentHours(data.currentHours);

    } else {
      this.uid = data;
      this.name = data;
      this.description = data;
      this.ownerUid = data;
      this.projectOwner = data;
      this.currentHours = new CurrentHours(data.CurrentHours);
    }
  }

  startTimer(){
    timerStarter();
  }

  stopTimer(){
    timerStoper();
  }

  printHours(){
    var {hh, mm, ss} = this.currentHours;
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;
    return (hh + ':' + mm + ":" + ss)
  }
}

function timerStarter(currentHours){
  cron = setInterval(timer(currentHours), time);
}

function timerStoper(){
  clearInterval(cron);
}

function timer(currentHours){
  currentHours.seconds++;
  if (currentHours.seconds == 60) {
    currentHours.seconds = 0;
    currentHours.minutes++;
    if (currentHours.minutes == 60) {
      currentHours.minutes = 0;
      currentHours.hours++;
    }
  }
}

module.exports = {
  Task
};