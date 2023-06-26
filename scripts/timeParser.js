class TimeParser {
  static parseStringToInt(str) {
    var parts = str.split(":");
    if (parts[0].startsWith("-")) {
        parts[0] = parts[0].replace(/\s/g, "");
        parts[1] = "-" + parts[1];
    }
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    var decimalHours = hours + minutes / 60;
    return decimalHours;
  }
  static parseIntToTime(number) {
    var hours = TimeParser.removeDecimals(number);
    var minutes = Math.round((number - hours) * 60);
    var hoursString = hours.toString().padStart(2, '0');
    if (hoursString.startsWith("-") && hoursString.length === 2) {
      hoursString =  "-0" + hoursString.substring(1);
    }
    var minutesString = minutes.toString().padStart(2, '0');
    if (minutesString.startsWith("-")) {
      minutesString = minutesString.substring(1);
    }
    return hoursString + ':' + minutesString;
  }
  static removeDecimals(number) {
    if (number >= 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }
}
