// Global Variables
const vereinsbeitrag = 28;
const qmpreis = 0.12;
const instandhaltung = 15;
const databaseName = 'Database';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}


function searchData(searchNumber) {
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(databaseName).getDataRange().getValues();
  var dataObj = {};
  var counter = 0;
  var headers = data[0];
  Logger.log(data[1].length);
for (var i = 0; i <= data.length; i++) {
  if(data[i][0] == searchNumber){
    //Logger.log(data[i]);
    for(var j = 0; j < data[i].length; j++){
      dataObj[data[0][j]] = data[i][j];
    }
    //check if dataObj.dob is a valid date
    if(isNaN(Date.parse(dataObj.dob))){
      dataObj.dob = '';
    } else {
      dataObj.dob = dateFormater(dataObj.dob, '.');
    }
    if(isNaN(Date.parse(dataObj.beitritt_am))){
      dataObj.beitritt_am = '';
    } else {
      dataObj.beitritt_am = dateFormater(dataObj.beitritt_am, '.');
    }
    var newtest = JSON.stringify(dataObj);



    return newtest;
  }
}

}

function saveDataFromHTML(saveObj) {
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Datenbank').getDataRange().getValues();
  for (var i = 0; i < data.length; i++){
    if (saveObj.number == data[i][0]) {
      for (var j = 0; j < data[i].length; j++) {
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Datenbank').getRange(i+1,j+1).setValue(saveObj[data[0][j]]);

      }
    }
  }
}

function test() {
  var today = new Date();
  Logger.log(dateFormater(today, '.'));
}

function dateFormater(date, separator) {
  var date = new Date(date);
  var day = date.getDate();
  // add +1 to month because getMonth() returns month from 0 to 11
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  // show date and month in two digits
  // if month is less than 10, add a 0 before it
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  // now we have day, month and year
  // use the separator to join them
  return day + separator + month + separator + year;
}