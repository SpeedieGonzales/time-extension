class Inputfield {
  constructor(type, placeholder, min = 0, max = 0) {
    var input = document.createElement("input");
    input.type = type;
    if (type == "number") {
      input.min = min;
      input.max = max;
    }
    input.placeholder = placeholder;
    input.classList.add("normal_input");
    var placeholderWidth = getTextWidth(placeholder);
    input.style.width = `${placeholderWidth + 30}px`;
    return input;
  }
}
