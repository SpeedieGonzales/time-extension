class ContentViews {
  constructor(selectElement, tableSection) {
    this.selectElement = selectElement;
    this.tableSection = tableSection;
    this.contentViews = [
      {
        name: "Overtime",
        functionMonth: displayMonthCalculate,
        functionPeriod: displayPeriodCalculate,
        special: "",
      },
      {
        name: "Expected Overtime",
        functionMonth: displayCurrentOvertime,
        functionPeriod: displayCurrentOvertimeWithSpecificValues,
        special: "currentOvertime",
      },
      {
        name: "Absence",
        functionMonth: amountOfAbsences,
        functionPeriod: periodOfAbsences,
        special: "",
      },
      {
        name: "Arrival",
        functionMonth: handleAvrageArivalClick,
        functionPeriod: periodAverageArival,
        special: "",
      },
      {
        name: "GoHomeTime",
        functionMonth: calculateEndtime,
        functionPeriod: displayPeriodCalculate,
        special: "isHomeTime",
      },      
      {
        name: "Overtime per Day",
        functionMonth: calculateEndtime,
        functionPeriod: displayCalculateOfOvertimePerDay,
        special: "perDay",
      },
    ];

    this.createFirstOption();
    this.createContentViews();
  }

  createFirstOption() {
    const option = document.createElement("option");
    option.text = "Calculator";
    option.disabled = true;
    option.selected = true;
    this.selectElement.add(option);
  }

  createContentViews() {
    this.contentViews.forEach((contentView, index) => {
      const content = document.createElement("aside");
      const contentValue = document.createElement("aside");
      const option = document.createElement("option");

      option.text = contentView.name;
      option.id = `option${index}`;
      this.selectElement.add(option);

      new DropDownView(
        contentView.name,
        contentView.functionMonth,
        contentView.functionPeriod,
        contentValue,
        contentView.special
      );

      content.id = `content${index}`;
      content.classList.add("content");
      content.appendChild(contentValue);
      this.tableSection.appendChild(content);
    });
  }
}
