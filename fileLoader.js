const fs = require('fs');

let datas = {};

const loadFiles = (cb) => {
  fs.readdir('data', (err, files) => {
    if (err) {
      return console.error("error reading /data" + err);
    }
    
    //run through them, load each one up
    files.forEach((filename) => {
      let fullPath = 'data/' + filename
      let shortname = filename.replace('.json', '');
      fs.readFile(fullPath, (err, data) => {
        if (err) {
          console.error("error reading file" + filename + " " + err);
        }

        //the files come through as newline-delimited JSON, have to be split and parsed
        datas[shortname] = data.toString().trim().split('\n').map(val => {
          var item = {};
          try {
            item = JSON.parse(val);
          } catch(e) {
            console.log("problem parsing data at " + fullPath);
          }
          return item;
        });
      });
    });
  
    cb();
  });
};

module.exports = {
  loadFiles: loadFiles,
  data: datas
};