class DropDownView{
    constructor(title, div, container){
        var fieldsetElement = document.createElement("fieldset");
        var legendElement = document.createElement("legend");
        legendElement.textContent = title;
        fieldsetElement.appendChild(legendElement)
        fieldsetElement.appendChild(div);
        container.appendChild(fieldsetElement);
    }
}