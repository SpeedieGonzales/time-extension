class MenuButton{
    constructor(img, classList, btn_function, id = 0){
      var MenuButton = document.createElement("button");
      if(img.startsWith("url")){
      MenuButton.style.backgroundImage = img;
      }else{
        MenuButton.textContent = img;
      }
      if(id != 0){
        MenuButton.id = id;
      }
      classList.forEach(classe => {
        MenuButton.classList.add(classe);
      });
      MenuButton.classList.add("btn");
      MenuButton.addEventListener("click", function () {
        btn_function;
      });
      return MenuButton;
    }
  }