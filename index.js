function createEmployeeRecord(array){
    // create object
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
}


function createEmployeeRecords(arrayOfArrays){
    let arrayOfObjects = [];
    for (const array of arrayOfArrays) {
        let employeeRecord = createEmployeeRecord(array);
        arrayOfObjects.push(employeeRecord);
    };
return arrayOfObjects;
}

function createTimeInEvent(object, dateStamp){
    let charOfStamp = dateStamp.split(" ");
    object.timeEvents = []
    object.timeInEvents.push({
        type: "TimeIn",
        date: charOfStamp[0],
        hour: parseInt(charOfStamp[1])
    })
    
    return object
}



function createTimeOutEvent(object, dateStamp){
    let charOfStamp = dateStamp.split(" ");
    object.timeEvents = []
    object.timeOutEvents.push ({
        type: "TimeOut",
        date: charOfStamp[0],
        hour: parseInt(charOfStamp[1])
    })
    
    return object
}


function hoursWorkedOnDate(object, date){
    let timeElapsed;
    let timeOut = object.timeOutEvents
        .filter((e) => e.date === date)
        .map((e) => e.hour);
    let timeIn = object.timeInEvents
        .filter((e) => e.date === date)
        .map((e) => e.hour);
    timeElapsed = (timeOut - timeIn) /100;
    return timeElapsed;
}

function wagesEarnedOnDate(object, date){
    const hoursWorked = hoursWorkedOnDate(object, date);
    const hourlyPay = object.payPerHour;
    return hourlyPay * hoursWorked;
}

function allWagesFor(object){
    let allPay = [];
    let allDates = [];

    for (let i=0; i<object.timeInEvents.length; i++){
        allDates.push(object.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(object, date))
    })

    return allPay.reduce((acc, val) => acc+val)

    // let counter = 0;
    // for (i=0; i<object.timeInEvents.length; i++){
    //     counter += wagesEarnedOnDate(object, object.timeInEvents[i].date);
    // }
    // return counter;  ====> WHY IS THIS CODE NOT WORKING? IT WORKS ON NODE.JS

}

function calculatePayroll(array){
    const totalPay = array.map(employee => allWagesFor(employee));
    return totalPay.reduce((acc, val) => acc+val)

}










