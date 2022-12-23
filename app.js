const express = require('express');
const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts');
const connect = require('./schemas');

const app = express();
const port = 3000;

app.use(express.json()); // req.body
app.use('/api', [goodsRouter, cartsRouter]);

connect();

app.post('/', (req, res) => {
  console.log(req.body);

  res.send('POST!!!');
});

app.get('/', (req, res) => {
  console.log(req.query);

  const obj = {
    key: 'value',
    name: 'SJW??',
  };

  res.status(400).json(obj);
});

app.get('/:id', (req, res) => {
  console.log(req.params);

  res.send('id 잘받아옴!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
