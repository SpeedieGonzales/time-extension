function countAbsences(IsPeriod, begin = 0, end = 0) {
    var absencetime = 0;
    var fields = document.querySelectorAll("tr td[data-c='6']:not(.td_green), tr td[data-c='7']:not(.td_green)");
    if (IsPeriod) {
      fields = selectItemForAbsenceList(fields, begin, end)
    }
    fields.forEach(function (field) {
      if (field.textContent.length != 0 && field.textContent.length > 6) {
        absencetime += TimeParser.parseStringToInt(
          field.textContent.substring(field.textContent.length - 4)
        );
      }
    });
    return TimeParser.parseIntToTime(absencetime);
  }
  function selectItemForAbsenceList(list, begin, end){
    var selectedFields = []
    list.forEach(function(element) {
        var dataRValue = parseInt(element.getAttribute("data-r"));
        if (dataRValue >= begin && dataRValue <= end) {
          selectedFields.push(element)
        }
      });
      return selectedFields;
  }