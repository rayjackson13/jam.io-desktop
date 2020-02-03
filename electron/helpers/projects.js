const fs = require('fs');
const temp = require('temp');
const path = require('path');
const { ncp } = require('ncp')

module.exports = {
  validateProject: (folders) => {
    return new Promise(resolve => {
      if (!folders || !folders.length) {
        resolve(null);
      }

      const folder = folders[0];
      fs.readdir(folder, function(err, items) {
        const isValid = items.find(val => val.match('.project.jam'));
        resolve(isValid ? folder : null);
      });
    });
  },
  createTempProject: () => {
    return new Promise(resolve => {
      temp.mkdir('project', function(err, dirPath) {
        const boilerplate = path.join(__dirname, '../', 'boilerplate');
        ncp(boilerplate, dirPath, err => {
          if (err) {
            console.log(err);
          }
          console.log('done');
          resolve(dirPath);
        })
      })
    });
  }
}