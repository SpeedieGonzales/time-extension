function getAvrageArival(IsPeriod, begin = 0, end = 0) {
    var elements = document.querySelectorAll('td[data-c="8"]');
    var list = [];
    if (IsPeriod) {
      elements = getFieldsForPeriod(begin, end, elements);
    }
    elements.forEach(function (element) {
      if (element.textContent != "") {
        list.push(element);
      }
    });
    var allTimes = 0;
    if (list.length == 1) {
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