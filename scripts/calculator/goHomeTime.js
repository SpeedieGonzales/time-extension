function calculateEndtime(hours, minutes) {
  if(isNaN(hours) && isNaN(minutes)){
    return TimeParser.parseIntToTime(17);
  }
  if(isNaN(hours)){
    hours = 0;
  }
  if(isNaN(minutes)){
    minutes = 0;
  }
  var todaysRow = getTodaysRowInt();
    var timeStamps = getTimeStampsByRow(todaysRow);
    var times = getTimesFromTimeStamp(timeStamps);
    var endTime = 0;
    let timeSum = 0;
    times.forEach((time) => {
      timeSum += time;
    });
  
    var lastStamp = timeStamps[timeStamps.length - 1];
    if (lastStamp < 12) {
      lastStamp = lastStamp + 0.5;
    }
    var absencetime = checkForAbsences(getTodaysRowInt());
    hours = minutes / 60 + hours;
    endTime = lastStamp + (8 + hours - timeSum - absencetime);
  
    return TimeParser.parseIntToTime(endTime);
  }