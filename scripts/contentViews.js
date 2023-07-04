class ContentViews {
  constructor() {
    var firstoption = CreateFirstOption();
    selectElement.add(firstoption);
    var nameArray = ['Overtime', 'Expected Overtime', 'Absence', 'Arrival', 'GoHomeTime'];
    var functionMonthArray = [displayMonthCalculate,displayCurrentOvertime,amountOfAbsences,handleAvrageArivalClick,calculateEndtime];
    var functionPeriodArray = [displayPeriodCalculate,displayCurrentOvertimeWithSpecificValues,periodOfAbsences,periodAverageArival,displayPeriodCalculate];
    var SpecialArray =['','currentOvertime','','','isHomeTime']
    for (let x = 0; x < nameArray.length; x++) {
      var content = "content" + x.toString();
      var contentValue = "content" + x.toString() + "_value";
      var option = "option" + x.toString();
      content = document.createElement("aside");
      contentValue = document.createElement("aside");
      option = document.createElement("option");
      option.text = nameArray[x];
      option.id = "option" + x.toString();
      new DropDownView(
        nameArray[x],
        functionMonthArray[x],
        functionPeriodArray[x],
        contentValue,
        SpecialArray[x]
      );
      selectElement.add(option);
      content.id = "content" + x.toString();
      content.classList.add("content");
      content.appendChild(contentValue);
      tableSection.appendChild(content);
    }
  }
}
function CreateFirstOption() {
  var option = document.createElement("option");
  option.text = "Calculator";
  option.disabled = true;
  option.selected = true;
  return option;
}
