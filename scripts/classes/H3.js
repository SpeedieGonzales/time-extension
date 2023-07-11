class H3{
    constructor(content, align){
      var h3_element = document.createElement("h3");
        h3_element.textContent = content;
        h3_element.style.textAlign = align;
        return h3_element;
    }
  }