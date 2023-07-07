class inputfield {
  constructor(min, max, placeholder) {
    var input = document.createElement("input");
    input.type = "number";
    input.min = min;
    input.max = max;
    input.placeholder = placeholder;
    input.classList.add("normal_input");
    var placeholderWidth = getTextWidth(placeholder);
    input.style.width = `${placeholderWidth + 30}px`;
    return input;
  }
}
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
function createDiv(css_class = "") {
  var div = document.createElement("aside");
  if (css_class != "") {
    div.classList.add(css_class);
  }
  return div;
}
class button {
  constructor(name, btn_function) {
    var button = document.createElement("button");
    button.textContent = name;
    button.classList.add("btn");
    button.addEventListener("click", btn_function);
    return button;
  }
}
class infolabel {
  constructor(input) {
    var label = document.createElement("label");
    label.textContent = input;
    return label;
  }
}
function appendButton(div, btn) {
  div.appendChild(btn.button);
}
