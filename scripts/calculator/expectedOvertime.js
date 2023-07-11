function calculateCurrentOvertime(hours = 17, minutes = 0, pause = 30) {
    if (hours == "") {
      hours = 17;
    }
    if (minutes == "") {
      minutes = 0;
    }
    if (pause == "") {
      pause = 30;
    }
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    var leaveTime = hours + minutes / 60;
    var fulltime = 8;
    var timeStamps = getTodaysTimeStamps();
    var times = getTimesFromTimeStamp(timeStamps);
    let timeSum = 0;
    times.forEach((time) => {
      timeSum += time;
    });
    var lastStamp = timeStamps[timeStamps.length - 1];
    if (lastStamp < 12) {
      lastStamp = lastStamp + pause / 60;
    }
    var absencetime = checkForAbsences(getTodaysRowInt());
    var diff = leaveTime - lastStamp;
  
    var currentOvertime = timeSum + diff + absencetime - fulltime;
    return TimeParser.parseIntToTime(currentOvertime);
  }