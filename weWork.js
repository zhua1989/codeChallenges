// Multiline Function String - Credit -  Nate Ferrero - Public Domain
function heredoc (f) {
    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};

var data = heredoc(function(){/*
Capacity,MonthlyPrice,StartDay,EndDay
1,600,2014-07-01,
1,400,2014-04-02,
1,400,2014-05-01,
5,2800,2014-03-01,2014-04-30
2,1500,2014-05-01,2014-06-30
4,1700,2014-04-01,
3,1300,2014-04-01,
15,6500,2014-05-01,2014-08-31
1,400,2014-05-01,
1,400,2014-05-01,
3,1400,2014-05-01,
18,7200,2014-05-01,
1,800,2014-06-01,
1,700,2014-05-01,2014-06-30
2,1250,2014-04-16,2014-06-02
1,600,2013-11-01,2014-05-31
8,4000,2014-06-02,2014-07-31
2,1300,2014-05-01,2014-10-31
4,2200,2014-05-01,
14,11875,2014-06-01,
2,1500,2014-05-01,2014-08-31
2,1500,2012-06-01,
3,1850,2014-04-09,2014-08-06
2,1100,2014-05-01,2014-09-30
1,625,2014-04-11,
1,1000,2014-02-14,
1,400,2014-05-01,
6,3600,2014-04-02,
2,950,2013-02-01,2014-05-31
4,2500,2013-06-01,2014-04-30
2,1200,2014-07-01,2014-08-31
1,950,2014-06-01,2014-08-31
4,3200,2014-04-01,2014-09-30
1,400,2014-03-27,2014-04-10
4,2600,2014-02-01,2014-04-08
11,5500,2014-05-01,
2,1200,2014-05-01,2014-07-02
1,600,2014-05-01,2014-07-31
1,800,2013-11-01,2014-04-30
1,700,2013-05-01,
2,900,2014-07-01,2014-08-31
2,1400,2014-04-02,
2,1500,2014-05-01,
2,1200,2014-05-01,
2,1500,2014-05-01,2014-10-31
2,900,2014-02-01,
1,400,2014-04-14,
2,900,2014-01-01,2014-06-30
2,1000,2013-12-01,2014-06-30
9,4500,2014-02-06,2014-04-30
4,2500,2013-08-01,
6,2900,2013-05-01,2014-05-31
1,600,2014-04-09,
2,1700,2014-02-14,2014-04-30
2,900,2014-07-01,
1,400,2014-05-01,2014-10-31
2,0,2014-04-15,2014-05-01
4,2500,2014-05-01,
4,3600,2014-05-01,
9,4950,2014-05-01,
2,1100,2014-05-12,
6,2700,2014-05-01,2014-08-31
16,350,2014-04-01,2014-08-31
2,1300,2012-10-01,
1,950,2014-06-01,2014-06-08
3,2000,2014-06-01,2014-06-30
8,3600,2014-07-08,
6,5400,2014-05-12,
4,2700,2013-09-01,
4,2600,2012-06-01,2014-05-31
4,2700,2012-07-01,2014-04-30
1,450,2014-04-02,
4,2700,2014-04-01,2014-04-30
4,2200,2014-06-01,2014-10-31
dummytext
*/});


// var fs = require('fs');
// fs.readFile("./data.csv", "UTF8", function(error, data){

  var dataArray = data.split("\n");
  var arrayOfRooms = [];

  // for loop to go through array of each line from csv file
  for(var i=0; i<dataArray.length - 1; i++){
    var rooms = dataArray[i].split(",");

    var startDateArrayNumbers = [];
    var endDateArrayNumbers = [];

    // After splitting each line of csv file into their own array
    // split each the start date for each room array and parse them into numbers
    var splitStartDate = rooms[2].split("-");
    
    var newStartYear = parseInt(splitStartDate[0]);
    
    var newStartMonth = parseInt(splitStartDate[1], 10);
    
    var newStartDay = parseInt(splitStartDate[2], 10);


    //Push it into a new array which will be stored in the object
    startDateArrayNumbers.push(newStartYear, newStartMonth, newStartDay);

    var splitEndDate = rooms[3].split("-");
    
    var newEndYear = parseInt(splitEndDate[0]);
    
    var newEndMonth = parseInt(splitEndDate[1], 10);
    
    var newEndDay = parseInt(splitEndDate[2], 10);

    var convertedNumbCapacity = parseInt(rooms[0])
    var convertedpriceNumber = parseInt(rooms[1])

    //doing same thing for end date information
    endDateArrayNumbers.push(newEndYear, newEndMonth, newEndDay)

    var roomObjects = {
      capacity: convertedNumbCapacity,
      monthlyPrice: convertedpriceNumber,
      startDate: startDateArrayNumbers,
      endDate: endDateArrayNumbers,
      startDateString: rooms[2],
      endDateString: rooms[3]
    }
    //push each object into empty array
    arrayOfRooms.push(roomObjects);
  }
