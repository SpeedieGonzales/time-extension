function calculateOvertimeByPeriod(begin, end) {
  var fields = document.querySelectorAll("td[data-c='5']:not(.td_green)");
  var fieldsInRange = [];
  fieldsInRange = getFieldsForPeriod(begin, end, fields);

  var overtimefields = document.querySelectorAll("td[data-c='4']:not(.td_green)");

  var beginfield = TimeParser.parseStringToInt(fieldsInRange[0].textContent);
  var overtimeFromBeginfield = TimeParser.parseStringToInt(overtimefields[0].textContent);
  beginfield = beginfield - overtimeFromBeginfield;
  var endfield = TimeParser.parseStringToInt(fieldsInRange[fieldsInRange.length -1].textContent);
  return TimeParser.parseIntToTime(endfield-beginfield);

}
function getFieldsForPeriod(begin, end, fields) {
  beginInNumber = parseInt(begin);
  endInNumber = parseInt(end);
  var fieldsInRange = [];
  fields.forEach(function (field, index) {
    if (
      field.textContent.length != 0 &&
      index >= beginInNumber &&
      index <= endInNumber
    ) {
      fieldsInRange.push(field);
    }
  });
  var list = fieldsInRange;
  return list;
}
function getFirstTimeOfMonth(){
  return TimeParser.parseStringToInt(document.querySelector('td[data-r="0"][data-c="5"]:not(:empty)').textContent);
}
function getLastTimeOfMonth(){
  var elements = document.querySelectorAll("td[data-c='5'][ondblclick]:not(.td_green)");
  return TimeParser.parseStringToInt(elements[elements.length - 1].textContent);
}
function getStartAmountOfOvertime(){
  var beginfield = getFirstTimeOfMonth();
  var overtimeBegin = TimeParser.parseStringToInt(document.querySelector('[data-r="0"][data-c="4"]').textContent);
  return beginfield-overtimeBegin;
}
//TODO: Bereits gearbeitete Tage nicht dazu rechnen
function calculateDailyOvertimeByGoal(goalhours, goalminutes){
  var row = getTodaysRowInt();
  var goal = parseInt(goalhours) + (parseInt(goalminutes) / 60);
  var startOvertime = getStartAmountOfOvertime();
  var allDays = document.querySelectorAll('td[data-c="2"]:not(:empty), td[data-c="3"]:empty');
  var x = 0;
  allDays.forEach(function(day){
    day.textContent = day.textContent.replace(/\s/g, "")
    if(day.textContent.length == 4){
      x++;
    }
  })
  var absencetime = countAbsences();
  var amountOfDays = (x - (TimeParser.parseStringToInt(absencetime)/8));
  console.log(amountOfDays);
  var diff = goal-startOvertime;
  return TimeParser.parseIntToTime(diff / amountOfDays);
}
function calculateOvertimeForMonth() {
  var begintime = getStartAmountOfOvertime();
  var endfield = getLastTimeOfMonth();
  return TimeParser.parseIntToTime(endfield-begintime)
}
function countAbsences(IsPeriod, begin = 0, end = 0) {
  var absencetime = 0;
  var fields = document.querySelectorAll("td[data-c='6']");
  if(IsPeriod){
    fields = getFieldsForPeriod(begin,end, fields);
  }
  fields.forEach(function (field) {
    if (field.textContent.length != 0 && field.textContent.length > 4) {
      absencetime += TimeParser.parseStringToInt(
        field.textContent.substring(field.textContent.length - 4)
      );
    }
  });
  return TimeParser.parseIntToTime(absencetime);
}

function getAvrageArival(IsPeriod, begin = 0, end = 0) {
  var elements = document.querySelectorAll('td[data-c="8"]');
  var list = [];
  if(IsPeriod){
    elements = getFieldsForPeriod(begin, end, elements);
  }
  elements.forEach(function (element) {
    if (element.textContent != "") {
      list.push(element);
    }
  });
  var allTimes = 0;
  if(list.length == 1){
    return list[0].textContent;
  }
  list.forEach(function (listitem) {
    var time = listitem.textContent;
    const [hours, minutes] = time.split(":");
    var houresAndMinutes = Number(hours) + Number(minutes) / 60;
    allTimes += houresAndMinutes;
  });
  var avrageTime = allTimes / list.length;
  var hours = Math.floor(avrageTime);
  var minutes = String(Math.floor((avrageTime - hours) * 60));
  if (minutes.length <= 1) {
    minutes = "0" + minutes;
  }
  var avrageTimeStr = " " + String(hours) + ":" + minutes;
  return avrageTimeStr;
}

function getTodaysRowInt() {
  var day = new Date().getDate();
  var fields = document.querySelectorAll(
    "td[data-c='0'][ondblclick]:not(.td_green)"
  );
  var value = -1;
  fields.forEach(function (feld, index) {
    if (index + 1 == day) {
      value = feld.getAttribute("data-r");
    }
  });
  return value;
}
function getTodaysTimeStamps() {
  var todaysRow = getTodaysRowInt();
  var fields = document.querySelectorAll(`td[data-r='${todaysRow}'][data-c]`);
  var array = Array.from(fields);
  array.splice(0, 8);
  var timeStamps = [];
  array.forEach(function (element, index) {
    if (element.textContent.length != 0) {
      timeStamps.push(TimeParser.parseStringToInt(element.textContent));
    }
  });
  return timeStamps;
}
function getTimesFromTimeStamp(stamps) {
  var times = [];
  for (var i = 0; i < stamps.length; i += 2) {
    if (i + 1 >= stamps.length) {
      continue;
    }
    var diff = stamps[i + 1] - stamps[i];
    times.push(diff);
  }
  return times;
}
function calculateEndtime(hours, minutes) {
  var timeStamps = getTodaysTimeStamps();
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
  var absencetime = checkForAbsences();
  hours = minutes/60 + hours;
  endTime = lastStamp + (8 + hours - timeSum - absencetime);

  return TimeParser.parseIntToTime(endTime);
}
function checkForAbsences(){
  var row = getTodaysRowInt();
  var absencetime = 0;
  var absencefields = document.querySelectorAll(`td[data-r='${row}'][data-c="6"], td[data-r='${row}'][data-c="7"]`);
  absencefields.forEach((field) => {
    if (field.textContent.length != 0) {
      absencetime.push(TimeParser.parseStringToInt(field.textContent));
    }
  });
  return absencetime;
}

function calculateCurrentOvertime(hours = 17, minutes = 0, pause = 30){
  if(hours == ""){
    hours = 17;
  }
  if(minutes == ""){
    minutes = 0;
  }
  if(pause == ""){
    pause = 30;
  }
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  var leaveTime = hours + (minutes/60);
  var fulltime = 8;
  var timeStamps = getTodaysTimeStamps();
  var times = getTimesFromTimeStamp(timeStamps);
  let timeSum = 0;
  times.forEach((time) => {
    timeSum += time;
  });
  var lastStamp = timeStamps[timeStamps.length - 1];
  if (lastStamp < 12) {
    lastStamp = lastStamp + (pause/60);
  }
  var absencetime = checkForAbsences();
  var diff = leaveTime - lastStamp;

  var currentOvertime = (timeSum + diff + absencetime) - fulltime;
  return TimeParser.parseIntToTime(currentOvertime);
}
function formatTime(time) {
  var parts = time.split(':');
  var hours = parts[0];
  var minutes = parts[1];
  if (hours.length === 1) {
    hours = '0' + hours;
  }
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
}

