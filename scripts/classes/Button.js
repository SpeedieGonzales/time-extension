class Button {
    constructor(name, btn_function) {
      var button = document.createElement("button");
      button.textContent = name;
      button.classList.add("btn");
      button.addEventListener("click", btn_function);
      return button;
    }
  }