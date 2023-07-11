class Inputfield {
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