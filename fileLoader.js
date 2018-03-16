const fs = require('fs');

let datas = {};
let flat = [];

const populateIndex = (cb) => {
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
      });
    });
    cb();
  });
};

const loadFile = async (folder, filename, cb) => {
    let fullPath = 'data/' + folder + '/' + filename + '.json';

    fs.readFile(fullPath, (err, data) => {
      if (err) {
        cb(err);
      }

      //the files come through as newline-delimited JSON, have to be split and parsed
      // let json = ;
      //   console.log(json);
      cb(data.toString().trim().split('\n').map(val => {
          return JSON.parse(val);
      }));
    });
}



module.exports = {
  loadFile: loadFile,
  populate: populateIndex,
  data: datas,
  flat: flat
};