const path = require('path');
const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    handleGet(req, res);
  }
  else if(req.method === 'POST') {
    handlePost(req, res);
  }
}

async function handleGet(req, res) {
  let dir = path.join(
    process.cwd(),
    '..',
    'Leetcode',
    req.query.question
  );

  let files = await fs.promises.readdir(dir);

  let ret = {};
  for (let i = 0; i < files.length; i++) {
    let fileDir = path.join(dir, files[i]);

    let file = await fs.promises.readFile(path.join(dir, files[i]));

    let ext = files[i].split('.')[1];
    ret[ext] = Buffer.from(file).toString();
  }
  return res.send(ret);
}

async function handlePost(req, res) {
  let dir = path.join(
    process.cwd(),
    '..',
    'Leetcode',
    req.body.questionName
  );
  // make directory
  let response = fs.stat(dir, async (err, stats) => {
    if(err) {
      await fs.promises.mkdir(dir);
    }
    let file = path.join(dir, 'Solution.' + req.body.extension);
    await fs.promises.writeFile(file, req.body.solution);
  });

  return res.status(201).send();
}