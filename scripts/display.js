function formatTime(time) {
  if (typeof time === "string") {
    if (time.includes(":")) {
      var parts = time.split(":");
      var hours = parts[0];
      var minutes = parts[1];
      if (hours.length === 1) {
        hours = "0" + hours;
      }
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    }
  }
}
function displayInTable(
  Value,
  type,
  IsPeriod,
  begin = 0,
  end = 0,
  amountDays = false
) {
  var month = "";
  if (!amountDays) {
    if (Array.isArray(Value)) {
      month = Value[1] + " Days";
      Value = Value[0];
    } else {
      Value = formatTime(Value);
      month = document.querySelector(
        'th[data-r="0"][data-c="1"][class="td_blue "]'
      ).textContent;
    }
  }
  const row = document.createElement("tr");
  const labelCell = document.createElement("td");
  if (amountDays) {
    labelCell.innerHTML = type;
  } else if (IsPeriod) {
    labelCell.innerHTML =
      type + " from <strong>" + begin + " - " + end + "" + month + "</strong>";
  } else {
    labelCell.innerHTML = type + " in <strong>" + month + "</strong>";
  }
  const timeCell = document.createElement("td");
  timeCell.style.textAlign = "right";
  timeCell.textContent = Value;

  row.appendChild(labelCell);
  row.appendChild(timeCell);
  table.appendChild(row);
}
function amountOfAbsences() {
    displayInTable(countAbsences(false), "Absencetime", false);
  }
  function periodOfAbsences(begin, end) {
    displayInTable(countAbsences(true, begin, end), "Absencetime", false);
  }
  function displayMonthCalculate() {
    displayInTable(calculateOvertimeForMonth(), "Overtime", false);
  }
  function displayCurrentOvertime() {
    displayInTable(calculateCurrentOvertime(), "Expected Overtime", false);
  }
  function displayCurrentOvertimeWithSpecificValues(
    hours = 0,
    minutes = 0,
    pause = 0
  ) {
    displayInTable(
      calculateCurrentOvertime(hours, minutes, pause),
      "Expected Overtime",
      false
    );
  }
  function displayPeriodCalculate(begin, end) {
    displayInTable(
      calculateOvertimeByPeriod(begin, end),
      "Overtime",
      true,
      begin,
      end
    );
  }
  function displayAmountOfDaysForOvertime(
    goalOvertime,
    OvertimeHours,
    OvertimeMinutes,
    withCurrentOvertime
  ) {
    if (OvertimeHours.length == 0) {
      OvertimeHours = 0;
    }
    if (OvertimeMinutes.length == 0) {
      OvertimeMinutes = 0;
    }
    displayInTable(
      calculateHowManyDaysForOvertime(
        goalOvertime,
        OvertimeHours,
        OvertimeMinutes,
        withCurrentOvertime
      ),
      "It take this amount of Days:",
      false,
      0,
      0,
      true
    );
  }
  function displayCalculateOfOvertimePerDay(
    weeks,
    days,
    hours,
    withCurrentOvertime
  ) {
    if (weeks.length == 0) {
      weeks = 0;
    }
    if (days.length == 0) {
      days = 0;
    }
    if (hours.length == 0) {
      hours = 0;
    }
    displayInTable(
      calculateDailyOvertimeByGoal(weeks, days, hours, withCurrentOvertime),
      "Overtime per Day ",
      false
    );
  }
  function handleAvrageArivalClick() {
    displayInTable(getAvrageArival(false), "Arival", false);
  }
  function periodAverageArival(begin, end) {
    displayInTable(getAvrageArival(true, begin, end), "Arival", false);
  }
  function handleToggleEditClick() {
    toggleContentEditableOfArivalTimes();
  }
  
