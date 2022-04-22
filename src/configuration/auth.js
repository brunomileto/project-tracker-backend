const {weekDay} = require("../enumerators/enums.js");

const todayWeekDay = new Date().getDay()
const tokenMustExpireWeekDay = weekDay.sunday;
var tokenTimeDuration = 7

if (todayWeekDay != tokenMustExpireWeekDay){
  tokenTimeDuration = tokenTimeDuration - todayWeekDay
}

module.exports = {
  jwt: {
    secret: '7ddc9a11b5aabd29196033241779bd96',
    expiresIn: `${tokenTimeDuration}d`,
  }
}