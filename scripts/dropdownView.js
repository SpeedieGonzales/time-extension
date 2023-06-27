class DropDownView {
  constructor(
    title,
    btn_Month_Function,
    btn_Period_Function,
    container,
    isHomeTime = false
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
    if (isHomeTime) {
      var btn_goHomeTime = document.createElement("button");
      var input_overtime = document.createElement("input");
      var goHomeTime = document.createElement("h3");
      var goHomeTimeValue = document.createElement("h3");
      goHomeTimeValue.textContent = "00:00";
      goHomeTimeValue.style.textAlign = "center";
      goHomeTime.textContent = "Um ";
      goHomeTime.style.textAlign = "center";
      input_overtime.value = 0;
      input_overtime.type = "number";
      input_overtime.min = 0;
      input_overtime.max = 8;
      input_overtime.classList.add("normal_input");
      btn_goHomeTime.textContent = "Overtime(Hours)";
      btn_goHomeTime.classList.add("btn");
      btn_goHomeTime.addEventListener("click", () => {
        var time = btn_Month_Function(parseInt(input_overtime.value));
        goHomeTimeValue.textContent = time;
      });
      div1.appendChild(goHomeTime);
      div2.appendChild(goHomeTimeValue);
      div3.appendChild(input_overtime);
      div4.appendChild(btn_goHomeTime);
    } else {
      var input_calculateBegin = document.createElement("input");
      input_calculateBegin.type = "number";
      input_calculateBegin.min = 0;
      input_calculateBegin.max = 31;
      input_calculateBegin.classList.add("normal_input");

      var input_calculateEnd = document.createElement("input");
      input_calculateEnd.type = "number";
      input_calculateEnd.min = 0;
      input_calculateEnd.max = 31;
      input_calculateEnd.classList.add("normal_input");

      var btn_Period = document.createElement("button");
      btn_Period.textContent = "Period";
      btn_Period.classList.add("btn");
      btn_Period.addEventListener("click", () => {
        btn_Period_Function(
          input_calculateBegin.value,
          input_calculateEnd.value
        );
      });

      var btn_Month = document.createElement("button");
      btn_Month.textContent = "Month";
      btn_Month.classList.add("btn");
      btn_Month.addEventListener("click", btn_Month_Function);

      var betweenSymbol = "- ";
      var symbolTextNode = document.createTextNode(betweenSymbol);
      div1.appendChild(input_calculateBegin);
      div1.appendChild(symbolTextNode);
      div1.appendChild(input_calculateEnd);
      div2.appendChild(btn_Period);
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
