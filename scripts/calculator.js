function calculateOvertime(count = 0){
    var fields = document.querySelectorAll("td[data-c='4']");
    var specifiedfields = [];
    fields.forEach(function(field){
        if(field.textContent.length != 0){
            specifiedfields.push(field);
        }
    })
    if(count == 0){
        count = specifiedfields.length;
    }
    var overtime = 0;
    for(let x = 0; x < count; x++){
        var currentovertime = specifiedfields[x].getAttribute("data-c") === "4" ? specifiedfields[x].textContent : "";
        if(!checkIfStringContainsLetter(currentovertime)){
            overtime += TimeParser.parseStringToInt(currentovertime);
        }
    }
    overtime = TimeParser.parseIntToTime(overtime);
    return overtime;
}

function checkIfStringContainsLetter(string) {
    var kleinerString = string.toLowerCase();
    if (/[a-z]/i.test(kleinerString)) {
      return true;
    } else {
      return false;
    }
}