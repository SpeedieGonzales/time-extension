function calculateOvertime(specifiedfields){
    console.log(specifiedfields);
    var count = specifiedfields.length;
    var overtime = 0;
    for(let x = 0; x < count; x++){
        var currentovertime = specifiedfields[x].textContent;
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
function calculateOvertimeByPeriod(begin, end){
    beginInNumber = parseInt(begin);
    endInNumber = parseInt(end);
    var fields = document.querySelectorAll("td[data-c='4']:not(.td_green)");
    var fieldsInRange = []
    fields.forEach(function(field, index){
        if (field.textContent.length != 0 && index >= beginInNumber && index <= endInNumber){
            fieldsInRange.push(field);
        }
    })
    var overtime = calculateOvertime(fieldsInRange);
    return overtime;
}
function calculateOvertimeForMonth(){
    var fields = document.querySelectorAll("td[data-c='4']");
    var specifiedfields = [];
    fields.forEach(function(field){
        if(field.textContent.length != 0){
            specifiedfields.push(field);
        }
    })
    return calculateOvertime(specifiedfields);
}
function countAbsences(){
    var absencetime = 0;
    var fields = document.querySelectorAll("td[data-c='6']");
    console.log(fields);
    fields.forEach(function(field){
        if(field.textContent.length != 0 && field.textContent.length > 4){
            console.log(field.textContent);
            absencetime += TimeParser.parseStringToInt(field.textContent.substring(field.textContent.length - 4));
            console.log(absencetime);
        }
    })
   return TimeParser.parseIntToTime(absencetime);
}