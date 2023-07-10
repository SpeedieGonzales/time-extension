class DropDownView {
  constructor(
    title,
    btn_Month_Function,
    btn_Period_Function,
    container,
    special = ""
  ) {
    var fieldsetElement = document.createElement("fieldset");
    var legendElement = document.createElement("legend");
    var parent = createDiv("parent");

    var div1 = createDiv("div1");
    var div2 = createDiv("div2");
    var div3 = createDiv("div3");
    var div4 = createDiv("div4");
    var input_hours = new inputfield(0, 24, "Hours");
    var input_minutes = new inputfield(0, 60, "Minutes");
    var input_calculateBegin = new inputfield(0, 31, "Start by Day");
    var input_calculateEnd = new inputfield(0, 31, "End by Day");
    if (special == "perDay") {
      var btn_perDay = new button("Calculate without", () => {
        btn_Period_Function(
          input_weeks.value,
          input_days.value,
          input_hours.value,
          false
        );
      });
      var btn_perDay2 = new button("Calculate with", () => {
        btn_Period_Function(
          input_weeks.value,
          input_days.value,
          input_hours.value,
          true
        );
      });
      var input_weeks = new inputfield(0,52, "Wochen");
      var input_days = new inputfield(0,7,"Tage");
      var input_hours = new inputfield(0,24, "Stunden");
      setTogether(div1, input_weeks, input_days, "", input_hours);
      div3.append(btn_perDay);
      div3.append(btn_perDay2);
    } else if (special == "isHomeTime") {
      var btn_goHomeTime = new button("Calculate", () => {
        var time = btn_Month_Function(
          parseInt(input_hours.value),
          parseInt(input_minutes.value)
        );
        goHomeTimeValue.textContent = time;
      });
      var goHomeTime = document.createElement("h3");
      var goHomeTimeValue = document.createElement("h3");
      goHomeTimeValue.textContent = "00:00";
      goHomeTimeValue.style.textAlign = "center";
      goHomeTime.textContent = "Um ";
      goHomeTime.style.textAlign = "center";
      div1.appendChild(goHomeTime);
      div2.appendChild(goHomeTimeValue);
      setTogether(div3, input_hours, input_minutes, ": ");
      div4.appendChild(btn_goHomeTime);
    } else {
      var btn_Current = new button("Period", () => {
        btn_Period_Function(
          input_calculateBegin.value,
          input_calculateEnd.value
        );
      });
      var btn_Month = new button("Month", btn_Month_Function);
      if (special == "currentOvertime") {
        input_calculateBegin = new inputfield(0, 31, "Leave Hour");
        input_calculateEnd = new inputfield(0, 31, "Leave Minute");
        var input_pauseTime = new inputfield(0, 60, "Breaktime");
        btn_Month.textContent = "Normal";
        btn_Current.textContent = "Specified";
        setTogether(
          div1,
          input_calculateBegin,
          input_calculateEnd,
          ": ",
          input_pauseTime
        );
        btn_Current = new button("Period", () => {
          btn_Period_Function(
            input_calculateBegin.value,
            input_calculateEnd.value,
            input_pauseTime.value
          )
        });
      } else {
        setTogether(div1, input_calculateBegin, input_calculateEnd, "- ");
      }
      div2.appendChild(btn_Current);
      div4.appendChild(btn_Month);
    }
    parent.appendChild(div1);
    parent.appendChild(div2);
    parent.appendChild(div3);
    parent.appendChild(div4);

    legendElement.textContent = title;
    fieldsetElement.appendChild(legendElement);
    fieldsetElement.appendChild(parent);
    container.appendChild(fieldsetElement);
  }
}
