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
    var parent = document.createElement("aside");
    parent.classList.add("parent");

    var div1 = document.createElement("aside");
    div1.classList.add("div1");
    var div2 = document.createElement("aside");
    div2.classList.add("div2");
    var div3 = document.createElement("aside");
    div3.classList.add("div3");
    var div4 = document.createElement("aside");
    div4.classList.add("div4");
    if (special == "isHomeTime") {
      var btn_goHomeTime = document.createElement("button");
      var input_hours = document.createElement("input");
      var input_minutes = document.createElement("input");
      var goHomeTime = document.createElement("h3");
      var goHomeTimeValue = document.createElement("h3");
      goHomeTimeValue.textContent = "00:00";
      goHomeTimeValue.style.textAlign = "center";
      goHomeTime.textContent = "Um ";
      goHomeTime.style.textAlign = "center";
      input_hours.value = 0;
      input_hours.type = "number";
      input_hours.min = 0;
      input_hours.max = 8;
      input_hours.classList.add("normal_input");
      input_minutes.value = 0;
      input_minutes.type = "number";
      input_minutes.min = 0;
      input_minutes.max = 59;
      input_minutes.classList.add("normal_input");
      btn_goHomeTime.textContent = "Calculate";
      btn_goHomeTime.classList.add("btn");
      btn_goHomeTime.addEventListener("click", () => {
        var time = btn_Month_Function(
          parseInt(input_hours.value),
          parseInt(input_minutes.value)
        );
        goHomeTimeValue.textContent = time;
      });
      var betweenSymbol = ": ";
      var symbolTextNode = document.createTextNode(betweenSymbol);
      div1.appendChild(goHomeTime);
      div2.appendChild(goHomeTimeValue);
      div3.appendChild(input_hours);
      div3.appendChild(symbolTextNode);
      div3.appendChild(input_minutes);
      div4.appendChild(btn_goHomeTime);
    } else {
      var input_calculateBegin = document.createElement("input");
      input_calculateBegin.type = "number";
      input_calculateBegin.min = 0;
      input_calculateBegin.max = 31;
      input_calculateBegin.classList.add("normal_input");

      var input_leaveTimeHours = document.createElement("input");
      input_leaveTimeHours.type = "number";
      input_leaveTimeHours.min = 0;
      input_leaveTimeHours.max = 31;
      input_leaveTimeHours.classList.add("normal_input");

      var btn_Current = document.createElement("button");
      btn_Current.textContent = "Period";
      btn_Current.classList.add("btn");
      btn_Current.addEventListener("click", () => {
        btn_Period_Function(input_calculateBegin.value, input_leaveTimeHours.value);
      });

      var btn_Month = document.createElement("button");
      btn_Month.textContent = "Month";
      btn_Month.classList.add("btn");
      btn_Month.addEventListener("click", btn_Month_Function);

      var betweenSymbol = "- ";
      var symbolTextNode = document.createTextNode(betweenSymbol);
      div1.appendChild(input_calculateBegin);
      div1.appendChild(symbolTextNode);
      div1.appendChild(input_leaveTimeHours);
      div2.appendChild(btn_Current);
      div4.appendChild(btn_Month);
    }
    parent.appendChild(div1);
    parent.appendChild(div2);
    parent.appendChild(div3);
    parent.appendChild(div4);
    if (special == "currentOvertime") {
      var div5 = document.createElement("aside");
      div5.classList.add("div5");
      var div6 = document.createElement("aside");
      div6.classList.add("div6");

      var btn_Current = document.createElement("button");
      btn_Current.textContent = "Expected Overtime";
      btn_Current.classList.add("btn");
      btn_Current.addEventListener("click", () => {
        displayCurrentOvertime(input_leaveTimeHours.value, input_leaveTimeMinutes.value);
      });

      var input_leaveTimeHours = document.createElement("input");
      input_leaveTimeHours.type = "number";
      input_leaveTimeHours.min = 0;
      input_leaveTimeHours.max = 24;
      input_leaveTimeHours.classList.add("normal_input");

      var input_leaveTimeMinutes = document.createElement("input");
      input_leaveTimeMinutes.type = "number";
      input_leaveTimeMinutes.min = 0;
      input_leaveTimeMinutes.max = 59;
      input_leaveTimeMinutes.classList.add("normal_input");

      var betweenSymbol = ": ";
      var symbolTextNode = document.createTextNode(betweenSymbol);
      div5.appendChild(input_leaveTimeHours);
      div5.appendChild(symbolTextNode);
      div5.appendChild(input_leaveTimeMinutes);
      div6.appendChild(btn_Current);
      parent.appendChild(div5);
      parent.appendChild(div6);
    }
    legendElement.textContent = title;
    fieldsetElement.appendChild(legendElement);
    fieldsetElement.appendChild(parent);
    container.appendChild(fieldsetElement);
  }
}
