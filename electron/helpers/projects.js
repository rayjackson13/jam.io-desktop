const fs = require('fs');
const temp = require('temp');
const path = require('path');
const { ncp } = require('ncp');

//TODO: fix function
const generateFileTree = async directory => {
  const dirents = fs.readdirSync(directory, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(directory, dirent.map);
    return dirent.isDirectory() ? generateFileTree(res) : res;
  }));
  return Array.prototype.concat(...files)
}

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
  },
  listProjectFiles: path => {
    return new Promise(resolve => {
      generateFileTree(path)
        .then(files => resolve(files))
        .catch(err => resolve(err));
    });
  }
}