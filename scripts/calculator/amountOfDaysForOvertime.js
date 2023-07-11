function calculateHowManyDaysForOvertime(
    goalOvertime,
    OvertimeHours,
    OvertimeMinutes,
    WithCurrent
  ) {
    var goal = parseInt(goalOvertime);
    if (WithCurrent) {
      var overtime = getTodaysOvertimeValue();
      goal = goal - overtime;
    }
    OvertimePerDay = parseInt(OvertimeHours) + parseInt(OvertimeMinutes) / 60;
    var AmountOfDays = goal / OvertimePerDay;
    return Math.round(AmountOfDays);
  }