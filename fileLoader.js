const fs = require('fs');

let datas = {};

const loadFiles = (cb) => {
  fs.readdir('data', (err, files) => {
    if (err) {
      return console.error(err);
    }
    
    //run through them, load each one up
    files.forEach((filename) => {
      let fullPath = 'data/' + filename
      let shortname = filename.replace('.json', '');
      fs.readFile(fullPath, (err, data) => {
        if (err) {
          console.error(err);
        }
  
        //the files come through as newline-delimited JSON, have to be split and parsed
        datas[shortname] = data.toString().trim().split('\n').map(val => {
          return JSON.parse(val);
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