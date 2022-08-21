const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/questions', (req, res) => {
  let dir = path.join(process.cwd(), '..', 'Leetcode');

  fs.promises
    .readdir(dir)
    .then((folders) => {
      let arr = [];
      folders.forEach((folder) => {
        let split = folder.split('.');
        arr.push(split);
      })
      arr.sort((a,b) => {
        return Number(a[0]) - Number(b[0]);
      });

      for(let i = 0 ; i < arr.length ; i++) {
        arr[i] = arr[i].join('.');
      }
      res.send(JSON.stringify(arr));
    })
    .catch((err) => {
      res.status(404).send(err);
    });

});

router.get('/question', async (req, res) => {
  console.log(req.query.question);
  let dir = path.join(process.cwd(), '..', 'Leetcode', req.query.question);

  console.log(dir);
  let files = await fs.promises.readdir(dir);

  let ret = {};
  for(let i = 0 ; i < files.length ; i++) {
    let fileDir = path.join(dir, files[i]);

    let file = await fs.promises.readFile(path.join(dir, files[i]));

    let ext = files[i].split('.')[1];
    let buf = new Buffer(file);
    ret[ext] = Buffer.from(buf).toString();
  }

  res.send(ret);
})

module.exports = router;
