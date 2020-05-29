const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/contact', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('姓名为必填项');
  }
  res.status(201).send(`欢迎${req.body.name}`);
});

app.post('/login', (req, res) => {
  if (!req.header('x-auth-token')) {
    return res.status(400).send('没有令牌');
  }

  if (req.header('x-auth-token') !== '123456') {
    return res.status(401).send('没有权限');
  }

  res.send('登录成功');
});

app.delete('/post/:id', (req, res) => {
  res.json({
    msg: `博客${req.params.id}已经删除`,
  });
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});
