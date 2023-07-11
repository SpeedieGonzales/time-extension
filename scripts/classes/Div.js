class Div{
    constructor(id, css_class){
      var div = document.createElement("aside");
      div.id = id;
    if (css_class != "") {
      div.classList.add(css_class);
    }
    return div;
    }
  }