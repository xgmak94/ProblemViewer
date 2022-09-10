const path = require('path');
const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let dir = path.join(process.cwd(), '..', 'Leetcode');

    let folders = await fs.promises.readdir(dir);
    let arr = [];
    folders.forEach((folder) => {
      arr.push(folder.split('.'));
    });
    arr.sort((a, b) => {
      return Number(a[0]) - Number(b[0]);
    });

    arr.forEach((elem, idx) => {
      arr[idx] = elem.join('.');
    });
    return res.send(JSON.stringify(arr));
  } else if (req.method === 'POST') {
    return res.send('post');
  }
}
