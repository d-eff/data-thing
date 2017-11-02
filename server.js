const fs = require('fs');
const express = require('express');
const app = express();

let datas;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('userEvents', JSON.parse(datas[0]));
});

fs.readFile('data/userEventsActivity.json', (err, data) => {
  if (err) {
    return console.error(err);
  }

  app.listen(3000, () => {
    datas = data.toString().split('\n');
  });
});