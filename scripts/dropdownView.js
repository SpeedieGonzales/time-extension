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
    var parent = new Div("parent", "parent");

    var div_upLeft = new Div("div_upLeft", "div1");
    var div_upRight = new Div("div_upRight", "div2");
    var div_downLeft = new Div("div_downLeft", "div3");
    var div_downRight = new Div("div_downRight", "div4");
    var input_hours = new Inputfield("number", "Hours",0, 24);
    var input_minutes = new Inputfield("number","Minutes", 0, 60);
    var input_calculateBegin = new Inputfield("number", "Start by Day",0, 31,);
    var input_calculateEnd = new Inputfield("number","End by Day", 0, 31, );
    var input_goal = new Inputfield("number","Goal",0,52);
    if(special == "amountOfDays" || special == "perDay"){
      if(special == "amountOfDays"){
      setTogether(div_upLeft, input_hours, input_minutes,": ",input_goal);
      var btn_calcWithout = new Button("Calculate without", () => {
        btn_Period_Function(
          input_goal.value,
          input_hours.value,
          input_minutes.value,
          false
        );
      });
      var btn_calcWith = new Button("Calculate with", () => {
        btn_Period_Function(
          input_goal.value,
          input_hours.value,
          input_minutes.value,
          true
        );
      });
      }else{
        var input_weeks = new Inputfield("number" ,"Wochen",0,52, );
      var input_days = new Inputfield("number", "Tage",0,7);
      var input_hours = new Inputfield("number","Stunden",0,24);
      setTogether(div_upLeft, input_weeks, input_days, "", input_hours);
      var btn_calcWithout = new Button("Calculate without", () => {
        btn_Period_Function(
          input_weeks.value,
          input_days.value,
          input_hours.value,
          false
        );
      });
      var btn_calcWith = new Button("Calculate with", () => {
        btn_Period_Function(
          input_weeks.value,
          input_days.value,
          input_hours.value,
          true
        );
      });
      }
      div_downLeft.append(btn_calcWithout);
      div_downLeft.append(btn_calcWith);
    } else if (special == "login"){
      var usernameInput = new Inputfield("text", "Username");
      var passwordInput = new Inputfield("password", "Password");
      var loginButton = new Button("Login", () => { Api.login(usernameInput.value, passwordInput.value)})
    
      setTogether(div_upLeft, usernameInput, passwordInput, " ");
      div_upRight.appendChild(loginButton);
    }else if (special == "isHomeTime") {
      var btn_goHomeTime = new Button("Calculate", () => {
        var time = btn_Month_Function(
          parseInt(input_hours.value),
          parseInt(input_minutes.value)
        );
        goHomeTimeValue.textContent = time;
      });
      var goHomeTime = new H3("Um ", "center");
      var goHomeTimeValue = new H3("00:00", "center");
      div_upLeft.appendChild(goHomeTime);
      div_upRight.appendChild(goHomeTimeValue);
      setTogether(div_downLeft, input_hours, input_minutes, ": ");
      div_downRight.appendChild(btn_goHomeTime);
    } else {
      var btn_Current = new Button("Period", () => {
        btn_Period_Function(
          input_calculateBegin.value,
          input_calculateEnd.value
        );
      });
      var btn_Month = new Button("Month", btn_Month_Function);
      if (special == "currentOvertime") {
        input_calculateBegin = new Inputfield("number", "Leave Hour",0, 31);
        input_calculateEnd = new Inputfield("number", "Leave Minute",0, 31);
        var input_pauseTime = new Inputfield("number", "Breaktime",0, 60);
        btn_Month.textContent = "Normal";
        btn_Current.textContent = "Specified";
        setTogether(
          div_upLeft,
          input_calculateBegin,
          input_calculateEnd,
          ": ",
          input_pauseTime
        );
        btn_Current = new Button("Period", () => {
          btn_Period_Function(
            input_calculateBegin.value,
            input_calculateEnd.value,
            input_pauseTime.value
          )
        });
      } else {
        setTogether(div_upLeft, input_calculateBegin, input_calculateEnd, "- ");
      }
      div_upRight.appendChild(btn_Current);
      div_downRight.appendChild(btn_Month);
    }
    parent.appendChild(div_upLeft);
    parent.appendChild(div_upRight);
    parent.appendChild(div_downLeft);
    parent.appendChild(div_downRight);

    legendElement.textContent = title;
    fieldsetElement.appendChild(legendElement);
    fieldsetElement.appendChild(parent);
    container.appendChild(fieldsetElement);
  }
}
