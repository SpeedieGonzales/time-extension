class api {
  static filldatabaseWithMonth() {
    var month_year = document.querySelector(
      'th[data-r="0"][data-c="1"][class="td_blue "]'
    ).textContent;
    var parts = month_year.split(" ");
    var month = parts[0];
    var year = parts[1];
    this.dayByTableRow(1, this.getMonthNumber(month), "20" + year)
  }
  static timeStampsByDay(tablerow, day_id) {}
  static absenceByDay(tablerow, day_id) {}
  static dayByTableRow(tablerow, month, year) {}
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
