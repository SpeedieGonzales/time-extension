function calculateOvertimeByPeriod(begin, end) {
    var fields = document.querySelectorAll("td[data-c='5']:not(.td_green):not(:empty)");
    var fieldsInRange = [];
    fieldsInRange = getFieldsForPeriod(begin, end, fields);
  
    var overtimefields = document.querySelectorAll(
      "td[data-c='4']:not(.td_green)"
    );
    var beginfield = TimeParser.parseStringToInt(fieldsInRange[0].textContent);
    var overtimeFromBeginfield = TimeParser.parseStringToInt(
      overtimefields[0].textContent
    );
    beginfield = beginfield - overtimeFromBeginfield;
    var endfield = TimeParser.parseStringToInt(
      fieldsInRange[fieldsInRange.length - 1].textContent
    );
    return TimeParser.parseIntToTime(endfield - beginfield);
  }
  function calculateOvertimeForMonth() {
    var begintime = getStartAmountOfOvertime();
    var endfield = getLastTimeOfMonth();
    return TimeParser.parseIntToTime(endfield - begintime);
  }