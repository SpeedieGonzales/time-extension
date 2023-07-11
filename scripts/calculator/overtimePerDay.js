function calculateDailyOvertimeByGoal(week, days, hour, withCurrentOvertime) {
    var hours =
      parseInt(hour) +
      parseInt(days) * 8 +
      parseInt(week) * 5 * 8;
    var todaysOvertime = calculateCurrentOvertime();
    hours = hours - TimeParser.parseStringToInt(todaysOvertime);
    var startOvertime = getTodaysOvertimeValue();
    if (withCurrentOvertime) {
      var goal = hours;
    } else {
      var goal = startOvertime + hours;
    }
    var allDays = document.querySelectorAll(
      `td[data-c="2"]:not(:empty), td[data-c="3"]:empty`
    );
    var x = 0;
    var y = -1;
    var absencetime = 0;
    allDays.forEach(function (day, index) {
      if (day.classList.contains("selected")) {
        y = index;
      }
      day.textContent = day.textContent.replace(/\s/g, "");
      if (y > -1) {
        if (day.textContent.length == 4 && index > y) {
          x++;
        }
      }
    });
    var lastElement;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].textContent !== "" && allDays[i].textContent.length == 4) {
        lastElement = allDays[i];
        break;
      }
    }
    var absencetime = countAbsences(
      true,
      allDays[y].getAttribute("data-r"),
      lastElement.getAttribute("data-r")
    );
    var amountOfDays = x - TimeParser.parseStringToInt(absencetime) / 8 - 1;
    var diff = goal - startOvertime;
    var solution = [TimeParser.parseIntToTime(diff / amountOfDays), amountOfDays];
    return solution;
  }