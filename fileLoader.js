const fs = require('fs');

let datas = {};
let flat = [];

const loadFiles = (cb) => {
  fs.readdir('data', (err, folders) => {
    if (err) {
      return console.error(err);
    }

    //run through them, load each one up
    folders.forEach((folder) => {
      let fullPath = 'data/' + folder;
      fs.readdir(fullPath, (err, files) => {
          if (err) {
              return console.error(err);
          }

          datas[folder] = files;
          flat.push({"folder": folder, "files": files});
          // let fullPath = 'data/' + folder + '/' + ;
          // let shortname = filename.replace('.json', '');
          // fs.readFile(fullPath, (err, data) => {
          //   if (err) {
          //     console.error(err);
          //   }
          //
          //   //the files come through as newline-delimited JSON, have to be split and parsed
          //   datas[shortname] = data.toString().trim().split('\n').map(val => {
          //     return JSON.parse(val);
          //   });
          // });
      });
    });

    cb();
  });
};


module.exports = {
  loadFiles: loadFiles,
  data: datas,
  flat: flat
};