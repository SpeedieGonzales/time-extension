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
  function getFirstTimeOfMonth() {
    return TimeParser.parseStringToInt(
      document.querySelector('td[data-r="0"][data-c="5"]:not(:empty)').textContent
    );
  }
  function getLastTimeOfMonth() {
    var elements = document.querySelectorAll(
      "td[data-c='5'][ondblclick]:not(.td_green)"
    );
    return TimeParser.parseStringToInt(elements[elements.length - 1].textContent);
  }
  function getStartAmountOfOvertime() {
    var beginfield = getFirstTimeOfMonth();
    var overtimeBegin = TimeParser.parseStringToInt(
      document.querySelector('[data-r="0"][data-c="4"]').textContent
    );
    return beginfield - overtimeBegin;
  }
  function getTodaysOvertimeValue() {
    var row = getTodaysRowInt();
    var currentOvertime = document.querySelector(
      `td[data-r='${row}'][data-c="5"]:not(:empty)`
    ).textContent;
    return TimeParser.parseStringToInt(currentOvertime);
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
    array.forEach(function (element) {
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
  function checkForAbsences(rowID) {
    var absencetime = 0;
    var absencefields = document.querySelectorAll(
      `td[data-r='${rowID}'][data-c="6"], td[data-r='${rowID}'][data-c="7"]`
    );
    absencefields.forEach((field) => {
      if (field.textContent.length != 0) {
        absencetime.push(TimeParser.parseStringToInt(field.textContent));
      }
    });
    return absencetime;
  }
  