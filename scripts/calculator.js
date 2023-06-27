function calculateOvertime(specifiedfields){
    console.log(specifiedfields);
    var count = specifiedfields.length;
    var overtime = 0;
    for(let x = 0; x < count; x++){
        var currentovertime = specifiedfields[x].textContent;
        if(!checkIfStringContainsLetter(currentovertime)){
            overtime += TimeParser.parseStringToInt(currentovertime);
        }
    }
    overtime = TimeParser.parseIntToTime(overtime);
    return overtime;
}

function checkIfStringContainsLetter(string) {
    var kleinerString = string.toLowerCase();
    if (/[a-z]/i.test(kleinerString)) {
      return true;
    } else {
      return false;
    }
}
function calculateOvertimeByPeriod(begin, end){
    beginInNumber = parseInt(begin);
    endInNumber = parseInt(end);
    var fields = document.querySelectorAll("td[data-c='4']:not(.td_green)");
    var fieldsInRange = []
    fields.forEach(function(field, index){
        if (field.textContent.length != 0 && index >= beginInNumber && index <= endInNumber){
            fieldsInRange.push(field);
        }
    })
    var overtime = calculateOvertime(fieldsInRange);
    return overtime;
}
function calculateOvertimeForMonth(){
    var fields = document.querySelectorAll("td[data-c='4']");
    var specifiedfields = [];
    fields.forEach(function(field){
        if(field.textContent.length != 0){
            specifiedfields.push(field);
        }
    })
    return calculateOvertime(specifiedfields);
}
function countAbsences(){
    var absencetime = 0;
    var fields = document.querySelectorAll("td[data-c='6']");
    fields.forEach(function(field){
        if(field.textContent.length != 0 && field.textContent.length > 4){
            absencetime += TimeParser.parseStringToInt(field.textContent.substring(field.textContent.length - 4));
        }
    })
   return TimeParser.parseIntToTime(absencetime);
}
function getAvrageArival() {
    const elements = document.querySelectorAll('td[data-c="8"]');
    var list = [];
    elements.forEach(function (element) {
      if (element.textContent != "") {
        var time = element.textContent;
        const [hours, minutes] = time.split(":");
        var houresAndMinutes = Number(hours) + Number(minutes) / 60;
        list.push(houresAndMinutes);
      }
    });
  
    var allTimes = 0;
    list.forEach(function (time) {
      allTimes += time;
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
    var fields = document.querySelectorAll("td[data-c='0'][ondblclick]:not(.td_green)");
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
    console.log(todaysRow);
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
function calculateEndtime(overtime) {
    var timeStamps = getTodaysTimeStamps();
    var times = getTimesFromTimeStamp(timeStamps);
    var endTime = 0;
    let timeSum = 0;
    times.forEach(time => {
        timeSum += time;
    })

    var lastStamp = timeStamps[timeStamps.length - 1];
    if (lastStamp < 12){
        lastStamp = lastStamp + 0.5;
    }
    endTime = lastStamp + (8 + overtime - timeSum);

    return TimeParser.parseIntToTime(endTime);
}