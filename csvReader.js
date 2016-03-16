var fs = require('fs');

var CSVReader = class CSVReader {
  constructor(csvPath) {
    this.csvPath = function(csvPath){
      fs.readFile(csvPath, "UTF8", function(error, data){
        var dataArray = data.split('\n');
        return dataArray
      })
    }
  }
}