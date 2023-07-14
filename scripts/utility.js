function getTextWidth(text) {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'pre';
    span.innerText = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
  }
function setTogether(div, input1, input2, betweenSymbol, input3 = "") {
  var symbolTextNode = document.createTextNode(betweenSymbol);
  div.appendChild(input1);
  div.appendChild(symbolTextNode);
  div.appendChild(input2);
  if (input3 != "") {
    div.appendChild(input3);
  }
}
function appendButton(div, btn) {
  div.appendChild(btn.button);
}
function createLoginForm(container) {
  var usernameInput = new Inputfield("text", "Username");
  var passwordInput = new Inputfield("password", "Password");
  var loginButton = new Button("Login", () => { Api.login(usernameInput.value, passwordInput.value)})

  setTogether(container, usernameInput, passwordInput, " ");
  container.appendChild(loginButton);
}
