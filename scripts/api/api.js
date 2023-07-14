var token = "";
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
    var fields = document.querySelectorAll(`td[data-r='${tablerow}'][data-c]`);
    var array = Array.from(fields);
    array.splice(0, 8);
    array.forEach(function (element) {
      if (
        element.textContent.length != 0 &&
        parseInt(element.textContent) &&
        parseInt(element.textContent) < 19 
      ) {
        var dbTime = element.textContent + ":00";
        $.ajax({
          method: "POST",
          url: "https://192.168.0.33:8000/api/timestamp/",
          headers: {
            'Authorization': 'Token ' + token  
          },
          data: {
            time: dbTime,
            day: day_id,
          },
          success: function (response) {
            console.log("success");
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log("Fehler beim Ajax-Aufruf: " + errorThrown);
          },
        });
      }
    });
  }
  static absenceByDay(tablerow, day_id) {
    var fields = document.querySelectorAll(
      `td[data-r='${tablerow}'][data-c='6']:not(.td_green), td[data-r='${tablerow}'][data-c='7']:not(.td_green)`
    );
    fields.forEach(function (field) {
      if (field.textContent != 0 && field.textContent.length > 5) {
        var absence_time = field.textContent.slice(-4)+":00";
        var absence_reason = field.textContent.split(" ")[0];
        $.ajax({
          method: "POST",
          url: "https://192.168.0.33:8000/api/absence/",
          headers: {
            'Authorization': 'Token ' + token  
          },
          data: {
            duration: absence_time,
            reason: absence_reason,
            day: day_id,
          },
          success: function (response) {
            console.log("success");
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log("Fehler beim Ajax-Aufruf: " + errorThrown);
          },
        }); 
      }
    });
  }
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
      headers: {
            'Authorization': 'Token ' + token  
          },
      data: {
        date: date,
        shouldTime: shouldtime,
        overtime: overtime,
        balance: balance,
      },
      success: function (response) {
        var day = new Day(response);
        Api.timeStampsByDay(tablerow, day.id);
        Api.absenceByDay(tablerow, day.id);
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
  static login(username, password){
    $.ajax({
        url: 'https://192.168.0.33:8000/api/auth/login/',
        method: 'GET',
        data: {},
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function(response) {
          tableSection.innerHTML = "";
          token = response['key'];
          btn_login.textContent = "Logout";
          btn_login.removeEventListener('click', () => { Api.login(usernameInput.value, passwordInput.value)});
          btn_login.addEventListener('click', Api.logout);  
          console.log('Login erfolgreich:', response);
        },
        error: function(xhr, textStatus, errorThrown) {
          console.error('Fehler beim Login:', errorThrown);
        }
      });
    }
    static logout(){
      token = "";
      btn_login.textContent = "Login";
      btn_login.removeEventListener('click', Api.logout); 
      btn_login.addEventListener('click', () => { Api.login(usernameInput.value, passwordInput.value)});
    }
}
