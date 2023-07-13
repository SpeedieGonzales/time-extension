class Api {
  static filldatabaseWithMonth() {
    var month_year = document.querySelector(
      'th[data-r="0"][data-c="1"][class="td_blue "]'
    ).textContent;
    var parts = month_year.split(" ");
    var month = parts[0];
    var year = parts[1];
    year = "20" + year;
    month = Api.getMonthNumber(month);
    var trElements = document.querySelectorAll(
      "#table_body_mensuel tr:not(:has(td.td_green))"
    );
    trElements.forEach(function (tr) {
      Api.dayByTableRow(tr.getAttribute("id"), month, year);
    });
  }
  static timeStampsByDay(tablerow, day_id) {
    var timestamps = getTimeStampsByRow(tablerow);
    var times = getTimesFromTimeStamp(timestamps);
    times.forEach((time) => {
      console.log(time);
      var dbTime;
      /* $.ajax({
        method: "POST",
        url: "https://192.168.0.33:8000/api/timestamp/",
        data: {
          time: dbTime,
          day: day_id,
        },
        success: function (response) {
          if (response["success"]) {
          }
        },
      });*/
    });
  }
  static absenceByDay(tablerow, day_id) {}
  static dayByTableRow(tablerow, month, year) {
    tablerow = parseInt(tablerow);
    var date =
      year +
      "-" +
      month +
      "-" +
      document.querySelector(`td[data-r='${tablerow}'][data-c='0']:not(:empty)`)
        .textContent;
    var shouldtime = document.querySelector(
      `td[data-r='${tablerow}'][data-c='2']`
    ).textContent;
    var overtime = TimeParser.parseStringToInt(
      document.querySelector(`td[data-r='${tablerow}'][data-c='4']`).textContent
    ).toFixed(3);
    var balance = TimeParser.parseStringToInt(
      document.querySelector(`td[data-r='${tablerow}'][data-c='5']`).textContent
    ).toFixed(3);
    if (shouldtime.length == 0) {
      shouldtime = "00:00:00";
    }
    $.ajax({
      method: "POST",
      url: "https://192.168.0.33:8000/api/day/",
      data: {
        date: date,
        shouldTime: shouldtime,
        overtime: overtime,
        balance: balance,
      },
      success: function (response) {
        console.log("success");
        var data = response["data"];
        var day = new Day(data);
        this.timeStampsByDay(tablerow, day.id);
        this.absenceByDay(tablerow, day.id);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("Fehler beim Ajax-Aufruf: " + errorThrown);
      },
    });
  }
  static getMonthNumber(month) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var monthIndex = months.findIndex(function (m) {
      return m.toLowerCase() === month.toLowerCase();
    });
    var monthNumber = (monthIndex + 1).toString().padStart(2, "0");
    return monthNumber;
  }
}