// })

//Function to calculate number of days in month
var daysInMonth = function daysInMonth(month,year) {
   return new Date(year, month + 1, 0).getDate();
}
// Step one create a function that takes an input of year and month
// and returns the calculated revenue for that month

var getRevenue = function getRevenue(rooms, input){

    // split the input and convert the year and month to numbers

    input += "-01";

    var arrayInput = input.split("-");
    var inputYear = parseInt(arrayInput[0]);
    var inputMonth = parseInt(arrayInput[1]);

    var roomRevenue = 0;
    var monthsCount = 0;   
    
    //Convert to valid JS date object for easy comparison

    var convertedDateInput = new Date(arrayInput[0],arrayInput[1]-1, arrayInput[2]).getTime();
    
    var convertedStartDate;

    var convertedEndDate;

    for(var i=1; i<rooms.length; i++){

      //During Loop convert each start date and end date to Time for Comparison
      //Have to pass in individual year/month and day with JS date constructor because of default
      //time zone behaviors
      var startDateParts = rooms[i].startDateString.split('-');
      var endDateParts = rooms[i].endDateString.split('-');
      convertedStartDate = new Date(startDateParts[0], startDateParts[1]-1, startDateParts[2]).getTime();
      convertedEndDate = new Date(endDateParts[0], endDateParts[1]-1, endDateParts[2]).getTime();

      // General Logic.  Figure  cases where there is no revenue and other cases where there should be   
      // if the converted input date time is before converted start date revenue will be 0
      if(convertedDateInput < convertedStartDate){
        roomRevenue += 0;
      } else if (isNaN(rooms[i].endDate[0]) && convertedDateInput < convertedStartDate){
        revenue += 0;

      // if input date is after end reservation date
      } else if (convertedDateInput > convertedEndDate){
        roomRevenue += 0;

      // all other conditions
      } else {

          if(inputMonth != rooms[i].startDate[1]){
            roomRevenue += rooms[i].monthlyPrice;

          } else {
            var numDaysInMonthReserved = daysInMonth(rooms[i].startDate[1], rooms[i].startDate[0]);
            var percentageInMonth = (numDaysInMonthReserved - rooms[i].startDate[2]) / numDaysInMonthReserved
            var proRatedAmt = percentageInMonth * rooms[i].monthlyPrice;
            roomRevenue += proRatedAmt
          }
      }
    }
    console.log('Expected revenue: $' + roomRevenue);
    // call getCapacity Function
    getCapacity(rooms, convertedStartDate, convertedEndDate, convertedDateInput );
};

//Function to find out number of days in a given month/year

// Step two create a second function that takes an input of year and month
// and returns the capacity of unreserved offices

var getCapacity = function(rooms, convertedStartDate, convertedEndDate, convertedDateInput){
      
  unreservedRoomCapacity = 0;

for(var i=1; i < rooms.length; i++){

  var startDateParts = rooms[i].startDateString.split('-');
  var endDateParts = rooms[i].endDateString.split('-');
  convertedStartDate = new Date(startDateParts[0], startDateParts[1]-1, startDateParts[2]).getTime();
  convertedEndDate = new Date(endDateParts[0], endDateParts[1]-1, endDateParts[2]).getTime();

  // input during a time when room is reserved
  if(convertedDateInput > convertedStartDate && convertedDateInput < convertedEndDate){
    unreservedRoomCapacity += 0

  // input is after start date for a room that is reserved indefinitely
  } else if (isNaN(rooms[i].endDate[0]) && convertedDateInput > convertedStartDate) {
    unreservedRoomCapacity += 0;
  } else {
    unreservedRoomCapacity += rooms[i].capacity;
  }
}
  console.log('Expected total capacity of the unreserved offices: ' + unreservedRoomCapacity)
};

//call get Revenue function which is defined below
getRevenue(arrayOfRooms, '2018-01');







